import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-face",
  display: "swap",
});

const body = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Ar-condicionado: instalação, limpeza e conserto | ${SITE_NAME}`,
  description:
    "Escolha o serviço, informe onde você está e fale com um técnico de ar-condicionado perto de você pelo WhatsApp.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Ar-condicionado: instalação, limpeza e conserto | ${SITE_NAME}`,
    description:
      "Instalação, manutenção preventiva, higienização e conserto de ar-condicionado em atendimento domiciliar. Orçamento direto com o técnico pelo WhatsApp.",
  },
};

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        {PLAUSIBLE_DOMAIN ? (
          <Script
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
