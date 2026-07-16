import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Search,
  Inbox,
  Plug,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { ComponentType, SVGProps, ReactNode } from "react";
import { PageHeader } from "@/shared/page-header";
import {
  AnalyticsMockup,
  SeoMockup,
  LeadsMockup,
  ConnectionsMockup,
} from "@/features/dashboard/product-mockups";

export const Route = createFileRoute("/_app/crescimento")({
  component: GrowthCenter,
});

type GrowthCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
  benefits: string[];
  preview: ReactNode;
  learnMoreTo: string;
};

const cards: GrowthCard[] = [
  {
    id: "analytics",
    eyebrow: "Analytics",
    title: "Entenda de onde vem seu resultado",
    description:
      "Métricas claras de visitas, origem do tráfego e comportamento — sem dashboards confusos.",
    icon: BarChart3,
    accent: "from-primary/25 via-primary/10",
    benefits: [
      "Visitantes, tempo médio e páginas em tempo real",
      "Compare canais: Google, redes sociais e direto",
      "Relatórios semanais no seu e-mail",
    ],
    preview: <AnalyticsMockup />,
    learnMoreTo: "/analytics",
  },
  {
    id: "seo",
    eyebrow: "SEO",
    title: "Apareça quando buscarem por você",
    description:
      "Acompanhe posições no Google, palavras-chave em alta e a saúde de SEO do seu site.",
    icon: Search,
    accent: "from-success/20 via-success/5",
    benefits: [
      "Rankings das suas palavras-chave principais",
      "Score de SEO por página e sugestões práticas",
      "Detecta oportunidades no seu nicho",
    ],
    preview: <SeoMockup />,
    learnMoreTo: "/insights",
  },
  {
    id: "leads",
    eyebrow: "Leads",
    title: "Todos os contatos em um lugar",
    description:
      "Centralize leads do WhatsApp, formulários e Instagram — organizados e prontos para conversar.",
    icon: Inbox,
    accent: "from-warning/20 via-warning/5",
    benefits: [
      "Caixa única para todos os canais",
      "Etiquetas automáticas: novo, quente, convertido",
      "Alertas em tempo real de novos contatos",
    ],
    preview: <LeadsMockup />,
    learnMoreTo: "/leads",
  },
  {
    id: "integracoes",
    eyebrow: "Integrações",
    title: "Conecte suas ferramentas favoritas",
    description:
      "WhatsApp, Google, Meta Ads, Mailchimp, Zapier — tudo trabalhando junto pelo seu site.",
    icon: Plug,
    accent: "from-primary-glow/25 via-primary-glow/5",
    benefits: [
      "Mais de 30 integrações prontas",
      "Ativação em um clique, sem código",
      "Sincronização automática de contatos e eventos",
    ],
    preview: <ConnectionsMockup />,
    learnMoreTo: "/integracoes",
  },
];

function GrowthCenter() {
  return (
    <div className="space-y-8 pb-4">
      <PageHeader
        eyebrow="Central de Crescimento"
        title="Recursos para levar seu site ao próximo nível"
        description="Explore o que o Shippa One Pro oferece. Cada recurso foi desenhado para gerar resultado real, com ativação guiada pelo nosso time."
        actions={
          <Link
            to="/planos"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" aria-hidden /> Ver planos
          </Link>
        }
      />

      <GrowthHighlight />

      <div className="grid gap-5 lg:grid-cols-2">
        {cards.map((c) => (
          <GrowthCardView key={c.id} card={c} />
        ))}
      </div>

      <UpgradeBanner />
    </div>
  );
}

function GrowthHighlight() {
  const items = [
    { icon: TrendingUp, label: "+38%", sub: "de crescimento médio em 90 dias" },
    { icon: Zap, label: "1 clique", sub: "para ativar cada recurso" },
    { icon: CheckCircle2, label: "Sem obra", sub: "nada instalar, nada configurar" },
  ];
  return (
    <div className="grid gap-3 rounded-2xl border border-border/60 bg-surface-elevated p-4 sm:grid-cols-3 sm:p-5">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-glow">
            <i.icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-tight text-foreground">{i.label}</p>
            <p className="text-xs text-muted-foreground">{i.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function GrowthCardView({ card }: { card: GrowthCard }) {
  const Icon = card.icon;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated shadow-elegant transition hover:border-primary/40">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${card.accent} to-transparent`}
      />
      <div className="relative flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow ring-1 ring-primary/20">
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <p className="eyebrow">{card.eyebrow}</p>
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {card.title}
              </h2>
            </div>
          </div>
          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow sm:inline-flex">
            <Sparkles className="h-3 w-3" aria-hidden /> Pro
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{card.description}</p>

        <ul className="space-y-1.5">
          {card.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-success"
                strokeWidth={2}
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-1 overflow-hidden rounded-xl">{card.preview}</div>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Link
            to={card.learnMoreTo}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:text-primary-glow"
          >
            Saiba mais <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            to="/planos"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Ativar
          </Link>
        </div>
      </div>
    </article>
  );
}

function UpgradeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl"
      />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
            <Sparkles className="h-3 w-3" aria-hidden /> One Pro
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Pronto para transformar seu site em uma máquina de crescimento?
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Nosso time configura tudo com você. Sem contratos longos, sem complicação.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/planos"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
          >
            Ver planos <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to="/suporte"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/50"
          >
            Falar com especialista
          </Link>
        </div>
      </div>
    </div>
  );
}