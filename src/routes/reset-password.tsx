import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ShippaMark } from "@/features/branding/shippa-logo";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Criar nova senha — Shippa One" },
      {
        name: "description",
        content: "Defina uma nova senha para voltar a acessar o seu portal Shippa One.",
      },
      { property: "og:title", content: "Criar nova senha — Shippa One" },
      {
        property: "og:description",
        content: "Defina uma nova senha para acessar o portal Shippa One.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

const schema = z
  .object({
    password: z.string().min(8, { message: "Use ao menos 8 caracteres" }).max(120),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "As senhas não conferem",
    path: ["confirm"],
  });

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      password: String(form.get("password") ?? ""),
      confirm: String(form.get("confirm") ?? ""),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os campos");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    const { error: updateError } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });
    if (updateError) {
      setError("Não foi possível atualizar a senha. Solicite um novo link de recuperação.");
      setStatus("error");
      return;
    }
    setStatus("done");
    setTimeout(() => navigate({ to: "/", replace: true }), 1200);
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-[400px]">
        <div className="mb-9 flex items-center gap-2.5">
          <ShippaMark className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-tight">Shippa One</span>
        </div>

        <h1 className="text-[26px] font-semibold tracking-tight">Criar nova senha</h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Escolha uma nova senha para voltar a acessar o seu portal.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Nova senha
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              className="h-11 rounded-xl border border-border bg-surface px-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Confirmar senha
            <input
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              className="h-11 rounded-xl border border-border bg-surface px-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>

          <div aria-live="polite">
            {status === "error" && error && (
              <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">
                <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden /> {error}
              </p>
            )}
            {status === "done" && (
              <p className="flex items-center gap-2 text-xs font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Senha atualizada. Abrindo seu
                painel…
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "done"}
            className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-elegant transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Salvando…
              </>
            ) : (
              "Salvar nova senha"
            )}
          </button>
        </form>

        <p className="mt-9 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Acesso seguro e protegido.
        </p>
      </div>
    </main>
  );
}
