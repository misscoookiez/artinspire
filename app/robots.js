export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sandrarudzite.com";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/manage/"] },
    sitemap: `${base}/sitemap.xml`
  };
}
