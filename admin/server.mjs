import { execFile } from "node:child_process";
import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const publicDir = join(root, "public");
const dataDir = join(root, "data");
const dataFile = join(dataDir, "professionals.json");
const seedFile = join(dataDir, "seed.json");

function loadEnv(path) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

loadEnv(join(root, "..", ".env.local"));

const password = process.env.ADMIN_PASSWORD ?? "";
if (!password) {
  console.error("Defina ADMIN_PASSWORD em .env.local antes de abrir o painel.");
  process.exit(1);
}

const port = Number(process.env.ADMIN_PORT || 4310);
const sessionTtl = 12 * 60 * 60 * 1000;
const sessions = new Map();
const passwordBytes = Buffer.from(password);

const staticFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/favicon.svg", ["favicon.svg", "image/svg+xml"]],
]);

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy":
    "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    ...securityHeaders,
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(body);
}

function sendJson(res, status, data, headers = {}) {
  send(res, status, JSON.stringify(data), {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
}

function parseCookies(header = "") {
  const cookies = {};
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    const key = part.slice(0, index).trim();
    if (!key) continue;
    const raw = part.slice(index + 1).trim();
    try {
      cookies[key] = decodeURIComponent(raw);
    } catch {
      cookies[key] = raw;
    }
  }
  return cookies;
}

function getSession(req) {
  const token = parseCookies(req.headers.cookie).admin_session;
  if (!token) return null;
  const expires = sessions.get(token);
  if (!expires || expires <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return token;
}

function createSession() {
  const token = randomBytes(32).toString("base64url");
  sessions.set(token, Date.now() + sessionTtl);
  return token;
}

function sessionCookie(token) {
  return `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${Math.floor(sessionTtl / 1000)}`;
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1024 * 1024) throw new Error("Payload muito grande.");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("JSON inválido.");
  }
}

function normalizeUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("Um dos links informados é inválido.");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Os links devem começar com http:// ou https://.");
  }
  return parsed.toString();
}

function normalizeProfessional(body) {
  const name = String(body?.name ?? "").trim();
  const region = String(body?.region ?? "").trim();
  if (!name) throw new Error("Informe o nome do profissional.");
  if (name.length > 120) throw new Error("O nome deve ter no máximo 120 caracteres.");
  if (!region) throw new Error("Informe a região do profissional.");
  if (region.length > 120) {
    throw new Error("A região deve ter no máximo 120 caracteres.");
  }
  return {
    name,
    region,
    whatsapp: normalizeUrl(body?.whatsapp),
    maps: normalizeUrl(body?.maps),
  };
}

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });
  if (existsSync(dataFile)) return;
  const seed = existsSync(seedFile) ? await readFile(seedFile, "utf8") : "[]\n";
  JSON.parse(seed);
  await writeFile(dataFile, seed, "utf8");
}

async function readProfessionals() {
  await ensureDataFile();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("O arquivo de dados está inválido.");
  }
  return parsed.map((item) => ({
    id: String(item?.id ?? randomUUID()),
    name: String(item?.name ?? ""),
    region: String(item?.region ?? ""),
    whatsapp: String(item?.whatsapp ?? ""),
    maps: String(item?.maps ?? ""),
  }));
}

async function writeProfessionals(items) {
  const temporary = `${dataFile}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  await rename(temporary, dataFile);
}

async function handleApi(req, res, url) {
  const path = url.pathname;

  if (path === "/api/login" && req.method === "POST") {
    const body = await readJson(req);
    const submitted = Buffer.from(String(body?.password ?? ""));
    const valid =
      submitted.length === passwordBytes.length &&
      timingSafeEqual(submitted, passwordBytes);
    if (!valid) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      sendJson(res, 401, { error: "Senha incorreta." });
      return;
    }
    sendJson(
      res,
      200,
      { ok: true },
      { "Set-Cookie": sessionCookie(createSession()) },
    );
    return;
  }

  if (path === "/api/logout" && req.method === "POST") {
    const token = getSession(req);
    if (token) sessions.delete(token);
    sendJson(
      res,
      200,
      { ok: true },
      { "Set-Cookie": "admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" },
    );
    return;
  }

  if (path === "/api/session" && req.method === "GET") {
    sendJson(res, 200, { authenticated: Boolean(getSession(req)) });
    return;
  }

  if (!path.startsWith("/api/professionals")) {
    sendJson(res, 404, { error: "Rota não encontrada." });
    return;
  }

  if (!getSession(req)) {
    sendJson(res, 401, { error: "Faça login para continuar." });
    return;
  }

  if (path === "/api/professionals" && req.method === "GET") {
    const items = await readProfessionals();
    items.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    sendJson(res, 200, items);
    return;
  }

  if (path === "/api/professionals" && req.method === "POST") {
    const input = normalizeProfessional(await readJson(req));
    const items = await readProfessionals();
    const record = { id: randomUUID(), ...input };
    items.push(record);
    await writeProfessionals(items);
    sendJson(res, 201, record);
    return;
  }

  const match = path.match(/^\/api\/professionals\/([^/]+)$/);
  if (match && (req.method === "PUT" || req.method === "DELETE")) {
    const id = decodeURIComponent(match[1]);
    const items = await readProfessionals();
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) {
      sendJson(res, 404, { error: "Profissional não encontrado." });
      return;
    }
    if (req.method === "DELETE") {
      items.splice(index, 1);
      await writeProfessionals(items);
      sendJson(res, 200, { ok: true });
      return;
    }
    const input = normalizeProfessional(await readJson(req));
    items[index] = { ...items[index], ...input };
    await writeProfessionals(items);
    sendJson(res, 200, items[index]);
    return;
  }

  sendJson(res, 405, { error: "Método não permitido." });
}

async function serveStatic(req, res, path) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Método não permitido.");
    return;
  }
  const entry = staticFiles.get(path);
  if (!entry) {
    send(res, 404, "Não encontrado.");
    return;
  }
  const [file, type] = entry;
  try {
    const content = await readFile(join(publicDir, file));
    res.writeHead(200, {
      ...securityHeaders,
      "Content-Type": type,
      "Content-Length": content.length,
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    send(res, 404, "Não encontrado.");
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(
      req.url ?? "/",
      `http://${req.headers.host ?? "127.0.0.1"}`,
    );
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      sendJson(res, 400, {
        error: error instanceof Error ? error.message : "Erro inesperado.",
      });
    } else {
      res.end();
    }
  }
});

function openBrowser(address) {
  if (process.env.ADMIN_NO_OPEN === "1") return;
  if (process.platform === "win32") {
    execFile("cmd", ["/c", "start", "", address], { windowsHide: true }, () => {});
  } else if (process.platform === "darwin") {
    execFile("open", [address], () => {});
  } else {
    execFile("xdg-open", [address], () => {});
  }
}

server.listen(port, "127.0.0.1", () => {
  console.log(`Painel local: http://127.0.0.1:${port}`);
  console.log(`Dados: ${dataFile}`);
  openBrowser(`http://127.0.0.1:${port}`);
});

server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? `A porta ${port} já está em uso.`
      : error,
  );
  process.exit(1);
});
