'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import {
    Calendar, Clock, MapPin, Users, Home, DollarSign,
    ArrowLeft, Plus, Filter, Search, ChevronRight,
    PhoneCall, Mail, MessageSquare, CheckCircle,
    XCircle, Building, Key, Target, Zap,
    Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
    ChevronDown, MoreVertical, Edit, Trash2,
    User, Sparkles, Crown, Bed, Bath,
    Check, X, AlertCircle, ExternalLink,
    Layers
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { checkUserSession, getData } from "@/FBConfig/fbFunctions";

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
    eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
    clientIds: string[];
    address: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
    reminderTime: string;
    agentUid: string;
    agentName: string;
    reminderSent: boolean;
    createdAt: string;
}

export default function ElegantEventsPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Event type configuration matching your theme
    const eventTypeConfig = useMemo(() => ({
        'property-viewing': {
            label: 'Property Viewing',
            icon: <Eye className="w-4 h-4" />,
            color: 'text-blue-600',
            bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
            border: 'border-blue-200'
        },
        'client-meeting': {
            label: 'Client Meeting',
            icon: <Users className="w-4 h-4" />,
            color: 'text-purple-600',
            bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
            border: 'border-purple-200'
        },
        'closing-session': {
            label: 'Closing Session',
            icon: <Key className="w-4 h-4" />,
            color: 'text-green-600',
            bg: 'bg-gradient-to-br from-green-50 to-green-100',
            border: 'border-green-200'
        },
        'property-inspection': {
            label: 'Property Inspection',
            icon: <Target className="w-4 h-4" />,
            color: 'text-amber-600',
            bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
            border: 'border-amber-200'
        },
        'follow-up-call': {
            label: 'Follow-up Call',
            icon: <PhoneCall className="w-4 h-4" />,
            color: 'text-indigo-600',
            bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
            border: 'border-indigo-200'
        }
    }), []);

    // Get event status based on date/time
    const getEventStatus = useCallback((event: EventData) => {
        const now = new Date();
        const eventDate = new Date(`${event.date}T${event.startTime}`);
        const eventEndDate = new Date(`${event.date}T${event.endTime}`);

        if (eventEndDate < now) {
            return 'completed';
        } else if (eventDate <= now && eventEndDate >= now) {
            return 'in-progress';
        } else {
            return 'scheduled';
        }
    }, []);

    // Status configuration
    const statusConfig = useMemo(() => ({
        'scheduled': {
            label: 'Scheduled',
            color: 'text-blue-600',
            bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
            border: 'border-blue-200',
            icon: <Calendar className="w-3 h-3" />
        },
        'in-progress': {
            label: 'In Progress',
            color: 'text-amber-600',
            bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
            border: 'border-amber-200',
            icon: <AlertCircle className="w-3 h-3" />
        },
        'completed': {
            label: 'Completed',
            color: 'text-green-600',
            bg: 'bg-gradient-to-r from-green-50 to-green-100',
            border: 'border-green-200',
            icon: <CheckCircle className="w-3 h-3" />
        }
    }), []);

    // Load user info and events
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser = localStorage.getItem('userInfo');
                let userData;

                if (storedUser) {
                    userData = JSON.parse(storedUser);
                } else {
                    userData = await getData(`users/${user.uid}`);
                    if (userData) {
                        localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
                    }
                }

                if (userData) {
                    setUserInfo({ uid: user.uid, ...userData });
                    // Fetch events for this user
                    await fetchEvents(user.uid);
                }
            } catch (err) {
                console.error('Authentication error:', err);
                message.error('Error occurred during authentication');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const fetchEvents = async (uid: string) => {
        try {
            setLoading(true);
            const eventsData: any = await getData(`events/${uid}/`);

            if (eventsData) {
                const eventsArray: EventData[] = Object.entries(eventsData)
                    .map(([id, data]: [string, any]) => ({
                        id,
                        ...data,
                        clientName: data.clientName || 'Client', // Fallback for client name
                    }));
                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            message.error('Failed to fetch events');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    // Format helpers
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

    const formatTime = useCallback((timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    const getTimeUntilEvent = useCallback((date: string, time: string) => {
        const eventDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        const diffMs = eventDateTime.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMs < 0) return { text: 'Past', color: 'text-gray-500', bg: 'bg-gray-100' };
        if (diffDays > 1) return { text: `${diffDays} days`, color: 'text-blue-600', bg: 'bg-blue-50' };
        if (diffDays === 1) return { text: 'Tomorrow', color: 'text-green-600', bg: 'bg-green-50' };
        if (diffHours > 0) return { text: `${diffHours} hours`, color: 'text-amber-600', bg: 'bg-amber-50' };
        return { text: 'Today', color: 'text-red-600', bg: 'bg-red-50' };
    }, []);

    // Filter events
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = searchTerm === '' ||
                event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.address?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === 'all' || event.eventType === filterType;

            // Get status for filtering
            const eventStatus = getEventStatus(event);
            const matchesStatus = filterStatus === 'all' || eventStatus === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        }).sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA.getTime() - dateB.getTime();
        });
    }, [events, searchTerm, filterType, filterStatus, getEventStatus]);

    // Event statistics
    const eventStats = useMemo(() => ({
        total: events.length,
        upcoming: events.filter(e => {
            const eventDate = new Date(`${e.date}T${e.startTime}`);
            return eventDate > new Date();
        }).length,
        today: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
        completed: events.filter(e => getEventStatus(e) === 'completed').length
    }), [events, getEventStatus]);

    // Handlers
    const handleDeleteEvent = async (eventId: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        setDeletingId(eventId);
        try {
            // TODO: Implement deleteData function
            // await deleteData(`events/${userInfo?.uid}/${eventId}`);
            setEvents(events.filter(event => event.id !== eventId));
            message.success('Event deleted successfully');
        } catch (error) {
            message.error('Failed to delete event');
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditEvent = (eventId: string) => {
        router.push(`/realstate/${userInfo?.uid}/events/edit/${eventId}`);
    };

    const handleViewEvent = (eventId: string) => {
        router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
    };

    const handleCreateEvent = () => {
        router.push(`/realstate/${userInfo?.uid}/events/addevent`);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
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
                                    Schedule & {" "}
                                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Events
                                    </span>
                                </h1>
                                <p className="text-gray-600 mt-2 max-w-xl">
                                    Manage property viewings, client meetings, and real estate appointments
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                    {[
                        {
                            title: 'Total Events',
                            value: eventStats.total,
                            icon: <Calendar className="w-5 h-5 text-purple-600" />,
                            color: 'purple'
                        },
                        {
                            title: 'Upcoming',
                            value: eventStats.upcoming,
                            icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
                            color: 'blue'
                        },
                        {
                            title: 'Today',
                            value: eventStats.today,
                            icon: <Clock className="w-5 h-5 text-green-600" />,
                            color: 'green'
                        },
                    ].map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                <div className="absolute -top-3 left-4">
                                    <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
                                        {stat.icon}
                                    </div>
                                </div>

                                <div className="-mt-1">
                                    <div className="text-right">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
                                        <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Event"
                                onClick={handleCreateEvent}
                                variant="theme"
                                icon={<Layers className="w-4 h-4" />}
                                size="md"
                            />
                            <Button
                                label={viewMode === 'grid' ? 'List View' : 'Grid View'}
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                variant="theme2"
                                icon={viewMode === 'grid' ? <ListIcon className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                                size="md"
                            />
                        </div>

                        {/* Search Input */}
                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by events or address"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors md:min-w-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {/* Event Type Filters */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'all', label: 'All Types', count: events.length },
                                ...Object.entries(eventTypeConfig).map(([key, config]) => ({
                                    id: key,
                                    label: config.label,
                                    count: events.filter(e => e.eventType === key).length
                                }))
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setFilterType(filter.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === filter.id
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter.label}
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${filterType === filter.id
                                        ? 'bg-white/20'
                                        : 'bg-white'
                                        }`}>
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events Table View */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">All Events</h2>
                        <div className="text-sm text-gray-600">
                            Showing {filteredEvents.length} of {events.length} events
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-900">Event</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Date & Time</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Address</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Clients</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map((event) => {
                                            const typeConfig = eventTypeConfig[event.eventType];
                                            const eventStatus = getEventStatus(event);
                                            const statusConfigItem = statusConfig[eventStatus];
                                            return (
                                                <tr
                                                    key={event.id}
                                                    className="hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => handleViewEvent(event.id)}
                                                >
                                                    <td className="px-4 py-2 font-medium text-gray-900">{event.title}</td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
                                                                <div className={typeConfig.color}>{typeConfig.icon}</div>
                                                            </div>
                                                            <span className="text-sm text-gray-700">{typeConfig.label}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfigItem.bg} ${statusConfigItem.color}`}>
                                                            {statusConfigItem.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="text-sm text-gray-700">
                                                            {formatDate(event.date)} {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span className="text-sm text-gray-700 truncate max-w-xs">{event.address}</span>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {event.clientIds && event.clientIds.length > 0 ? (
                                                            <span className="text-sm text-gray-700">
                                                                {event.clientIds.length} Client{event.clientIds.length > 1 ? 's' : ''}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-gray-400">No clients</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleViewEvent(event.id); }}
                                                                className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleEditEvent(event.id); }}
                                                                className="p-2 hover:bg-purple-50 rounded-lg text-purple-600"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                                                                className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center">
                                                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-600">No events found</p>
                                                <p className="text-sm text-gray-500 mt-2">Try changing your search or filters</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {/* Floating Action Button */}
                <button
                    onClick={handleCreateEvent}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-50"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </main>
        </div>
    );
}

// Custom List Icon Component
const ListIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);