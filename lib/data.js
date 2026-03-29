function normalizeItemTitle(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е");
}

const localCardImages = {
  [normalizeItemTitle("Бежевый тренч")]: "/card-images/бежеввый%20тренч.png",
  [normalizeItemTitle("Кожаная куртка")]: "/card-images/кожаная%20куртка.png",
  [normalizeItemTitle("Пальто soft camel")]: "/card-images/Пальто%20soft%20camel.png",
  [normalizeItemTitle("Джинсы straight indigo")]: "/card-images/Джинсы%20straight%20indigo.png",
  [normalizeItemTitle("Прямые брюки graphite")]: "/card-images/Прямые%20брюки%20graphite.png",
  [normalizeItemTitle("Юбка midi sand")]: "/card-images/Юбка%20midi%20sand.png",
  [normalizeItemTitle("Платье wrap olive")]: "/card-images/Платье%20wrap%20olive.png",
  [normalizeItemTitle("Кожаные ботинки")]: "/card-images/кожаные%20ботинки.png",
  [normalizeItemTitle("Кеды cream line")]: "/card-images/Кеды%20cream%20line.png",
  [normalizeItemTitle("Мюли soft tan")]: "/card-images/Мюли%20soft%20tan.png",
  [normalizeItemTitle("Шёлковый платок")]: "/card-images/шелковый%20платок.png",
  [normalizeItemTitle("Ремень chocolate line")]: "/card-images/Ремень%20chocolate%20line.png"
};

function withLocalCardImage(item) {
  const localImage = localCardImages[normalizeItemTitle(item.title)];

  if (!localImage) {
    return item;
  }

  return {
    ...item,
    image: localImage
  };
}

export const featuredCapsules = [
  {
    id: 1,
    source: "featured",
    name: "Soft City",
    designer: "Анна С.",
    price: 28900,
    itemsCount: 5,
    itemIds: [1, 7, 16, 27, 33],
    description: "Спокойная городская капсула для рабочих дней, встреч и длинного ритма недели без перегруза.",
    styleLogic: "Капсула собрана вокруг мягкого тренча, чистого верха и широких брюк. Кеды и ремень удерживают образ в повседневном городском темпе и не ломают спокойную палитру.",
    tags: ["город", "минимализм", "мягкая база"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 2,
    source: "featured",
    name: "Office Light",
    designer: "София Р.",
    price: 31600,
    itemsCount: 6,
    itemIds: [5, 12, 13, 19, 29, 36],
    description: "Капсула для офиса и дневных встреч: собранная, светлая и гибкая по сочетаниям.",
    styleLogic: "Жакет и джемпер создают строгий верхний ритм, прямые брюки и платье дают два сценария низа, а ботильоны и шарф добавляют завершённость и сезонность.",
    tags: ["офис", "layering", "нейтральные тона"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506629905607-d9c297d4d5e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 3,
    source: "featured",
    name: "Quiet Contrast",
    designer: "Ника Л.",
    price: 27400,
    itemsCount: 5,
    itemIds: [6, 8, 17, 24, 30],
    description: "Графичная капсула с контрастом фактур и чистыми формами для современного городского образа.",
    styleLogic: "Бомбер и рубашка создают структуру, сатиновая юбка добавляет движение, а прямое платье и мюли расширяют сценарии ношения от дня до вечера.",
    tags: ["контраст", "город", "современный casual"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

export const catalog = [
  {
    id: 1,
    title: "Бежевый тренч",
    designer: "Анна С.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 25000,
    styles: ["minimal", "classic"],
    description: "Лёгкий тренч для городской весны с чистым силуэтом и мягкой линией плеча.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    title: "Кожаная куртка",
    designer: "Максим В.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 32000,
    styles: ["street", "casual"],
    description: "Выразительная куртка для более смелого городского образа.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    title: "Пальто soft camel",
    designer: "Елена К.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 33800,
    styles: ["classic", "minimal"],
    description: "Мягкое пальто с прямой посадкой для сдержанных капсул.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    title: "Джинсовая куртка washed blue",
    designer: "Мария Т.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 14900,
    styles: ["casual", "street"],
    description: "Свободная куртка для расслабленных городских образов.",
    image: "https://avatars.mds.yandex.net/get-mpic/12525950/2a00000191929d6b3ec708484fb44f050d7c/9hq"
  },
  {
    id: 5,
    title: "Жакет ivory line",
    designer: "София Р.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 21400,
    styles: ["classic", "minimal"],
    description: "Лаконичный жакет, который легко собирает офисную капсулу.",
    image: "https://cdn1.ozone.ru/s3/multimedia-1-j/6975097615.jpg"
  },
  {
    id: 6,
    title: "Бомбер deep olive",
    designer: "Ника Л.",
    category: "outerwear",
    categoryLabel: "Верхний слой",
    price: 18600,
    styles: ["street", "casual"],
    description: "Графичный бомбер для более современного силуэта.",
    image: "https://avatars.mds.yandex.net/get-mpic/4466970/2a0000019abf940809a0d55cf4a5816e1517/orig"
  },

  {
    id: 7,
    title: "Белая футболка base",
    designer: "Анна С.",
    category: "tops",
    categoryLabel: "Верх",
    price: 5900,
    styles: ["minimal", "casual"],
    description: "Чистая базовая футболка для ежедневной капсулы и многослойных образов.",
    image: "https://catalog-cdn.detmir.st/media/36eCwcmrMguTc0FQknSXmeZwi-rWPyRlcchTkM-1100=.jpeg"
  },
  {
    id: 8,
    title: "Рубашка soft blue",
    designer: "Ника Л.",
    category: "tops",
    categoryLabel: "Верх",
    price: 9900,
    styles: ["classic", "minimal"],
    description: "Спокойная рубашка для офисных и повседневных капсул.",
    image: "https://avatars.mds.yandex.net/i?id=dbfa88fe46823d86b81ed6ce9e1bdbc7_l-12476725-images-thumbs&n=13"
  },
  {
    id: 9,
    title: "Топ rib milk",
    designer: "Мария Т.",
    category: "tops",
    categoryLabel: "Верх",
    price: 4900,
    styles: ["minimal", "romantic"],
    description: "Лаконичный топ для многослойных и летних капсул.",
    image: "https://avatars.mds.yandex.net/get-mpic/16141378/2a0000019893d1511d5a81ea54a3ea87ade7/orig"
  },
  {
    id: 10,
    title: "Лонгслив graphite",
    designer: "Ирина П.",
    category: "tops",
    categoryLabel: "Верх",
    price: 7200,
    styles: ["minimal", "casual"],
    description: "Мягкий лонгслив для спокойных городских капсул.",
    image: "https://imgcdn.loverepublic.ru/upload/images/51531/5153122345_32_5.jpg"
  },
  {
    id: 11,
    title: "Блуза powder rose",
    designer: "Елена К.",
    category: "tops",
    categoryLabel: "Верх",
    price: 10800,
    styles: ["romantic", "classic"],
    description: "Лёгкая блуза с мягкой драпировкой и спокойным цветом.",
    image: "https://cdn.100sp.ru/pictures/704700421"
  },
  {
    id: 12,
    title: "Трикотажный джемпер oat",
    designer: "София Р.",
    category: "tops",
    categoryLabel: "Верх",
    price: 13400,
    styles: ["classic", "minimal"],
    description: "Тёплый джемпер для межсезонных капсул и layering-образов.",
    image: "https://ir.ozone.ru/s3/multimedia-o/6838484964.jpg"
  },

  {
    id: 13,
    title: "Прямые брюки graphite",
    designer: "София Р.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 12900,
    styles: ["minimal", "classic"],
    description: "Прямые брюки для спокойной городской капсулы с хорошей посадкой по талии.",
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 14,
    title: "Джинсы straight indigo",
    designer: "Максим В.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 11900,
    styles: ["casual", "street"],
    description: "Прямые джинсы для более расслабленных капсул.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 15,
    title: "Юбка midi sand",
    designer: "Елена К.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 13600,
    styles: ["romantic", "classic"],
    description: "Миди-юбка для мягкой женственной капсулы с спокойным движением ткани.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 16,
    title: "Широкие брюки mocha",
    designer: "Анна С.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 14200,
    styles: ["classic", "minimal"],
    description: "Широкий силуэт для мягких и более свободных офисных образов.",
    image: "https://n.cdn.cdek.shopping/images/shopping/RL4blXO9KMzuPVso.jpg?v=1"
  },
  {
    id: 17,
    title: "Юбка slip silver",
    designer: "Ника Л.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 11800,
    styles: ["romantic", "minimal"],
    description: "Сатиновая юбка как мягкий акцент в вечерней или дневной капсуле.",
    image: "https://usmall.ru/image/726/88/24/7c7f6af478686d85e133fe4a66a4b288.webp"
  },
  {
    id: 18,
    title: "Брюки tapered black",
    designer: "Ирина П.",
    category: "bottoms",
    categoryLabel: "Низ",
    price: 12500,
    styles: ["minimal", "classic"],
    description: "Аккуратные брюки для компактной городской капсулы.",
    image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/211/773/382/610/242/2/600012983030b0.jpg"
  },

  {
    id: 19,
    title: "Платье миди",
    designer: "София Р.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 18000,
    styles: ["minimal", "casual"],
    description: "Универсальное платье для ежедневной капсулы.",
    image: "https://avatars.mds.yandex.net/i?id=d6fcfde33c60630df50aff6c98080726_l-4960439-images-thumbs&n=13"
  },
  {
    id: 20,
    title: "Платье shirt beige",
    designer: "Анна С.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 19400,
    styles: ["classic", "minimal"],
    description: "Платье-рубашка для спокойных городских образов.",
    image: "https://avatars.mds.yandex.net/i?id=d660fcda7e3c965c924d7d0d1977fe46f42ed240-13013568-images-thumbs&n=13"
  },
  {
    id: 21,
    title: "Платье knit smoke",
    designer: "Мария Т.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 16600,
    styles: ["minimal", "romantic"],
    description: "Трикотажное платье с мягкой линией силуэта.",
    image: "https://usmall.ru/image/859/49/48/48b2c0fe1ea69272568a6535041ff328.webp"
  },
  {
    id: 22,
    title: "Платье evening plum",
    designer: "Елена К.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 22800,
    styles: ["romantic", "classic"],
    description: "Платье для событий и вечерних выходов с чистым длинным силуэтом.",
    image: "https://img-edg.joomcdn.net/46059dabe40aae50d0ae26e9e8565e807053d0e9_original.jpeg"
  },
  {
    id: 23,
    title: "Платье wrap olive",
    designer: "Ирина П.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 17300,
    styles: ["casual", "classic"],
    description: "Платье на запах для более гибких дневных образов.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 24,
    title: "Платье column ivory",
    designer: "Ника Л.",
    category: "dresses",
    categoryLabel: "Платье",
    price: 20900,
    styles: ["minimal", "classic"],
    description: "Прямое платье для чистого и взрослого силуэта.",
    image: "https://ir.ozone.ru/s3/multimedia-1-b/7154552675.jpg"
  },

  {
    id: 25,
    title: "Лоферы soft black",
    designer: "Ирина П.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 19000,
    styles: ["minimal", "classic"],
    description: "Мягкие лоферы для капсул с фокусом на комфорте и спокойной элегантности.",
    image: "https://a.lmcdn.ru/img600x866/R/T/RTLABE784502_16746587_3_v1_2x.jpg"
  },
  {
    id: 26,
    title: "Кожаные ботинки",
    designer: "Мария Т.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 15000,
    styles: ["classic", "street"],
    description: "Лаконичные ботинки для осенне-весенних капсул.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 27,
    title: "Кеды cream line",
    designer: "Анна С.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 12900,
    styles: ["casual", "minimal"],
    description: "Сдержанные кеды для лёгких повседневных сочетаний.",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 28,
    title: "Балетки satin nude",
    designer: "Елена К.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 11800,
    styles: ["romantic", "classic"],
    description: "Лёгкая пара для женственных и спокойных капсул.",
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0OPKT_23177241_2_v2.jpg"
  },
  {
    id: 29,
    title: "Ботильоны dark taupe",
    designer: "София Р.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 17400,
    styles: ["classic", "minimal"],
    description: "Чистый силуэт и устойчивый каблук для межсезонных образов.",
    image: "https://n.cdn.cdek.shopping/images/shopping/dLTFI65Ddbn5Kfkm.jpg?v=1"
  },
  {
    id: 30,
    title: "Мюли soft tan",
    designer: "Ника Л.",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 13600,
    styles: ["minimal", "romantic"],
    description: "Открытая обувь для более лёгких и изящных комплектов.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 31,
    title: "Шёлковый платок",
    designer: "Ника Л.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 7000,
    styles: ["romantic", "classic"],
    description: "Акцентный аксессуар, который добавляет цвет в спокойные гардеробные капсулы.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 32,
    title: "Сумка half moon",
    designer: "Елена К.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 15800,
    styles: ["minimal", "classic"],
    description: "Компактная сумка для ежедневных капсул и офисных сочетаний.",
    image: "https://ir.ozone.ru/s3/multimedia-i/6693795666.jpg"
  },
  {
    id: 33,
    title: "Ремень chocolate line",
    designer: "Анна С.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 5400,
    styles: ["classic", "minimal"],
    description: "Тонкий ремень для сборки силуэта и спокойного акцента.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 34,
    title: "Серьги drop silver",
    designer: "Мария Т.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 6200,
    styles: ["romantic", "minimal"],
    description: "Чистые металлические серьги для вечернего или дневного акцента.",
    image: "https://www.bronnitsy.com/upload/iblock/42b/42b9b375fc0bcba0895a28b6c769140b.jpg"
  },
  {
    id: 35,
    title: "Очки amber frame",
    designer: "Ирина П.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 8400,
    styles: ["street", "casual"],
    description: "Акцентная оправа для более уверенного городского образа.",
    image: "https://avatars.mds.yandex.net/i?id=23360d5e722a821cb5046e684e708c7c063d2917-5236855-images-thumbs&n=13"
  },
  {
    id: 36,
    title: "Шарф wool sand",
    designer: "София Р.",
    category: "accessories",
    categoryLabel: "Акцент",
    price: 7600,
    styles: ["classic", "minimal"],
    description: "Тёплый шарф для мягких капсул холодного сезона.",
    image: "https://ir.ozone.ru/s3/multimedia-j/c1000/6458126947.jpg"
  }
].map(withLocalCardImage);

export const initialDesignerCapsules = [
  {
    id: 1,
    source: "designer",
    name: "Office Layering",
    designer: "РЎРѕС„РёСЏ Р .",
    items: 5,
    itemIds: [5, 12, 13, 29, 36],
    budget: 71300,
    description: "Собранная капсула для рабочих дней с акцентом на гибкие верхние слои и чистые пропорции.",
    styleLogic: "Жакет задаёт структуру, джемпер и шарф поддерживают layering, а брюки и ботильоны держат офисный темп.",
    tags: ["офис", "designer capsule", "layering"]
  },
  {
    id: 2,
    source: "designer",
    name: "Soft Weekend",
    designer: "РњР°СЂРёСЏ Рў.",
    items: 4,
    itemIds: [4, 9, 21, 26],
    budget: 51400,
    description: "Выходная капсула для расслабленного города и коротких поездок с мягкой пластикой вещей.",
    styleLogic: "Джинсовая куртка и трикотажное платье создают комфортную основу, а топ и ботинки делают комплект гибким по погоде.",
    tags: ["weekend", "мягкий casual", "поездка"]
  }
];

export const initialMessages = [
  { role: "client", text: "Нужна спокойная капсула для весны и офиса, без ярких цветов." },
  { role: "designer", text: "Соберу подборку в мягкой нейтральной палитре и уложусь в заданный бюджет." }
];
