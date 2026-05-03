'use client';

import { ChevronRight, CalendarClock, Clock, MapPin } from "lucide-react";
import Button from "@/components/Button";

export default function UpcomingEvents({ events, userUid, onViewAll, onNavigate }: any) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
                    <p className="text-sm text-gray-500 mt-1">Upcoming appointments</p>
                </div>
                <Button
                    label="View Calendar"
                    variant="theme2"
                    size="sm"
                    onClick={onViewAll}
                />
            </div>
            <div className="space-y-2">
                {events.slice(0, 3).map((event: any, idx: number) => (
                    <div
                        onClick={() => onNavigate(event.id)}  // Fixed: Proper function call
                        key={event.id || idx} 
                        className="flex items-start gap-3 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"  // Added cursor-pointer
                    >
                        <div className="min-w-[50px] my-auto text-center">
                            <div className="text-xl font-bold text-indigo-600">
                                {event.date ? new Date(event.date).getDate() : '??'}
                            </div>
                            <div className="text-xs text-gray-500">
                                {event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : ''}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{event.startTime || 'TBD'}</span>
                                <MapPin className="h-3 w-3 ml-2" />
                                <span className="truncate">{event.address || 'Location TBD'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}