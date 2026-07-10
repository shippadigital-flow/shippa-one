import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Sparkles,
  Globe,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Circle,
  Search,
  Users,
  Gauge,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { usePlan } from "@/hooks/use-plan";
import { useAuth } from "@/hooks/use-auth";
import { greetingFor, firstName } from "@/lib/greeting";
import { ShippaScore, type ScoreFactor } from "@/features/dashboard/shippa-score";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

type JourneyStep = {
  label: string;
  done: boolean;
  to: string;
  hint: string;
};

function DashboardPage() {
  const { plan } = usePlan();
  const { user } = useAuth();
  const greeting = `${greetingFor()}, ${user ? firstName(user.name) : "por aqui"}`;

  const journey: JourneyStep[] = [
    { label: "Site publicado", done: true, to: "/site", hint: "Seu site está no ar." },
    { label: "Blog ativo", done: true, to: "/blog", hint: "Publicando conteúdo relevante." },
    { label: "Configurar Google", done: false, to: "/integracoes", hint: "Conecte o Search Console." },
    { label: "Ativar Analytics", done: false, to: "/analytics", hint: "Entenda quem visita seu site." },
    { label: "Receber Leads", done: false, to: "/leads", hint: "Capture contatos automaticamente." },
    { label: "Melhorar SEO", done: false, to: "/insights", hint: "Suba nas buscas do Google." },
  ];

  const doneCount = journey.filter((j) => j.done).length;
  const progress = Math.round((doneCount / journey.length) * 100);

  const summary = [
    "Seu site está funcionando normalmente.",
    "Você publicou um novo artigo esta semana.",
    "O próximo passo recomendado é conectar o Google Search Console.",
  ];

  const scoreFactors: ScoreFactor[] = [
    { label: "Site publicado", done: true, weight: 20, to: "/site", hint: "Seu site está no ar." },
    { label: "Blog ativo", done: true, weight: 15, to: "/blog", hint: "Você publica com frequência." },
    { label: "Google conectado", done: false, weight: 15, to: "/integracoes", hint: "Search Console pendente." },
    { label: "Analytics ativo", done: false, weight: 15, to: "/analytics", hint: "Meça sua audiência." },
    { label: "SEO configurado", done: true, weight: 15, to: "/insights", hint: "Meta tags e sitemap ok." },
    { label: "Segurança (HTTPS)", done: true, weight: 10, to: "/configuracoes", hint: "Certificado ativo." },
    { label: "Performance otimizada", done: false, weight: 10, to: "/site", hint: "Comprimir imagens." },
  ];

  const recentContent = [
    { title: "Como escolher um advogado de família", date: "há 2 dias", reads: 184 },
    { title: "Passo a passo do inventário digital", date: "há 6 dias", reads: 122 },
    { title: "5 direitos do consumidor que ninguém te contou", date: "há 12 dias", reads: 96 },
  ];

  return (
    <div className="flex flex-col gap-10 pt-4 pb-8">
      {/* 1. SMART SUMMARY */}
      <section className="relative">
        <div className="flex items-center gap-2 eyebrow">
          <Sparkles className="h-3.5 w-3.5" /> Assistente Shippa
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {greeting}.
        </h1>
        <div className="mt-6 max-w-2xl space-y-2.5">
          {summary.map((line, i) => (
            <p
              key={line}
              className="animate-fade-in text-[16px] leading-relaxed text-muted-foreground"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: "backwards" }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* 2. RESUMO INTELIGENTE */}
      <section>
        <div className="mb-4">
          <p className="eyebrow">
            Resumo Inteligente
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            O que aconteceu com sua presença digital
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SmartCard tone="success" icon={CheckCircle2} title="Site estável" body="Nenhum incidente nos últimos 7 dias. 99,98% de uptime." />
          <SmartCard icon={FileText} title="Novo artigo publicado" body='"Como escolher um advogado de família" — 184 leituras.' />
          <SmartCard icon={Search} title="Oportunidade detectada" body='3 termos do seu nicho crescendo. Conteúdo sugerido.' />
        </div>
      </section>

      {/* 3. ÍNDICE SHIPPA */}
      <ShippaScore factors={scoreFactors} />

      {/* 4. SUA JORNADA DIGITAL */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">
              Sua Jornada Digital
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Cada passo te aproxima de mais visibilidade
            </h2>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{progress}%</p>
            <p className="text-xs text-muted-foreground">
              {doneCount} de {journey.length} etapas
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] bg-gradient-to-br from-surface via-surface to-primary/5 p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-40" />
          <div className="relative">
            <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
              <div
                className="h-full rounded-full bg-gradient-primary shadow-glow transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {journey.map((step, i) => (
                <li key={step.label} style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }} className="animate-fade-in">
                  <Link
                    to={step.to}
                    className="group flex items-start gap-3 rounded-xl bg-surface/60 p-4 transition hover:-translate-y-0.5 hover:bg-surface"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/60 transition group-hover:text-primary-glow" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={"text-sm font-medium " + (step.done ? "text-foreground" : "text-foreground/90")}>
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{step.hint}</p>
                    </div>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 text-muted-foreground/60 opacity-0 transition group-hover:translate-x-0.5 group-hover:text-primary-glow group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MEU SITE */}
      <section>
        <div className="mb-4">
          <p className="eyebrow">
            Meu Site
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Como seu site está agora
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            icon={Globe}
            label="Status do site"
            value="Online"
            hint="anapaula.adv.br"
            tone="success"
          />
          <OverviewCard
            icon={FileText}
            label="Artigos publicados"
            value="27"
            hint="+1 esta semana"
          />
          <OverviewCard
            icon={Users}
            label="Visitantes"
            value={plan === "pro" ? "12.482" : "Em breve"}
            hint={plan === "pro" ? "+18% no mês" : "Ative o Analytics"}
          />
          <OverviewCard
            icon={Gauge}
            label="Saúde de SEO"
            value="Boa"
            hint="4 melhorias sugeridas"
          />
        </div>
      </section>

      {/* 6. DESEMPENHO */}
      <PerformanceSection />

      {/* 7. CONTEÚDO RECENTE */}
      <section>
        <div className="mb-4">
          <p className="eyebrow">
            Conteúdo Recente
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Últimos artigos publicados
          </h2>
        </div>
        <ul className="divide-y divide-border/50 overflow-hidden rounded-2xl bg-surface/40">
          {recentContent.map((c, i) => (
            <li key={c.title}>
              <Link
                to="/blog"
                className="group flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-accent/30"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-foreground group-hover:text-primary-glow">
                    {c.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.date} · {c.reads} leituras</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/60 transition group-hover:translate-x-0.5 group-hover:text-primary-glow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. PRÓXIMOS PASSOS */}
      <section>
        <div className="mb-4">
          <p className="eyebrow">
            Próximos Passos
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Recomendações inteligentes para você
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <RecommendationCard
            icon={Search}
            headline="Seu site já está pronto."
            body="Agora descubra como as pessoas encontram sua empresa no Google."
            to="/integracoes"
            cta="Conectar Google"
          />
          <RecommendationCard
            icon={BarChart3}
            headline="Você ainda não conectou o Google Search Console."
            body="Entenda quais termos trazem visitantes e melhore sua visibilidade."
            to="/analytics"
            cta="Ativar Analytics"
          />
          <RecommendationCard
            icon={FileText}
            headline="Seu blog pode gerar ainda mais visitas."
            body="Publique novos conteúdos para atrair leitores e clientes em potencial."
            to="/blog"
            cta="Escrever artigo"
          />
          <RecommendationCard
            icon={Target}
            headline="Transforme visitantes em oportunidades."
            body="Ative a captura de leads e receba contatos direto no seu painel."
            to="/leads"
            cta="Ver Leads"
          />
        </div>
      </section>
    </div>
  );
}

/* ---------------- SUBCOMPONENTS ---------------- */

function SmartCard({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  tone?: "success";
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-surface/50 p-6 transition hover:bg-surface">
      <div
        className={
          "flex h-10 w-10 items-center justify-center rounded-xl " +
          (tone === "success"
            ? "bg-success/15 text-success"
            : "bg-primary/10 text-primary-glow")
        }
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function PerformanceSection() {
  const bars = [30, 44, 38, 62, 51, 74, 68];
  return (
    <section>
      <div className="mb-4">
        <p className="eyebrow">
          Desempenho
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Sua semana em um olhar
        </h2>
      </div>
      <div className="grid gap-6 rounded-[calc(var(--radius)+8px)] bg-surface/50 p-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="flex items-end gap-2 h-40">
            {bars.map((b, i) => (
              <div key={i} className="flex-1">
                <div
                  className="shippa-anim-grow w-full rounded-md bg-gradient-primary opacity-90"
                  style={{ height: `${b}%`, animationDelay: `${i * 120}ms` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {"Seg Ter Qua Qui Sex Sáb Dom".split(" ").map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <MetricRow label="Visitas" value="1.284" delta="+12%" />
          <MetricRow label="Leituras do blog" value="402" delta="+8%" />
          <MetricRow label="Contatos" value="18" delta="+3" />
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-semibold tracking-tight text-foreground">{value}</span>
        <span className="text-[11px] font-medium text-success">{delta}</span>
      </div>
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  hint: string;
  tone?: "success";
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-surface/50 p-6 transition hover:-translate-y-0.5 hover:bg-surface">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
      </div>
      <p
        className={
          "mt-5 text-2xl font-semibold tracking-tight " +
          (tone === "success" ? "text-success" : "text-foreground")
        }
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function RecommendationCard({
  icon: Icon,
  headline,
  body,
  to,
  cta,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  headline: string;
  body: string;
  to: string;
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface/50 p-7 transition hover:-translate-y-0.5 hover:bg-surface"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-60 blur-3xl transition group-hover:opacity-100" />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-glow ring-1 ring-primary/20">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <p className="relative mt-6 text-[17px] font-semibold leading-snug text-foreground">
        {headline}
      </p>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
      <p className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-glow">
        {cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

