import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, LifeBuoy, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { PageHeader } from "@/shared/page-header";

export const Route = createFileRoute("/_app/suporte")({
  component: SuportePage,
});

const conversations = [
  { title: "Como alterar a cor principal do site?", status: "Resolvido", time: "há 2 dias" },
  { title: "Dúvida sobre publicação de artigos", status: "Aberto", time: "ontem" },
  { title: "Integração com Google Analytics", status: "Aguardando você", time: "há 3h" },
];

const articles = [
  "Primeiros passos com o Shippa One",
  "Como publicar um novo artigo no blog",
  "Configurando WhatsApp e formulários",
  "Otimizando SEO das suas páginas",
];

function SuportePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Suporte"
        title="Como podemos ajudar?"
        description="Estamos aqui para tirar dúvidas, resolver problemas e ouvir sugestões."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">
            <Plus className="h-4 w-4" /> Abrir chamado
          </button>
        }
      />

      <div className="card-elevated relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-60" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground">
            Encontre respostas em segundos
          </h2>
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar na central de ajuda…"
              className="h-12 w-full rounded-xl border border-border/70 bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card-elevated p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <MessageCircle className="h-4 w-4 text-muted-foreground" /> Conversas recentes
            </h3>
          </div>
          <ul className="divide-y divide-border/60">
            {conversations.map((c) => (
              <li key={c.title} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.time}</p>
                </div>
                <span
                  className={
                    "rounded-full px-2.5 py-1 text-[11px] font-medium " +
                    (c.status === "Resolvido"
                      ? "bg-success/15 text-success"
                      : c.status === "Aberto"
                        ? "bg-primary/15 text-primary-glow"
                        : "bg-warning/15 text-warning")
                  }
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-elevated p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <BookOpen className="h-4 w-4 text-muted-foreground" /> Base de conhecimento
          </h3>
          <ul className="space-y-1">
            {articles.map((a) => (
              <li key={a}>
                <button className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-accent/60">
                  <span>{a}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
