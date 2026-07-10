export function LoadingSkeleton({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={"space-y-2 " + className} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded-md bg-muted/60"
          style={{ width: `${90 - i * 12}%` }}
        />
      ))}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="surface-card p-6" role="status" aria-live="polite">
      <div className="mb-4 h-9 w-9 animate-pulse rounded-xl bg-muted/60" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted/60" />
      <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-muted/50" />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}
