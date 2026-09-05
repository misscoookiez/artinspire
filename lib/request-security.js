export function isTrustedBrowserRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Direct form submissions and trusted server calls.
  const expected = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL
    : new URL(request.url).origin;
  try { return new URL(origin).origin === new URL(expected).origin; }
  catch { return false; }
}
