import { HeroMedia } from "@/components/site/hero-media";
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
          <div className="absolute inset-0 bg-azul-950/35" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-t from-azul-950 via-azul-950/65 to-azul-950/15"
            aria-hidden
          />

          <div className="hero-viewport relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:pb-20">
            <h1 className="max-w-4xl font-display text-[2.75rem] leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Ar-condicionado resolvido por quem atende no seu bairro
            </h1>

            <div className="mt-8 grid gap-6 border-t border-azul-300/50 pt-6 sm:mt-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10">
              <p className="max-w-md text-base leading-relaxed text-azul-100 sm:text-lg">
                Instalação, revisão, higienização e conserto. Diga o que precisa
                e onde está; a conversa segue no WhatsApp.
              </p>
              <a
                href="#orcamento"
                className="inline-flex w-full items-center justify-center rounded-frame bg-azul-600 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-azul-700 sm:w-fit"
              >
                Pedir orçamento
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-16 pb-16 sm:px-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16 lg:pt-24 lg:pb-20">
            <div className="self-start lg:sticky lg:top-28">
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

            <QuoteForm />
          </div>
        </section>

        <section className="border-t border-azul-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 lg:py-28">
            <div>
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
            <div>
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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <p className="max-w-md text-sm leading-relaxed text-azul-700">
            Atendimento em domicílio. Envie a solicitação e o técnico da sua
            região responde no WhatsApp.
          </p>
          <p className="font-display text-lg text-azul-950">Clima Sul</p>
        </div>
      </footer>
    </div>
  );
}
