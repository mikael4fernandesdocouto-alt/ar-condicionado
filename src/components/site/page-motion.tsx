"use client";

import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!items.length) return;

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            element.classList.remove("is-reveal-pending");
            element.classList.add("is-revealed");
            observer?.unobserve(element);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
    }

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

      if (inView || !observer) {
        item.classList.add("is-revealed");
        continue;
      }

      item.classList.add("is-reveal-pending");
      observer.observe(item);
    }

    return () => observer?.disconnect();
  }, []);

  return null;
}
