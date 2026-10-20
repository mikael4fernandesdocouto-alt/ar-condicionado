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
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-gelo-100"
        >
          {label}
        </label>
        {hint ? (
          <span className="font-mono text-[11px] text-gelo-500">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-ambar-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClasses = (hasError?: boolean) =>
  cn(
    "w-full rounded-xl border bg-carvao-800 px-4 py-3 text-base text-gelo-50",
    "placeholder:text-gelo-500/80 transition-colors",
    "focus:border-ciano-400 focus:outline-none",
    hasError ? "border-ambar-500/70" : "border-gelo-100/12",
  );
