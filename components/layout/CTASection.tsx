// components/sections/CTASection.tsx
'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Gift,
    Sparkles,
    ChevronRight,
    CheckCircle2,
    Rocket,
    Clock,
    Shield,
    Star,
    Zap,
    Users,
    TrendingUp,
    Calendar,
    Check
} from "lucide-react";
import { useRouter } from "next/navigation";

const benefits = [
    { icon: CheckCircle2, text: "14-day free trial", color: "text-emerald-300" },
    { icon: CheckCircle2, text: "No credit card required", color: "text-emerald-300" },
    { icon: CheckCircle2, text: "Cancel anytime", color: "text-emerald-300" },
    { icon: Shield, text: "Enterprise security", color: "text-blue-300" },
    { icon: Zap, text: "24/7 priority support", color: "text-amber-300" },
    { icon: TrendingUp, text: "AI-powered insights", color: "text-purple-300" },
];

const socialProof = [
    { label: "Active users", value: "5,000+", icon: Users },
    { label: "Customer satisfaction", value: "4.9", icon: Star, suffix: "/5" },
    { label: "Average time to value", value: "14", icon: Clock, suffix: "days" },
];

export const CTASection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
            setEmail("");
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/20"
        >
            {/* Animated Background - Responsive */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-40 sm:w-56 md:w-64 lg:w-80 h-40 sm:h-56 md:h-64 lg:h-80 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-3xl" />

                {/* Animated Particles - Fewer on mobile */}
                {[...Array(isMobile ? 8 : 20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.sin(i) * 50, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-purple-400"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </motion.div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    style={{ scale }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Main CTA Card */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mx-4 sm:mx-0">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />

                        {/* Animated Gradient Overlay */}
                        <motion.div
                            animate={{
                                background: [
                                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                ]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute inset-0"
                        />

                        {/* Pattern Overlay - Responsive */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                                backgroundSize: '30px 30px'
                            }}
                        />

                        <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:p-16">
                            {/* Premium Badge - Responsive */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm mx-auto mb-4 sm:mb-6 w-fit"
                            >
                                <Sparkles size={10} className="text-amber-300 sm:w-3 sm:h-3" />
                                <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-wider">Limited Time Offer</span>
                                <ChevronRight size={8} className="text-white/60 sm:w-2.5 sm:h-2.5" />
                            </motion.div>

                            {/* Animated Gift Icon - Responsive */}
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg"
                            >
                                <Gift size={24} className="text-white sm:w-7 sm:h-7 md:w-9 md:h-9" />
                            </motion.div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-3 sm:mb-4 px-2">
                                Ready to Transform{" "}
                                <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent whitespace-nowrap">
                                    Your Business?
                                </span>
                            </h2>

                            <p className="text-indigo-100 text-sm sm:text-base md:text-lg lg:text-xl text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                                Join 5,000+ real estate professionals who are already saving time, fuel, and increasing their efficiency.
                            </p>

                            {/* Social Proof Stats - Responsive Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
                                {socialProof.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                                            <stat.icon size={12} className="text-amber-300 sm:w-4 sm:h-4" />
                                            <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
                                            {stat.suffix && <span className="text-white/80 text-[10px] sm:text-xs">{stat.suffix}</span>}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-indigo-200">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Buttons - Responsive */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4 sm:px-0">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push("/register")}
                                    className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-purple-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-sm sm:text-base"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Free Trial
                                        <Rocket size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform sm:w-4 sm:h-4" />
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push("/demo")}
                                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-sm text-sm sm:text-base"
                                >
                                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                                    Schedule Demo
                                </motion.button>
                            </div>

                            {/* Benefits Grid - Responsive */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 max-w-3xl mx-auto">
                                {benefits.map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                        className="flex items-center justify-center gap-1 sm:gap-1.5"
                                    >
                                        <benefit.icon size={10} className={`${benefit.color} sm:w-3 sm:h-3`} />
                                        <span className="text-[9px] sm:text-xs text-white/80 text-center">{benefit.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Email Signup Form - Responsive */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-md mx-auto mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 px-4 sm:px-0"
                            >
                                <p className="text-center text-xs sm:text-sm text-indigo-200 mb-2 sm:mb-3">
                                    Get early access & exclusive tips
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all text-xs sm:text-sm"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 rounded-full bg-white text-purple-600 text-xs sm:text-sm font-medium hover:bg-indigo-50 transition-all"
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <Check size={12} />
                                                Subscribed!
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <ArrowRight size={10} />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                                <p className="text-center text-[10px] sm:text-xs text-indigo-200/60 mt-2 sm:mt-3">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating Trust Badge - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 lg:top-6 lg:right-6"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg border border-white/20">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="flex -space-x-1">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-4 h-4 sm:w-5 sm:h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                    ))}
                                </div>
                                <div className="text-[9px] sm:text-xs">
                                    <span className="font-semibold text-slate-700">Trusted by</span>
                                    <span className="text-purple-600 font-bold ml-1">5,000+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};