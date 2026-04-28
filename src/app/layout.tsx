import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "OnSKILL — Certify, Prove, and Grow Verifiable Skills",
  description: "Skills that speak. Challenges that prove.",
  openGraph: {
    type: "website",
    title: "OnSKILL — Certify, Prove, and Grow Verifiable Skills",
    description: "Skills that speak. Challenges that prove.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/onskill-logo.png",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
