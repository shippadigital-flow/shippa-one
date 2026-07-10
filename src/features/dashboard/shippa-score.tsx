import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export type ScoreFactor = {
  label: string;
  done: boolean;
  weight: number; // points contributed when done
  to: string;
  hint: string;
};

export function ShippaScore({ factors }: { factors: ScoreFactor[] }) {
  const total = factors.reduce((s, f) => s + f.weight, 0);
  const earned = factors.filter((f) => f.done).reduce((s, f) => s + f.weight, 0);
  const score = Math.round((earned / total) * 100);
  const stars = Math.max(1, Math.min(5, Math.round(score / 20)));

  const next = factors.find((f) => !f.done);

  return (
    <section>
      <div className="mb-5">
        <p className="eyebrow">
          Índice Shippa
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Sua maturidade digital hoje
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] bg-gradient-to-br from-primary/15 via-surface to-surface p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          {/* Score visual */}
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <ScoreRing value={score} />
            </div>
            <div className="flex items-center gap-1 text-primary-glow">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    "h-4 w-4 " +
                    (i < stars ? "fill-current" : "text-muted-foreground/40")
                  }
                />
              ))}
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                {stars === 5
                  ? "Elite digital"
                  : stars >= 4
                  ? "Muito bem posicionado"
                  : stars === 3
                  ? "No caminho certo"
                  : "Começando a construir"}
              </span>
            </div>
          </div>

          {/* Factors */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              O que compõe seu índice
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {factors.map((f) => (
                <li key={f.label}>
                  <Link
                    to={f.to}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-accent/40"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border " +
                          (f.done
                            ? "border-success bg-success/20"
                            : "border-border/60 bg-transparent")
                        }
                      >
                        {f.done && (
                          <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        )}
                      </span>
                      <span
                        className={
                          f.done
                            ? "text-foreground/80"
                            : "text-foreground group-hover:text-primary-glow"
                        }
                      >
                        {f.label}
                      </span>
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      +{f.weight}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {next && (
              <Link
                to={next.to}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary-glow transition hover:bg-primary/20"
              >
                Próximo ganho: {next.label} (+{next.weight} pts){" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreRing({ value }: { value: number }) {
  const size = 176;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="shippaScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.62 0.22 258)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 258)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#shippaScoreGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
          style={{ transition: "stroke-dashoffset 900ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[44px] font-semibold leading-none tracking-tight text-foreground">
          {value}
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          de 100
        </span>
      </div>
    </div>
  );
}