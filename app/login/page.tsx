// "use client";

// import { useEffect, useState } from "react";
// import { message } from "antd";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { loginWithGoogle } from "@/FBConfig/fbFunctions";

// export default function LoginPage() {
//     const [loading, setLoading] = useState(false);
//     let router = useRouter()

//     const handleGoogleLogin = async () => {
//         setLoading(true);
//         try {
//             const res = await loginWithGoogle();

//             // Store user info
//             localStorage.setItem("userInfo", JSON.stringify({
//                 uid: res.user.uid,
//                 email: res.user.email,
//                 name: res.user.name,
//                 photoURL: res.user.picture
//             }));

//             message.success('Login Successful!');

//             // Redirect to dashboard
//             router.push(`/realstate/${res.user.uid}`);

//         } catch (error: any) {
//             console.error("Login error:", error);
//             message.error(error?.message || "Login failed");
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4">
//             <div className="relative w-full max-w-3xl">
//                 {/* Compact Horizontal container */}
//                 <div className="flex flex-col lg:flex-row bg-white/95 backdrop-blur-sm rounded-xl sm:border border-gray-200 sm:shadow-lg overflow-hidden">

//                     {/* Left side - Compact Branding */}
//                     <div className="hidden sm:block  lg:w-1/2 p-8 sm:bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center">
//                         <div className="mb-6">
//                             <div className="relative inline-block mb-4">
//                                 <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
//                                 >
//                                     ZState
//                                 </h1>

//                                 <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400/20 rounded"></div>
//                                 <div className="absolute -bottom-0.5 -right-2 w-2 h-2 bg-blue-400/20 rounded"></div>
//                             </div>

//                             <p className="text-gray-700 font-medium mb-1 text-sm">
//                                 Intelligent real estate management
//                             </p>
//                             <p className="text-gray-500 text-xs">
//                                 Transform your property workflow with Zestate
//                             </p>
//                         </div>

//                         {/* Compact Features */}
//                         <div className="hidden sm:block space-y-3 mb-6">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                     </svg>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-800">AI Powered Management</p>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <div className="w-6 h-6 bg-cyan-100 rounded flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-3 h-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-800">Real-time Property Updates</p>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                     </svg>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-800">Enterprise Security</p>
//                             </div>
//                         </div>

//                         {/* Compact Stats */}
//                         <div className="hidden sm:grid grid-cols-3 gap-3">
//                             <div className="bg-white/50 rounded p-2 text-center">
//                                 <div className="text-lg font-bold text-blue-600">15K+</div>
//                                 <div className="text-xs text-gray-500">Properties</div>
//                             </div>
//                             <div className="bg-white/50 rounded p-2 text-center">
//                                 <div className="text-lg font-bold text-cyan-600">99%</div>
//                                 <div className="text-xs text-gray-500">Satisfied</div>
//                             </div>
//                             <div className="bg-white/50 rounded p-2 text-center">
//                                 <div className="text-lg font-bold text-indigo-600">24/7</div>
//                                 <div className="text-xs text-gray-500">Support</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right side - Compact Login form */}
//                     <div className="lg:w-1/2 px-8  flex flex-col justify-center">
//                         <div className="sm:hidden text-center relative inline-block mb-4">
//                             <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
//                             >
//                                 ZState
//                             </h1>

//                             <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400/20 rounded"></div>
//                             <div className="absolute -bottom-0.5 -right-2 w-2 h-2 bg-blue-400/20 rounded"></div>
//                         </div>
//                         <div className="text-center mb-6">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
//                             <p className="text-gray-500 text-sm">Sign in to access your property dashboard</p>
//                         </div>

//                         {/* Google Login Button */}
//                         <div className="mb-4">
//                             <button
//                                 onClick={handleGoogleLogin}
//                                 disabled={loading}
//                                 className="w-full flex items-center justify-center gap-3 py-3 px-4
//                                          bg-white border border-gray-200 rounded-lg
//                                          hover:border-blue-300 hover:shadow-sm
//                                          active:scale-[0.98] transition-all duration-200
//                                          disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <svg className="w-4 h-4" viewBox="0 0 24 24">
//                                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                 </svg>
//                                 <span className="font-medium text-gray-800 text-sm">
//                                     {loading ? 'Signing in...' : 'Login with Google'}
//                                 </span>
//                             </button>
//                         </div>

//                         {/* Compact Links Section */}
//                         <div className="flex justify-between text-xs mb-4">
//                             <Link
//                                 href="#"
//                                 className="text-gray-500 hover:text-blue-600 hover:underline transition-colors px-2 py-1 rounded hover:bg-blue-50"
//                             >
//                                 Forgot password?
//                             </Link>
//                             <Link
//                                 href="/signup"
//                                 className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50"
//                             >
//                                 Create Account →
//                             </Link>
//                         </div>

//                         {/* Compact Social proof */}
//                         <div className="mb-4">
//                             <div className="flex items-center justify-center gap-3">
//                                 <div className="flex -space-x-2">
//                                     {[1, 2, 3].map((i) => (
//                                         <div key={i} className="w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <p className="text-xs font-medium text-gray-700">Join 15,000+ properties</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Compact Footer */}
//                         <div className="pt-4 border-t border-gray-200">
//                             <p className="text-xs text-gray-400 text-center">
//                                 By continuing, you agree to our{' '}
//                                 <Link href="#" className="text-blue-500 hover:text-blue-600 hover:underline">Terms</Link>
//                                 {' '}&{' '}
//                                 <Link href="#" className="text-blue-500 hover:text-blue-600 hover:underline">Privacy</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Background elements */}
//             <div className="fixed inset-0 -z-10 overflow-hidden">
//                 <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl"></div>
//                 <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-2xl"></div>
//             </div>
//         </div>
//     );
// }


// app/login/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/FBConfig/fbFunctions";
import {
    Sparkles,
    ChevronRight,
    Shield,
    Zap,
    TrendingUp,
    Building2,
    Users,
    Clock,
    Star,
    ArrowRight,
    Fingerprint,
    Globe,
    Cpu,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2
} from "lucide-react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    let router = useRouter();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginWithGoogle();
            localStorage.setItem("userInfo", JSON.stringify({
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.name,
                photoURL: res.user.picture
            }));
            message.success('Login Successful!');
            router.push(`/realstate/${res.user.uid}`);
        } catch (error: any) {
            console.error("Login error:", error);
            message.error(error?.message || "Login failed");
            setLoading(false);
        }
    };

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            message.info("Email login coming soon!");
        }
    };

    const features = [
        { icon: Zap, text: "Real-time sync", color: "text-amber-500", bg: "bg-amber-50" },
        { icon: Shield, text: "Bank-grade security", color: "text-emerald-500", bg: "bg-emerald-50" },
        { icon: TrendingUp, text: "AI-powered insights", color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Background Effects - Same as Hero */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(99,102,241,0.04),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(168,85,247,0.04),transparent_50%)]" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
                <motion.div
                    animate={{
                        x: mousePosition.x - 300,
                        y: mousePosition.y - 300,
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 80 }}
                    className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 blur-3xl pointer-events-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                    {/* Left Column - Branding & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:block"
                    >
                        {/* Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                        >
                            <Sparkles size={12} className="text-purple-500" />
                            <span className="text-xs font-medium text-slate-600 tracking-wide">SECURE ACCESS</span>
                            <ChevronRight size={10} className="text-slate-400" />
                        </motion.div>

                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                ZState
                            </h1>
                            <p className="text-slate-500 mt-2">Intelligent real estate management platform</p>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-bold text-slate-800 mb-3">
                                Welcome Back to{" "}
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Intelligent Real Estate
                                </span>
                            </h2>
                            <p className="text-slate-500">
                                Access your dashboard, manage properties, and close deals faster with AI-powered insights.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {[
                                { value: "15K+", label: "Properties", icon: Building2 },
                                { value: "5K+", label: "Agents", icon: Users },
                                { value: "99.9%", label: "Uptime", icon: Clock },
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <stat.icon size={16} className="text-purple-500 mx-auto mb-1" />
                                    <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                                    <div className="text-xs text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Trust Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-slate-500">Trusted by industry leaders</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-6">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    ZState
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
                            </div>

                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-3">
                                    <Fingerprint size={24} className="text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                                <p className="text-slate-500 text-sm mt-1">Sign in to access your dashboard</p>
                            </div>

                            {/* Google Login Button */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 
                                         bg-white border border-slate-200 rounded-xl 
                                         hover:border-purple-300 hover:shadow-md 
                                         active:scale-[0.98] transition-all duration-200 
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         group mb-6"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium text-slate-700 group-hover:text-purple-600 transition-colors">
                                    {loading ? 'Signing in...' : 'Continue with Google'}
                                </span>
                            </button>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-white text-slate-400">OR</span>
                                </div>
                            </div>

                            {/* Email Login Form */}
                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} className="text-slate-400 hover:text-slate-600" />
                                            ) : (
                                                <Eye size={16} className="text-slate-400 hover:text-slate-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                                        <span className="text-sm text-slate-600">Remember me</span>
                                    </label>
                                    <Link href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                                >
                                    Sign In
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            {/* Mobile Trust Badge */}
                            <div className="lg:hidden mt-6 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500">4.9/5 from 2,500+ reviews</span>
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <p className="text-center text-xs text-slate-400">
                                    By continuing, you agree to our{" "}
                                    <Link href="#" className="text-purple-500 hover:text-purple-600">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link href="#" className="text-purple-500 hover:text-purple-600">Privacy Policy</Link>
                                </p>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -top-4 -right-4 lg:top-6 lg:right-6 hidden lg:block"
                        >
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-slate-200">
                                <div className="flex items-center gap-2">
                                    <Shield size={14} className="text-emerald-500" />
                                    <span className="text-xs font-medium text-slate-700">Secure Login</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </div>
    );
}