import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
  Pencil,
  FileText,
  CheckCircle2,
  Calendar,
  FileEdit,
  Sparkles,
  ImageIcon,
  Star,
} from "lucide-react";
import { PageHeader } from "@/shared/page-header";
import {
  CATEGORIES,
  articles as seed,
  statusMeta,
  seoTone,
  type Article,
  type ArticleStatus,
} from "@/features/blog/mock-data";

export const Route = createFileRoute("/_app/blog/")({
  component: BlogListPage,
});

type Filter = "all" | ArticleStatus;

function BlogListPage() {
  const [items, setItems] = useState<Article[]>(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Filter>("all");
  const [category, setCategory] = useState<string>("Todas");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: items.length,
      published: items.filter((a) => a.status === "published").length,
      draft: items.filter((a) => a.status === "draft").length,
      scheduled: items.filter((a) => a.status === "scheduled").length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (category !== "Todas" && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [items, query, status, category]);

  const duplicate = (id: string) => {
    setMenuOpen(null);
    setItems((prev) => {
      const src = prev.find((a) => a.id === id);
      if (!src) return prev;
      const copy: Article = {
        ...src,
        id: `art_${Date.now()}`,
        title: `${src.title} (cópia)`,
        slug: `${src.slug}-copia`,
        status: "draft",
        views: 0,
        publishedAt: "—",
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      return [copy, ...prev];
    });
  };

  const remove = (id: string) => {
    setMenuOpen(null);
    setItems((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      <PageHeader
        eyebrow="Blog"
        title="Seus artigos"
        description="Escreva, agende e publique conteúdos que atraem clientes — tudo em um só lugar."
        actions={
          <Link
            to="/blog/editor"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" aria-hidden /> Novo artigo
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Todos" value={counts.all} tone="muted" />
        <StatCard icon={CheckCircle2} label="Publicados" value={counts.published} tone="success" />
        <StatCard icon={FileEdit} label="Rascunhos" value={counts.draft} tone="muted" />
        <StatCard icon={Calendar} label="Agendados" value={counts.scheduled} tone="warning" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filtrar por status"
          className="inline-flex rounded-lg border border-border/60 bg-surface p-0.5"
        >
          {(
            [
              { id: "all", label: "Todos" },
              { id: "published", label: "Publicados" },
              { id: "draft", label: "Rascunhos" },
              { id: "scheduled", label: "Agendados" },
            ] as { id: Filter; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={status === t.id}
              onClick={() => setStatus(t.id)}
              className={
                "rounded-md px-3 py-1.5 text-xs font-medium transition " +
                (status === t.id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-1 items-center gap-2 lg:justify-end">
          <div className="relative w-full max-w-xs">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="blog-search" className="sr-only">
              Buscar artigo
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, tag…"
              className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <label htmlFor="blog-cat" className="sr-only">
            Categoria
          </label>
          <select
            id="blog-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            <option>Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard
              key={a.id}
              article={a}
              menuOpen={menuOpen === a.id}
              onToggleMenu={() =>
                setMenuOpen((cur) => (cur === a.id ? null : a.id))
              }
              onDuplicate={() => duplicate(a.id)}
              onDelete={() => remove(a.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: number;
  tone: "success" | "warning" | "muted";
}) {
  const map = {
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    muted: "text-muted-foreground bg-accent",
  } as const;
  return (
    <div className="card-elevated flex items-center gap-3 p-4">
      <div className={"flex h-10 w-10 items-center justify-center rounded-lg " + map[tone]}>
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold tabular-nums text-foreground">{value}</p>
      </div>
    </div>
  );
}

function ArticleCard({
  article: a,
  menuOpen,
  onToggleMenu,
  onDuplicate,
  onDelete,
}: {
  article: Article;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const st = statusMeta(a.status);
  const seo = seoTone(a.seoScore);
  const statusClass =
    st.tone === "success"
      ? "bg-success/15 text-success"
      : st.tone === "warning"
      ? "bg-warning/15 text-warning"
      : "bg-accent text-muted-foreground";
  const seoClass =
    seo === "success"
      ? "bg-success/15 text-success"
      : seo === "warning"
      ? "bg-warning/15 text-warning"
      : "bg-destructive/15 text-destructive";

  return (
    <article className="card-elevated group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-primary/30">
      <div className="relative h-40 overflow-hidden" style={{ background: a.cover }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
        <ImageIcon
          aria-hidden
          className="absolute right-4 top-4 h-4 w-4 text-white/70"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {a.category}
        </span>
        {a.featured && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            <Star className="h-3 w-3" aria-hidden /> Destaque
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className={"rounded-full px-2 py-0.5 font-medium " + statusClass}>{st.label}</span>
          <span className={"inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium " + seoClass}>
            <Sparkles className="h-3 w-3" aria-hidden /> SEO {a.seoScore}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
            <Eye className="h-3 w-3" aria-hidden />
            <span className="tabular-nums">{a.views.toLocaleString("pt-BR")}</span>
          </span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-foreground transition group-hover:text-primary-glow">
          {a.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>
            {a.status === "scheduled" && a.scheduledFor
              ? `Agendado · ${formatDate(a.scheduledFor)}`
              : a.status === "published"
              ? `Publicado · ${formatDate(a.publishedAt)}`
              : `Editado · ${formatDate(a.updatedAt)}`}
          </span>
          <div className="relative flex items-center gap-1">
            <Link
              to="/blog/editor"
              search={{ id: a.id }}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary-glow transition hover:bg-accent hover:text-foreground"
            >
              <Pencil className="h-3 w-3" aria-hidden /> Editar
            </Link>
            <button
              type="button"
              onClick={onToggleMenu}
              aria-label="Mais ações"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="rounded-md p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden />
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute bottom-full right-0 mb-1.5 w-40 overflow-hidden rounded-lg border border-border/60 bg-popover shadow-elegant"
              >
                <button
                  role="menuitem"
                  onClick={onDuplicate}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground transition hover:bg-accent"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden /> Duplicar
                </button>
                <button
                  role="menuitem"
                  onClick={onDelete}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden /> Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="card-elevated flex flex-col items-center justify-center gap-3 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-muted-foreground">
        <FileText className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-base font-semibold text-foreground">Nenhum artigo encontrado</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajuste a busca ou crie um novo artigo para começar.
        </p>
      </div>
      <Link
        to="/blog/editor"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-elegant"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden /> Novo artigo
      </Link>
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso || iso === "—") return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
}