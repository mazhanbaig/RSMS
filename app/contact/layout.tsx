import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Zestate",
  description: "Get in touch with the Zestate team. We're here to help you with your real estate management needs.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
