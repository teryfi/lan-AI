const state = {
  currentView: "auth-landing",
  feedSort: "smart",
  dashboardTab: "works",
  user: {
    name: "Новый пользователь",
    email: "hello@lan.ai",
    role: "client",
    avatar: "ЛА",
    privacy: "public",
    authenticated: false
  },
  filters: {
    category: "all",
    styles: [],
    priceFrom: null,
    priceTo: null
  },
  aiProfile: {
    height: 168,
    bodyType: "petite",
    style: "soft minimal",
    season: "spring",
    budget: 30000,
    palette: "теплые нейтралы",
    prompt: "Нужна мягкая городская капсула для офиса, встреч и повседневности."
  },
  products: [
    {
      id: 1,
      title: "Бежевый тренч",
      designer: "Анна С.",
      category: "outerwear",
      categoryLabel: "Верхняя одежда",
      price: 25000,
      styles: ["minimal", "classic"],
      materials: "Хлопок, вискоза",
      description: "Лёгкий тренч для городской весны с чистым силуэтом и мягкой линией плеча.",
      rating: 4.9,
      likes: 214,
      createdAt: "2026-03-21T11:00:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 2,
      title: "Кожаная куртка",
      designer: "Максим В.",
      category: "outerwear",
      categoryLabel: "Верхняя одежда",
      price: 32000,
      styles: ["street", "casual"],
      materials: "Экокожа, хлопок",
      description: "Куртка с плотной посадкой и выразительным плечом для более смелого городского образа.",
      rating: 4.8,
      likes: 186,
      createdAt: "2026-03-20T16:20:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 3,
      title: "Шерстяное пальто",
      designer: "Елена К.",
      category: "outerwear",
      categoryLabel: "Верхняя одежда",
      price: 45000,
      styles: ["classic", "minimal"],
      materials: "Шерсть, альпака",
      description: "Структурное пальто для тех, кто любит спокойную силу и архитектурный крой.",
      rating: 5,
      likes: 241,
      createdAt: "2026-03-19T13:00:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 4,
      title: "Вечернее платье",
      designer: "Дарья Н.",
      category: "dresses",
      categoryLabel: "Платья",
      price: 35000,
      styles: ["romantic", "classic"],
      materials: "Шёлк, подкладка",
      description: "Платье с мягким блеском и длинной вертикалью для вечерних выходов.",
      rating: 4.7,
      likes: 168,
      createdAt: "2026-03-18T19:40:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 5,
      title: "Платье миди",
      designer: "София Р.",
      category: "dresses",
      categoryLabel: "Платья",
      price: 18000,
      styles: ["minimal", "casual"],
      materials: "Тенсел, хлопок",
      description: "Универсальное платье для ежедневной капсулы, которое легко комбинировать с верхней одеждой.",
      rating: 4.8,
      likes: 205,
      createdAt: "2026-03-21T08:10:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 6,
      title: "Кожаные ботинки",
      designer: "Мария Т.",
      category: "shoes",
      categoryLabel: "Обувь",
      price: 15000,
      styles: ["classic", "street"],
      materials: "Кожа, резина",
      description: "Лаконичные ботинки для осенне-весенних капсул с уверенной базовой формой.",
      rating: 4.6,
      likes: 153,
      createdAt: "2026-03-17T14:15:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 7,
      title: "Шёлковый платок",
      designer: "Ника Л.",
      category: "accessories",
      categoryLabel: "Аксессуары",
      price: 7000,
      styles: ["romantic", "classic"],
      materials: "Шёлк",
      description: "Акцентный аксессуар, который добавляет цвет в спокойные гардеробные капсулы.",
      rating: 4.9,
      likes: 126,
      createdAt: "2026-03-20T12:00:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 8,
      title: "Лоферы soft black",
      designer: "Ирина П.",
      category: "shoes",
      categoryLabel: "Обувь",
      price: 19000,
      styles: ["minimal", "classic"],
      materials: "Кожа",
      description: "Мягкие лоферы для капсул с фокусом на комфорте и спокойной элегантности.",
      rating: 4.8,
      likes: 177,
      createdAt: "2026-03-21T09:30:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 9,
      title: "Белая футболка base",
      designer: "Анна С.",
      category: "tops",
      categoryLabel: "Верх",
      price: 5900,
      styles: ["minimal", "casual"],
      materials: "Хлопок",
      description: "Чистая базовая футболка для ежедневной капсулы и многослойных образов.",
      rating: 4.9,
      likes: 198,
      createdAt: "2026-03-21T10:40:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 10,
      title: "Рубашка soft blue",
      designer: "Ника Л.",
      category: "tops",
      categoryLabel: "Верх",
      price: 9900,
      styles: ["classic", "minimal"],
      materials: "Хлопок, тенсел",
      description: "Спокойная рубашка для офисных и повседневных капсул с мягкой линией плеча.",
      rating: 4.8,
      likes: 154,
      createdAt: "2026-03-20T09:20:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 11,
      title: "Прямые брюки graphite",
      designer: "София Р.",
      category: "bottoms",
      categoryLabel: "Низ",
      price: 12900,
      styles: ["minimal", "classic"],
      materials: "Шерсть, вискоза",
      description: "Прямые брюки для спокойной городской капсулы с хорошей посадкой по талии.",
      rating: 4.9,
      likes: 187,
      createdAt: "2026-03-21T07:50:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1506629905607-d9c297d4d5e8?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 12,
      title: "Джинсы straight indigo",
      designer: "Максим В.",
      category: "bottoms",
      categoryLabel: "Низ",
      price: 11900,
      styles: ["casual", "street"],
      materials: "Деним",
      description: "Прямые джинсы для более расслабленных капсул, которые легко сочетать с базовым верхом.",
      rating: 4.7,
      likes: 144,
      createdAt: "2026-03-19T10:00:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 13,
      title: "Топ rib milk",
      designer: "Мария Т.",
      category: "tops",
      categoryLabel: "Верх",
      price: 4900,
      styles: ["minimal", "romantic"],
      materials: "Хлопок, эластан",
      description: "Лаконичный топ для многослойных и летних капсул с мягкой фактурой.",
      rating: 4.8,
      likes: 121,
      createdAt: "2026-03-18T11:10:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80')"
    },
    {
      id: 14,
      title: "Юбка midi sand",
      designer: "Елена К.",
      category: "bottoms",
      categoryLabel: "Низ",
      price: 13600,
      styles: ["romantic", "classic"],
      materials: "Вискоза",
      description: "Миди-юбка для мягкой женственной капсулы с спокойным движением ткани.",
      rating: 4.8,
      likes: 139,
      createdAt: "2026-03-20T15:30:00",
      status: "Опубликовано",
      palette: "url('https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80')"
    }
  ],
  featuredCapsules: [
    { id: 1, name: "City Ease", designer: "Анна С.", itemsCount: 6, price: 28900, rating: 4.9, palette: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80')" },
    { id: 2, name: "Office Soft", designer: "София Р.", itemsCount: 5, price: 26100, rating: 4.8, palette: "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80')" },
    { id: 3, name: "Quiet Contrast", designer: "Ирина П.", itemsCount: 7, price: 31800, rating: 5, palette: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80')" }
  ],
  designerCapsules: [
    { id: 1, name: "Office Layering", items: 5, budget: 29600 },
    { id: 2, name: "Soft Weekend", items: 4, budget: 21400 }
  ],
  savedCapsules: [],
  assistantMessages: [
    { role: "assistant", text: "Я помогу адаптировать капсулу под стиль, фигуру, сценарий дня и бюджет." }
  ],
  designerMessages: [
    { role: "client", text: "Нужна спокойная капсула для весны и офиса, без ярких цветов." },
    { role: "designer", text: "Соберу подборку в мягкой нейтральной палитре и уложусь в заданный бюджет." }
  ]
};

const el = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  fillDefaults();
  renderAll();
});

function cacheElements() {
  el.views = document.querySelectorAll(".view");
  el.navButtons = document.querySelectorAll("[data-nav]");
  el.feedSortButtons = document.querySelectorAll("[data-feed-sort]");
  el.dashboardTabs = document.querySelectorAll(".dashboard-tab");
  el.authModal = document.getElementById("authModal");
  el.toastStack = document.getElementById("toastStack");
  el.featuredCapsules = document.getElementById("featuredCapsules");
  el.feedGrid = document.getElementById("feedGrid");
  el.aiResults = document.getElementById("aiResults");
  el.aiReason = document.getElementById("aiReason");
  el.assistantMessages = document.getElementById("assistantMessages");
  el.dashboardWorksList = document.getElementById("dashboardWorksList");
  el.designerCapsulesList = document.getElementById("designerCapsulesList");
  el.designerChat = document.getElementById("designerChat");
  el.savedCapsulesList = document.getElementById("savedCapsulesList");
}

function bindEvents() {
  el.navButtons.forEach((button) => button.addEventListener("click", () => navigate(button.dataset.nav)));
  el.feedSortButtons.forEach((button) => button.addEventListener("click", () => setFeedSort(button.dataset.feedSort)));
  el.dashboardTabs.forEach((button) => button.addEventListener("click", () => setDashboardTab(button.dataset.dashboardTab)));

  document.getElementById("quickAddBtn").addEventListener("click", () => {
    navigate("profile");
    setDashboardTab("works");
    document.getElementById("workTitle").focus();
  });
  document.getElementById("openAuthBtn").addEventListener("click", () => toggleAuth(true));
  document.getElementById("openAuthModalBtn").addEventListener("click", () => toggleAuth(true));
  document.getElementById("profileChipBtn").addEventListener("click", () => navigate("profile"));
  document.getElementById("openUploadFromDashboardBtn").addEventListener("click", () => {
    setDashboardTab("works");
    document.getElementById("workTitle").focus();
  });

  document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
  document.getElementById("prefillAiBtn").addEventListener("click", fillDefaults);
  document.getElementById("aiForm").addEventListener("submit", handleAiSubmit);
  document.getElementById("saveAiCapsuleBtn").addEventListener("click", saveCurrentCapsule);
  document.getElementById("shareAiCapsuleBtn").addEventListener("click", () => showToast("Ссылка на капсулу скопирована"));
  document.getElementById("exportAiCapsuleBtn").addEventListener("click", exportCurrentCapsule);
  document.getElementById("assistantAskBtn").addEventListener("click", askAssistant);

  document.getElementById("uploadForm").addEventListener("submit", handleUpload);
  document.getElementById("createDesignerCapsuleBtn").addEventListener("click", createDesignerCapsule);
  document.getElementById("sendDesignerMessageBtn").addEventListener("click", sendDesignerMessage);

  document.getElementById("authForm").addEventListener("submit", handleAuth);
  document.getElementById("closeAuthBtn").addEventListener("click", () => toggleAuth(false));
  el.authModal.addEventListener("click", (event) => {
    if (event.target === el.authModal) toggleAuth(false);
  });

  document.getElementById("profileForm").addEventListener("submit", handleProfileSave);
}

function fillDefaults() {
  document.getElementById("clientHeight").value = state.aiProfile.height;
  document.getElementById("clientBodyType").value = state.aiProfile.bodyType;
  document.getElementById("clientStyle").value = state.aiProfile.style;
  document.getElementById("clientSeason").value = state.aiProfile.season;
  document.getElementById("clientBudget").value = state.aiProfile.budget;
  document.getElementById("clientPalette").value = state.aiProfile.palette;
  document.getElementById("clientPrompt").value = state.aiProfile.prompt;

  document.getElementById("profileUserName").value = state.user.name;
  document.getElementById("profileUserEmail").value = state.user.email;
  document.getElementById("profileUserRole").value = state.user.role;
  document.getElementById("profileUserAvatar").value = state.user.avatar;
  document.getElementById("profilePrivacy").value = state.user.privacy;

  if (document.getElementById("authName")) document.getElementById("authName").value = state.user.authenticated ? state.user.name : "";
  if (document.getElementById("authEmail")) document.getElementById("authEmail").value = state.user.authenticated ? state.user.email : "";
  if (document.getElementById("authRole")) document.getElementById("authRole").value = state.user.role;
  if (document.getElementById("authAvatar")) document.getElementById("authAvatar").value = state.user.authenticated ? state.user.avatar : "";
}

function renderAll() {
  renderNavigation();
  renderFeaturedCapsules();
  renderFeed();
  renderAssistantMessages();
  renderDashboardWorks();
  renderDesignerCapsules();
  renderDesignerChat();
  renderSavedCapsules();
  renderHeaderUser();
  updateHeroStats();
  updateDashboardMetrics();
  renderRoleSections();
}

function renderNavigation() {
  el.views.forEach((view) => view.classList.toggle("active", view.id === `view-${state.currentView}`));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.nav === state.currentView));
  document.body.classList.toggle("is-auth-landing", state.currentView === "auth-landing" && !state.user.authenticated);
}

function navigate(view) {
  if (!state.user.authenticated && view !== "auth-landing") {
    state.currentView = "auth-landing";
    renderNavigation();
    showToast("Сначала войдите или зарегистрируйтесь");
    return;
  }

  if (view === "dashboard") {
    view = "profile";
  }

  if (view === "auth") {
    toggleAuth(true);
    return;
  }
  state.currentView = view;
  renderNavigation();
}

function toggleAuth(show) {
  el.authModal.classList.toggle("hidden", !show);
}

function setFeedSort(mode) {
  state.feedSort = mode;
  el.feedSortButtons.forEach((button) => button.classList.toggle("active", button.dataset.feedSort === mode));
  renderFeed();
}

function setDashboardTab(tab) {
  state.dashboardTab = tab;
  document.querySelectorAll(".dashboard-tab").forEach((button) => button.classList.toggle("active", button.dataset.dashboardTab === tab));
  document.querySelectorAll(".dashboard-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `dashboard-${tab}`));
}

function renderFeaturedCapsules() {
  el.featuredCapsules.innerHTML = state.featuredCapsules.map((capsule) => `
    <article class="featured-card">
      <div class="featured-image" style="--preview:${capsule.palette}"></div>
      <div class="featured-content">
        <h3>${capsule.name}</h3>
        <p class="muted-text">${capsule.designer}</p>
        <div class="featured-meta">
          <span>${capsule.itemsCount} вещей</span>
          <span>${capsule.price.toLocaleString("ru-RU")} ₽</span>
        </div>
      </div>
    </article>
  `).join("");
}

function applyFilters() {
  state.filters.category = document.getElementById("filterCategory").value;
  state.filters.styles = Array.from(document.querySelectorAll(".check-list input:checked")).map((input) => input.value);
  state.filters.priceFrom = Number(document.getElementById("priceFrom").value) || null;
  state.filters.priceTo = Number(document.getElementById("priceTo").value) || null;
  renderFeed();
  showToast("Фильтры применены");
}

function renderFeed() {
  const products = getFilteredProducts();
  const heights = [300, 240, 340, 280, 320, 250];
  const feedCount = document.getElementById("feedCount");
  if (feedCount) feedCount.textContent = products.length.toLocaleString("ru-RU");
  el.feedGrid.innerHTML = products.map((product) => `
    <article class="feed-card">
      <div class="feed-image" style="--preview:${product.palette}; --card-height:${heights[product.id % heights.length]}px"></div>
      <div class="feed-content">
        <span class="feed-tag">${product.categoryLabel}</span>
        <div class="feed-title-row">
          <h3>${product.title}</h3>
          <span class="price">${product.price.toLocaleString("ru-RU")} ₽</span>
        </div>
        <p class="muted-text">${shorten(product.description, 105)}</p>
        <div class="feed-card-actions">
          <button class="ghost-btn" onclick="favoriteProduct(${product.id})">В избранное</button>
          <button class="ghost-btn" onclick="startCapsuleFromProduct(${product.id})">В капсулу</button>
        </div>
        <div class="feed-footer">
          <span>${product.designer}</span>
          <button class="mini-link" onclick="openDesignerDashboard()">Подробнее</button>
        </div>
      </div>
    </article>
  `).join("");
}

function getFilteredProducts() {
  const sorted = [...state.products].sort((a, b) => {
    if (state.feedSort === "new") return new Date(b.createdAt) - new Date(a.createdAt);
    return (b.likes + b.rating * 20) - (a.likes + a.rating * 20);
  });

  return sorted.filter((product) => {
    const categoryPass = state.filters.category === "all" || product.category === state.filters.category;
    const stylePass = !state.filters.styles.length || state.filters.styles.some((style) => product.styles.includes(style));
    const minPass = !state.filters.priceFrom || product.price >= state.filters.priceFrom;
    const maxPass = !state.filters.priceTo || product.price <= state.filters.priceTo;
    return categoryPass && stylePass && minPass && maxPass;
  });
}

function handleAiSubmit(event) {
  event.preventDefault();
  state.aiProfile = {
    height: Number(document.getElementById("clientHeight").value),
    bodyType: document.getElementById("clientBodyType").value,
    style: document.getElementById("clientStyle").value,
    season: document.getElementById("clientSeason").value,
    budget: Number(document.getElementById("clientBudget").value),
    palette: document.getElementById("clientPalette").value,
    prompt: document.getElementById("clientPrompt").value
  };

  const capsule = rankForCapsule().slice(0, 4);
  state.currentCapsule = capsule;
  renderAiResults();
}

function rankForCapsule() {
  const query = `${state.aiProfile.style} ${state.aiProfile.season} ${state.aiProfile.palette} ${state.aiProfile.prompt}`.toLowerCase();
  const ranked = state.products
    .filter((product) => product.price <= state.aiProfile.budget)
    .map((product) => {
      const haystack = `${product.title} ${product.description} ${product.styles.join(" ")} ${product.categoryLabel}`.toLowerCase();
      const matchScore = query.split(/\s+/).reduce((score, token) => {
        if (token.length < 3) return score;
        return score + (haystack.includes(token) ? 12 : 0);
      }, 46);
      const budgetScore = Math.max(0, 22 - Math.round(product.price / state.aiProfile.budget * 18));
      const styleScore = product.styles.includes(normalizeStyle(state.aiProfile.style)) ? 18 : 6;
      return {
        ...product,
        match: Math.min(98, matchScore + budgetScore + styleScore)
      };
    })
    .sort((a, b) => b.match - a.match);

  return buildCapsuleFromCategories(ranked, state.aiProfile.budget);
}

function buildCapsuleFromCategories(ranked, budget) {
  const desired = ["tops", "bottoms", "outerwear", "shoes", "accessories"];
  const capsule = [];
  let total = 0;

  desired.forEach((category) => {
    const found = ranked.find((item) => item.category === category && !capsule.some((selected) => selected.id === item.id));
    if (found && total + found.price <= budget) {
      capsule.push(found);
      total += found.price;
    }
  });

  if (!capsule.some((item) => item.category === "tops")) {
    const dress = ranked.find((item) => item.category === "dresses");
    if (dress && total + dress.price <= budget) {
      capsule.push(dress);
      total += dress.price;
    }
  }

  return capsule.length ? capsule : ranked.slice(0, 4);
}

function normalizeStyle(style) {
  const lower = style.toLowerCase();
  if (lower.includes("minimal")) return "minimal";
  if (lower.includes("classic")) return "classic";
  if (lower.includes("street")) return "street";
  if (lower.includes("casual")) return "casual";
  if (lower.includes("romantic")) return "romantic";
  return "minimal";
}

function renderAiResults() {
  if (!state.currentCapsule || !state.currentCapsule.length) {
    el.aiResults.innerHTML = `<div class="empty-block">Ничего не найдено в рамках заданного бюджета.</div>`;
    return;
  }

  const total = state.currentCapsule.reduce((sum, item) => sum + item.price, 0);
  el.aiReason.textContent = `Подбор учёл стиль "${state.aiProfile.style}", сезон "${state.aiProfile.season}", палитру "${state.aiProfile.palette}" и бюджет до ${state.aiProfile.budget.toLocaleString("ru-RU")} ₽. Общая стоимость капсулы: ${total.toLocaleString("ru-RU")} ₽.`;
  const order = ["tops", "bottoms", "outerwear", "shoes", "accessories", "dresses"];
  const labels = {
    tops: "Верх",
    bottoms: "Низ",
    outerwear: "Верхний слой",
    shoes: "Обувь",
    accessories: "Акцент",
    dresses: "Платье"
  };

  const items = order
    .map((category) => state.currentCapsule.find((item) => item.category === category))
    .filter(Boolean);

  el.aiResults.innerHTML = `
    <div class="capsule-layout-board">
      ${items.map((item) => `
        <article class="capsule-card role-card">
          <div class="capsule-image" style="--preview:${item.palette}"></div>
          <div class="capsule-card-content">
            <span class="capsule-role-label">${labels[item.category] || item.categoryLabel}</span>
            <div class="capsule-card-head">
              <h3>${item.title}</h3>
              <span class="match-badge">${item.match}%</span>
            </div>
            <p class="muted-text">${shorten(item.description, 92)}</p>
            <div class="feed-footer">
              <span>${item.designer}</span>
              <span class="price">${item.price.toLocaleString("ru-RU")} ₽</span>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function saveCurrentCapsule() {
  if (!state.currentCapsule || !state.currentCapsule.length) {
    showToast("Сначала собери капсулу");
    return;
  }

  const total = state.currentCapsule.reduce((sum, item) => sum + item.price, 0);
  state.savedCapsules.unshift({
    id: Date.now(),
    name: `Capsule ${state.savedCapsules.length + 1}`,
    items: state.currentCapsule.length,
    total
  });
  renderSavedCapsules();
  updateHeroStats();
  showToast("Капсула сохранена");
}

function exportCurrentCapsule() {
  if (!state.currentCapsule || !state.currentCapsule.length) {
    showToast("Нет капсулы для экспорта");
    return;
  }
  showToast("Список покупок подготовлен");
}

function askAssistant() {
  const input = document.getElementById("assistantInput");
  const text = input.value.trim();
  if (!text) return;

  state.assistantMessages.push({ role: "user", text });
  state.assistantMessages.push({ role: "assistant", text: buildAssistantReply(text) });
  input.value = "";
  renderAssistantMessages();
}

function buildAssistantReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("пиджак")) return "Если хочется мягче, замени пиджак на укороченный тренч или тонкий кардиган со структурной линией плеча.";
  if (lower.includes("цвет")) return `Под твою палитру "${state.aiProfile.palette}" лучше всего работают молочный, тёплый серо-бежевый и один глубокий акцент вроде винного или графитового.`;
  if (lower.includes("обув")) return "Для такой капсулы лучше держать одну спокойную базовую пару: лоферы, ботинки или чистые кожаные кеды.";
  return "Смотри на капсулу как на набор ролей: один базовый верх, один пластичный низ, один акцент и одна спокойная обувь. Так она работает лучше и не перегружается.";
}

function renderAssistantMessages() {
  el.assistantMessages.innerHTML = state.assistantMessages.map((message) => `
    <div class="message-bubble ${message.role === "user" ? "self" : ""}">${message.text}</div>
  `).join("");
}

function handleUpload(event) {
  event.preventDefault();
  const category = document.getElementById("workCategory").value;
  const categoryLabel = {
    outerwear: "Верхняя одежда",
    dresses: "Платья",
    shoes: "Обувь",
    accessories: "Аксессуары"
  }[category];

  const styles = document.getElementById("workStyles").value.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  const seed = document.getElementById("workTitle").value + document.getElementById("workDesigner").value;
  state.products.unshift({
    id: Date.now(),
    title: document.getElementById("workTitle").value,
    designer: document.getElementById("workDesigner").value,
    category,
    categoryLabel,
    price: Number(document.getElementById("workPrice").value),
    styles,
    materials: document.getElementById("workMaterials").value,
    description: document.getElementById("workDescription").value,
    rating: 4.7,
    likes: 0,
    createdAt: new Date().toISOString(),
    status: "Опубликовано",
    palette: buildPalette(seed)
  });

  event.target.reset();
  renderFeed();
  renderDashboardWorks();
  updateHeroStats();
  updateDashboardMetrics();
  showToast("Работа опубликована");
}

function renderDashboardWorks() {
  el.dashboardWorksList.innerHTML = state.products.map((item) => `
    <article class="dashboard-item">
      <div class="dashboard-thumb" style="--preview:${item.palette}"></div>
      <div>
        <div class="dashboard-item-row">
          <h3>${item.title}</h3>
          <span class="price">${item.price.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div class="dashboard-item-sub">${item.categoryLabel} • ${item.designer}</div>
      </div>
      <span class="dashboard-status">${item.status}</span>
    </article>
  `).join("");
}

function createDesignerCapsule() {
  const input = document.getElementById("designerCapsuleName");
  const value = input.value.trim();
  if (!value) {
    showToast("Введите название капсулы");
    return;
  }
  state.designerCapsules.unshift({
    id: Date.now(),
    name: value,
    items: Math.max(3, Math.min(7, state.products.length)),
    budget: state.products.slice(0, 3).reduce((sum, item) => sum + item.price, 0)
  });
  input.value = "";
  renderDesignerCapsules();
  showToast("Капсула дизайнера создана");
}

function renderDesignerCapsules() {
  el.designerCapsulesList.innerHTML = state.designerCapsules.map((item) => `
    <article class="dashboard-item">
      <div class="dashboard-thumb" style="--preview:${buildPalette(item.name)}"></div>
      <div>
        <div class="dashboard-item-row">
          <h3>${item.name}</h3>
          <span class="price">${item.budget.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div class="dashboard-item-sub">${item.items} вещей в подборке</div>
      </div>
      <span class="dashboard-status">Готово</span>
    </article>
  `).join("");
}

function renderDesignerChat() {
  el.designerChat.innerHTML = state.designerMessages.map((message) => `
    <div class="message-bubble ${message.role === "designer" ? "self" : ""}">${message.text}</div>
  `).join("");
}

function sendDesignerMessage() {
  const input = document.getElementById("designerMessageInput");
  const text = input.value.trim();
  if (!text) return;
  state.designerMessages.push({ role: "designer", text });
  input.value = "";
  renderDesignerChat();
}

function renderSavedCapsules() {
  el.savedCapsulesList.innerHTML = state.savedCapsules.length
    ? state.savedCapsules.map((item) => `
      <article class="dashboard-item">
        <div class="dashboard-thumb" style="--preview:${buildPalette(item.name)}"></div>
        <div>
          <div class="dashboard-item-row">
            <h3>${item.name}</h3>
            <span class="price">${item.total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div class="dashboard-item-sub">${item.items} вещи в сохранённой капсуле</div>
        </div>
        <span class="dashboard-status">Сохранено</span>
      </article>
    `).join("")
    : `<div class="empty-block">Сохранённые капсулы появятся после первого AI-подбора.</div>`;
}

function handleAuth(event) {
  event.preventDefault();
  applyUserAuth({
    name: document.getElementById("authName").value,
    email: document.getElementById("authEmail").value,
    role: document.getElementById("authRole").value,
    avatar: document.getElementById("authAvatar").value.toUpperCase(),
    privacy: document.getElementById("authPrivacyInput").value
  });
  toggleAuth(false);
}

function handleProfileSave(event) {
  event.preventDefault();
  state.user.name = document.getElementById("profileUserName").value || state.user.name;
  state.user.email = document.getElementById("profileUserEmail").value || state.user.email;
  state.user.role = document.getElementById("profileUserRole").value;
  state.user.avatar = (document.getElementById("profileUserAvatar").value || state.user.avatar).toUpperCase();
  state.user.privacy = document.getElementById("profilePrivacy").value;
  renderHeaderUser();
  renderRoleSections();
  showToast("Профиль обновлён");
}

function applyUserAuth(userData) {
  state.user = {
    ...state.user,
    ...userData,
    authenticated: true
  };
  fillDefaults();
  renderHeaderUser();
  renderRoleSections();
  navigate(state.user.role === "designer" ? "profile" : "home");
  showToast(`Профиль ${state.user.role === "designer" ? "дизайнера" : "пользователя"} создан`);
}

function renderHeaderUser() {
  document.getElementById("headerAvatar").textContent = state.user.avatar;
  document.getElementById("headerName").textContent = state.user.name;
  document.getElementById("profileAvatarLarge").textContent = state.user.avatar;
  document.getElementById("profileName").textContent = state.user.name;
  document.getElementById("profileRole").textContent = state.user.role === "designer" ? "Designer" : "Client";
  document.getElementById("quickAddBtn").style.display = state.user.role === "designer" && state.user.authenticated ? "inline-flex" : "none";
  document.getElementById("openAuthBtn").style.display = state.user.authenticated ? "none" : "inline-flex";
  document.getElementById("profileChipBtn").style.display = state.user.authenticated ? "inline-flex" : "none";
}

function renderRoleSections() {
  const block = document.getElementById("designerProfileBlock");
  if (!block) return;
  block.classList.toggle("visible", state.user.role === "designer" && state.user.authenticated);
}

function updateHeroStats() {
  document.getElementById("heroDesignersStat").textContent = `${140 + Math.floor(state.products.length / 2)}`;
  document.getElementById("heroCapsulesStat").textContent = (2460 + state.savedCapsules.length * 4).toLocaleString("ru-RU");
  document.getElementById("heroRevenueStat").textContent = `₽ ${(1.8 + state.products.length * 0.03).toFixed(1)}M`;
}

function updateDashboardMetrics() {
  const views = state.products.reduce((sum, item) => sum + item.likes * 22, 8200);
  const likes = state.products.reduce((sum, item) => sum + item.likes, 0);
  const leads = Math.max(12, Math.round(likes / 18));
  const revenue = Math.round(state.products.slice(0, 5).reduce((sum, item) => sum + item.price, 0) / 1000);
  document.getElementById("metricViews").textContent = views.toLocaleString("ru-RU");
  document.getElementById("metricLikes").textContent = likes.toLocaleString("ru-RU");
  document.getElementById("metricLeads").textContent = leads.toLocaleString("ru-RU");
  document.getElementById("metricRevenue").textContent = `${revenue}k ₽`;
}

function buildPalette(seed) {
  const base = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `linear-gradient(135deg, hsl(${base % 360} 50% 74%), hsl(${(base + 58) % 360} 35% 42%))`;
}

function shorten(text, max) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  el.toastStack.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

window.favoriteProduct = function favoriteProduct(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  product.likes += 1;
  renderFeed();
  showToast(`"${product.title}" добавлено в избранное`);
};

window.startCapsuleFromProduct = function startCapsuleFromProduct(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  navigate("ai");
  state.currentCapsule = [product];
  document.getElementById("clientStyle").value = product.styles[0] || "minimal";
  document.getElementById("clientBudget").value = Math.max(product.price * 2, 30000);
  renderAiResults();
  showToast(`"${product.title}" добавлено как старт капсулы`);
};

window.openDesignerDashboard = function openDesignerDashboard() {
  navigate("profile");
  if (state.user.role === "designer") setDashboardTab("works");
};
