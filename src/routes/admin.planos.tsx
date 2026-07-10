import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Archive, Check } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/planos")({
  component: PlansPage,
});

const plans = [
  {
    id: "start",
    name: "Shippa One Start",
    price: "R$ 149",
    subtitle: "Para pequenos negócios começarem online.",
    active: true,
    customers: 612,
    features: ["Site institucional", "Blog", "Leads básicos", "Analytics essencial", "Biblioteca de mídia"],
  },
  {
    id: "pro",
    name: "Shippa One Pro",
    price: "R$ 349",
    subtitle: "Para clínicas e negócios em crescimento.",
    active: true,
    featured: true,
    customers: 490,
    features: ["Tudo do Start", "SEO avançado", "Integrações Google", "Suporte prioritário", "Domínio próprio", "Múltiplos usuários"],
  },
  {
    id: "flow",
    name: "Shippa Flow",
    price: "R$ 599",
    subtitle: "Automação e IA para atendimento e vendas.",
    active: false,
    customers: 0,
    features: ["WhatsApp automatizado", "IA de qualificação", "Agendamento", "CRM integrado", "Beta interno"],
  },
];

function PlansPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operações"
        title="Planos"
        description="Crie, edite e arquive planos. Ajuste features sem novo deploy."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90">
            <Plus className="h-4 w-4" /> Novo plano
          </button>
        }
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={
              "card-elevated relative p-6 " +
              (p.featured ? "ring-1 ring-primary/40 shadow-glow" : "")
            }
          >
            {p.featured && (
              <span className="absolute -top-2 left-6 rounded-md bg-gradient-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                Mais vendido
              </span>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
              </div>
              <span
                className={
                  "rounded-md border px-2 py-0.5 text-[10px] font-medium " +
                  (p.active
                    ? "border-success/30 bg-success/15 text-success"
                    : "border-border/60 bg-surface text-muted-foreground")
                }
              >
                {p.active ? "Ativo" : "Rascunho"}
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-foreground">{p.price}</span>
              <span className="text-xs text-muted-foreground">/mês</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.customers} clientes usando
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-foreground">
                  <Check className="h-4 w-4 text-primary-glow" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2">
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-foreground hover:bg-accent">
                <Pencil className="h-3.5 w-3.5" /> Editar
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
                <Archive className="h-3.5 w-3.5" /> Arquivar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
