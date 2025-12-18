// dwtvol0ha

// 864737142215958

// jIy4lejKZF05fu-F1AQHmiCsYaI

















// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Home, Users, Shield, Zap, ArrowRight, TrendingUp, Building, BarChart3, Sparkles, Clock, CheckCircle, ChevronRight } from "lucide-react";
// import Button from "./Button";
// import StatCard from './StatCard'
// import { getData } from "@/FBConfig/fbFunctions";

// interface UserInfo {
//     name?: string;
//     email?: string;
//     uid?: string;
// }

// export default function Hero({ userData }: { userData?: UserInfo }) {
//     const router = useRouter();
//     const [greeting, setGreeting] = useState("");
//     const [ownerProperties, setOwnerProperties] = useState<any[]>([]);
//     const [ownerClients, setOwnerClients] = useState<any[]>([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const firstName = userData?.name?.split(" ")[0] || "Welcome";

//     // Feature cards data
//     const features = [
//         { icon: <Zap className="w-5 h-5" />, title: "Instant Analytics", desc: "Real-time property insights" },
//         { icon: <Shield className="w-5 h-5" />, title: "Bank-Level Security", desc: "End-to-end encryption" },
//         { icon: <Clock className="w-5 h-5" />, title: "24/7 Support", desc: "Always available to help" },
//         { icon: <BarChart3 className="w-5 h-5" />, title: "Smart Reports", desc: "Automated performance tracking" },
//     ];

//     // Trust badges
//     const trustBadges = [
//         { label: "A+ Rating", icon: <Sparkles className="w-4 h-4" /> },
//         { label: "ISO Certified", icon: <CheckCircle className="w-4 h-4" /> },
//         { label: "GDPR Compliant", icon: <Shield className="w-4 h-4" /> },
//     ];

//     useEffect(() => {
//         const hour = new Date().getHours();
//         setGreeting(
//             hour < 12 ? "Good Morning" :
//                 hour < 18 ? "Good Afternoon" :
//                     "Good Evening"
//         );

//         if (userData?.uid) {
//             Promise.all([
//                 getData("properties/"),
//                 getData("clients/")
//             ]).then(([propertiesRes, clientsRes]) => {
//                 const propertiesList = Object.values(propertiesRes || {}).filter(
//                     (p: any) => p.ownerUid === userData.uid
//                 );
//                 const clientsList = Object.values(clientsRes || {}).filter(
//                     (c: any) => c.ownerUid === userData.uid
//                 );
//                 setOwnerProperties(propertiesList);
//                 setOwnerClients(clientsList);
//                 setIsLoaded(true);
//             });
//         } else {
//             setIsLoaded(true);
//         }
//     }, [userData?.uid]);

//     // Calculate conversion rate (example)
//     const conversionRate = ownerClients.length > 0
//         ? Math.min(Math.round((ownerProperties.length / ownerClients.length) * 100), 100)
//         : 0;

//     return (
//         <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50/30">
//             {/* Animated Background Grid */}
//             <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

//             {/* Floating Elements */}
//             <div className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
//             <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

//             {/* Main Content */}
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
//                 {/* Header Section */}
//                 <div className="text-center mb-10 sm:mb-16">
//                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6 animate-fade-in">
//                         <Sparkles className="w-4 h-4 text-indigo-600" />
//                         <span className="text-sm font-medium text-indigo-700">
//                             Trusted by 2,500+ real estate professionals
//                         </span>
//                     </div>

//                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
//                         <span className="block text-slate-900">{greeting},</span>
//                         <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
//                             {firstName}
//                         </span>
//                     </h1>

//                     <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
//                         Your intelligent dashboard for managing properties, clients, and growing your real estate business.
//                     </p>

//                     {/* Trust Badges */}
//                     <div className="flex flex-wrap justify-center gap-4 mb-10">
//                         {trustBadges.map((badge, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-xs hover:shadow-sm transition-shadow"
//                             >
//                                 {badge.icon}
//                                 <span className="text-sm font-medium text-slate-700">{badge.label}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Stats Dashboard */}
//                 {userData && isLoaded && (
//                     <div className="mb-12 sm:mb-16">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-semibold text-slate-900">Your Dashboard</h2>
//                             <button
//                                 onClick={() => router.push("/dashboard")}
//                                 className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
//                             >
//                                 View Details <ChevronRight className="w-4 h-4" />
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                             <StatCard
//                                 label="Active Properties"
//                                 value={ownerProperties.length}
//                                 change="+12%"
//                                 icon={<Building className="w-6 h-6" />}
//                                 color="indigo"
//                                 loading={!isLoaded}
//                             />
//                             <StatCard
//                                 label="Total Clients"
//                                 value={ownerClients.length}
//                                 change="+8%"
//                                 icon={<Users className="w-6 h-6" />}
//                                 color="blue"
//                                 loading={!isLoaded}
//                             />
//                             <StatCard
//                                 label="Conversion Rate"
//                                 value={`${conversionRate}%`}
//                                 change="+5%"
//                                 icon={<TrendingUp className="w-6 h-6" />}
//                                 color="emerald"
//                                 loading={!isLoaded}
//                             />
//                             <StatCard
//                                 label="Response Time"
//                                 value="< 2h"
//                                 change="-30min"
//                                 icon={<Clock className="w-6 h-6" />}
//                                 color="purple"
//                                 loading={!isLoaded}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-16">
//                     {features.map((feature, idx) => (
//                         <div
//                             key={idx}
//                             className="group p-4 sm:p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//                             onClick={() => router.push("/features")}
//                         >
//                             <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
//                                 {feature.icon}
//                             </div>
//                             <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
//                             <p className="text-sm text-slate-600">{feature.desc}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* CTA Section */}
//                 <div className="text-center">
//                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
//                         <Button
//                             label="Get Started Free"
//                             size="lg"
//                             onClick={() => router.push("/clients")}
//                             icon={<ArrowRight className="ml-2 w-5 h-5" />}
//                             classNameC="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
//                             // gradient
//                         />
//                         <Button
//                             label="About Us"
//                             size="lg"
//                             variant="theme2"
//                             onClick={() => router.push("/about")}
//                             classNameC="border-slate-300 hover:border-indigo-300 hover:bg-indigo-50"
//                         />
//                         <Button
//                             label="Contact Us"
//                             size="lg"
//                             variant="theme2"
//                             onClick={() => router.push("/contact")}
//                             classNameC="text-slate-700 hover:text-indigo-700 hover:bg-slate-100"
//                         />
//                     </div>

//                     {/* Social Proof */}
//                     <div className="mt-10 pt-8 border-t border-slate-200/60">
//                         <p className="text-sm text-slate-500 mb-4">Loved by leading agencies</p>
//                         <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
//                             <div className="text-2xl font-bold text-slate-800">RE/MAX</div>
//                             <div className="text-xl font-semibold text-slate-700">Century 21</div>
//                             <div className="text-lg font-medium text-slate-700">Keller Williams</div>
//                             <div className="text-base font-medium text-slate-600">Coldwell Banker</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Animated Scroll Indicator */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//                 <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
//                     <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-scroll"></div>
//                 </div>
//             </div>

//             {/* Custom Animations */}
//             <style jsx>{`
//                 @keyframes scroll {
//                     0%, 100% { transform: translateY(0); opacity: 1; }
//                     50% { transform: translateY(10px); opacity: 0.5; }
//                 }
//                 .animate-scroll {
//                     animation: scroll 2s ease-in-out infinite;
//                 }
//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fade-in {
//                     animation: fade-in 0.6s ease-out;
//                 }
//                 .bg-grid-slate-100\/50 {
//                     background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
//                 }
//             `}</style>
//         </section>
//     );
// }