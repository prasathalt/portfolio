import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasath S — Brand & Motion Designer",
  description: "Portfolio of Prasath S — Brand identity, art direction, packaging, campaigns and motion design. Dubai, UAE.",
  authors: [{ name: "Prasath S" }],
  openGraph: {
    title: "Prasath S — Brand & Motion Designer",
    description: "Selected identity, packaging, campaign and motion work by Prasath S.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
