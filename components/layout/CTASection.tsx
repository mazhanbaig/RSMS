// components/sections/CTASection.tsx
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import Button from "../Button";

export const CTASection = () => {
    return (
        <section className="py-28 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-5xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-12 text-center"
                >
                    <div className="relative z-10">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center"
                        >
                            <Gift size={32} className="text-white" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
                            Join 5,000+ real estate professionals who are already saving time, fuel, and increasing their efficiency.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                label="Start Free Trial"
                                variant="theme2"
                                classNameC="bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
                                icon={<ArrowRight size={18} />}
                            />
                            <Button
                                label="Schedule Demo"
                                variant="theme"
                                classNameC="border-white text-white hover:bg-white/10"
                            />
                        </div>
                        <p className="text-purple-200 text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};