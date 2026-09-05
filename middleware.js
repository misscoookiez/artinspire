import { NextResponse } from "next/server";

const studioOnlyRoutes = new Set(["/portfolio", "/shop", "/about", "/contact"]);

export function middleware(request) {
  if (studioOnlyRoutes.has(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/inspire", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/portfolio", "/shop", "/about", "/contact"]
};
