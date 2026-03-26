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
import { referenceCapsuleResults } from "@/lib/referenceData";

export function AIPage() {
  const {
    user,
    setAuthOpen,
    products,
    savedItems,
    toggleSave,
    addCapsule,
    assistantMessages,
    askAssistant
  } = useApp();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [capsuleItems, setCapsuleItems] = useState([]);
  const [filters, setFilters] = useState({
    style: "",
    season: "",
    maxPrice: 50000
  });

  const presets = [
    "Деловой образ для офиса на весну",
    "Лёгкая капсула в спокойной палитре для поездки",
    "Минималистичный гардероб из 5 вещей",
    "Городской образ на каждый день без ярких акцентов"
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const byStyle = !filters.style || item.styles.includes(filters.style);
      const bySeason = !filters.season || `${item.title} ${item.description}`.toLowerCase().includes(filters.season);
      const byPrice = item.price <= filters.maxPrice;
      return byStyle && bySeason && byPrice;
    });
  }, [filters, products]);

  const resultCapsules = useMemo(() => {
    return referenceCapsuleResults.map((capsule) => ({
      ...capsule,
      items: capsule.itemIds
        .map((id) => products.find((item) => item.id === id))
        .filter(Boolean)
    }));
  }, [products]);

  const capsuleTotal = capsuleItems.reduce((sum, item) => sum + item.price, 0);

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
              <label>
                <span>Стиль</span>
                <select value={filters.style} onChange={(event) => setFilters((prev) => ({ ...prev, style: event.target.value }))}>
                  <option value="">Все</option>
                  <option value="minimal">Минимализм</option>
                  <option value="classic">Классика</option>
                  <option value="casual">Кэжуал</option>
                  <option value="street">Стритвир</option>
                  <option value="romantic">Романтичный</option>
                </select>
              </label>
              <label>
                <span>Сезон</span>
                <select value={filters.season} onChange={(event) => setFilters((prev) => ({ ...prev, season: event.target.value.toLowerCase() }))}>
                  <option value="">Все</option>
                  <option value="вес">Весна</option>
                  <option value="лет">Лето</option>
                  <option value="осе">Осень</option>
                  <option value="зим">Зима</option>
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
                  onChange={(event) => setFilters((prev) => ({ ...prev, maxPrice: Number(event.target.value) }))}
                />
              </label>
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
              <motion.article
                key={capsule.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="reference-ai-capsule-card"
              >
                <div className="reference-ai-capsule-grid">
                  {capsule.items.map((item) => (
                    <div key={item.id} className="reference-ai-capsule-grid-item">
                      <img src={item.image} alt={item.title} />
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
              </motion.article>
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
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="reference-ai-product-card"
                >
                  <div className="reference-ai-product-image">
                    <img src={item.image} alt={item.title} />
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
                </motion.article>
              );
            })}
          </div>
        </div>
      ) : null}

      <section className="reference-assistant-panel">
        <div className="reference-ai-section-head">
          <h2>AI-помощник по стилю</h2>
          <span>Только на русском</span>
        </div>

        <div className="reference-assistant-messages">
          {assistantMessages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`reference-assistant-bubble ${message.role === "user" ? "self" : ""}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="reference-ai-presets reference-assistant-suggestions">
          {[
            "Собери лук на каждый день",
            "Что выбрать для офиса?",
            "Какую обувь взять к капсуле?",
            "Какая палитра выглядит дороже?"
          ].map((prompt) => (
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
                  <img src={item.image} alt={item.title} />
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
