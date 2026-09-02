import type { ComponentType, ReactNode, SVGProps } from "react";
import { PageHeader } from "@/shared/page-header";

export type ProFeature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

/**
 * Conteúdo do módulo para quem tem PRO ativo.
 * Nesta etapa os dados continuam mockados (mesmos mockups já existentes).
 */
export function ProModuleView({
  eyebrow,
  title,
  description,
  visual,
  features,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  visual?: ReactNode;
  features: ProFeature[];
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-8 pb-4">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
      />

      {visual && (
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated p-4 shadow-elegant sm:p-6">
          {visual}
        </section>
      )}

      <section>
        <div className="mb-4">
          <p className="eyebrow">Recursos ativos</p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
            Disponível no seu plano Pro
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="card-elevated group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-glow ring-1 ring-primary/20">
                <f.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
