import { createFileRoute } from "@tanstack/react-router";
import { Upload, Search, FolderClosed, Image as ImageIcon, Filter } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/_app/biblioteca")({
  component: BibliotecaPage,
});

const folders = [
  { name: "Blog", count: 42 },
  { name: "Hero", count: 8 },
  { name: "Equipe", count: 12 },
  { name: "Escritório", count: 18 },
];

const images = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: `imagem-${String(i + 1).padStart(2, "0")}.jpg`,
  size: `${(Math.random() * 800 + 200).toFixed(0)} KB`,
  hue: (i * 37) % 360,
}));

function BibliotecaPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Biblioteca"
        title="Suas mídias"
        description="Organize imagens, ícones e arquivos usados no seu site e blog."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">
            <Upload className="h-4 w-4" /> Enviar arquivo
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="card-elevated flex flex-col gap-1 p-3">
          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Pastas
          </p>
          <button className="flex items-center gap-2.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-foreground">
            <FolderClosed className="h-4 w-4 text-primary-glow" /> Todas
            <span className="ml-auto text-xs text-muted-foreground">80</span>
          </button>
          {folders.map((f) => (
            <button
              key={f.name}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent/60 hover:text-foreground"
            >
              <FolderClosed className="h-4 w-4" /> {f.name}
              <span className="ml-auto text-xs">{f.count}</span>
            </button>
          ))}
        </aside>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar arquivos…"
                className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 text-xs font-medium text-foreground transition hover:bg-accent">
              <Filter className="h-3.5 w-3.5" /> Filtros
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="card-elevated group cursor-pointer overflow-hidden p-0 transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div
                  className="relative aspect-[4/3] w-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(${img.hue} 60% 30%), hsl(${(img.hue + 40) % 360} 70% 22%))`,
                  }}
                >
                  <ImageIcon
                    className="absolute inset-0 m-auto h-8 w-8 text-white/40 transition group-hover:text-white/70"
                    strokeWidth={1.25}
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <p className="truncate text-xs font-medium text-foreground">{img.name}</p>
                  <span className="ml-2 shrink-0 text-[11px] text-muted-foreground">{img.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
