import { auth } from "./core/auth/auth";

/**
 * Next.js Edge Middleware for routing authorization checks.
 * Integrates directly with NextAuth to gate access to the /dashboard.
 */
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/auth/login"].includes(nextUrl.pathname);

  // Allow Auth API routes to resolve normally
  if (isApiAuthRoute) {
    return;
  }

  // Redirect logic for public routes
  if (isPublicRoute) {
    if (isLoggedIn && nextUrl.pathname === "/auth/login") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  // Gating check for authenticated dashboard routes
  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  const userPermissions = (req.auth?.user as any)?.permissions || [];

  // Protect Core Settings route with specific permissions check
  if (nextUrl.pathname.startsWith("/dashboard/settings")) {
    const hasAccess = userPermissions.includes("core:settings") || userPermissions.includes("*");
    if (!hasAccess) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
