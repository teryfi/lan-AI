import { referenceCapsuleResults } from "@/lib/referenceData";
import { createCapsuleRouteId, createItemRouteId, slugify } from "@/lib/entity-navigation";

const DESIGNER_DIRECTORY = {
  "Анна С.": {
    bio: "Работает с мягким минимализмом и спокойными городскими капсулами.",
    signature: "Минимализм, точный силуэт, спокойная палитра"
  },
  "София Р.": {
    bio: "Собирает выверенные офисные и city-капсулы с акцентом на универсальность.",
    signature: "Чистая база, layering, офисная элегантность"
  },
  "Ника Л.": {
    bio: "Любит графичные формы, многослойность и современный городской ритм.",
    signature: "Городской контраст, графика, современный casual"
  },
  "Елена К.": {
    bio: "Создаёт мягкие женственные капсулы, в которых важны движение ткани и тактильность.",
    signature: "Пластичные ткани, романтичный баланс, мягкий свет"
  },
  "Мария Т.": {
    bio: "Работает с уютными фактурами и повседневной женственной базой.",
    signature: "Повседневная пластика, комфорт, мягкие акценты"
  },
  "Ирина П.": {
    bio: "Собирает спокойные функциональные вещи для носибельных капсул на каждый день.",
    signature: "Функциональная база, комфорт, продуманный минимум"
  },
  "Лань AI": {
    bio: "AI-куратор подбирает сочетаемые вещи и помогает быстро перейти к обсуждению деталей.",
    signature: "AI-курация, совместимость, быстрый переход к покупке"
  }
};

function formatStyleTag(style) {
  if (!style) return "";

  const labels = {
    minimal: "минимализм",
    classic: "классика",
    casual: "casual",
    street: "street",
    romantic: "романтика"
  };

  return labels[style] || style;
}

export function getDesignerMeta(name) {
  const safeName = name || "Лань AI";
  const profile = DESIGNER_DIRECTORY[safeName] || DESIGNER_DIRECTORY["Лань AI"];

  return {
    name: safeName,
    slug: slugify(safeName),
    bio: profile.bio,
    signature: profile.signature
  };
}

export function buildItemModels(products = []) {
  return products.map((item) => {
    const designer = getDesignerMeta(item.designer);
    const styles = Array.isArray(item.styles) ? item.styles : [];

    return {
      ...item,
      source: item.source || "catalog",
      routeId: createItemRouteId(item),
      slug: slugify(item.title),
      designerMeta: designer,
      tags: styles.map(formatStyleTag).filter(Boolean)
    };
  });
}

function buildCapsulePreviewImages(capsule, items) {
  const itemImages = items.map((item) => item.image).filter(Boolean);

  if (capsule.previewImages?.length) {
    return [...new Set([...itemImages, ...capsule.previewImages])].slice(0, 5);
  }

  return itemImages.slice(0, 5);
}

function buildCapsuleDescription(capsule, items) {
  if (capsule.description) return capsule.description;

  if (!items.length) {
    return "Подборка собрана как готовое решение с понятной композицией и быстрым переходом к вещам.";
  }

  return `Капсула из ${items.length} вещей собрана как цельный образ с продуманным балансом ролей и фактур.`;
}

function buildCapsuleStyleLogic(capsule, items) {
  if (capsule.styleLogic) return capsule.styleLogic;

  const roles = items.map((item) => item.categoryLabel).filter(Boolean);
  const uniqueRoles = [...new Set(roles)];

  if (!uniqueRoles.length) {
    return "Композиция строится вокруг чистой базы, удобного темпа носки и понятного визуального центра.";
  }

  return `Композиция держится на сочетании ролей: ${uniqueRoles.join(", ")}. Вещи подобраны так, чтобы работать как единая капсула, а не как случайный набор позиций.`;
}

function buildCapsuleTags(capsule, items) {
  if (capsule.tags?.length) return capsule.tags;

  return [...new Set(items.flatMap((item) => item.tags || []).filter(Boolean))].slice(0, 4);
}

function normalizeCapsule(capsule, source, itemMap) {
  const itemIds = capsule.itemIds || [];
  const items = itemIds.map((id) => itemMap.get(id)).filter(Boolean);
  const designerMeta = getDesignerMeta(capsule.designer || items[0]?.designer || "Лань AI");
  const totalPrice = capsule.totalPrice || capsule.price || items.reduce((sum, item) => sum + (item.price || 0), 0);

  const normalized = {
    ...capsule,
    source,
    itemIds,
    items,
    itemsCount: capsule.itemsCount || capsule.items || itemIds.length || items.length,
    designer: designerMeta.name,
    designerMeta,
    totalPrice,
    previewImages: buildCapsulePreviewImages(capsule, items),
    description: buildCapsuleDescription(capsule, items),
    styleLogic: buildCapsuleStyleLogic(capsule, items),
    tags: buildCapsuleTags(capsule, items)
  };

  return {
    ...normalized,
    routeId: createCapsuleRouteId({ ...normalized, source }),
    slug: slugify(normalized.name)
  };
}

export function buildCapsuleModels({
  products = [],
  featuredCapsules = [],
  savedCapsules = [],
  designerCapsules = []
}) {
  const itemMap = new Map(products.map((item) => [item.id, item]));

  return [
    ...featuredCapsules.map((capsule) => normalizeCapsule(capsule, "featured", itemMap)),
    ...referenceCapsuleResults.map((capsule) => normalizeCapsule(capsule, "reference", itemMap)),
    ...savedCapsules.map((capsule) => normalizeCapsule(capsule, "saved", itemMap)),
    ...designerCapsules.map((capsule) => normalizeCapsule(capsule, "designer", itemMap))
  ];
}

export function createContentCollections(appState) {
  const items = buildItemModels(appState.products);
  const capsules = buildCapsuleModels({
    products: appState.products,
    featuredCapsules: appState.featuredCapsules,
    savedCapsules: appState.savedCapsules,
    designerCapsules: appState.designerCapsules
  });

  return { items, capsules };
}
