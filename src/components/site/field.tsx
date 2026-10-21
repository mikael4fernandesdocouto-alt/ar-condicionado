"use client";

import { cn } from "@/lib/cn";

export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-azul-950 transition-colors duration-150 group-focus-within:text-azul-600"
        >
          {label}
        </label>
        {hint ? (
          <span className="text-xs text-azul-700 transition-colors duration-150 group-focus-within:text-azul-600">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          role="alert"
          className="border-l-2 border-azul-700 pl-2 text-sm font-medium text-azul-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClasses = (hasError?: boolean) =>
  cn(
    "w-full rounded-frame border bg-azul-100/40 px-3.5 py-3 text-base text-azul-950",
    "placeholder:text-azul-600 transition-colors duration-150 focus:bg-white",
    "focus:border-azul-600",
    hasError
      ? "border-azul-700 ring-1 ring-azul-700/30"
      : "border-azul-200",
  );
