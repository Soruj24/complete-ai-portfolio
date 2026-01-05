import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PUBLIC_ROUTES, LOGIN, ROOT, ADMIN_ROUTES } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

// Exporting the auth function as middleware for Next.js
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const status = (req.auth?.user as unknown as { status: string })?.status;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.some(route => nextUrl.pathname.startsWith(route));

  // Block banned users from everything except maybe a "banned" page or logout
  if (isLoggedIn && status === "banned" && nextUrl.pathname !== "/banned") {
    return Response.redirect(new URL("/banned", nextUrl));
  }

  // If logged in and trying to access login/register, redirect to dashboard
  if (
    isLoggedIn &&
    (nextUrl.pathname === LOGIN || nextUrl.pathname === "/register")
  ) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Admin access control
  if (isAdminRoute && role !== "admin") {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // If not logged in and trying to access protected route, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
