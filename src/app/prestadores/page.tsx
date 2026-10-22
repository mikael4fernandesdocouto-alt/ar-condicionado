import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { PageMotion } from "@/components/site/page-motion";
import { ProviderForm } from "@/components/site/provider-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { BASE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

const PROVIDER_STEPS = [
  {
    title: "O cliente pede o orçamento",
    body: "Ele escolhe o serviço, informa o nome e descreve o que o aparelho precisa.",
  },
  {
    title: "A localização é informada",
    body: "O cliente pode usar a localização do navegador ou digitar o bairro e o CEP. O site usa esse dado para preencher o endereço e identificar a região do atendimento.",
  },
  {
    title: "O pedido é encaminhado",
    body: "A equipe confere a região e envia o contato ao prestador mais próximo. A geolocalização é opcional: o cliente também pode pedir apenas com bairro ou CEP.",
  },
  {
    title: "Orçamento e serviço",
    body: "Você combina o valor direto com o cliente. Se o serviço for fechado, a taxa da plataforma é de 20%.",
  },
];

const REQUIREMENTS = [
  "Atender na região do pedido.",
  "Ter WhatsApp para contato.",
  "Combinar valor, prazo e garantia direto com o cliente.",
  "Aceitar a taxa de 20% sobre serviços fechados.",
  "Responsabilizar-se pela execução e pela garantia do serviço.",
];

export const metadata: Metadata = {
  title: `Cadastro de prestador | ${SITE_NAME}`,
  description:
    "Cadastre-se para atender pedidos de instalação, manutenção, higienização e conserto de ar-condicionado na sua região.",
  alternates: {
    canonical: `${SITE_URL}/prestadores/`,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE_URL}/prestadores/`,
    siteName: SITE_NAME,
    title: `Cadastro de prestador | ${SITE_NAME}`,
    description:
      "Atenda pedidos de ar-condicionado na sua região. Cadastro gratuito e taxa de 20% sobre o serviço fechado.",
  },
};

export default function ProvidersPage() {
  return (
    <div id="topo" className="flex-1">
      <SiteHeader quoteHref={`${BASE_PATH}/#orcamento`} />

      <main>
        <section className="relative isolate overflow-hidden bg-azul-950 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(65,128,171,0.38),transparent_62%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-azul-700/60"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-azul-300">
                Para prestadores
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Atenda os pedidos de{" "}
                <span className="sm:whitespace-nowrap">ar-condicionado</span> da
                sua região
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-azul-100 sm:text-lg">
                A Clima Sul recebe pedidos de instalação, manutenção,
                higienização e conserto. Quando um cliente pede um orçamento, a
                localização informada ajuda a direcionar o atendimento ao
                prestador mais próximo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cadastro"
                  className="group inline-flex items-center justify-center gap-2 rounded-frame bg-azul-600 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-azul-700 active:translate-y-0"
                >
                  Quero me cadastrar
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-frame border border-white/40 px-6 py-3.5 text-base font-medium text-white transition-colors duration-150 hover:border-azul-300 hover:text-azul-100"
                >
                  Ver como funciona
                </a>
              </div>
            </div>

            <div className="rounded-frame border border-azul-700/70 bg-white/5 p-6 backdrop-blur-sm">
              <p className="font-display text-6xl leading-none text-white">
                20%
              </p>
              <p className="mt-3 text-sm leading-relaxed text-azul-100">
                sobre o valor do serviço fechado por indicação da Clima Sul.
              </p>
              <div className="mt-6 border-t border-azul-700/70 pt-4 text-sm leading-relaxed text-azul-100">
                Cadastro gratuito.
                <br />
                Você define seu preço.
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="scroll-mt-28 border-t border-azul-200 bg-white"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 lg:py-28">
            <div data-reveal="left">
              <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                Como funciona
              </h2>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-azul-700">
                O cliente continua pedindo o orçamento pelo site. A diferença é
                que o pedido passa a ser direcionado para quem atende a região.
              </p>
              <p className="mt-6 border-l-2 border-azul-300 pl-4 text-sm leading-relaxed text-azul-700">
                O cadastro não garante pedidos: o encaminhamento depende da
                região e da disponibilidade.
              </p>
            </div>

            <ol className="border-t border-azul-200">
              {PROVIDER_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ transitionDelay: `${index * 70}ms` }}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-azul-200 py-6 sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
                >
                  <span className="row-span-2 font-display text-sm text-azul-700 sm:row-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-azul-950">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-azul-700 sm:col-start-3 sm:row-start-1">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 lg:py-24">
            <div data-reveal="left">
              <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                Para participar
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-azul-700">
                O cadastro é para técnicos e empresas que já atendem
                ar-condicionado na região.
              </p>
            </div>

            <ul className="border-t border-azul-200">
              {REQUIREMENTS.map((requirement, index) => (
                <li
                  key={requirement}
                  data-reveal
                  style={{ transitionDelay: `${index * 60}ms` }}
                  className="flex items-start gap-3 border-b border-azul-200 py-4 text-sm leading-relaxed text-azul-700"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-azul-600"
                    strokeWidth={2.5}
                  />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-4 pb-20 sm:px-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16 lg:pt-8 lg:pb-28">
            <div className="self-start lg:sticky lg:top-28">
              <div data-reveal="left">
                <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                  Cadastre-se
                </h2>
                <p className="mt-4 max-w-xs text-base leading-relaxed text-azul-700">
                  Preencha os dados. O envio abre o WhatsApp com o cadastro
                  pronto; você confere antes de enviar.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-azul-700">
                  A equipe confere as informações e entra em contato. A taxa de
                  20% só é cobrada quando o serviço é fechado.
                </p>
              </div>
            </div>

            <ProviderForm />
          </div>
        </section>
      </main>

      <SiteFooter description="Cadastro de prestadores para atendimento em domicílio. O serviço é combinado direto entre o prestador e o cliente." />

      <PageMotion />
    </div>
  );
}
