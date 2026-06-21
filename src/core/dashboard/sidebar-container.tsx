"use client";

import React from "react";
import { useUIStore } from "../../shared/hooks/use-ui-store";
import { cn } from "../../shared/lib/utils";

/**
 * Helper client component to toggle container layout margins depending on sidebar Zustand state.
 */
export function SidebarContainer({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div
      className={cn(
        "flex-grow flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        sidebarOpen ? "pl-64" : "pl-20"
      )}
    >
      {children}
    </div>
  );
}
