"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/AuthProvider";
import { EntityCardLink } from "@/components/content-viewer/EntityCardLink";
import { Reveal } from "@/components/Reveal";

const heights = [280, 240, 320, 260, 300];

const categoryOptions = [
  { value: "all", label: "Все категории" },
  { value: "outerwear", label: "Верхний слой" },
  { value: "tops", label: "Верх" },
  { value: "bottoms", label: "Низ" },
  { value: "shoes", label: "Обувь" },
  { value: "accessories", label: "Акцент" },
  { value: "dresses", label: "Платья" }
];

const styleOptions = [
  { value: "all", label: "Любой стиль" },
  { value: "minimal", label: "Минимализм" },
  { value: "classic", label: "Классика" },
  { value: "casual", label: "Casual" },
  { value: "romantic", label: "Романтика" },
  { value: "street", label: "Street" }
];

const budgetOptions = [
  { value: "all", label: "Любой бюджет" },
  { value: "under-10000", label: "До 10 000 ₽" },
  { value: "under-20000", label: "До 20 000 ₽" },
  { value: "above-20000", label: "Выше 20 000 ₽" }
];

export function FeedPage() {
  const { products, user, setAuthOpen } = useApp();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("smart");
  const [styleFilter, setStyleFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  const items = useMemo(() => {
    const filtered = products.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesStyle = styleFilter === "all" || item.styles?.includes(styleFilter);
      const matchesBudget =
        budgetFilter === "all" ||
        (budgetFilter === "under-10000" && item.price < 10000) ||
        (budgetFilter === "under-20000" && item.price < 20000) ||
        (budgetFilter === "above-20000" && item.price >= 20000);

      return matchesCategory && matchesStyle && matchesBudget;
    });

    return [...filtered].sort((a, b) => (sort === "new" ? b.id - a.id : (b.likes || 0) - (a.likes || 0)));
  }, [products, category, sort, styleFilter, budgetFilter]);

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
          <aside className="filter-panel filter-panel-curated">
            <div className="filter-panel-head">
              <span className="filter-panel-kicker">Лента</span>
              <h3>Категории</h3>
            </div>

            <div className="filter-group filter-group-tight">
              <div className="feed-filter-choice-grid" role="tablist" aria-label="Категории">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`feed-filter-choice ${category === option.value ? "active" : ""}`}
                    onClick={() => setCategory(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Стиль</label>
              <div className="feed-filter-pills" role="tablist" aria-label="Стиль">
                {styleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`feed-filter-pill ${styleFilter === option.value ? "active" : ""}`}
                    onClick={() => setStyleFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Бюджет</label>
              <div className="feed-filter-stack" role="tablist" aria-label="Бюджет">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`feed-filter-row ${budgetFilter === option.value ? "active" : ""}`}
                    onClick={() => setBudgetFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="muted-text">
              Лента показывает вещи дизайнеров в более чистом формате: акцент на одежде, авторе и цене, без
              визуального шума.
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
                <EntityCardLink
                  as="article"
                  className="feed-card"
                  key={item.id}
                  entity={item}
                  entityType="item"
                  ariaLabel={`Открыть вещь ${item.title}`}
                >
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
                </EntityCardLink>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
