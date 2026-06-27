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
    Layers, HomeIcon, Briefcase, ChevronLeft,
    CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
    ListFilter, Clock8, LayoutGrid, List,
    ArrowUpRight, ArrowDownRight, Circle,
    GripVertical, Menu, Sparkle, Gem,
    BarChart3, Activity, CalendarClock,
    ChevronsUp, ChevronsDown, Import
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import DraggableButton from "@/components/DraggableButton";
import ErrorState from "@/components/ErrorState";
import { deleleData, getData, queryList } from "@/FBConfig/fbFunctions";
import { useAuth } from "@/hooks/useAuth";

interface ClientData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyType?: string;
    preferredLocations?: string;
    ownerUid?: string;
    agentUid?: string;
}

interface OwnerData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyAddress?: string;
    ownerUid?: string;
    agentUid?: string;
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

// Event type configuration - monochrome
const eventTypeConfig = {
    'property-viewing': {
        label: 'Viewing',
        icon: Eye,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        emoji: '🏠'
    },
    'client-meeting': {
        label: 'Meeting',
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        emoji: '🤝'
    },
    'closing-session': {
        label: 'Closing',
        icon: Key,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        emoji: '🔑'
    },
    'property-inspection': {
        label: 'Inspection',
        icon: Target,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        emoji: '🔍'
    },
    'follow-up-call': {
        label: 'Follow-up',
        icon: PhoneCall,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        emoji: '📞'
    }
};

const statusConfig = {
    'scheduled': {
        label: 'Scheduled',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        dot: 'bg-blue-500',
        border: 'border-blue-200'
    },
    'in-progress': {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        dot: 'bg-amber-500',
        border: 'border-amber-200'
    },
    'completed': {
        label: 'Completed',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        dot: 'bg-emerald-500',
        border: 'border-emerald-200'
    }
};

type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month' | 'all';

const ITEMS_PER_PAGE = 6;

export default function CalendarEventsPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [events, setEvents] = useState<EventData[]>([]);
    const [clients, setClients] = useState<ClientData[]>([]);
    const [owners, setOwners] = useState<OwnerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(100);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const [showAllCompleted, setShowAllCompleted] = useState(false);
    const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');

    const getEventStatus = useCallback((event: EventData) => {
        const now = new Date();
        const eventDate = new Date(`${event.date}T${event.startTime}`);
        const eventEndDate = new Date(`${event.date}T${event.endTime}`);

        if (eventEndDate < now) return 'completed';
        if (eventDate <= now && eventEndDate >= now) return 'in-progress';
        return 'scheduled';
    }, []);

    const fetchClients = useCallback(async (uid: string) => {
        try {
            const clientsArray = await queryList(`clients/${uid}`);
            setClients(clientsArray);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }, []);

    const fetchOwners = useCallback(async (uid: string) => {
        try {
            const ownersArray = await queryList(`owners/${uid}`);
            setOwners(ownersArray);
        } catch (error) {
            console.error('Error fetching owners:', error);
        }
    }, []);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            message.error('Please Login First');
            router.replace('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user?.uid) return;
        setLoading(true);
        setFetchError(null);
        Promise.all([
            fetchEvents(user.uid),
            fetchClients(user.uid),
            fetchOwners(user.uid)
        ]).finally(() => setLoading(false));
    }, [user?.uid, fetchClients, fetchOwners]);

    const fetchEvents = async (uid: string, limit?: number) => {
        try {
            let eventsArray: EventData[] = await queryList(`events/${uid}`, limit ? { limitToLast: limit } : {});
            eventsArray = eventsArray.reverse();
            setEvents(eventsArray);
            setFetchError(null);
        } catch (error) {
            console.error('Error fetching events:', error);
            setFetchError("Failed to load events. Please check your connection and try again.");
            message.error('Failed to fetch events');
            setEvents([]);
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
        return days;
    };

    const getCurrentWeekDays = (date: Date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay());
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
        setSelectedDate(new Date());
        setTimeFilter('today');
        setShowAllUpcoming(false);
        setShowAllCompleted(false);
    };

    const formatDateForComparison = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getEventsForDate = useCallback((date: Date) => {
        if (!date) return [];
        const dateString = formatDateForComparison(date);
        return events.filter(event => event.date === dateString);
    }, [events]);

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    const formatTime = useCallback((timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    const filteredEvents = useMemo(() => {
        let filtered = events;

        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.address?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(event => event.eventType === filterType);
        }

        return filtered;
    }, [events, searchTerm, filterType]);

    const getDateRange = useCallback((filter: TimeFilter): { start: Date; end: Date } => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        switch (filter) {
            case 'today':
                return {
                    start: today,
                    end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'tomorrow':
                return {
                    start: tomorrow,
                    end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'this-week': {
                const start = new Date(today);
                start.setDate(today.getDate() - today.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
            case 'this-month': {
                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
            case 'all':
            default:
                return {
                    start: new Date(0),
                    end: new Date(8640000000000000)
                };
        }
    }, []);

    const upcomingEvents = useMemo(() => {
        const range = getDateRange(timeFilter);
        return filteredEvents
            .filter(event => {
                const status = getEventStatus(event);
                if (status === 'completed') return false;
                const eventDate = new Date(event.date);
                return eventDate >= range.start && eventDate <= range.end;
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateA.getTime() - dateB.getTime();
            });
    }, [filteredEvents, timeFilter, getDateRange, getEventStatus]);

    const completedEvents = useMemo(() => {
        return filteredEvents
            .filter(event => getEventStatus(event) === 'completed')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [filteredEvents, getEventStatus]);

    const paginatedUpcoming = useMemo(() => {
        if (showAllUpcoming) return upcomingEvents;
        return upcomingEvents.slice(0, ITEMS_PER_PAGE);
    }, [upcomingEvents, showAllUpcoming]);

    const paginatedCompleted = useMemo(() => {
        if (showAllCompleted) return completedEvents;
        return completedEvents.slice(0, ITEMS_PER_PAGE);
    }, [completedEvents, showAllCompleted]);

    const eventStats = useMemo(() => ({
        total: events.length,
        upcoming: filteredEvents.filter(e => getEventStatus(e) !== 'completed').length,
        completed: completedEvents.length,
        today: filteredEvents.filter(e => e.date === formatDateForComparison(new Date())).length
    }), [events, filteredEvents, completedEvents, getEventStatus]);

    const handleDeleteEvent = async (eventId: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        setDeletingId(eventId);
        try {
            await deleleData(`events/${user?.uid}/${eventId}`);
            setEvents(events.filter(event => event.id !== eventId));
            message.success('Event deleted successfully');
        } catch (error) {
            console.error("Delete error:", error);
            message.error('Failed to delete event');
        } finally {
            setDeletingId(null);
        }
    };

    const handleViewEvent = (eventId: string) => {
        router.push(`/realstate/${user?.uid}/events/${eventId}`);
    };

    const handleCreateEvent = () => {
        router.push(`/realstate/${user?.uid}/events/addevent`);
    };

    const handleShowMoreUpcoming = () => {
        setShowAllUpcoming(true);
    };

    const handleShowLessUpcoming = () => {
        setShowAllUpcoming(false);
        const element = document.getElementById('upcoming-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleShowMoreCompleted = () => {
        setShowAllCompleted(true);
    };

    const handleShowLessCompleted = () => {
        setShowAllCompleted(false);
        const element = document.getElementById('completed-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (fetchError && !events.length) {
        return <ErrorState message={fetchError} onRetry={() => { setLoading(true); setFetchError(null); user?.uid && Promise.all([fetchEvents(user.uid), fetchClients(user.uid), fetchOwners(user.uid)]).finally(() => setLoading(false)); }} />;
    }

    if (loading || authLoading) {
        return <Loader />;
    }

    const calendarDays = getDaysInMonth(currentMonth);

    const timeFilterConfig: Record<TimeFilter, { label: string; icon: any }> = {
        'today': { label: 'Today', icon: Clock },
        'tomorrow': { label: 'Tomorrow', icon: CalendarPlus },
        'this-week': { label: 'This Week', icon: CalendarRange },
        'this-month': { label: 'This Month', icon: CalendarCheck },
        'all': { label: 'All', icon: ListFilter },
    };

    const EventCard = ({ event }: { event: EventData }) => {
        const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
        const status = getEventStatus(event);
        const statusConfigItem = statusConfig[status];
        const Icon = typeConfig.icon;

        return (
            <div
                onClick={() => handleViewEvent(event.id)}
                className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className={`p-1.5 rounded-lg ${typeConfig.bg} border ${typeConfig.border} shrink-0`}>
                                <Icon className={`w-3.5 h-3.5 ${typeConfig.color}`} />
                            </div>
                            <h4 className="font-medium text-sm text-slate-800 truncate">
                                {event.title}
                            </h4>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusConfigItem.bg} ${statusConfigItem.color} border ${statusConfigItem.border} flex items-center gap-1`}>
                                <span className={`w-1 h-1 rounded-full ${statusConfigItem.dot}`} />
                                {statusConfigItem.label}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-50 rounded transition-all"
                                disabled={deletingId === event.id}
                            >
                                <Trash2 className={`w-3.5 h-3.5 text-slate-400 hover:text-rose-500 ${deletingId === event.id ? 'opacity-50' : ''}`} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </span>
                        {event.address && (
                            <span className="flex items-center gap-1 truncate max-w-[140px]">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{event.address}</span>
                            </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.date)}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 flex items-center gap-0.5">
                            {typeConfig.emoji} {typeConfig.label}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const PaginationControls = ({
        total,
        shown,
        onShowMore,
        onShowLess,
        isAllShown
    }: {
        total: number;
        shown: number;
        onShowMore: () => void;
        onShowLess: () => void;
        isAllShown: boolean;
    }) => {
        if (total <= ITEMS_PER_PAGE) return null;

        return (
            <div className="flex justify-center mt-5">
                {!isAllShown ? (
                    <button
                        onClick={onShowMore}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <ChevronsDown className="w-4 h-4" />
                        Show More ({total - shown} left)
                    </button>
                ) : (
                    <button
                        onClick={onShowLess}
                        className="px-5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                        <ChevronsUp className="w-4 h-4" />
                        Show Less
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Calendar Events</span>
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                        Event {''}
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Calendar
                                        </span>
                                    </h1>
                                    <p className="text-slate-500 mt-2 max-w-xl">
                                        View and manage all your property viewings, client meetings, and appointments
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-5 py-4 border border-indigo-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-indigo-600" />
                                        <span className="text-sm font-medium text-slate-700">Events Overview</span>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600">{events.length} Total</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-800">{eventStats.upcoming} Upcoming</div>
                                <div className="text-sm text-slate-500 mt-1">Scheduled events</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Total', value: eventStats.total },
                        { label: 'Upcoming', value: eventStats.upcoming },
                        { label: 'Today', value: eventStats.today },
                        { label: 'Completed', value: eventStats.completed }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
                            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Event"
                                icon={<Layers className="w-4 h-4" />}
                                onClick={handleCreateEvent}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Events"
                                icon={<Import className="w-4 h-4" />}
                                onClick={handleCreateEvent}
                                variant="theme"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                placeholder="Search events by title or address"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowAllUpcoming(false);
                                    setShowAllCompleted(false);
                                }}
                                className="md:min-w-80 border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Event Type Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => {
                                setFilterType('all');
                                setShowAllUpcoming(false);
                                setShowAllCompleted(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === 'all'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            All Events
                            <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                                {events.length}
                            </span>
                        </button>
                        {Object.entries(eventTypeConfig).map(([key, config]) => {
                            const Icon = config.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setFilterType(key);
                                        setShowAllUpcoming(false);
                                        setShowAllCompleted(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filterType === key
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {config.label}
                                    <span className="ml-0.5 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                                        {events.filter(e => e.eventType === key).length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Calendar and Events Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                <span className="font-medium text-sm text-slate-700">
                                    {calendarView === 'month'
                                        ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
                                        : `Week of ${getCurrentWeekDays(selectedDate || new Date())[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                                    }
                                </span>
                                <div className="flex items-center gap-0.5">
                                    <button
                                        onClick={() => setCalendarView(calendarView === 'month' ? 'week' : 'month')}
                                        className="px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors mr-1"
                                    >
                                        {calendarView === 'month' ? 'Week' : 'Month'}
                                    </button>
                                    <button
                                        onClick={goToToday}
                                        className="px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (calendarView === 'month') {
                                                goToPreviousMonth();
                                            } else {
                                                const d = new Date(selectedDate || new Date());
                                                d.setDate(d.getDate() - 7);
                                                setSelectedDate(d);
                                                setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                                            }
                                        }}
                                        className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-slate-500" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (calendarView === 'month') {
                                                goToNextMonth();
                                            } else {
                                                const d = new Date(selectedDate || new Date());
                                                d.setDate(d.getDate() + 7);
                                                setSelectedDate(d);
                                                setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                                            }
                                        }}
                                        className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-slate-100">
                                {weekDays.map((day, idx) => (
                                    <div key={idx} className="bg-slate-50 py-1.5 text-center">
                                        <span className="text-[10px] font-medium text-slate-400">{day}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-slate-100">
                                {(calendarView === 'month' ? calendarDays : getCurrentWeekDays(selectedDate || new Date())).map((date, idx) => {
                                    const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
                                    const isToday = date && date.toDateString() === new Date().toDateString();
                                    const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
                                    const dayEvents = date ? getEventsForDate(date) : [];
                                    const hasEvents = dayEvents.length > 0;

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => date && setSelectedDate(date)}
                                            className={`
                                                min-h-[44px] bg-white p-1 transition-all cursor-pointer hover:bg-indigo-50
                                                ${!isCurrentMonth && calendarView === 'month' ? 'bg-slate-50/60' : ''}
                                                ${isSelected && 'ring-1 ring-indigo-500 ring-inset bg-indigo-50'}
                                                ${isToday && !isSelected && 'bg-indigo-50/50'}
                                            `}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`
                                                    text-[11px] font-medium inline-flex items-center justify-center w-5 h-5 rounded-full
                                                    ${isToday ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : ''}
                                                    ${!isToday && isCurrentMonth ? 'text-slate-600' : ''}
                                                    ${!isCurrentMonth && calendarView === 'month' ? 'text-slate-300' : ''}
                                                `}>
                                                    {date ? date.getDate() : ''}
                                                </span>
                                                {hasEvents && (
                                                    <div className="flex gap-0.5 mt-0.5">
                                                        {dayEvents.slice(0, 2).map((_, i) => (
                                                            <div key={i} className="w-1 h-1 rounded-full bg-indigo-400"></div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Events Lists */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Upcoming */}
                        <div id="upcoming-section" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-slate-700">Upcoming</h2>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {upcomingEvents.length}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {Object.entries(timeFilterConfig).map(([key, config]) => {
                                        const Icon = config.icon;
                                        const isActive = timeFilter === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setTimeFilter(key as TimeFilter);
                                                    setShowAllUpcoming(false);
                                                }}
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 ${isActive
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                    }`}
                                            >
                                                <Icon className="w-3 h-3" />
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4">
                                {paginatedUpcoming.length > 0 ? (
                                    <>
                                        <div className="space-y-2">
                                            {paginatedUpcoming.map(event => (
                                                <EventCard key={event.id} event={event} />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            total={upcomingEvents.length}
                                            shown={paginatedUpcoming.length}
                                            onShowMore={handleShowMoreUpcoming}
                                            onShowLess={handleShowLessUpcoming}
                                            isAllShown={showAllUpcoming}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No upcoming events</p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {timeFilter === 'all' ? 'No events scheduled' : `No events for ${timeFilterConfig[timeFilter].label.toLowerCase()}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Completed */}
                        <div id="completed-section" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-slate-700">Completed</h2>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {completedEvents.length}
                                    </span>
                                </div>
                                {completedEvents.length > ITEMS_PER_PAGE && (
                                    <span className="text-[10px] text-slate-400">
                                        Showing {Math.min(ITEMS_PER_PAGE, paginatedCompleted.length)} of {completedEvents.length}
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                {paginatedCompleted.length > 0 ? (
                                    <>
                                        <div className="space-y-2">
                                            {paginatedCompleted.map(event => (
                                                <EventCard key={event.id} event={event} />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            total={completedEvents.length}
                                            shown={paginatedCompleted.length}
                                            onShowMore={handleShowMoreCompleted}
                                            onShowLess={handleShowLessCompleted}
                                            isAllShown={showAllCompleted}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <CheckCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No completed events</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Completed events will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DraggableButton onClick={handleCreateEvent} />
            </main>
        </div>
    );
}
