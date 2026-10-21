import { ArrowUpRight } from "lucide-react";
import { HeroMedia } from "@/components/site/hero-media";
import { PageMotion } from "@/components/site/page-motion";
import { QuoteForm } from "@/components/site/quote-form";
import { ServiceList } from "@/components/site/service-list";
import { SiteHeader } from "@/components/site/site-header";
import { Steps } from "@/components/site/steps";

export default function Home() {
  return (
    <div id="topo" className="flex-1">
      <SiteHeader />

      <main>
        <section className="hero-viewport relative isolate overflow-hidden">
          <HeroMedia />
          <div className="hero-shade absolute inset-0" aria-hidden />

          <div className="hero-viewport relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pt-28 pb-12 sm:justify-center sm:px-8 sm:pb-16 lg:pb-20">
            <div className="max-w-2xl">
              <h1 className="hero-title font-display text-[2.75rem] leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Ar-condicionado resolvido por quem atende no seu bairro
              </h1>

              <div className="mt-7 max-w-md">
                <div
                  aria-hidden
                  className="hero-rule h-px w-full origin-left bg-azul-300/60"
                />
                <div className="hero-copy pt-6">
                  <p className="text-base leading-relaxed text-azul-100 sm:text-lg">
                    Instalação, revisão, higienização e conserto. Diga o que
                    precisa e onde está; a conversa segue no WhatsApp.
                  </p>
                  <a
                    href="#orcamento"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-frame bg-azul-600 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-azul-700 active:translate-y-0 sm:w-fit"
                  >
                    Pedir orçamento
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-16 pb-16 sm:px-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16 lg:pt-24 lg:pb-20">
            <div className="self-start lg:sticky lg:top-28">
              <div data-reveal="left">
                <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                  Peça seu orçamento
                </h2>
                <p className="mt-4 max-w-xs text-base leading-relaxed text-azul-700">
                  Escolha o serviço, informe a região e descreva o problema. A
                  mensagem chega pronta no WhatsApp.
                </p>
                <ul className="mt-8 border-t border-azul-200">
                  {[
                    "Sem cadastro",
                    "Sem taxa de visita",
                    "Resposta pelo WhatsApp",
                  ].map((item) => (
                    <li
                      key={item}
                      className="border-b border-azul-200 py-3 text-sm text-azul-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <QuoteForm />
          </div>
        </section>

        <section className="border-t border-azul-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 lg:py-28">
            <div data-reveal="left">
              <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                Como funciona
              </h2>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-azul-700">
                Do pedido ao técnico, sem cadastro e sem taxa de visita.
              </p>
            </div>

            <Steps />
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-28">
            <div data-reveal="left">
              <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                O que fazemos
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-azul-700">
                Valores de referência para aparelhos split residenciais. O
                orçamento final depende do modelo, do local da instalação e do
                estado do equipamento — combinamos antes de começar.
              </p>
            </div>

            <ServiceList />
          </div>
        </section>
      </main>

      <footer className="border-t border-azul-200 bg-white">
        <div
          data-reveal
          className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8"
        >
          <p className="max-w-md text-sm leading-relaxed text-azul-700">
            Atendimento em domicílio. Envie a solicitação e o técnico da sua
            região responde no WhatsApp.
          </p>
          <p className="font-display text-lg text-azul-950">Clima Sul</p>
        </div>
      </footer>

      <PageMotion />
    </div>
  );
}
