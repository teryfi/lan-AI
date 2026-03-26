"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/AuthProvider";
import { Reveal } from "@/components/Reveal";

const heights = [280, 240, 320, 260, 300];

export function FeedPage() {
  const { products, user, setAuthOpen } = useApp();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("smart");

  const items = useMemo(() => {
    const filtered = products.filter((item) => category === "all" || item.category === category);
    return [...filtered].sort((a, b) => (sort === "new" ? b.id - a.id : (b.likes || 0) - (a.likes || 0)));
  }, [products, category, sort]);

  if (!user.authenticated) {
    return (
      <div className="page-grid">
        <div className="empty-block">
          Сначала войди в платформу, чтобы открыть fashion-ленту.
          <div className="center-cta">
            <button className="primary-btn" onClick={() => setAuthOpen(true)}>
              Начать работу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-grid">
      <div className="section-head compact-head">
        <div>
          <h2>Новые вещи от дизайнеров</h2>
        </div>
        <div className="feed-head-actions">
          <button className={`toggle-chip ${sort === "smart" ? "active" : ""}`} onClick={() => setSort("smart")}>
            Умная выдача
          </button>
          <button className={`toggle-chip ${sort === "new" ? "active" : ""}`} onClick={() => setSort("new")}>
            Сначала новые
          </button>
        </div>
      </div>

      <Reveal>
        <div className="feed-layout">
          <aside className="filter-panel">
            <h3>Фильтры</h3>
            <div className="filter-group">
              <label>Категория</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">Все категории</option>
                <option value="outerwear">Верхний слой</option>
                <option value="tops">Верх</option>
                <option value="bottoms">Низ</option>
                <option value="shoes">Обувь</option>
                <option value="accessories">Акцент</option>
                <option value="dresses">Платья</option>
              </select>
            </div>
            <p className="muted-text">
              Лента показывает вещи дизайнеров в более чистом формате: акцент на одежде, авторе и цене, без визуального шума.
            </p>
          </aside>

          <div>
            <div className="feed-toolbar">
              <div className="feed-toolbar-copy">
                <strong>{items.length}</strong>
                <span>работ в выдаче</span>
              </div>
              <div className="feed-toolbar-copy">
                <strong>Fashion editorial</strong>
                <span>лёгкий визуальный ритм</span>
              </div>
            </div>

            <div className="feed-grid">
              {items.map((item, index) => (
                <article className="feed-card" key={item.id}>
                  <div
                    className="feed-image"
                    style={{
                      "--preview": `url(${item.image})`,
                      "--card-height": `${heights[index % heights.length]}px`
                    }}
                  ></div>
                  <div className="feed-content">
                    <span className="feed-tag">{item.categoryLabel}</span>
                    <div className="feed-title-row">
                      <h3>{item.title}</h3>
                      <span className="price">{item.price.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <p className="muted-text">{item.description}</p>
                    <div className="feed-footer">
                      <span>{item.designer}</span>
                      <Link className="mini-link" href="/ai">
                        В капсулу
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
