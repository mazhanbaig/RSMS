'use client';

import { motion } from "framer-motion";
import { ChevronRight, Building2, Mail, Phone, Home, Briefcase, Crown } from "lucide-react";
import Button from "@/components/Button";

export default function RecentOwners({ owners, userUid, onViewAll, onNavigate }: any) {
    const recentOwners = owners.slice(-2).reverse();

    const getPropertyCount = (owner: any) => {
        const count = owner.properties?.length || 0;
        if (count >= 5) return { label: 'VIP', color: 'from-amber-500 to-orange-500', icon: Crown };
        if (count >= 2) return { label: 'Multi', color: 'from-indigo-500 to-purple-500', icon: Briefcase };
        return { label: 'Single', color: 'from-slate-500 to-gray-500', icon: Home };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
                            <Building2 size={10} className="text-indigo-500" />
                            <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Property Owners</span>
                        </motion.div>
                        <p className="text-xs text-slate-400 mt-0.5">Property partners & investors</p>
                    </div>
                    <Button
                        label="All Owners"
                        variant="theme2"
                        size="sm"
                        onClick={onViewAll}
                    />
                </div>
            </div>

            {/* Owners List */}
            <div className="divide-y divide-slate-50">
                {recentOwners.length > 0 ? (
                    recentOwners.map((owner: any, idx: number) => {
                        const ownerType = getPropertyCount(owner);
                        const OwnerIcon = ownerType.icon;
                        return (
                            <motion.div
                                key={owner.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ x: 4 }}
                                onClick={() => onNavigate(owner.id)}
                                className="group relative px-5 py-4 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent cursor-pointer transition-all duration-300"
                            >
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                                            <span className="text-white font-bold text-lg">
                                                {owner.firstName?.charAt(0) || owner.companyName?.charAt(0) || 'O'}
                                            </span>
                                        </div>
                                        {/* Owner Type Badge */}
                                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-r ${ownerType.color} border-2 border-white shadow-sm flex items-center justify-center`}>
                                            <OwnerIcon size={6} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Owner Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                                                {owner.firstName?.slice(0, 30) || 'Unknown'} {owner.lastName || ''}
                                                {owner.companyName && (
                                                    <span className="text-slate-400 text-xs ml-1">({owner.companyName})</span>
                                                )}
                                            </h3>
                                            <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gradient-to-r ${ownerType.color} text-white`}>
                                                {ownerType.label}
                                            </span>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                            {owner.email && (
                                                <div className="flex items-center gap-1">
                                                    <Mail size={10} className="text-slate-300" />
                                                    <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                                                        {owner.email}
                                                    </span>
                                                </div>
                                            )}
                                            {owner.phone && (
                                                <div className="flex items-center gap-1">
                                                    <Phone size={10} className="text-slate-300" />
                                                    <span className="text-[10px] text-slate-500">
                                                        {owner.phone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Property Stats */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Home size={10} className="text-indigo-400" />
                                                <span className="text-[10px] font-medium text-slate-600">
                                                    {owner.properties?.length || 0} properties
                                                </span>
                                            </div>
                                            {owner.totalValue && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[9px] text-slate-400">Value:</span>
                                                    <span className="text-[10px] font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                        ${(owner.totalValue / 1000000).toFixed(1)}M
                                                    </span>
                                                </div>
                                            )}
                                        </div>
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
                            <Building2 size={28} className="text-indigo-400" />
                        </motion.div>
                        <p className="text-slate-500 font-medium">No owners yet</p>
                        <p className="text-xs text-slate-400 mt-1">Add property owners to your network</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}