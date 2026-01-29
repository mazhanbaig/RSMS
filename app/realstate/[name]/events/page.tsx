'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { message } from "antd";
import {
    Calendar, Clock, MapPin, Users, Home, DollarSign,
    ArrowLeft, Plus, Filter, Search, ChevronRight,
    PhoneCall, Mail, MessageSquare, CheckCircle,
    XCircle, Building, Key, Target, Zap,
    Bell
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { getData, updateData } from "@/FBConfig/fbFunctions";

interface UserInfo {
    uid: string;
    email?: string;
    name?: string;
    [key: string]: any;
}

interface EventData {
    id: string;
    title: string;
    description: string;
    eventType: 'viewing' | 'meeting' | 'closing' | 'inspection' | 'followup';
    clientName: string;
    clientId: string;
    propertyAddress: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    participants: string[];
    reminderSent: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ClientData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export default function UpcomingEventsPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [events, setEvents] = useState<EventData[]>([]);
    const [clients, setClients] = useState<ClientData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    // Initialize with sample data for immediate display
    const sampleEvents: EventData[] = useMemo(() => [
        {
            id: '1',
            title: 'Property Viewing - Luxury Villa',
            description: 'First viewing with potential buyers',
            eventType: 'viewing',
            clientName: 'John Smith',
            clientId: 'client1',
            propertyAddress: '123 Luxury Lane, Beverly Hills',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            startTime: '14:00',
            endTime: '15:00',
            status: 'confirmed',
            participants: ['John Smith', 'Sarah Smith'],
            reminderSent: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Closing Meeting - Downtown Apartment',
            description: 'Final paperwork and key handover',
            eventType: 'closing',
            clientName: 'Emma Wilson',
            clientId: 'client2',
            propertyAddress: '456 City Center, Downtown',
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '11:30',
            status: 'scheduled',
            participants: ['Emma Wilson', 'Legal Representative'],
            reminderSent: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '3',
            title: 'Property Inspection',
            description: 'Professional inspection before purchase',
            eventType: 'inspection',
            clientName: 'Michael Chen',
            clientId: 'client3',
            propertyAddress: '789 Suburban Street, Green Valley',
            date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '12:00',
            status: 'confirmed',
            participants: ['Michael Chen', 'Inspector'],
            reminderSent: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '4',
            title: 'Client Follow-up',
            description: 'Discuss new property listings',
            eventType: 'followup',
            clientName: 'Robert Johnson',
            clientId: 'client4',
            propertyAddress: 'Virtual Meeting',
            date: new Date(Date.now() + 432000000).toISOString().split('T')[0],
            startTime: '16:00',
            endTime: '16:30',
            status: 'scheduled',
            participants: ['Robert Johnson'],
            reminderSent: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ], []);

    // Load user info - Immediate
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const parsed: UserInfo = JSON.parse(stored);
                setUserInfo(parsed);
                // Show sample data immediately
                setEvents(sampleEvents);
                setLoading(false);
            } catch (err) {
                message.error('Error loading user info');
            }
        }
    }, [sampleEvents]);

    // Fetch events from Firebase - Lazy load
    const fetchEvents = useCallback(async () => {
        if (!userInfo?.uid) return;

        try {
            // In production, fetch from Firebase
            // const eventsData = await getData(`events/${userInfo.uid}`);
            // setEvents(eventsData || sampleEvents);

            // Simulate API delay
            setTimeout(() => {
                // Keep sample events for now
                setLoading(false);
            }, 300);
        } catch (error) {
            console.error("Error fetching events:", error);
            message.error('Failed to load events');
            setLoading(false);
        }
    }, [userInfo?.uid]);

    useEffect(() => {
        if (userInfo?.uid) {
            fetchEvents();
        }
    }, [fetchEvents, userInfo?.uid]);

    // Event type configuration
    const eventTypeConfig = useMemo(() => ({
        viewing: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <Home className="w-4 h-4" /> },
        meeting: { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: <Users className="w-4 h-4" /> },
        closing: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: <Key className="w-4 h-4" /> },
        inspection: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <Target className="w-4 h-4" /> },
        followup: { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: <PhoneCall className="w-4 h-4" /> }
    }), []);

    // Status configuration
    const statusConfig = useMemo(() => ({
        scheduled: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Scheduled' },
        confirmed: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Confirmed' },
        completed: { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: 'Completed' },
        cancelled: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Cancelled' }
    }), []);

    // Format date for display
    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    }, []);

    // Format time for display
    const formatTime = useCallback((timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${period}`;
    }, []);

    // Get relative time
    const getRelativeTime = useCallback((dateString: string) => {
        const eventDate = new Date(dateString);
        const now = new Date();
        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Past';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays <= 7) return `In ${diffDays} days`;
        return 'Later';
    }, []);

    // Filter events
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === 'all' || event.eventType === filterType;
            const matchesStatus = filterStatus === 'all' || event.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        }).sort((a, b) => {
            // Sort by date and time
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA.getTime() - dateB.getTime();
        });
    }, [events, searchTerm, filterType, filterStatus]);

    // Get upcoming events (next 7 days)
    const upcomingEvents = useMemo(() => {
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        return filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate <= sevenDaysFromNow && event.status !== 'completed' && event.status !== 'cancelled';
        });
    }, [filteredEvents]);

    // Get event statistics
    const eventStats = useMemo(() => ({
        total: events.length,
        upcoming: upcomingEvents.length,
        today: filteredEvents.filter(event => {
            const today = new Date().toISOString().split('T')[0];
            return event.date === today && event.status !== 'completed' && event.status !== 'cancelled';
        }).length,
        confirmed: events.filter(event => event.status === 'confirmed').length
    }), [events, filteredEvents, upcomingEvents]);

    // Quick actions
    const handleQuickAction = useCallback((action: string) => {
        switch (action) {
            case 'add':
                router.push(`/realstate/${userInfo?.uid}/events/add`);
                break;
            case 'calendar':
                setViewMode('calendar');
                break;
            case 'list':
                setViewMode('list');
                break;
            case 'refresh':
                fetchEvents();
                message.success('Events refreshed');
                break;
        }
    }, [router, userInfo?.uid, fetchEvents]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <Header userData={userInfo} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Events Management</span>
                            <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Upcoming {''}
                                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Events
                                    </span>
                                </h1>
                                <p className="text-gray-600 mt-2 max-w-xl">
                                    Schedule viewings, manage appointments, and track property meetings with clients.
                                </p>
                            </div>
                        </div>
                    </div>

                    Stats Overview
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Events</p>
                                    <p className="text-2xl font-semibold text-gray-900">{eventStats.total}</p>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Upcoming</p>
                                    <p className="text-2xl font-semibold text-gray-900">{eventStats.upcoming}</p>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Today</p>
                                    <p className="text-2xl font-semibold text-gray-900">{eventStats.today}</p>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Zap className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Confirmed</p>
                                    <p className="text-2xl font-semibold text-gray-900">{eventStats.confirmed}</p>
                                </div>
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events, clients, or properties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                            >
                                <option value="all">All Types</option>
                                <option value="viewing">Viewing</option>
                                <option value="meeting">Meeting</option>
                                <option value="closing">Closing</option>
                                <option value="inspection">Inspection</option>
                                <option value="followup">Follow-up</option>
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <Button
                                label="Refresh"
                                variant="theme2"
                                size="sm"
                                icon={<Zap className="w-4 h-4" />}
                                onClick={() => handleQuickAction('refresh')}
                            />
                        </div>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${viewMode === 'list' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${viewMode === 'calendar' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Calendar View
                        </button>
                    </div>
                </div>

                {/* Events Grid - Optimized for performance */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Today's Events */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="p-5 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {viewMode === 'list' ? 'All Events' : 'Calendar View'}
                                    </h2>
                                    <span className="text-sm text-gray-600">
                                        {filteredEvents.length} events found
                                    </span>
                                </div>
                            </div>

                            {viewMode === 'list' ? (
                                <div className="divide-y divide-gray-100">
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map((event) => {
                                            const typeConfig = eventTypeConfig[event.eventType];
                                            const statusConfigItem = statusConfig[event.status];

                                            return (
                                                <div
                                                    key={event.id}
                                                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => router.push(`/realstate/${userInfo?.uid}/events/${event.id}`)}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`p-3 rounded-lg ${typeConfig.bg}`}>
                                                            {typeConfig.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h3 className="font-medium text-gray-900 truncate">
                                                                        {event.title}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600 mt-1">
                                                                        with {event.clientName} • {event.propertyAddress}
                                                                    </p>
                                                                </div>
                                                                <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfigItem.bg} ${statusConfigItem.color}`}>
                                                                    {statusConfigItem.label}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>{formatDate(event.date)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock className="w-4 h-4" />
                                                                    <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Users className="w-4 h-4" />
                                                                    <span>{event.participants.length} participants</span>
                                                                </div>
                                                            </div>

                                                            {event.notes && (
                                                                <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                                    {event.notes}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="p-8 text-center">
                                            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                                            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                                            <Button
                                                label="Create New Event"
                                                onClick={() => handleQuickAction('add')}
                                                variant="theme"
                                                size="sm"
                                                icon={<Plus className="w-4 h-4" />}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4">
                                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <p className="text-gray-600">Calendar view coming soon</p>
                                            <Button
                                                label="Switch to List View"
                                                onClick={() => setViewMode('list')}
                                                variant="theme"
                                                size="sm"
                                                classNameC="mt-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Quick Actions & Upcoming */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    label="Schedule Viewing"
                                    variant="theme"
                                    icon={<Home className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => router.push(`/realstate/${userInfo?.uid}/events/add?type=viewing`)}
                                />
                                <Button
                                    label="Client Meeting"
                                    variant="theme2"
                                    icon={<Users className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => router.push(`/realstate/${userInfo?.uid}/events/add?type=meeting`)}
                                />
                                <Button
                                    label="Send Reminders"
                                    variant="theme2"
                                    icon={<Bell className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => message.info('Sending reminders...')}
                                />
                            </div>
                        </div>

                        {/* Upcoming This Week */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">This Week</h3>
                                <span className="text-sm text-gray-600">{upcomingEvents.length} events</span>
                            </div>
                            <div className="space-y-4">
                                {upcomingEvents.slice(0, 3).map((event) => (
                                    <div
                                        key={event.id}
                                        className="p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/realstate/${userInfo?.uid}/events/${event.id}`)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                {event.title}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {getRelativeTime(event.date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{formatDate(event.date)} • {formatTime(event.startTime)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="truncate">{event.propertyAddress}</span>
                                        </div>
                                    </div>
                                ))}

                                {upcomingEvents.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">No events this week</p>
                                    </div>
                                )}

                                {upcomingEvents.length > 3 && (
                                    <Button
                                        label="View All Upcoming"
                                        variant="theme"
                                        size="sm"
                                        onClick={() => {
                                            setFilterStatus('scheduled,confirmed');
                                            setViewMode('list');
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Event Stats */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Event Distribution</h3>
                            <div className="space-y-3">
                                {Object.entries(eventTypeConfig).map(([type, config]) => {
                                    const count = events.filter(e => e.eventType === type).length;
                                    return (
                                        <div key={type} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded ${config.bg}`}>
                                                    {config.icon}
                                                </div>
                                                <span className="text-sm text-gray-700 capitalize">{type}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    onClick={() => handleQuickAction('add')}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-50"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </main>
        </div>
    );
}

// List icon component
const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);