// components/SmartCalendar.tsx
'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Bell, CheckCircle, Video, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function SmartCalendar({ events, onViewEvent }: any) {
    const [view, setView] = useState('dayGridMonth'); // ✅ FIXED: Use correct view names
    const [upcomingReminders, setUpcomingReminders] = useState(events?.slice(0, 3) || []);

    // ✅ Correct view names for FullCalendar
    const viewNames = {
        month: 'dayGridMonth',
        week: 'timeGridWeek',
        day: 'timeGridDay'
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Smart Calendar</h2>
                        <p className="text-xs text-slate-400">Your schedule at a glance</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('dayGridMonth')}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${view === 'dayGridMonth' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setView('timeGridWeek')}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${view === 'timeGridWeek' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setView('timeGridDay')}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${view === 'timeGridDay' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Day
                        </button>
                    </div>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={view}
                    headerToolbar={false} // Hide default toolbar since we have custom buttons
                    events={events?.map((e: any) => ({
                        id: e.id,
                        title: e.title,
                        start: e.date,
                        end: e.endDate || e.date,
                        backgroundColor: '#8b5cf6',
                        borderColor: '#8b5cf6',
                        textColor: 'white',
                        extendedProps: {
                            location: e.address,
                            isVirtual: e.isVirtual,
                            attendees: e.attendees
                        }
                    })) || []}
                    height={500}
                    editable={true}
                    selectable={true}
                    eventClick={(info) => {
                        const eventId = info.event.id;
                        onViewEvent(eventId);
                    }}
                    dayMaxEvents={3}
                    locale="en"
                    buttonText={{
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day'
                    }}
                />
            </div>

            {/* Upcoming Reminders */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="h-5 w-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-slate-800">Upcoming</h2>
                </div>

                <div className="space-y-3 max-h-[450px] overflow-y-auto">
                    {upcomingReminders.length === 0 ? (
                        <div className="text-center py-8">
                            <CalendarIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">No upcoming events</p>
                        </div>
                    ) : (
                        upcomingReminders.map((reminder: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => onViewEvent(reminder.id)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center border border-indigo-100">
                                        <span className="text-lg font-bold text-indigo-600">
                                            {reminder.date ? new Date(reminder.date).getDate() : '??'}
                                        </span>
                                        <span className="text-[8px] text-slate-500 uppercase">
                                            {reminder.date ? new Date(reminder.date).toLocaleString('default', { month: 'short' }) : ''}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">{reminder.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={10} className="text-slate-400" />
                                            <span className="text-[10px] text-slate-500">{reminder.startTime || 'TBD'}</span>
                                            {reminder.isVirtual ? (
                                                <Video size={10} className="text-indigo-400 ml-1" />
                                            ) : (
                                                <MapPin size={10} className="text-slate-400 ml-1" />
                                            )}
                                        </div>
                                        {reminder.attendees?.length > 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <Users size={10} className="text-slate-400" />
                                                <span className="text-[9px] text-slate-500">{reminder.attendees.length} attendees</span>
                                            </div>
                                        )}
                                    </div>
                                    <CheckCircle size={16} className="text-slate-300 flex-shrink-0" />
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}