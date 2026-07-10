import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  FileText,
  Plug,
  Package,
  Boxes,
  BarChart3,
  Clock,
  MessagesSquare,
  KeyRound,
  Ban,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/admin/clientes/$id")({
  component: ClientProfile,
});

function ClientProfile() {
  const { id } = useParams({ from: "/admin/clientes/$id" });

  return (
    <div className="space-y-6 pt-4">
      <Link
        to="/admin/clientes"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar para clientes
      </Link>

      <div className="card-elevated p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-glow">
                Cliente #{id}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-foreground">
                Clínica Bem-Estar
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Cadastrada em 12/02/2025 · Último acesso há 2 horas
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded-md border border-success/30 bg-success/15 px-2 py-0.5 font-medium text-success">
                  Ativo
                </span>
                <span className="inline-flex items-center rounded-md border border-border/60 bg-surface px-2 py-0.5 text-foreground">
                  Shippa One Pro
                </span>
                <span className="text-muted-foreground">R$ 349/mês</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={Pencil}>Editar empresa</ActionButton>
            <ActionButton icon={KeyRound}>Redefinir senha</ActionButton>
            <ActionButton icon={Boxes}>Módulos</ActionButton>
            <ActionButton icon={Ban} destructive>
              Suspender
            </ActionButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Informações gerais" icon={Building2}>
          <InfoRow icon={Mail} label="Email" value="ana@bemestar.com" />
          <InfoRow icon={Phone} label="Telefone" value="(11) 99999-1234" />
          <InfoRow icon={Building2} label="Responsável" value="Dra. Ana Paula" />
          <InfoRow icon={Globe} label="Domínio" value="bemestar.com.br" />
        </Section>

        <Section title="Site" icon={Globe}>
          <InfoRow icon={CheckCircle2} label="Publicado" value="Sim" success />
          <InfoRow icon={Globe} label="URL" value="bemestar.com.br" />
          <InfoRow icon={Clock} label="Última atualização" value="há 3 dias" />
          <InfoRow icon={BarChart3} label="Visitantes (30d)" value="4.238" />
        </Section>

        <Section title="Blog" icon={FileText}>
          <InfoRow icon={FileText} label="Artigos publicados" value="27" />
          <InfoRow icon={Clock} label="Último artigo" value="há 2 dias" />
          <InfoRow icon={BarChart3} label="Visualizações" value="12.402" />
        </Section>

        <Section title="Plano atual" icon={Package}>
          <InfoRow label="Plano" value="Shippa One Pro" />
          <InfoRow label="Valor" value="R$ 349,00 / mês" />
          <InfoRow label="Próxima cobrança" value="15/08/2026" />
          <InfoRow label="Método" value="Cartão final 4242" />
        </Section>

        <Section title="Módulos habilitados" icon={Boxes}>
          <ul className="space-y-2">
            {[
              { name: "Meu Site", on: true },
              { name: "Blog", on: true },
              { name: "Leads", on: true },
              { name: "Analytics", on: true },
              { name: "Biblioteca", on: true },
              { name: "Flow", on: false },
              { name: "SEO", on: true },
              { name: "Integrações", on: false },
            ].map((m) => (
              <li
                key={m.name}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm"
              >
                <span className="text-foreground">{m.name}</span>
                {m.on ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Serviços conectados" icon={Plug}>
          <InfoRow label="Google Analytics" value="Conectado" success />
          <InfoRow label="Google Search Console" value="Conectado" success />
          <InfoRow label="Meta Ads" value="Não conectado" />
          <InfoRow label="WhatsApp Business" value="Não conectado" />
        </Section>

        <Section title="Estatísticas de uso" icon={BarChart3}>
          <InfoRow label="Sessões (30d)" value="184" />
          <InfoRow label="Tempo médio" value="8m 12s" />
          <InfoRow label="Ações realizadas" value="1.240" />
          <InfoRow label="Última atividade" value="há 2 h" />
        </Section>

        <Section title="Atividade recente" icon={Clock}>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Publicou artigo 'Cuidados de outono'", w: "há 2 h" },
              { t: "Adicionou 3 imagens à biblioteca", w: "há 5 h" },
              { t: "Recebeu 4 novos leads", w: "há 1 d" },
              { t: "Atualizou dados de contato", w: "há 3 d" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-glow" />
                <div className="flex-1">
                  <p className="text-foreground">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.w}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Histórico de suporte" icon={MessagesSquare}>
          <ul className="space-y-2 text-sm">
            {[
              { t: "Dúvida sobre publicação de blog", s: "Resolvido" },
              { t: "Solicitação de integração", s: "Aberto" },
              { t: "Cobrança duplicada", s: "Fechado" },
            ].map((t, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2"
              >
                <span className="text-foreground">{t.t}</span>
                <span className="text-xs text-muted-foreground">{t.s}</span>
              </li>
            ))}
          </ul>
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
    <div className="card-elevated p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary-glow" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  success,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </span>
      <span className={"font-medium " + (success ? "text-success" : "text-foreground")}>
        {value}
      </span>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  destructive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      className={
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition " +
        (destructive
          ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "border-border/60 bg-surface text-foreground hover:bg-accent")
      }
    >
      <Icon className="h-3.5 w-3.5" /> {children}
    </button>
  );
}
