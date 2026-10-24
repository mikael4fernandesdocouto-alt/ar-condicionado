const state = {
  professionals: [],
  search: "",
  editingId: null,
  deletingId: null,
};

const $ = (id) => document.getElementById(id);

const loginView = $("login-view");
const appView = $("app-view");
const loginForm = $("login-form");
const loginError = $("login-error");
const passwordInput = $("password");
const logoutButton = $("logout-button");
const addButton = $("add-button");
const emptyAddButton = $("empty-add-button");
const searchInput = $("search-input");
const rows = $("professional-rows");
const tableWrap = document.querySelector(".table-wrap");
const emptyState = $("empty-state");
const emptyTitle = $("empty-title");
const emptyCopy = $("empty-copy");
const countTotal = $("count-total");
const countRegions = $("count-regions");
const listCount = $("list-count");
const editorDialog = $("editor-dialog");
const editorForm = $("editor-form");
const editorEyebrow = $("editor-eyebrow");
const editorTitle = $("editor-title");
const editorError = $("editor-error");
const saveButton = $("save-button");
const fieldName = $("field-name");
const fieldRegion = $("field-region");
const fieldWhatsapp = $("field-whatsapp");
const fieldMaps = $("field-maps");
const deleteDialog = $("delete-dialog");
const deleteName = $("delete-name");
const deleteError = $("delete-error");
const confirmDeleteButton = $("confirm-delete-button");
const toast = $("toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function showLogin(message = "") {
  if (editorDialog.open) editorDialog.close();
  if (deleteDialog.open) deleteDialog.close();
  appView.hidden = true;
  loginView.hidden = false;
  loginError.textContent = message;
  passwordInput.value = "";
  window.setTimeout(() => passwordInput.focus(), 0);
}

function showApp() {
  loginView.hidden = true;
  appView.hidden = false;
}

async function api(path, options = {}) {
  const { method = "GET", body, onUnauthorized } = options;
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "same-origin",
  });

  if (response.status === 401 && onUnauthorized !== null) {
    if (onUnauthorized) {
      onUnauthorized();
    } else {
      showLogin("Sua sessão expirou. Entre novamente.");
    }
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && payload.error
        ? payload.error
        : "Não foi possível concluir a ação.";
    throw new Error(message);
  }

  return payload;
}

async function checkSession() {
  const response = await fetch("/api/session", { credentials: "same-origin" });
  if (!response.ok) return false;
  const data = await response.json();
  return data.authenticated === true;
}

function safeHttpUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function createLink(value, label) {
  const url = safeHttpUrl(value);
  if (!url) return null;
  const link = document.createElement("a");
  link.className = "link-chip";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = `${label} ↗`;
  return link;
}

function createRow(professional) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  const nameWrap = document.createElement("div");
  nameWrap.className = "row-name";
  const name = document.createElement("strong");
  name.textContent = professional.name;
  nameWrap.append(name);
  nameCell.append(nameWrap);

  const regionCell = document.createElement("td");
  regionCell.textContent = professional.region || "Não informada";

  const whatsappCell = document.createElement("td");
  const whatsappLink = createLink(professional.whatsapp, "WhatsApp");
  if (whatsappLink) {
    whatsappCell.append(whatsappLink);
  } else {
    const missing = document.createElement("span");
    missing.className = "missing";
    missing.textContent = "Não informado";
    whatsappCell.append(missing);
  }

  const mapsCell = document.createElement("td");
  const mapsLink = createLink(professional.maps, "Mapa");
  if (mapsLink) {
    mapsCell.append(mapsLink);
  } else {
    const missing = document.createElement("span");
    missing.className = "missing";
    missing.textContent = "Não informado";
    mapsCell.append(missing);
  }

  const actionsCell = document.createElement("td");
  const actions = document.createElement("div");
  actions.className = "actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "action-button";
  editButton.textContent = "Editar";
  editButton.setAttribute("aria-label", `Editar ${professional.name}`);
  editButton.addEventListener("click", () => openEditor(professional));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "action-button danger";
  deleteButton.textContent = "Excluir";
  deleteButton.setAttribute("aria-label", `Excluir ${professional.name}`);
  deleteButton.addEventListener("click", () => openDelete(professional));

  actions.append(editButton, deleteButton);
  actionsCell.append(actions);

  row.append(nameCell, regionCell, whatsappCell, mapsCell, actionsCell);
  return row;
}

function render() {
  const query = state.search.trim().toLocaleLowerCase("pt-BR");
  const filtered = state.professionals.filter((professional) => {
    if (!query) return true;
    const haystack = `${professional.name} ${professional.region}`.toLocaleLowerCase(
      "pt-BR",
    );
    return haystack.includes(query);
  });

  const regions = new Set(
    state.professionals.map((professional) => professional.region).filter(Boolean),
  );
  countTotal.textContent = String(state.professionals.length);
  countRegions.textContent = String(regions.size);
  listCount.textContent = `${filtered.length} de ${state.professionals.length}`;

  rows.replaceChildren(...filtered.map(createRow));
  tableWrap.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length > 0;

  if (filtered.length === 0) {
    const hasRecords = state.professionals.length > 0;
    emptyTitle.textContent = hasRecords
      ? "Nenhum resultado"
      : "Nenhum profissional cadastrado";
    emptyCopy.textContent = hasRecords
      ? "Tente buscar por outro nome ou região."
      : "Adicione o primeiro profissional para começar.";
    emptyAddButton.hidden = hasRecords;
  }
}

async function load() {
  const data = await api("/api/professionals");
  state.professionals = Array.isArray(data) ? data : [];
  render();
}

function openEditor(professional = null) {
  state.editingId = professional ? professional.id : null;
  editorEyebrow.textContent = professional ? "Editar cadastro" : "Novo cadastro";
  editorTitle.textContent = professional
    ? "Editar profissional"
    : "Adicionar profissional";
  editorForm.reset();
  editorError.textContent = "";
  fieldName.value = professional?.name || "";
  fieldRegion.value = professional?.region || "";
  fieldWhatsapp.value = professional?.whatsapp || "";
  fieldMaps.value = professional?.maps || "";
  editorDialog.showModal();
  window.setTimeout(() => fieldName.focus(), 0);
}

function openDelete(professional) {
  state.deletingId = professional.id;
  deleteName.textContent = professional.name;
  deleteError.textContent = "";
  deleteDialog.showModal();
}

async function handleLogin(event) {
  event.preventDefault();
  loginError.textContent = "";
  const button = loginForm.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Entrando...";

  try {
    await api("/api/login", {
      method: "POST",
      body: { password: passwordInput.value },
      onUnauthorized: null,
    });
    showApp();
    await load();
    passwordInput.value = "";
  } catch (error) {
    loginError.textContent = error.message;
    passwordInput.select();
  } finally {
    button.disabled = false;
    button.textContent = "Entrar";
  }
}

async function handleEditorSubmit(event) {
  event.preventDefault();
  editorError.textContent = "";

  const payload = {
    name: fieldName.value.trim(),
    region: fieldRegion.value.trim(),
    whatsapp: fieldWhatsapp.value.trim(),
    maps: fieldMaps.value.trim(),
  };

  if (!payload.name) {
    editorError.textContent = "Informe o nome do profissional.";
    fieldName.focus();
    return;
  }

  if (!payload.region) {
    editorError.textContent = "Informe a região do profissional.";
    fieldRegion.focus();
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Salvando...";

  try {
    if (state.editingId) {
      await api(`/api/professionals/${encodeURIComponent(state.editingId)}`, {
        method: "PUT",
        body: payload,
      });
      showToast("Cadastro atualizado.");
    } else {
      await api("/api/professionals", { method: "POST", body: payload });
      showToast("Profissional adicionado.");
    }
    editorDialog.close();
    await load();
  } catch (error) {
    editorError.textContent = error.message;
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = "Salvar";
  }
}

async function handleDelete() {
  if (!state.deletingId) return;
  deleteError.textContent = "";
  confirmDeleteButton.disabled = true;
  confirmDeleteButton.textContent = "Excluindo...";

  try {
    await api(`/api/professionals/${encodeURIComponent(state.deletingId)}`, {
      method: "DELETE",
    });
    deleteDialog.close();
    showToast("Profissional excluído.");
    await load();
  } catch (error) {
    deleteError.textContent = error.message;
  } finally {
    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = "Excluir";
  }
}

async function handleLogout() {
  try {
    await api("/api/logout", { method: "POST" });
  } catch {}
  state.professionals = [];
  state.search = "";
  searchInput.value = "";
  showLogin("Sessão encerrada.");
}

loginForm.addEventListener("submit", handleLogin);
editorForm.addEventListener("submit", handleEditorSubmit);
confirmDeleteButton.addEventListener("click", handleDelete);
logoutButton.addEventListener("click", handleLogout);
addButton.addEventListener("click", () => openEditor());
emptyAddButton.addEventListener("click", () => openEditor());
searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  render();
});

editorDialog.addEventListener("close", () => {
  state.editingId = null;
  editorError.textContent = "";
});

deleteDialog.addEventListener("close", () => {
  state.deletingId = null;
  deleteError.textContent = "";
});

for (const button of document.querySelectorAll("[data-close]")) {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog) dialog.close();
  });
}

for (const dialog of [editorDialog, deleteDialog]) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

async function init() {
  try {
    if (await checkSession()) {
      showApp();
      await load();
    } else {
      showLogin();
    }
  } catch {
    showLogin("Não foi possível conectar ao painel local.");
  }
}

init();
