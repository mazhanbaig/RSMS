import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Details — Zestate",
  description: "View property details, images, location, and inquire about this listing on Zestate.",
};

export default function PublicPropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
