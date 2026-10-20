"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToForm() {
    document.getElementById("orcamento")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const firstField = document.getElementById("location");
    window.setTimeout(() => firstField?.focus({ preventScroll: true }), 450);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-colors duration-300",
        scrolled
          ? "border-b border-gelo-100/10 bg-carvao-950/85 backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#topo"
          className="flex items-center gap-2.5 rounded-md"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-lg bg-ciano-500 text-carvao-950"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-gelo-50">
              Clima Sul
            </span>
            <span className="font-mono text-[11px] text-gelo-500">
              técnicos de ar-condicionado
            </span>
          </span>
        </a>

        <button
          type="button"
          onClick={goToForm}
          className="rounded-full border border-gelo-100/20 px-4 py-2 text-sm font-medium text-gelo-100 transition-colors hover:border-ambar-500 hover:text-ambar-400"
        >
          Pedir orçamento
        </button>
      </div>
    </header>
  );
}
