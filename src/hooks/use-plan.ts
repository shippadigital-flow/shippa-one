import { useSubscription } from "@/features/plan/plan-provider";
import { canAccessPath, type Plan, type Subscription } from "@/lib/permissions";

export type { Plan };
export { canAccess, canAccessPath, hasProAccess } from "@/lib/permissions";

/** Plano real do usuário autenticado (fonte de verdade: banco de dados). */
export function usePlan() {
  const { plan, status, isPro, loading, updateSubscription } = useSubscription();
  return { plan, status, isPro, loading, updateSubscription };
}

/** Item de navegação bloqueado para o plano atual. */
export function isLocked(path: string, subscription: Subscription | null): boolean {
  return !canAccessPath(path, subscription);
}
