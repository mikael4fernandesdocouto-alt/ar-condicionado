import { SERVICES } from "@/lib/services";

export function ServiceList() {
  return (
    <ol className="border-t border-azul-200">
      {SERVICES.map((service, index) => (
        <li
          key={service.id}
          data-reveal
          style={{ transitionDelay: `${index * 70}ms` }}
          className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-azul-200 py-6 sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-6"
        >
          <span className="row-span-2 font-display text-sm text-azul-700 transition-transform duration-200 group-hover:translate-x-0.5 sm:row-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-medium text-azul-950">
              {service.label}
            </h3>
            <p className="mt-1 text-sm text-azul-700">{service.priceFrom}</p>
          </div>
          <p className="text-sm leading-relaxed text-azul-700 sm:col-start-3 sm:row-start-1">
            {service.summary}
          </p>
        </li>
      ))}
    </ol>
  );
}
