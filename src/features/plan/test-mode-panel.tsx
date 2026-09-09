import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, FlaskConical, Check } from "lucide-react";
import { getMySubscription, updateMySubscription } from "@/lib/subscription.functions";
import type { Plan, Subscription, SubscriptionStatus } from "@/lib/permissions";

const planOptions: { value: Plan; label: string }[] = [
  { value: "start", label: "Start" },
  { value: "pro", label: "Pro" },
];

const statusOptions: { value: SubscriptionStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "canceled", label: "Canceled" },
  { value: "past_due", label: "Past due" },
];

/**
 * Modo de teste (MVP): altera manualmente o plano e o status da assinatura
 * do usuário autenticado, gravando na tabela `subscriptions`.
 */
export function TestModePanel() {
  const fetchSubscription = useServerFn(getMySubscription);
  const saveSubscription = useServerFn(updateMySubscription);

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plan, setPlan] = useState<Plan>("start");
  const [status, setStatus] = useState<SubscriptionStatus>("active");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchSubscription();
      setSubscription(data);
      if (data) {
        setPlan(data.plan);
        setStatus(data.status);
      }
      setError(null);
    } catch {
      setError("Não foi possível carregar a assinatura. Entre com sua conta e tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [fetchSubscription]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const data = await saveSubscription({ data: { plan, status } });
      setSubscription(data);
      setSaved(true);
    } catch {
      setError("Não foi possível salvar a assinatura.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card-elevated p-5" aria-label="Modo de teste de assinatura">
      <div className="flex items-center gap-2">
        <FlaskConical className="h-4 w-4 text-primary-glow" aria-hidden />
        <h3 className="text-sm font-semibold text-foreground">Modo de teste — minha assinatura</h3>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Altere manualmente plano e status enquanto o checkout não existe. A mudança é gravada no
        banco e vale para a conta autenticada.
      </p>

      {loading ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden /> Carregando…
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="test-mode-plan"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Plano
              </label>
              <select
                id="test-mode-plan"
                value={plan}
                onChange={(e) => {
                  setPlan(e.target.value as Plan);
                  setSaved(false);
                }}
                className="w-full rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm text-foreground"
              >
                {planOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="test-mode-status"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Status
              </label>
              <select
                id="test-mode-status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as SubscriptionStatus);
                  setSaved(false);
                }}
                className="w-full rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm text-foreground"
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Check className="h-4 w-4" aria-hidden />
              )}
              Salvar assinatura
            </button>
            {subscription && (
              <span className="text-xs text-muted-foreground">
                Atual: <strong className="text-foreground">{subscription.plan}</strong> ·{" "}
                <strong className="text-foreground">{subscription.status}</strong>
              </span>
            )}
            {saved && (
              <span className="text-xs text-success" role="status">
                Assinatura atualizada.
              </span>
            )}
          </div>

          {error && (
            <p className="text-xs text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
