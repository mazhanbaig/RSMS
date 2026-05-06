'use client';

import { motion } from "framer-motion";
import { ChevronRight, Users, Mail, Phone, Calendar, Star, TrendingUp } from "lucide-react";
import Button from "@/components/Button";

export default function RecentClients({ clients, userUid, onViewAll, onNavigate }: any) {
    const recentClients = clients.slice(-2).reverse();

    const getActivityLevel = (client: any) => {
        if (client.lastContact) {
            const daysSince = Math.floor((Date.now() - new Date(client.lastContact).getTime()) / (1000 * 60 * 60 * 24));
            if (daysSince <= 7) return { label: 'Active', color: 'from-emerald-500 to-teal-500' };
            if (daysSince <= 30) return { label: 'Engaged', color: 'from-amber-500 to-orange-500' };
        }
        return { label: 'New', color: 'from-indigo-500 to-purple-500' };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-2"
                        >
                            <Users size={10} className="text-indigo-500" />
                            <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Client Relations</span>
                        </motion.div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Recent Clients
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Your newest connections</p>
                    </div>
                    <Button
                        label="All Clients"
                        variant="theme2"
                        size="sm"
                        onClick={onViewAll}
                    />
                </div>
            </div>

            {/* Clients List */}
            <div className="divide-y divide-slate-50">
                {recentClients.length > 0 ? (
                    recentClients.map((client: any, idx: number) => {
                        const activity = getActivityLevel(client);
                        return (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ x: 4 }}
                                onClick={() => onNavigate(client.id)}
                                className="group relative px-5 py-4 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent cursor-pointer transition-all duration-300"
                            >
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                                            <span className="text-white font-bold text-lg">
                                                {client.firstName?.charAt(0) || client.email?.charAt(0)?.toUpperCase() || 'C'}
                                            </span>
                                        </div>
                                        {/* Activity Badge */}
                                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-r ${activity.color} border-2 border-white shadow-sm`} />
                                    </div>

                                    {/* Client Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                                                {client.firstName?.slice(0, 30) || 'Unknown'} {client.lastName || ''}
                                            </h3>
                                            <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gradient-to-r ${activity.color} text-white`}>
                                                {activity.label}
                                            </span>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                            {client.email && (
                                                <div className="flex items-center gap-1">
                                                    <Mail size={10} className="text-slate-300" />
                                                    <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                                                        {client.email}
                                                    </span>
                                                </div>
                                            )}
                                            {client.phone && (
                                                <div className="flex items-center gap-1">
                                                    <Phone size={10} className="text-slate-300" />
                                                    <span className="text-[10px] text-slate-500">
                                                        {client.phone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Interest/Preference Tags */}
                                        {client.preferences?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {client.preferences.slice(0, 2).map((pref: string, i: number) => (
                                                    <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                                        {pref}
                                                    </span>
                                                ))}
                                                {client.preferences.length > 2 && (
                                                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">
                                                        +{client.preferences.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Chevron */}
                                    <div className="flex-shrink-0 flex items-center">
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Hover Gradient Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 px-5">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 mb-4"
                        >
                            <Users size={28} className="text-indigo-400" />
                        </motion.div>
                        <p className="text-slate-500 font-medium">No clients yet</p>
                        <p className="text-xs text-slate-400 mt-1">Add your first client to get started</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}