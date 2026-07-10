import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, Plus, Search } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/suporte")({
  component: SupportPage,
});

type TicketStatus = "Aberto" | "Aguardando" | "Resolvido" | "Fechado";

const tickets: Array<{
  id: string;
  subject: string;
  client: string;
  owner: string;
  status: TicketStatus;
  priority: "Baixa" | "Média" | "Alta";
  updated: string;
  preview: string;
}> = [
  { id: "T-1042", subject: "Erro ao publicar artigo", client: "Clínica Bem-Estar", owner: "Rafael", status: "Aberto", priority: "Alta", updated: "há 12 min", preview: "Ao clicar em publicar, aparece um erro 500. Já tentei novamente..." },
  { id: "T-1041", subject: "Integração com Google Analytics", client: "Consultório Aurora", owner: "Mariana", status: "Aguardando", priority: "Média", updated: "há 1 h", preview: "Preciso conectar minha conta do GA4, mas o botão não abre..." },
  { id: "T-1040", subject: "Alteração de plano", client: "Estúdio Norte", owner: "Rafael", status: "Resolvido", priority: "Baixa", updated: "há 3 h", preview: "Como faço para migrar do Start para o Pro sem perder o site?" },
  { id: "T-1039", subject: "Domínio próprio", client: "Espaço Zen", owner: "Beatriz", status: "Fechado", priority: "Média", updated: "ontem", preview: "Já configurei o DNS mas ainda não propagou aqui..." },
  { id: "T-1038", subject: "Cobrança duplicada", client: "Odonto Vida", owner: "Rafael", status: "Aberto", priority: "Alta", updated: "há 4 h", preview: "Fui cobrado duas vezes no cartão no mesmo dia..." },
];

const statusStyles: Record<TicketStatus, string> = {
  Aberto: "bg-primary/15 text-primary-glow border-primary/30",
  Aguardando: "bg-warning/15 text-warning border-warning/30",
  Resolvido: "bg-success/15 text-success border-success/30",
  Fechado: "bg-secondary text-muted-foreground border-border/60",
};

const counts: Record<TicketStatus | "Todos", number> = {
  Todos: tickets.length,
  Aberto: tickets.filter((t) => t.status === "Aberto").length,
  Aguardando: tickets.filter((t) => t.status === "Aguardando").length,
  Resolvido: tickets.filter((t) => t.status === "Resolvido").length,
  Fechado: tickets.filter((t) => t.status === "Fechado").length,
};

function SupportPage() {
  const [filter, setFilter] = useState<TicketStatus | "Todos">("Todos");
  const [selected, setSelected] = useState(tickets[0]);

  const filtered = tickets.filter((t) => filter === "Todos" || t.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inteligência"
        title="Suporte"
        description="Central interna para atender e resolver chamados dos clientes."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90">
            <Plus className="h-4 w-4" /> Novo chamado
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
        <div className="card-elevated overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-4">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar chamados"
                className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface p-1">
              {(["Todos", "Aberto", "Aguardando", "Resolvido", "Fechado"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={
                    "rounded-md px-3 py-1.5 text-xs font-medium transition " +
                    (filter === s
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {s} <span className="ml-1 opacity-60">{counts[s]}</span>
                </button>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-border/40">
            {filtered.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setSelected(t)}
                  className={
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition " +
                    (selected.id === t.id ? "bg-accent/40" : "hover:bg-accent/30")
                  }
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                    <LifeBuoy className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                      <span
                        className={
                          "rounded-md border px-1.5 py-0.5 text-[10px] font-medium " +
                          statusStyles[t.status]
                        }
                      >
                        {t.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground">· {t.priority}</span>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                      {t.subject}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.client} · {t.updated}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card-elevated p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">{selected.id}</span>
            <span
              className={
                "rounded-md border px-2 py-0.5 text-[10px] font-medium " +
                statusStyles[selected.status]
              }
            >
              {selected.status}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{selected.subject}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {selected.client} · Atribuído a {selected.owner} · {selected.updated}
          </p>

          <div className="mt-4 rounded-xl border border-border/60 bg-surface p-4 text-sm text-foreground">
            {selected.preview}
          </div>

          <div className="mt-4">
            <textarea
              placeholder="Responder ao cliente…"
              rows={4}
              className="w-full rounded-lg border border-border/60 bg-surface p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <div className="mt-2 flex items-center justify-between">
              <select className="rounded-lg border border-border/60 bg-surface px-2 py-1.5 text-xs text-foreground">
                <option>Marcar como Aberto</option>
                <option>Marcar como Aguardando</option>
                <option>Marcar como Resolvido</option>
                <option>Fechar</option>
              </select>
              <button className="rounded-lg bg-gradient-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">
                Enviar resposta
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
