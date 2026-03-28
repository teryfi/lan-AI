const seasonKeywords = {
  spring: ["вес", "тренч", "межсез", "плащ", "жакет"],
  summer: ["лет", "лёгк", "легк", "открыт", "топ", "мюл", "балет"],
  autumn: ["осе", "пальто", "ботин", "тёпл", "тепл", "трикот", "шарф"],
  winter: ["зим", "тёпл", "тепл", "пальто", "шарф", "сап"]
};

const occasionKeywords = {
  office: ["офис", "жакет", "рубаш", "брюк", "лофер", "делов"],
  everyday: ["город", "ежеднев", "повсед", "база", "каждый день"],
  travel: ["поезд", "комфорт", "мягк", "расслаб", "лёгк", "легк"],
  evening: ["вечер", "событ", "драп", "акцент", "каблук", "элегант"]
};

const paletteKeywords = {
  neutral: ["beige", "беж", "молоч", "графит", "сер", "чист", "soft black", "black"],
  dark: ["black", "графит", "тём", "тем", "бордо"],
  light: ["молоч", "свет", "пастел", "песоч", "лёгк", "легк"],
  warm: ["беж", "песоч", "карам", "террак", "корич"],
  accent: ["бордо", "акцент", "ярк", "контраст", "цвет"]
};

const silhouetteKeywords = {
  straight: ["прям", "чист", "лакон", "ровн"],
  relaxed: ["свобод", "широк", "расслаб", "бомбер", "овер"],
  soft: ["мягк", "драп", "сатин", "пластич", "лёгк", "легк"],
  defined: ["собира", "силуэт", "структур", "притал", "аккурат"]
};

const comfortKeywords = {
  relaxed: ["мягк", "комфорт", "свобод", "лёгк", "легк"],
  balanced: ["универс", "ежеднев", "город", "спокойн"],
  structured: ["собран", "структур", "офис", "чист", "делов"]
};

export const defaultAiFilters = {
  style: "",
  season: "",
  category: "",
  occasion: "",
  palette: "",
  silhouette: "",
  comfort: "",
  bodyType: "",
  heightRange: "",
  weightRange: "",
  sizeRange: "",
  minPrice: 0,
  maxPrice: 50000
};

export const aiFilterOptions = {
  styles: [
    { value: "", label: "Все" },
    { value: "minimal", label: "Минимализм" },
    { value: "classic", label: "Классика" },
    { value: "casual", label: "Кэжуал" },
    { value: "street", label: "Стритвир" },
    { value: "romantic", label: "Романтичный" }
  ],
  seasons: [
    { value: "", label: "Все" },
    { value: "spring", label: "Весна" },
    { value: "summer", label: "Лето" },
    { value: "autumn", label: "Осень" },
    { value: "winter", label: "Зима" }
  ],
  categories: [
    { value: "", label: "Все" },
    { value: "outerwear", label: "Верхний слой" },
    { value: "tops", label: "Верх" },
    { value: "bottoms", label: "Низ" },
    { value: "dresses", label: "Платья" },
    { value: "shoes", label: "Обувь" },
    { value: "accessories", label: "Акцент" }
  ],
  occasions: [
    { value: "", label: "Любой" },
    { value: "office", label: "Офис" },
    { value: "everyday", label: "На каждый день" },
    { value: "travel", label: "Поездка" },
    { value: "evening", label: "Выход / событие" }
  ],
  palettes: [
    { value: "", label: "Любая" },
    { value: "neutral", label: "Нейтральная" },
    { value: "light", label: "Светлая" },
    { value: "dark", label: "Тёмная" },
    { value: "warm", label: "Тёплая" },
    { value: "accent", label: "С акцентом" }
  ],
  silhouettes: [
    { value: "", label: "Любой" },
    { value: "straight", label: "Прямой" },
    { value: "relaxed", label: "Свободный" },
    { value: "soft", label: "Мягкий" },
    { value: "defined", label: "Собранный" }
  ],
  comforts: [
    { value: "", label: "Любой" },
    { value: "relaxed", label: "Максимум комфорта" },
    { value: "balanced", label: "Баланс" },
    { value: "structured", label: "Более собранно" }
  ],
  bodyTypes: [
    { value: "", label: "Не важно" },
    { value: "straight", label: "Прямой" },
    { value: "curvy", label: "С выраженными формами" },
    { value: "petite", label: "Миниатюрный" },
    { value: "tall", label: "Высокий" }
  ],
  heightRanges: [
    { value: "", label: "Любой" },
    { value: "petite", label: "До 164 см" },
    { value: "regular", label: "165–174 см" },
    { value: "tall", label: "175+ см" }
  ],
  weightRanges: [
    { value: "", label: "Любой" },
    { value: "light", label: "До 55 кг" },
    { value: "medium", label: "55–70 кг" },
    { value: "dense", label: "70+ кг" }
  ],
  sizeRanges: [
    { value: "", label: "Любой" },
    { value: "xs-s", label: "XS–S" },
    { value: "m-l", label: "M–L" },
    { value: "xl-plus", label: "XL+" }
  ],
  minPrices: [
    { value: 0, label: "Без минимума" },
    { value: 5000, label: "От 5 000 ₽" },
    { value: 10000, label: "От 10 000 ₽" },
    { value: 15000, label: "От 15 000 ₽" },
    { value: 20000, label: "От 20 000 ₽" }
  ]
};

function hasKeyword(text, keywords = []) {
  return keywords.some((keyword) => text.includes(keyword));
}

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

export function buildItemProfile(item) {
  const text = normalizeText(`${item.title} ${item.description} ${item.categoryLabel}`);
  const styles = item.styles || [];

  const seasons = Object.entries(seasonKeywords)
    .filter(([, keywords]) => hasKeyword(text, keywords))
    .map(([season]) => season);

  if (!seasons.length) {
    if (item.category === "outerwear") seasons.push("spring", "autumn");
    if (item.category === "shoes") seasons.push("spring", "autumn");
    if (item.category === "dresses") seasons.push("spring", "summer");
    if (!seasons.length) seasons.push("spring", "summer", "autumn");
  }

  const occasions = Object.entries(occasionKeywords)
    .filter(([, keywords]) => hasKeyword(text, keywords))
    .map(([occasion]) => occasion);

  if (!occasions.length) {
    occasions.push(styles.includes("classic") ? "office" : "everyday");
    if (styles.includes("casual")) occasions.push("travel");
    if (styles.includes("romantic")) occasions.push("evening");
  }

  const palettes = Object.entries(paletteKeywords)
    .filter(([, keywords]) => hasKeyword(text, keywords))
    .map(([palette]) => palette);

  if (!palettes.length) {
    if (styles.includes("street")) palettes.push("dark", "accent");
    else if (styles.includes("romantic")) palettes.push("light", "warm");
    else palettes.push("neutral");
  }

  const silhouettes = Object.entries(silhouetteKeywords)
    .filter(([, keywords]) => hasKeyword(text, keywords))
    .map(([silhouette]) => silhouette);

  if (!silhouettes.length) {
    if (styles.includes("street") || item.category === "outerwear") silhouettes.push("relaxed");
    if (styles.includes("classic")) silhouettes.push("defined", "straight");
    if (styles.includes("minimal")) silhouettes.push("straight");
    if (styles.includes("romantic")) silhouettes.push("soft");
  }

  const comfort = Object.entries(comfortKeywords)
    .find(([, keywords]) => hasKeyword(text, keywords))?.[0]
    || (styles.includes("classic") ? "structured" : styles.includes("casual") ? "relaxed" : "balanced");

  const bodyTypes = new Set(["straight"]);
  const heightRanges = new Set(["regular"]);
  const weightRanges = new Set(["medium"]);
  const sizeRanges = new Set(["m-l"]);

  if (silhouettes.includes("defined") || styles.includes("classic")) {
    bodyTypes.add("curvy");
    weightRanges.add("dense");
  }

  if (silhouettes.includes("soft")) {
    bodyTypes.add("petite");
    weightRanges.add("light");
  }

  if (silhouettes.includes("relaxed") || item.category === "outerwear") {
    bodyTypes.add("tall");
    heightRanges.add("tall");
    sizeRanges.add("xl-plus");
  }

  if (item.category === "accessories" || item.category === "shoes") {
    bodyTypes.add("curvy");
    bodyTypes.add("petite");
    bodyTypes.add("tall");
    heightRanges.add("petite");
    heightRanges.add("tall");
    weightRanges.add("light");
    weightRanges.add("dense");
    sizeRanges.add("xs-s");
    sizeRanges.add("xl-plus");
  }

  if (silhouettes.includes("straight") || styles.includes("minimal")) {
    heightRanges.add("petite");
    heightRanges.add("tall");
    sizeRanges.add("xs-s");
  }

  return {
    seasons,
    occasions,
    palettes,
    silhouettes,
    comfort,
    bodyTypes: [...bodyTypes],
    heightRanges: [...heightRanges],
    weightRanges: [...weightRanges],
    sizeRanges: [...sizeRanges]
  };
}

export function matchesAiFilters(item, filters) {
  const profile = buildItemProfile(item);

  const byStyle = !filters.style || item.styles.includes(filters.style);
  const bySeason = !filters.season || profile.seasons.includes(filters.season);
  const byCategory = !filters.category || item.category === filters.category;
  const byOccasion = !filters.occasion || profile.occasions.includes(filters.occasion);
  const byPalette = !filters.palette || profile.palettes.includes(filters.palette);
  const bySilhouette = !filters.silhouette || profile.silhouettes.includes(filters.silhouette);
  const byComfort = !filters.comfort || profile.comfort === filters.comfort;
  const byMinPrice = item.price >= filters.minPrice;
  const byMaxPrice = item.price <= filters.maxPrice;

  return byStyle && bySeason && byCategory && byOccasion && byPalette && bySilhouette && byComfort && byMinPrice && byMaxPrice;
}

export function getAiPreferenceScore(item, filters) {
  const profile = buildItemProfile(item);
  let score = 0;

  if (filters.bodyType && profile.bodyTypes.includes(filters.bodyType)) score += 3;
  if (filters.heightRange && profile.heightRanges.includes(filters.heightRange)) score += 3;
  if (filters.weightRange && profile.weightRanges.includes(filters.weightRange)) score += 2;
  if (filters.sizeRange && profile.sizeRanges.includes(filters.sizeRange)) score += 2;
  if (filters.comfort && profile.comfort === filters.comfort) score += 1;

  return score;
}

export function getActiveAiFilterCount(filters) {
  return Object.entries(filters).reduce((count, [key, value]) => {
    if (key === "minPrice") return count + (value > 0 ? 1 : 0);
    if (key === "maxPrice") return count + (value < defaultAiFilters.maxPrice ? 1 : 0);
    return count + (value ? 1 : 0);
  }, 0);
}
