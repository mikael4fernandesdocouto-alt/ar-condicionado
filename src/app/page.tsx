import { ArrowUpRight } from "lucide-react";
import { HeroMedia } from "@/components/site/hero-media";
import { PageMotion } from "@/components/site/page-motion";
import { QuoteForm } from "@/components/site/quote-form";
import { ServiceList } from "@/components/site/service-list";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Steps } from "@/components/site/steps";
import { SERVICES } from "@/lib/services";
import { AREA_SERVED, CONTACT_PHONE, SITE_NAME, SITE_URL } from "@/lib/site";

const TESTIMONIAL_EXAMPLES = [
  {
    name: "Mariana S.",
    service: "Exemplo fictício · Higienização",
    quote:
      "O técnico chegou rápido, foi atencioso e explicou cada etapa da limpeza.",
  },
  {
    name: "Carlos R.",
    service: "Exemplo fictício · Conserto",
    quote:
      "Foi cuidadoso no atendimento, avaliou o aparelho e explicou o orçamento antes de começar.",
  },
  {
    name: "Fernanda M.",
    service: "Exemplo fictício · Instalação",
    quote:
      "Chegou no horário combinado, tirou minhas dúvidas e deixou tudo organizado.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: SITE_NAME,
  description:
    "Instalação, manutenção preventiva, higienização e conserto de ar-condicionado split em atendimento domiciliar.",
  url: SITE_URL,
  telephone: CONTACT_PHONE,
  areaServed: {
    "@type": "AdministrativeArea",
    name: AREA_SERVED,
  },
  knowsLanguage: "pt-BR",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de ar-condicionado",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.label,
        description: service.summary,
      },
    })),
  },
};

export default function Home() {
  return (
    <div id="topo" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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

        <section
          aria-labelledby="avaliacoes-title"
          className="border-t border-azul-200 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl" data-reveal="left">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-azul-700">
                Exemplos fictícios
              </p>
              <h2
                id="avaliacoes-title"
                className="mt-3 font-display text-4xl leading-none text-azul-950 sm:text-5xl"
              >
                Avaliações de clientes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-azul-700">
                Os relatos abaixo são apenas exemplos de texto, não são avaliações reais.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {TESTIMONIAL_EXAMPLES.map((review, index) => (
                <li
                  key={review.name}
                  data-reveal
                  style={{ transitionDelay: `${index * 70}ms` }}
                  className="flex h-full flex-col border border-azul-200 bg-azul-100 p-6 sm:p-7"
                >
                  <p className="text-base leading-relaxed text-azul-950">
                    “{review.quote}”
                  </p>
                  <div className="mt-8 border-t border-azul-200 pt-4">
                    <p className="font-medium text-azul-950">{review.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-azul-700">
                      {review.service}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-azul-200 bg-azul-100">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-28">
            <div data-reveal="left">
              <h2 className="font-display text-4xl leading-none text-azul-950 sm:text-5xl">
                O que fazemos
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-azul-700">
                Atendimento em domicílio para aparelhos split residenciais. O
                valor é combinado direto com o técnico, depois de ver o modelo,
                o local da instalação e o estado do equipamento — sem surpresa.
              </p>
            </div>

            <ServiceList />
          </div>
        </section>
      </main>

      <SiteFooter />

      <PageMotion />
    </div>
  );
}
