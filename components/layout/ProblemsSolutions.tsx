// components/sections/ProblemsSolutions.tsx
'use client';

import { motion } from "framer-motion";
import { Database, Video, ClipboardCheck, BarChart3 } from "lucide-react";

const problems = [
    { icon: Database, problem: "Lost Client Contacts", solution: "Centralized Client Database", stat: "100% Recovery", color: "from-purple-100 to-blue-100", gradient: "from-purple-500 to-blue-500" },
    { icon: Video, problem: "Fuel & Time Waste", solution: "Virtual Property Showings", stat: "Save 70%", color: "from-blue-100 to-cyan-100", gradient: "from-blue-500 to-cyan-500" },
    { icon: ClipboardCheck, problem: "Poor Organization", solution: "Structured Workflow", stat: "3x Faster", color: "from-cyan-100 to-green-100", gradient: "from-cyan-500 to-green-500" },
    { icon: BarChart3, problem: "Manual Tracking", solution: "Automated CRM", stat: "24/7 Automation", color: "from-green-100 to-emerald-100", gradient: "from-green-500 to-emerald-500" },
];

export const ProblemsSolutions = () => {
    return (
        <section className="py-28 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Pain Points Solved</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
                        Solving Real <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Challenges</span>
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        The actual obstacles real estate professionals face daily, eliminated by intelligent design
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                            <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                                        <item.icon size={22} className="text-purple-600" />
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                                    >
                                        {item.stat}
                                    </motion.div>
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">{item.problem}</h3>
                                <p className="text-sm text-slate-500">→ {item.solution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};