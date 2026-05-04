// components/sections/HeroSection.tsx
'use client';

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Play,
    Sparkles,
    ChevronRight,
    Star,
    Fingerprint,
    Globe,
    Cpu,
    Radar,
    Rocket,
    Calendar,
    UserCheck,
    Building2,
    CircuitBoard,
    Hexagon,
    TrendingUp,
    Shield,
    Zap
} from "lucide-react";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeWord, setActiveWord] = useState<number | null>(null);
    const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);

    let router = useRouter()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const headlineWords = ["Real", "estate", "intelligence,", "orchestrated."];
    const gradientWords = ["intelligence,", "orchestrated."];

    const floatingStats = [
        { value: "73%", label: "faster deal closure", icon: Rocket, delay: 0 },
        { value: "15K+", label: "properties managed", icon: Building2, delay: 0.1 },
        { value: "99.9%", label: "uptime SLA", icon: CircuitBoard, delay: 0.2 },
    ];

    const features = [
        { icon: Zap, text: "Real-time sync", color: "text-amber-500", bg: "bg-amber-50" },
        { icon: Shield, text: "Bank-grade security", color: "text-emerald-500", bg: "bg-emerald-50" },
        { icon: TrendingUp, text: "AI-powered insights", color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30"
        >
            {/* Immersive Light Background Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(99,102,241,0.04),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(168,85,247,0.04),transparent_50%)]" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />

                {/* Interactive Orb - Light Version */}
                <motion.div
                    animate={{
                        x: mousePosition.x - 300,
                        y: mousePosition.y - 300,
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 80 }}
                    className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 blur-3xl pointer-events-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div>
                        {/* Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mt-6 mb-6"
                        >
                            <Sparkles size={12} className="text-purple-500" />
                            <span className="text-xs font-medium text-slate-600 tracking-wide">THE NEW STANDARD</span>
                            <ChevronRight size={10} className="text-slate-400" />
                        </motion.div>

                        {/* Dynamic Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-2"
                        >
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                                {headlineWords.map((word, idx) => (
                                    <motion.span
                                        key={idx}
                                        onHoverStart={() => setActiveWord(idx)}
                                        onHoverEnd={() => setActiveWord(null)}
                                        animate={{
                                            scale: activeWord === idx ? 1.05 : 1,
                                        }}
                                        className={`inline-block mr-4 relative ${gradientWords.includes(word)
                                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                                            : "text-slate-900"
                                            } transition-all duration-200 cursor-default`}
                                    >
                                        {word}
                                        {activeWord === idx && gradientWords.includes(word) && (
                                            <motion.span
                                                layoutId="underline"
                                                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-lg text-slate-500 leading-relaxed mt-6 max-w-lg"
                        >
                            The intelligent operating system for elite real estate professionals.
                            Where data becomes intuition, and intuition becomes action.
                        </motion.p>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push("/login") }
                                className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Today
                                    <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
                            >
                                <Play size={16} className="text-purple-500" />
                                Watch demo
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex items-center gap-6 mt-10"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white shadow-sm" />
                                ))}
                            </div>
                            <div className="text-sm text-slate-400">
                                Trusted by <span className="text-slate-700 font-semibold">5,000+</span> forward-thinking firms
                            </div>
                        </motion.div>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex flex-wrap gap-3 mt-8"
                        >
                            {features.map((feature, idx) => (
                                <div key={idx} className={`flex items-center gap-2 mb-5 px-4 py-2 rounded-full ${feature.bg} border border-slate-100`}>
                                    <feature.icon size={14} className={feature.color} />
                                    <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Interactive Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto">
                            {/* Rotating Rings - Light Version */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="w-full h-full rounded-full border border-slate-200" />
                                <div className="absolute inset-[15%] rounded-full border border-slate-100" />
                                <div className="absolute inset-[30%] rounded-full border border-purple-200" />
                            </motion.div>

                            {/* Central Hub */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onHoverStart={() => setIsHoveringGlobe(true)}
                                onHoverEnd={() => setIsHoveringGlobe(false)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl shadow-purple-500/20 flex items-center justify-center cursor-pointer group"
                            >
                                <Fingerprint size={48} className="text-white" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            </motion.div>

                            {/* Orbiting Nodes - Light Theme */}
                            {[
                                { icon: Radar, angle: 0, delay: 0, label: "Insights" },
                                { icon: Globe, angle: 72, delay: 0.2, label: "Global" },
                                { icon: Cpu, angle: 144, delay: 0.4, label: "Neural" },
                                { icon: UserCheck, angle: 216, delay: 0.6, label: "Trust" },
                                { icon: Calendar, angle: 288, delay: 0.8, label: "Future" },
                            ].map((node, idx) => {
                                const radius = 140;
                                const radian = (node.angle * Math.PI) / 180;
                                const x = Math.cos(radian) * radius;
                                const y = Math.sin(radian) * radius;

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + node.delay, type: "spring" }}
                                        style={{ x, y }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: isHoveringGlobe ? 360 : 0
                                            }}
                                            transition={{ duration: 2 }}
                                            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                                        >
                                            <node.icon size={20} className="text-slate-500 group-hover:text-purple-500 transition-colors" />
                                        </motion.div>
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                            {node.label}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Energy Particles - Light Version */}
                            {[...Array(12)].map((_, i) => {
                                const angle = (i * 30) * Math.PI / 180;
                                const radius = 100;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;

                                return (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.2, 0.6, 0.2],
                                        }}
                                        transition={{
                                            duration: 2 + i * 0.3,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        style={{ x, y }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -top-8 -right-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Hexagon size={12} className="text-purple-500" />
                                <span className="text-xs text-slate-700 font-medium">AI-powered • Real-time</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>


            {/* Gradient Border Bottom - Light */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </section>
    );
};