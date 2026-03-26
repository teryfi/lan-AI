"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AuthProvider";

export function AuthModal() {
  const router = useRouter();
  const { authOpen, setAuthOpen, login } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "client",
    privacy: "public"
  });

  if (!authOpen) return null;

  const onSubmit = (event) => {
    event.preventDefault();
    login({
      ...form,
      avatar: form.name
    });
    router.push("/");
  };

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && setAuthOpen(false)}>
      <div className="modal-card">
        <button className="modal-close" onClick={() => setAuthOpen(false)}>×</button>
        <p className="section-kicker">Вход / Регистрация</p>
        <h2>Создать профиль</h2>
        <form className="form-grid" onSubmit={onSubmit}>
          <input placeholder="Псевдоним" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="client">Я пользователь</option>
            <option value="designer">Я дизайнер</option>
          </select>
          <select value={form.privacy} onChange={(e) => setForm({ ...form, privacy: e.target.value })}>
            <option value="public">Публичный профиль</option>
            <option value="private">Приватный профиль</option>
          </select>
          <button className="primary-btn wide-btn" type="submit">Начать работу</button>
        </form>
      </div>
    </div>
  );
}
