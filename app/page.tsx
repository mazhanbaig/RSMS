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

      {/* Hero Section with Image */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Trusted by Real Estate Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                The Professional <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Estate</span> Management Platform
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Built specifically for real estate agents and property dealers to manage clients, properties,
                and deals efficiently from one unified platform. Save time, reduce costs, and grow your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  label="Get Started Free"
                  size="lg"
                  variant="theme2"
                  onClick={() => router.push("/signup")}
                  icon={<ArrowRight className="ml-2 w-5 h-5" />}
                  classNameC="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                />
                <Button
                  label="View Demo"
                  size="lg"
                  variant="theme2"
                  onClick={() => router.push("/tutorial")}
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">24/7</div>
                  <div className="text-sm text-slate-600">Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Cloud Based</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">$0</div>
                  <div className="text-sm text-slate-600">Startup Cost</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative hidden lg:block">
              {/* Main Image Container */}
              <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
                {/* Image placeholder - Replace with your actual image */}
                <Image
                  src="/images/realstatepicture.jpg"
                  alt="Modern real estate building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-2xl -z-10" />
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

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Transparent</span> Pricing
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              One powerful plan for all real estate professionals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Pricing Card */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              {/* Pricing Card */}
              <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-purple-200 shadow-2xl overflow-hidden">
                {/* Ribbon */}
                <div className="absolute top-0 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-b-lg shadow-lg">
                  <span className="font-bold text-sm flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" />
                    MOST POPULAR
                  </span>
                </div>

                {/* Card Header */}
                <div className="p-8 sm:p-10 text-center border-b border-slate-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-100 to-blue-100 mb-6">
                    <CreditCard className="w-8 h-8 text-purple-600" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Professional Plan</h3>
                  <p className="text-slate-600 mb-6">Everything you need to grow your real estate business</p>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-slate-900">₹500</span>
                    <span className="text-slate-600">/ month</span>
                  </div>
                  <p className="text-sm text-slate-500">Billed monthly, cancel anytime</p>
                </div>

                {/* Features List */}
                <div className="p-8 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Unlimited Features */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Unlimited Clients</h4>
                          <p className="text-sm text-slate-600">Add unlimited buyers, sellers, and leads</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Unlimited Properties</h4>
                          <p className="text-sm text-slate-600">List and manage unlimited properties</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Unlimited Owners</h4>
                          <p className="text-sm text-slate-600">Manage multiple property owners</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Unlimited Events</h4>
                          <p className="text-sm text-slate-600">Schedule unlimited meetings, showings, and follow-ups</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Advanced Analytics</h4>
                          <p className="text-sm text-slate-600">Detailed reports and insights</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Virtual Tours</h4>
                          <p className="text-sm text-slate-600">Digital property showcasing</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">24/7 Support</h4>
                          <p className="text-sm text-slate-600">Priority customer support</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Cloud Storage</h4>
                          <p className="text-sm text-slate-600">Secure document storage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Value Proposition */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Incredible Value</h4>
                        <p className="text-slate-600 text-sm">
                          Less than ₹17 per day for unlimited business management
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-white p-3 rounded-xl">
                        <div className="text-lg font-bold text-slate-900">₹0</div>
                        <div className="text-xs text-slate-600">Setup Cost</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl">
                        <div className="text-lg font-bold text-slate-900">100%</div>
                        <div className="text-xs text-slate-600">Cloud Based</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl">
                        <div className="text-lg font-bold text-slate-900">24/7</div>
                        <div className="text-xs text-slate-600">Access</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl">
                        <div className="text-lg font-bold text-slate-900">30-Day</div>
                        <div className="text-xs text-slate-600">Trial</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <Button
                      label="Get Started for ₹500/month"
                      size="lg"
                      variant="theme2"
                      onClick={() => router.push("/signup")}
                      classNameC="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all px-8"
                      icon={<ArrowRight className="ml-2 w-5 h-5" />}
                    />
                    <p className="text-sm text-slate-500 mt-4">
                      Start with 30-day free trial • No credit card required • Cancel anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Note */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-slate-900">All-in-one solution</p>
                  <p className="text-sm text-slate-600">
                    No hidden fees, no per-user charges, no property limits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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