import "./globals.css";

export const metadata = {
  title: "Sandra Rudzite — Studio",
  description: "Original paintings, art classes and private sessions in Riga."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
