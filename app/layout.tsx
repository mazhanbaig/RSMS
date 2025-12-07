import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import 'antd/dist/antd.css';

export const metadata: Metadata = {
  title: "ZState",
  description: "Revolutionizing Real Estate Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="google-site-verification" content="d45320be1a95a971.html" /> */}
        <meta name="google-site-verification" content="X3ph3Ei7AH9-hn5bxmX8mmwBMFrbYH9wQJ5WolX4vpE" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}