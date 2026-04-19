'use client';

import { useEffect, useState } from 'react';
import { Plus, Home, Users, Trash2, Edit3, LogIn, LogOut, Clock, TrendingUp } from 'lucide-react';

export interface ActivityItem {
    id: string;
    type: 'property_added' | 'client_added' | 'property_deleted' | 'property_updated' | 'client_updated' | 'event_created' | 'login' | 'logout';
    description: string;
    title: string;
    timestamp: Date;
    metadata?: {
        itemId?: string;
        itemName?: string;
        [key: string]: any;
    };
}

interface ActivityLogProps {
    activities: ActivityItem[];
    maxDisplay?: number;
    onViewAll?: () => void;
}

export default function ActivityLog({ activities, maxDisplay = 5, onViewAll }: ActivityLogProps) {
    const [displayedActivities, setDisplayedActivities] = useState<ActivityItem[]>([]);

    useEffect(() => {
        const sorted = [...activities].sort((a, b) => {
            const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime();
            const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime();
            return timeB - timeA;
        });
        setDisplayedActivities(sorted.slice(0, maxDisplay));
    }, [activities, maxDisplay]);

    const getActivityIcon = (type: ActivityItem['type']) => {
        const iconClass = 'w-4 h-4';
        switch (type) {
            case 'property_added':
                return <Plus className={`${iconClass} text-green-600`} />;
            case 'property_deleted':
                return <Trash2 className={`${iconClass} text-red-600`} />;
            case 'property_updated':
                return <Edit3 className={`${iconClass} text-blue-600`} />;
            case 'client_added':
                return <Users className={`${iconClass} text-purple-600`} />;
            case 'client_updated':
                return <Edit3 className={`${iconClass} text-cyan-600`} />;
            case 'event_created':
                return <Clock className={`${iconClass} text-orange-600`} />;
            case 'login':
                return <LogIn className={`${iconClass} text-green-600`} />;
            case 'logout':
                return <LogOut className={`${iconClass} text-gray-600`} />;
            default:
                return <TrendingUp className={`${iconClass} text-gray-600`} />;
        }
    };

    const getActivityColor = (type: ActivityItem['type']) => {
        switch (type) {
            case 'property_added':
                return 'bg-green-50 border-green-200';
            case 'property_deleted':
                return 'bg-red-50 border-red-200';
            case 'property_updated':
                return 'bg-blue-50 border-blue-200';
            case 'client_added':
                return 'bg-purple-50 border-purple-200';
            case 'client_updated':
                return 'bg-cyan-50 border-cyan-200';
            case 'event_created':
                return 'bg-orange-50 border-orange-200';
            case 'login':
            case 'logout':
                return 'bg-gray-50 border-gray-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    const formatTime = (timestamp: Date | string) => {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Activity Log</h2>
                {displayedActivities.length > 0 && (
                    <div className="text-xs font-medium text-gray-500">Latest</div>
                )}
            </div>

            <div className="space-y-3">
                {displayedActivities.length > 0 ? (
                    <>
                        {displayedActivities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:shadow-sm ${getActivityColor(activity.type)}`}
                            >
                                <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-white border border-gray-200">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                        {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatTime(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {activities.length > maxDisplay && (
                            <button
                                onClick={onViewAll}
                                className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 text-purple-600 font-medium text-sm transition-colors border border-purple-200"
                            >
                                View All Activities
                            </button>
                        )}
                    </>
                ) : (
                    <div className="py-6 text-center">
                        <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">No activity yet</p>
                        <p className="text-xs text-gray-500 mt-1">Your activity will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}
