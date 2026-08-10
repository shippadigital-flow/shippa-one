import { Globe, FileText, Search, BarChart3, Server, Sparkles } from "lucide-react";

const NODES = [
  { label: "SITE", icon: Globe, angle: -90 },
  { label: "BLOG", icon: FileText, angle: -30 },
  { label: "SEO", icon: Search, angle: 30 },
  { label: "ANALYTICS", icon: BarChart3, angle: 90 },
  { label: "DOMÍNIO", icon: Server, angle: 150 },
  { label: "IA", icon: Sparkles, angle: 210 },
];

const CARDS = [
  { label: "Visitantes hoje", value: "1.248", top: "8%", left: "4%", delay: 700, fx: "8px", fy: "-12px" },
  { label: "Shippa Index", value: "SEO 92", top: "22%", right: "2%", delay: 850, fx: "-10px", fy: "10px" },
  { label: "Novos contatos", value: "18", bottom: "26%", left: "0%", delay: 1000, fx: "6px", fy: "12px" },
  { label: "Search Console", value: "Google", top: "48%", right: "6%", delay: 1150, fx: "-8px", fy: "-8px" },
  { label: "Conteúdo", value: "3 novos artigos", bottom: "8%", right: "12%", delay: 1300, fx: "10px", fy: "-6px" },
];

const STATUS = [
  { label: "Site online", top: "62%", left: "2%", delay: 1200 },
  { label: "Domínio ativo", top: "4%", left: "46%", delay: 900 },
];

/** Abstract, animated representation of the Shippa One ecosystem. Pure CSS + SVG. */
export function EcosystemStage() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* layer 1–2: background + subtle grid */}
      <div className="auth-veil pointer-events-none absolute inset-0 bg-gradient-glow" />
      <div
        className="auth-veil pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "var(--color-foreground)",
          maskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent)",
        }}
      />
      <div className="auth-veil pointer-events-none absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-primary/20 blur-[130px]" />
      <div className="auth-veil pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[130px]" />

      {/* layers 3–6: core + orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="auth-enter relative aspect-square w-[min(78%,520px)]" style={{ animationDelay: "300ms" }}>
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="shippa-core" cx="50%" cy="50%">
                <stop offset="0%" stopColor="var(--color-primary-glow)" stopOpacity="0.95" />
                <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[190, 150, 108].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="var(--color-foreground)"
                strokeOpacity={0.08 - i * 0.015}
              />
            ))}
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="var(--color-primary-glow)"
              strokeOpacity="0.45"
              className="auth-dash"
            />
            {NODES.map((n) => {
              const rad = (n.angle * Math.PI) / 180;
              return (
                <line
                  key={n.label}
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(rad) * 150}
                  y2={200 + Math.sin(rad) * 150}
                  stroke="var(--color-foreground)"
                  strokeOpacity="0.08"
                />
              );
            })}
            <circle cx="200" cy="200" r="96" fill="url(#shippa-core)" className="auth-breathe" />
            <circle cx="200" cy="200" r="26" fill="var(--color-primary)" fillOpacity="0.25" />
            <circle cx="200" cy="200" r="9" fill="var(--color-primary-glow)" className="auth-breathe" />
          </svg>

          {/* orbiting module nodes */}
          <div className="auth-orbit absolute inset-0">
            {NODES.map((n, i) => {
              const rad = (n.angle * Math.PI) / 180;
              return (
                <div
                  key={n.label}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos(rad) * 37.5}%`,
                    top: `${50 + Math.sin(rad) * 37.5}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="auth-counter-orbit">
                    <div
                      className="auth-enter flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-2.5 py-1.5 backdrop-blur-md"
                      style={{ animationDelay: `${500 + i * 110}ms` }}
                    >
                      <n.icon className="h-3.5 w-3.5 text-primary-glow" />
                      <span className="text-[10px] font-semibold tracking-[0.12em] text-foreground/80">
                        {n.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* layer 4: floating metric fragments */}
      {CARDS.map((c) => (
        <div
          key={c.label}
          className="auth-enter absolute hidden xl:block"
          style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animationDelay: `${c.delay}ms` }}
        >
          <div
            className="auth-float rounded-xl border border-border bg-surface/55 px-3.5 py-2.5 shadow-elegant backdrop-blur-md"
            style={{ ["--auth-fx" as string]: c.fx, ["--auth-fy" as string]: c.fy, animationDelay: `${c.delay}ms` }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {c.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">{c.value}</p>
          </div>
        </div>
      ))}

      {STATUS.map((s) => (
        <div
          key={s.label}
          className="auth-enter absolute hidden xl:block"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}ms` }}
        >
          <div className="auth-float inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-success shippa-anim-pulse" />
            <span className="text-[11px] font-medium text-foreground/75">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
