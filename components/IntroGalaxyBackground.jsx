"use client";

import { useEffect, useRef } from "react";

function createStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 1.05 + 0.35,
    alpha: Math.random() * 0.4 + 0.24,
    speed: Math.random() * 0.00024 + 0.00004,
    depth: Math.random() * 0.85 + 0.2,
    hue: 198 + Math.random() * 24
  }));
}

function createStreaks(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 1.2 - 0.1,
    y: Math.random() * 1.2 - 0.1,
    length: Math.random() * 54 + 24,
    speedX: Math.random() * 0.0018 + 0.0009,
    speedY: Math.random() * 0.0032 + 0.0016,
    alpha: Math.random() * 0.12 + 0.05,
    width: Math.random() * 1.5 + 0.7,
    hue: 198 + Math.random() * 18
  }));
}

export function IntroGalaxyBackground(props) {
  const ctnDom = useRef(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0);
  const smoothMouseActive = useRef(0);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return undefined;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const stars = createStars(140);
    const streaks = createStreaks(9);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animateId = 0;

    const resize = () => {
      const rect = ctn.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGlow = (x, y, radius, color, alpha) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `${color}${alpha})`);
      gradient.addColorStop(0.38, `${color}${alpha * 0.46})`);
      gradient.addColorStop(0.72, `${color}${alpha * 0.12})`);
      gradient.addColorStop(1, `${color}0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const update = () => {
      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      const time = performance.now() * 0.001;
      const mouseX = smoothMousePos.current.x * width;
      const mouseY = (1 - smoothMousePos.current.y) * height;
      const mouseActive = smoothMouseActive.current;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(4, 9, 22, 0.97)";
      ctx.fillRect(0, 0, width, height);

      drawGlow(
        width * 0.7 + (mouseX - width * 0.5) * 0.12,
        height * 0.22 + (mouseY - height * 0.5) * 0.06,
        Math.min(width, height) * 0.5,
        "rgba(52, 111, 255, ",
        0.16 + mouseActive * 0.03
      );
      drawGlow(
        width * 0.77 + (mouseX - width * 0.5) * 0.06,
        height * 0.5 + (mouseY - height * 0.5) * 0.04,
        Math.min(width, height) * 0.2,
        "rgba(66, 170, 255, ",
        0.09 + mouseActive * 0.016
      );
      drawGlow(
        width * 0.18 + (mouseX - width * 0.5) * 0.05,
        height * 0.8 + (mouseY - height * 0.5) * 0.03,
        Math.min(width, height) * 0.16,
        "rgba(31, 197, 226, ",
        0.06 + mouseActive * 0.012
      );
      drawGlow(
        width * 0.52 + (mouseX - width * 0.5) * 0.05,
        height * 0.88 + (mouseY - height * 0.5) * 0.03,
        Math.min(width, height) * 0.14,
        "rgba(92, 170, 255, ",
        0.045 + mouseActive * 0.01
      );
      drawGlow(
        mouseX,
        mouseY,
        Math.min(width, height) * (0.045 + mouseActive * 0.015),
        "rgba(110, 200, 255, ",
        0.028 + mouseActive * 0.022
      );

      stars.forEach((star, index) => {
        const drift = Math.sin(time * (0.45 + star.depth) + index) * 0.0022;
        const twinkle = 0.68 + Math.sin(time * (1.15 + star.depth) + index * 1.7) * 0.32;
        const parallaxX = (smoothMousePos.current.x - 0.5) * 18 * star.depth;
        const parallaxY = (smoothMousePos.current.y - 0.5) * -12 * star.depth;

        star.y += star.speed;
        if (star.y > 1.08) {
          star.y = -0.08;
          star.x = Math.random();
        }

        const x = star.x * width + parallaxX + drift * width;
        const y = star.y * height + parallaxY;
        const radius = star.size * (0.82 + twinkle * 0.34);

        ctx.fillStyle = `hsla(${star.hue}, 82%, 90%, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (radius > 0.95) {
          ctx.fillStyle = `hsla(${star.hue}, 78%, 76%, ${star.alpha * twinkle * 0.16})`;
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (radius > 1.22) {
          ctx.strokeStyle = `hsla(${star.hue}, 92%, 86%, ${star.alpha * twinkle * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - radius * 1.45, y);
          ctx.lineTo(x + radius * 1.45, y);
          ctx.moveTo(x, y - radius * 1.45);
          ctx.lineTo(x, y + radius * 1.45);
          ctx.stroke();
        }
      });

      streaks.forEach((streak, index) => {
        streak.x += streak.speedX;
        streak.y += streak.speedY;

        if (streak.y > 1.16 || streak.x > 1.16) {
          streak.x = Math.random() * 0.5 - 0.15;
          streak.y = -0.2 - Math.random() * 0.35;
          streak.length = Math.random() * 54 + 24;
          streak.alpha = Math.random() * 0.12 + 0.05;
        }

        const x = streak.x * width + (smoothMousePos.current.x - 0.5) * 10;
        const y = streak.y * height + (smoothMousePos.current.y - 0.5) * -8;
        const gradient = ctx.createLinearGradient(x, y, x - streak.length * 0.48, y - streak.length);

        gradient.addColorStop(0, `hsla(${streak.hue}, 95%, 88%, ${streak.alpha})`);
        gradient.addColorStop(0.45, `hsla(${streak.hue}, 88%, 78%, ${streak.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${streak.hue}, 86%, 72%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = streak.width;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - streak.length * 0.48, y - streak.length);
        ctx.stroke();

        if (index % 3 === 0) {
          ctx.fillStyle = `hsla(${streak.hue}, 95%, 86%, ${streak.alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(x, y, streak.width * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animateId = requestAnimationFrame(update);
    };

    function handleMouseMove(e) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0;
    }

    resize();
    window.addEventListener("resize", resize);
    animateId = requestAnimationFrame(update);
    ctn.appendChild(canvas);
    ctn.addEventListener("mousemove", handleMouseMove);
    ctn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeEventListener("mousemove", handleMouseMove);
      ctn.removeEventListener("mouseleave", handleMouseLeave);
      if (ctn.contains(canvas)) {
        ctn.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={ctnDom} className="galaxy-container" aria-hidden="true" {...props} />;
}
