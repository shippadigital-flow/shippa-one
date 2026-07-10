import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useAuth, getStoredUser } from "@/hooks/use-auth";
import { ShippaMark } from "@/features/branding/shippa-logo";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && getStoredUser()) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthPage,
});

type Mode = "signin" | "signup";

const signInSchema = z.object({
  email: z.string().trim().email({ message: "Digite um e-mail válido" }).max(255),
  password: z.string().min(6, { message: "Sua senha deve ter ao menos 6 caracteres" }).max(120),
});

const signUpSchema = signInSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, { message: "Como podemos te chamar?" })
    .max(80, { message: "Nome muito longo" }),
});

function AuthPage() {
  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[1.05fr_1fr]">
      <BrandingPanel />
      <AuthPanel />
    </div>
  );
}

/* ------------------------------ BRANDING ------------------------------ */

function BrandingPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-90" />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={gridPattern} />

      <header className="relative flex items-center gap-2.5">
        <ShippaMark className="h-9 w-9" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            Shippa
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            One
          </span>
        </div>
      </header>

      <div className="relative max-w-lg animate-fade-in">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-glow">
          <Sparkles className="h-3 w-3" /> Plataforma de crescimento
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-sidebar-foreground xl:text-5xl">
          Seu negócio digital,
          <br />
          <span className="text-gradient">com clareza e escala.</span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Site, blog, leads, analytics e automações — reunidos em um produto
          calmo, elegante e feito para quem constrói todo dia.
        </p>

        <ul className="mt-8 space-y-3">
          {[
            "Site profissional publicado em minutos",
            "Insights semanais gerados por IA",
            "Leads e conversas em uma inbox única",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-sidebar-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary-glow" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <figure className="relative max-w-lg rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-6 backdrop-blur-md">
        <p className="text-[15px] leading-relaxed text-sidebar-foreground">
          "Depois do Shippa One paramos de perder oportunidades. Cada visitante
          do site vira uma conversa organizada e nossa produtividade dobrou."
        </p>
        <figcaption className="mt-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
            MR
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">
              Mariana Ribeiro
            </p>
            <p className="text-xs text-muted-foreground">
              Fundadora · Ribeiro & Costa Advocacia
            </p>
          </div>
        </figcaption>
      </figure>
    </aside>
  );
}

/* ------------------------------ AUTH CARD ------------------------------ */

function AuthPanel() {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-10 lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-40 lg:hidden" />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <ShippaMark className="h-9 w-9" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Shippa One
          </span>
        </div>

        <ModeTabs mode={mode} setMode={setMode} />

        <header className="mt-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {mode === "signin" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Entre na sua conta Shippa One para continuar de onde parou."
              : "Comece grátis com o Shippa One Start em menos de 1 minuto."}
          </p>
        </header>

        <div className="mt-8">
          <AuthForm mode={mode} />
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Ambiente seguro, criptografado ponta a ponta.
        </p>
      </div>
    </section>
  );
}

function ModeTabs({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border/60 bg-surface p-0.5" role="tablist">
      {(["signin", "signup"] as const).map((m) => (
        <button
          key={m}
          role="tab"
          aria-selected={mode === m}
          onClick={() => setMode(m)}
          className={
            "rounded-md px-4 py-1.5 text-xs font-medium transition " +
            (mode === m
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          {m === "signin" ? "Entrar" : "Criar conta"}
        </button>
      ))}
    </div>
  );
}

function AuthForm({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      ...(mode === "signup" ? { name: String(formData.get("name") ?? "") } : {}),
    };

    const schema = mode === "signup" ? signUpSchema : signInSchema;
    const result = schema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Simulated latency for a premium feel — swap for real auth later.
    await new Promise((r) => setTimeout(r, 650));
    const name = "name" in result.data ? (result.data.name as string) : undefined;
    signIn(result.data.email, name);
    navigate({ to: "/" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <SocialButton />

      <Divider>ou continue com e-mail</Divider>

      {mode === "signup" && (
        <Field
          id="name"
          name="name"
          label="Como podemos te chamar?"
          placeholder="Seu nome"
          autoComplete="name"
          error={errors.name}
        />
      )}

      <Field
        id="email"
        name="email"
        type="email"
        label="E-mail"
        placeholder="voce@empresa.com.br"
        icon={Mail}
        autoComplete="email"
        error={errors.email}
      />

      <Field
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Senha"
        placeholder="••••••••"
        icon={Lock}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
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
          mode === "signin" ? (
            <Link
              to="/auth"
              className="text-xs font-medium text-primary-glow transition hover:text-foreground"
            >
              Esqueci minha senha
            </Link>
          ) : null
        }
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Entrando…
          </>
        ) : (
          <>
            {mode === "signin" ? "Entrar" : "Criar minha conta"}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Ao continuar você concorda com os{" "}
        <a href="#" className="text-foreground/80 underline-offset-2 hover:underline">
          Termos
        </a>{" "}
        e a{" "}
        <a href="#" className="text-foreground/80 underline-offset-2 hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
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
  icon: Icon,
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
  icon?: React.ComponentType<{ className?: string }>;
  trailing?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
        {hint}
      </div>
      <div
        className={
          "relative flex items-center rounded-lg border bg-surface transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/40 " +
          (error ? "border-destructive/60" : "border-border/70")
        }
      >
        {Icon && (
          <Icon className="pointer-events-none ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 w-full bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
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
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
      className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-border/70 bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
    >
      <GoogleIcon />
      Continuar com Google
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.44-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.15.8 3.87 1.5l2.64-2.55C16.9 3.6 14.7 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-9 0-.6-.06-1.1-.15-1.6H12z"/>
    </svg>
  );
}

const gridPattern: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
  backgroundSize: "48px 48px",
  color: "white",
};
