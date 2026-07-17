import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Images,
  Workflow,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  Bell,
  Command,
  Sparkles,
  Crown,
  Rocket,
  Gauge,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlan, isLocked, type Plan } from "@/hooks/use-plan";
import { useAuth, getStoredUser, type AuthUser } from "@/hooks/use-auth";
import { ShippaMark } from "@/features/branding/shippa-logo";
import {
  SidebarSection,
  SidebarExternalLink,
  type NavItem,
  type ExternalLinkItem,
} from "@/features/layout/sidebar-nav";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getStoredUser()) {
      throw redirect({ to: "/auth" });
    }
  },
  component: AppLayout,
});

const primaryNav: NavItem[] = [
  { label: "Visão Geral", to: "/", icon: LayoutDashboard },
  { label: "Meu Site", to: "/site", icon: Globe },
  { label: "Blog", to: "/blog", icon: FileText },
  { label: "SEO", to: "/seo", icon: Gauge },
  { label: "Biblioteca", to: "/biblioteca", icon: Images },
];

const proNav: NavItem[] = [
  { label: "Central de Crescimento", to: "/crescimento", icon: Rocket },
];

const secondaryNav: NavItem[] = [
  { label: "Planos", to: "/planos", icon: Crown },
  { label: "Configurações", to: "/configuracoes", icon: Settings },
  { label: "Suporte", to: "/suporte", icon: LifeBuoy },
];

const ecosystemLink: ExternalLinkItem = {
  label: "Shippa Flow",
  href: "https://ia.shippadigital.com.br/",
  icon: Workflow,
};

const SIDEBAR_KEY = "shippa-sidebar-collapsed";

function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_KEY);
    if (stored === "1") setCollapsed(true);
  }, []);
  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
      return next;
    });
  };
  return { collapsed, toggle };
}

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { plan, setPlan } = usePlan();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { collapsed, toggle } = useSidebarCollapsed();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/auth", replace: true });
  };

  const sidebarWidth = collapsed ? "72px" : "260px";

  return (
    <div
      className="relative min-h-dvh bg-background text-foreground"
      style={{ ["--sidebar-w" as string]: sidebarWidth }}
    >
      <Sidebar
        pathname={pathname}
        plan={plan}
        user={user}
        onSignOut={handleSignOut}
        collapsed={collapsed}
        onToggle={toggle}
      />
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        plan={plan}
        user={user}
        onSignOut={handleSignOut}
      />
      <div className="relative flex min-h-dvh flex-col transition-[padding] duration-300 ease-out md:pl-[var(--sidebar-w)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-glow" />
        <TopBar plan={plan} setPlan={setPlan} onOpenMobile={() => setMobileOpen(true)} />
        <main
          className="relative flex-1 px-4 pt-4 sm:px-6 lg:px-8"
          style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto w-full max-w-[1240px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  pathname,
  plan,
  user,
  onSignOut,
  collapsed,
  onToggle,
}: {
  pathname: string;
  plan: Plan;
  user: AuthUser | null;
  onSignOut: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-[var(--sidebar-w)] flex-col overflow-hidden border-r border-sidebar-border bg-sidebar/85 backdrop-blur-xl transition-[width] duration-300 ease-out md:flex"
    >
      <div
        className={
          "flex shrink-0 items-center gap-2 " +
          (collapsed ? "flex-col justify-center gap-3 px-2 py-3" : "h-16 justify-between px-3")
        }
      >
        {!collapsed ? (
          <div className="flex min-w-0 items-center gap-2.5 pl-2">
            <ShippaMark className="h-8 w-8" />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">Shippa</span>
              <span className="truncate text-[11px] font-medium text-muted-foreground">
                One {plan === "pro" ? "Pro" : "Start"}
              </span>
            </div>
          </div>
        ) : (
          <ShippaMark className="h-8 w-8" />
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarSection
          items={primaryNav}
          pathname={pathname}
          label="Geral"
          collapsed={collapsed}
          isLocked={(p) => isLocked(p, plan)}
        />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection
          items={proNav}
          pathname={pathname}
          label="Crescimento"
          collapsed={collapsed}
          isLocked={(p) => isLocked(p, plan)}
        />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection
          label="Ecossistema Shippa"
          collapsed={collapsed}
          items={[]}
          pathname={pathname}
          extra={<SidebarExternalLink item={ecosystemLink} collapsed={collapsed} />}
        />
        <div className="my-4 h-px bg-sidebar-border" />
        <SidebarSection
          items={secondaryNav}
          pathname={pathname}
          label="Conta"
          collapsed={collapsed}
          isLocked={(p) => isLocked(p, plan)}
        />
      </nav>

      {plan === "start" && !collapsed && (
        <div className="mx-3 mb-3">
          <Link
            to="/planos"
            className="group relative block overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-4 transition hover:border-primary/50"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                <Sparkles className="h-3 w-3" /> One Pro
              </span>
              <p className="mt-2 text-[13px] font-medium leading-snug text-sidebar-foreground">
                Evolua sua presença digital com Leads, Analytics e SEO.
              </p>
              <p className="mt-2 text-[11px] font-medium text-primary-glow">
                Ver planos →
              </p>
            </div>
          </Link>
        </div>
      )}

      <div className="border-t border-sidebar-border p-3">
        <div className={"flex items-center gap-3 rounded-xl py-2 transition hover:bg-sidebar-accent " + (collapsed ? "px-0 justify-center" : "px-2")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
            {user?.initials ?? "SO"}
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {user?.name ?? "Convidado"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Plano {plan === "pro" ? "Pro" : "Start"}
                </p>
              </div>
              <button
                onClick={onSignOut}
                aria-label="Sair"
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  plan,
  setPlan,
  onOpenMobile,
}: {
  plan: Plan;
  setPlan: (p: Plan) => void;
  onOpenMobile: () => void;
}) {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8"
      style={{ paddingTop: "env(safe-area-inset-top)", height: "calc(4rem + env(safe-area-inset-top))" }}
    >
      <button
        onClick={onOpenMobile}
        aria-label="Abrir menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition hover:text-foreground md:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="app-search" className="sr-only">
            Buscar no portal
          </label>
          <input
            id="app-search"
            type="search"
            placeholder="Buscar…"
            className="h-9 w-full rounded-lg border border-border/70 bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40 sm:pr-16"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Demo plan toggle */}
        <div
          role="group"
          aria-label="Alternar plano de demonstração"
          className="hidden items-center rounded-lg border border-border/60 bg-surface p-0.5 sm:inline-flex"
        >
          <button
            type="button"
            onClick={() => setPlan("start")}
            aria-pressed={plan === "start"}
            className={
              "rounded-md px-2.5 py-1 text-[11px] font-medium transition " +
              (plan === "start"
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            Start
          </button>
          <button
            type="button"
            onClick={() => setPlan("pro")}
            aria-pressed={plan === "pro"}
            className={
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition " +
              (plan === "pro"
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            <Sparkles className="h-3 w-3" aria-hidden /> Pro
          </button>
        </div>
        <button
          type="button"
          aria-label="Notificações"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface text-muted-foreground transition hover:text-foreground"
        >
          <Bell className="h-4 w-4" aria-hidden />
          <span
            aria-hidden
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary"
          />
        </button>
      </div>
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
  pathname,
  plan,
  user,
  onSignOut,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  plan: Plan;
  user: AuthUser | null;
  onSignOut: () => void;
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
            <ShippaMark className="h-8 w-8" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">Shippa</span>
              <span className="text-[11px] font-medium text-muted-foreground">
                One {plan === "pro" ? "Pro" : "Start"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <SidebarSection
            items={primaryNav}
            pathname={pathname}
            label="Geral"
            isLocked={(p) => isLocked(p, plan)}
          />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection
            items={proNav}
            pathname={pathname}
            label="Crescimento"
            isLocked={(p) => isLocked(p, plan)}
          />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection
            label="Ecossistema Shippa"
            items={[]}
            pathname={pathname}
            extra={<SidebarExternalLink item={ecosystemLink} />}
          />
          <div className="my-4 h-px bg-sidebar-border" />
          <SidebarSection
            items={secondaryNav}
            pathname={pathname}
            label="Conta"
            isLocked={(p) => isLocked(p, plan)}
          />
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
              {user?.initials ?? "SO"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name ?? "Convidado"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Plano {plan === "pro" ? "Pro" : "Start"}
              </p>
            </div>
            <button
              onClick={onSignOut}
              aria-label="Sair"
              className="rounded-md p-1.5 text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
