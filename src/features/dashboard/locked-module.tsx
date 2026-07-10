import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import type { ComponentType, SVGProps, ReactNode } from "react";

export type PreviewFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export type HowItWorksStep = { title: string; description: string };
export type FaqItem = { question: string; answer: string };

const defaultSteps: HowItWorksStep[] = [
  { title: "Ative com um clique", description: "Faça o upgrade para o Shippa One Pro em menos de 1 minuto." },
  { title: "Personalize com seu time", description: "Nosso time de crescimento configura tudo do seu jeito." },
  { title: "Acompanhe sua evolução", description: "Veja o impacto direto na sua presença digital, semana após semana." },
];

const defaultFaqs: FaqItem[] = [
  { question: "Preciso instalar algo no meu site?", answer: "Não. Tudo funciona nativamente dentro do Shippa One, sem configurações técnicas." },
  { question: "Posso testar antes de contratar?", answer: "Sim. Nosso time faz uma demonstração personalizada mostrando o resultado no seu negócio." },
  { question: "Como funciona o suporte?", answer: "Você conta com um especialista Shippa dedicado, do onboarding ao acompanhamento contínuo." },
];

export function LockedModulePreview({
  eyebrow,
  title,
  subtitle,
  heroIcon: HeroIcon,
  features,
  insight,
  benefits,
  visual,
  howItWorks = defaultSteps,
  faqs = defaultFaqs,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroIcon: ComponentType<SVGProps<SVGSVGElement>>;
  features: PreviewFeature[];
  insight?: { title: string; description: string };
  benefits?: string[];
  visual?: ReactNode;
  howItWorks?: HowItWorksStep[];
  faqs?: FaqItem[];
}) {
  return (
    <div className="flex flex-col gap-12 pt-4">
      {/* HERO */}
      <section className="card-elevated relative overflow-hidden p-6 sm:p-10 lg:p-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-80" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 eyebrow">
                <Sparkles className="h-3 w-3" /> {eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground">
                <Sparkles className="h-3 w-3" /> Disponível no One Pro
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {subtitle}
            </p>

            {benefits && benefits.length > 0 && (
              <ul className="mt-7 space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/planos"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
              >
                Descobrir o One Pro <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" /> Falar com especialista
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/5 to-transparent blur-3xl" />
            <div className="relative">
              {visual ?? <DefaultVisual Icon={HeroIcon} />}
            </div>
          </div>
        </div>
      </section>

      {/* VEJA COMO FUNCIONA — full-width interactive preview */}
      {visual && (
        <section>
          <div className="mb-6 text-center">
            <p className="eyebrow">
              Veja como funciona
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Uma prévia do produto rodando de verdade
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Interaja com os dados abaixo e sinta o que muda no seu dia a dia dentro do Shippa One.
            </p>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-[36px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
            <div className="relative mx-auto w-full max-w-5xl">
              {visual}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow">
              O que você desbloqueia
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Tudo o que você precisa para crescer
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="card-elevated group relative overflow-hidden p-6 transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-glow ring-1 ring-primary/20">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="mb-6">
          <p className="eyebrow">
            Como funciona
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Simples do começo ao fim
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <div key={step.title} className="card-elevated relative p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow">
                {i + 1}
              </div>
              <h3 className="mt-5 text-[15px] font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-6">
          <p className="eyebrow">
            Perguntas frequentes
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Ainda tem dúvidas?
          </h2>
        </div>
        <div className="card-elevated divide-y divide-border/60 overflow-hidden">
          {faqs.map((faq, i) => (
            <FaqRow key={faq.question} faq={faq} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* INSIGHT / CTA */}
      {insight && (
        <section className="card-elevated relative overflow-hidden p-10 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary-glow">
                <Sparkles className="h-3 w-3" /> Insight prévio
              </span>
              <p className="mt-4 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                {insight.title}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{insight.description}</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                to="/planos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90 lg:w-auto"
              >
                Descobrir o One Pro <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground lg:justify-end"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Falar com especialista
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function FaqRow({ faq, defaultOpen = false }: { faq: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-accent/40"
      >
        <span className="text-[15px] font-medium text-foreground">{faq.question}</span>
        {open ? (
          <Minus className="h-4 w-4 shrink-0 text-primary-glow" />
        ) : (
          <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="animate-fade-in px-6 pb-5 pr-14 text-sm leading-relaxed text-muted-foreground">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

function DefaultVisual({
  Icon,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-surface-elevated p-8 shadow-elegant">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          shippa.one / pro
        </span>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-4 py-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow">
          <Icon className="h-9 w-9 text-primary-foreground" strokeWidth={1.5} />
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl border border-border/60 bg-surface"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.62 0.22 258 / 0.12), transparent)",
              }}
            />
          ))}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-gradient-primary opacity-70" />
        </div>
      </div>
    </div>
  );
}
