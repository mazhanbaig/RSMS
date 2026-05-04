// components/sections/CTASection.tsx
'use client';

import { useRef, useState } from "react";
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
            className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/20"
        >
            {/* Animated Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-3xl" />

                {/* Animated Particles */}
                {[...Array(20)].map((_, i) => (
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
                        className="absolute w-1 h-1 rounded-full bg-purple-400"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </motion.div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    style={{ scale }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Main CTA Card */}
                    <div className="relative rounded-3xl overflow-hidden">
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

                        {/* Pattern Overlay */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        <div className="relative z-10 p-8 md:p-12 lg:p-16">
                            {/* Premium Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm mx-auto mb-6 w-fit"
                            >
                                <Sparkles size={12} className="text-amber-300" />
                                <span className="text-xs font-medium text-white uppercase tracking-wider">Limited Time Offer</span>
                                <ChevronRight size={10} className="text-white/60" />
                            </motion.div>

                            {/* Animated Gift Icon */}
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
                                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg"
                            >
                                <Gift size={36} className="text-white" />
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-4">
                                Ready to Transform{" "}
                                <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">
                                    Your Business?
                                </span>
                            </h2>

                            <p className="text-indigo-100 text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto">
                                Join 5,000+ real estate professionals who are already saving time, fuel, and increasing their efficiency.
                            </p>

                            {/* Social Proof Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
                                {socialProof.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <stat.icon size={16} className="text-amber-300" />
                                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                                            {stat.suffix && <span className="text-white/80 text-sm">{stat.suffix}</span>}
                                        </div>
                                        <div className="text-xs text-indigo-200">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 justify-center mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push("/register")}
                                    className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-purple-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Free Trial
                                        <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push("/demo")}
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-sm"
                                >
                                    <Calendar size={16} />
                                    Schedule Demo
                                </motion.button>
                            </div>

                            {/* Benefits Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                                {benefits.map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                        className="flex items-center justify-center gap-1.5"
                                    >
                                        <benefit.icon size={12} className={benefit.color} />
                                        <span className="text-xs text-white/80">{benefit.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Email Signup Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-md mx-auto mt-8 pt-6 border-t border-white/20"
                            >
                                <p className="text-center text-sm text-indigo-200 mb-3">
                                    Get early access & exclusive tips
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white text-purple-600 text-sm font-medium hover:bg-indigo-50 transition-all"
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <Check size={14} />
                                                Subscribed!
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <ArrowRight size={12} />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                                <p className="text-center text-xs text-indigo-200/60 mt-3">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -top-4 -right-4 lg:top-6 lg:right-6"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                    ))}
                                </div>
                                <div className="text-xs">
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