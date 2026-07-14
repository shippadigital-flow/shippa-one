import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Sparkles,
  Globe,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Search,
  Users,
  Bell,
  TrendingUp,
  AlertTriangle,
  Lock,
  Zap,
  PenSquare,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useAuth } from "@/hooks/use-auth";
import { greetingFor, firstName } from "@/lib/greeting";
import { ShippaScore, type ScoreFactor } from "@/features/dashboard/shippa-score";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

/* ---------------- MOCK DATA ---------------- */

const scoreFactors: ScoreFactor[] = [
  { label: "Site publicado", done: true, weight: 20, to: "/site", hint: "Seu site está no ar." },
  { label: "Blog ativo", done: true, weight: 15, to: "/blog", hint: "Você publica com frequência." },
  { label: "Google conectado", done: false, weight: 15, to: "/integracoes", hint: "Search Console pendente." },
  { label: "Analytics ativo", done: false, weight: 15, to: "/analytics", hint: "Meça sua audiência." },
  { label: "SEO configurado", done: true, weight: 15, to: "/insights", hint: "Meta tags e sitemap ok." },
  { label: "Segurança (HTTPS)", done: true, weight: 10, to: "/configuracoes", hint: "Certificado ativo." },
  { label: "Performance otimizada", done: false, weight: 10, to: "/site", hint: "Comprimir imagens." },
];

const latestArticles = [
  { title: "Como escolher um advogado de família", date: "há 2 dias", reads: 184, trend: "+22%" },
  { title: "Passo a passo do inventário digital", date: "há 6 dias", reads: 122, trend: "+8%" },
  { title: "5 direitos do consumidor que ninguém te contou", date: "há 12 dias", reads: 96, trend: "+3%" },
];

const notifications: NotificationItem[] = [
  {
    tone: "warning",
    icon: AlertTriangle,
    title: "Google Search Console desconectado",
    body: "Reconecte para continuar recebendo dados de busca.",
    time: "há 2h",
    to: "/integracoes",
  },
  {
    tone: "info",
    icon: PenSquare,
    title: "Novo comentário no blog",
    body: '"Ótimo artigo, muito esclarecedor!" — Maria S.',
    time: "há 5h",
    to: "/blog",
  },
  {
    tone: "success",
    icon: ShieldCheck,
    title: "Certificado SSL renovado",
    body: "Seu site continua seguro até 2027.",
    time: "ontem",
    to: "/configuracoes",
  },
];

const weekVisits = [30, 44, 38, 62, 51, 74, 82];
const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

/* ---------------- PAGE ---------------- */

function DashboardPage() {
  const { user } = useAuth();
  const greeting = `${greetingFor()}, ${user ? firstName(user.name) : "por aqui"}`;

  const summary = [
    "Seu site está no ar e cresceu 18% esta semana.",
    "Você publicou 1 novo artigo e recebeu 3 comentários.",
    "Recomendamos reconectar o Google Search Console para não perder dados.",
  ];

  return (
    <div className="flex flex-col gap-10 pt-4 pb-8">
      {/* 1. SMART SUMMARY */}
      <section className="relative">
        <div className="flex items-center gap-2 eyebrow">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Assistente Shippa
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {greeting}.
        </h1>
        <div className="mt-5 max-w-2xl space-y-2 sm:mt-6 sm:space-y-2.5">
          {summary.map((line, i) => (
            <p
              key={line}
              className="animate-fade-in text-[15px] leading-relaxed text-muted-foreground sm:text-base"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "backwards" }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* 2. WEBSITE STATUS  (Q1: Está online?) */}
      <WebsiteStatus />

      {/* 3. SHIPPA INDEX  (Q3: O que fazer a seguir?) */}
      <ShippaScore factors={scoreFactors} />

      {/* 4. GROWTH CENTER  (Q2: Está crescendo?) */}
      <GrowthCenter />

      {/* 5. QUICK ACTIONS + 6. NOTIFICATIONS  (Q4: O que precisa da minha atenção?) */}
      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <QuickActions />
        <Notifications items={notifications} />
      </section>

      {/* 7. LATEST ARTICLES */}
      <LatestArticles />
    </div>
  );
}

/* ---------------- WEBSITE STATUS ---------------- */

function WebsiteStatus() {
  return (
    <section>
      <div className="mb-4">
        <p className="eyebrow">Meu Site</p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Status agora
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] bg-surface/60 p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
              <Globe className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  Online
                </span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                  Estável
                </span>
              </div>
              <a
                href="https://anapaula.adv.br"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 truncate text-sm text-muted-foreground transition hover:text-primary-glow"
              >
                anapaula.adv.br
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-border/40 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <StatusMetric label="Uptime" value="99,98%" hint="7 dias" />
            <StatusMetric label="SSL" value="Ativo" hint="Válido" />
            <StatusMetric label="Velocidade" value="1,2s" hint="Ótima" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusMetric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {value}
      </p>
      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

/* ---------------- GROWTH CENTER ---------------- */

function GrowthCenter() {
  const max = Math.max(...weekVisits);
  return (
    <section>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow">Central de Crescimento</p>
          <h2 className="mt-1.5 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Sua semana em um olhar
          </h2>
        </div>
        <Link
          to="/analytics"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground"
        >
          Ver detalhes <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>

      <div className="grid gap-6 rounded-[calc(var(--radius)+8px)] bg-surface/50 p-5 sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              1.284
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              <TrendingUp className="h-3 w-3" aria-hidden /> +18%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Visitas nos últimos 7 dias</p>

          <div
            className="mt-6 flex h-32 items-end gap-1.5 sm:h-40 sm:gap-2"
            role="img"
            aria-label="Gráfico de visitas dos últimos 7 dias"
          >
            {weekVisits.map((b, i) => (
              <div key={days[i]} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className="shippa-anim-grow w-full rounded-md bg-gradient-primary opacity-90 transition hover:opacity-100"
                    style={{ height: `${(b / max) * 100}%`, animationDelay: `${i * 90}ms` }}
                  />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {days[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 border-t border-border/40 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <MetricRow icon={Users} label="Visitantes únicos" value="982" delta="+14%" />
          <MetricRow icon={FileText} label="Leituras do blog" value="402" delta="+8%" />
          <MetricRow icon={Zap} label="Contatos recebidos" value="18" delta="+3" />
        </div>
      </div>
    </section>
  );
}

function MetricRow({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-glow">
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="truncate text-lg font-semibold tracking-tight text-foreground">
            {value}
          </span>
          <span className="text-[11px] font-medium text-success">{delta}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- QUICK ACTIONS ---------------- */

type QuickAction = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  hint: string;
  to: string;
  locked?: boolean;
};

const quickActions: QuickAction[] = [
  { icon: PenSquare, label: "Escrever artigo", hint: "Publique em minutos", to: "/blog" },
  { icon: Search, label: "Conectar Google", hint: "Search Console", to: "/integracoes" },
  { icon: BarChart3, label: "Ver Analytics", hint: "Audiência", to: "/analytics", locked: true },
  { icon: Users, label: "Ver Leads", hint: "3 novos", to: "/leads" },
];

function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="flex flex-col">
      <div className="mb-4">
        <p className="eyebrow">Ações Rápidas</p>
        <h2
          id="quick-actions-title"
          className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          O que fazer agora
        </h2>
      </div>
      <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {quickActions.map((a, i) => (
          <li
            key={a.label}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
          >
            <Link
              to={a.to}
              className="group flex h-full items-center gap-3 rounded-2xl bg-surface/60 p-4 transition hover:-translate-y-0.5 hover:bg-surface"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-glow ring-1 ring-primary/15">
                <a.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-foreground">{a.label}</p>
                  {a.locked && (
                    <Lock
                      className="h-3 w-3 text-muted-foreground/70"
                      aria-label="Recurso PRO"
                    />
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{a.hint}</p>
              </div>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 opacity-0 transition group-hover:translate-x-0.5 group-hover:text-primary-glow group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- NOTIFICATIONS ---------------- */

type NotificationTone = "warning" | "info" | "success";
type NotificationItem = {
  tone: NotificationTone;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  time: string;
  to: string;
};

const toneStyles: Record<NotificationTone, string> = {
  warning: "bg-warning/15 text-warning",
  info: "bg-primary/10 text-primary-glow",
  success: "bg-success/15 text-success",
};

function Notifications({ items }: { items: NotificationItem[] }) {
  return (
    <section aria-labelledby="notifications-title" className="flex flex-col">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">Notificações</p>
          <h2
            id="notifications-title"
            className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Precisa da sua atenção
          </h2>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary-glow"
          aria-label={`${items.length} notificações`}
        >
          <Bell className="h-3 w-3" aria-hidden />
          {items.length}
        </span>
      </div>
      <ul className="flex-1 divide-y divide-border/40 overflow-hidden rounded-2xl bg-surface/50">
        {items.map((n, i) => (
          <li
            key={n.title}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: "backwards" }}
          >
            <Link
              to={n.to}
              className="group flex items-start gap-3 px-4 py-4 transition hover:bg-accent/30 sm:px-5"
            >
              <div
                className={
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl " + toneStyles[n.tone]
                }
              >
                <n.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- LATEST ARTICLES ---------------- */

function LatestArticles() {
  return (
    <section>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0">
          <p className="eyebrow">Conteúdo Recente</p>
          <h2 className="mt-1.5 truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Últimos artigos publicados
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground"
        >
          Ver blog <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
      <ul className="divide-y divide-border/40 overflow-hidden rounded-2xl bg-surface/40">
        {latestArticles.map((c, i) => (
          <li
            key={c.title}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <Link
              to="/blog"
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 transition hover:bg-accent/30 sm:px-6 sm:py-5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-foreground group-hover:text-primary-glow">
                  {c.title}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {c.date} · {c.reads} leituras
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success sm:inline-flex">
                  <TrendingUp className="h-3 w-3" aria-hidden /> {c.trend}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground/60 transition group-hover:translate-x-0.5 group-hover:text-primary-glow"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Ensure success icon import used
void CheckCircle2;

