"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

/**
 * Global application providers.
 * Mounts NextAuth SessionProvider context.
 */
export function Providers({ children, session }: { children: React.ReactNode; session?: any }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
