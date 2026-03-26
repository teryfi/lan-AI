"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  CheckCircle2,
  Edit3,
  Heart,
  History,
  Layers3,
  LogOut,
  MessageCircle,
  PackagePlus,
  Settings,
  Share2
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useApp } from "@/components/AuthProvider";

const designerTabs = [
  { id: "analytics", label: "Аналитика", icon: Layers3 },
  { id: "requests", label: "Запросы", icon: Bell },
  { id: "messages", label: "Сообщения", icon: MessageCircle },
  { id: "publish", label: "Опубликовать", icon: PackagePlus },
  { id: "capsules", label: "Капсулы", icon: Layers3 },
  { id: "settings", label: "Настройки", icon: Settings }
];

const clientTabs = [
  { id: "capsules", label: "Мои капсулы", icon: Layers3 },
  { id: "favorites", label: "Избранное", icon: Heart },
  { id: "history", label: "История", icon: History },
  { id: "settings", label: "Настройки", icon: Settings }
];

const categoryLabels = {
  outerwear: "Верхний слой",
  tops: "Верх",
  bottoms: "Низ",
  shoes: "Обувь",
  accessories: "Акцент",
  dresses: "Платье"
};

function formatCurrency(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function getStatusClass(status) {
  if (status === "Новый") return "new";
  if (status === "В работе") return "active";
  if (status === "Подтверждён") return "done";
  return "default";
}

export function ProfilePage() {
  const router = useRouter();
  const {
    user,
    metrics,
    products,
    savedCapsules,
    designerCapsules,
    designerMessages,
    publishProduct,
    createDesignerCapsule,
    sendDesignerMessage,
    logout,
    updateUser
  } = useApp();

  const isDesigner = user.role === "designer";
  const tabs = isDesigner ? designerTabs : clientTabs;
  const [activeTab, setActiveTab] = useState(isDesigner ? "analytics" : "capsules");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [capsuleName, setCapsuleName] = useState("");
  const [activeDayIndex, setActiveDayIndex] = useState(4);
  const defaultRevenueIndex = 5;
  const [activeRevenueIndex, setActiveRevenueIndex] = useState(defaultRevenueIndex);
  const [profileForm, setProfileForm] = useState({
    name: user.name || "",
    email: user.email || "",
    privacy: user.privacy || "public"
  });
  const [productForm, setProductForm] = useState({
    title: "",
    designer: user.name || "",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: "",
    styles: "minimal, classic",
    description: "",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
  });

  const requests = useMemo(
    () => [
      {
        id: 1,
        name: "Капсула для офиса",
        client: "Екатерина",
        budget: 30000,
        status: "Новый",
        note: "Нужен спокойный гардероб на весну без ярких цветов и лишнего декора."
      },
      {
        id: 2,
        name: "Выбор верхнего слоя",
        client: "Марина",
        budget: 22000,
        status: "В работе",
        note: "Ищу мягкий тренч или жакет для города, встреч и рабочих дней."
      },
      {
        id: 3,
        name: "Weekend-trip",
        client: "Алина",
        budget: 26000,
        status: "Подтверждён",
        note: "Нужна капсула из 4-5 вещей с обувью и одним акцентом."
      }
    ],
    []
  );

  const analytics = useMemo(() => {
    const averageCheck = Math.round((metrics.revenue * 1000) / Math.max(metrics.leads, 1));
    return {
      conversion: "6.4%",
      repeat: "31%",
      averageCheck,
      topCategory: products[0]?.categoryLabel || "Верх",
      geo: [
        { city: "Москва", value: 42 },
        { city: "СПб", value: 21 },
        { city: "Казань", value: 11 },
        { city: "Екатеринбург", value: 9 },
        { city: "Другие", value: 17 }
      ],
      audience: [
        { label: "18-24", value: 28 },
        { label: "25-34", value: 45 },
        { label: "35-44", value: 19 },
        { label: "45+", value: 8 }
      ]
    };
  }, [metrics, products]);

  const weeklyActivity = [
    { day: "Пн", views: 420, clicks: 210, saves: 74 },
    { day: "Вт", views: 560, clicks: 238, saves: 88 },
    { day: "Ср", views: 860, clicks: 276, saves: 96 },
    { day: "Чт", views: 710, clicks: 229, saves: 83 },
    { day: "Пт", views: 1100, clicks: 287, saves: 98 },
    { day: "Сб", views: 1340, clicks: 332, saves: 126 },
    { day: "Вс", views: 980, clicks: 243, saves: 87 }
  ];

  const revenueMonths = [
    { month: "Окт", value: 42, amount: 45000 },
    { month: "Ноя", value: 67, amount: 68000 },
    { month: "Дек", value: 108, amount: 112000 },
    { month: "Янв", value: 76, amount: 78000 },
    { month: "Фев", value: 92, amount: 95000 },
    { month: "Мар", value: 134, amount: 134000 }
  ];

  const maxWeeklyValue = Math.max(...weeklyActivity.flatMap((item) => [item.views, item.clicks, item.saves]));
  const activeDay = weeklyActivity[activeDayIndex] || weeklyActivity[0];
  const activeRevenue = revenueMonths[activeRevenueIndex] || revenueMonths[defaultRevenueIndex];

  const stats = isDesigner
    ? [
        { label: "Подписчики", value: "2 480" },
        { label: "Работ", value: String(products.length) },
        { label: "Капсул", value: String(designerCapsules.length) },
        { label: "Конверсия", value: analytics.conversion }
      ]
    : [
        { label: "Капсул сохранено", value: String(savedCapsules.length) },
        { label: "История", value: "12" },
        { label: "Любимый стиль", value: user.style || "Минимализм" },
        { label: "Сезон", value: user.season || "Весна" }
      ];

  const historyItems = [
    { title: "Офисная капсула на весну", date: "24 марта 2026", result: "4 вещи и 1 акцент" },
    { title: "Городской образ на каждый день", date: "20 марта 2026", result: "3 варианта верха и обувь" },
    { title: "Минималистичный гардероб", date: "16 марта 2026", result: "2 капсулы в бюджете" }
  ];

  if (!user.authenticated) {
    return (
      <div className="page-grid">
        <div className="empty-block">Сначала войди в платформу, чтобы открыть профиль.</div>
      </div>
    );
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    updateUser(profileForm);
  };

  const handlePublish = (event) => {
    event.preventDefault();
    publishProduct(productForm);
    setProductForm((prev) => ({ ...prev, title: "", price: "", description: "" }));
    setActiveTab("analytics");
  };

  const renderAnalytics = () => (
    <section className="analytics-showcase-shell">
      <section className="analytics-showcase">
        <div className="analytics-top-cards">
          {[
            { title: "Просмотров", value: metrics.views.toLocaleString("ru-RU"), note: "(7 дней)", delta: "+18%", tone: "gold", icon: "◉" },
            { title: "Добавлений в капсулы", value: "342", note: "", delta: "+31%", tone: "violet", icon: "◈" },
            { title: "Лайков", value: metrics.likes.toLocaleString("ru-RU"), note: "", delta: "+12%", tone: "pink", icon: "♡" },
            { title: "Заказов", value: String(metrics.leads), note: "", delta: "+8%", tone: "green", icon: "◍" }
          ].map((item) => (
            <article className={`analytics-top-card ${item.tone}`} key={item.title}>
              <div className="analytics-top-card-head">
                <span className="analytics-icon">{item.icon}</span>
                <span className="analytics-delta">{item.delta}</span>
              </div>
              <strong>{item.value}</strong>
              <p>{item.title} {item.note}</p>
            </article>
          ))}
        </div>

        <div className="analytics-board-grid">
          <article className="analytics-board analytics-board-wide">
            <div className="analytics-board-head">
              <h3>Активность за 7 дней</h3>
              <div className="analytics-legend">
                <span className="views">Просмотры</span>
                <span className="clicks">Клики</span>
                <span className="saves">Сохранения</span>
              </div>
            </div>
            <div className="analytics-line-chart">
              <div className="analytics-line-grid"></div>
              <svg viewBox="0 0 700 260" preserveAspectRatio="none" className="analytics-line-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="analyticsArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#efc05e" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#efc05e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,200 C80,188 120,180 160,160 C210,130 250,105 320,128 C390,152 430,102 490,70 C550,38 600,40 700,110 L700,260 L0,260 Z" fill="url(#analyticsArea)" />
                <path d="M0,200 C80,188 120,180 160,160 C210,130 250,105 320,128 C390,152 430,102 490,70 C550,38 600,40 700,110" className="analytics-line line-views" />
                <path d="M0,208 C80,196 120,188 160,171 C210,144 250,122 320,142 C390,162 430,123 490,95 C550,70 600,72 700,132" className="analytics-line line-clicks" />
                <path d="M0,232 C80,226 120,222 160,210 C210,194 250,182 320,192 C390,202 430,176 490,164 C550,146 600,142 700,186" className="analytics-line line-saves" />
                {weeklyActivity.map((item, index) => {
                  const x = (index / (weeklyActivity.length - 1)) * 700;
                  const viewsY = 220 - (item.views / maxWeeklyValue) * 170;
                  return <circle key={item.day} cx={x} cy={viewsY} r={index === activeDayIndex ? 6 : 0} className="analytics-active-dot" />;
                })}
              </svg>
              <div className="analytics-hover-zones">
                {weeklyActivity.map((item, index) => (
                  <button
                    key={item.day}
                    className={`analytics-hover-zone ${index === activeDayIndex ? "active" : ""}`}
                    onMouseEnter={() => setActiveDayIndex(index)}
                    onFocus={() => setActiveDayIndex(index)}
                    type="button"
                    aria-label={`Показать аналитику за ${item.day}`}
                  />
                ))}
              </div>
              <div className="analytics-tooltip-card" style={{ left: `calc(${(activeDayIndex / (weeklyActivity.length - 1)) * 100}% - 54px)` }}>
                <strong>{activeDay.day}</strong>
                <span className="views">views : {activeDay.views}</span>
                <span className="clicks">clicks : {activeDay.clicks}</span>
                <span className="saves">saves : {activeDay.saves}</span>
              </div>
              <div className="analytics-tooltip-line" style={{ left: `${(activeDayIndex / (weeklyActivity.length - 1)) * 100}%` }}></div>
              <div className="analytics-axis-labels">
                {weeklyActivity.map((item) => <span key={item.day}>{item.day}</span>)}
              </div>
            </div>
          </article>

          <article className="analytics-board">
            <div className="analytics-board-head">
              <h3>География</h3>
            </div>
            <div className="analytics-geo-list">
              {analytics.geo.map((item) => (
                <div className="analytics-geo-row" key={item.city}>
                  <div className="analytics-geo-labels">
                    <span>{item.city}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="analytics-geo-bar">
                    <div className="analytics-geo-fill" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="analytics-board-grid analytics-board-grid-bottom">
          <article className="analytics-board analytics-board-wide">
            <div className="analytics-board-head">
              <h3>Выручка по месяцам</h3>
            </div>
            <div className="analytics-bar-chart">
              <div
                className="analytics-revenue-tooltip"
                style={{ left: `calc(${(activeRevenueIndex / Math.max(revenueMonths.length - 1, 1)) * 100}% - 62px)` }}
              >
                <strong>{activeRevenue.month}</strong>
                <span>Выручка : {activeRevenue.amount.toLocaleString("ru-RU")} ₽</span>
              </div>
              {revenueMonths.map((item, index) => (
                <button
                  className={`analytics-bar-item ${index === activeRevenueIndex ? "active" : ""}`}
                  key={item.month}
                  onMouseEnter={() => setActiveRevenueIndex(index)}
                  onFocus={() => setActiveRevenueIndex(index)}
                  onMouseLeave={() => setActiveRevenueIndex(defaultRevenueIndex)}
                  onBlur={() => setActiveRevenueIndex(defaultRevenueIndex)}
                  type="button"
                  aria-label={`Показать выручку за ${item.month}`}
                >
                  <div className={`analytics-bar ${index === activeRevenueIndex ? "highlight" : ""}`} style={{ height: `${item.value}%` }}></div>
                  <span>{item.month}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="analytics-board">
            <div className="analytics-board-head">
              <h3>Демография</h3>
            </div>
            <div className="analytics-donut-wrap">
              <div className="analytics-donut"></div>
              <div className="analytics-donut-legend">
                {analytics.audience.map((item, index) => (
                  <div className="analytics-donut-row" key={item.label}>
                    <span className={`analytics-dot dot-${index + 1}`}></span>
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );

  const renderRequests = () => (
    <section className="profile-content-panel">
      <div className="profile-content-head">
        <div>
          <h3>Запросы от клиентов</h3>
          <p>Новые заявки, уточнения по бюджету и запросы на покупку вещи.</p>
        </div>
      </div>
      <div className="profile-request-list">
        {requests.map((request) => (
          <article className="profile-content-card profile-request-card" key={request.id}>
            <div className="profile-request-head">
              <div>
                <h4>{request.name}</h4>
                <span>{request.client}</span>
              </div>
              <span className={`request-status status-${getStatusClass(request.status)}`}>{request.status}</span>
            </div>
            <p>{request.note}</p>
            <div className="profile-request-footer">
              <strong>Бюджет: {formatCurrency(request.budget)}</strong>
              <button className="ghost-btn" type="button" onClick={() => setActiveTab("messages")}>
                Открыть диалог
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="profile-content-panel">
      <div className="profile-content-head">
        <div>
          <h3>Сообщения</h3>
          <p>Обсуждение деталей заказа, капсулы и покупки вещи напрямую с клиентом.</p>
        </div>
      </div>
      <div className="chat-box tall">
        {designerMessages.map((item, index) => (
          <div className={`message-bubble ${item.role === "designer" ? "self" : ""}`} key={`${item.role}-${index}`}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="chat-compose">
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ответить клиенту" />
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            if (!message.trim()) return;
            sendDesignerMessage(message.trim());
            setMessage("");
          }}
        >
          Отправить
        </button>
      </div>
    </section>
  );

  const renderPublish = () => (
    <section className="profile-content-panel">
      <div className="profile-content-head">
        <div>
          <h3>Опубликовать новую вещь</h3>
          <p>Добавь карточку товара в каталог, чтобы она попала в ленту и AI-капсулы.</p>
        </div>
      </div>
      <form className="upload-grid" onSubmit={handlePublish}>
        <input value={productForm.title} onChange={(event) => setProductForm({ ...productForm, title: event.target.value })} placeholder="Название вещи" required />
        <select
          value={productForm.category}
          onChange={(event) => {
            const value = event.target.value;
            setProductForm({ ...productForm, category: value, categoryLabel: categoryLabels[value] });
          }}
        >
          <option value="outerwear">Верхний слой</option>
          <option value="tops">Верх</option>
          <option value="bottoms">Низ</option>
          <option value="shoes">Обувь</option>
          <option value="accessories">Акцент</option>
          <option value="dresses">Платье</option>
        </select>
        <input value={productForm.designer} onChange={(event) => setProductForm({ ...productForm, designer: event.target.value })} placeholder="Псевдоним дизайнера" />
        <input value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} placeholder="Цена, ₽" type="number" required />
        <input value={productForm.styles} onChange={(event) => setProductForm({ ...productForm, styles: event.target.value })} placeholder="Стили через запятую" />
        <input value={productForm.image} onChange={(event) => setProductForm({ ...productForm, image: event.target.value })} placeholder="URL фото" />
        <textarea value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} placeholder="Описание вещи" required />
        <button className="primary-btn wide-btn" type="submit">Опубликовать вещь</button>
      </form>
    </section>
  );

  const renderDesignerCapsules = () => (
    <section className="profile-content-panel">
      <div className="profile-content-head">
        <div>
          <h3>Капсулы дизайнера</h3>
          <p>Готовые подборки для пользователей и быстрый способ показать свой стиль.</p>
        </div>
      </div>
      <div className="capsule-create-row">
        <input value={capsuleName} onChange={(event) => setCapsuleName(event.target.value)} placeholder="Название новой капсулы" />
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            if (!capsuleName.trim()) return;
            createDesignerCapsule(capsuleName.trim());
            setCapsuleName("");
          }}
        >
          Создать
        </button>
      </div>
      <div className="profile-card-grid">
        {designerCapsules.map((item) => (
          <article className="profile-content-card capsule-preview-card" key={item.id}>
            <div className="capsule-preview-card-head">
              <span className="capsule-preview-pill">Готовая капсула</span>
              <strong>{formatCurrency(item.budget)}</strong>
            </div>
            <h3>{item.name}</h3>
            <p>{item.items} вещей в подборке. Такая капсула может попасть в рекомендации и личные запросы клиентов.</p>
          </article>
        ))}
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="profile-content-panel">
      <div className="profile-content-head">
        <div>
          <h3>Настройки аккаунта</h3>
          <p>Псевдоним, почта, приватность и базовые параметры профиля.</p>
        </div>
      </div>
      <form className="profile-settings-form" onSubmit={handleProfileSubmit}>
        <div className="profile-fields split">
          <div className="profile-field">
            <strong>Псевдоним</strong>
            <input value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} />
          </div>
          <div className="profile-field">
            <strong>Email</strong>
            <input value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} />
          </div>
          <div className="profile-field">
            <strong>Приватность</strong>
            <select value={profileForm.privacy} onChange={(event) => setProfileForm({ ...profileForm, privacy: event.target.value })}>
              <option value="public">Публичный</option>
              <option value="contacts">Только контакты</option>
              <option value="private">Приватный</option>
            </select>
          </div>
          <div className="profile-field">
            <strong>Аватар</strong>
            <span className="muted-text">Первая буква псевдонима отображается автоматически по всему сайту.</span>
          </div>
        </div>
        <button className="primary-btn" type="submit">Сохранить изменения</button>
      </form>
    </section>
  );

  const renderClientSection = () => {
    if (activeTab === "capsules" || activeTab === "favorites") {
      return (
        <section className="profile-content-panel">
          <div className="profile-content-head">
            <div>
              <h3>{activeTab === "capsules" ? "Мои капсулы" : "Избранное"}</h3>
              <p>Все сохранённые подборки и вещи, к которым можно быстро вернуться.</p>
            </div>
          </div>
          <div className="profile-card-grid">
            {savedCapsules.length ? (
              savedCapsules.map((item) => (
                <article className="profile-content-card capsule-preview-card" key={item.id}>
                  <div className="capsule-preview-card-head">
                    <span className="capsule-preview-pill">Сохранено</span>
                    <strong>{formatCurrency(item.total)}</strong>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.items} вещей в капсуле. Можно вернуться к подборке и открыть дизайнера.</p>
                </article>
              ))
            ) : (
              <div className="empty-block">Пока здесь пусто. Сохрани первую капсулу, и она появится в профиле.</div>
            )}
          </div>
        </section>
      );
    }

    if (activeTab === "history") {
      return (
        <section className="profile-content-panel">
          <div className="profile-content-head">
            <div>
              <h3>История запросов</h3>
              <p>Все предыдущие сценарии и капсулы, к которым можно быстро вернуться.</p>
            </div>
          </div>
          <div className="profile-history-list">
            {historyItems.map((item) => (
              <article className="profile-content-card profile-history-card" key={item.title}>
                <div>
                  <h4>{item.title}</h4>
                  <span>{item.date}</span>
                </div>
                <p>{item.result}</p>
              </article>
            ))}
          </div>
        </section>
      );
    }

    return renderSettings();
  };

  return (
    <div className="page-grid">
      <Reveal>
        <section className={`profile-reference-shell ${isDesigner ? "designer-profile-shell" : ""} ${isDesigner && activeTab === "analytics" ? "designer-analytics-shell" : ""}`}>
          <div className="profile-reference-cover">
            <div className="profile-reference-cover-glow"></div>
          </div>

          <div className="profile-reference-header">
            <div className="profile-reference-main">
              <div className="profile-reference-avatar">{user.avatar}</div>
              <div className="profile-reference-copy">
                <div className="profile-reference-title-row">
                  <h1>{user.name}</h1>
                  <span>{isDesigner ? "Дизайнер" : "Клиент"}</span>
                  {isDesigner ? <CheckCircle2 size={15} /> : null}
                </div>
                <p>
                  {isDesigner
                    ? "Публикации, аналитика, сообщения и капсулы — в одном studio-кабинете."
                    : "Сохранённые подборки, история и персональные настройки — в одном профиле."}
                </p>
              </div>
            </div>

            <div className="profile-reference-actions">
              <button className="ghost-btn" type="button" onClick={() => setEditMode(true)}>
                <Edit3 size={14} /> Редактировать
              </button>
              <button className="ghost-btn" type="button">
                <Share2 size={14} /> Поделиться
              </button>
            </div>
          </div>

          <div className="profile-reference-stats">
            {stats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="profile-reference-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="profile-reference-content">
            {isDesigner ? (
              activeTab === "analytics" ? renderAnalytics() :
              activeTab === "requests" ? renderRequests() :
              activeTab === "messages" ? renderMessages() :
              activeTab === "publish" ? renderPublish() :
              activeTab === "capsules" ? renderDesignerCapsules() :
              renderSettings()
            ) : renderClientSection()}
          </div>

          <div className="profile-reference-footer-action">
            <button
              className="profile-logout-button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              type="button"
            >
              <LogOut size={16} />
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </Reveal>

      <AnimatePresence>
        {editMode ? (
          <motion.div
            className="profile-edit-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditMode(false)}
          >
            <motion.div
              className="profile-edit-modal"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h3>Редактировать профиль</h3>
              <form
                className="profile-settings-form"
                onSubmit={(event) => {
                  handleProfileSubmit(event);
                  setEditMode(false);
                }}
              >
                <div className="profile-fields split">
                  <div className="profile-field">
                    <strong>Псевдоним</strong>
                    <input value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} />
                  </div>
                  <div className="profile-field">
                    <strong>Email</strong>
                    <input value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} />
                  </div>
                  <div className="profile-field">
                    <strong>Приватность</strong>
                    <select value={profileForm.privacy} onChange={(event) => setProfileForm({ ...profileForm, privacy: event.target.value })}>
                      <option value="public">Публичный</option>
                      <option value="contacts">Только контакты</option>
                      <option value="private">Приватный</option>
                    </select>
                  </div>
                </div>
                <div className="profile-edit-actions">
                  <button className="ghost-btn" type="button" onClick={() => setEditMode(false)}>Отмена</button>
                  <button className="primary-btn" type="submit">Сохранить</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
