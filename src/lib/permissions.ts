/**
 * Camada central de permissões do Shippa One.
 *
 * Toda verificação de plano deve passar por `canAccess` / `canAccessPath`.
 * Nunca compare `plan === "pro"` diretamente em componentes.
 */

export type Plan = "start" | "pro";
export type SubscriptionStatus = "active" | "canceled" | "past_due";

export type Subscription = {
  plan: Plan;
  status: SubscriptionStatus;
  startedAt: string | null;
  expiresAt: string | null;
};

export type Feature =
  // START
  | "overview"
  | "my_site"
  | "blog"
  | "library"
  | "seo_basic"
  | "settings"
  | "support"
  | "plans"
  // PRO
  | "growth_center"
  | "analytics"
  | "seo_advanced"
  | "search_console"
  | "integrations"
  | "insights"
  | "leads"
  | "conversions"
  | "reports";

export const START_FEATURES: readonly Feature[] = [
  "overview",
  "my_site",
  "blog",
  "library",
  "seo_basic",
  "settings",
  "support",
  "plans",
];

export const PRO_FEATURES: readonly Feature[] = [
  "growth_center",
  "analytics",
  "seo_advanced",
  "search_console",
  "integrations",
  "insights",
  "leads",
  "conversions",
  "reports",
];

const startSet = new Set<Feature>(START_FEATURES);
const proSet = new Set<Feature>(PRO_FEATURES);

/** Uma assinatura só concede recursos PRO quando o plano é `pro` E o status é `active`. */
export function hasProAccess(subscription: Subscription | null | undefined): boolean {
  return subscription?.plan === "pro" && subscription.status === "active";
}

export function canAccess(feature: Feature, subscription: Subscription | null | undefined): boolean {
  if (startSet.has(feature)) return true;
  if (proSet.has(feature)) return hasProAccess(subscription);
  return false;
}

/** Mapeamento rota → funcionalidade. */
export const FEATURE_BY_PATH: Record<string, Feature> = {
  "/": "overview",
  "/site": "my_site",
  "/blog": "blog",
  "/biblioteca": "library",
  "/seo": "seo_basic",
  "/configuracoes": "settings",
  "/suporte": "support",
  "/planos": "plans",
  "/crescimento": "growth_center",
  "/analytics": "analytics",
  "/integracoes": "integrations",
  "/insights": "insights",
  "/leads": "leads",
  "/conversoes": "conversions",
  "/relatorios": "reports",
};

/**
 * A Central de Crescimento é sempre navegável: para START ela é a própria
 * experiência de upgrade.
 */
const ALWAYS_NAVIGABLE = new Set<string>(["/crescimento"]);

export function canAccessPath(path: string, subscription: Subscription | null | undefined): boolean {
  if (ALWAYS_NAVIGABLE.has(path)) return true;
  const feature = FEATURE_BY_PATH[path];
  if (!feature) return true;
  return canAccess(feature, subscription);
}

export const DEFAULT_SUBSCRIPTION: Subscription = {
  plan: "start",
  status: "active",
  startedAt: null,
  expiresAt: null,
};
