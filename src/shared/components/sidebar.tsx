"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "../hooks/use-ui-store";
import { DynamicIcon } from "../lib/icons";
import { hasPermission } from "../../core/rbac/rbac";
import { moduleRegistry } from "../../core/modules/registry";
import { cn } from "../lib/utils";
import { CORE_PERMISSIONS } from "../../core/permissions/permissions";

/**
 * Responsive Core Platform Sidebar.
 * Displays dynamic menus based on registered business modules and user permission checks.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const userPermissions = (session?.user as any)?.permissions || [];
  const registeredModules = moduleRegistry.getNavigationItems();

  // Standard core navigation links
  const coreNav = [
    {
      label: "Tableau de bord",
      href: "/dashboard",
      icon: "LayoutDashboard",
      permission: CORE_PERMISSIONS.DASHBOARD_VIEW,
    },
    {
      label: "Paramètres",
      href: "/dashboard/settings",
      icon: "Settings",
      permission: CORE_PERMISSIONS.SETTINGS_VIEW,
    },
  ];

  const filteredCoreNav = coreNav.filter((item) =>
    item.permission ? hasPermission(userPermissions, item.permission) : true
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r border-[#E2E8F0] dark:border-slate-800/40 bg-slate-50 dark:bg-slate-950 text-[#334155] transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Platform Branding */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[#E2E8F0] dark:border-slate-900/60 bg-white/50 dark:bg-slate-950/20">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white overflow-hidden">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-sm shrink-0">
            <DynamicIcon name="Layers" className="text-white" size={20} />
          </div>
          {sidebarOpen && (
            <span className="text-[#0F172A] dark:text-slate-100 text-base tracking-tight font-bold">
              SaaS Core
            </span>
          )}
        </Link>
        {sidebarOpen ? (
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 hover:bg-slate-200/50 text-slate-500 hover:text-slate-800 dark:hover:bg-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <DynamicIcon name="ChevronLeft" size={18} />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="mx-auto rounded-md p-1 hover:bg-slate-200/50 text-slate-500 hover:text-slate-800 dark:hover:bg-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <DynamicIcon name="Menu" size={18} />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Core Sections */}
        <div>
          <div className={cn("px-3 mb-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider", !sidebarOpen && "sr-only")}>
            Core Platform
          </div>
          <ul className="space-y-1">
            {filteredCoreNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 relative group",
                      isActive
                        ? "bg-[#0F172A] text-white shadow-sm"
                        : "text-[#334155] hover:bg-slate-200/40 hover:text-[#0F172A] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <DynamicIcon
                      name={item.icon}
                      className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-[#0F172A]")}
                    />
                    {sidebarOpen && <span>{item.label}</span>}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 rounded bg-[#0F172A] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 pointer-events-none shadow-md">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Dynamic Business Modules Section */}
        {registeredModules.length > 0 && (
          <div>
            <div className={cn("px-3 mb-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider", !sidebarOpen && "sr-only")}>
              Modules Métiers
            </div>
            <ul className="space-y-4">
              {registeredModules.map((mod) => {
                const allowedItems = mod.items.filter((item) =>
                  item.permission ? hasPermission(userPermissions, item.permission) : true
                );

                if (allowedItems.length === 0) return null;

                return (
                  <li key={mod.moduleId} className="space-y-1">
                    {sidebarOpen ? (
                      <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                        <DynamicIcon name={mod.iconName} size={14} className="text-slate-500" />
                        <span>{mod.moduleName}</span>
                      </div>
                    ) : (
                      <div className="h-px bg-[#E2E8F0] dark:bg-slate-900/60 my-2" />
                    )}

                    <ul className="space-y-1">
                      {allowedItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 relative group",
                                isActive
                                  ? "bg-slate-200/65 text-[#0F172A] border-l-2 border-[#0F172A] rounded-l-none"
                                  : "text-[#334155] hover:bg-slate-200/40 hover:text-[#0F172A] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                              )}
                            >
                              <DynamicIcon
                                name={isActive ? "ChevronRight" : "Circle"}
                                size={12}
                                className={cn("transition-transform group-hover:scale-125", isActive ? "text-[#0F172A]" : "text-slate-400 group-hover:text-[#0F172A]")}
                              />
                              {sidebarOpen && <span>{item.label}</span>}
                              {!sidebarOpen && (
                                <div className="absolute left-full ml-2 rounded bg-[#0F172A] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 pointer-events-none shadow-md">
                                  {mod.moduleName} - {item.label}
                                </div>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* User Session info */}
      <div className="p-4 border-t border-[#E2E8F0] dark:border-slate-900/60 bg-slate-100/40 dark:bg-slate-950/80 mt-auto">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold shadow-inner shrink-0">
            {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
          </div>
          {sidebarOpen && (
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-semibold text-[#0F172A] dark:text-white truncate">{session?.user?.name || "Utilisateur"}</h4>
              <p className="text-xs text-slate-500 truncate">{session?.user?.email || "user@platform.com"}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
