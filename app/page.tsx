// 'use client';

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader";
// import HomeHeader from "@/components/HomeHeader";
// import { checkUserSession } from "@/FBConfig/fbFunctions";
// import HeroSection from "@/components/HeroSection";
// import ProblemsSolutions from "@/components/ProblemsSolutions";
// import FeaturesGrid from "@/components/FeaturesGrid";
// import HowItWorks from "@/components/HowItWorks";
// import PricingSection from "@/components/PricingSection";
// import CTASection from "@/components/CTASection";

// export default function HomePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const user = await checkUserSession();
//       if (user) {
//         const storedUser = localStorage.getItem('userInfo');
//         if (storedUser) {
//           const userData = JSON.parse(storedUser);
//           router.replace(`/realstate/${userData.uid}`);
//           return;
//         }
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, [router]);

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-white">
//       <HomeHeader />
//       <HeroSection />
//       <ProblemsSolutions />
//       <FeaturesGrid />
//       <HowItWorks />
//       {/* <PricingSection /> */}
//       <CTASection />
//     </div>
//   );
// }


// app/page.tsx
'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import HomeHeader from "@/components/HomeHeader";
import { HeroSection } from "@/components/layout/HeroSection";
import { ProblemsSolutions } from "@/components/layout/ProblemsSolutions";
import { FeaturesGrid } from "@/components/layout/FeaturesGrid";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { PricingSection } from "@/components/layout/PricingSection";
import { CTASection } from "@/components/layout/CTASection";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-3 border-purple-200 border-t-purple-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-slate-400 text-sm"
        >
          Loading ZSTATE...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CustomCursor />
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