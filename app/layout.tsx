import type { Metadata } from "next";
import "./globals.css";
import 'antd/dist/antd.css';

export const metadata: Metadata = {
  title: {
    default: "ZState | Smart Real Estate Management",
    template: "%s | ZState",
  },
  description:
    "ZState is a smart real estate management platform for buying, selling, and managing properties with ease.",
  keywords: [
    "ZState",
    "Real Estate Management",
    "Property Management",
    "Buy Property",
    "Sell Property",
    "Real Estate Platform",
  ],
  authors: [{ name: "ZState Team" }],
  creator: "Muhammad Azhan Baig",
  publisher: "ZState",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "ZState | Smart Real Estate Management",
    description:
      "Revolutionizing real estate management with modern technology.",
    url: "https://zstate.com", // change to your real domain
    siteName: "ZState",
    images: [
      {
        url: "/og-image.png", // place this image in /public
        width: 1200,
        height: 630,
        alt: "ZState Real Estate Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ZState | Smart Real Estate Management",
    description:
      "Revolutionizing real estate management with modern technology.",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://zstate.com"), // change domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
