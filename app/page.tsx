// 'use client'

// import Loader from "@/components/Loader";
// import { auth, getData } from "@/FBConfig/fbFunctions";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export interface UserInfo{
//   email:string,
//   uid:string
// }

// export default function Page() {

//   const router = useRouter();
//   const [authUser, setAuthUser] = useState<any>(null);
//   const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 1️⃣ Check Firebase authentication
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         router.replace("/login");
//         setLoading(false);
//       } else {
//         let userInfo:any=localStorage.getItem('userInfo');
//         userInfo=JSON.parse(userInfo)

//         getData(`users/${userInfo.uid}`)
//         .then((res:any)=>{


//           router.replace(`/realstate/${res.name}`)
//         })
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Loader />
//   );
// }



'use client';

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { checkUserSession, getData } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import {
  Building,
  Users,
  UserPlus,
  Home,
  Eye,
  Shield,
  Database,
  FileText,
  Search,
  Calendar,
  PhoneCall,
  Smartphone,
  Clock,
  MapPin,
  ImageIcon,
  CheckCircle,
  ArrowRight,
  Target,
  BarChart3,
  Zap,
  Phone,
  Mail,
  Video,
  DollarSign,
  TrendingUp,
  Lock,
  FolderOpen,
  Filter,
  MessageSquare,
  CalendarDays,
  ClipboardCheck,
  UsersRound,
  ChevronRight,
  Globe,
  ShieldCheck,
  Trophy,
  Sparkles,
  LineChart,
  BadgeCheck,
  CreditCard,
  Star
} from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import Image from "next/image";
import PricingSection from "@/components/PricingSection";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const user = await checkUserSession();

      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      try {
        const storedUser: any = localStorage.getItem("userInfo");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userData = await getData(`users/${parsedUser.uid}`);
          setUserInfo(userData);
          router.replace(`/realstate/${parsedUser?.uid}`);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  // If authenticated but still loading redirect, show loader
  if (isAuthenticated && !userInfo) {
    return <Loader />;
  }

  // If not authenticated, show the about/home page
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />

      {/* Modern Hero Section with Asymmetrical Layout - Fully Responsive */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-2xl opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content - Full width on mobile, 60% on desktop */}
            <div className="w-full lg:w-3/5 lg:pr-8 xl:pr-12">
              {/* Animated Badge - Mobile centered, left aligned on desktop */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm mb-6 sm:mb-8 animate-fade-in w-full sm:w-auto">
                <div className="relative">
                  <div className="absolute animate-ping w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75"></div>
                  <div className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                </div>
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent text-center lg:text-left">
                  Professional Platform for Real Estate Experts
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-left">
                Transform Your
                <span className="block mt-1 sm:mt-2">
                  <span className="relative">
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Real Estate Business
                    </span>
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 rounded-full"></span>
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                The all-in-one platform designed specifically for real estate professionals.
                Manage clients, properties owners, properties, events, and grow your business with intelligent tools
                built for modern real estate management.
              </p>

              {/* CTA Buttons - Stack on mobile, row on larger screens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
                <Button
                  label="Start Trial"
                  size="lg"
                  variant="theme"
                  onClick={() => router.push("/signup")}
                  icon={<ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />}
                  classNameC="w-full sm:w-auto justify-center"
                />
                <Button
                  label="Watch Demo"
                  size="lg"
                  variant="theme2"
                  onClick={() => router.push("/tutorial")}
                  classNameC="w-full sm:w-auto justify-center"
                />
              </div>

              {/* Features Grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-purple-100 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">Secure</div>
                    <div className="text-xs text-slate-500">Bank-level Security</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">Fast</div>
                    <div className="text-xs text-slate-500">Real-time Updates</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-cyan-100 transition-colors sm:col-span-2 lg:col-span-1">
                  <div className="p-2 bg-gradient-to-r from-cyan-50 to-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">Efficient</div>
                    <div className="text-xs text-slate-500">Save 70% Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual - Full width on mobile, 40% on desktop */}
            <div className="w-full lg:w-2/5 mt-8 sm:mt-12 lg:mt-0 relative">
              {/* Modern Layered Container - Adjust for mobile */}
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-blue-50/10 to-cyan-100/10 rounded-3xl blur-xl -z-10 hidden lg:block" />

                {/* Card 1 - Main Dashboard */}
                <div className="w-full relative bg-white rounded-2xl p-4 sm:p-5 shadow-lg sm:shadow-soft-xl border border-slate-100 lg:transform lg:rotate-[0.5deg] lg:hover:rotate-0 transition-transform duration-300">
                  <div className="relative h-[200px] sm:h-[240px] rounded-xl overflow-hidden group">
                    <Image
                      src="/images/realstatepicture.jpg"
                      alt="Real Estate Dashboard Interface"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />

                    {/* Elegant Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                    {/* Status Indicator */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-soft">
                        <div className="relative">
                          <div className="absolute animate-ping w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full opacity-75"></div>
                          <div className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs font-medium text-slate-700">Live Interface</span>
                      </div>
                    </div>

                    {/* Floating Activity Badge - Hidden on mobile, visible on tablet+ */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-95">
                        <div className="text-xs font-medium">Today: 5+ Activities</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Performance Stats - Stack on mobile, overlay on desktop */}
                <div className="mt-4 sm:mt-0 hidden lg:block lg:absolute lg:-right-3 lg:top-8 w-full bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 sm:p-5 rounded-xl shadow-lg sm:shadow-xl border border-slate-700/40 lg:transform lg:-rotate-[1deg] lg:hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg">Performance Metrics</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Real-time business insights</p>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                      Live
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-slate-400 mb-1">Revenue Growth</div>
                      <div className="text-lg sm:text-xl font-bold mb-1">+42%</div>
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <ArrowRight className="w-3 h-3" />
                        <span>This quarter</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-slate-400 mb-1">Efficiency</div>
                      <div className="text-lg sm:text-xl font-bold mb-1">3.2x</div>
                      <div className="text-xs text-blue-400">Faster deals</div>
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-300">Agent Satisfaction</div>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Quick Actions - Stack on mobile, overlay on desktop */}
                <div className="mt-4 lg:absolute lg:-bottom-4 lg:-left-4 w-full lg:w-[92%] bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-slate-100 lg:transform lg:rotate-[2deg] lg:hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Get Started</h3>
                      <p className="text-sm text-slate-600">Begin your journey in minutes</p>
                    </div>
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-all cursor-pointer group">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm sm:text-base group-hover:text-purple-700 transition-colors">
                          Setup Your Profile
                        </div>
                        <div className="text-xs text-slate-500">Complete within a minutes</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
                    </div>

                    <div className="flex items-center gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-all cursor-pointer group">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                          Add Clients, Owners, Properties
                        </div>
                        <div className="text-xs text-slate-500">List with ease</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>

                  {/* Modern CTA Button */}
                  <div className="relative group">
                    <Button
                      label="Start Trial →"
                      size="sm"
                      variant="theme2"
                      onClick={() => router.push("/signup")}
                      classNameC="w-full justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md group-hover:shadow-lg transition-all text-sm sm:text-base"
                    />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  </div>
                </div>

                {/* Floating Trust Badge - Hidden on mobile, visible on tablet+ */}
                <div className="absolute -top-3 -right-3 hidden sm:block">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-sm bg-opacity-95">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <div>
                      <div className="text-xs font-bold">PROFESSIONAL</div>
                      <div className="text-[10px] opacity-90">Edition</div>
                    </div>
                  </div>
                </div>

                {/* Subtle Background Elements - Hidden on mobile */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-pink-200/20 rounded-full blur-2xl -z-10 hidden lg:block" />
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gradient-to-r from-blue-200/20 to-cyan-200/15 rounded-full blur-2xl -z-10 hidden lg:block" />
              </div>
            </div>
          </div>

          {/* Trust Badges - Bottom */}
          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-slate-500 mb-2">Trusted by real estate professionals worldwide</div>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">100% Cloud Based</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">24/7 Access</span>
                  </div>
                </div>
              </div>

              {/* Trust Metrics - Hidden on mobile, visible on tablet+ */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">5,000+</div>
                  <div className="text-xs text-slate-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">98%</div>
                  <div className="text-xs text-slate-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Solving Real <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Problems</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The actual challenges real estate professionals face daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                problem: "Lost Client Contacts",
                solution: "Centralized Client Database",
                icon: <Database className="w-5 h-5" />,
                stat: "100%"
              },
              {
                problem: "Fuel & Time Waste",
                solution: "Virtual Property Showings",
                icon: <Video className="w-5 h-5" />,
                stat: "70%"
              },
              {
                problem: "Poor Organization",
                solution: "Structured Workflow",
                icon: <ClipboardCheck className="w-5 h-5" />,
                stat: "3x"
              },
              {
                problem: "Manual Tracking",
                solution: "Automated CRM",
                icon: <BarChart3 className="w-5 h-5" />,
                stat: "24/7"
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-3 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-purple-100 to-blue-100' :
                      idx === 1 ? 'from-blue-100 to-cyan-100' :
                        idx === 2 ? 'from-cyan-100 to-green-100' : 'from-green-100 to-emerald-100'}`}>
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {item.stat}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.problem}</h3>
                  <p className="text-sm text-slate-600 mb-3">→ {item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">One Platform</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Complete tools for managing your real estate business
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Client Management",
                description: "Complete CRM for all your buyers and sellers",
                icon: <Users className="w-6 h-6" />,
                stats: "Unlimited Clients"
              },
              {
                title: "Property Dashboard",
                description: "Manage all properties in one organized interface",
                icon: <Home className="w-6 h-6" />,
                stats: "Easy Management"
              },
              {
                title: "Virtual Tours",
                description: "Show properties digitally before physical visits",
                icon: <Eye className="w-6 h-6" />,
                stats: "Save 70% Fuel"
              },
              {
                title: "Analytics & Reports",
                description: "Track performance and make data-driven decisions",
                icon: <LineChart className="w-6 h-6" />,
                stats: "Smart Insights"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-3 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-purple-100 to-blue-100' :
                      idx === 1 ? 'from-blue-100 to-cyan-100' :
                        idx === 2 ? 'from-cyan-100 to-green-100' : 'from-green-100 to-emerald-100'
                      }`}>
                      {feature.icon}
                    </div>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {feature.stats}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ZState</span> Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Simple, efficient workflow for managing your real estate business
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Sign Up & Create Account",
                description: "Register as a real estate professional",
                icon: <ShieldCheck className="w-6 h-6" />,
                color: "from-purple-500 to-blue-500",
                details: [
                  "Create professional profile",
                  "Set up your dashboard",
                  "Configure preferences",
                  "Get instant access"
                ]
              },
              {
                number: "02",
                title: "Add Clients & Properties",
                description: "Register your clients and list properties",
                icon: <UsersRound className="w-6 h-6" />,
                color: "from-blue-500 to-cyan-500",
                details: [
                  "Capture client information",
                  "List property details",
                  "Add photos & specifications",
                  "Set pricing & terms"
                ]
              },
              {
                number: "03",
                title: "Manage & Show Properties",
                description: "Organize and showcase properties efficiently",
                icon: <Building className="w-6 h-6" />,
                color: "from-cyan-500 to-green-500",
                details: [
                  "Virtual property tours",
                  "Schedule showings",
                  "Track client interests",
                  "Manage communications"
                ]
              },
              {
                number: "04",
                title: "Close Deals & Grow",
                description: "Complete transactions and grow your business",
                icon: <Trophy className="w-6 h-6" />,
                color: "from-green-500 to-emerald-500",
                details: [
                  "Track negotiations",
                  "Manage documentation",
                  "Process payments",
                  "Generate reports"
                ]
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-2xl`}>
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color} bg-opacity-10`}>
                          {step.icon}
                        </div>
                        <h4 className="font-bold text-slate-900">What You Get</h4>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-center gap-2 text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of real estate professionals who are already saving time, fuel, and increasing their efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="Start Free Trial"
              size="lg"
              variant="theme"
              onClick={() => router.push("/signup")}
              classNameC="bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              icon={<ArrowRight className="ml-2 w-5 h-5" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}