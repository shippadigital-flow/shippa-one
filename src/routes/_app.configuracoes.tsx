import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Building2, Shield, Bell, Plug, Check } from "lucide-react";
import { PageHeader } from "@/shared/page-header";
import type { ComponentType, SVGProps } from "react";

export const Route = createFileRoute("/_app/configuracoes")({
  component: ConfigPage,
});

type Tab = { id: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };
const tabs: Tab[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "integracoes", label: "Integrações", icon: Plug },
];

function ConfigPage() {
  const [active, setActive] = useState("perfil");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Configurações"
        title="Preferências da conta"
        description="Ajuste o Shippa One ao seu jeito de trabalhar."
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card-elevated flex flex-col gap-1 p-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition " +
                (active === t.id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground")
              }
            >
              <t.icon className="h-4 w-4" strokeWidth={1.75} /> {t.label}
            </button>
          ))}
        </aside>

        <section className="card-elevated p-8">
          {active === "perfil" && <ProfileSection />}
          {active === "empresa" && <CompanySection />}
          {active === "seguranca" && <SecuritySection />}
          {active === "notificacoes" && <NotificationsSection />}
          {active === "integracoes" && <IntegrationsSection />}
        </section>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function Input({ defaultValue }: { defaultValue?: string }) {
  return (
    <input
      defaultValue={defaultValue}
      className="h-10 w-full rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
    />
  );
}

function ProfileSection() {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Perfil</h3>
      <p className="mt-1 text-sm text-muted-foreground">Como você aparece no Shippa One.</p>
      <div className="mt-6 flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-lg font-semibold text-primary-foreground">
          AP
        </div>
        <button className="rounded-lg border border-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent">
          Alterar foto
        </button>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Row label="Nome"><Input defaultValue="Ana Paula" /></Row>
        <Row label="Sobrenome"><Input defaultValue="Silva" /></Row>
        <Row label="E-mail"><Input defaultValue="ana@anapaula.adv.br" /></Row>
        <Row label="Cargo"><Input defaultValue="Advogada Sócia" /></Row>
      </div>
    </div>
  );
}

function CompanySection() {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Empresa</h3>
      <p className="mt-1 text-sm text-muted-foreground">Dados do seu negócio.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Row label="Razão social"><Input defaultValue="Ana Paula Advocacia" /></Row>
        <Row label="CNPJ"><Input defaultValue="00.000.000/0001-00" /></Row>
        <Row label="Segmento"><Input defaultValue="Direito" /></Row>
        <Row label="Fuso horário"><Input defaultValue="America/Sao_Paulo" /></Row>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Segurança</h3>
      <p className="mt-1 text-sm text-muted-foreground">Proteja sua conta.</p>
      <div className="mt-6 space-y-4">
        <Row label="Senha atual"><Input /></Row>
        <Row label="Nova senha"><Input /></Row>
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-surface p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Autenticação em dois fatores</p>
            <p className="text-xs text-muted-foreground">Uma camada extra de proteção.</p>
          </div>
          <button className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Ativar
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const items = [
    { label: "Novos leads", desc: "Receba por e-mail quando um lead chegar.", on: true },
    { label: "Resumo semanal", desc: "Um relatório calmo toda segunda de manhã.", on: true },
    { label: "Novidades do produto", desc: "Fique por dentro de novos recursos.", on: false },
  ];
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Notificações</h3>
      <p className="mt-1 text-sm text-muted-foreground">Escolha o que faz sentido para você.</p>
      <div className="mt-6 space-y-2">
        {items.map((i) => (
          <div key={i.label} className="flex items-center justify-between rounded-lg border border-border/60 bg-surface p-4">
            <div>
              <p className="text-sm font-medium text-foreground">{i.label}</p>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
            </div>
            <span
              className={
                "flex h-6 w-11 items-center rounded-full p-0.5 transition " +
                (i.on ? "bg-gradient-primary" : "bg-muted")
              }
            >
              <span
                className={
                  "h-5 w-5 rounded-full bg-white transition " +
                  (i.on ? "translate-x-5" : "translate-x-0")
                }
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const ints = [
    { name: "Google Analytics", desc: "Envie dados de tráfego para o GA4.", connected: true },
    { name: "WhatsApp Business", desc: "Receba mensagens direto no Shippa Flow.", connected: false },
    { name: "Meta Pixel", desc: "Rastreie conversões em campanhas.", connected: true },
    { name: "Zapier", desc: "Conecte a milhares de outros apps.", connected: false },
  ];
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Integrações</h3>
      <p className="mt-1 text-sm text-muted-foreground">Conecte o Shippa One às ferramentas que você já usa.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {ints.map((i) => (
          <div key={i.name} className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-surface p-4">
            <div>
              <p className="text-sm font-medium text-foreground">{i.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
            </div>
            {i.connected ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-medium text-success">
                <Check className="h-3 w-3" /> Conectado
              </span>
            ) : (
              <button className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent">
                Conectar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
