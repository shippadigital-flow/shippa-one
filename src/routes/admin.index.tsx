import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  UserCheck,
  Sparkles,
  DollarSign,
  UserPlus,
  UserMinus,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const kpis = [
  { label: "Clientes totais", value: "1.284", delta: "+8,2%", up: true, icon: Users },
  { label: "Clientes ativos", value: "1.102", delta: "+3,1%", up: true, icon: UserCheck },
  { label: "Em trial", value: "63", delta: "+12", up: true, icon: Sparkles },
  { label: "MRR", value: "R$ 184.320", delta: "+6,4%", up: true, icon: DollarSign },
  { label: "Novos este mês", value: "94", delta: "+18", up: true, icon: UserPlus },
  { label: "Cancelados", value: "12", delta: "-4", up: false, icon: UserMinus },
];

const topModules = [
  { name: "Blog", usage: 92 },
  { name: "Leads", usage: 84 },
  { name: "Analytics", usage: 71 },
  { name: "Meu Site", usage: 66 },
  { name: "Biblioteca", usage: 52 },
];

const activations = [
  { name: "Flow", rate: 38 },
  { name: "SEO", rate: 62 },
  { name: "Google", rate: 74 },
  { name: "Integrações", rate: 44 },
];

const activities = [
  { who: "Clínica Bem-Estar", what: "ativou o módulo Flow", when: "há 4 min" },
  { who: "Dra. Marina Alves", what: "atualizou plano para Pro", when: "há 22 min" },
  { who: "Estúdio Norte", what: "publicou 3 artigos no blog", when: "há 1 h" },
  { who: "Consultório Aurora", what: "cadastrou 12 novos leads", when: "há 2 h" },
  { who: "Studio Pilates SP", what: "cancelou assinatura", when: "há 5 h" },
];

const systemStatus = [
  { name: "Aplicação", status: "ok", detail: "99,98% uptime" },
  { name: "Banco de dados", status: "ok", detail: "12ms p95" },
  { name: "Storage", status: "warn", detail: "78% capacidade" },
  { name: "APIs externas", status: "ok", detail: "Todas operando" },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Painel interno"
        title="Boa noite, Rafael"
        description="Visão executiva do ecossistema Shippa em tempo real."
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="card-elevated p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <k.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <span
                className={
                  "flex items-center gap-0.5 text-xs font-medium " +
                  (k.up ? "text-success" : "text-destructive")
                }
              >
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {k.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Crescimento de clientes
              </h3>
              <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
            </div>
            <span className="text-xs font-medium text-success">+312 líquidos</span>
          </div>
          <GrowthChart />
        </div>
        <div className="card-elevated p-6">
          <h3 className="text-base font-semibold text-foreground">Status do sistema</h3>
          <ul className="mt-4 space-y-3">
            {systemStatus.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  {s.status === "ok" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/monitoramento"
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow hover:opacity-80"
          >
            Abrir monitoramento <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary-glow" />
            <h3 className="text-base font-semibold text-foreground">Módulos mais acessados</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {topModules.map((m) => (
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
            <Sparkles className="h-4 w-4 text-primary-glow" />
            <h3 className="text-base font-semibold text-foreground">Ativação de módulos</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {activations.map((m) => (
              <li key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">{m.rate}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary/70"
                    style={{ width: `${m.rate}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/60 bg-surface p-3 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary-glow" />
            Tempo médio de sessão: <span className="font-medium text-foreground">6m 42s</span>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="text-base font-semibold text-foreground">Atividades recentes</h3>
          <ul className="mt-4 space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-glow" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function GrowthChart() {
  const data = [420, 460, 510, 540, 590, 640, 700, 760, 830, 910, 1000, 1102];
  const max = Math.max(...data);
  return (
    <div className="mt-6 flex h-40 items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="group relative flex-1">
          <div
            className="w-full rounded-t-md bg-gradient-primary opacity-80 transition group-hover:opacity-100"
            style={{ height: `${(v / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
