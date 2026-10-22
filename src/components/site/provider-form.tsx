"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { providerSchema, type ProviderForm } from "@/lib/provider-schema";
import { SERVICES, buildProviderWhatsAppLink, getService } from "@/lib/services";
import { Field, fieldClasses } from "./field";

type Errors = Partial<Record<keyof ProviderForm, string>>;

const TERMS = [
  "O cadastro é gratuito e não garante pedidos.",
  "A Clima Sul cobra 20% sobre o valor do serviço fechado a partir de um pedido recebido pela plataforma.",
  "O valor, o prazo e a garantia são combinados diretamente entre você e o cliente.",
  "Você é responsável pela execução, pela segurança e pela qualidade do serviço.",
  "A Clima Sul pode recusar ou suspender cadastros, e você pode solicitar a exclusão a qualquer momento.",
  "Seus dados são usados para contato e encaminhamento de pedidos, conforme a LGPD.",
  "As informações do cadastro devem ser verdadeiras e atualizadas.",
];

export function ProviderForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  function toggleService(id: string) {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = providerSchema.safeParse({
      name,
      company,
      region,
      whatsapp,
      email,
      services: selectedServices,
      message,
      terms,
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ProviderForm;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    const serviceLabels = parsed.data.services.map(
      (id) => getService(id)?.label ?? id,
    );
    const link = buildProviderWhatsAppLink({
      ...parsed.data,
      services: serviceLabels,
    });

    setErrors({});
    setSent(link);
    track("provider_whatsapp_open", {
      services: parsed.data.services.join(","),
    });
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      id="cadastro"
      onSubmit={handleSubmit}
      noValidate
      data-reveal="right"
      className="scroll-mt-28 rounded-frame border border-azul-200 bg-white p-5 sm:p-7"
    >
      <div className="flex flex-col gap-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Seu nome" htmlFor="provider-name" error={errors.name}>
            <input
              id="provider-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nome do responsável"
              className={fieldClasses(Boolean(errors.name))}
            />
          </Field>

          <Field
            label="Empresa"
            hint="opcional"
            htmlFor="provider-company"
            error={errors.company}
          >
            <input
              id="provider-company"
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Nome da empresa"
              className={fieldClasses(Boolean(errors.company))}
            />
          </Field>

          <Field
            label="Cidade e bairros que você atende"
            htmlFor="provider-region"
            error={errors.region}
          >
            <input
              id="provider-region"
              name="region"
              autoComplete="address-level2"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="Ex.: Juiz de Fora e região"
              className={fieldClasses(Boolean(errors.region))}
            />
          </Field>

          <Field
            label="WhatsApp"
            hint="com DDD"
            htmlFor="provider-whatsapp"
            error={errors.whatsapp}
          >
            <input
              id="provider-whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              placeholder="(35) 99999-9999"
              className={fieldClasses(Boolean(errors.whatsapp))}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field
              label="E-mail"
              hint="opcional"
              htmlFor="provider-email"
              error={errors.email}
            >
              <input
                id="provider-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@exemplo.com"
                className={fieldClasses(Boolean(errors.email))}
              />
            </Field>
          </div>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-azul-950">
            Serviços que você atende
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const active = selectedServices.includes(service.id);
              return (
                <label
                  key={service.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-frame border p-3 transition-colors duration-150",
                    active
                      ? "border-azul-600 bg-azul-300/15"
                      : "border-azul-200 hover:bg-azul-100/70",
                  )}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    checked={active}
                    onChange={() => toggleService(service.id)}
                    className="mt-1 size-4 shrink-0 accent-azul-600"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-azul-950">
                      {service.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-azul-700">
                      {service.summary}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.services ? (
            <p
              role="alert"
              className="border-l-2 border-azul-700 pl-2 text-sm font-medium text-azul-700"
            >
              {errors.services}
            </p>
          ) : null}
        </fieldset>

        <Field
          label="Observações"
          hint="opcional"
          htmlFor="provider-message"
          error={errors.message}
        >
          <textarea
            id="provider-message"
            name="message"
            rows={3}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ex.: atendo também instalação de split e tenho equipe para higienização."
            className={cn(fieldClasses(Boolean(errors.message)), "resize-y")}
          />
        </Field>

        <div
          id="termos"
          className="scroll-mt-28 rounded-frame border border-azul-200 bg-azul-100/60 p-4"
        >
          <h3 className="text-sm font-semibold text-azul-950">
            Termos do cadastro
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-azul-700">
            {TERMS.map((term) => (
              <li key={term} className="flex gap-2">
                <Check
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-azul-600"
                  strokeWidth={2.5}
                />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-azul-200 pt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-azul-700">
            <input
              type="checkbox"
              name="terms"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-azul-600"
            />
            <span>
              Li e aceito os termos acima, incluindo a taxa de{" "}
              <strong className="font-semibold text-azul-950">20%</strong> sobre
              o valor do serviço fechado.
            </span>
          </label>
          {errors.terms ? (
            <p
              role="alert"
              className="border-l-2 border-azul-700 pl-2 text-sm font-medium text-azul-700"
            >
              {errors.terms}
            </p>
          ) : null}

          <button
            type="submit"
            className="rounded-frame bg-azul-600 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-azul-700 active:translate-y-0"
          >
            Enviar cadastro pelo WhatsApp
          </button>
          <p className="text-sm leading-relaxed text-azul-700">
            O envio abre o WhatsApp com seus dados preenchidos. Você confere e
            toca em enviar.
          </p>
          {sent ? (
            <p className="text-sm text-azul-700">
              WhatsApp aberto em outra aba.{" "}
              <a
                href={sent}
                target="_blank"
                rel="noopener noreferrer"
                className="text-azul-700 underline decoration-azul-300 underline-offset-4 hover:text-azul-950"
              >
                Abrir de novo
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
