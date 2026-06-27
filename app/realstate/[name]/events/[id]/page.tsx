'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { message } from "antd";
import {
    Calendar, Clock, MapPin, Users, Phone, Mail,
    MessageSquare, Edit, ArrowLeft, MoreVertical,
    Eye, Target, Key, Building, CheckCircle,
    AlertCircle, ExternalLink, Share2, Printer,
    Download, PhoneCall, User, FileText, Navigation,
    ChevronRight, XCircle, Home, DollarSign,
    Bed, Plus, Bell, Layers, Compass, Briefcase,
    Zap, Activity, Clipboard, Star, TrendingUp,
    Shield, Heart
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { getData, updateData } from "@/FBConfig/fbFunctions";
import { useAuth } from "@/hooks/useAuth";
import { useEventReminder } from "@/hooks/useEventReminder";

interface AttendeeInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    type: 'client' | 'owner';
    propertyInfo?: string;
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

export default function ViewEventPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const { user, loading: authLoading } = useAuth();
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activePanel, setActivePanel] = useState('overview');
    const [clients, setClients] = useState<AttendeeInfo[]>([]);
    const [owners, setOwners] = useState<AttendeeInfo[]>([]);
    const [newNote, setNewNote] = useState('');

    // Event type configuration
    const eventTypeConfig = useMemo(() => ({
        'property-viewing': {
            label: 'Property Viewing',
            icon: <Eye className="w-5 h-5" />,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            gradient: 'from-blue-500 to-blue-600'
        },
        'client-meeting': {
            label: 'Client Meeting',
            icon: <Users className="w-5 h-5" />,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            gradient: 'from-purple-500 to-purple-600'
        },
        'closing-session': {
            label: 'Closing Session',
            icon: <Key className="w-5 h-5" />,
            color: 'text-green-600',
            bg: 'bg-green-50',
            gradient: 'from-green-500 to-green-600'
        },
        'property-inspection': {
            label: 'Property Inspection',
            icon: <Target className="w-5 h-5" />,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            gradient: 'from-amber-500 to-amber-600'
        },
        'follow-up-call': {
            label: 'Follow-up Call',
            icon: <PhoneCall className="w-5 h-5" />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            gradient: 'from-indigo-500 to-indigo-600'
        }
    }), []);

    // ✅ Authentication
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            message.error('Please Login First');
            router.replace('/login');
        }
    }, [user, authLoading, router]);

    // ✅ Fetch clients from correct path
    const fetchClients = useCallback(async (clientIds: string[], agentUid: string) => {
        if (!clientIds || clientIds.length === 0 || !agentUid) return [];

        try {
            const clientData: any = await getData(`clients/${agentUid}`);
            if (!clientData) return [];

            const clientsArray = Object.entries(clientData).map(
                ([id, value]: [string, any]) => ({
                    id,
                    firstName: value.firstName || '',
                    lastName: value.lastName || '',
                    email: value.email || '',
                    phone: value.phone || '',
                    type: 'client' as const,
                    propertyInfo: value.propertyType || ''
                })
            );

            return clientsArray.filter(client => clientIds.includes(client.id));
        } catch (error) {
            console.error("Error fetching clients", error);
            return [];
        }
    }, []);

    // ✅ Fetch owners from correct path
    const fetchOwners = useCallback(async (attendeeIds: string[], agentUid: string) => {
        if (!attendeeIds || attendeeIds.length === 0 || !agentUid) return [];

        try {
            const ownerData: any = await getData(`owners/${agentUid}`);
            if (!ownerData) return [];

            const ownersArray = Object.entries(ownerData).map(
                ([id, value]: [string, any]) => ({
                    id,
                    firstName: value.firstName || '',
                    lastName: value.lastName || '',
                    email: value.email || '',
                    phone: value.phone || '',
                    type: 'owner' as const,
                    propertyInfo: value.propertyAddress || ''
                })
            );

            return ownersArray.filter(owner => attendeeIds.includes(owner.id));
        } catch (error) {
            console.error("Error fetching owners", error);
            return [];
        }
    }, []);

    // ✅ Fetch event data
    const fetchEventData = useCallback(async () => {
        if (!user?.uid || !eventId) return;

        try {
            setLoading(true);
            const eventData: any = await getData(`events/${user.uid}/${eventId}`);

            if (eventData) {
                if (eventData.agentUid !== user.uid) {
                    message.error("You don't have permission to view this event");
                    router.push(`/realstate/${user.uid}/events`);
                    return;
                }

                setEvent({ id: eventId, ...eventData });

                if (eventData.clientIds?.length > 0) {
                    const [resolvedClients, resolvedOwners] = await Promise.all([
                        fetchClients(eventData.clientIds, user.uid),
                        fetchOwners(eventData.clientIds, user.uid)
                    ]);
                    setClients(resolvedClients);
                    setOwners(resolvedOwners);
                } else {
                    setClients([]);
                    setOwners([]);
                }
            } else {
                message.error("Event not found");
                router.push(`/realstate/${user.uid}/events`);
            }
        } catch (error) {
            console.error("Error fetching event:", error);
            message.error('Failed to load event data');
        } finally {
            setLoading(false);
        }
    }, [user, eventId, router, fetchClients, fetchOwners]);

    // Fetch event when user is available
    useEffect(() => {
        if (user?.uid) {
            fetchEventData();
        }
    }, [user, fetchEventData]);

    // ✅ Get combined attendees
    const getAllAttendees = useCallback((): AttendeeInfo[] => {
        return [...clients, ...owners];
    }, [clients, owners]);

    // Helper functions
    const getEventStatus = useCallback(() => {
        if (!event) return 'upcoming';
        try {
            const now = new Date();
            const eventDate = new Date(`${event.date}T${event.startTime}`);
            const eventEndDate = new Date(`${event.date}T${event.endTime}`);

            if (eventEndDate < now) return 'completed';
            if (eventDate <= now && eventEndDate >= now) return 'in-progress';
            return 'upcoming';
        } catch {
            return 'upcoming';
        }
    }, [event]);

    const getStatusConfig = useCallback(() => {
        const status = getEventStatus();
        switch (status) {
            case 'completed':
                return {
                    label: 'Completed',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-200',
                    icon: <CheckCircle className="w-4 h-4" />
                };
            case 'in-progress':
                return {
                    label: 'In Progress',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    border: 'border-amber-200',
                    icon: <AlertCircle className="w-4 h-4" />
                };
            default:
                return {
                    label: 'Upcoming',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    icon: <Calendar className="w-4 h-4" />
                };
        }
    }, [getEventStatus]);

    const formatDate = useCallback((dateString: string) => {
        if (!dateString) return 'N/A';
        try {
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
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }
        } catch {
            return 'Invalid Date';
        }
    }, []);

    const formatTime = useCallback((timeString: string) => {
        if (!timeString) return 'N/A';
        try {
            return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return 'Invalid Time';
        }
    }, []);

    const getTimeUntilEvent = useCallback(() => {
        if (!event) return { text: 'N/A', color: 'text-slate-600', bg: 'bg-slate-100' };

        try {
            const eventDateTime = new Date(`${event.date}T${event.startTime}`);
            const now = new Date();
            const diffMs = eventDateTime.getTime() - now.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMs < 0) return { text: 'Past Due', color: 'text-rose-600', bg: 'bg-rose-50' };
            if (diffDays > 1) return { text: `In ${diffDays} days`, color: 'text-blue-600', bg: 'bg-blue-50' };
            if (diffDays === 1) return { text: 'Tomorrow', color: 'text-emerald-600', bg: 'bg-emerald-50' };
            if (diffHours > 0) return { text: `In ${diffHours} hours`, color: 'text-amber-600', bg: 'bg-amber-50' };
            return { text: 'Today', color: 'text-purple-600', bg: 'bg-purple-50' };
        } catch {
            return { text: 'N/A', color: 'text-slate-600', bg: 'bg-slate-100' };
        }
    }, [event]);

    // ✅ Navigate to attendee
    const navigateToAttendee = useCallback((attendeeId: string, type: 'client' | 'owner') => {
        if (user?.uid) {
            if (type === 'client') {
                router.push(`/realstate/${user.uid}/clients/viewclient/${attendeeId}`);
            } else {
                router.push(`/realstate/${user.uid}/owners/viewowner/${attendeeId}`);
            }
        }
    }, [user, router]);

    // ✅ Add note to event
    const addNote = useCallback(async () => {
        if (!newNote.trim() || !event || !user?.uid) return;

        try {
            const updatedNotes = event.notes ? `${event.notes}\n\n${newNote}` : newNote;
            await updateData(`events/${user.uid}/${eventId}`, { ...event, notes: updatedNotes });
            setEvent(prev => prev ? { ...prev, notes: updatedNotes } : null);
            setNewNote('');
            message.success('Note added successfully');
        } catch (error) {
            message.error('Failed to add note');
        }
    }, [newNote, event, user?.uid, eventId]);

    // Memoized values
    const typeConfig = useMemo(() =>
        event ? eventTypeConfig[event.eventType] || eventTypeConfig['client-meeting'] : eventTypeConfig['client-meeting'],
        [event, eventTypeConfig]
    );

    const statusConfig = useMemo(() => getStatusConfig(), [getStatusConfig]);
    const timeUntil = useMemo(() => getTimeUntilEvent(), [getTimeUntilEvent]);
    const allAttendees = useMemo(() => getAllAttendees(), [getAllAttendees]);

    // Panel configuration
    const panels = [
        { id: 'overview', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
        { id: 'attendees', label: 'Attendees', icon: <Users className="w-4 h-4" /> },
        { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'details', label: 'Details', icon: <Clipboard className="w-4 h-4" /> }
    ];

    if (loading || authLoading) {
        return <Loader />;
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
                <Header userData={user} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">Event Not Found</h2>
                        <p className="text-slate-500 mb-6">The event you're looking for doesn't exist or has been deleted.</p>
                        <Button
                            label="Back to Events"
                            onClick={() => user?.uid ? router.push(`/realstate/${user.uid}/events`) : router.back()}
                            variant="theme"
                            size="md"
                            icon={<ArrowLeft className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={user} />

            <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Event Header */}
                <div className="mb-8 mt-5">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left Section */}
                        <div className="flex items-start gap-3 sm:items-center">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-tight">
                                    {event.title || 'Untitled Event'}
                                </h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    {timeUntil.text} • {typeConfig.label}
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-lg ${typeConfig.bg} ${typeConfig.color} flex items-center gap-2`}>
                                {typeConfig.icon}
                                <span className="text-sm font-medium">{typeConfig.label}</span>
                            </div>

                            <div className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.border} border flex items-center gap-2`}>
                                {statusConfig.icon}
                                <span className="text-sm font-medium">{statusConfig.label}</span>
                            </div>

                            <Button
                                label="Edit"
                                onClick={() => router.push(`/realstate/${user?.uid}/events/editevent/${eventId}`)}
                                variant="theme"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Event Info */}
                    <div className="space-y-6">
                        {/* Event Info Card */}
                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
                                    <div className={typeConfig.color}>
                                        {typeConfig.icon}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Event Information</h2>
                                    <p className="text-sm text-slate-500">{typeConfig.label}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm text-slate-600">Date</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-800">{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm text-slate-600">Time</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-800">
                                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm text-slate-600">Location</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-800 truncate max-w-[150px]">{event.address || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm text-slate-600">Reminder</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-800">
                                        {event.reminderSent ? 'Sent ✓' : 'Not sent'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <h3 className="font-semibold text-slate-800">Quick Actions</h3>
                            </div>
                            <div className="space-y-2">
                                {event.address && (
                                    <Button
                                        label="Open in Maps"
                                        variant="theme"
                                        icon={<Navigation className="w-4 h-4" />}
                                        size="sm"
                                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
                                    />
                                )}
                                <Button
                                    label="Add Note"
                                    variant="theme2"
                                    icon={<Plus className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => setActivePanel('notes')}
                                />
                                <Button
                                    label="Share Event"
                                    variant="theme2"
                                    icon={<Share2 className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        message.success('Event link copied to clipboard');
                                    }}
                                />
                            </div>
                        </div>

                        {/* Attendees Summary */}
                        {allAttendees.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                                <h3 className="font-semibold text-slate-800 mb-4">Attendees Summary</h3>
                                <div className="space-y-2">
                                    {allAttendees.slice(0, 3).map((attendee) => (
                                        <div
                                            key={attendee.id}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => navigateToAttendee(attendee.id, attendee.type)}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${attendee.type === 'client' ? 'bg-purple-500' : 'bg-amber-500'}`}>
                                                {attendee.firstName?.charAt(0)}{attendee.lastName?.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-slate-800">
                                                    {attendee.firstName} {attendee.lastName}
                                                </div>
                                                <div className="text-xs text-slate-500">{attendee.type === 'client' ? 'Client' : 'Owner'}</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                    ))}
                                    {allAttendees.length > 3 && (
                                        <button
                                            onClick={() => setActivePanel('attendees')}
                                            className="text-sm text-indigo-600 hover:text-indigo-700 mt-2 block text-center"
                                        >
                                            + {allAttendees.length - 3} more attendees
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Center Column - Main Panel */}
                    <div className="lg:col-span-2">
                        {/* Panel Navigation */}
                        <div className="bg-white rounded-xl border border-slate-100 p-1.5 mb-6 shadow-sm">
                            <div className="flex gap-4 overflow-x-auto">
                                {panels.map((panel) => (
                                    <button
                                        key={panel.id}
                                        onClick={() => setActivePanel(panel.id)}
                                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                                            ${activePanel === panel.id
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                            }`}
                                    >
                                        {panel.icon}
                                        {panel.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Panel Content */}
                        <div className="bg-white rounded-xl border border-slate-100 px-6 py-4 shadow-sm">
                            {activePanel === 'overview' && (
                                <div className="space-y-6">
                                    {event.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Description</h3>
                                            <div className="p-4 rounded-lg bg-slate-50">
                                                <p className="text-slate-700">{event.description}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-slate-800">Location Details</h3>
                                            {event.address && (
                                                <button
                                                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
                                                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open Maps
                                                </button>
                                            )}
                                        </div>
                                        {event.address ? (
                                            <div className="p-4 rounded-lg border border-slate-200">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-slate-800">Address</p>
                                                        <p className="text-slate-600 mt-1">{event.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-slate-500 italic">No address provided</p>
                                        )}
                                    </div>

                                    {/* Attendees preview in overview */}
                                    {allAttendees.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Attendees</h3>
                                            <div className="space-y-2">
                                                {allAttendees.map((attendee) => (
                                                    <div
                                                        key={attendee.id}
                                                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-200 cursor-pointer transition-colors"
                                                        onClick={() => navigateToAttendee(attendee.id, attendee.type)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold ${attendee.type === 'client' ? 'bg-purple-500' : 'bg-amber-500'}`}>
                                                                {attendee.firstName?.charAt(0)}{attendee.lastName?.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-slate-800">
                                                                    {attendee.firstName} {attendee.lastName}
                                                                </div>
                                                                <div className="text-sm text-slate-500">{attendee.email}</div>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'attendees' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                        Attendees ({allAttendees.length})
                                    </h3>

                                    {allAttendees.length > 0 ? (
                                        <div className="space-y-3">
                                            {allAttendees.map((attendee) => (
                                                <div
                                                    key={attendee.id}
                                                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                                                    onClick={() => navigateToAttendee(attendee.id, attendee.type)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${attendee.type === 'client' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                                                            {attendee.firstName?.charAt(0)}{attendee.lastName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-800">
                                                                    {attendee.firstName} {attendee.lastName}
                                                                </span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full ${attendee.type === 'client' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                                                                    {attendee.type === 'client' ? 'Client' : 'Owner'}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col gap-0.5 mt-1">
                                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                    <Mail className="w-3 h-3" />
                                                                    <span>{attendee.email}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                    <Phone className="w-3 h-3" />
                                                                    <span>{attendee.phone}</span>
                                                                </div>
                                                                {attendee.propertyInfo && (
                                                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                                        <Home className="w-3 h-3" />
                                                                        <span>{attendee.propertyInfo}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            label="Contact"
                                                            variant="theme2"
                                                            size="sm"
                                                            icon={<Mail className="w-3 h-3" />}
                                                            onClick={(e:any) => {
                                                                e.stopPropagation();
                                                                window.location.href = `mailto:${attendee.email}`;
                                                            }}
                                                        />
                                                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                            <p className="text-slate-500">No attendees assigned to this event</p>
                                            <Button
                                                label="Add Attendees"
                                                variant="theme"
                                                size="sm"
                                                icon={<Plus className="w-4 h-4" />}
                                                onClick={() => router.push(`/realstate/${user?.uid}/events/addevent`)}
                                                classNameC="mt-4"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'notes' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-800">Event Notes</h3>
                                        <Button
                                            label="Add Note"
                                            variant="theme"
                                            size="sm"
                                            icon={<Plus className="w-4 h-4" />}
                                            onClick={addNote}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            placeholder="Add a new note..."
                                            className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 transition-colors resize-none"
                                        />
                                    </div>

                                    {event.notes ? (
                                        <div className="space-y-4">
                                            {event.notes.split('\n\n').filter((note: string) => note.trim()).map((note: string, index: number) => (
                                                <div key={index} className="p-4 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        <span className="text-sm text-slate-500">{formatDate(event.createdAt)}</span>
                                                    </div>
                                                    <p className="text-slate-600 whitespace-pre-wrap">{note}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                            <p className="text-slate-500">No notes yet. Add your first note above.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'details' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Event Details</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                                <span className="text-slate-600">Created On</span>
                                            </div>
                                            <span className="font-medium text-slate-800">
                                                {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                <span className="text-slate-600">Duration</span>
                                            </div>
                                            <span className="font-medium text-slate-800">
                                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Bell className="w-4 h-4 text-indigo-500" />
                                                <span className="text-slate-600">Reminder Status</span>
                                            </div>
                                            <span className="font-medium text-slate-800">
                                                {event.reminderSent ? 'Sent successfully' : 'Not sent yet'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-indigo-500" />
                                                <span className="text-slate-600">Created By</span>
                                            </div>
                                            <span className="font-medium text-slate-800">{event.agentName || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}