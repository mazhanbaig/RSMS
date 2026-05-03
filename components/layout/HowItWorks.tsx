// components/sections/HowItWorks.tsx
'use client';

import { motion } from "framer-motion";
import { Shield, Users, Eye, Trophy } from "lucide-react";

const steps = [
    { number: "01", title: "Onboard", description: "Create your account and set up your professional profile in minutes", icon: Shield, color: "from-purple-500 to-blue-500" },
    { number: "02", title: "Organize", description: "Add clients, list properties, and configure your workflow", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "03", title: "Engage", description: "Show properties virtually, track interests, and automate communications", icon: Eye, color: "from-cyan-500 to-green-500" },
    { number: "04", title: "Close", description: "Track negotiations, manage documents, and grow your business", icon: Trophy, color: "from-green-500 to-emerald-500" },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-28 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        Simple <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">4-Step</span> Process
                    </h2>
                    <p className="text-slate-500 mt-4">From sign-up to closing deals in record time</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="text-center"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg mb-4`}>
                                <span className="text-white font-bold text-2xl">{step.number}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">{step.title}</h3>
                            <p className="text-slate-500 text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};