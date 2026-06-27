import { CustomCursor } from "@/components/CustomCursor";
import HomeHeader from "@/components/HomeHeader";
import { HeroSection } from "@/components/layout/HeroSection";
import { ProblemsSolutions } from "@/components/layout/ProblemsSolutions";
import { FeaturesGrid } from "@/components/layout/FeaturesGrid";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { CTASection } from "@/components/layout/CTASection";

export const metadata = {
  title: "Zestate — Real Estate Management Platform",
  description:
    "Manage properties, clients, owners, and events with Zestate. The all-in-one real estate management platform for agents and agencies.",
  openGraph: {
    title: "Zestate — Real Estate Management Platform",
    description:
      "Manage properties, clients, owners, and events with Zestate.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HomeHeader />
      <HeroSection />
      <ProblemsSolutions />
      <FeaturesGrid />
      <HowItWorks />
      <CTASection />
    </div>
  );
}
