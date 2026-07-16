import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Signal,
  Sparkles,
  Play,
  Download,
  FileText,
  BarChart3,
  Globe,
  Megaphone,
  Gauge,
  Chrome,
  GraduationCap,
} from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/_app/biblioteca")({
  component: KnowledgeCenter,
});

type Difficulty = "Iniciante" | "Intermediário" | "Avançado";
type CategoryId =
  | "seo"
  | "google"
  | "blog"
  | "marketing"
  | "website"
  | "performance"
  | "tutorials"
  | "downloads";

type Category = {
  id: CategoryId;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  // Tailwind gradient utility classes used for cover art
  cover: string;
};

const categories: Category[] = [
  { id: "seo", label: "SEO", icon: Search, cover: "from-primary/40 via-primary/20 to-primary-glow/30" },
  { id: "google", label: "Google", icon: Chrome, cover: "from-warning/40 via-warning/15 to-primary/20" },
  { id: "blog", label: "Blog", icon: FileText, cover: "from-primary-glow/40 via-primary/15 to-transparent" },
  { id: "marketing", label: "Marketing", icon: Megaphone, cover: "from-destructive/35 via-primary/15 to-transparent" },
  { id: "website", label: "Website", icon: Globe, cover: "from-success/35 via-primary/15 to-transparent" },
  { id: "performance", label: "Performance", icon: Gauge, cover: "from-primary/40 via-success/15 to-transparent" },
  { id: "tutorials", label: "Tutoriais", icon: Play, cover: "from-primary-glow/45 via-primary/20 to-transparent" },
  { id: "downloads", label: "Downloads", icon: Download, cover: "from-primary/40 via-muted/10 to-transparent" },
];

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  readingTime: number;
  difficulty: Difficulty;
  type: "Artigo" | "Vídeo" | "Guia" | "Download";
};

const articles: Article[] = [
  { id: "a1", title: "O que é SEO e por que ele importa para o seu site", excerpt: "Entenda o básico do SEO e como aparecer no Google sem depender de anúncios.", category: "seo", readingTime: 6, difficulty: "Iniciante", type: "Artigo" },
  { id: "a2", title: "Palavras-chave: como escolher as certas para o seu nicho", excerpt: "Um método simples para descobrir o que seu público realmente busca.", category: "seo", readingTime: 9, difficulty: "Intermediário", type: "Guia" },
  { id: "a3", title: "Configure o Google Search Console em 5 minutos", excerpt: "Passo a passo com prints para conectar seu site e ver suas primeiras métricas.", category: "google", readingTime: 5, difficulty: "Iniciante", type: "Tutorial" as unknown as "Artigo" },
  { id: "a4", title: "Google Meu Negócio: o guia completo para prestadores de serviço", excerpt: "Otimize sua ficha e conquiste os primeiros clientes locais.", category: "google", readingTime: 12, difficulty: "Intermediário", type: "Guia" },
  { id: "a5", title: "Como escrever um artigo de blog que gera leads", excerpt: "Estrutura testada em mais de 200 artigos publicados no Shippa One.", category: "blog", readingTime: 8, difficulty: "Intermediário", type: "Artigo" },
  { id: "a6", title: "Checklist do artigo perfeito (SEO + leitura)", excerpt: "20 itens para revisar antes de publicar qualquer texto no seu blog.", category: "blog", readingTime: 4, difficulty: "Iniciante", type: "Download" },
  { id: "a7", title: "Funil de marketing digital para pequenos negócios", excerpt: "Do primeiro clique ao cliente fiel — como pensar cada etapa.", category: "marketing", readingTime: 11, difficulty: "Avançado", type: "Guia" },
  { id: "a8", title: "E-mail marketing: por onde começar hoje", excerpt: "Ferramentas, listas, réguas e boas práticas para não cair no spam.", category: "marketing", readingTime: 7, difficulty: "Iniciante", type: "Artigo" },
  { id: "a9", title: "Anatomia de um site que converte", excerpt: "Os blocos essenciais de uma página de captura de alto desempenho.", category: "website", readingTime: 10, difficulty: "Intermediário", type: "Artigo" },
  { id: "a10", title: "Domínio próprio: como registrar e apontar corretamente", excerpt: "Guia visual para configurar DNS sem quebrar seu site.", category: "website", readingTime: 6, difficulty: "Iniciante", type: "Guia" },
  { id: "a11", title: "Core Web Vitals na prática", excerpt: "Entenda LCP, INP e CLS e o que fazer quando eles caem.", category: "performance", readingTime: 9, difficulty: "Avançado", type: "Artigo" },
  { id: "a12", title: "Como reduzir o tempo de carregamento do seu site", excerpt: "Truques de imagem, cache e fontes que funcionam de verdade.", category: "performance", readingTime: 7, difficulty: "Intermediário", type: "Artigo" },
  { id: "a13", title: "Tour completo pelo Shippa One", excerpt: "Vídeo em 8 minutos mostrando tudo que você pode fazer no painel.", category: "tutorials", readingTime: 8, difficulty: "Iniciante", type: "Vídeo" },
  { id: "a14", title: "Publicando seu primeiro artigo no editor Shippa", excerpt: "Do rascunho ao publicado — passo a passo em vídeo.", category: "tutorials", readingTime: 5, difficulty: "Iniciante", type: "Vídeo" },
  { id: "a15", title: "Kit de templates para redes sociais (PDF)", excerpt: "12 layouts prontos para adaptar à identidade do seu negócio.", category: "downloads", readingTime: 2, difficulty: "Iniciante", type: "Download" },
  { id: "a16", title: "Planilha: metas de crescimento trimestral", excerpt: "Modelo pronto para acompanhar tráfego, leads e conversões.", category: "downloads", readingTime: 3, difficulty: "Intermediário", type: "Download" },
];

function KnowledgeCenter() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (active !== "all" && a.category !== active) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  const featured = articles[0];

  return (
    <div className="flex flex-col gap-8 pb-4">
      <PageHeader
        eyebrow="Biblioteca"
        title="Central de conhecimento"
        description="Aprenda, no seu ritmo, tudo o que você precisa para fazer seu site crescer."
        actions={
          <div className="relative w-full max-w-xs">
            <label htmlFor="library-search" className="sr-only">
              Buscar conteúdo
            </label>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="library-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar na biblioteca…"
              className="h-10 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        }
      />

      <FeaturedCard article={featured} />

      <CategoryFilter active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <EmptyState onClear={() => { setQuery(""); setActive("all"); }} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: CategoryId | "all";
  onChange: (id: CategoryId | "all") => void;
}) {
  return (
    <nav aria-label="Categorias" className="flex flex-wrap gap-2">
      <FilterChip
        active={active === "all"}
        onClick={() => onChange("all")}
        icon={GraduationCap}
        label="Tudo"
      />
      {categories.map((c) => (
        <FilterChip
          key={c.id}
          active={active === c.id}
          onClick={() => onChange(c.id)}
          icon={c.icon}
          label={c.label}
        />
      ))}
    </nav>
  );
}

function FilterChip({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition " +
        (active
          ? "border-primary/50 bg-primary/15 text-primary-glow"
          : "border-border/60 bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground")
      }
    >
      <Icon className="h-3.5 w-3.5" aria-hidden strokeWidth={1.75} />
      {label}
    </button>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  const cat = categories.find((c) => c.id === article.category)!;
  return (
    <article className="card-elevated relative overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="relative flex flex-col justify-between gap-4 p-6 sm:p-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
              <Sparkles className="h-3 w-3" aria-hidden /> Destaque da semana
            </span>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {article.title}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              {article.excerpt}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <MetaChip icon={BookOpen} label={cat.label} />
            <MetaChip icon={Clock} label={`${article.readingTime} min de leitura`} />
            <DifficultyBadge level={article.difficulty} />
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
            >
              Abrir <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <Cover category={cat} tall />
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const cat = categories.find((c) => c.id === article.category)!;
  return (
    <article className="card-elevated group flex flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:border-primary/40">
      <Cover category={cat} typeBadge={article.type} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
            <cat.icon className="h-3 w-3" aria-hidden /> {cat.label}
          </span>
          <DifficultyBadge level={article.difficulty} />
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden /> {article.readingTime} min
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground transition group-hover:border-primary/50 group-hover:text-primary-glow"
          >
            Abrir <ArrowRight className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}

function Cover({
  category,
  tall = false,
  typeBadge,
}: {
  category: Category;
  tall?: boolean;
  typeBadge?: Article["type"];
}) {
  const Icon = category.icon;
  return (
    <div
      aria-hidden
      className={
        "relative overflow-hidden bg-gradient-to-br " +
        category.cover +
        " " +
        (tall ? "min-h-[220px] md:min-h-full" : "aspect-[16/9]")
      }
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
      <Icon
        className="absolute inset-0 m-auto h-14 w-14 text-white/80 drop-shadow"
        strokeWidth={1.25}
      />
      {typeBadge && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
          {typeBadge === "Vídeo" ? <Play className="h-3 w-3" /> : typeBadge === "Download" ? <Download className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
          {typeBadge}
        </span>
      )}
    </div>
  );
}

function MetaChip({
  icon: Icon,
  label,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}

function DifficultyBadge({ level }: { level: Difficulty }) {
  const map: Record<Difficulty, { tone: string; bars: number }> = {
    Iniciante: { tone: "text-success bg-success/15", bars: 1 },
    Intermediário: { tone: "text-warning bg-warning/15", bars: 2 },
    Avançado: { tone: "text-primary-glow bg-primary/15", bars: 3 },
  };
  const cfg = map[level];
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
        cfg.tone
      }
      aria-label={`Dificuldade: ${level}`}
    >
      <Signal className="h-3 w-3" aria-hidden strokeWidth={2.5} />
      {level}
      <span className="sr-only">
        ({cfg.bars} de 3)
      </span>
    </span>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="card-elevated flex flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-glow">
        <BarChart3 className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-foreground">Nada por aqui ainda</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Não encontramos conteúdo com esses filtros. Tente outra categoria ou limpe a busca.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/50"
      >
        Limpar filtros
      </button>
    </div>
  );
}
