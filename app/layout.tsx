// // import type { Metadata } from "next";
// // import "./globals.css";
// // import 'antd/dist/antd.css';

// // export const metadata: Metadata = {
// //   title: {
// //     default: "ZState | Smart Real Estate Management",
// //     template: "%s | ZState",
// //   },
// //   description:
// //     "ZState is a smart real estate management platform helping real estate agents managing clients, owners, properties and their events with ease.",
// //   keywords: [
// //     "ZState",
// //     "Real Estate Management System",
// //     "Property Management System",
// //     "Manage Clients",
// //     "Manage Properties",
// //     "Manage Property Owners",
// //     "Manage Events",
// //     "Real Estate Platform",
// //   ],
// //   authors: [{ name: "Muhammad Azhan Baig" }],
// //   creator: "Muhammad Azhan Baig",
// //   publisher: "ZState",

// //   robots: {
// //     index: true,
// //     follow: true,
// //   },

// //   openGraph: {
// //     title: "ZState | Smart Real Estate Management",
// //     description:
// //       "Revolutionizing real estate management with modern technology.",
// //     url: "https://zstate.vercel.app",
// //     siteName: "ZState",
// //     images: [
// //       {
// //         url: "/images/icon.jpeg",
// //         width: 1200,
// //         height: 630,
// //         alt: "ZState Real Estate Platform",
// //       },
// //     ],
// //     locale: "en_US",
// //     type: "website",
// //   },

// //   twitter: {
// //     card: "summary_large_image",
// //     title: "ZState | Smart Real Estate Management",
// //     description:
// //       "Revolutionizing real estate management with modern technology.",
// //     images: ["/images/icon.jpeg"],
// //   },

// //   metadataBase: new URL("https://zstate.vercel.app"),
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         <meta
// //           name="google-site-verification"
// //           content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE"
// //         />
// //       </head>
// //       <body className="antialiased">
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }


// // app/layout.tsx
// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: {
//     default: "ZState | Smart Real Estate Management",
//     template: "%s | ZState",
//   },
//   description:
//     "ZState is a smart real estate management platform helping real estate agents manage clients, owners, properties, and events efficiently.",
//   keywords: [
//     "ZState",
//     "Real Estate Management System",
//     "Property Management System",
//     "Manage Clients",
//     "Manage Properties",
//     "Manage Property Owners",
//     "Manage Events",
//     "Real Estate Platform",
//   ],
//   authors: [{ name: "Muhammad Azhan Baig" }],
//   creator: "Muhammad Azhan Baig",
//   publisher: "ZState",

//   robots: {
//     index: true,
//     follow: true,
//   },

//   openGraph: {
//     title: "ZState | Smart Real Estate Management",
//     description:
//       "Revolutionizing real estate management with modern technology.",
//     url: "https://zstate.vercel.app",
//     siteName: "ZState",
//     images: [
//       {
//         url: "/images/icon.jpeg",
//         width: 1200,
//         height: 630,
//         alt: "ZState Real Estate Platform",
//       },
//       {
//         url: "/images/icon.jpeg",
//         width: 800,
//         height: 418,
//         alt: "ZState Platform Preview",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "ZState | Smart Real Estate Management",
//     description:
//       "Revolutionizing real estate management with modern technology.",
//     images: ["/images/icon.jpeg"],
//     creator: "@YourTwitterHandle", // Replace with your Twitter handle
//   },

//   metadataBase: new URL("https://zstate.vercel.app"),
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta
//           name="google-site-verification"
//           content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE"
//         />
//         <link rel="icon" href="/favicon.ico" />

//         {/* Structured Data JSON-LD */}
//         <script type="application/ld+json">
//           {`
//           {
//             "@context": "https://schema.org",
//             "@type": "SoftwareApplication",
//             "name": "ZState",
//             "url": "https://zstate.vercel.app",
//             "logo": "https://zstate.vercel.app/images/icon.jpeg",
//             "applicationCategory": "BusinessApplication",
//             "operatingSystem": "Web",
//             "creator": {
//               "@type": "Person",
//               "name": "Muhammad Azhan Baig"
//             },
//             "description": "ZState is a smart real estate management platform helping agents manage clients, owners, properties, and events efficiently."
//           }
//           `}
//         </script>

//         {/* Canonical Tag */}
//         <link rel="canonical" href="https://zstate.vercel.app" />
//       </head>
//       <body className="antialiased">
//         {children}
//       </body>
//     </html>
//   );
// }



// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Site-wide metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Titles ────────────────────────────────────────────────────────────────
  title: {
    default: "ZState — Real Estate Management Software for Agents",
    template: "%s | ZState",
  },

  // ── Description (160 chars max) ───────────────────────────────────────────
  description:
    "ZState helps real estate agents manage clients, property owners, listings, and events from one smart platform. Built for efficiency. Try it free.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "real estate management software",
    "property management system",
    "real estate CRM",
    "real estate agent software",
    "property management platform",
    "client management for real estate",
    "property owner tracking software",
    "real estate event management",
    "manage property listings online",
    "real estate management software Pakistan",
    "property management system Karachi",
    "ZState",
  ],

  // ── Authorship ────────────────────────────────────────────────────────────
  authors: [{ name: "Muhammad Azhan Baig" }],
  creator: "Muhammad Azhan Baig",
  publisher: "ZState",

  // ── Canonical + alternates ────────────────────────────────────────────────
  metadataBase: new URL("https://zstate.vercel.app"),
  alternates: {
    canonical: "/",
    // Uncomment when Urdu version is ready:
    // languages: { "ur-PK": "/ur" },
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title: "ZState — Real Estate Management Software for Agents",
    description:
      "Manage clients, property owners, listings, and events from one smart platform. Built for real estate agents.",
    url: "https://zstate.vercel.app",
    siteName: "ZState",
    locale: "en_US",
    type: "website",
    images: [
      {
        // Replace with a real 1200×630 product screenshot for best CTR
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "ZState Real Estate Management Platform — dashboard overview",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "ZState — Smart Real Estate Management",
    description:
      "Manage clients, properties, owners and events from one smart platform.",
    images: ["/images/og-cover.png"],
    creator: "@MuhammadAzhan", // ← Replace with your real handle
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification ──────────────────────────────────────────────────────────
  verification: {
    google: "X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE",
    // Add Bing/Yandex here when needed:
    // other: { "msvalidate.01": "BING_CODE", "yandex-verification": "YANDEX_CODE" },
  },

  // ── Category hint for Google ──────────────────────────────────────────────
  category: "technology",
};

// ─── Structured Data (JSON-LD) ─────────────────────────────────────────────────
// Split into two schemas: SoftwareApplication + FAQPage
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZState",
  url: "https://zstate.vercel.app",
  logo: "https://zstate.vercel.app/images/icon.jpeg",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to use",
  },
  creator: {
    "@type": "Person",
    name: "Muhammad Azhan Baig",
  },
  description:
    "ZState is a smart real estate management platform helping agents manage clients, owners, properties, and events efficiently.",
  featureList: [
    "Client Management",
    "Property Tracking",
    "Owner Portal",
    "Event Scheduling",
    "Real Estate Dashboard",
  ],
  screenshot: "https://zstate.vercel.app/images/og-cover.png",
  // Add real aggregate rating once you have user reviews:
  // aggregateRating: {
  //   "@type": "AggregateRating",
  //   ratingValue: "4.8",
  //   reviewCount: "24",
  // },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ZState?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ZState is a smart real estate management platform that helps real estate agents manage clients, property owners, listings, and events from a single dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Is ZState free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ZState is currently free to use. Sign up and start managing your properties and clients immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Who is ZState designed for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ZState is built for real estate agents and property managers who need an organized way to track clients, owners, properties, and appointments.",
      },
    },
    {
      "@type": "Question",
      name: "Does ZState work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ZState is fully responsive and works on all devices including smartphones, tablets, and desktops.",
      },
    },
    {
      "@type": "Question",
      name: "Is ZState available for real estate agents in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ZState is accessible worldwide including Pakistan. It is ideal for agents managing properties in cities like Karachi, Lahore, and Islamabad.",
      },
    },
  ],
};

// ─── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Viewport is handled by Next.js — no need for a manual meta tag */}

        {/* Preconnect to Google Fonts if you add any */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}

        {/* SoftwareApplication structured data */}
        <Script
          id="schema-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
          strategy="beforeInteractive"
        />

        {/* FAQ structured data */}
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
          strategy="beforeInteractive"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}