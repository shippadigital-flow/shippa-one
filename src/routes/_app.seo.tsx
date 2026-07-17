import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileCode2,
  Map as MapIcon,
  Gauge,
  Type,
  AlignLeft,
  ImageIcon,
  Link2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { PageHeader } from "@/shared/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/seo")({
  head: () => ({
    meta: [
      { title: "SEO — Shippa One" },
      {
        name: "description",
        content:
          "Diagnóstico de SEO do seu site: SSL, robots, sitemap, velocidade, meta tags e links internos.",
      },
    ],
  }),
  component: SeoHealth,
});

type Status = "ok" | "warn" | "fail";

type Check = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  status: Status;
  summary: string;
  details: string;
  recommendation: string;
  weight: number;
};

const checks: Check[] = [
  {
    id: "ssl",
    label: "SSL / HTTPS",
    icon: ShieldCheck,
    status: "ok",
    summary: "Certificado ativo e válido",
    details: "Emitido por Let's Encrypt · expira em 74 dias · renovação automática.",
    recommendation:
      "Nenhuma ação necessária. Continuaremos renovando o certificado automaticamente antes do vencimento.",
    weight: 100,
  },
  {
    id: "robots",
    label: "Robots.txt",
    icon: FileCode2,
    status: "ok",
    summary: "Publicado e acessível",
    details: "Permite indexação e aponta para o sitemap corretamente.",
    recommendation:
      "Bloqueie páginas administrativas (ex.: /admin, /rascunhos) se ainda não estiverem privadas.",
    weight: 100,
  },
  {
    id: "sitemap",
    label: "Sitemap.xml",
    icon: MapIcon,
    status: "warn",
    summary: "Enviado, mas com 3 URLs desatualizadas",
    details: "42 URLs no sitemap · última atualização há 12 dias.",
    recommendation:
      "Regere o sitemap para refletir os últimos artigos publicados e reenvie no Google Search Console.",
    weight: 60,
  },
  {
    id: "speed",
    label: "Velocidade (PageSpeed)",
    icon: Gauge,
    status: "warn",
    summary: "78/100 mobile · 94/100 desktop",
    details: "LCP 2.6s · CLS 0.04 · TBT 210ms. Boa em desktop, moderada no mobile.",
    recommendation:
      "Otimize imagens acima da dobra (formato WebP e width correto) e reduza o CSS crítico do topo da página.",
    weight: 72,
  },
  {
    id: "title",
    label: "Meta Title",
    icon: Type,
    status: "ok",
    summary: "Todas as páginas com título único",
    details: "Comprimento médio: 56 caracteres · nenhum duplicado detectado.",
    recommendation:
      "Mantenha entre 50–60 caracteres com a palavra-chave principal no início do título.",
    weight: 95,
  },
  {
    id: "description",
    label: "Meta Description",
    icon: AlignLeft,
    status: "warn",
    summary: "4 páginas sem descrição",
    details: "Sem meta description: /contato, /sobre, /blog/lancamento-2026, /obrigado.",
    recommendation:
      "Escreva descrições únicas de 140–160 caracteres para essas páginas — ajudam no CTR na busca do Google.",
    weight: 65,
  },
  {
    id: "alt",
    label: "Alt Text de Imagens",
    icon: ImageIcon,
    status: "fail",
    summary: "12 imagens sem texto alternativo",
    details: "Detectamos 34 imagens · 12 sem atributo alt (35%).",
    recommendation:
      "Adicione descrições curtas e específicas nas imagens sem alt — melhora acessibilidade e SEO de imagens.",
    weight: 40,
  },
  {
    id: "links",
    label: "Links Internos",
    icon: Link2,
    status: "ok",
    summary: "Estrutura saudável",
    details:
      "Média de 6 links internos por página · 2 páginas órfãs (sem links apontando para elas).",
    recommendation:
      "Adicione links das páginas principais para /blog/checklist-site-2026 e /servicos/consultoria, hoje órfãs.",
    weight: 82,
  },
];

const score = Math.round(
  checks.reduce((acc, c) => acc + c.weight, 0) / checks.length,
);

const counts = {
  ok: checks.filter((c) => c.status === "ok").length,
  warn: checks.filter((c) => c.status === "warn").length,
  fail: checks.filter((c) => c.status === "fail").length,
};

const statusStyles: Record<
  Status,
  { pill: string; icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }
> = {
  ok: {
    pill: "bg-success/15 text-success border-success/30",
    icon: CheckCircle2,
    label: "OK",
  },
  warn: {
    pill: "bg-warning/15 text-warning border-warning/40",
    icon: AlertTriangle,
    label: "Atenção",
  },
  fail: {
    pill: "bg-destructive/15 text-destructive border-destructive/40",
    icon: XCircle,
    label: "Crítico",
  },
};

function ScoreDial({ value }: { value: number }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  const color =
    value >= 85
      ? "text-success"
      : value >= 65
        ? "text-warning"
        : "text-destructive";
  return (
    <div className="relative grid size-36 place-items-center">
      <svg viewBox="0 0 140 140" className="size-36 -rotate-90" aria-hidden>
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-none stroke-muted"
          strokeWidth={10}
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          className={`fill-none ${color} transition-[stroke-dashoffset] duration-700`}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className={`text-4xl font-semibold tabular-nums ${color}`}>
            {value}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            de 100
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoHealth() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        eyebrow="SEO"
        title="Saúde de SEO do seu site"
        description="Um diagnóstico completo dos pontos que mais impactam sua presença no Google."
        actions={
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-1.5 size-4" aria-hidden />
            Rodar novo diagnóstico
          </Button>
        }
      />

      {/* Score summary */}
      <section
        aria-label="Pontuação geral de SEO"
        className="grid gap-6 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8"
      >
        <div className="flex justify-center md:justify-start">
          <ScoreDial value={score} />
        </div>
        <div>
          <p className="eyebrow mb-1.5">Shippa SEO Score</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {score >= 85
              ? "Seu site está em boa forma."
              : score >= 65
                ? "Seu site vai bem, mas há espaço para crescer."
                : "Alguns pontos importantes precisam de atenção."}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Analisamos 8 aspectos essenciais do seu site. Resolva os itens em
            atenção e crítico para subir posições no Google.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <CheckCircle2 className="size-3.5" aria-hidden />
              {counts.ok} OK
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
              <AlertTriangle className="size-3.5" aria-hidden />
              {counts.warn} atenção
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
              <XCircle className="size-3.5" aria-hidden />
              {counts.fail} crítico
            </span>
          </div>
        </div>
      </section>

      {/* Check cards */}
      <section aria-label="Verificações de SEO" className="grid gap-4 lg:grid-cols-2">
        {checks.map((c) => {
          const s = statusStyles[c.status];
          const StatusIcon = s.icon;
          return (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-5"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{c.label}</h3>
                    <p className="text-xs text-muted-foreground">{c.summary}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${s.pill}`}
                >
                  <StatusIcon className="size-3.5" aria-hidden />
                  {s.label}
                </span>
              </header>

              <p className="mt-4 text-sm text-muted-foreground">{c.details}</p>

              <div className="mt-4 rounded-xl border border-border/60 bg-surface p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Sparkles className="size-3.5 text-primary" aria-hidden />
                  Recomendação
                </p>
                <p className="text-sm text-muted-foreground">{c.recommendation}</p>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA */}
      <section
        aria-label="Análise avançada de SEO"
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8"
      >
        <div className="relative max-w-2xl">
          <p className="eyebrow mb-2">Shippa One Pro</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Vá além do diagnóstico com SEO avançado.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Acompanhe posições no Google, palavras-chave em alta, backlinks e
            receba recomendações semanais personalizadas para cada página.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/planos">
                Ativar SEO Pro
                <ArrowUpRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/crescimento">Ver mais recursos Pro</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
