// components/sections/PricingSection.tsx
'use client';

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const plans = [
    { name: "Starter", price: "$29", period: "month", features: ["100 Clients", "Basic Analytics", "Email Support", "5 Properties"], popular: false, button: "Get Started" },
    { name: "Professional", price: "$79", period: "month", features: ["Unlimited Clients", "Advanced Analytics", "Priority Support", "Virtual Tours", "CRM Automation"], popular: true, button: "Start Free Trial" },
    { name: "Enterprise", price: "Custom", period: "contact", features: ["Unlimited Everything", "Dedicated Manager", "API Access", "White Label", "SLA"], popular: false, button: "Contact Sales" },
];

export const PricingSection = () => {
    return (
        <section id="pricing" className="py-28 bg-white">
            <div className="max-w-6xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        Simple, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Transparent</span> Pricing
                    </h2>
                    <p className="text-slate-500 mt-4">No hidden fees. Upgrade or cancel anytime.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className={`relative rounded-2xl p-8 border transition-all duration-300 ${plan.popular
                                    ? "bg-white border-purple-200 shadow-xl"
                                    : "bg-white border-slate-100 shadow-sm hover:shadow-lg"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                            <div className="mt-4">
                                <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                                <span className="text-slate-400">/{plan.period}</span>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all ${plan.popular
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:shadow-xl"
                                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}>
                                {plan.button}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};