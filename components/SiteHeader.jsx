"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/components/AuthProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, setAuthOpen } = useApp();
  const isAuthLanding = pathname === "/" && !user.authenticated;
  const avatarLetter = (user.name || user.avatar || "Н").trim().charAt(0).toUpperCase();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 40) {
        setIsHidden(false);
      } else if (currentY > lastY && currentY > 120) {
        setIsHidden(true);
      } else if (currentY < lastY) {
        setIsHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAuthLanding) {
    return null;
  }

  return (
    <header className={`topbar ${isHidden ? "collapsed" : ""}`}>
      <div className={`container topbar-inner ${isAuthLanding ? "auth-center" : ""}`}>
        <Link href="/" className="brand-button">
          <span className="brand-mark">Л</span>
          <span className="brand-copy">
            <strong>Лань AI</strong>
          </span>
        </Link>

        {!isAuthLanding && (
          <>
            <nav className="topnav">
              <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/">Главная</Link>
              <Link className={`nav-link ${pathname === "/feed" ? "active" : ""}`} href="/feed">Лента</Link>
              <Link className={`nav-link ${pathname === "/ai" ? "active" : ""}`} href="/ai">AI Конструктор</Link>
              <Link className={`nav-link ${pathname === "/profile" ? "active" : ""}`} href="/profile">Профиль</Link>
            </nav>

            <div className="topbar-actions">
              {!user.authenticated ? (
                <button className="ghost-btn" onClick={() => setAuthOpen(true)}>Войти</button>
              ) : (
                <Link className="profile-chip compact" href="/profile" aria-label="Открыть профиль">
                  <span className="profile-avatar">{avatarLetter}</span>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
