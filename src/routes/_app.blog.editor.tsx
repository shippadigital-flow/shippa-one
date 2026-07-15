import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Calendar,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImagePlus,
  Undo2,
  Redo2,
  X,
  Sparkles,
  Tag as TagIcon,
  ChevronDown,
} from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import {
  CATEGORIES,
  findArticle,
  type Article,
  seoTone,
} from "@/features/blog/mock-data";

const searchSchema = z.object({
  id: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/_app/blog/editor")({
  validateSearch: zodValidator(searchSchema),
  component: BlogEditorPage,
});

type Draft = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  cover: string;
  scheduledFor: string;
};

const emptyDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  category: CATEGORIES[0],
  tags: [],
  metaTitle: "",
  metaDescription: "",
  cover: "linear-gradient(135deg,#7c3aed 0%,#2563eb 60%,#0ea5e9 100%)",
  scheduledFor: "",
};

function fromArticle(a: Article): Draft {
  return {
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    tags: [...a.tags],
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    cover: a.cover,
    scheduledFor: a.scheduledFor ?? "",
  };
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function BlogEditorPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const existing = findArticle(id || null);

  const [draft, setDraft] = useState<Draft>(
    existing ? fromArticle(existing) : emptyDraft,
  );
  const [preview, setPreview] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary-glow underline underline-offset-2" },
      }),
      ImageExt.configure({
        HTMLAttributes: { class: "rounded-xl border border-border/60 my-4" },
      }),
      Placeholder.configure({
        placeholder:
          "Comece a escrever… Use / para inserir títulos, listas, imagens…",
      }),
    ],
    content: existing?.content ?? "<p></p>",
    editorProps: {
      attributes: {
        class:
          "tiptap prose-invert max-w-none focus:outline-none min-h-[420px] text-[15px] leading-relaxed text-foreground",
      },
    },
  });

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  // auto-slug from title if slug is empty or matches previous slugified title
  useEffect(() => {
    if (!draft.slug || draft.slug === slugify(draft.title).slice(0, draft.slug.length)) {
      setDraft((d) => ({ ...d, slug: slugify(d.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.title]);

  const seoScore = useMemo(() => computeSeo(draft), [draft]);
  const seo = seoTone(seoScore);

  const save = (kind: "draft" | "publish" | "schedule") => {
    setSavedAt(new Date());
    if (kind === "publish" || kind === "schedule") {
      // simulate: navigate back
      setTimeout(() => navigate({ to: "/blog" }), 400);
    }
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (!t) return;
    if (draft.tags.includes(t)) {
      setTagInput("");
      return;
    }
    update({ tags: [...draft.tags, t] });
    setTagInput("");
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <EditorTopBar
        title={existing ? "Editar artigo" : "Novo artigo"}
        savedAt={savedAt}
        onDraft={() => save("draft")}
        onTogglePreview={() => setPreview((v) => !v)}
        onSchedule={() => setShowSchedule((v) => !v)}
        onPublish={() => save("publish")}
        preview={preview}
      />

      {showSchedule && (
        <div className="card-elevated flex flex-wrap items-center gap-3 p-4">
          <Calendar className="h-4 w-4 text-warning" aria-hidden />
          <label htmlFor="sched" className="text-sm font-medium text-foreground">
            Agendar publicação
          </label>
          <input
            id="sched"
            type="datetime-local"
            value={draft.scheduledFor}
            onChange={(e) => update({ scheduledFor: e.target.value })}
            className="h-9 rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          <button
            type="button"
            onClick={() => save("schedule")}
            disabled={!draft.scheduledFor}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-warning/90 px-3 py-1.5 text-xs font-medium text-background transition hover:bg-warning disabled:opacity-50"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden /> Confirmar agendamento
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-4">
          <CoverField cover={draft.cover} onChange={(cover) => update({ cover })} />

          {preview ? (
            <PreviewPane draft={draft} html={editor?.getHTML() ?? ""} />
          ) : (
            <div className="card-elevated flex flex-col gap-4 p-6 sm:p-8">
              <input
                value={draft.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Título do artigo"
                className="w-full border-none bg-transparent text-2xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-3xl"
              />
              <input
                value={draft.excerpt}
                onChange={(e) => update({ excerpt: e.target.value })}
                placeholder="Escreva um resumo curto…"
                className="w-full border-none bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <div className="h-px bg-border/60" />
              {editor && <EditorToolbar editor={editor} />}
              <EditorContent editor={editor} />
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <Panel title="Publicação">
            <FieldRow label="Categoria">
              <select
                value={draft.category}
                onChange={(e) => update({ category: e.target.value })}
                className="h-9 w-full rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </FieldRow>
            <FieldRow label="Slug">
              <div className="flex items-center rounded-lg border border-border/70 bg-surface px-2">
                <span className="text-xs text-muted-foreground">/blog/</span>
                <input
                  value={draft.slug}
                  onChange={(e) => update({ slug: slugify(e.target.value) })}
                  className="h-9 w-full border-none bg-transparent px-1 text-sm text-foreground focus:outline-none"
                  placeholder="meu-artigo"
                />
              </div>
            </FieldRow>
            <FieldRow label="Tags">
              <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/70 bg-surface p-1.5">
                {draft.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-foreground"
                  >
                    <TagIcon className="h-3 w-3" aria-hidden />
                    {t}
                    <button
                      type="button"
                      onClick={() =>
                        update({ tags: draft.tags.filter((x) => x !== t) })
                      }
                      aria-label={`Remover tag ${t}`}
                      className="rounded-full p-0.5 text-muted-foreground transition hover:text-foreground"
                    >
                      <X className="h-3 w-3" aria-hidden />
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder={draft.tags.length ? "" : "Adicionar tag…"}
                  className="min-w-[80px] flex-1 border-none bg-transparent px-1 py-0.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </FieldRow>
          </Panel>

          <Panel
            title="SEO"
            trailing={
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium " +
                  (seo === "success"
                    ? "bg-success/15 text-success"
                    : seo === "warning"
                    ? "bg-warning/15 text-warning"
                    : "bg-destructive/15 text-destructive")
                }
              >
                <Sparkles className="h-3 w-3" aria-hidden /> {seoScore}
              </span>
            }
          >
            <FieldRow label="Meta Title" hint={`${draft.metaTitle.length}/60`}>
              <input
                value={draft.metaTitle}
                onChange={(e) => update({ metaTitle: e.target.value })}
                maxLength={80}
                placeholder={draft.title || "Título para o Google…"}
                className="h-9 w-full rounded-lg border border-border/70 bg-surface px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </FieldRow>
            <FieldRow
              label="Meta Description"
              hint={`${draft.metaDescription.length}/160`}
            >
              <textarea
                value={draft.metaDescription}
                onChange={(e) => update({ metaDescription: e.target.value })}
                rows={3}
                maxLength={200}
                placeholder={draft.excerpt || "Descrição para os buscadores…"}
                className="w-full resize-none rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </FieldRow>
            <div className="rounded-lg border border-border/60 bg-surface p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Prévia no Google
              </p>
              <p className="mt-1 truncate text-xs text-success">
                anapaula.adv.br › blog › {draft.slug || "seu-artigo"}
              </p>
              <p className="mt-1 line-clamp-1 text-sm font-medium text-primary-glow">
                {draft.metaTitle || draft.title || "Título do artigo"}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {draft.metaDescription || draft.excerpt || "Descrição do artigo…"}
              </p>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------ Top bar ------------------------------ */

function EditorTopBar({
  title,
  savedAt,
  onDraft,
  onTogglePreview,
  onSchedule,
  onPublish,
  preview,
}: {
  title: string;
  savedAt: Date | null;
  onDraft: () => void;
  onTogglePreview: () => void;
  onSchedule: () => void;
  onPublish: () => void;
  preview: boolean;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 pt-6">
      <div className="flex items-center gap-3">
        <Link
          to="/blog"
          aria-label="Voltar para o blog"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </Link>
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {savedAt && (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Salvo às {savedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
        <button
          type="button"
          onClick={onDraft}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
        >
          <Save className="h-3.5 w-3.5" aria-hidden /> Salvar rascunho
        </button>
        <button
          type="button"
          onClick={onTogglePreview}
          aria-pressed={preview}
          className={
            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition " +
            (preview
              ? "border-primary/50 bg-primary/10 text-primary-glow"
              : "border-border/60 bg-surface text-foreground hover:bg-accent")
          }
        >
          <Eye className="h-3.5 w-3.5" aria-hidden /> {preview ? "Editar" : "Prévia"}
        </button>
        <button
          type="button"
          onClick={onSchedule}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
        >
          <Calendar className="h-3.5 w-3.5" aria-hidden /> Agendar
        </button>
        <button
          type="button"
          onClick={onPublish}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
        >
          <Send className="h-3.5 w-3.5" aria-hidden /> Publicar
        </button>
      </div>
    </header>
  );
}

/* ------------------------------ Toolbar ------------------------------ */

function EditorToolbar({ editor }: { editor: Editor }) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const btn = (active: boolean) =>
    "inline-flex h-8 w-8 items-center justify-center rounded-md transition " +
    (active
      ? "bg-accent text-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-foreground");

  const applyLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    }
    setLinkOpen(false);
    setLinkUrl("");
  };

  const addImage = () => {
    const url = window.prompt("URL da imagem");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="sticky top-16 z-10 -mx-6 flex flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-surface/95 px-2 py-1.5 backdrop-blur sm:mx-0">
      <TBGroup>
        <button aria-label="Título 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive("heading", { level: 1 }))}>
          <Heading1 className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Título 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}>
          <Heading2 className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Título 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}>
          <Heading3 className="h-4 w-4" aria-hidden />
        </button>
      </TBGroup>
      <Divider />
      <TBGroup>
        <button aria-label="Negrito" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>
          <Bold className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Itálico" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>
          <Italic className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Sublinhado" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive("underline"))}>
          <UnderlineIcon className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Riscado" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))}>
          <Strikethrough className="h-4 w-4" aria-hidden />
        </button>
      </TBGroup>
      <Divider />
      <TBGroup>
        <button aria-label="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>
          <List className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Lista numerada" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}>
          <ListOrdered className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Citação" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}>
          <Quote className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Código" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive("codeBlock"))}>
          <Code className="h-4 w-4" aria-hidden />
        </button>
      </TBGroup>
      <Divider />
      <TBGroup>
        <div className="relative">
          <button
            aria-label="Link"
            onClick={() => setLinkOpen((v) => !v)}
            className={btn(editor.isActive("link"))}
          >
            <LinkIcon className="h-4 w-4" aria-hidden />
          </button>
          {linkOpen && (
            <div className="absolute left-0 top-full z-20 mt-1.5 flex items-center gap-1 rounded-lg border border-border/60 bg-popover p-1.5 shadow-elegant">
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyLink()}
                placeholder="https://…"
                className="h-8 w-52 rounded-md border border-border/60 bg-surface px-2 text-xs text-foreground focus:outline-none"
              />
              <button
                onClick={applyLink}
                className="rounded-md bg-gradient-primary px-2 py-1 text-[11px] font-medium text-primary-foreground"
              >
                OK
              </button>
            </div>
          )}
        </div>
        <button aria-label="Imagem" onClick={addImage} className={btn(false)}>
          <ImagePlus className="h-4 w-4" aria-hidden />
        </button>
      </TBGroup>
      <Divider />
      <TBGroup>
        <button aria-label="Desfazer" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>
          <Undo2 className="h-4 w-4" aria-hidden />
        </button>
        <button aria-label="Refazer" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>
          <Redo2 className="h-4 w-4" aria-hidden />
        </button>
      </TBGroup>
    </div>
  );
}

function TBGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}
function Divider() {
  return <span className="mx-1 h-5 w-px bg-border/60" aria-hidden />;
}

/* ------------------------------ Sidebar Panel ------------------------------ */

function Panel({
  title,
  children,
  trailing,
}: {
  title: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className="card-elevated overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-5 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="flex items-center gap-2">
          {trailing}
          <ChevronDown
            aria-hidden
            className={
              "h-4 w-4 text-muted-foreground transition-transform " +
              (open ? "rotate-180" : "rotate-0")
            }
          />
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-3 border-t border-border/60 p-5">{children}</div>
      )}
    </section>
  );
}

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        {hint && <span className="text-[10px] text-muted-foreground tabular-nums">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------ Cover ------------------------------ */

const COVER_PRESETS = [
  "linear-gradient(135deg,#7c3aed 0%,#2563eb 60%,#0ea5e9 100%)",
  "linear-gradient(135deg,#f59e0b 0%,#ef4444 60%,#7c3aed 100%)",
  "linear-gradient(135deg,#10b981 0%,#0ea5e9 60%,#6366f1 100%)",
  "linear-gradient(135deg,#ec4899 0%,#8b5cf6 60%,#3b82f6 100%)",
  "linear-gradient(135deg,#14b8a6 0%,#22c55e 60%,#eab308 100%)",
  "linear-gradient(135deg,#0ea5e9 0%,#6366f1 60%,#a855f7 100%)",
];

function CoverField({
  cover,
  onChange,
}: {
  cover: string;
  onChange: (v: string) => void;
}) {
  const [pick, setPick] = useState(false);
  return (
    <div className="card-elevated overflow-hidden">
      <div
        className="relative h-40 sm:h-52"
        style={{ background: cover }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden />
        <button
          type="button"
          onClick={() => setPick((v) => !v)}
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-black/60"
        >
          <ImagePlus className="h-3.5 w-3.5" aria-hidden /> Imagem de destaque
        </button>
      </div>
      {pick && (
        <div className="flex flex-wrap gap-2 border-t border-border/60 p-4">
          {COVER_PRESETS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label="Selecionar capa"
              onClick={() => {
                onChange(c);
                setPick(false);
              }}
              className={
                "h-10 w-16 rounded-md border transition " +
                (c === cover ? "border-primary/70 ring-2 ring-ring/40" : "border-border/60")
              }
              style={{ background: c }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Preview ------------------------------ */

function PreviewPane({ draft, html }: { draft: Draft; html: string }) {
  return (
    <div className="card-elevated p-6 sm:p-10">
      <p className="eyebrow">{draft.category}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {draft.title || "Título do artigo"}
      </h1>
      {draft.excerpt && (
        <p className="mt-3 text-base text-muted-foreground">{draft.excerpt}</p>
      )}
      <div className="my-6 h-px bg-border/60" />
      <div
        className="tiptap prose-invert max-w-none text-[15px] leading-relaxed text-foreground"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html || "<p></p>" }}
      />
      {draft.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {draft.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-foreground"
            >
              <TagIcon className="h-3 w-3" aria-hidden /> {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ SEO score ------------------------------ */

function computeSeo(d: Draft) {
  let s = 0;
  if (d.title.length >= 20 && d.title.length <= 70) s += 20;
  else if (d.title) s += 10;
  if (d.metaTitle.length >= 30 && d.metaTitle.length <= 60) s += 20;
  else if (d.metaTitle) s += 8;
  if (d.metaDescription.length >= 80 && d.metaDescription.length <= 160) s += 20;
  else if (d.metaDescription) s += 8;
  if (d.slug) s += 10;
  if (d.excerpt) s += 10;
  if (d.tags.length >= 2) s += 10;
  else if (d.tags.length) s += 5;
  if (d.cover) s += 10;
  return Math.min(100, s);
}