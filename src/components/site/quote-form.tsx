"use client";

import { useState } from "react";
import { SERVICES, getService } from "@/lib/services";
import { requestSchema, type RequestForm } from "@/lib/request-schema";
import { cn } from "@/lib/cn";
import { Field, fieldClasses } from "./field";
import { buildWhatsAppLink } from "@/lib/services";

type Errors = Partial<Record<keyof RequestForm, string>>;

export function QuoteForm() {
  const [serviceId, setServiceId] = useState<string>("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [remote, setRemote] = useState({
    message: "",
    address: "",
  });
  const [locating, setLocating] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  async function fillLocation() {
    if (!("geolocation" in navigator)) {
      setRemote((prev) => ({
        ...prev,
        message: "Seu navegador não permite usar a localização. Digite o CEP ou o bairro.",
      }));
      return;
    }

    setLocating(true);
    setRemote({ message: "", address: "" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`,
          );
          if (!response.ok) throw new Error("reverse failed");
          const data = (await response.json()) as {
            address?: Record<string, string>;
          };
          const address = data.address ?? {};
          const parts = [
            address.road,
            address.suburb ?? address.neighbourhood,
            address.city ?? address.town ?? address.village,
            address.state,
          ].filter(Boolean);
          const resolved = parts.join(", ");
          setRemote({
            message: resolved
              ? "Localização encontrada. Confira e ajuste se precisar."
              : "Não conseguimos detalhar o endereço. Digite o CEP ou o bairro.",
            address: resolved,
          });
          if (resolved) setLocation(resolved);
        } catch {
          setRemote({
            message:
              "A busca pelo endereço falhou. Digite o CEP ou o bairro que fica mais rápido.",
            address: "",
          });
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        const denied = error.code === error.PERMISSION_DENIED;
        setRemote({
          message: denied
            ? "Sem permissão para a localização. Digite o CEP ou o bairro."
            : "Não foi possível obter a localização. Digite o CEP ou o bairro.",
          address: "",
        });
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = requestSchema.safeParse({
      serviceId,
      location,
      name,
      details,
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RequestForm;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    const service = getService(parsed.data.serviceId);
    const link = buildWhatsAppLink({
      service: service?.whatsappLabel ?? parsed.data.serviceId,
      location: parsed.data.location,
      name: parsed.data.name,
      details: parsed.data.details,
    });

    setSent(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      id="orcamento"
      onSubmit={handleSubmit}
      noValidate
      className="scroll-mt-24 rounded-3xl border border-gelo-100/10 bg-carvao-800/70 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-gelo-100">
            O que o aparelho precisa?
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const active = serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setServiceId(service.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-colors",
                    active
                      ? "border-ciano-500 bg-ciano-500/10"
                      : "border-gelo-100/12 bg-carvao-800 hover:border-gelo-100/25",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-gelo-50">
                      {service.label}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "h-2.5 w-2.5 shrink-0 rounded-full transition-colors",
                        active ? "bg-ciano-400" : "bg-gelo-100/20",
                      )}
                    />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-gelo-300">
                    {service.summary}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.serviceId ? (
            <p role="alert" className="text-sm text-ambar-400">
              {errors.serviceId}
            </p>
          ) : null}
        </fieldset>

        <div className="flex flex-col gap-2.5">
          <Field
            label="Onde você está"
            hint="bairro, cidade ou CEP"
            htmlFor="location"
            error={errors.location}
          >
            <input
              id="location"
              name="location"
              autoComplete="address-level2"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Ex.: Ponta Negra, Natal ou 59075-000"
              className={fieldClasses(Boolean(errors.location))}
            />
          </Field>

          <button
            type="button"
            onClick={fillLocation}
            disabled={locating}
            className="self-start rounded-full border border-gelo-100/20 px-4 py-2 text-sm font-medium text-gelo-100 transition-colors hover:border-ciano-400 hover:text-ciano-400 disabled:opacity-60"
          >
            {locating ? "Buscando sua localização..." : "Usar minha localização"}
          </button>

          <div aria-live="polite" className="min-h-6">
            {remote.address ? (
              <p className="text-sm text-gelo-300">
                Sugestão:{" "}
                <button
                  type="button"
                  onClick={() => setLocation(remote.address)}
                  className="text-ciano-400 underline decoration-dotted underline-offset-4"
                >
                  {remote.address}
                </button>
              </p>
            ) : null}
            {remote.message ? (
              <p className="text-sm text-gelo-500">{remote.message}</p>
            ) : null}
          </div>
        </div>

        <Field label="Seu nome" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como o técnico deve te chamar"
            className={fieldClasses(Boolean(errors.name))}
          />
        </Field>

        <Field
          label="O que está acontecendo"
          hint="aparelho, marca e sintoma"
          htmlFor="details"
          error={errors.details}
        >
          <textarea
            id="details"
            name="details"
            rows={4}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Ex.: Split 12.000 BTUs da Midea, liga mas não gela e está pingando água na parede."
            className={cn(fieldClasses(Boolean(errors.details)), "resize-y")}
          />
        </Field>

        <div className="flex flex-col gap-3 border-t border-gelo-100/10 pt-6">
          <button
            type="submit"
            className="rounded-full bg-ambar-500 px-6 py-3.5 text-base font-semibold text-carvao-950 transition-colors hover:bg-ambar-400"
          >
            Falar com um técnico no WhatsApp
          </button>
          <p className="text-sm leading-relaxed text-gelo-500">
            Abrimos o WhatsApp com a sua mensagem pronta. Você confere e toca
            em enviar — nada é enviado sem você.
          </p>
          {sent ? (
            <p className="text-sm text-ciano-400">
              WhatsApp aberto em outra aba.{" "}
              <a
                href={sent}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4"
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
