import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { getMySubscription, updateMySubscription } from "@/lib/subscription.functions";
import {
  canAccess as canAccessFeature,
  hasProAccess,
  type Feature,
  type Plan,
  type Subscription,
  type SubscriptionStatus,
} from "@/lib/permissions";

type PlanContextValue = {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
  plan: Plan | null;
  status: SubscriptionStatus | null;
  isPro: boolean;
  canAccess: (feature: Feature) => boolean;
  refresh: () => Promise<void>;
  updateSubscription: (next: { plan: Plan; status: SubscriptionStatus }) => Promise<void>;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const fetchSubscription = useServerFn(getMySubscription);
  const saveSubscription = useServerFn(updateMySubscription);

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchSubscription();
      setSubscription(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar sua assinatura");
    } finally {
      setLoading(false);
    }
  }, [fetchSubscription]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateSubscription = useCallback(
    async (next: { plan: Plan; status: SubscriptionStatus }) => {
      const data = await saveSubscription({ data: next });
      setSubscription(data);
    },
    [saveSubscription],
  );

  const value: PlanContextValue = {
    subscription,
    loading,
    error,
    plan: subscription?.plan ?? null,
    status: subscription?.status ?? null,
    isPro: hasProAccess(subscription),
    canAccess: (feature) => canAccessFeature(feature, subscription),
    refresh,
    updateSubscription,
  };

  if (loading) {
    return <PlanBootScreen />;
  }

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function PlanBootScreen() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden />
        <p className="text-sm">Carregando sua assinatura…</p>
      </div>
    </div>
  );
}

export function useSubscription(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("useSubscription precisa estar dentro de <PlanProvider>");
  }
  return ctx;
}
