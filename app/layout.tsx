// import type { Metadata } from "next";
// import "./globals.css";
// import 'antd/dist/antd.css';

// export const metadata: Metadata = {
//   title: {
//     default: "ZState | Smart Real Estate Management",
//     template: "%s | ZState",
//   },
//   description:
//     "ZState is a smart real estate management platform helping real estate agents managing clients, owners, properties and their events with ease.",
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
//         <meta
//           name="google-site-verification"
//           content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE"
//         />
//       </head>
//       <body className="antialiased">
//         {children}
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import 'antd/dist/antd.css';
import { AppProvider } from '@/lib/context/AppContext';

export const metadata: Metadata = {
  title: {
    default: "ZState | Smart Real Estate Management",
    template: "%s | ZState",
  },
  description:
    "ZState is a smart real estate management platform helping real estate agents manage clients, owners, properties, and events efficiently.",
  keywords: [
    "ZState",
    "Real Estate Management System",
    "Property Management System",
    "Manage Clients",
    "Manage Properties",
    "Manage Property Owners",
    "Manage Events",
    "Real Estate Platform",
  ],
  authors: [{ name: "Muhammad Azhan Baig" }],
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
    url: "https://zstate.vercel.app",
    siteName: "ZState",
    images: [
      {
        url: "/images/icon.jpeg",
        width: 1200,
        height: 630,
        alt: "ZState Real Estate Platform",
      },
      {
        url: "/images/icon.jpeg",
        width: 800,
        height: 418,
        alt: "ZState Platform Preview",
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
    images: ["/images/icon.jpeg"],
    creator: "@YourTwitterHandle", // Replace with your Twitter handle
  },

  metadataBase: new URL("https://zstate.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ZState",
            "url": "https://zstate.vercel.app",
            "logo": "https://zstate.vercel.app/images/icon.jpeg",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "creator": {
              "@type": "Person",
              "name": "Muhammad Azhan Baig"
            },
            "description": "ZState is a smart real estate management platform helping agents manage clients, owners, properties, and events efficiently."
          }
          `}
        </script>

        {/* Canonical Tag */}
        <link rel="canonical" href="https://zstate.vercel.app" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}