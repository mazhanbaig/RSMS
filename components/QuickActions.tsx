// 'use client';

// import { ChevronRight, Sparkles, UserPlus, Building, HomeIcon, CalendarPlus } from "lucide-react";

// export default function QuickActions({ quickActions, clients, owners, properties, onQuickAction }:any) {
//     return (
//         <div className="relative">
//             <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-amber-100/30 to-rose-100/30 rounded-full blur-2xl"></div>

//             <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
//                 <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
//                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500"></div>
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <div className="flex items-center gap-2 mb-1">
//                                 <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
//                                     <Sparkles className="h-3.5 w-3.5 text-purple-500" />
//                                 </div>
//                                 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Instant Access</span>
//                             </div>
//                             <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
//                             <p className="text-[11px] text-gray-400 mt-0.5">Streamline your workflow</p>
//                         </div>
//                         <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50/80 border border-gray-100">
//                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
//                             <span className="text-[10px] text-gray-500">Ready</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-5">
//                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//                         <button
//                             onClick={() => onQuickAction(quickActions[0].path)}
//                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-blue-50/20 border border-gray-100/80 hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-transparent group-hover:from-blue-600/5 transition-all duration-500"></div>
//                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
//                             <div className="relative mb-3">
//                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
//                                     <UserPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                 </div>
//                             </div>
//                             <div className="relative text-left">
//                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">Add Client</h4>
//                                 <p className="text-[10px] text-gray-400 mt-0.5">Register new client</p>
//                             </div>
//                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                 <ChevronRight className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => onQuickAction(quickActions[1].path)}
//                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-purple-50/20 border border-gray-100/80 hover:border-purple-200/60 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-transparent to-transparent group-hover:from-purple-600/5 transition-all duration-500"></div>
//                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
//                             <div className="relative mb-3">
//                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
//                                     <Building className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                 </div>
//                             </div>
//                             <div className="relative text-left">
//                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-purple-600 transition-colors">Add Owner</h4>
//                                 <p className="text-[10px] text-gray-400 mt-0.5">Register property owner</p>
//                             </div>
//                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                 <ChevronRight className="h-3.5 w-3.5 text-purple-500" strokeWidth={2} />
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => onQuickAction(quickActions[2].path)}
//                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50/20 border border-gray-100/80 hover:border-emerald-200/60 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-transparent to-transparent group-hover:from-emerald-600/5 transition-all duration-500"></div>
//                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
//                             <div className="relative mb-3">
//                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
//                                     <HomeIcon className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                 </div>
//                             </div>
//                             <div className="relative text-left">
//                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">Add Property</h4>
//                                 <p className="text-[10px] text-gray-400 mt-0.5">List new property</p>
//                             </div>
//                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                 <ChevronRight className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
//                             </div>
//                         </button>

//                         <button
//                             onClick={() => onQuickAction(quickActions[3].path)}
//                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-amber-50/20 border border-gray-100/80 hover:border-amber-200/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-transparent to-transparent group-hover:from-amber-600/5 transition-all duration-500"></div>
//                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
//                             <div className="relative mb-3">
//                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 group-hover:shadow-xl group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-105">
//                                     <CalendarPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                 </div>
//                             </div>
//                             <div className="relative text-left">
//                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-amber-600 transition-colors">Create Event</h4>
//                                 <p className="text-[10px] text-gray-400 mt-0.5">Schedule appointment</p>
//                             </div>
//                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                 <ChevronRight className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
//                             </div>
//                         </button>
//                     </div>

//                     <div className="mt-5 pt-3 border-t border-gray-100/80 flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-1 h-1 rounded-full bg-blue-400"></div>
//                                 <span className="text-[10px] font-medium text-gray-500">Clients</span>
//                                 <span className="text-[11px] font-semibold text-gray-700">{clients}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <div className="w-1 h-1 rounded-full bg-purple-400"></div>
//                                 <span className="text-[10px] font-medium text-gray-500">Owners</span>
//                                 <span className="text-[11px] font-semibold text-gray-700">{owners}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
//                                 <span className="text-[10px] font-medium text-gray-500">Properties</span>
//                                 <span className="text-[11px] font-semibold text-gray-700">{properties}</span>
//                             </div>
//                         </div>
//                         <div className="text-[9px] text-gray-300 font-mono">
//                             {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import { UserPlus, Building, HomeIcon, CalendarPlus, Sparkles, TrendingUp } from "lucide-react";

export default function QuickActions({ quickActions, clients, owners, properties, onQuickAction }: any) {
    const actions = [
        { icon: UserPlus, label: "New Client", desc: "Register client", gradient: "from-blue-500 to-cyan-500", path: quickActions[0]?.path },
        { icon: Building, label: "New Owner", desc: "Add owner", gradient: "from-purple-500 to-pink-500", path: quickActions[1]?.path },
        { icon: HomeIcon, label: "New Property", desc: "List property", gradient: "from-emerald-500 to-teal-500", path: quickActions[2]?.path },
        { icon: CalendarPlus, label: "New Event", desc: "Schedule", gradient: "from-orange-500 to-red-500", path: quickActions[3]?.path },
    ];

    return (
        <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10 rounded-2xl blur-3xl"></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur">
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                                <p className="text-sm text-gray-400">Streamlined workflow</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur">
                            <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-xs text-gray-300">Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {actions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => onQuickAction(action.path)}
                                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-left overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity`}></div>

                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} p-2.5 mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <action.icon className="h-full w-full text-white" />
                                </div>

                                <h3 className="font-semibold text-white text-sm mb-1">{action.label}</h3>
                                <p className="text-xs text-gray-400">{action.desc}</p>

                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-white text-xs">→</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span className="text-xs text-gray-400">Clients</span>
                                <span className="text-sm font-bold text-white">{clients}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                <span className="text-xs text-gray-400">Owners</span>
                                <span className="text-sm font-bold text-white">{owners}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <span className="text-xs text-gray-400">Properties</span>
                                <span className="text-sm font-bold text-white">{properties}</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}