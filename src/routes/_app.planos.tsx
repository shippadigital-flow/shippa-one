import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Sparkles,
  Crown,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { usePlan } from "@/hooks/use-plan";

export const Route = createFileRoute("/_app/planos")({
  component: PlanosPage,
});

type PlanCard = {
  id: "start" | "pro";
  name: string;
  tagline: string;
  price: string;
  priceHint: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const plans: PlanCard[] = [
  {
    id: "start",
    name: "Shippa One Start",
    tagline: "Comece com um site profissional e conteúdo.",
    price: "Incluído",
    priceHint: "no seu plano atual",
    features: [
      "Site profissional publicado",
      "Blog integrado",
      "Biblioteca de mídia",
      "Editor Shippa",
      "Configurações e domínio",
      "Suporte por chat",
    ],
    cta: "Seu plano atual",
  },
  {
    id: "pro",
    name: "Shippa One Pro",
    tagline: "Transforme visitantes em clientes reais.",
    price: "R$ 39,90",
    priceHint: "por mês",
    highlight: true,
    features: [
      "Tudo do Start, incluído",
      "Leads: caixa de entrada unificada",
      "Analytics em linguagem clara",
      "Conversões e metas personalizadas",
      "Insights semanais com IA",
      "Relatórios automáticos em PDF",
      "Integrações (WhatsApp, Google, Meta)",
      "Suporte prioritário",
    ],
    cta: "Upgrade para One Pro",
  },
];

function PlanosPage() {
  const { plan } = usePlan();

  return (
    <div className="flex flex-col gap-10 pt-8">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-glow">
          Planos Shippa One
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Escolha o próximo passo do seu negócio.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Comece publicando seu site com o Start. Cresça com Pro quando estiver
          pronto para transformar cada visitante em uma oportunidade real.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        {plans.map((p) => {
          const isCurrent = p.id === plan;
          return (
            <article
              key={p.id}
              className={
                "card-elevated relative flex flex-col overflow-hidden p-8 transition " +
                (p.highlight
                  ? "border-primary/40 ring-1 ring-primary/20"
                  : "")
              }
            >
              {p.highlight && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
              )}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-xl " +
                      (p.highlight
                        ? "bg-gradient-primary shadow-glow"
                        : "bg-primary/10 text-primary-glow ring-1 ring-primary/20")
                    }
                  >
                    {p.highlight ? (
                      <Crown className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {p.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">{p.tagline}</p>
                  </div>
                </div>
                {isCurrent && (
                  <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-medium text-success">
                    Plano atual
                  </span>
                )}
              </div>

              <div className="relative mt-8 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-foreground">
                  {p.price}
                </span>
                <span className="pb-1.5 text-sm text-muted-foreground">
                  {p.priceHint}
                </span>
              </div>

              <ul className="relative mt-8 flex flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <div
                      className={
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full " +
                        (p.highlight ? "bg-primary/20 text-primary-glow" : "bg-success/20 text-success")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-10">
                {isCurrent ? (
                  <button
                    disabled
                    className="inline-flex w-full items-center justify-center rounded-lg border border-border/60 bg-surface px-5 py-3 text-sm font-medium text-muted-foreground"
                  >
                    {p.cta}
                  </button>
                ) : p.highlight ? (
                  <a
                    href="#"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <button className="inline-flex w-full items-center justify-center rounded-lg border border-border/60 bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:bg-accent">
                    {p.cta}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="card-elevated relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-60" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Ainda com dúvidas sobre qual plano combina com você?
            </h3>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              Fale com um especialista Shippa. Em 15 minutos ajudamos você a
              entender o melhor caminho para o momento do seu negócio.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90 lg:w-auto">
              <MessageCircle className="h-4 w-4" /> Falar com especialista
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
