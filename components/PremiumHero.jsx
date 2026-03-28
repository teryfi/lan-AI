"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IntroGalaxyBackground } from "@/components/IntroGalaxyBackground";

const HERO_SCENARIOS = [
  {
    id: "style",
    label: "СЦЕНАРИЙ 1",
    title: "Стиль",
    word: "стиль",
    description: "Собирай стиль через капсулы: верх, низ, слой, обувь и один точный акцент.",
    tone: "style"
  },
  {
    id: "designers",
    label: "СЦЕНАРИЙ 2",
    title: "Дизайнеры",
    word: "дизайнеров",
    description: "Публикуй вещи, попадай в рекомендации и получай новые заявки от аудитории.",
    tone: "designers"
  },
  {
    id: "buyers",
    label: "СЦЕНАРИЙ 3",
    title: "Покупатели",
    word: "покупателей",
    description: "Ищи вещи, собирай капсулы, сохраняй находки и сразу переходи к дизайнеру.",
    tone: "buyers"
  }
];

const AUTO_ROTATE_MS = 4600;
const HERO_DESCRIPTION =
  "Платформа для тех, кто хочет быстрее находить сильные вещи, собирать капсулы и сразу переходить к покупке или публикации.";

function getCardOffset(index, activeIndex, total) {
  let offset = index - activeIndex;
  const half = Math.floor(total / 2);

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

function HeroScenarioCard({ scenario, offset, isActive }) {
  const distance = Math.abs(offset);
  const scale = isActive ? 1 : distance === 1 ? 0.86 : 0.74;
  const opacity = isActive ? 1 : distance === 1 ? 0.48 : 0.18;
  const blur = isActive ? 0 : distance === 1 ? 2.2 : 3.8;

  return (
    <article
      className={`hero-scenario-card ${scenario.tone} ${isActive ? "active" : ""}`}
      style={{
        "--card-translate-x": `calc(var(--hero-card-shift) * ${offset})`,
        "--card-translate-y": `${distance * 14}px`,
        "--card-rotate": `${offset * 12}deg`,
        "--card-scale": scale,
        "--card-opacity": opacity,
        "--card-blur": `${blur}px`,
        zIndex: isActive ? 4 : Math.max(1, 4 - distance)
      }}
      aria-hidden={!isActive}
    >
      <span className="hero-scenario-label">{scenario.label}</span>
      <h3>{scenario.title}</h3>
      <p>{scenario.description}</p>
    </article>
  );
}

export function PremiumHero({ onStart }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeScenario = HERO_SCENARIOS[activeIndex];

  useEffect(() => {
    document.documentElement.classList.add("premium-hero-active");
    document.body.classList.add("premium-hero-active");

    return () => {
      document.documentElement.classList.remove("premium-hero-active");
      document.body.classList.remove("premium-hero-active");
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SCENARIOS.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? HERO_SCENARIOS.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SCENARIOS.length);
  };

  return (
    <section className="premium-hero" aria-labelledby="premium-hero-title">
      <div className="premium-hero-background" aria-hidden="true">
        <IntroGalaxyBackground className="premium-hero-galaxy" />
        <div className="premium-hero-vignette"></div>
        <div className="premium-hero-stars"></div>
        <span className="premium-hero-orb premium-hero-orb-left"></span>
        <span className="premium-hero-orb premium-hero-orb-center"></span>
        <span className="premium-hero-orb premium-hero-orb-right"></span>
      </div>

      <div className="premium-hero-content">
        <div className="premium-hero-brandbar">
          <span className="premium-hero-brand">Лань AI</span>
          <span className="premium-hero-brand-line"></span>
        </div>

        <div className="premium-hero-shell">
          <div className="premium-hero-copy">
            <h1 className="premium-hero-title" id="premium-hero-title">
              <span>Находи</span>
              <span className="premium-hero-title-word-wrap" key={activeScenario.id}>
                <span className="premium-hero-title-accent">{activeScenario.word}</span>
              </span>
            </h1>

            <p className="premium-hero-description">{HERO_DESCRIPTION}</p>

            <button className="primary-btn premium-hero-cta" type="button" onClick={onStart}>
              Начать работу
            </button>
          </div>

          <div className="premium-hero-stack">
            <div className="premium-hero-stack-glow"></div>

            <div className="premium-hero-carousel" role="region" aria-label="Сценарии работы в Лань AI">
              {HERO_SCENARIOS.map((scenario, index) => {
                const offset = getCardOffset(index, activeIndex, HERO_SCENARIOS.length);

                return (
                  <HeroScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    offset={offset}
                    isActive={offset === 0}
                  />
                );
              })}
            </div>

            <div className="premium-hero-controls">
              <button
                type="button"
                className="premium-hero-control"
                onClick={showPrevious}
                aria-label="Предыдущая карточка"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="premium-hero-dots" aria-hidden="true">
                {HERO_SCENARIOS.map((scenario, index) => (
                  <span
                    key={scenario.id}
                    className={`premium-hero-dot ${index === activeIndex ? "active" : ""}`}
                  ></span>
                ))}
              </div>

              <button
                type="button"
                className="premium-hero-control"
                onClick={showNext}
                aria-label="Следующая карточка"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
