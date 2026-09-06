export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://artinspire.lv";
  const pages = [
    ["/", "weekly", 1],
    ["/classes", "weekly", 0.9],
    ["/method", "monthly", 0.9],
    ["/events", "monthly", 0.9],
    ["/about", "monthly", 0.8],
    ["/contact", "monthly", 0.8],
    ["/questions", "monthly", 0.8],
    ["/portfolio", "weekly", 0.8],
    ["/shop", "weekly", 0.8],
    ["/legal", "yearly", 0.3],
  ];
  return pages.map(([path, changeFrequency, priority]) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency, priority }));
}
