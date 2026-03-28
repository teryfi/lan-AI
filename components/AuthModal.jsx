"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, ShoppingBag } from "lucide-react";
import { useApp } from "@/components/AuthProvider";

const ROLE_OPTIONS = [
  {
    id: "client",
    icon: ShoppingBag,
    title: "Я покупатель",
    description: "Ищу вещи, собираю капсулы и быстро перехожу к покупке."
  },
  {
    id: "designer",
    icon: Palette,
    title: "Я дизайнер",
    description: "Публикую вещи, получаю внимание аудитории и новые заявки."
  }
];

export function AuthModal() {
  const router = useRouter();
  const { authOpen, setAuthOpen, login } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "client"
  });

  useEffect(() => {
    if (!authOpen) return undefined;

    document.documentElement.classList.add("auth-modal-open");
    document.body.classList.add("auth-modal-open");

    return () => {
      document.documentElement.classList.remove("auth-modal-open");
      document.body.classList.remove("auth-modal-open");
    };
  }, [authOpen]);

  if (!authOpen) return null;

  const onSubmit = (event) => {
    event.preventDefault();
    login({
      ...form,
      privacy: "public",
      avatar: form.name
    });
    router.push("/");
  };

  return (
    <div
      className="modal-backdrop auth-modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && setAuthOpen(false)}
    >
      <div className="modal-card auth-modal-card" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button className="modal-close auth-modal-close" type="button" onClick={() => setAuthOpen(false)} aria-label="Закрыть">
          ×
        </button>

        <p className="section-kicker auth-modal-kicker">Вход / Регистрация</p>
        <h2 id="auth-modal-title">Создать профиль</h2>
        <p className="auth-modal-subtitle">
          Выбери роль, чтобы открыть свой сценарий внутри Лань AI.
        </p>

        <form className="form-grid auth-modal-form" onSubmit={onSubmit}>
          <div className="auth-modal-fields">
            <input
              className="auth-modal-input"
              placeholder="Псевдоним"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
            <input
              className="auth-modal-input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </div>

          <div className="auth-role-grid" role="radiogroup" aria-label="Роль профиля">
            {ROLE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = form.role === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`auth-role-card ${isActive ? "active" : ""}`}
                  onClick={() => setForm({ ...form, role: option.id })}
                  aria-pressed={isActive}
                >
                  <span className="auth-role-card-status">{isActive ? "Выбрано" : "Выбрать"}</span>
                  <span className="auth-role-card-icon">
                    <Icon size={20} />
                  </span>
                  <span className="auth-role-card-title">{option.title}</span>
                  <span className="auth-role-card-text">{option.description}</span>
                </button>
              );
            })}
          </div>

          <button className="primary-btn wide-btn premium-hero-cta auth-modal-submit" type="submit">
            Начать работу
          </button>
        </form>
      </div>
    </div>
  );
}
