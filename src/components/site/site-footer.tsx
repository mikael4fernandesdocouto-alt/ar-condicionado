import { SITE_NAME } from "@/lib/site";

export function SiteFooter({
  description = "Atendimento em domicílio. Envie a solicitação e o técnico da sua região responde no WhatsApp.",
}: {
  description?: string;
}) {
  return (
    <footer className="border-t border-azul-200 bg-white">
      <div
        data-reveal
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8"
      >
        <p className="max-w-md text-sm leading-relaxed text-azul-700">
          {description}
        </p>
        <div className="flex items-center gap-2">
          <p className="font-display text-lg text-azul-950">{SITE_NAME}</p>
          <a
            href="http://127.0.0.1:4310/"
            target="_blank"
            rel="noreferrer nofollow"
            aria-label="Abrir painel administrativo local"
            title="Acesso restrito ao painel local"
            className="inline-flex size-8 items-center justify-center rounded-full text-lg leading-none text-azul-300 transition-colors duration-200 hover:text-azul-600 focus-visible:text-azul-600"
          >
            <span aria-hidden>·</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
