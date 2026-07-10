import { createFileRoute } from "@tanstack/react-router";
import { Activity, Database, HardDrive, Cpu, AlertTriangle, CheckCircle2, GitCommit } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/monitoramento")({
  component: MonitoringPage,
});

const services = [
  { name: "Aplicação Web", status: "ok", uptime: "99,98%", latency: "142ms", icon: Cpu },
  { name: "Banco de dados", status: "ok", uptime: "99,99%", latency: "12ms", icon: Database },
  { name: "Storage (Media)", status: "warn", uptime: "99,90%", latency: "220ms", icon: HardDrive },
  { name: "API pública", status: "ok", uptime: "99,97%", latency: "180ms", icon: Activity },
];

const incidents = [
  { time: "há 4h", type: "error", title: "Timeout intermitente em /articles", detail: "Resolvido após reinício da instância." },
  { time: "há 2d", type: "warn", title: "Uso de storage acima de 75%", detail: "Alerta preventivo — expansão agendada." },
  { time: "há 5d", type: "error", title: "Falha no webhook Stripe", detail: "Reprocessamento manual executado." },
];

const deploys = [
  { sha: "8c2f1a", branch: "main", author: "Rafael Mota", when: "há 2 h", status: "success" },
  { sha: "b1e3f0", branch: "main", author: "Beatriz Alves", when: "há 1 dia", status: "success" },
  { sha: "5a4c22", branch: "hotfix/billing", author: "Rafael Mota", when: "há 2 dias", status: "success" },
  { sha: "d90ff2", branch: "main", author: "Marcelo T.", when: "há 4 dias", status: "failed" },
];

function MonitoringPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inteligência"
        title="Monitoramento"
        description="Saúde da plataforma em tempo real: aplicação, dados e infraestrutura."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {services.map((s) => (
          <div key={s.name} className="card-elevated p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <s.icon className="h-4 w-4" />
              </div>
              {s.status === "ok" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                  <CheckCircle2 className="h-3 w-3" /> Operacional
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">
                  <AlertTriangle className="h-3 w-3" /> Alerta
                </span>
              )}
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{s.name}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Uptime {s.uptime}</span>
              <span>Latência {s.latency}</span>
            </div>
            <div className="mt-3 flex h-1.5 gap-0.5">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={
                    "flex-1 rounded-sm " +
                    (s.status === "warn" && (i === 12 || i === 20)
                      ? "bg-warning"
                      : "bg-success/70")
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card-elevated p-6">
          <h3 className="text-base font-semibold text-foreground">Incidentes recentes</h3>
          <ul className="mt-4 space-y-3">
            {incidents.map((i, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface p-3"
              >
                {i.type === "error" ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{i.title}</p>
                    <span className="text-xs text-muted-foreground">{i.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated p-6">
          <h3 className="text-base font-semibold text-foreground">Histórico de deploys</h3>
          <ul className="mt-4 divide-y divide-border/40">
            {deploys.map((d) => (
              <li key={d.sha} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-lg " +
                      (d.status === "success"
                        ? "bg-success/15 text-success"
                        : "bg-destructive/15 text-destructive")
                    }
                  >
                    <GitCommit className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      <code className="font-mono text-xs text-muted-foreground">{d.sha}</code> · {d.branch}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.author} · {d.when}
                    </p>
                  </div>
                </div>
                <span
                  className={
                    "rounded-md border px-2 py-0.5 text-[10px] font-medium " +
                    (d.status === "success"
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-destructive/30 bg-destructive/10 text-destructive")
                  }
                >
                  {d.status === "success" ? "Sucesso" : "Falhou"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
