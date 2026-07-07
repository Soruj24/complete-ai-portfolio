import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";

const PUBLIC_ROUTES = ["/", "/projects", "/privacy", "/terms", "/cookie-policy"];
const GUEST_ROUTES = ["/login", "/setup"];
const ADMIN_PREFIX = "/admin";

function isPublicRoute(path: string) {
  return PUBLIC_ROUTES.some((r) => path === r || path.startsWith(`${r}/`));
}

function isGuestRoute(path: string) {
  return GUEST_ROUTES.some((r) => path === r || path.startsWith(`${r}/`));
}

function isAdminRoute(path: string) {
  return path.startsWith(ADMIN_PREFIX);
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (isGuestRoute(pathname)) {
    if (token) {
      try {
        await verifyAccessToken(token);
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (isAdminRoute(pathname)) {
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    try {
      const payload = await verifyAccessToken(token);
      if (payload.role !== "admin") {
        return new NextResponse("Forbidden", { status: 403 });
      }
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-id", payload.sub);
      requestHeaders.set("x-user-role", payload.role);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/|fonts/).*)"],
};
