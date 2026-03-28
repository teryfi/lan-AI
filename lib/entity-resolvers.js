import { createContentCollections } from "@/lib/content-data";

export function resolveContent(appState) {
  return createContentCollections(appState);
}

export function resolveItemByRouteId(routeId, appState) {
  const { items } = resolveContent(appState);
  return items.find((item) => item.routeId === routeId) || null;
}

export function resolveCapsuleByRouteId(routeId, appState) {
  const { capsules } = resolveContent(appState);
  return capsules.find((capsule) => capsule.routeId === routeId) || null;
}

export function resolveRelatedCapsulesForItem(routeId, appState) {
  const { capsules } = resolveContent(appState);
  return capsules.filter((capsule) => capsule.items.some((item) => item.routeId === routeId));
}
