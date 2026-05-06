'use client';

import { motion } from "framer-motion";
import { Home, ChevronRight, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import PropertyCard from "@/components/PropertyCard";

export default function RecentProperties({ properties, userUid, onViewAll, onNavigate }: any) {
    const recentProperties = properties.slice(-2).reverse();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Header with Premium Badge */}
            <div className="px-5 pt-5 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-2"
                        >
                            <Sparkles size={10} className="text-indigo-500" />
                            <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Latest Listings</span>
                        </motion.div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Recent Properties
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Your newest property additions</p>
                    </div>
                    <Button
                        label="View All"
                        variant="theme2"
                        size="sm"
                        onClick={onViewAll}
                    />
                </div>
            </div>

            {/* Properties List */}
            <div className="divide-y divide-slate-50">
                {recentProperties.length > 0 ? (
                    recentProperties.map((property: any, idx: number) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 4 }}
                            onClick={() => onNavigate(property.id)}
                            className="group relative px-5 py-4 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent cursor-pointer transition-all duration-300"
                        >
                            <PropertyCard
                                property={property}
                                userUid={userUid}
                                variant="list"
                            />

                            {/* Chevron Icon */}
                            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                            </div>

                            {/* Hover Gradient Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 px-5">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 mb-4"
                        >
                            <Home size={28} className="text-indigo-400" />
                        </motion.div>
                        <p className="text-slate-500 font-medium">No properties yet</p>
                        <p className="text-xs text-slate-400 mt-1">Add your first property to get started</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}