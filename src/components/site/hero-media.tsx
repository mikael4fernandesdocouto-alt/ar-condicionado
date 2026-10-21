"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Foto: Pexels #18495294 - "A Desk in an Office" - Soulkid Photography
// https://www.pexels.com/photo/a-desk-in-an-office-18495294/
const HERO_VIDEO_SRC = "";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

function asset(path: string) {
  return `${basePath}${path}`;
}

export function HeroMedia() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (!HERO_VIDEO_SRC) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanPlayVideo(!query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <Image
        src={asset("/hero/hero.jpg")}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />

      {HERO_VIDEO_SRC && canPlayVideo ? (
        <video
          src={asset(HERO_VIDEO_SRC)}
          poster={asset("/hero/hero.jpg")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}
