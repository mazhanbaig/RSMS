// components/sections/HowItWorks.tsx
'use client';

import { useRef, useState } from "react";
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
            className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/20"
        >
            {/* Animated Background */}
            <motion.div
                style={{ y: backgroundY, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-200/10 to-rose-200/10 rounded-full blur-3xl" />

                {/* Connecting Line Pattern */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05 }}>
                    <defs>
                        <pattern id="step-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="currentColor" className="text-purple-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#step-pattern)" />
                </svg>

                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
                    >
                        <Sparkles size={12} className="text-purple-500" />
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Getting Started</span>
                        <ChevronRight size={10} className="text-slate-400" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Simple{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            4-Step
                        </span>{" "}
                        Process
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                        From sign-up to closing deals in record time
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    style={{ scale }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            onHoverStart={() => setActiveStep(idx)}
                            onHoverEnd={() => setActiveStep(null)}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-full">
                                {/* Card Glow Effect */}
                                <motion.div
                                    animate={{ opacity: activeStep === idx ? 1 : 0 }}
                                    className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                                />

                                <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Number Badge */}
                                    <motion.div
                                        animate={{
                                            rotate: activeStep === idx ? [0, 5, -5, 0] : 0,
                                            scale: activeStep === idx ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md mb-4`}
                                    >
                                        <span className="text-white font-bold text-2xl">{step.number}</span>
                                    </motion.div>

                                    <h3 className="font-bold text-slate-800 text-xl mb-2">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>

                                    {/* Time Estimate Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="mt-4 pt-3 border-t border-slate-100"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-slate-400" />
                                                <span className="text-xs text-slate-400">{step.timeEstimate}</span>
                                            </div>
                                            <motion.div
                                                animate={{ x: activeStep === idx ? 5 : 0 }}
                                                className="text-slate-300 group-hover:text-purple-500 transition-colors"
                                            >
                                                <ArrowRight size={14} />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Expanded Details on Hover */}
                                    <AnimatePresence>
                                        {activeStep === idx && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4 pt-3 border-t border-slate-100 overflow-hidden"
                                            >
                                                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                                                    {step.longDescription}
                                                </p>
                                                <div className="space-y-1.5">
                                                    {step.metrics.map((metric, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                                            <CheckCircle2 size={10} className={step.iconColor} />
                                                            {metric}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Connector Line (Desktop) */}
                            {idx < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Success Metrics Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative mb-16"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Target size={20} className="text-purple-500" />
                                <h3 className="text-xl font-bold text-slate-800">Proven Results</h3>
                            </div>
                            <p className="text-sm text-slate-500">Real metrics from our community of successful agents</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {successMetrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            {metric.value}
                                        </span>
                                        <span className="text-sm text-slate-400">{metric.unit}</span>
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">{metric.label}</div>
                                    <motion.div
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`text-xs font-medium mt-2 ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}
                                    >
                                        {metric.change} improvement
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Video Demo CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-px">
                        <div className="bg-white rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                                        <Play size={20} className="text-white ml-0.5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">See it in action</h4>
                                        <p className="text-sm text-slate-500">Watch how top agents close deals 2x faster</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    Watch demo
                                    <ArrowRight size={14} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-6 border-t border-slate-200"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                            ))}
                        </div>
                        <span className="text-xs text-slate-500">
                            Join <span className="font-semibold text-slate-700">5,000+</span> successful agents
                        </span>
                    </div>

                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-500" />
                        <span className="text-xs text-slate-500">Rated 4.9/5 on G2</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};