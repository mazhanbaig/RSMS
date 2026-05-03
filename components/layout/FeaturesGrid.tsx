// components/sections/FeaturesGrid.tsx
'use client';

import { motion } from "framer-motion";
import { Users, Building, Eye, LineChart } from "lucide-react";

const features = [
    { icon: Users, title: "Client Intelligence", description: "AI-powered CRM that predicts client needs and automates follow-ups", stats: "Smart CRM", color: "from-purple-100 to-blue-100" },
    { icon: Building, title: "Property Hub", description: "Centralized property management with rich media and automated valuations", stats: "Unlimited Listings", color: "from-blue-100 to-cyan-100" },
    { icon: Eye, title: "Immersive Tours", description: "3D virtual walkthroughs and live video showings that save 70% travel time", stats: "Save 70% Fuel", color: "from-cyan-100 to-green-100" },
    { icon: LineChart, title: "Predictive Analytics", description: "Data-driven insights and market forecasts to close deals faster", stats: "Smart Insights", color: "from-green-100 to-emerald-100" },
];

export const FeaturesGrid = () => {
    return (
        <section id="features" className="py-28 bg-white">
            <div className="max-w-7xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        Everything You Need in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">One Ecosystem</span>
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Complete toolkit for modern real estate professionals</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl px-6 pt-6 pb-3 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                <div className="flex gap-3 items-center">
                                    <feature.icon size={28} className="text-purple-600" />
                                    <h3 className="font-bold text-slate-800 text-xl">{feature.title}</h3>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mt-3">{feature.description}</p>
                                <div className="mt-4 pt-3 border-t border-slate-100">
                                    <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        {feature.stats}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};