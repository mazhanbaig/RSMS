// // components/sections/HeroSection.tsx
// 'use client';

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import {
//     ArrowRight, Play, Sparkles, Shield, Zap, TrendingUp, Star,
//     ChevronRight, Globe, Award, Rocket, Users
// } from "lucide-react";
// import Button from "../Button";

// export const HeroSection = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [activeWord, setActiveWord] = useState(0);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start start", "end start"]
//     });

//     const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
//     const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

//     // Rotating words for dynamic effect
//     const rotatingWords = ["properties", "clients", "deals", "growth"];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveWord((prev) => (prev + 1) % rotatingWords.length);
//         }, 2000);
//         return () => clearInterval(interval);
//     }, [rotatingWords.length]);

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             setMousePosition({
//                 x: (e.clientX / window.innerWidth - 0.5) * 20,
//                 y: (e.clientY / window.innerHeight - 0.5) * 20
//             });
//         };
//         window.addEventListener("mousemove", handleMouseMove);
//         return () => window.removeEventListener("mousemove", handleMouseMove);
//     }, []);

//     const fadeUp = {
//         hidden: { opacity: 0, y: 30 },
//         visible: { opacity: 1, y: 0 }
//     };

//     const staggerChildren = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1, delayChildren: 0.1 }
//         }
//     };

//     return (
//         <section
//             id="home"
//             ref={containerRef}
//             className="relative min-h-screen w-full overflow-hidden"
//         >
//             {/* Premium Gradient Background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-white to-[#f3e8ff]" />

//             {/* Animated Gradient Mesh */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-full">
//                     <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" />
//                     <div className="absolute bottom-[30%] right-[5%] w-80 h-80 bg-gradient-to-l from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
//                     <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
//                 </div>
//             </div>

//             {/* Floating Particles */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {[...Array(20)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
//                         initial={{
//                             x: Math.random() * window.innerWidth,
//                             y: Math.random() * window.innerHeight,
//                         }}
//                         animate={{
//                             y: [null, -100, -200],
//                             opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                             duration: Math.random() * 5 + 3,
//                             repeat: Infinity,
//                             delay: Math.random() * 5,
//                             ease: "linear",
//                         }}
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                         }}
//                     />
//                 ))}
//             </div>

//             {/* Main Content */}
//             <motion.div
//                 style={{ scale }}
//                 className="relative max-w-6xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center items-center text-center"
//             >
//                 <motion.div
//                     variants={staggerChildren}
//                     initial="hidden"
//                     animate="visible"
//                     className="w-full"
//                 >
//                     {/* Premium Badge with Glow */}
//                     <motion.div
//                         variants={fadeUp}
//                         className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100/50 shadow-lg mb-10 relative group"
//                         whileHover={{ scale: 1.05 }}
//                     >
//                         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                         <span className="relative flex h-3 w-3">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
//                             <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600" />
//                         </span>
//                         <span className="text-sm mt-5 font-semibold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
//                           LAUNCHING SOON — BE THE FIRST TO ACCESS
//                         </span>
//                         <ChevronRight size={14} className="text-purple-500" />
//                     </motion.div>

//                     {/* Dynamic Main Heading */}
//                     <motion.div variants={fadeUp} className="space-y-4">
//                         <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.05]">
//                             <span className="text-slate-900">Manage</span>
//                             <br />
//                             <div className="relative inline-block mt-2">
//                                 <AnimatePresence mode="wait">
//                                     <motion.span
//                                         key={activeWord}
//                                         initial={{ opacity: 0, y: 20, rotateX: -90 }}
//                                         animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                                         exit={{ opacity: 0, y: -20, rotateX: 90 }}
//                                         transition={{ duration: 0.5, type: "spring" }}
//                                         className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap"
//                                         style={{
//                                             backgroundSize: "200% auto",
//                                             animation: "gradient 5s ease infinite"
//                                         }}
//                                     >
//                                         {rotatingWords[activeWord]}
//                                     </motion.span>
//                                 </AnimatePresence>
//                                 <span className="opacity-0">{rotatingWords[activeWord]}{""}</span>
//                                 {/* <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
//                                     {rotatingWords[activeWord]}
//                                 </span> */}
//                                 <span>{""}</span>
//                             </div>
//                             <span className="text-slate-900">{""} faster</span>
//                         </h1>
//                     </motion.div>

//                     {/* Description with Gradient */}
//                     <motion.p
//                         variants={fadeUp}
//                         className="text-lg sm:text-xl text-slate-500 mt-8 leading-relaxed max-w-2xl mx-auto"
//                     >
//                         Transform your real estate workflow with our AI-powered platform.
//                         <span className="block mt-1 text-purple-600 font-medium">
//                             Join 5,000+ agents already scaling their business.
//                         </span>
//                     </motion.p>

//                     {/* CTA Buttons with Hover Effects */}
//                     <motion.div
//                         variants={fadeUp}
//                         className="flex flex-wrap gap-5 mt-10 justify-center"
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//                             <span className="relative flex items-center gap-2">
//                                 Start Free Trial
//                                 <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />
//                             </span>
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-semibold text-lg hover:border-purple-300 hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-lg"
//                         >
//                             <Play size={18} className="text-purple-500" />
//                             Watch Demo
//                         </motion.button>
//                     </motion.div>

//                     {/* Feature Cards - Interactive */}
//                     <motion.div
//                         variants={fadeUp}
//                         className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16"
//                     >
//                         {[
//                             { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption", color: "from-purple-50 to-purple-100", iconColor: "text-purple-600" },
//                             { icon: Zap, title: "Lightning Fast", desc: "Real-time sync", color: "from-blue-50 to-blue-100", iconColor: "text-blue-600" },
//                             { icon: Award, title: "Award Winning", desc: "Best Real Estate SaaS 2024", color: "from-amber-50 to-amber-100", iconColor: "text-amber-600" },
//                         ].map((feature, i) => (
//                             <motion.div
//                                 key={i}
//                                 whileHover={{ y: -5, scale: 1.02 }}
//                                 className={`relative rounded-2xl p-4 bg-gradient-to-br ${feature.color} border border-white/50 shadow-sm cursor-pointer group`}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className={`p-2 rounded-xl bg-white/80 ${feature.iconColor}`}>
//                                         <feature.icon size={20} />
//                                     </div>
//                                     <div className="text-left">
//                                         <h4 className="font-semibold text-slate-800 text-sm">{feature.title}</h4>
//                                         <p className="text-xs text-slate-500">{feature.desc}</p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>

//                     {/* Stats with Animated Numbers */}
//                     <motion.div
//                         variants={fadeUp}
//                         className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-100"
//                     >
//                         {[
//                             { value: 5000, label: "Active Agents", suffix: "+", icon: Users },
//                             { value: 98, label: "Satisfaction", suffix: "%", icon: Star },
//                             { value: 2.1, label: "Property Volume", suffix: "B", icon: Globe, prefix: "$" },
//                             { value: 70, label: "Time Saved", suffix: "%", icon: TrendingUp },
//                         ].map((stat, i) => (
//                             <motion.div
//                                 key={i}
//                                 whileHover={{ scale: 1.05 }}
//                                 className="text-center group cursor-pointer"
//                             >
//                                 <div className="flex justify-center mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
//                                     <stat.icon size={20} className="text-purple-500" />
//                                 </div>
//                                 <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                                     {stat.prefix}
//                                     <motion.span
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: 0.5 + i * 0.1 }}
//                                     >
//                                         {stat.value}
//                                     </motion.span>
//                                     {stat.suffix}
//                                 </div>
//                                 <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </motion.div>
//             </motion.div>

//             {/* 3D Floating Elements */}
//             <motion.div
//                 style={{
//                     x: mousePosition.x,
//                     y: mousePosition.y,
//                 }}
//                 className="absolute top-1/4 right-[5%] hidden lg:block pointer-events-none"
//             >
//                 <div className="relative">
//                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-xl" />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <Sparkles size={32} className="text-purple-500" />
//                     </div>
//                 </div>
//             </motion.div>

//             <motion.div
//                 style={{
//                     x: -mousePosition.x,
//                     y: -mousePosition.y,
//                 }}
//                 className="absolute bottom-1/4 left-[5%] hidden lg:block pointer-events-none"
//             >
//                 <div className="relative">
//                     <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-20 blur-xl" />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <Award size={28} className="text-blue-500" />
//                     </div>
//                 </div>
//             </motion.div>

//             {/* Gradient Border Bottom */}
//             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

//             {/* Scroll Indicator with Progress Ring */}
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1.5 }}
//                 className="absolute bottom-8 left-1/2 -translate-x-1/2"
//             >
//                 <motion.div
//                     animate={{ y: [0, 8, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     className="flex flex-col items-center gap-2 cursor-pointer group"
//                     onClick={() => {
//                         document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                 >
//                     <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase group-hover:text-purple-500 transition-colors">
//                         SCROLL
//                     </span>
//                     <div className="relative">
//                         <div className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-purple-400 transition-colors flex justify-center">
//                             <motion.div
//                                 animate={{ y: [0, 12, 0] }}
//                                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//                                 className="w-1 h-2 bg-slate-400 group-hover:bg-purple-500 rounded-full mt-2"
//                             />
//                         </div>
//                     </div>
//                 </motion.div>
//             </motion.div>

//             <style jsx>{`
//                 @keyframes gradient {
//                     0%, 100% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                 }
//                 .animate-gradient {
//                     background-size: 200% auto;
//                     animation: gradient 2s ease infinite;
//                 }
//             `}</style>
//         </section>
//     );
// };








// components/sections/HeroSection.tsx
'use client';

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Shield, Zap, TrendingUp, CheckCircle, Infinity, Target, Layers } from "lucide-react";

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Auto-play background video effect simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-white"
        >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(60deg,#f8fafc_1px,transparent_1px),linear-gradient(-60deg,#f8fafc_1px,transparent_1px)] bg-[size:40px_70px] opacity-40" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.1]"
                    >
                        Real estate
                        <span className="block mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            intelligence,
                        </span>
                        <span className="block">redefined.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-500 mt-6 leading-relaxed max-w-2xl mx-auto"
                    >
                        The complete operating system for modern real estate professionals.
                        Manage clients, properties, and deals with unprecedented clarity and speed.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4 mt-8 justify-center"
                    >
                        <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Start free trial
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-300">
                            <Play size={16} />
                            Watch demo
                        </button>
                    </motion.div>

                    {/* Benefits Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        {[
                            { text: "No credit card required", icon: CheckCircle },
                            { text: "14-day free trial", icon: Infinity },
                            { text: "Cancel anytime", icon: Target },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                                <item.icon size={14} className="text-green-500" />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
                {/* Trust Badge */}
                <div className="flex justify-center mt-6">
                    <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-sm text-slate-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white" />
                            ))}
                        </div>
                        <span>Trusted by <strong className="text-slate-700">5,000+</strong> real estate professionals</span>
                    </div>
                </div>
            </div>

            {/* Simple Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] text-slate-400 tracking-wider">SCROLL</span>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
                        <path d="M8 0L8 22M8 22L2 16M8 22L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400" />
                    </svg>
                </div>
            </motion.div>

            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
        </section>
    );
};