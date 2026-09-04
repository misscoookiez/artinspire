export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.sandrarudzite.com",
  ),
  title: "Gleznošanas nodarbības Rīgā | Art Studio Inspire",
  description:
    "Gleznošanas nodarbības Rīgā bērniem, jauniešiem un pieaugušajiem: akvarelis, akrils, eļļa, zīmēšana un individuālas sesijas. Materiāli ir uz vietas · Miera iela 17.",
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
  alternates: { canonical: "/inspire" },
  openGraph: {
    title: "Art Studio Inspire — gleznošanas nodarbības Rīgā",
    description:
      "Mākslas nodarbības, radoši pasākumi un individuālas sesijas Rīgas centrā.",
    images: ["/art/inspire-masthead-wide.png"],
  },
};

export default function InspireLayout({ children }) {
  return children;
}
