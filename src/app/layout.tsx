import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans } from "next/font/google";
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
  title: "Ar-condicionado: instalação, limpeza e conserto",
  description:
    "Escolha o serviço, informe onde você está e fale com um técnico de ar-condicionado perto de você pelo WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
