import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  Boxes,
  ToggleRight,
  LineChart,
  LifeBuoy,
  ScrollText,
  Activity,
  Settings,
  ShieldAlert,
  Search,
  Bell,
  Command,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

type NavItem = {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const opsNav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Clientes", to: "/admin/clientes", icon: Users },
  { label: "Assinaturas", to: "/admin/assinaturas", icon: CreditCard },
  { label: "Planos", to: "/admin/planos", icon: Package },
  { label: "Módulos", to: "/admin/modulos", icon: Boxes },
  { label: "Feature Flags", to: "/admin/flags", icon: ToggleRight },
];

const insightsNav: NavItem[] = [
  { label: "Uso & Analytics", to: "/admin/uso", icon: LineChart },
  { label: "Suporte", to: "/admin/suporte", icon: LifeBuoy },
  { label: "Logs do Sistema", to: "/admin/logs", icon: ScrollText },
  { label: "Monitoramento", to: "/admin/monitoramento", icon: Activity },
];

const systemNav: NavItem[] = [
  { label: "Configurações", to: "/admin/configuracoes", icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-glow" />
      <div className="relative flex min-h-screen">
        <AdminSidebar pathname={pathname} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopBar />
          <main className="flex-1 px-8 pb-16 pt-4">
            <div className="mx-auto w-full max-w-[1320px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:flex">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <ShieldAlert className="h-4 w-4 text-primary-foreground" strokeWidth={2.25} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              Shippa Admin
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Painel interno
            </span>
          </div>
        </div>
        <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-primary-glow">
          Interno
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarSection items={opsNav} pathname={pathname} label="Operações" />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection items={insightsNav} pathname={pathname} label="Inteligência" />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection items={systemNav} pathname={pathname} label="Sistema" />
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/"
          className="mb-2 flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          Ir para Shippa One
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-sidebar-accent">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
            RM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Rafael Mota
            </p>
            <p className="truncate text-xs text-muted-foreground">Superadmin</p>
          </div>
          <button
            aria-label="Sair"
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarSection({
  items,
  pathname,
  label,
}: {
  items: NavItem[];
  pathname: string;
  label: string;
}) {
  return (
    <div>
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
        {label}
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active =
            item.to === "/admin"
              ? pathname === "/admin"
              : pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition " +
                  (active
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")
                }
              >
                {active && (
                  <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-primary" />
                )}
                <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AdminTopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/60 bg-background/70 px-8 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar clientes, planos, tickets…"
            className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-16 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1.5 text-xs font-medium text-success md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Sistemas operacionais
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}
