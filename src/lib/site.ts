import { WHATSAPP_NUMBER } from "./services";

export const SITE_NAME = "Clima Sul";

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/+$/,
  "",
);

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://mikael4fernandesdocouto-alt.github.io/ar-condicionado"
).replace(/\/$/, "");

export const AREA_SERVED = "Sul de Minas";

export const CONTACT_PHONE = `+${WHATSAPP_NUMBER}`;
