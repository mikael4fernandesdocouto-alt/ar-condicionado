"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
      data-reveal="right"
      className="scroll-mt-28 rounded-frame border border-azul-200 bg-white p-5 sm:p-7"
    >
      <div className="flex flex-col gap-8">
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-azul-950">
            O que o aparelho precisa?
          </legend>
          <div className="border-t border-azul-200">
            {SERVICES.map((service, index) => {
              const active = serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setServiceId(service.id)}
                  className={cn(
                    "group flex w-full items-start gap-4 border-b border-azul-200 py-4 text-left transition-colors duration-150",
                    active ? "bg-azul-300/25" : "hover:bg-azul-100/70",
                  )}
                >
                  <span className="w-6 shrink-0 pt-0.5 font-display text-sm text-azul-700 transition-transform duration-200 group-hover:translate-x-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-base font-medium text-azul-950">
                        {service.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex h-3 w-3 shrink-0 items-center justify-center rounded-frame border transition-[background-color,border-color,transform] duration-200 group-hover:scale-110",
                          active
                            ? "scale-110 border-azul-600 bg-azul-600"
                            : "border-azul-300",
                        )}
                      >
                        {active ? (
                          <Check
                            aria-hidden
                            strokeWidth={3}
                            className="size-2.5 text-white"
                          />
                        ) : null}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-azul-700">
                      {service.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {errors.serviceId ? (
            <p
              role="alert"
              className="border-l-2 border-azul-700 pl-2 text-sm font-medium text-azul-700"
            >
              {errors.serviceId}
            </p>
          ) : null}
        </fieldset>

        <div className="flex flex-col gap-3">
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
            className="w-fit rounded-frame border border-azul-300 px-4 py-2 text-sm font-medium text-azul-700 transition-colors duration-150 hover:border-azul-600 hover:text-azul-950 disabled:opacity-60"
          >
            {locating ? "Buscando sua localização..." : "Usar minha localização"}
          </button>

          <div aria-live="polite" className="min-h-6">
            {remote.address ? (
              <p className="text-sm text-azul-700">
                Sugestão:{" "}
                <button
                  type="button"
                  onClick={() => setLocation(remote.address)}
                  className="text-azul-700 underline decoration-azul-300 underline-offset-4 hover:text-azul-950"
                >
                  {remote.address}
                </button>
              </p>
            ) : null}
            {remote.message ? (
              <p className="text-sm text-azul-700">{remote.message}</p>
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

        <div className="flex flex-col gap-3 border-t border-azul-200 pt-6">
          <button
            type="submit"
            className="rounded-frame bg-azul-600 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-azul-700 active:translate-y-0"
          >
            Abrir WhatsApp com o pedido
          </button>
          <p className="text-sm leading-relaxed text-azul-700">
            Abrimos o WhatsApp com a sua mensagem pronta. Você confere e toca
            em enviar — nada é enviado sem você.
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
