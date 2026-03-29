"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lan-ai-welcome-overlay-dismissed";

const sections = [
  {
    title: "О проекте",
    content:
      "Лань AI — это прототип (MVP) платформы, объединяющей пользователей и начинающих дизайнеров одежды с помощью AI-стилиста. На данном этапе вы можете ознакомиться с основным функционалом сервиса.",
  },
  {
    title: "Важно",
    tone: "warning",
    content:
      "Это MVP-версия, поэтому возможны нестабильная работа, задержки интерфейса и неточности в отображении одежды. Изображения одежды временно взяты из открытых источников. В будущем дизайнеры будут самостоятельно загружать свои работы.",
  },
  {
    title: "Что можно протестировать",
    content:
      "Создание капсулы одежды (готового образа), общение с AI-стилистом для подбора стиля и просмотр каталога одежды.",
  },
  {
    title: "Режим дизайнера",
    content:
      "Зарегистрируйтесь как дизайнер, чтобы получить доступ к расширенной аналитике, управлению своими товарами и системе сообщений для связи с пользователями.",
  },
  {
    title: "Конфиденциальность",
    content:
      "Данные не сохраняются и не передаются. Все формы — это демонстрационные элементы интерфейса.",
  },
  {
    title: "Цель проекта",
    content:
      "Продемонстрировать ключевую идею платформы: персональный подбор одежды и поддержку начинающих дизайнеров.",
  },
];

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = window.localStorage.getItem(STORAGE_KEY) === "true";
      setIsVisible(!isDismissed);
    } catch {
      setIsVisible(true);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove("welcome-overlay-lock");
      return;
    }

    document.body.classList.add("welcome-overlay-lock");

    return () => {
      document.body.classList.remove("welcome-overlay-lock");
    };
  }, [isVisible]);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors and still let the visitor continue.
    }

    setIsVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
      event.preventDefault();
      handleDismiss();
    }
  };

  if (!isReady || !isVisible) {
    return null;
  }

  return (
    <div
      className="welcome-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-overlay-title"
      tabIndex={0}
      onClick={handleDismiss}
      onKeyDown={handleKeyDown}
    >
      <div className="welcome-overlay-card">
        <div className="welcome-overlay-intro">
          <span className="welcome-overlay-kicker">Лань AI</span>
          <h1 id="welcome-overlay-title">Здравствуйте, уважаемое жюри!</h1>
          <p>Добро пожаловать на платформу Лань AI.</p>
        </div>

        <div className="welcome-overlay-sections">
          {sections.map((section) => (
            <section
              key={section.title}
              className={`welcome-overlay-section${section.tone ? ` ${section.tone}` : ""}`}
            >
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>

        <div className="welcome-overlay-footer">
          <p>Желаем вам приятного тестирования!</p>
          <button
            type="button"
            className="welcome-overlay-cta"
            onClick={handleDismiss}
            aria-label="Нажмите в любом месте, чтобы продолжить"
          >
            Нажмите в любом месте, чтобы продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
