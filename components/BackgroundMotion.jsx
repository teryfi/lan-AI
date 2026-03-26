"use client";

import { useEffect } from "react";

export function BackgroundMotion() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const scroll = window.scrollY || 0;
      const height = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scroll / height, 1);

      root.style.setProperty("--bg-progress", progress.toFixed(3));
      root.style.setProperty("--bg-shift", `${Math.min(scroll * 0.08, 140)}px`);
      root.style.setProperty("--bg-drift", `${Math.min(scroll * 0.04, 90)}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
