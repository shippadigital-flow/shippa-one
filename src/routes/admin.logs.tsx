import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollText, Search, Download } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/logs")({
  component: LogsPage,
});

type Level = "info" | "warn" | "error";

const logs: Array<{ time: string; level: Level; service: string; message: string }> = [
  { time: "23:42:11", level: "info", service: "auth", message: "Login bem sucedido para ana@bemestar.com" },
  { time: "23:41:58", level: "info", service: "billing", message: "Renovação processada · Consultório Aurora · R$ 349" },
  { time: "23:40:22", level: "warn", service: "storage", message: "Capacidade do bucket 'media' em 78%" },
  { time: "23:38:04", level: "error", service: "api", message: "POST /articles → 500 (timeout de 8s)" },
  { time: "23:37:11", level: "info", service: "flags", message: "Flag 'ai_seo' ativada para plano Pro" },
  { time: "23:35:47", level: "info", service: "webhook", message: "Stripe webhook processado (invoice.paid)" },
  { time: "23:32:03", level: "warn", service: "api", message: "Rate limit próximo do teto para tenant c3" },
  { time: "23:30:15", level: "info", service: "auth", message: "Redefinição de senha enviada para larissa@nutrebem.com" },
  { time: "23:28:41", level: "error", service: "email", message: "Falha ao enviar campanha (SES throttle)" },
  { time: "23:22:18", level: "info", service: "deploy", message: "Deploy production concluído · sha 8c2f1a" },
];

const levelStyles: Record<Level, string> = {
  info: "bg-primary/15 text-primary-glow border-primary/30",
  warn: "bg-warning/15 text-warning border-warning/30",
  error: "bg-destructive/15 text-destructive border-destructive/30",
};

function LogsPage() {
  const [level, setLevel] = useState<Level | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = logs.filter(
    (l) =>
      (level === "all" || l.level === level) &&
      (l.message.toLowerCase().includes(query.toLowerCase()) ||
        l.service.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inteligência"
        title="Logs do sistema"
        description="Auditoria e telemetria em tempo real dos serviços internos."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm text-foreground hover:bg-accent">
            <Download className="h-4 w-4" /> Exportar
          </button>
        }
      />

      <div className="card-elevated overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
          <ScrollText className="h-4 w-4 text-primary-glow" />
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar por mensagem ou serviço"
              className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface p-1">
            {(["all", "info", "warn", "error"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={
                  "rounded-md px-3 py-1.5 text-xs font-medium uppercase transition " +
                  (level === l
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {l === "all" ? "Todos" : l}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-border/40 font-mono">
          {filtered.map((l, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-2.5 text-xs">
              <span className="text-muted-foreground">{l.time}</span>
              <span
                className={
                  "min-w-[56px] rounded border px-1.5 py-0.5 text-center uppercase " +
                  levelStyles[l.level]
                }
              >
                {l.level}
              </span>
              <span className="min-w-[80px] text-muted-foreground">{l.service}</span>
              <span className="flex-1 text-foreground">{l.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
