'use client';

import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, MapPin, Video, Users, Bell, Sparkles } from "lucide-react";
import Button from "@/components/Button";

export default function UpcomingEvents({ events, userUid, onViewAll, onNavigate }: any) {
    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

    const getEventType = (event: any) => {
        if (event.isVirtual) return { label: 'Virtual', color: 'from-indigo-500 to-purple-500', icon: Video };
        if (event.type === 'meeting') return { label: 'Meeting', color: 'from-emerald-500 to-teal-500', icon: Users };
        return { label: 'Showing', color: 'from-amber-500 to-orange-500', icon: MapPin };
    };

    const getTimeRemaining = (date: string) => {
        const eventDate = new Date(date);
        const today = new Date();
        const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return { text: 'Today', color: 'from-red-500 to-pink-500' };
        if (diffDays === 1) return { text: 'Tomorrow', color: 'from-orange-500 to-amber-500' };
        if (diffDays <= 7) return { text: `${diffDays} days`, color: 'from-indigo-500 to-purple-500' };
        return { text: `${Math.ceil(diffDays / 7)} weeks`, color: 'from-slate-500 to-gray-500' };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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
                            <Calendar size={10} className="text-indigo-500" />
                            <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Schedule</span>
                        </motion.div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Upcoming Events
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Your next appointments</p>
                    </div>
                    <Button
                        label="Calendar"
                        variant="theme2"
                        size="sm"
                        onClick={onViewAll}
                    />
                </div>
            </div>

            {/* Events List */}
            <div className="divide-y divide-slate-50">
                {sortedEvents.length > 0 ? (
                    sortedEvents.map((event: any, idx: number) => {
                        const timeRemaining = getTimeRemaining(event.date);
                        const eventDate = new Date(event.date);

                        return (
                            <motion.div
                                key={event.id || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ x: 4 }}
                                onClick={() => onNavigate(event.id)}
                                className="group relative px-5 py-4 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent cursor-pointer transition-all duration-300"
                            >
                                <div className="flex gap-4">
                                    {/* Date Card */}
                                    <div className="flex-shrink-0 text-center">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex flex-col items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                {eventDate.getDate()}
                                            </span>
                                            <span className="text-[9px] font-medium text-slate-400 uppercase">
                                                {eventDate.toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Event Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {event.title}
                                            </h3>
                                        </div>

                                        {/* Time */}
                                        <div className="flex items-center gap-1 mt-1.5">
                                            <Clock size={10} className="text-slate-300" />
                                            <span className="text-[10px] text-slate-500">
                                                {event.startTime || 'TBD'} {event.endTime && `- ${event.endTime}`}
                                            </span>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center gap-1 mt-1">
                                            {event.isVirtual ? (
                                                <>
                                                    <Video size={10} className="text-indigo-400" />
                                                    <span className="text-[10px] text-indigo-500 font-medium">Virtual Meeting</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MapPin size={10} className="text-slate-300" />
                                                    <span className="text-[10px] text-slate-500 line-clamp-1">
                                                        {event.address || event.location || 'Location TBD'}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Attendees Preview */}
                                        {event.attendees?.length > 0 && (
                                            <div className="flex items-center gap-1.5 mt-2">
                                                <div className="flex -space-x-1">
                                                    {event.attendees.slice(0, 3).map((attendee: string, i: number) => (
                                                        <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border border-white flex items-center justify-center">
                                                            <span className="text-[6px] font-bold text-white">
                                                                {attendee.charAt(0)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {event.attendees.length > 3 && (
                                                    <span className="text-[8px] text-slate-400">
                                                        +{event.attendees.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Time Remaining Badge */}
                                    <div className="absolute top-10 right-7 flex-shrink-0 flex flex-col items-end gap-1">
                                        <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${timeRemaining.color} shadow-sm`}>
                                            <span className="text-[8px] font-bold text-white whitespace-nowrap">
                                                {timeRemaining.text}
                                            </span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Reminder Indicator */}
                                {event.reminder && (
                                    <div className="absolute top-3 right-3">
                                        <Bell size={10} className="text-indigo-400 animate-pulse" />
                                    </div>
                                )}

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
                            <Calendar size={28} className="text-indigo-400" />
                        </motion.div>
                        <p className="text-slate-500 font-medium">No upcoming events</p>
                        <p className="text-xs text-slate-400 mt-1">Schedule your first appointment</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}