import React from "react";
import { auth } from "../auth/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "../../shared/components/sidebar";
import { Topbar } from "../../shared/components/topbar";
import { Providers } from "../providers";
import { SidebarContainer } from "./sidebar-container";

/**
 * Server Component containing layout wrappers, providers, sidebar, and navbar containers.
 */
export async function DashboardLayoutShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <Providers session={session}>
      <div className="min-h-screen bg-slate-50/40 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Content container offset dynamically by sidebar Zustand toggle */}
        <SidebarContainer>
          {/* Top Navbar */}
          <Topbar />
          
          {/* Dashboard route main page contents */}
          <div className="flex-1 p-6 md:p-8">
            {children}
          </div>
        </SidebarContainer>
      </div>
    </Providers>
  );
}
