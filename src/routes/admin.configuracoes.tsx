import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, ShieldCheck, Webhook, KeyRound } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/admin/configuracoes")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistema"
        title="Configurações"
        description="Preferências internas da operação Shippa."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Organização" icon={Building2}>
          <Field label="Nome da organização" value="Shippa Digital" />
          <Field label="Domínio principal" value="shippa.com.br" />
          <Field label="Fuso horário" value="America/Sao_Paulo" />
          <Field label="Moeda padrão" value="BRL — Real" />
        </Section>

        <Section title="Equipe interna" icon={Users}>
          <ul className="space-y-2">
            {[
              { name: "Rafael Mota", email: "rafael@shippa.com.br", role: "Superadmin" },
              { name: "Beatriz Alves", email: "bia@shippa.com.br", role: "Suporte" },
              { name: "Marcelo Torres", email: "marcelo@shippa.com.br", role: "Engenharia" },
              { name: "Mariana Reis", email: "mari@shippa.com.br", role: "Suporte" },
            ].map((m) => (
              <li
                key={m.email}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-surface p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <span className="rounded-md border border-border/60 bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {m.role}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-2 w-full rounded-lg border border-border/60 bg-surface py-2 text-xs font-medium text-foreground hover:bg-accent">
            Convidar membro
          </button>
        </Section>

        <Section title="Segurança" icon={ShieldCheck}>
          <Toggle label="Autenticação em dois fatores obrigatória" on />
          <Toggle label="Bloquear acessos fora do Brasil" />
          <Toggle label="Log de auditoria detalhado" on />
          <Toggle label="Sessão expira em 8h" on />
        </Section>

        <Section title="Webhooks & API" icon={Webhook}>
          <Field label="URL de webhook interno" value="https://ops.shippa.com.br/hooks" />
          <Field label="Ambiente ativo" value="Produção" />
          <div className="rounded-lg border border-border/60 bg-surface p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <KeyRound className="h-4 w-4 text-primary-glow" />
                Chave da API interna
              </div>
              <button className="rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">
                Rotacionar
              </button>
            </div>
            <code className="mt-2 block truncate rounded bg-background px-2 py-1.5 font-mono text-xs text-muted-foreground">
              sk_live_••••••••••••••••••4d2f
            </code>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="card-elevated p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary-glow" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        defaultValue={value}
        className="mt-1 h-9 w-full rounded-lg border border-border/60 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-surface p-3">
      <span className="text-sm text-foreground">{label}</span>
      <span
        className={
          "relative inline-flex h-5 w-9 items-center rounded-full " +
          (on ? "bg-gradient-primary" : "bg-secondary")
        }
      >
        <span
          className={
            "inline-block h-4 w-4 rounded-full bg-background shadow transition " +
            (on ? "translate-x-4" : "translate-x-0.5")
          }
        />
      </span>
    </div>
  );
}
