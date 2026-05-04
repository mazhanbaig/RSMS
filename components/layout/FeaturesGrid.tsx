// components/sections/FeaturesGrid.tsx
'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Users,
    Building,
    Eye,
    LineChart,
    Sparkles,
    ChevronRight,
    Shield,
    Zap,
    Clock,
    TrendingUp,
    Star,
    ArrowRight,
    Cpu,
    Globe,
    Lock,
    BarChart3
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Client Intelligence",
        description: "AI-powered CRM that predicts client needs and automates follow-ups",
        stats: "Smart CRM",
        statValue: "+245%",
        statLabel: "engagement",
        detailedFeatures: ["Predictive lead scoring", "Automated nurture sequences", "Sentiment analysis"],
        color: "from-indigo-50 to-purple-50",
        gradient: "from-indigo-500 to-purple-500",
        iconColor: "text-indigo-500"
    },
    {
        icon: Building,
        title: "Property Hub",
        description: "Centralized property management with rich media and automated valuations",
        stats: "Unlimited Listings",
        statValue: "15K+",
        statLabel: "active listings",
        detailedFeatures: ["Automated valuations", "Rich media management", "Document workflow"],
        color: "from-purple-50 to-pink-50",
        gradient: "from-purple-500 to-pink-500",
        iconColor: "text-purple-500"
    },
    {
        icon: Eye,
        title: "Immersive Tours",
        description: "3D virtual walkthroughs and live video showings that save 70% travel time",
        stats: "Save 70% Fuel",
        statValue: "70%",
        statLabel: "time saved",
        detailedFeatures: ["3D virtual tours", "Live video showings", "Interactive floor plans"],
        color: "from-pink-50 to-rose-50",
        gradient: "from-pink-500 to-rose-500",
        iconColor: "text-pink-500"
    },
    {
        icon: LineChart,
        title: "Predictive Analytics",
        description: "Data-driven insights and market forecasts to close deals faster",
        stats: "Smart Insights",
        statValue: "94%",
        statLabel: "accuracy rate",
        detailedFeatures: ["Market forecasting", "Price optimization", "Investment analysis"],
        color: "from-rose-50 to-orange-50",
        gradient: "from-rose-500 to-orange-500",
        iconColor: "text-rose-500"
    },
];

const ecosystemBenefits = [
    { icon: Zap, text: "Real-time sync across all devices", color: "text-amber-500" },
    { icon: Shield, text: "Enterprise-grade security", color: "text-emerald-500" },
    { icon: Globe, text: "Global accessibility", color: "text-blue-500" },
    { icon: Cpu, text: "AI-powered automation", color: "text-purple-500" },
];

export const FeaturesGrid = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/20"
        >
            {/* Animated Background - Responsive */}
            <motion.div
                style={{ y: backgroundY, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-40 right-10 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-indigo-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-to-r from-indigo-100/5 via-purple-100/5 to-pink-100/5 rounded-full blur-3xl" />

                {/* Grid Pattern - Responsive */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
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
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Complete Ecosystem</span>
                        <ChevronRight size={10} className="text-slate-400 hidden sm:inline" />
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
                        Everything You Need in{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-normal">
                            One Ecosystem
                        </span>
                    </h2>
                    <p className="text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg px-4">
                        Complete toolkit for modern real estate professionals
                    </p>
                </motion.div>

                {/* Features Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            onClick={() => !isMobile && setExpandedIndex(expandedIndex === idx ? null : idx)}
                            className="group cursor-pointer"
                        >
                            <div className={`relative bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden`}>
                                {/* Gradient Border on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative p-4 sm:p-5 md:p-6">
                                    {/* Icon with Animation - Responsive */}
                                    <motion.div
                                        animate={{
                                            rotate: expandedIndex === idx && !isMobile ? [0, 360] : 0,
                                            scale: expandedIndex === idx && !isMobile ? [1, 1.1, 1] : 1
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-3 sm:mb-4`}
                                    >
                                        <feature.icon size={22} className={`${feature.iconColor} sm:w-6 sm:h-6 md:w-7 md:h-7`} />
                                    </motion.div>

                                    <h3 className="font-bold text-slate-800 text-lg sm:text-xl mb-1.5 sm:mb-2">{feature.title}</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>

                                    {/* Stats Badge - Responsive */}
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                {feature.stats}
                                            </span>
                                            <motion.div
                                                animate={{ x: expandedIndex === idx && !isMobile ? 5 : 0 }}
                                                className="text-slate-300 group-hover:text-purple-500 transition-colors"
                                            >
                                                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Expanded Details - Responsive */}
                                    <AnimatePresence>
                                        {(expandedIndex === idx || (isMobile && expandedIndex === idx)) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100"
                                            >
                                                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                                                    {feature.statValue}
                                                </div>
                                                <div className="text-[10px] sm:text-xs text-slate-400 mb-2 sm:mb-3">{feature.statLabel}</div>
                                                <div className="space-y-1 sm:space-y-1.5">
                                                    {feature.detailedFeatures.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-600">
                                                            <div className="w-1 h-1 rounded-full bg-purple-400" />
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Ecosystem Benefits Row - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl blur-xl" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 md:p-6 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            {ecosystemBenefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-center gap-1.5 sm:gap-2"
                                >
                                    <benefit.icon size={12} className={`${benefit.color} sm:w-4 sm:h-4`} />
                                    <span className="text-xs sm:text-sm text-slate-600 text-center">{benefit.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Integration Trust Badge - Responsive */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-5 sm:pt-6 border-t border-slate-200 px-4"
                >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                            ))}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500">Integrated with</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                        {["Salesforce", "HubSpot", "Slack", "Zapier"].map((integration, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="text-[10px] sm:text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {integration}
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        <Lock size={10} className="text-emerald-500 sm:w-3 sm:h-3" />
                        <span className="text-[10px] sm:text-xs text-slate-400">SOC 2 Certified</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};