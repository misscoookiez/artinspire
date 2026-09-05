import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://artinspire.lv"),
  title: "Art Studio Inspire — gleznošanas nodarbības Rīgā",
  description: "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Art Studio Inspire — gleznošanas nodarbības Rīgā",
    description: "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.",
    url: "/",
    siteName: "Art Studio Inspire",
    locale: "lv_LV",
    type: "website",
    images: ["/art/inspire-masthead-wide.png"],
  },
  twitter: { card: "summary_large_image", title: "Art Studio Inspire — gleznošanas nodarbības Rīgā", description: "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.", images: ["/art/inspire-masthead-wide.png"] },
};

export default function RootLayout({ children }) {
  return <html lang="lv"><body>{children}</body></html>;
}
