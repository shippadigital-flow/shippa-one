import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Flag, Users, Globe } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/flags")({
  component: FlagsPage,
});

const initialFlags = [
  { key: "flow_beta", name: "Flow Beta", desc: "Libera módulo Shippa Flow em beta fechado.", scope: "Segmentado", audience: "12 clientes", on: true, env: "prod" },
  { key: "new_editor", name: "Editor de blog v2", desc: "Novo editor com blocos e IA.", scope: "Global", audience: "Todos", on: true, env: "prod" },
  { key: "ai_seo", name: "SEO com IA", desc: "Sugestões de meta e conteúdo automáticas.", scope: "Segmentado", audience: "Pro", on: false, env: "prod" },
  { key: "leads_kanban", name: "Kanban de leads", desc: "Visualização em kanban.", scope: "Global", audience: "Todos", on: true, env: "prod" },
  { key: "billing_v2", name: "Cobrança v2", desc: "Novo motor de billing.", scope: "Interno", audience: "Shippa staff", on: true, env: "staging" },
  { key: "dark_mode_v3", name: "Tema v3", desc: "Nova paleta com contraste refinado.", scope: "Interno", audience: "5 usuários", on: false, env: "dev" },
];

function FlagsPage() {
  const [flags, setFlags] = useState(initialFlags);
  const toggle = (i: number) =>
    setFlags((prev) => prev.map((f, idx) => (idx === i ? { ...f, on: !f.on } : f)));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operações"
        title="Feature Flags"
        description="Controle rollout de funcionalidades sem novos deploys."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90">
            <Plus className="h-4 w-4" /> Nova flag
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-3">
        {flags.map((f, i) => (
          <div key={f.key} className="card-elevated flex flex-wrap items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-glow">
              <Flag className="h-4 w-4" />
            </div>
            <div className="min-w-[240px] flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{f.name}</h3>
                <code className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  {f.key}
                </code>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface px-2 py-1 text-muted-foreground">
                <Globe className="h-3 w-3" /> {f.scope}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface px-2 py-1 text-muted-foreground">
                <Users className="h-3 w-3" /> {f.audience}
              </span>
              <span
                className={
                  "rounded-md border px-2 py-1 font-mono uppercase " +
                  (f.env === "prod"
                    ? "border-success/30 bg-success/10 text-success"
                    : f.env === "staging"
                      ? "border-warning/30 bg-warning/10 text-warning"
                      : "border-border/60 bg-surface text-muted-foreground")
                }
              >
                {f.env}
              </span>
            </div>
            <button
              onClick={() => toggle(i)}
              role="switch"
              aria-checked={f.on}
              className={
                "relative inline-flex h-6 w-11 items-center rounded-full transition " +
                (f.on ? "bg-gradient-primary" : "bg-secondary")
              }
            >
              <span
                className={
                  "inline-block h-5 w-5 transform rounded-full bg-background shadow transition " +
                  (f.on ? "translate-x-5" : "translate-x-0.5")
                }
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
