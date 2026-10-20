import { SERVICES } from "@/lib/services";

export function ServiceList() {
  return (
    <div className="divide-y divide-gelo-100/10 border-y border-gelo-100/10">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="grid gap-2 py-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
        >
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gelo-50">
              {service.label}
            </h3>
            <p className="mt-1 font-mono text-xs text-gelo-500">
              {service.priceFrom}
            </p>
          </div>
          <p className="text-base leading-relaxed text-gelo-300">
            {service.summary}
          </p>
        </div>
      ))}
    </div>
  );
}
