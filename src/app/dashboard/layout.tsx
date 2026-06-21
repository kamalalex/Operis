import React from "react";
import { DashboardLayoutShell } from "../../core/dashboard/layout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutShell>{children}</DashboardLayoutShell>;
}
