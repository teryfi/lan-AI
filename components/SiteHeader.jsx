"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/components/AuthProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, setAuthOpen, designerConversations = [] } = useApp();
  const isAuthLanding = pathname === "/" && !user.authenticated;
  const avatarLetter = (user.name || user.avatar || "Н").trim().charAt(0).toUpperCase();
  const unreadCount = designerConversations.reduce((sum, conversation) => sum + (conversation.unreadCount || 0), 0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frameId = 0;
    let scheduled = false;

    const updateVisibility = () => {
      const currentY = window.scrollY;
      let nextHidden = false;

      if (currentY < 40) {
        nextHidden = false;
      } else if (currentY > lastY && currentY > 120) {
        nextHidden = true;
      } else if (currentY < lastY) {
        nextHidden = false;
      }

      setIsHidden((prev) => (prev === nextHidden ? prev : nextHidden));
      lastY = currentY;
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      frameId = window.requestAnimationFrame(() => {
        scheduled = false;
        updateVisibility();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (isAuthLanding) {
    return null;
  }

  return (
    <header className={`topbar ${isHidden ? "collapsed" : ""}`}>
      <div className={`container topbar-inner ${isAuthLanding ? "auth-center" : ""}`}>
        <Link href="/" className="brand-button">
          <span className="brand-mark">
            <Image alt="Лань AI" className="brand-mark-image" height={96} priority src="/lan-logo.png" unoptimized width={112} />
          </span>
          <span className="brand-copy">
            <strong>Лань AI</strong>
          </span>
        </Link>

        {!isAuthLanding ? (
          <>
            <nav className="topnav">
              <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/">Главная</Link>
              <Link className={`nav-link ${pathname === "/feed" ? "active" : ""}`} href="/feed">Лента</Link>
              <Link className={`nav-link ${pathname === "/ai" ? "active" : ""}`} href="/ai">AI Конструктор</Link>
              <Link className={`nav-link ${pathname === "/assistant" ? "active" : ""}`} href="/assistant">Помощник</Link>
              <Link className={`nav-link ${pathname === "/profile" ? "active" : ""}`} href="/profile">Профиль</Link>
            </nav>

            <div className="topbar-actions">
              {!user.authenticated ? (
                <button className="ghost-btn" onClick={() => setAuthOpen(true)}>Войти</button>
              ) : (
                <>
                  <Link className={`topbar-icon-link ${pathname === "/messages" ? "active" : ""}`} href="/messages" aria-label="Открыть сообщения">
                    <MessageCircle size={18} />
                    {unreadCount ? <span className="topbar-icon-badge">{unreadCount}</span> : null}
                  </Link>
                  <Link className="profile-chip compact" href="/profile" aria-label="Открыть профиль">
                    <span className="profile-avatar">{avatarLetter}</span>
                  </Link>
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
