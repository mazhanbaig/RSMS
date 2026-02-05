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
  CreditCard
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
        const storedUser = localStorage.getItem("userInfo");

        if (storedUser) {
          const parsedUser: any = JSON.parse(storedUser);
          const userData: any = await getData(`users/${parsedUser.uid}`);

          setUserInfo(userData);
          router.replace(`/realstate/${userData.uid}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);


  // If loading, show loader
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

      {/* Modern Hero Section with Asymmetrical Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-2xl opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content - 60% width */}
            <div className="lg:w-3/5 lg:pr-12">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm mb-8 animate-fade-in">
                <div className="relative">
                  <div className="absolute animate-ping w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75"></div>
                  <div className="relative w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                  Professional Platform for Real Estate Experts
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Transform Your
                <span className="block mt-2">
                  <span className="relative">
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Real Estate Business
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 rounded-full"></span>
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
                The all-in-one platform designed specifically for real estate professionals.
                Manage clients, properties owners, properties, events, and grow your business with intelligent tools
                built for modern real estate management.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  label="Start Trial"
                  size="lg"
                  variant="theme"
                  onClick={() => router.push("/signup")}
                  icon={<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                />
                <Button
                  label="Watch Demo"
                  size="lg"
                  variant="theme2"
                />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-purple-100 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Secure</div>
                    <div className="text-xs text-slate-500">Bank-level Security</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Fast</div>
                    <div className="text-xs text-slate-500">Real-time Updates</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 hover:border-cyan-100 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-cyan-50 to-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Efficient</div>
                    <div className="text-xs text-slate-500">Save 70% Time</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 mt-12 lg:mt-0 relative">
              {/* Main Container with Layered Cards */}
              <div className="relative">

                {/* Card 1 - Main Dashboard (Back Layer) */}
                <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-5 shadow-2xl shadow-blue-500/10 border border-slate-200 transform rotate-1">
                  <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src="/images/realstatepicture.jpg"
                      alt="Real Estate Dashboard Interface"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Dashboard Overlay Elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-slate-700">Live Data</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-sm text-white p-3 rounded-xl">
                        <div className="text-xs font-medium mb-1">Today's Activity</div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-lg font-bold">3 New Leads</div>
                            <div className="text-xs opacity-90">2 Property Views</div>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Stats Card (Middle Layer) */}
                <div className="absolute -right-4 top-1/3 w-[85%] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-2xl border border-slate-700/50 transform -rotate-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-purple-300" />
                      </div>
                      <h3 className="font-bold text-lg">Performance Stats</h3>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-1 rounded-full">
                      LIVE
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs text-slate-300">Closed Deals</div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>+18%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-300">Avg. Time Saved</div>
                      <div className="text-2xl font-bold">14h</div>
                      <div className="flex items-center gap-1 text-xs text-blue-400">
                        <Zap className="w-3 h-3" />
                        <span>Weekly</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-400">Monthly Revenue</div>
                      <div className="text-sm font-semibold text-white">$42.8K</div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Quick Actions (Front Layer) */}
                <div className="absolute -bottom-6 -left-6 w-[90%] bg-white rounded-2xl p-5 shadow-xl border border-slate-100 transform rotate-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                        <Zap className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Quick Start</h3>
                        <p className="text-xs text-slate-500">Begin in minutes</p>
                      </div>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full">
                      NEW
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100 hover:border-purple-200 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-md">
                          <UserPlus className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">Add First Client</div>
                          <div className="text-xs text-slate-500">CRM Setup</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-md">
                          <Home className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">List Property</div>
                          <div className="text-xs text-slate-500">Upload details</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Button
                      label="Launch Dashboard"
                      size="sm"
                      variant="theme2"
                      onClick={() => router.push("/signup")}
                      classNameC="w-full justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                      icon={<ArrowRight className="w-4 h-4 ml-2" />}
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl -z-10" />
              </div>

              {/* Stats Badge - Floating at Top Right */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-bold">PRO</span>
                  <div className="text-xs opacity-90">Edition</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges - Bottom */}
          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="text-sm text-slate-500 mb-2">Trusted by real estate professionals worldwide</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-slate-700">100% Cloud Based</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">24/7 Access</span>
                  </div>
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