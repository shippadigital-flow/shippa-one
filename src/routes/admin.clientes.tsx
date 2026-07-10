import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  KeyRound,
  Ban,
  Boxes,
  Building2,
} from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/clientes")({
  component: ClientsPage,
});

type Status = "Ativo" | "Trial" | "Suspenso" | "Cancelado";

const clients: Array<{
  id: string;
  company: string;
  owner: string;
  email: string;
  phone: string;
  plan: "Start" | "Pro";
  status: Status;
  createdAt: string;
  lastLogin: string;
}> = [
  { id: "c1", company: "Clínica Bem-Estar", owner: "Dra. Ana Paula", email: "ana@bemestar.com", phone: "(11) 99999-1234", plan: "Pro", status: "Ativo", createdAt: "12/02/2025", lastLogin: "há 2 h" },
  { id: "c2", company: "Estúdio Norte", owner: "Marcos Lima", email: "marcos@estudionorte.com", phone: "(21) 98888-2211", plan: "Start", status: "Ativo", createdAt: "03/03/2025", lastLogin: "há 30 min" },
  { id: "c3", company: "Consultório Aurora", owner: "Dra. Marina", email: "marina@aurora.com", phone: "(11) 97777-1010", plan: "Pro", status: "Ativo", createdAt: "22/01/2025", lastLogin: "há 1 dia" },
  { id: "c4", company: "Studio Pilates SP", owner: "Camila Ferraz", email: "camila@pilatessp.com", phone: "(11) 96666-3322", plan: "Start", status: "Trial", createdAt: "01/07/2026", lastLogin: "há 15 min" },
  { id: "c5", company: "Odonto Vida", owner: "Dr. Ricardo", email: "ricardo@odontovida.com", phone: "(31) 95555-4433", plan: "Pro", status: "Suspenso", createdAt: "18/11/2024", lastLogin: "há 12 dias" },
  { id: "c6", company: "Nutre Bem", owner: "Larissa Souza", email: "larissa@nutrebem.com", phone: "(41) 94444-9988", plan: "Start", status: "Cancelado", createdAt: "05/09/2024", lastLogin: "há 30 dias" },
  { id: "c7", company: "Espaço Zen", owner: "Beatriz Camargo", email: "bia@espacozen.com", phone: "(11) 93333-5566", plan: "Pro", status: "Ativo", createdAt: "10/05/2025", lastLogin: "há 5 min" },
];

const statusStyles: Record<Status, string> = {
  Ativo: "bg-success/15 text-success border-success/30",
  Trial: "bg-primary/15 text-primary-glow border-primary/30",
  Suspenso: "bg-warning/15 text-warning border-warning/30",
  Cancelado: "bg-destructive/15 text-destructive border-destructive/30",
};

function ClientsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "Todos">("Todos");

  const filtered = clients.filter(
    (c) =>
      (statusFilter === "Todos" || c.status === statusFilter) &&
      (c.company.toLowerCase().includes(query.toLowerCase()) ||
        c.owner.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operações"
        title="Clientes"
        description="Todos os clientes ativos, em trial e cancelados no ecossistema Shippa."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90">
            <Plus className="h-4 w-4" /> Novo cliente
          </button>
        }
      />

      <div className="card-elevated overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por empresa, responsável ou email"
              className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface p-1">
            {(["Todos", "Ativo", "Trial", "Suspenso", "Cancelado"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s as Status | "Todos")}
                className={
                  "rounded-md px-3 py-1.5 text-xs font-medium transition " +
                  (statusFilter === s
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {s}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Plano</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Criado em</th>
                <th className="px-4 py-3 font-medium">Último acesso</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/40 transition hover:bg-accent/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                        <Building2 className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <div>
                        <Link
                          to="/admin/clientes/$id"
                          params={{ id: c.id }}
                          className="font-medium text-foreground hover:text-primary-glow"
                        >
                          {c.company}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {c.owner} · {c.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md border border-border/60 bg-surface px-2 py-0.5 text-xs font-medium text-foreground">
                      Shippa One {c.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium " +
                        statusStyles[c.status]
                      }
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.createdAt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <IconAction icon={ExternalLink} title="Abrir painel do cliente" />
                      <IconAction icon={KeyRound} title="Redefinir senha" />
                      <IconAction icon={Boxes} title="Gerenciar módulos" />
                      <IconAction icon={Ban} title="Suspender acesso" />
                      <IconAction icon={MoreHorizontal} title="Mais" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
          <span>
            Mostrando {filtered.length} de {clients.length} clientes
          </span>
          <div className="flex items-center gap-1">
            <button className="rounded-md border border-border/60 bg-surface px-2.5 py-1 hover:text-foreground">
              Anterior
            </button>
            <button className="rounded-md border border-border/60 bg-surface px-2.5 py-1 hover:text-foreground">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconAction({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <button
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
