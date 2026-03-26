"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Лента",
    text: "Открывай вещи дизайнеров в аккуратной fashion-выдаче.",
    tone: "mint"
  },
  {
    id: 2,
    title: "AI-капсула",
    text: "Собирай цельный образ по стилю, фигуре, сезону и бюджету.",
    tone: "violet"
  },
  {
    id: 3,
    title: "Контакт",
    text: "Переходи к дизайнеру и обсуждай покупку напрямую.",
    tone: "cyan"
  }
];

export function AuthSceneCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const getCardState = (index) => {
    const offset = (index - currentIndex + slides.length) % slides.length;
    const normalized = offset > 1 ? offset - slides.length : offset;

    return {
      x: `${normalized * 220}px`,
      rotate: `${normalized * 8}deg`,
      scale: normalized === 0 ? 1 : 0.9,
      opacity: normalized === 0 ? 1 : 0.72,
      zIndex: normalized === 0 ? 3 : 1
    };
  };

  return (
    <div className="auth-scene">
      <div className="auth-carousel" role="region" aria-label="Навигация по возможностям платформы">
        {slides.map((slide, index) => {
          const state = getCardState(index);

          return (
            <article
              key={slide.id}
              className={`auth-scene-card ${slide.tone}`}
              style={{
                transform: `translateX(${state.x}) rotate(${state.rotate}) scale(${state.scale})`,
                opacity: state.opacity,
                zIndex: state.zIndex
              }}
              aria-hidden={index !== currentIndex}
            >
              <span className="auth-scene-card-kicker">Сценарий {slide.id}</span>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </article>
          );
        })}
      </div>

      <div className="auth-carousel-controls">
        <button type="button" className="auth-carousel-btn" onClick={goToPrevious} aria-label="Предыдущий кадр">
          ←
        </button>
        <div className="auth-carousel-dots" aria-hidden="true">
          {slides.map((slide, index) => (
            <span key={slide.id} className={`auth-carousel-dot ${index === currentIndex ? "active" : ""}`}></span>
          ))}
        </div>
        <button type="button" className="auth-carousel-btn" onClick={goToNext} aria-label="Следующий кадр">
          →
        </button>
      </div>
    </div>
  );
}
