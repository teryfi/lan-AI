"use client";

import { useEffect, useState } from "react";
import Galaxy from "@/components/Galaxy";

const HERO_WORDS = [
  { id: "designers", word: "дизайнеров" },
  { id: "buyers", word: "покупателей" },
  { id: "style", word: "стиль" }
];

const AUTO_ROTATE_MS = 4600;
const HERO_DESCRIPTION =
  "Покупатели быстрее находят сильные вещи и собирают капсулы, а дизайнеры публикуют коллекции, попадают в рекомендации и получают прямые заявки.";

export function PremiumHero({ onStart, authModalOpen = false }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeWord = HERO_WORDS[activeIndex];

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
      setActiveIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="premium-hero premium-hero-centered" aria-labelledby="premium-hero-title">
      <div className="premium-hero-background" aria-hidden="true">
        <Galaxy
          mouseRepulsion={!authModalOpen}
          mouseInteraction={!authModalOpen}
          density={0.5}
          glowIntensity={0.3}
          saturation={0.1}
          hueShift={360}
          twinkleIntensity={0.1}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={0.5}
          transparent={true}
        />
      </div>

      <div className="premium-hero-content premium-hero-content-centered">
        <div className="premium-hero-topbar">
          <div className="premium-hero-topbar-shell">
            <span className="premium-hero-topbar-brand">Лань AI</span>
            <button className="premium-hero-topbar-action" type="button" onClick={onStart}>
              Начать
            </button>
          </div>
        </div>

        <div className="premium-hero-shell premium-hero-shell-centered">
          <div className="premium-hero-copy premium-hero-copy-centered">
            <span className="premium-hero-kicker">fashion intelligence platform</span>

            <h1 className="premium-hero-title premium-hero-title-centered" id="premium-hero-title">
              <span className="premium-hero-title-main">Находи</span>
              <span className="premium-hero-title-word-wrap" key={activeWord.id}>
                <span className="premium-hero-title-accent">{activeWord.word}</span>
              </span>
            </h1>

            <p className="premium-hero-description premium-hero-description-centered">
              {HERO_DESCRIPTION}
            </p>

            <div className="premium-hero-actions">
              <button className="primary-btn wide-btn premium-hero-cta" type="button" onClick={onStart}>
                Начать работу
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
