type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    gtag?: (command: string, event: string, params?: EventProps) => void;
  }
}

export function track(event: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });
  window.plausible?.(event, { props });
  window.gtag?.("event", event, props);
}
