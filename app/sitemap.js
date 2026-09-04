export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sandrarudzite.com";
  const pages = ["/", "/portfolio", "/inspire", "/shop", "/about", "/contact", "/legal"];
  return pages.map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/inspire" ? "weekly" : "monthly", priority: path === "/inspire" || path === "/portfolio" ? 1 : 0.7 }));
}
