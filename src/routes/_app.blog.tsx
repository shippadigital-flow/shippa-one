import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, FileText, Filter, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/_app/blog")({
  component: BlogPage,
});

const articles = [
  {
    title: "Regularização de imóveis: guia completo para 2026",
    excerpt: "Entenda passo a passo como regularizar seu imóvel e evitar problemas futuros.",
    category: "Direito Imobiliário",
    status: "Publicado",
    date: "12 nov",
    views: "1.2k",
  },
  {
    title: "Inventário extrajudicial: quando é possível fazer",
    excerpt: "Descubra os requisitos e a economia de tempo em relação ao processo judicial.",
    category: "Sucessões",
    status: "Publicado",
    date: "08 nov",
    views: "864",
  },
  {
    title: "Usucapião familiar: como funciona na prática",
    excerpt: "Um resumo das condições, prazos e documentos necessários.",
    category: "Família",
    status: "Rascunho",
    date: "—",
    views: "—",
  },
  {
    title: "Contratos digitais têm o mesmo valor jurídico?",
    excerpt: "A validade dos contratos eletrônicos e as boas práticas para o seu negócio.",
    category: "Empresarial",
    status: "Publicado",
    date: "02 nov",
    views: "542",
  },
];

const categories = ["Todos", "Direito Imobiliário", "Sucessões", "Família", "Empresarial"];

function BlogPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Blog"
        title="Seus artigos"
        description="Um CMS moderno para publicar conteúdos que atraem clientes."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">
            <Plus className="h-4 w-4" /> Novo artigo
          </button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c, i) => (
            <button
              key={c}
              className={
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition " +
                (i === 0
                  ? "bg-foreground text-background"
                  : "border border-border/60 bg-surface text-muted-foreground hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar artigo…"
              className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 text-xs font-medium text-foreground transition hover:bg-accent">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.title}
            className="card-elevated group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/25 via-primary/10 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-10 w-10 text-primary-glow/60" strokeWidth={1.25} />
              </div>
              <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                {a.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span
                  className={
                    "rounded-full px-2 py-0.5 font-medium " +
                    (a.status === "Publicado"
                      ? "bg-success/15 text-success"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  {a.status}
                </span>
                <span>
                  {a.date} · {a.views} views
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-foreground transition group-hover:text-primary-glow">
                {a.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <button className="text-xs font-medium text-primary-glow hover:text-foreground">
                  Editar
                </button>
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
