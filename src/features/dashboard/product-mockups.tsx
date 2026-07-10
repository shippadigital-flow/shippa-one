import {
  BarChart3,
  Inbox,
  Search,
  Globe,
  Plug,
  Users,
  TrendingUp,
  CheckCircle2,
  Target,
  MousePointerClick,
  FileBarChart,
  Download,
  Calendar,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";

/* --------------- Animated counter --------------- */
function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Counter({
  value,
  format = (n) => n.toLocaleString("pt-BR"),
  duration,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const v = useCountUp(value, duration);
  return <>{format(v)}</>;
}

function MockupShell({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated p-4 shadow-elegant sm:p-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-destructive/60" />
          <span className="h-2 w-2 rounded-full bg-warning/60" />
          <span className="h-2 w-2 rounded-full bg-success/60" />
          <span className="ml-3 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Icon className="h-3 w-3" /> {title}
          </span>
        </div>
        <span className="hidden text-[10px] font-medium text-muted-foreground sm:inline">shippa.one</span>
      </div>
      <div className="pt-5">{children}</div>
    </div>
  );
}

/* --------------- ANALYTICS --------------- */
export function AnalyticsMockup() {
  const bars = [40, 62, 48, 78, 55, 90, 72];
  return (
    <MockupShell title="Analytics" Icon={BarChart3}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { k: "Visitantes", n: 12482, fmt: (n: number) => Math.round(n).toLocaleString("pt-BR") },
          { k: "Conversões", n: 184, fmt: (n: number) => Math.round(n).toString() },
          { k: "Tempo médio", n: 161, fmt: (n: number) => `${Math.floor(n / 60)}m ${Math.round(n % 60).toString().padStart(2, "0")}s` },
        ].map((m) => (
          <div key={m.k} className="rounded-xl border border-border/50 bg-surface/60 p-2.5 sm:p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {m.k}
            </p>
            <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              <Counter value={m.n} format={m.fmt} />
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-success">▲ 18%</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex h-24 items-end gap-2 sm:h-32">
        {bars.map((b, i) => (
          <div
            key={i}
            className="shippa-anim-grow flex-1 rounded-md bg-gradient-primary opacity-90"
            style={{ height: `${b}%`, animationDelay: `${i * 140}ms` }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["Google Orgânico", 68],
          ["Instagram", 22],
          ["Direto", 10],
        ].map(([label, pct]) => (
          <div key={label as string}>
            <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{label}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="shippa-anim-bar h-full rounded-full bg-gradient-primary"
                style={{ ["--shippa-bar" as string]: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

/* --------------- LEADS --------------- */
export function LeadsMockup() {
  const leads = [
    { name: "Mariana Costa", src: "WhatsApp", tag: "Novo", tone: "bg-primary/20 text-primary-glow" },
    { name: "Bruno Almeida", src: "Formulário", tag: "Quente", tone: "bg-warning/20 text-warning" },
    { name: "Camila Ribeiro", src: "Instagram", tag: "Convertido", tone: "bg-success/20 text-success" },
    { name: "Rafael Nunes", src: "WhatsApp", tag: "Novo", tone: "bg-primary/20 text-primary-glow" },
  ];
  return (
    <MockupShell title="Caixa de Leads" Icon={Inbox}>
      <ul className="space-y-2">
        {leads.map((l, i) => (
          <li
            key={l.name}
            className="shippa-anim-slide flex items-center justify-between rounded-xl border border-border/50 bg-surface/60 px-3 py-2.5"
            style={{ animationDelay: `${i * 900}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-foreground">{l.name}</p>
                <p className="text-[11px] text-muted-foreground">via {l.src}</p>
              </div>
            </div>
            <span className={"rounded-full px-2 py-0.5 text-[10px] font-medium " + l.tone}>
              {l.tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-border/50 bg-surface/60 px-3 py-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Users className="h-3 w-3" /> 24 novos essa semana
        </span>
        <span className="flex items-center gap-1 text-success">
          <span className="shippa-anim-pulse h-1.5 w-1.5 rounded-full bg-success" />
          Ao vivo
        </span>
      </div>
    </MockupShell>
  );
}

/* --------------- SEO --------------- */
export function SeoMockup() {
  const rows = [
    { term: "advogado família sp", pos: 3, delta: "+4" },
    { term: "planejamento sucessório", pos: 8, delta: "+2" },
    { term: "audiência trabalhista", pos: 12, delta: "+1" },
  ];
  return (
    <MockupShell title="SEO & Buscas" Icon={Search}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/50 bg-surface/60 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Saúde de SEO
          </p>
          <p className="mt-1.5 text-lg font-semibold text-foreground">86 / 100</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="shippa-anim-bar h-full rounded-full bg-gradient-primary" style={{ ["--shippa-bar" as string]: "86%" }} />
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface/60 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Palavras no top 10
          </p>
          <p className="mt-1.5 text-lg font-semibold text-foreground">42</p>
          <p className="mt-0.5 text-[10px] font-medium text-success">▲ 7 esta semana</p>
        </div>
      </div>
      <table className="mt-4 w-full text-left text-[12px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
            <th className="pb-2 font-medium">Termo</th>
            <th className="pb-2 font-medium">Posição</th>
            <th className="pb-2 font-medium text-right">Var.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {rows.map((r, i) => (
            <tr
              key={r.term}
              className="shippa-anim-slide"
              style={{ animationDelay: `${i * 800}ms` }}
            >
              <td className="py-2 text-foreground">{r.term}</td>
              <td className="py-2 text-muted-foreground">#{r.pos}</td>
              <td className="py-2 text-right font-medium text-success">{r.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MockupShell>
  );
}

/* --------------- GOOGLE / SEARCH CONSOLE --------------- */
export function GoogleMockup() {
  return (
    <MockupShell title="Google Search Console" Icon={Globe}>
      <div className="grid grid-cols-3 gap-3">
        {[
          { k: "Cliques", v: "1.284" },
          { k: "Impressões", v: "58,4k" },
          { k: "CTR", v: "3,2%" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl border border-border/50 bg-surface/60 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.k}</p>
            <p className="mt-1.5 text-lg font-semibold text-foreground">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 h-32 rounded-xl border border-border/50 bg-surface/60 p-3">
        <svg viewBox="0 0 400 120" className="h-full w-full">
          <defs>
            <linearGradient id="mkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.22 258)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.62 0.22 258)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,90 C40,70 80,80 120,55 C160,30 200,60 240,45 C280,30 320,20 400,10 L400,120 L0,120 Z"
            fill="url(#mkGrad)"
          />
          <path
            d="M0,90 C40,70 80,80 120,55 C160,30 200,60 240,45 C280,30 320,20 400,10"
            fill="none"
            stroke="oklch(0.72 0.18 258)"
            strokeWidth="2"
            className="shippa-anim-line"
          />
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-success" /> Crescimento consistente nos últimos 30 dias
      </div>
    </MockupShell>
  );
}

/* --------------- CONNECTIONS --------------- */
export function ConnectionsMockup() {
  const items = [
    { name: "WhatsApp Business", ok: true },
    { name: "Google Calendar", ok: true },
    { name: "Meta Ads", ok: false },
    { name: "Mailchimp", ok: true },
    { name: "Zapier", ok: false },
  ];
  return (
    <MockupShell title="Integrações" Icon={Plug}>
      <ul className="space-y-2">
        {items.map((c, i) => (
          <li
            key={c.name}
            className="shippa-anim-slide flex items-center justify-between rounded-xl border border-border/50 bg-surface/60 px-3 py-2.5"
            style={{ animationDelay: `${i * 700}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <Plug className="h-4 w-4" />
              </div>
              <span className="text-[13px] font-medium text-foreground">{c.name}</span>
            </div>
            {c.ok ? (
              <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" /> Conectado
              </span>
            ) : (
              <span className="text-[11px] font-medium text-muted-foreground">Conectar</span>
            )}
          </li>
        ))}
      </ul>
    </MockupShell>
  );
}

/* --------------- CONVERSIONS --------------- */
export function ConversionsMockup() {
  const funnel = [
    { label: "Visitantes", n: 12482, pct: 100 },
    { label: "Interessados", n: 4210, pct: 34 },
    { label: "Leads", n: 862, pct: 7 },
    { label: "Clientes", n: 184, pct: 1.5 },
  ];
  return (
    <MockupShell title="Conversões" Icon={Target}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { k: "Meta", v: "184 / 200", tone: "text-foreground" },
          { k: "Taxa", v: "1,47%", tone: "text-foreground" },
          { k: "Valor médio", v: "R$ 2.180", tone: "text-foreground" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl border border-border/50 bg-surface/60 p-2.5 sm:p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.k}</p>
            <p className={"mt-1.5 text-base font-semibold tracking-tight sm:text-lg " + m.tone}>{m.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2.5">
        {funnel.map((row, i) => (
          <div
            key={row.label}
            className="shippa-anim-slide"
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-medium text-foreground">{row.label}</span>
              <span className="text-muted-foreground">
                <Counter value={row.n} format={(n) => Math.round(n).toLocaleString("pt-BR")} />
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="shippa-anim-bar h-full rounded-full bg-gradient-primary"
                style={{ ["--shippa-bar" as string]: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/50 bg-surface/60 px-3 py-2 text-[11px] text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 text-primary-glow" />
        3 novas conversões nos últimos 30 minutos
      </div>
    </MockupShell>
  );
}

/* --------------- REPORTS --------------- */
export function ReportsMockup() {
  const items = [
    { name: "Relatório Mensal — Outubro", date: "01 nov", size: "1,2 MB" },
    { name: "Performance do Blog", date: "26 out", size: "780 KB" },
    { name: "Comparativo Trimestral", date: "10 out", size: "2,1 MB" },
  ];
  return (
    <MockupShell title="Relatórios" Icon={FileBarChart}>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="rounded-xl border border-border/50 bg-surface/60 p-2.5 sm:p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Enviados</p>
          <p className="mt-1.5 text-lg font-semibold text-foreground">
            <Counter value={42} format={(n) => Math.round(n).toString()} />
          </p>
          <p className="mt-0.5 text-[10px] text-success">▲ 6 este mês</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface/60 p-2.5 sm:p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Aberturas</p>
          <p className="mt-1.5 text-lg font-semibold text-foreground">
            <Counter value={87} format={(n) => `${Math.round(n)}%`} />
          </p>
          <p className="mt-0.5 text-[10px] text-success">▲ acima da média</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it, i) => (
          <li
            key={it.name}
            className="shippa-anim-slide flex items-center justify-between rounded-xl border border-border/50 bg-surface/60 px-3 py-2.5"
            style={{ animationDelay: `${i * 700}ms` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <FileBarChart className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-foreground">{it.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  {it.date} · {it.size}
                </p>
              </div>
            </div>
            <span className="hidden items-center gap-1 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-[10px] font-medium text-muted-foreground sm:inline-flex">
              <Download className="h-3 w-3" /> PDF
            </span>
          </li>
        ))}
      </ul>
    </MockupShell>
  );
}

/* --------------- INSIGHTS TIMELINE --------------- */
export function InsightsMockup() {
  const items = [
    { time: "há 12 min", tone: "text-primary-glow", Icon: Lightbulb, title: "Tendência detectada", body: "\"planejamento sucessório\" cresce 34% no seu nicho." },
    { time: "há 2 h", tone: "text-success", Icon: TrendingUp, title: "Página em alta", body: "/artigos/inventario-digital ganhou +42 leituras." },
    { time: "ontem", tone: "text-primary-glow", Icon: Sparkles, title: "Sugestão semanal", body: "Publique sobre \"audiência trabalhista\" — pico de buscas." },
    { time: "há 3 dias", tone: "text-warning", Icon: ArrowUpRight, title: "Oportunidade", body: "12 novos termos relevantes não cobertos pelo seu blog." },
  ];
  return (
    <MockupShell title="Insights semanais" Icon={Lightbulb}>
      <ol className="relative space-y-4 pl-5">
        <span className="pointer-events-none absolute bottom-2 left-2 top-2 w-px bg-border/60" />
        {items.map((it, i) => (
          <li
            key={it.title}
            className="shippa-anim-slide relative"
            style={{ animationDelay: `${i * 500}ms` }}
          >
            <span className="absolute -left-[13px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-elevated ring-2 ring-primary/40">
              <span className={"shippa-anim-pulse h-1.5 w-1.5 rounded-full bg-primary-glow"} />
            </span>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-foreground">
                  <it.Icon className={"mr-1 inline h-3.5 w-3.5 " + it.tone} />
                  {it.title}
                </p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{it.body}</p>
              </div>
              <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                {it.time}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </MockupShell>
  );
}