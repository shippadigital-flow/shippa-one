import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { SidebarSection, type NavItem } from "@/features/layout/sidebar-nav";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-glow" />
      <div className="relative flex min-h-dvh">
        <AdminSidebar pathname={pathname} />
        <AdminMobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopBar onOpenMobile={() => setMobileOpen(true)} />
          <main
            className="flex-1 px-4 pt-4 sm:px-6 lg:px-8"
            style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom))" }}
          >
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
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:flex">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <ShieldAlert className="h-4 w-4 text-primary-foreground" strokeWidth={2.25} aria-hidden />
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
        <SidebarSection items={opsNav} pathname={pathname} label="Operações" rootPath="/admin" />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection items={insightsNav} pathname={pathname} label="Inteligência" rootPath="/admin" />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection items={systemNav} pathname={pathname} label="Sistema" rootPath="/admin" />
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/"
          className="mb-2 flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          Ir para Shippa One
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <AdminUserBlock />
      </div>
    </aside>
  );
}

function AdminUserBlock() {
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-sidebar-accent">
      <div
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground"
      >
        RM
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-sidebar-foreground">Rafael Mota</p>
        <p className="truncate text-xs text-muted-foreground">Superadmin</p>
      </div>
      <button
        type="button"
        aria-label="Sair"
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      >
        <LogOut className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

function AdminTopBar({ onOpenMobile }: { onOpenMobile: () => void }) {
  return (
    <header
      className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl sm:gap-4 sm:px-6 lg:px-8"
      style={{ paddingTop: "env(safe-area-inset-top)", height: "calc(4rem + env(safe-area-inset-top))" }}
    >
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label="Abrir menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition-colors hover:text-foreground md:hidden"
      >
        <Menu className="h-4 w-4" aria-hidden />
      </button>
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="admin-search" className="sr-only">
            Buscar no admin
          </label>
          <input
            id="admin-search"
            type="search"
            placeholder="Buscar clientes, planos, tickets…"
            className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40 sm:pr-16"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1.5 text-xs font-medium text-success md:flex">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
          Sistemas operacionais
        </div>
        <button
          type="button"
          aria-label="Notificações"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="h-4 w-4" aria-hidden />
          <span aria-hidden className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}

function AdminMobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={
        "fixed inset-0 z-40 md:hidden " +
        (open ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={
          "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />
      <aside
        className={
          "absolute inset-y-0 left-0 flex w-[85%] max-w-[320px] flex-col border-r border-sidebar-border bg-sidebar shadow-elegant transition-transform duration-300 ease-out " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <ShieldAlert className="h-4 w-4 text-primary-foreground" strokeWidth={2.25} aria-hidden />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                Shippa Admin
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">Painel interno</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <SidebarSection items={opsNav} pathname={pathname} label="Operações" rootPath="/admin" />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection items={insightsNav} pathname={pathname} label="Inteligência" rootPath="/admin" />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection items={systemNav} pathname={pathname} label="Sistema" rootPath="/admin" />
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/"
            className="mb-2 flex items-center justify-between rounded-lg border border-border/60 bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Ir para Shippa One
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <AdminUserBlock />
        </div>
      </aside>
    </div>
  );
}
