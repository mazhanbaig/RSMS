'use client';

import { ChevronRight, Sparkles, UserPlus, Building, HomeIcon, CalendarPlus } from "lucide-react";

export default function QuickActions({ quickActions, clients, owners, properties, onQuickAction }: any) {
    return (
        <div className="relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-amber-100/30 to-rose-100/30 rounded-full blur-2xl"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
                <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                                    <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Instant Access</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50/80 border border-gray-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-[10px] text-gray-500">Ready</span>
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <button
                            onClick={() => onQuickAction(quickActions[0].path)}
                            className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-blue-50/20 border border-gray-100/80 hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-transparent group-hover:from-blue-600/5 transition-all duration-500"></div>
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            {/* <div className="relative mb-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                                    <UserPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
                                </div>
                            </div> */}
                            <div className="relative text-left">
                                <h4 className="font-bold  text-sm text-blue-600 transition-colors">Add Client</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5">Register new client</p>
                            </div>
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                                <ChevronRight className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
                            </div>
                        </button>

                        <button
                            onClick={() => onQuickAction(quickActions[1].path)}
                            className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-purple-50/20 border border-gray-100/80 hover:border-purple-200/60 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-transparent to-transparent group-hover:from-purple-600/5 transition-all duration-500"></div>
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            {/* <div className="relative mb-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
                                    <Building className="h-4 w-4 text-white" strokeWidth={1.8} />
                                </div>
                            </div> */}
                            <div className="relative text-left">
                                <h4 className="font-bold text-sm text-purple-600 transition-colors">Add Owner</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5">Register property owner</p>
                            </div>
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                                <ChevronRight className="h-3.5 w-3.5 text-purple-500" strokeWidth={2} />
                            </div>
                        </button>

                        <button
                            onClick={() => onQuickAction(quickActions[2].path)}
                            className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50/20 border border-gray-100/80 hover:border-emerald-200/60 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-transparent to-transparent group-hover:from-emerald-600/5 transition-all duration-500"></div>
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            {/* <div className="relative mb-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                                    <HomeIcon className="h-4 w-4 text-white" strokeWidth={1.8} />
                                </div>
                            </div> */}
                            <div className="relative text-left">
                                <h4 className="font-bold  text-sm text-emerald-600 transition-colors">Add Property</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5">List new property</p>
                            </div>
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                                <ChevronRight className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                            </div>
                        </button>

                        <button
                            onClick={() => onQuickAction(quickActions[3].path)}
                            className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-amber-50/20 border border-gray-100/80 hover:border-amber-200/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-transparent to-transparent group-hover:from-amber-600/5 transition-all duration-500"></div>
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            {/* <div className="relative mb-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 group-hover:shadow-xl group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-105">
                                    <CalendarPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
                                </div>
                            </div> */}
                            <div className="relative text-left">
                                <h4 className="font-bold text-sm text-amber-600 transition-colors">Create Event</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5">Schedule appointment</p>
                            </div>
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                                <ChevronRight className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}