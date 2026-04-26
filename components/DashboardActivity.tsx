'use client';

import { type ReactNode } from "react";
import { CalendarClock, MessageCircle, Sparkles, Users } from "lucide-react";
import Button from "@/components/Button";

interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    tag?: string;
    time?: string;
    icon: ReactNode;
    actionLabel?: string;
    action?: () => void;
}

interface DashboardActivityProps {
    latestClient?: any;
    latestProperty?: any;
    nextEvent?: any;
    unreadChats?: number;
    onViewChats?: () => void;
    onViewAllEvents?: () => void;
    onViewClients?: () => void;
}

export default function DashboardActivity({
    latestClient,
    latestProperty,
    nextEvent,
    unreadChats = 0,
    onViewChats,
    onViewAllEvents,
    onViewClients,
}: DashboardActivityProps) {
    const activityItems: ActivityItem[] = [
        {
            id: 'chat-overview',
            title: unreadChats > 0 ? `${unreadChats} unread chat${unreadChats > 1 ? 's' : ''}` : 'Chat inbox clear',
            subtitle: unreadChats > 0 ? 'Respond to pending customer messages' : 'No unread messages',
            icon: <MessageCircle className="h-5 w-5 text-pink-600" />,
            actionLabel: 'View Chats',
            action: onViewChats,
        },
        latestClient && {
            id: `client-${latestClient.id}`,
            title: 'Latest client added',
            subtitle: `${latestClient.firstName || 'Client'} ${latestClient.lastName || ''}`.trim() || 'Unnamed client',
            tag: latestClient.email || latestClient.phone || 'No contact',
            icon: <Users className="h-5 w-5 text-blue-600" />,
            actionLabel: 'View Clients',
            action: onViewClients,
        },
        latestProperty && {
            id: `property-${latestProperty.id}`,
            title: 'Latest property listed',
            subtitle: latestProperty.title || latestProperty.address || latestProperty.name || 'Unnamed property',
            tag: latestProperty.status || latestProperty.type || 'Property listing',
            icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
            actionLabel: 'View Properties',
            action: onViewAllEvents,
        },
        nextEvent && {
            id: `event-${nextEvent.id}`,
            title: 'Next event',
            subtitle: nextEvent.title || 'Upcoming appointment',
            tag: nextEvent.date ? new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date missing',
            time: nextEvent.startTime || 'Time TBD',
            icon: <CalendarClock className="h-5 w-5 text-amber-600" />,
            actionLabel: 'View Events',
            action: onViewAllEvents,
        },
    ].filter(Boolean) as ActivityItem[];

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="mt-1 text-sm text-gray-600">Stay on top of the latest leads, listings, and chats.</p>
                </div>
                <Button
                    label="View Activity"
                    variant="theme2"
                    size="sm"
                    onClick={onViewChats ?? onViewAllEvents}
                />
            </div>

            <div className="space-y-3">
                {activityItems.length > 0 ? (
                    activityItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 cursor-pointer"
                            onClick={item.action}
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-50 text-gray-700">
                                    {item.icon}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-sm text-gray-900 truncate">{item.title}</h3>
                                    <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                                    {item.tag && <p className="text-[11px] text-gray-400 mt-1 truncate">{item.tag}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {item.time && <span className="text-xs text-gray-400">{item.time}</span>}
                                {item.actionLabel && (
                                    <span className="text-xs text-purple-600 font-semibold">{item.actionLabel}</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">No recent activity yet.</div>
                )}
            </div>
        </div>
    );
}
