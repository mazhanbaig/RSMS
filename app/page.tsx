'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import HomeHeader from "@/components/HomeHeader";
import { auth, checkUserSession } from "@/FBConfig/fbFunctions";
import HeroSection from "@/components/HeroSection";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await checkUserSession();
      if (user) {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          router.replace(`/realstate/${userData.uid}`);
          return;
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />
      <HeroSection />
      <ProblemsSolutions />
      <FeaturesGrid />
      <HowItWorks />
      <PricingSection />
      <CTASection />
    </div>
  );
}