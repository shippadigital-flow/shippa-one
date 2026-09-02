import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useSubscription } from "@/features/plan/plan-provider";
import type { Feature } from "@/lib/permissions";

/**
 * Protege o conteúdo de uma funcionalidade.
 * - Enquanto a assinatura carrega → loading (nunca "pisca" como START).
 * - Sem acesso → experiência de upgrade (`locked`).
 * - Com acesso → conteúdo do módulo.
 */
export function PlanGate({
  feature,
  locked,
  children,
}: {
  feature: Feature;
  locked: ReactNode;
  children: ReactNode;
}) {
  const { loading, canAccess } = useSubscription();

  if (loading) return <ModuleLoading />;
  return <>{canAccess(feature) ? children : locked}</>;
}

export function ModuleLoading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
      <span className="ml-2 text-sm">Carregando módulo…</span>
    </div>
  );
}
