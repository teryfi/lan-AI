"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  Download,
  Filter,
  Heart,
  Share2,
  ShoppingBag,
  Sparkles,
  X
} from "lucide-react";
import { useApp } from "@/components/AuthProvider";
import { EntityCardLink } from "@/components/content-viewer/EntityCardLink";
import {
  aiFilterOptions,
  defaultAiFilters,
  getActiveAiFilterCount,
  getAiPreferenceScore,
  matchesAiFilters
} from "@/lib/aiFilters";
import { referenceCapsuleResults } from "@/lib/referenceData";

export function AIPage() {
  const {
    user,
    setAuthOpen,
    products,
    savedItems,
    toggleSave,
    addCapsule
  } = useApp();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [capsuleItems, setCapsuleItems] = useState([]);
  const [filters, setFilters] = useState(defaultAiFilters);

  const presets = [
    "Деловой образ для офиса на весну",
    "Лёгкая капсула в спокойной палитре для поездки",
    "Минималистичный гардероб из 5 вещей",
    "Городской образ на каждый день без ярких акцентов"
  ];

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((item) => matchesAiFilters(item, filters))
      .sort((a, b) => {
        const scoreDiff = getAiPreferenceScore(b, filters) - getAiPreferenceScore(a, filters);
        if (scoreDiff !== 0) return scoreDiff;
        return a.price - b.price;
      });
  }, [filters, products]);

  const productById = useMemo(() => new Map(products.map((item) => [item.id, item])), [products]);

  const resultCapsules = useMemo(() => {
    return referenceCapsuleResults.map((capsule) => ({
      ...capsule,
      items: capsule.itemIds
        .map((id) => productById.get(id))
        .filter(Boolean)
    }));
  }, [productById]);

  const capsuleTotal = capsuleItems.reduce((sum, item) => sum + item.price, 0);
  const activeFiltersCount = getActiveAiFilterCount(filters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    await new Promise((resolve) => setTimeout(resolve, 1700));
    setLoading(false);
    setSearched(true);
  };

  const addToCapsule = (item) => {
    setCapsuleItems((prev) => {
      if (prev.some((entry) => entry.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCapsule = (id) => {
    setCapsuleItems((prev) => prev.filter((item) => item.id !== id));
  };

  const saveCapsule = () => {
    if (!capsuleItems.length) return;
    addCapsule({
      id: `${Date.now()}`,
      name: query || "Моя капсула",
      items: capsuleItems.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        designer: item.designer,
        categoryLabel: item.categoryLabel
      }))
    });
    setSavedSuccess(true);
    window.setTimeout(() => setSavedSuccess(false), 2400);
  };

  if (!user.authenticated) {
    return (
      <div className="page-grid">
        <div className="empty-block">
          Сначала войди в платформу, чтобы собрать капсулу через AI и открыть рекомендации.
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
    <div className="reference-ai-shell">
      <div className="reference-ai-hero">
        <div className="reference-ai-hero-glow" />
        <div className="reference-ai-hero-copy">
          <div className="reference-ai-chip">
            <Sparkles size={12} />
            <span>AI styling engine</span>
          </div>
          <h1>Собери капсулу под сценарий, стиль и бюджет</h1>
          <p>
            Опиши образ на русском языке — система подберёт вещи дизайнеров, покажет готовые капсулы и поможет довести лук до покупки.
          </p>
        </div>
      </div>

      <div className="reference-ai-search">
        <div className="reference-ai-search-bar">
          <Sparkles size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
            placeholder="Опиши образ: например, офисная капсула на весну до 30 000 ₽"
          />
          <button className="reference-ai-filter-btn" onClick={() => setFiltersOpen((value) => !value)}>
            <Filter size={16} />
          </button>
          <button className="reference-ai-submit" onClick={handleSearch} disabled={!query.trim() || loading}>
            Подобрать
          </button>
        </div>

        <div className="reference-ai-presets">
          {presets.map((preset) => (
            <button key={preset} onClick={() => setQuery(preset)}>
              {preset}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {filtersOpen ? (
            <motion.div
              className="reference-ai-filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="reference-ai-filters-head">
                <div>
                  <strong>Тонкая настройка подбора</strong>
                  <span>{activeFiltersCount ? `${activeFiltersCount} активных критериев` : "Выбери важные параметры для капсулы"}</span>
                </div>
                <button type="button" className="reference-ai-filters-reset" onClick={() => setFilters(defaultAiFilters)}>
                  Сбросить
                </button>
              </div>

              <div className="reference-ai-filters-grid">
                <label>
                  <span>Стиль</span>
                  <select value={filters.style} onChange={(event) => updateFilter("style", event.target.value)}>
                    {aiFilterOptions.styles.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Сезон</span>
                  <select value={filters.season} onChange={(event) => updateFilter("season", event.target.value)}>
                    {aiFilterOptions.seasons.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Категория</span>
                  <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
                    {aiFilterOptions.categories.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Сценарий</span>
                  <select value={filters.occasion} onChange={(event) => updateFilter("occasion", event.target.value)}>
                    {aiFilterOptions.occasions.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Палитра</span>
                  <select value={filters.palette} onChange={(event) => updateFilter("palette", event.target.value)}>
                    {aiFilterOptions.palettes.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Силуэт</span>
                  <select value={filters.silhouette} onChange={(event) => updateFilter("silhouette", event.target.value)}>
                    {aiFilterOptions.silhouettes.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Комфорт</span>
                  <select value={filters.comfort} onChange={(event) => updateFilter("comfort", event.target.value)}>
                    {aiFilterOptions.comforts.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Тип телосложения</span>
                  <select value={filters.bodyType} onChange={(event) => updateFilter("bodyType", event.target.value)}>
                    {aiFilterOptions.bodyTypes.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Рост</span>
                  <select value={filters.heightRange} onChange={(event) => updateFilter("heightRange", event.target.value)}>
                    {aiFilterOptions.heightRanges.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Вес</span>
                  <select value={filters.weightRange} onChange={(event) => updateFilter("weightRange", event.target.value)}>
                    {aiFilterOptions.weightRanges.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Размерный диапазон</span>
                  <select value={filters.sizeRange} onChange={(event) => updateFilter("sizeRange", event.target.value)}>
                    {aiFilterOptions.sizeRanges.map((option) => (
                      <option key={option.value || "all"} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Минимальная цена</span>
                  <select value={filters.minPrice} onChange={(event) => updateFilter("minPrice", Number(event.target.value))}>
                    {aiFilterOptions.minPrices.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label className="wide">
                  <span>Максимальный бюджет: {filters.maxPrice.toLocaleString("ru-RU")} ₽</span>
                  <input
                    type="range"
                    min={10000}
                    max={80000}
                    step={1000}
                    value={filters.maxPrice}
                    onChange={(event) => updateFilter("maxPrice", Number(event.target.value))}
                  />
                </label>
              </div>

              <p className="reference-ai-filters-note">
                Рост, вес и тип телосложения используются как мягкие критерии приоритета, чтобы универсальные вещи не пропадали из выдачи.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            className="reference-ai-loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              className="reference-ai-loading-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={28} />
            </motion.div>
            <h3>AI анализирует запрос</h3>
            <p>Подбираем совместимые вещи, проверяем бюджет и собираем носибельную капсулу.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!searched && !loading ? (
        <div className="reference-ai-empty">
          <div className="reference-ai-empty-icon">
            <Sparkles size={30} />
          </div>
          <h3>Опиши, что тебе нужно</h3>
          <p>Например: «мягкая городская капсула для офиса и встреч до 30 000 ₽».</p>
        </div>
      ) : null}

      {searched && !loading ? (
        <div className="reference-ai-results">
          <div className="reference-ai-section-head">
            <h2>AI сформировал капсулы</h2>
            <span>{resultCapsules.length} варианта</span>
          </div>

          <div className="reference-ai-capsules">
            {resultCapsules.map((capsule, index) => (
              <EntityCardLink
                as={motion.article}
                key={capsule.id}
                entity={capsule}
                entityType="capsule"
                ariaLabel={`Открыть капсулу ${capsule.name}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="reference-ai-capsule-card"
              >
                <div className="reference-ai-capsule-grid">
                  {capsule.items.map((item) => (
                    <div key={item.id} className="reference-ai-capsule-grid-item">
                      <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <div className="reference-ai-capsule-content">
                  <div className="reference-ai-capsule-head">
                    <h3>{capsule.name}</h3>
                    <span>{capsule.matchScore}%</span>
                  </div>
                  <p>{capsule.description}</p>
                  <div className="reference-ai-capsule-tags">
                    {capsule.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="reference-ai-capsule-foot">
                    <strong>{capsule.totalPrice.toLocaleString("ru-RU")} ₽</strong>
                    <button onClick={() => capsule.items.forEach(addToCapsule)}>В конструктор</button>
                  </div>
                </div>
              </EntityCardLink>
            ))}
          </div>

          <div className="reference-ai-section-head">
            <h2>Все найденные вещи</h2>
            <span>{filteredProducts.length} позиций</span>
          </div>

          <div className="reference-ai-product-grid">
            {filteredProducts.map((item, index) => {
              const selected = capsuleItems.some((entry) => entry.id === item.id);
              return (
                <EntityCardLink
                  as={motion.article}
                  key={item.id}
                  entity={item}
                  entityType="item"
                  ariaLabel={`Открыть вещь ${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="reference-ai-product-card"
                >
                  <div className="reference-ai-product-image">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                    <button onClick={() => toggleSave(item.id)}>
                      <Heart size={14} fill={savedItems.includes(item.id) ? "currentColor" : "none"} />
                    </button>
                    <span>{item.categoryLabel}</span>
                  </div>
                  <div className="reference-ai-product-content">
                    <strong>{item.title}</strong>
                    <p>{item.designer}</p>
                    <div>
                      <span>{item.price.toLocaleString("ru-RU")} ₽</span>
                      <button onClick={() => addToCapsule(item)}>
                        {selected ? <Check size={12} /> : "+"}
                      </button>
                    </div>
                  </div>
                </EntityCardLink>
              );
            })}
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {capsuleItems.length ? (
          <motion.div
            className="reference-ai-bottom-bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="reference-ai-bottom-preview">
              {capsuleItems.slice(0, 4).map((item) => (
                <div key={item.id} className="reference-ai-preview-item">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <button onClick={() => removeFromCapsule(item.id)}>
                    <X size={8} />
                  </button>
                </div>
              ))}
              {capsuleItems.length > 4 ? <span className="reference-ai-preview-more">+{capsuleItems.length - 4}</span> : null}
            </div>

            <div className="reference-ai-bottom-copy">
              <strong>Моя капсула · {capsuleItems.length} предметов</strong>
              <span>{capsuleTotal.toLocaleString("ru-RU")} ₽</span>
            </div>

            <div className="reference-ai-bottom-actions">
              <button><Share2 size={16} /></button>
              <button><Download size={16} /></button>
              <button className={`reference-ai-save-btn ${savedSuccess ? "success" : ""}`} onClick={saveCapsule}>
                {savedSuccess ? <><Check size={15} /> Сохранено</> : <><ShoppingBag size={15} /> Сохранить</>}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
