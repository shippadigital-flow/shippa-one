import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, TrendingUp, RefreshCw, XCircle, Download } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/assinaturas")({
  component: SubscriptionsPage,
});

const subs = [
  { id: "s1", company: "Clínica Bem-Estar", plan: "Pro", value: "R$ 349", status: "Ativa", next: "15/08/2026", method: "Cartão · 4242" },
  { id: "s2", company: "Estúdio Norte", plan: "Start", value: "R$ 149", status: "Ativa", next: "22/07/2026", method: "Pix recorrente" },
  { id: "s3", company: "Consultório Aurora", plan: "Pro", value: "R$ 349", status: "Ativa", next: "01/08/2026", method: "Cartão · 1122" },
  { id: "s4", company: "Studio Pilates SP", plan: "Start", value: "R$ 0", status: "Trial", next: "18/07/2026", method: "—" },
  { id: "s5", company: "Odonto Vida", plan: "Pro", value: "R$ 349", status: "Inadimplente", next: "05/07/2026", method: "Cartão · 9900" },
  { id: "s6", company: "Nutre Bem", plan: "Start", value: "R$ 149", status: "Cancelada", next: "—", method: "—" },
];

const kpis = [
  { label: "MRR", value: "R$ 184.320", delta: "+6,4%" },
  { label: "ARR estimado", value: "R$ 2,21M", delta: "+8,1%" },
  { label: "Ticket médio", value: "R$ 267", delta: "+2,3%" },
  { label: "Churn (30d)", value: "1,4%", delta: "-0,3%" },
];

const statusStyles: Record<string, string> = {
  Ativa: "bg-success/15 text-success border-success/30",
  Trial: "bg-primary/15 text-primary-glow border-primary/30",
  Inadimplente: "bg-warning/15 text-warning border-warning/30",
  Cancelada: "bg-destructive/15 text-destructive border-destructive/30",
};

function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operações"
        title="Assinaturas"
        description="Receita recorrente, cobranças e ciclo de vida de cada assinatura."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-accent">
            <Download className="h-4 w-4" /> Exportar
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="card-elevated p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <span className="text-xs font-medium text-success">
                <TrendingUp className="inline h-3 w-3" /> {k.delta}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">{k.value}</p>
          </div>
        ))}
      </section>

      <div className="card-elevated overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border/60 p-4">
          <CreditCard className="h-4 w-4 text-primary-glow" />
          <h3 className="text-sm font-semibold text-foreground">Assinaturas ativas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Plano</th>
                <th className="px-4 py-3 font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Próxima cobrança</th>
                <th className="px-4 py-3 font-medium">Método</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-border/40 transition hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium text-foreground">{s.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">Shippa One {s.plan}</td>
                  <td className="px-4 py-3 text-foreground">{s.value}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium " +
                        statusStyles[s.status]
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.next}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.method}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="mr-1 inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">
                      <RefreshCw className="h-3 w-3" /> Renovar
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs text-destructive hover:bg-destructive/20">
                      <XCircle className="h-3 w-3" /> Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
