import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Users, Clock, Sparkles, TrendingUp, Eye, Repeat } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/uso")({
  component: UsagePage,
});

const kpis = [
  { label: "DAU", value: "412", delta: "+3,8%", icon: Users },
  { label: "WAU", value: "984", delta: "+5,1%", icon: Users },
  { label: "MAU", value: "1.184", delta: "+7,4%", icon: Users },
  { label: "Retenção 30d", value: "88%", delta: "+1,2%", icon: Repeat },
  { label: "Tempo médio", value: "6m 42s", delta: "+18s", icon: Clock },
  { label: "Adoção Flow", value: "38%", delta: "+4%", icon: Sparkles },
];

const modules = [
  { name: "Blog", usage: 92 },
  { name: "Leads", usage: 84 },
  { name: "Analytics", usage: 71 },
  { name: "Meu Site", usage: 66 },
  { name: "Biblioteca", usage: 52 },
  { name: "Flow", usage: 38 },
];

const pages = [
  { path: "/", label: "Dashboard", views: "18.204" },
  { path: "/leads", label: "Leads", views: "12.402" },
  { path: "/blog", label: "Blog", views: "9.812" },
  { path: "/analytics", label: "Analytics", views: "7.220" },
  { path: "/site", label: "Meu Site", views: "5.410" },
];

const inactive = [
  { name: "Ateliê Bordô", last: "há 24 dias" },
  { name: "Studio Fit RJ", last: "há 19 dias" },
  { name: "Consultório Vida Plena", last: "há 17 dias" },
  { name: "Doceria Aurora", last: "há 15 dias" },
];

function UsagePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inteligência"
        title="Uso & Analytics"
        description="Como os clientes estão utilizando o Shippa One."
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="card-elevated p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <k.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-success">
                <TrendingUp className="inline h-3 w-3" /> {k.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{k.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary-glow" />
            <h3 className="text-base font-semibold text-foreground">Módulos mais acessados</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {modules.map((m) => (
              <li key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">{m.usage}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-primary"
                    style={{ width: `${m.usage}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary-glow" />
            <h3 className="text-base font-semibold text-foreground">Páginas mais visualizadas</h3>
          </div>
          <ul className="mt-4 divide-y divide-border/40">
            {pages.map((p) => (
              <li key={p.path} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.path}</p>
                </div>
                <span className="text-sm text-foreground">{p.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="card-elevated p-6">
        <h3 className="text-base font-semibold text-foreground">Clientes inativos</h3>
        <p className="text-xs text-muted-foreground">
          Sem acesso há mais de 14 dias. Considere disparar reativação.
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {inactive.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2.5"
            >
              <span className="text-sm text-foreground">{c.name}</span>
              <span className="text-xs text-warning">{c.last}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
