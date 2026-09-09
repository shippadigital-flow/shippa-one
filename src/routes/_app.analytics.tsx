import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  MousePointerClick,
  Clock,
  TrendingUp,
  Search,
  Instagram,
  Link2,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { PageHeader } from "@/shared/page-header";
import { LockedModulePreview } from "@/features/dashboard/locked-module";
import { AnalyticsMockup } from "@/features/dashboard/product-mockups";
import { PlanGate } from "@/features/plan/plan-gate";

export const Route = createFileRoute("/_app/analytics")({
  component: AnalyticsRoute,
});

function AnalyticsRoute() {
  return (
    <PlanGate feature="analytics" locked={<AnalyticsLocked />}>
      <AnalyticsDashboard />
    </PlanGate>
  );
}

function AnalyticsLocked() {
  return (
    <LockedModulePreview
      eyebrow="Analytics"
      title="Entenda quem visita seu site e o que faz por lá."
      subtitle="Visitantes, sessões, origens de tráfego, dispositivos, países e páginas mais vistas — em linguagem clara, sem jargão."
      heroIcon={TrendingUp}
      visual={<AnalyticsMockup />}
      benefits={[
        "Saiba de onde vem cada visita",
        "Descubra as páginas que mais engajam",
        "Acompanhe o crescimento mês a mês",
      ]}
      features={[
        { icon: Users, title: "Visitantes e sessões", description: "Volume real de audiência, atualizado todos os dias." },
        { icon: Search, title: "Fontes de tráfego", description: "Busca, direto, redes sociais e indicações separados." },
        { icon: Smartphone, title: "Dispositivos", description: "Veja como as pessoas acessam: celular, desktop ou tablet." },
        { icon: Globe2, title: "Países e regiões", description: "Entenda a origem geográfica da sua audiência." },
        { icon: MousePointerClick, title: "Páginas mais vistas", description: "Onde a atenção do seu público está concentrada." },
        { icon: TrendingUp, title: "Curva de crescimento", description: "A evolução de visitas nos últimos 30 dias." },
      ]}
      insight={{
        title: "Seu site já recebe visitas. Falta saber o que elas fazem por lá.",
        description: "Ative Analytics e transforme tráfego em decisões de conteúdo e campanha.",
      }}
    />
  );
}

const kpis = [
  { label: "Visitantes", value: "4.286", delta: "+18,4%", icon: Users },
  { label: "Sessões", value: "6.912", delta: "+12,1%", icon: MousePointerClick },
  { label: "Tempo médio", value: "2m 34s", delta: "+8,7%", icon: Clock },
  { label: "Taxa de rejeição", value: "38%", delta: "-4,2%", icon: TrendingUp },
];

const growth = [
  32, 41, 38, 52, 48, 61, 58, 72, 68, 84, 79, 96, 92, 108, 118, 124, 132, 141, 138, 152, 168, 172,
  181, 194, 202, 218, 226, 241, 254, 268,
];

const sources: {
  name: string;
  visitors: number;
  share: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { name: "Google Search", visitors: 1842, share: 43, icon: Search },
  { name: "Direto", visitors: 986, share: 23, icon: Link2 },
  { name: "Instagram", visitors: 742, share: 17, icon: Instagram },
  { name: "WhatsApp", visitors: 428, share: 10, icon: Globe2 },
  { name: "Outros", visitors: 288, share: 7, icon: Globe2 },
];

const devices = [
  { name: "Mobile", value: 62, icon: Smartphone },
  { name: "Desktop", value: 31, icon: Monitor },
  { name: "Tablet", value: 7, icon: Tablet },
];

const countries = [
  { flag: "🇧🇷", name: "Brasil", visitors: 3421, share: 80 },
  { flag: "🇵🇹", name: "Portugal", visitors: 412, share: 10 },
  { flag: "🇺🇸", name: "Estados Unidos", visitors: 218, share: 5 },
  { flag: "🇪🇸", name: "Espanha", visitors: 142, share: 3 },
  { flag: "🇦🇷", name: "Argentina", visitors: 93, share: 2 },
];

const topPages = [
  { path: "/", label: "Página inicial", views: 2184, time: "1m 48s" },
  { path: "/servicos", label: "Serviços", views: 1247, time: "2m 12s" },
  {
    path: "/blog/seo-para-pequenas-empresas",
    label: "Guia de SEO para PMEs",
    views: 892,
    time: "4m 06s",
  },
  { path: "/contato", label: "Contato", views: 641, time: "1m 22s" },
  {
    path: "/blog/checklist-site-2026",
    label: "Checklist de site 2026",
    views: 528,
    time: "3m 41s",
  },
];

function AnalyticsDashboard() {
  const max = Math.max(...growth);
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        eyebrow="Analytics"
        title="Como seu site está performando"
        description="Uma visão clara de quem visita, de onde vem e o que engaja. Dados dos últimos 30 dias."
      />

      {/* KPIs */}
      <section
        aria-label="Indicadores principais"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border/60 bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{k.label}</span>
              <k.icon className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</div>
            <div className="mt-1 text-xs font-medium text-success">{k.delta} vs. mês anterior</div>
          </div>
        ))}
      </section>

      {/* Growth chart */}
      <section
        aria-label="Evolução de visitantes"
        className="rounded-2xl border border-border/60 bg-card p-5"
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Crescimento de visitantes</h2>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-success">
            <TrendingUp className="size-4" aria-hidden />
            +18,4%
          </div>
        </div>
        <div className="mt-5 flex h-40 items-end gap-1">
          {growth.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary transition-all hover:opacity-90"
              style={{ height: `${(v / max) * 100}%` }}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>18 jun</span>
          <span>02 jul</span>
          <span>17 jul</span>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Traffic sources */}
        <section
          aria-label="Fontes de tráfego"
          className="rounded-2xl border border-border/60 bg-card p-5"
        >
          <h2 className="text-base font-semibold">Fontes de tráfego</h2>
          <p className="text-xs text-muted-foreground">De onde seus visitantes vêm</p>
          <ul className="mt-4 space-y-3">
            {sources.map((s) => (
              <li key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <s.icon className="size-4 text-muted-foreground" aria-hidden />
                    {s.name}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {s.visitors.toLocaleString("pt-BR")} · {s.share}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${s.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Devices */}
        <section
          aria-label="Dispositivos"
          className="rounded-2xl border border-border/60 bg-card p-5"
        >
          <h2 className="text-base font-semibold">Dispositivos</h2>
          <p className="text-xs text-muted-foreground">Como acessam seu site</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {devices.map((d) => (
              <div key={d.name} className="rounded-xl border border-border/60 bg-surface p-4">
                <d.icon className="size-5 text-primary" aria-hidden />
                <div className="mt-3 text-2xl font-semibold tabular-nums">{d.value}%</div>
                <div className="text-xs text-muted-foreground">{d.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full">
            <div className="bg-primary" style={{ width: "62%" }} />
            <div className="bg-primary/60" style={{ width: "31%" }} />
            <div className="bg-primary/30" style={{ width: "7%" }} />
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Countries */}
        <section
          aria-label="Países"
          className="rounded-2xl border border-border/60 bg-card p-5 lg:col-span-2"
        >
          <h2 className="text-base font-semibold">Países</h2>
          <p className="text-xs text-muted-foreground">Origem geográfica</p>
          <ul className="mt-4 space-y-3">
            {countries.map((c) => (
              <li key={c.name} className="flex items-center gap-3 text-sm">
                <span className="text-lg" aria-hidden>
                  {c.flag}
                </span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="tabular-nums text-muted-foreground">
                  {c.visitors.toLocaleString("pt-BR")}
                </span>
                <span className="w-10 text-right text-xs text-muted-foreground">{c.share}%</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Top pages */}
        <section
          aria-label="Páginas mais visitadas"
          className="rounded-2xl border border-border/60 bg-card p-5 lg:col-span-3"
        >
          <h2 className="text-base font-semibold">Páginas mais visitadas</h2>
          <p className="text-xs text-muted-foreground">Onde a atenção está</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Página</th>
                  <th className="px-3 py-2 text-right font-medium">Visualizações</th>
                  <th className="hidden px-3 py-2 text-right font-medium sm:table-cell">
                    Tempo médio
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.path} className="border-t border-border/60">
                    <td className="px-3 py-2.5">
                      <div className="font-medium">{p.label}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.path}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      {p.views.toLocaleString("pt-BR")}
                    </td>
                    <td className="hidden px-3 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell">
                      {p.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

    </div>
  );
}
