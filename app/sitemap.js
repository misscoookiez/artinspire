export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sandrarudzite.com";
  const pages = ["/", "/inspire", "/legal"];
  return pages.map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/inspire" ? "weekly" : "monthly", priority: path === "/inspire" ? 1 : 0.7 }));
}
