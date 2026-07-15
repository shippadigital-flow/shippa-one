import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Globe,
  Mail,
  ShieldCheck,
  Gauge,
  Server,
  Cpu,
  ChevronDown,
  ExternalLink,
  Copy,
  Plus,
  RefreshCw,
  CheckCircle2,
  Lock,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/_app/site")({
  component: SitePage,
});

type Status = "ok" | "warning" | "danger";

const statusStyles: Record<Status, { dot: string; text: string; bg: string; label: string }> = {
  ok: { dot: "bg-success", text: "text-success", bg: "bg-success/10", label: "Ativo" },
  warning: { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10", label: "Atenção" },
  danger: { dot: "bg-destructive", text: "text-destructive", bg: "bg-destructive/10", label: "Crítico" },
};

function SitePage() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      <PageHeader
        eyebrow="Meu Site"
        title="Central do seu site"
        description="Domínio, e-mail, segurança e desempenho em um só lugar. Tudo o que mantém o seu site no ar."
        actions={
          <a
            href="https://anapaula.adv.br"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden /> Abrir site
          </a>
        }
      />

      <OverviewBanner />

      <div className="grid gap-5 lg:grid-cols-2">
        <DomainCard />
        <EmailCard />
        <ProtectionCard />
        <PerformanceCard />
      </div>

      <HostingCard />

      <TechnicalDetails />
    </div>
  );
}

/* ------------------------------ Overview ------------------------------ */

function OverviewBanner() {
  return (
    <section
      aria-label="Resumo do site"
      className="card-elevated relative overflow-hidden p-6"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <Globe className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="eyebrow">Site principal</p>
            <p className="text-lg font-semibold tracking-tight text-foreground">anapaula.adv.br</p>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Online há 137 dias
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Última verificação há 2 min</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 sm:gap-8">
          <MiniStat label="Uptime 30d" value="99,98%" tone="ok" />
          <MiniStat label="Velocidade" value="1,4 s" tone="ok" />
          <MiniStat label="SSL válido" value="87 dias" tone="warning" />
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: Status }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={"mt-1 text-lg font-semibold tabular-nums " + statusStyles[tone].text}>{value}</p>
    </div>
  );
}

/* ------------------------------ Card shell ------------------------------ */

function InfoCard({
  icon: Icon,
  title,
  status,
  description,
  children,
  action,
}: {
  icon: LucideIcon;
  title: string;
  status: Status;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const s = statusStyles[status];
  return (
    <section className="card-elevated flex flex-col gap-5 p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg " + s.bg}>
            <Icon className={"h-4 w-4 " + s.text} aria-hidden />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
            {description && (
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <span
          className={
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium " +
            s.bg +
            " " +
            s.text
          }
        >
          <span className={"h-1.5 w-1.5 rounded-full " + s.dot} aria-hidden />
          {s.label}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
      {action && <div className="pt-1">{action}</div>}
    </section>
  );
}

function Row({
  label,
  value,
  copy,
  tone,
}: {
  label: string;
  value: string;
  copy?: boolean;
  tone?: "muted" | "success" | "warning";
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex min-w-0 items-center gap-2">
        <span className={"truncate text-sm font-medium tabular-nums " + toneClass}>{value}</span>
        {copy && (
          <button
            type="button"
            aria-label={`Copiar ${label}`}
            className="rounded-md p-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

function GhostButton({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </button>
  );
}

/* ------------------------------ Cards ------------------------------ */

function DomainCard() {
  return (
    <InfoCard
      icon={Globe}
      title="Domínio"
      status="ok"
      description="O endereço que o mundo digita para chegar até você."
      action={
        <div className="flex flex-wrap gap-2">
          <GhostButton icon={RefreshCw}>Renovar agora</GhostButton>
          <GhostButton icon={Plus}>Adicionar domínio</GhostButton>
        </div>
      }
    >
      <div className="rounded-xl border border-border/60 bg-surface p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-foreground">anapaula.adv.br</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Registrado no Registro.br</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
            <CheckCircle2 className="h-3 w-3" aria-hidden /> Ativo
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Row label="Renovação" value="12 de março de 2027" />
        <Row label="Dias restantes" value="238 dias" tone="success" />
        <Row label="DNS" value="Configurado" tone="success" />
      </div>
    </InfoCard>
  );
}

function EmailCard() {
  return (
    <InfoCard
      icon={Mail}
      title="E-mail profissional"
      status="ok"
      description="Envie e receba com o seu próprio domínio."
      action={
        <div className="flex flex-wrap gap-2">
          <GhostButton icon={Plus}>Nova conta</GhostButton>
          <GhostButton icon={ArrowUpRight}>Abrir webmail</GhostButton>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        <Stat value="3" label="Contas" />
        <Stat value="8,4 GB" label="Usado" />
        <Stat value="20 GB" label="Total" />
      </div>
      <div className="flex flex-col gap-2">
        {[
          { addr: "contato@anapaula.adv.br", used: "62%" },
          { addr: "ana@anapaula.adv.br", used: "34%" },
          { addr: "financeiro@anapaula.adv.br", used: "12%" },
        ].map((a) => (
          <div
            key={a.addr}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-surface px-3 py-2"
          >
            <span className="truncate text-sm text-foreground">{a.addr}</span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{a.used}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

function ProtectionCard() {
  return (
    <InfoCard
      icon={ShieldCheck}
      title="Proteção do site"
      status="warning"
      description="Certificado, firewall e backups automáticos."
      action={<GhostButton icon={RefreshCw}>Renovar SSL</GhostButton>}
    >
      <div className="flex flex-col gap-3">
        <ProtectionRow
          icon={Lock}
          label="Certificado SSL"
          value="Válido · expira em 87 dias"
          tone="warning"
        />
        <ProtectionRow
          icon={ShieldCheck}
          label="Firewall"
          value="Ativo · 214 ameaças bloqueadas"
          tone="ok"
        />
        <ProtectionRow
          icon={RefreshCw}
          label="Backup automático"
          value="Último há 6h · retenção 30 dias"
          tone="ok"
        />
      </div>
    </InfoCard>
  );
}

function ProtectionRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: Status;
}) {
  const s = statusStyles[tone];
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-surface px-3 py-2.5">
      <div className={"mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md " + s.bg}>
        <Icon className={"h-3.5 w-3.5 " + s.text} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function PerformanceCard() {
  const scores = [
    { label: "Desktop", value: 96, tone: "ok" as const },
    { label: "Mobile", value: 82, tone: "warning" as const },
  ];
  return (
    <InfoCard
      icon={Gauge}
      title="Desempenho"
      status="ok"
      description="Velocidade de carregamento e experiência do visitante."
      action={<GhostButton icon={Zap}>Rodar teste completo</GhostButton>}
    >
      <div className="grid grid-cols-2 gap-4">
        {scores.map((s) => (
          <ScoreDial key={s.label} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Stat value="1,4 s" label="LCP" />
        <Stat value="0,03" label="CLS" />
        <Stat value="120 ms" label="TTFB" />
      </div>
    </InfoCard>
  );
}

function ScoreDial({ label, value, tone }: { label: string; value: number; tone: Status }) {
  const s = statusStyles[tone];
  const stroke = `${(value / 100) * 100}, 100`;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-surface p-3">
      <div className="relative h-14 w-14 shrink-0" role="img" aria-label={`${label}: ${value} de 100`}>
        <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
          <circle cx="18" cy="18" r="15.915" fill="none" className="stroke-border/60" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            strokeLinecap="round"
            className={s.text}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={stroke}
          />
        </svg>
        <span className={"absolute inset-0 flex items-center justify-center text-sm font-semibold " + s.text}>
          {value}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">
          {value >= 90 ? "Excelente" : value >= 70 ? "Bom" : "A melhorar"}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-surface px-3 py-2.5 text-center">
      <p className="text-sm font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function HostingCard() {
  return (
    <InfoCard
      icon={Server}
      title="Informações de hospedagem"
      status="ok"
      description="Onde o seu site está armazenado e como está sendo servido."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Row label="Plano" value="Shippa One · Start" />
        <Row label="Servidor" value="São Paulo · BR" tone="success" />
        <Row label="Armazenamento" value="4,2 GB de 10 GB" />
        <Row label="Banda mensal" value="18,7 GB de 100 GB" />
        <Row label="Ambiente" value="Produção" />
        <Row label="CDN" value="Ativa em 24 regiões" tone="success" />
      </div>
    </InfoCard>
  );
}

/* ------------------------------ Technical Details ------------------------------ */

function TechnicalDetails() {
  const [open, setOpen] = useState(false);
  return (
    <section className="card-elevated overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="technical-details"
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition hover:bg-accent/40"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-muted-foreground">
            <Cpu className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Detalhes técnicos
            </h2>
            <p className="text-sm text-muted-foreground">
              DNS, registros e informações avançadas — só se você precisar.
            </p>
          </div>
        </div>
        <ChevronDown
          className={
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 " +
            (open ? "rotate-180" : "rotate-0")
          }
          aria-hidden
        />
      </button>

      <div
        id="technical-details"
        hidden={!open}
        className="grid gap-4 border-t border-border/60 px-6 py-5 sm:grid-cols-2"
      >
        <Row label="IP do servidor" value="185.158.133.1" copy />
        <Row label="Nameservers" value="ns1.shippa.host" copy />
        <Row label="Registro A" value="anapaula.adv.br → 185.158.133.1" copy />
        <Row label="Registro MX" value="mail.shippa.host (prio 10)" copy />
        <Row label="SPF" value="v=spf1 include:shippa.host ~all" copy />
        <Row label="DKIM" value="Configurado · seletor shippa" tone="success" />
        <Row label="DMARC" value="p=quarantine · rua@anapaula.adv.br" tone="success" />
        <Row label="TLS" value="TLS 1.3 · HSTS habilitado" tone="success" />
      </div>
    </section>
  );
}
