export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://artinspire.lv",
  ),
  title: "Gleznošanas nodarbības Rīgā | Art Studio Inspire",
  description:
    "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.",
  keywords: [
    "gleznošanas nodarbības Rīgā",
    "mākslas studija Rīga",
    "zīmēšanas nodarbības Rīgā",
    "gleznošana bērniem un pieaugušajiem",
    "akvareļa nodarbības Rīgā",
    "individuālas gleznošanas nodarbības",
    "radoši pasākumi Rīgā",
    "dzimšanas diena mākslas studijā",
    "komandas pasākums Rīgā",
    "Miera iela 17",
    "Klusais centrs",
    "Rīgas centrs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Art Studio Inspire — gleznošanas nodarbības Rīgā",
    description:
      "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.",
    url: "/",
    siteName: "Art Studio Inspire",
    locale: "lv_LV",
    type: "website",
    images: ["/art/inspire-masthead-wide.png"],
  },
  twitter: { card: "summary_large_image", title: "Art Studio Inspire — gleznošanas nodarbības Rīgā", description: "Paņem otu. Uztaisi kaut ko savu. Gleznošana, drosmīgas idejas un radoši vakari Rīgā.", images: ["/art/inspire-masthead-wide.png"] },
};

export default function InspireLayout({ children }) {
  return children;
}
