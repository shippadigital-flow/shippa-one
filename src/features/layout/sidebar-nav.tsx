import { Link } from "@tanstack/react-router";
import { ExternalLink, Sparkles } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type NavItem = {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type ExternalLinkItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function isItemActive(itemTo: string, pathname: string, rootPath: string) {
  if (itemTo === rootPath) return pathname === rootPath;
  return pathname === itemTo || pathname.startsWith(itemTo + "/");
}

export function SidebarSection({
  items,
  pathname,
  label,
  collapsed = false,
  rootPath = "/",
  isLocked,
  extra,
}: {
  items: NavItem[];
  pathname: string;
  label: string;
  collapsed?: boolean;
  rootPath?: string;
  isLocked?: (path: string) => boolean;
  extra?: ReactNode;
}) {
  return (
    <div>
      {!collapsed && (
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          {label}
        </p>
      )}
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = isItemActive(item.to, pathname, rootPath);
          const locked = isLocked?.(item.to) ?? false;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                title={collapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                className={
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")
                }
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-primary"
                  />
                )}
                <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {locked && (
                      <Sparkles
                        aria-hidden
                        className="h-3.5 w-3.5 text-primary-glow/70 transition-colors group-hover:text-primary-glow"
                        strokeWidth={2}
                      />
                    )}
                  </>
                )}
              </Link>
            </li>
          );
        })}
        {extra}
      </ul>
    </div>
  );
}

export function SidebarExternalLink({
  item,
  collapsed = false,
}: {
  item: ExternalLinkItem;
  collapsed?: boolean;
}) {
  const Icon = item.icon;
  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={collapsed ? item.label : undefined}
        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </>
        )}
      </a>
    </li>
  );
}