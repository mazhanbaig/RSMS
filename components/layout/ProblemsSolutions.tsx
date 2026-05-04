// components/sections/ProblemsSolutions.tsx
'use client';

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Database,
    Video,
    ClipboardCheck,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Clock,
    DollarSign,
    Users,
    Zap,
    Shield,
    Sparkles,
    Star
} from "lucide-react";

const problems = [
    {
        icon: Database,
        problem: "Lost Client Contacts",
        solution: "Centralized Client Database",
        stat: "100% Recovery",
        statIcon: TrendingUp,
        problemDetail: "Contacts scattered across spreadsheets, emails, and sticky notes",
        solutionDetail: "Unified 360° client view with automatic enrichment",
        color: "from-indigo-50 to-purple-50",
        gradient: "from-indigo-500 to-purple-500",
        iconColor: "text-indigo-500",
        borderHover: "hover:border-indigo-200"
    },
    {
        icon: Video,
        problem: "Fuel & Time Waste",
        solution: "Virtual Property Showings",
        stat: "Save 70%",
        statIcon: Clock,
        problemDetail: "Hours lost in traffic between property visits",
        solutionDetail: "Immersive 3D tours and live video walkthroughs",
        color: "from-purple-50 to-pink-50",
        gradient: "from-purple-500 to-pink-500",
        iconColor: "text-purple-500",
        borderHover: "hover:border-purple-200"
    },
    {
        icon: ClipboardCheck,
        problem: "Poor Organization",
        solution: "Structured Workflow",
        stat: "3x Faster",
        statIcon: Zap,
        problemDetail: "Missed follow-ups and lost opportunities",
        solutionDetail: "AI-driven task prioritization and automated sequences",
        color: "from-pink-50 to-rose-50",
        gradient: "from-pink-500 to-rose-500",
        iconColor: "text-pink-500",
        borderHover: "hover:border-pink-200"
    },
    {
        icon: BarChart3,
        problem: "Manual Tracking",
        solution: "Automated CRM",
        stat: "24/7 Automation",
        statIcon: Shield,
        problemDetail: "Endless data entry and report generation",
        solutionDetail: "Real-time analytics with predictive insights",
        color: "from-rose-50 to-orange-50",
        gradient: "from-rose-500 to-orange-500",
        iconColor: "text-rose-500",
        borderHover: "hover:border-rose-200"
    },
];

const additionalMetrics = [
    { label: "Client Satisfaction", value: "98%", change: "+12%", positive: true },
    { label: "Response Time", value: "2.4min", change: "-67%", positive: true },
    { label: "Deal Volume", value: "245%", change: "+145%", positive: true },
];

export const ProblemsSolutions = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/20"
        >
            {/* Animated Background Elements - Responsive sizing */}
            <motion.div
                style={{ y: backgroundY, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-indigo-100/10 to-transparent" />

                {/* Subtle Grid Pattern - Responsive size */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4 sm:mb-6"
                    >
                        <Sparkles size={12} className="text-purple-500" />
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Transformative Solutions</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
                        Solving Real{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                            Challenges
                        </span>
                    </h2>
                    <p className="text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg px-4">
                        The actual obstacles real estate professionals face daily, eliminated by intelligent design
                    </p>
                </motion.div>

                {/* Problem-Solution Cards Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
                    {problems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            onHoverStart={() => !isMobile && setHoveredIndex(idx)}
                            onHoverEnd={() => !isMobile && setHoveredIndex(null)}
                            whileHover={{ y: -5 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Background with Gradient Border */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                            <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ${item.borderHover} overflow-hidden`}>

                                {/* Animated Icon Background - Responsive sizing */}
                                <motion.div
                                    animate={{
                                        scale: hoveredIndex === idx && !isMobile ? [1, 1.2, 1] : 1,
                                        rotate: hoveredIndex === idx && !isMobile ? [0, 10, -10, 0] : 0
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${item.color} w-fit mb-3 sm:mb-4`}
                                >
                                    <item.icon size={20} className={`${item.iconColor} sm:w-6 sm:h-6`} />
                                </motion.div>

                                {/* Problem Section - Responsive text */}
                                <div className="mb-3 sm:mb-4">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                        <XCircle size={12} className="text-red-400 sm:w-3.5 sm:h-3.5" />
                                        <h3 className="font-semibold text-slate-800 text-base sm:text-lg">{item.problem}</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-400 pl-5 sm:pl-6">{item.problemDetail}</p>
                                </div>

                                {/* Arrow Separator - Responsive */}
                                <motion.div
                                    animate={{ x: hoveredIndex === idx && !isMobile ? 5 : 0 }}
                                    className="flex items-center gap-2 my-3 sm:my-4 text-slate-300"
                                >
                                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                                </motion.div>

                                {/* Solution Section - Responsive */}
                                <div className="mb-3 sm:mb-4">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                        <CheckCircle2 size={12} className="text-emerald-400 sm:w-3.5 sm:h-3.5" />
                                        <h3 className="font-semibold text-slate-800 text-base sm:text-lg">{item.solution}</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-500 pl-5 sm:pl-6">{item.solutionDetail}</p>
                                </div>

                                {/* Stat Badge - Responsive positioning */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r ${item.gradient} shadow-sm`}
                                >
                                    <item.statIcon size={10} className="text-white sm:w-3 sm:h-3" />
                                    <span className="text-[10px] sm:text-xs font-bold text-white">{item.stat}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Impact Metrics Section - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative px-4 sm:px-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl blur-2xl" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 md:p-8 shadow-sm">
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Proven Impact, Measured Results</h3>
                            <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Trusted by industry leaders worldwide</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {additionalMetrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        {metric.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-500 mt-1">{metric.label}</div>
                                    <motion.div
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-2 ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}
                                    >
                                        {metric.change} vs last quarter
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Badge - Responsive wrapping */}
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                ))}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-400">
                                <span className="text-slate-600 font-semibold">5,000+</span> firms transformed
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-slate-200" />
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} className="fill-amber-400 text-amber-400 sm:w-3 sm:h-3" />
                                ))}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-400">
                                4.9/5 from <span className="text-slate-600 font-semibold">2,500+</span> reviews
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};