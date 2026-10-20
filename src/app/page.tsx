import { QuoteForm } from "@/components/site/quote-form";
import { ServiceList } from "@/components/site/service-list";
import { Steps } from "@/components/site/steps";
import { SiteHeader } from "@/components/site/site-header";

const FACTS = [
  { value: "4", label: "serviços com preço combinado antes" },
  { value: "24h", label: "retorno no WhatsApp em dia útil" },
  { value: "90 dias", label: "de garantia no serviço feito" },
];

export default function Home() {
  return (
    <div id="topo" className="flex-1">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-5">
        <section className="grain rise border-b border-gelo-100/10 pt-16 pb-14 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
            <div className="flex flex-col gap-7">
              <p className="font-mono text-xs text-ciano-400">
                instaladores credenciados · atendimento em domicílio
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-gelo-50 sm:text-5xl lg:text-6xl">
                Seu ar-condicionado resolvido hoje, por quem atende no seu
                bairro
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-gelo-300">
                Instalação, limpeza, revisão e conserto. Diga o que precisa e
                onde você está — nós encaminhamos o técnico mais próximo da sua
                região.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#orcamento"
                  className="rounded-full bg-ambar-500 px-6 py-3.5 text-base font-semibold text-carvao-950 transition-colors hover:bg-ambar-400"
                >
                  Pedir orçamento agora
                </a>
                <span className="text-sm text-gelo-500">
                  sem cadastro, sem taxa de visita
                </span>
              </div>
              <dl className="mt-2 grid gap-6 border-t border-gelo-100/10 pt-7 sm:grid-cols-3">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-2xl font-semibold tracking-tight text-gelo-50">
                      {fact.value}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gelo-500">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:pt-2">
              <h2 className="text-xl font-semibold tracking-tight text-gelo-50">
                Peça seu orçamento
              </h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-gelo-300">
                Os profissionais mais próximos da sua região serão indicados
                para o seu atendimento.
              </p>
              <QuoteForm />
            </div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gelo-50 sm:text-4xl">
            Como funciona
          </h2>
          <div className="mt-9">
            <Steps />
          </div>
        </section>

        <section className="border-t border-gelo-100/10 py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-gelo-50 sm:text-4xl">
            O que fazemos
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gelo-300">
            Valores de referência para aparelhos split residenciais. O
            orçamento final depende do modelo, do local da instalação e do
            estado do equipamento — combinamos antes de começar.
          </p>
          <div className="mt-9">
            <ServiceList />
          </div>
        </section>
      </main>

      <footer className="border-t border-gelo-100/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gelo-500">
            Atendimento em domicílio. Envie a solicitação e o técnico da sua
            região responde no WhatsApp.
          </p>
          <p className="font-mono text-xs text-gelo-500">
            Clima Sul · ar-condicionado
          </p>
        </div>
      </footer>
    </div>
  );
}
