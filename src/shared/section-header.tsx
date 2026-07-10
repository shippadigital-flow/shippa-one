import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  as = "h2",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  as?: "h1" | "h2";
  size?: "sm" | "md" | "lg";
}) {
  const Heading = as;
  const titleClass =
    size === "lg"
      ? "text-3xl sm:text-4xl"
      : size === "sm"
      ? "text-lg"
      : "text-xl sm:text-2xl";

  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading
          className={
            "mt-1.5 font-semibold tracking-tight text-foreground " + titleClass
          }
        >
          {title}
        </Heading>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
