"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function BackgroundMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.innerWidth <= 768;
    const disableForRoute = pathname === "/feed" || pathname === "/profile";

    if (prefersReducedMotion || isMobileViewport || disableForRoute) {
      root.style.setProperty("--bg-progress", "0");
      root.style.setProperty("--bg-shift", "0px");
      root.style.setProperty("--bg-drift", "0px");
      return;
    }

    let frameId = 0;
    let scheduled = false;
    let previousProgress = "";
    let previousShift = "";
    let previousDrift = "";

    const update = () => {
      scheduled = false;
      const scroll = window.scrollY || 0;
      const height = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scroll / height, 1);
      const nextProgress = progress.toFixed(3);
      const nextShift = `${Math.min(scroll * 0.08, 140)}px`;
      const nextDrift = `${Math.min(scroll * 0.04, 90)}px`;

      if (nextProgress !== previousProgress) {
        root.style.setProperty("--bg-progress", nextProgress);
        previousProgress = nextProgress;
      }

      if (nextShift !== previousShift) {
        root.style.setProperty("--bg-shift", nextShift);
        previousShift = nextShift;
      }

      if (nextDrift !== previousDrift) {
        root.style.setProperty("--bg-drift", nextDrift);
        previousDrift = nextDrift;
      }
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
  }, [pathname]);

  return null;
}
