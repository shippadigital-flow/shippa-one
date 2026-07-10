import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Boxes, Info } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/modulos")({
  component: ModulesPage,
});

const modules = ["Blog", "Leads", "Analytics", "SEO", "Google", "Integrações", "Flow", "Biblioteca"];
const clients = [
  { id: "c1", name: "Clínica Bem-Estar", plan: "Pro", enabled: [true, true, true, true, true, false, false, true] },
  { id: "c2", name: "Estúdio Norte", plan: "Start", enabled: [true, true, true, false, false, false, false, true] },
  { id: "c3", name: "Consultório Aurora", plan: "Pro", enabled: [true, true, true, true, true, true, false, true] },
  { id: "c4", name: "Studio Pilates SP", plan: "Start", enabled: [true, true, false, false, false, false, false, true] },
  { id: "c5", name: "Espaço Zen", plan: "Pro", enabled: [true, true, true, true, false, false, true, true] },
  { id: "c6", name: "Odonto Vida", plan: "Pro", enabled: [true, true, true, true, true, true, false, true] },
];

function ModulesPage() {
  const [state, setState] = useState(clients);
  const [query, setQuery] = useState("");

  const toggle = (ci: number, mi: number) => {
    setState((prev) => {
      const next = prev.map((c) => ({ ...c, enabled: [...c.enabled] }));
      next[ci].enabled[mi] = !next[ci].enabled[mi];
      return next;
    });
  };

  const filtered = state.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operações"
        title="Módulos"
        description="Ative ou desative módulos por cliente. Sem deploys, em tempo real."
      />

      <div className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 p-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 text-primary-glow" />
        Alterações aqui usam feature flags e são aplicadas instantaneamente ao painel do cliente.
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border/60 p-4">
          <Boxes className="h-4 w-4 text-primary-glow" />
          <h3 className="text-sm font-semibold text-foreground">Módulos por cliente</h3>
          <div className="relative ml-auto w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cliente"
              className="h-8 w-full rounded-lg border border-border/70 bg-surface pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="sticky left-0 bg-card px-4 py-3 font-medium">Cliente</th>
                {modules.map((m) => (
                  <th key={m} className="px-3 py-3 text-center font-medium">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, ci) => (
                <tr key={c.id} className="border-b border-border/40 transition hover:bg-accent/40">
                  <td className="sticky left-0 bg-card px-4 py-3">
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">Shippa One {c.plan}</p>
                  </td>
                  {c.enabled.map((on, mi) => (
                    <td key={mi} className="px-3 py-3 text-center">
                      <button
                        onClick={() => toggle(ci, mi)}
                        role="switch"
                        aria-checked={on}
                        className={
                          "relative inline-flex h-5 w-9 items-center rounded-full transition " +
                          (on ? "bg-gradient-primary" : "bg-secondary")
                        }
                      >
                        <span
                          className={
                            "inline-block h-4 w-4 transform rounded-full bg-background shadow transition " +
                            (on ? "translate-x-4" : "translate-x-0.5")
                          }
                        />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
