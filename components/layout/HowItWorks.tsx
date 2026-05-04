// components/sections/HowItWorks.tsx
'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Shield,
    Users,
    Eye,
    Trophy,
    Sparkles,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    Clock,
    Zap,
    Target,
    Rocket,
    BarChart3,
    Star,
    Play
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Onboard",
        description: "Create your account and set up your professional profile in minutes",
        longDescription: "Get started with zero friction. Our intelligent onboarding adapts to your unique workflow, importing existing data and configuring preferences automatically.",
        icon: Shield,
        color: "from-indigo-500 to-purple-500",
        lightColor: "from-indigo-50 to-purple-50",
        iconColor: "text-indigo-500",
        metrics: ["< 5 min setup", "No credit card required", "Guided tour included"],
        timeEstimate: "5 minutes"
    },
    {
        number: "02",
        title: "Organize",
        description: "Add clients, list properties, and configure your workflow",
        longDescription: "Centralize all your data in one intelligent hub. Import contacts, sync calendars, and let our AI organize your pipeline automatically.",
        icon: Users,
        color: "from-purple-500 to-pink-500",
        lightColor: "from-purple-50 to-pink-50",
        iconColor: "text-purple-500",
        metrics: ["Bulk import tools", "Smart tagging", "Custom pipelines"],
        timeEstimate: "15 minutes"
    },
    {
        number: "03",
        title: "Engage",
        description: "Show properties virtually, track interests, and automate communications",
        longDescription: "Launch immersive virtual tours, automate follow-ups, and track engagement in real-time. Close deals from anywhere in the world.",
        icon: Eye,
        color: "from-pink-500 to-rose-500",
        lightColor: "from-pink-50 to-rose-50",
        iconColor: "text-pink-500",
        metrics: ["70% faster response", "24/7 engagement", "Smart notifications"],
        timeEstimate: "Real-time"
    },
    {
        number: "04",
        title: "Close",
        description: "Track negotiations, manage documents, and grow your business",
        longDescription: "Streamline negotiations with digital signatures, track document progress, and leverage analytics to optimize your strategy.",
        icon: Trophy,
        color: "from-rose-500 to-orange-500",
        lightColor: "from-rose-50 to-orange-50",
        iconColor: "text-rose-500",
        metrics: ["45% faster close rate", "E-signatures", "Analytics dashboard"],
        timeEstimate: "Instant"
    },
];

const successMetrics = [
    { label: "Average time to first deal", value: "14", unit: "days", change: "-62%", positive: true },
    { label: "User satisfaction", value: "4.9", unit: "/5", change: "+0.4", positive: true },
    { label: "Productivity increase", value: "187", unit: "%", change: "+187%", positive: true },
];

export const HowItWorks = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState<number | null>(null);
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

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/20"
        >
            {/* Animated Background - Responsive */}
            <motion.div
                style={{ y: backgroundY, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-40 sm:w-56 md:w-64 lg:w-80 h-40 sm:h-56 md:h-64 lg:h-80 bg-gradient-to-r from-pink-200/10 to-rose-200/10 rounded-full blur-3xl" />

                {/* Grid Pattern - Responsive */}
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
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Getting Started</span>
                        <ChevronRight size={10} className="text-slate-400 hidden sm:inline" />
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
                        Simple{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            4-Step
                        </span>{" "}
                        Process
                    </h2>
                    <p className="text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg px-4">
                        From sign-up to closing deals in record time
                    </p>
                </motion.div>

                {/* Steps Grid - Responsive */}
                <motion.div
                    style={{ scale }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20"
                >
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            onHoverStart={() => !isMobile && setActiveStep(idx)}
                            onHoverEnd={() => !isMobile && setActiveStep(null)}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-full">
                                {/* Card Glow Effect */}
                                <motion.div
                                    animate={{ opacity: activeStep === idx && !isMobile ? 1 : 0 }}
                                    className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                                />

                                <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Number Badge - Responsive */}
                                    <motion.div
                                        animate={{
                                            rotate: activeStep === idx && !isMobile ? [0, 5, -5, 0] : 0,
                                            scale: activeStep === idx && !isMobile ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md mb-3 sm:mb-4`}
                                    >
                                        <span className="text-white font-bold text-xl sm:text-2xl">{step.number}</span>
                                    </motion.div>

                                    <h3 className="font-bold text-slate-800 text-lg sm:text-xl mb-1.5 sm:mb-2">{step.title}</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.description}</p>

                                    {/* Time Estimate Badge - Responsive */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 sm:gap-1.5">
                                                <Clock size={10} className="text-slate-400 sm:w-3 sm:h-3" />
                                                <span className="text-[10px] sm:text-xs text-slate-400">{step.timeEstimate}</span>
                                            </div>
                                            <motion.div
                                                animate={{ x: activeStep === idx && !isMobile ? 5 : 0 }}
                                                className="text-slate-300 group-hover:text-purple-500 transition-colors"
                                            >
                                                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Expanded Details on Hover - Responsive */}
                                    <AnimatePresence>
                                        {(activeStep === idx || (isMobile && activeStep === idx)) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 overflow-hidden"
                                            >
                                                <p className="text-[10px] sm:text-xs text-slate-600 mb-2 sm:mb-3 leading-relaxed">
                                                    {step.longDescription}
                                                </p>
                                                <div className="space-y-1 sm:space-y-1.5">
                                                    {step.metrics.map((metric, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs text-slate-500">
                                                            <CheckCircle2 size={8} className={`${step.iconColor} sm:w-2.5 sm:h-2.5`} />
                                                            {metric}
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
                </motion.div>

                {/* Success Metrics Dashboard - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative mb-12 sm:mb-16 px-4 sm:px-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl blur-2xl" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 md:p-8 shadow-sm">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                <Target size={16} className="text-purple-500 sm:w-5 sm:h-5" />
                                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Proven Results</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500">Real metrics from our community of successful agents</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {successMetrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            {metric.value}
                                        </span>
                                        <span className="text-xs sm:text-sm text-slate-400">{metric.unit}</span>
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-500 mt-1">{metric.label}</div>
                                    <motion.div
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-2 ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}
                                    >
                                        {metric.change} improvement
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Video Demo CTA - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="relative px-4 sm:px-0"
                >
                    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl p-px">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
                                        <Play size={16} className="text-white ml-0.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm sm:text-base">See it in action</h4>
                                        <p className="text-xs sm:text-sm text-slate-500">Watch how top agents close deals 2x faster</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                                >
                                    Watch demo
                                    <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Indicators - Responsive */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12 pt-5 sm:pt-6 border-t border-slate-200 px-4"
                >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                            ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500">
                            Join <span className="font-semibold text-slate-700">5,000+</span> successful agents
                        </span>
                    </div>

                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="fill-amber-400 text-amber-400 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                        ))}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Zap size={10} className="text-amber-500 sm:w-3 sm:h-3" />
                        <span className="text-[10px] sm:text-xs text-slate-500">Rated 4.9/5 on G2</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};