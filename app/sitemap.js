export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://artinspire.lv";
  const pages = ["/", "/about", "/legal"];
  return pages.map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }));
}
