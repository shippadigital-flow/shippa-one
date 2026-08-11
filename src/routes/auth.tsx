import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth, getStoredUser } from "@/hooks/use-auth";
import { ShippaMark } from "@/features/branding/shippa-logo";
import { EcosystemStage } from "@/features/auth/ecosystem-stage";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar no Shippa One — Sua presença digital, sob controle" },
      {
        name: "description",
        content:
          "Acesse o Shippa One para acompanhar site, conteúdo, SEO e métricas da presença digital do seu negócio em um só lugar.",
      },
      { property: "og:title", content: "Entrar no Shippa One" },
      {
        property: "og:description",
        content: "Site, conteúdo, SEO e métricas da sua presença digital em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && getStoredUser()) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().trim().email({ message: "Digite um e-mail válido" }).max(255),
  password: z.string().min(6, { message: "Sua senha deve ter ao menos 6 caracteres" }).max(120),
});

function AuthPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground lg:grid lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.6fr_1fr]">
      <ExperiencePanel />
      <LoginPanel />
    </div>
  );
}

/* ------------------------------- LEFT SIDE ------------------------------- */

function ExperiencePanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-sidebar lg:flex lg:flex-col">
      {/* background: discreet grid + ambience, never competing with the content zone */}
      <div
        className="auth-veil pointer-events-none absolute inset-0 opacity-[0.045]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          color: "var(--color-foreground)",
          maskImage: "radial-gradient(60% 45% at 50% 30%, black, transparent)",
        }}
      />

      {/* ZONE 1 — top: logo */}
      <header className="auth-enter relative z-10 flex items-center gap-2.5 px-11 pt-11">
        <ShippaMark className="h-9 w-9" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">Shippa</span>
          <span className="text-[11px] font-medium text-muted-foreground">One</span>
        </div>
      </header>

      {/* ZONE 2 — graphic stage, ends before the content zone */}
      <div className="relative min-h-0 flex-1">
        <EcosystemStage />
      </div>

      {/* ZONE 3 — protected editorial content zone */}
      <div className="relative z-10 w-[min(78%,760px)] pb-12 pl-11 pr-[60px]">
        <h1
          className="auth-enter font-bold text-sidebar-foreground"
          style={{
            animationDelay: "900ms",
            fontSize: "clamp(38px, 3.4vw, 60px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
          }}
        >
          Tudo o que acontece
          <br />
          com seu site.
          <br />
          <span className="text-primary-glow">Em um só lugar.</span>
        </h1>
        <p
          className="auth-enter mt-6 max-w-[510px] text-muted-foreground"
          style={{ animationDelay: "1050ms", fontSize: "16px", lineHeight: 1.6 }}
        >
          O Shippa One reúne site, conteúdo, SEO, métricas e presença digital em uma
          experiência simples, inteligente e feita para você entender o que realmente importa.
        </p>
        <p
          className="auth-enter mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-glow"
          style={{ animationDelay: "1200ms" }}
        >
          <span className="h-px w-10 bg-primary/50" aria-hidden="true" />
          Sua presença digital, sob controle.
        </p>
      </div>
    </aside>
  );
}

/* ------------------------------- RIGHT SIDE ------------------------------ */

function LoginPanel() {
  const [view, setView] = useState<"signin" | "forgot">("signin");

  return (
    <section className="auth-light relative flex min-h-dvh items-center justify-center px-6 py-12 sm:px-10 lg:min-h-0">
      <MobileBackdrop />

      <div className="relative w-full max-w-[400px]">
        <div className="auth-enter mb-10 flex items-center gap-2.5">
          <ShippaMark className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-tight text-foreground">Shippa One</span>
        </div>

        {view === "signin" ? (
          <SignInView onForgot={() => setView("forgot")} />
        ) : (
          <ForgotView onBack={() => setView("signin")} />
        )}

        <p className="auth-enter mt-10 flex items-center justify-center gap-1.5 text-xs text-muted-foreground" style={{ animationDelay: "700ms" }}>
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Acesso seguro e protegido.
        </p>
      </div>
    </section>
  );
}

/** Compact abstract backdrop for mobile, where the full stage is hidden. */
function MobileBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden lg:hidden" aria-hidden="true">
      <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <svg viewBox="0 0 400 200" className="h-full w-full opacity-40">
        {[70, 110, 150].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="40"
            r={r}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.22 - i * 0.05}
          />
        ))}
        <circle cx="200" cy="40" r="6" fill="var(--color-primary)" className="auth-breathe" />
        <circle cx="200" cy="40" r="110" fill="none" stroke="var(--color-primary)" strokeOpacity="0.5" className="auth-dash" />
      </svg>
    </div>
  );
}

function SignInView({ onForgot }: { onForgot: () => void }) {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const result = signInSchema.safeParse({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 650));
    setStatus("success");
    signIn(result.data.email);
    await new Promise((r) => setTimeout(r, 350));
    navigate({ to: "/" });
  };

  return (
    <>
      <header className="auth-enter" style={{ animationDelay: "120ms" }}>
        <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
          Bem-vinda ao Shippa One
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Entre para acompanhar e gerenciar a presença digital do seu negócio.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="auth-enter mt-8 flex flex-col gap-4"
        style={{ animationDelay: "260ms" }}
        noValidate
      >
        <SocialButton />
        <Divider>ou</Divider>

        <Field
          id="email"
          name="email"
          type="email"
          label="E-mail"
          placeholder="seu@email.com"
          autoComplete="email"
          error={errors.email}
        />

        <Field
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="Senha"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="rounded-md p-1 text-muted-foreground transition hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          hint={
            <button
              type="button"
              onClick={onForgot}
              className="rounded-sm text-xs font-medium text-primary-glow transition hover:text-foreground"
            >
              Esqueci minha senha
            </button>
          }
        />

        <div aria-live="polite">
          {status === "error" && (
            <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2.5 text-xs font-medium text-destructive">
              <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Não foi possível entrar. Verifique seu e-mail e senha.
            </p>
          )}
          {status === "success" && (
            <p className="flex items-center gap-2 text-xs font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Tudo certo. Abrindo seu painel…
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-elegant transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-glow active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Entrando…
            </>
          ) : (
            <>
              Entrar no Shippa One
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="auth-enter mt-7 text-center text-xs text-muted-foreground" style={{ animationDelay: "420ms" }}>
        Ainda não tem acesso?{" "}
        <a
          href="mailto:contato@shippa.com.br"
          className="font-medium text-foreground underline-offset-4 transition hover:underline"
        >
          Fale com a Shippa
        </a>
      </p>
    </>
  );
}

function ForgotView({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      setError("Digite um e-mail válido");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  };

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Voltar para o login
      </button>

      <header>
        <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
          Recuperar acesso
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Informe seu e-mail e enviaremos um link para você criar uma nova senha.
        </p>
      </header>

      {status === "sent" ? (
        <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
          Se houver uma conta com esse e-mail, o link de recuperação chegará em instantes.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
          <Field
            id="recovery-email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            autoComplete="email"
            error={error ?? undefined}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-elegant transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-glow active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…
              </>
            ) : (
              "Enviar link de recuperação"
            )}
          </button>
        </form>
      )}
    </>
  );
}

/* ------------------------------ PRIMITIVES ------------------------------ */

function Field({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  trailing,
  hint,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  trailing?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs font-medium text-foreground/80">
          {label}
        </label>
        {hint}
      </div>
      <div
        className={
          "relative flex items-center rounded-xl border bg-surface transition focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 " +
          (error ? "border-destructive/60" : "border-border")
        }
      >
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 w-full rounded-xl bg-transparent px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {trailing && <div className="pr-2">{trailing}</div>}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {children}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function SocialButton() {
  return (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent"
    >
      <GoogleIcon />
      Continuar com Google
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.44-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.15.8 3.87 1.5l2.64-2.55C16.9 3.6 14.7 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-9 0-.6-.06-1.1-.15-1.6H12z"
      />
    </svg>
  );
}
