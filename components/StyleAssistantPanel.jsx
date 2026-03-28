"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useApp } from "@/components/AuthProvider";

const suggestionPrompts = [
  "Собери лук на каждый день",
  "Что выбрать для офиса?",
  "Какую обувь взять к капсуле?",
  "Какая палитра выглядит дороже?"
];

export function StyleAssistantPanel({ standalone = false }) {
  const searchParams = useSearchParams();
  const { user, setAuthOpen, assistantMessages, askAssistant } = useApp();
  const [assistantInput, setAssistantInput] = useState("");

  useEffect(() => {
    const assistantPrompt = searchParams.get("assistantPrompt");
    if (!assistantPrompt) return;

    setAssistantInput((currentValue) => currentValue || assistantPrompt);
  }, [searchParams]);

  if (!user.authenticated) {
    return (
      <div className="page-grid">
        <div className="empty-block">
          Сначала войди в платформу, чтобы открыть помощника по стилю.
          <div className="center-cta">
            <button className="primary-btn" onClick={() => setAuthOpen(true)}>
              Начать работу
            </button>
          </div>
        </div>
      </div>
    );
  }

  const panel = (
    <section className="reference-assistant-panel" id="assistant-panel">
      <div className="reference-ai-section-head">
        <h2>AI-помощник по стилю</h2>
        <span>Только на русском</span>
      </div>

      {searchParams.get("assistantItemTitle") ? (
        <div className="assistant-context-chip">Контекст: {searchParams.get("assistantItemTitle")}</div>
      ) : null}

      <div className="reference-assistant-messages">
        {assistantMessages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`reference-assistant-bubble ${message.role === "user" ? "self" : ""}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="reference-ai-presets reference-assistant-suggestions">
        {suggestionPrompts.map((prompt) => (
          <button key={prompt} onClick={() => askAssistant(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="reference-assistant-input">
        <input
          value={assistantInput}
          onChange={(event) => setAssistantInput(event.target.value)}
          placeholder="Спроси о стиле, сочетаниях, бюджете или замене вещи"
        />
        <button
          onClick={() => {
            if (!assistantInput.trim()) return;
            askAssistant(assistantInput.trim());
            setAssistantInput("");
          }}
        >
          Спросить
        </button>
      </div>
    </section>
  );

  if (!standalone) {
    return panel;
  }

  return (
    <div className="reference-ai-shell reference-assistant-shell">
      <div className="reference-ai-hero reference-assistant-hero">
        <div className="reference-ai-hero-glow" />
        <div className="reference-ai-hero-copy">
          <div className="reference-ai-chip">
            <Sparkles size={12} />
            <span>AI stylist</span>
          </div>
          <h1>Спроси помощника по стилю отдельно</h1>
          <p>
            Здесь чат всегда под рукой: можно быстро спросить про сочетания, обувь, палитру, замену вещи или попросить собрать образ без прокрутки через капсулы и выдачу.
          </p>
        </div>
      </div>

      {panel}
    </div>
  );
}
