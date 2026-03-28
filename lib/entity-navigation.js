export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createItemRouteId(item) {
  return `item-${item.id}`;
}

export function createCapsuleRouteId(capsule) {
  return `capsule-${capsule.source || "capsule"}-${capsule.id}`;
}

export function getItemHref(item) {
  return `/items/${createItemRouteId(item)}`;
}

export function getCapsuleHref(capsule) {
  return `/capsules/${createCapsuleRouteId(capsule)}`;
}

export function getEntityHref(type, entity) {
  return type === "capsule" ? getCapsuleHref(entity) : getItemHref(entity);
}

export function getDesignerContactHref({ designer, contextType, contextId, contextTitle }) {
  const params = new URLSearchParams({
    tab: "messages",
    designer: designer || "",
    contextType: contextType || "",
    contextId: contextId || "",
    contextTitle: contextTitle || ""
  });

  return `/profile?${params.toString()}`;
}

export function getItemAssistantHref({ itemId, itemTitle }) {
  const prompt = itemTitle
    ? `С чем сочетается ${itemTitle}? Подскажи стиль, обувь, верхний слой и акцент.`
    : "С чем это сочетается? Подскажи образ и стилистические сочетания.";

  const params = new URLSearchParams({
    assistantPrompt: prompt,
    assistantItemId: itemId || "",
    assistantItemTitle: itemTitle || ""
  });

  return `/ai?${params.toString()}#assistant-panel`;
}
