import { NextResponse } from "next/server";

const redirects = new Map([
  ["/inspire", "/"],
  ["/inspire/about", "/about"],
  ["/portfolio", "/"],
  ["/shop", "/"],
  ["/contact", "/"],
]);

export function proxy(request) {
  const destination = redirects.get(request.nextUrl.pathname);
  return destination
    ? NextResponse.redirect(new URL(destination, request.url), 308)
    : NextResponse.next();
}

export const config = {
  matcher: ["/inspire", "/inspire/about", "/portfolio", "/shop", "/contact"],
};
