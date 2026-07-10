import { createFileRoute } from "@tanstack/react-router";
import { Save, Globe, Phone, MessageCircle, Mail, Instagram, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/shared/page-header";
import type { ComponentType, SVGProps } from "react";

export const Route = createFileRoute("/_app/site")({
  component: SitePage,
});

type Field = {
  label: string;
  placeholder: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  textarea?: boolean;
};

const fields: Field[] = [
  { label: "Telefone", placeholder: "(11) 0000-0000", value: "(11) 3000-1200", icon: Phone },
  { label: "WhatsApp", placeholder: "(11) 90000-0000", value: "(11) 99123-4567", icon: MessageCircle },
  { label: "E-mail", placeholder: "contato@empresa.com", value: "contato@anapaula.adv.br", icon: Mail },
  { label: "Instagram", placeholder: "@usuario", value: "@dra.anapaula", icon: Instagram },
  { label: "Endereço", placeholder: "Rua, número, cidade", value: "Av. Paulista, 1000 · São Paulo", icon: MapPin },
  { label: "Horário de atendimento", placeholder: "Seg a Sex, 9h às 18h", value: "Seg a Sex · 9h às 18h", icon: Clock },
];

function SitePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Meu Site"
        title="Informações do seu site"
        description="Atualize os dados que aparecem em todas as páginas. Sem código, sem complicação."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">
            <Save className="h-4 w-4" /> Salvar alterações
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card-elevated p-6 lg:col-span-2">
          <h3 className="text-base font-semibold text-foreground">Identidade e contato</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Essas informações aparecem no topo, rodapé e páginas de contato.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Logo</label>
              <div className="flex items-center gap-4 rounded-xl border border-dashed border-border/80 bg-surface p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-primary text-lg font-bold text-primary-foreground">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">logo-anapaula.svg</p>
                  <p className="text-xs text-muted-foreground">SVG · 4 KB · atualizado há 3 dias</p>
                </div>
                <button className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent">
                  Substituir
                </button>
              </div>
            </div>

            {fields.map((f) => (
              <div key={f.label}>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  {f.label}
                </label>
                <div className="relative">
                  <f.icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    defaultValue={f.value}
                    placeholder={f.placeholder}
                    className="h-10 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-elevated flex flex-col gap-5 p-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Chamada principal</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              O botão de ação em destaque no seu site.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Texto do CTA</label>
            <input
              defaultValue="Agende uma consulta"
              className="h-10 w-full rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Botão hero</label>
            <input
              defaultValue="Falar no WhatsApp"
              className="h-10 w-full rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="mt-2 rounded-xl border border-border/60 bg-surface p-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" /> Prévia
            </div>
            <button className="w-full rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant">
              Falar no WhatsApp
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
