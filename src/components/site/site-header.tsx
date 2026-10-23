"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader({ quoteHref }: { quoteHref?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function goToForm() {
    track("cta_orcamento_click", { origem: "header" });
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    document.getElementById("orcamento")?.scrollIntoView({
      behavior,
      block: "start",
    });
    const firstField = document.getElementById("location");
    window.setTimeout(
      () => firstField?.focus({ preventScroll: true }),
      behavior === "auto" ? 0 : 450,
    );
  }

  const quoteClasses = cn(
    "rounded-frame border px-3 py-2 text-xs font-medium transition-colors duration-150 sm:px-3.5 sm:text-sm",
    scrolled
      ? "border-azul-200 text-azul-700 hover:border-azul-600 hover:text-azul-950"
      : "border-white/40 text-white hover:border-azul-300 hover:text-azul-100",
  );

  return (
    <header
      className={cn(
        "site-header-enter fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-azul-200 bg-white/95 backdrop-blur-sm"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {quoteHref ? (
          <Link
            href="/"
            aria-label={`${SITE_NAME} — página inicial`}
            className="flex shrink-0 flex-col leading-none"
          >
            <span
              className={cn(
                "font-display text-xl tracking-tight",
                scrolled ? "text-azul-950" : "text-white",
              )}
            >
              {SITE_NAME}
            </span>
            <span
              className={cn(
                "mt-1 text-[11px]",
                scrolled ? "text-azul-700" : "text-azul-300",
              )}
            >
              técnicos de ar-condicionado
            </span>
          </Link>
        ) : (
          <a
            href="#topo"
            className="flex shrink-0 flex-col leading-none"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
              });
            }}
          >
            <span
              className={cn(
                "font-display text-xl tracking-tight",
                scrolled ? "text-azul-950" : "text-white",
              )}
            >
              {SITE_NAME}
            </span>
            <span
              className={cn(
                "mt-1 text-[11px]",
                scrolled ? "text-azul-700" : "text-azul-300",
              )}
            >
              técnicos de ar-condicionado
            </span>
          </a>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href={quoteHref ? "/" : "/prestadores"}
            className={cn(
              "text-xs font-medium transition-colors duration-150 sm:text-sm",
              scrolled
                ? "text-azul-700 hover:text-azul-950"
                : "text-azul-100 hover:text-white",
            )}
          >
            {quoteHref ? "Página inicial" : "Sou prestador"}
          </Link>

          {quoteHref ? (
            <a href={quoteHref} className={quoteClasses}>
              Orçamento
            </a>
          ) : (
            <button type="button" onClick={goToForm} className={quoteClasses}>
              Orçamento
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
