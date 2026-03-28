"use client";

import { useEffect } from "react";

export function BackgroundMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const scroll = window.scrollY || 0;
      const height = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scroll / height, 1);

      root.style.setProperty("--bg-progress", progress.toFixed(3));
      root.style.setProperty("--bg-shift", `${Math.min(scroll * 0.08, 140)}px`);
      root.style.setProperty("--bg-drift", `${Math.min(scroll * 0.04, 90)}px`);
    };

    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return null;
}
