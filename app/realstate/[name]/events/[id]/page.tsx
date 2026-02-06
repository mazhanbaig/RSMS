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
    Bed, Plus, Bell, Layers, Compass
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { checkUserSession, getData } from "@/FBConfig/fbFunctions";

interface UserInfo {
    uid: string;
    name?: string;
    email?: string;
}

interface ClientDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface EventData {
    id: string;
    title: string;
    description: string;
    eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
    clientIds: string[];
    clientDetails?: ClientDetail[];
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

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState('overview');
    const [clients, setClients] = useState<any[]>([])

    // Event type configuration matching your theme
    const eventTypeConfig = useMemo(() => ({
        'property-viewing': {
            label: 'Property Viewing',
            icon: <Eye className="w-5 h-5" />,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            gradient: 'from-blue-500 to-blue-600'
        },
        'client-meeting': {
            label: 'Client Meeting',
            icon: <Users className="w-5 h-5" />,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            gradient: 'from-purple-500 to-purple-600'
        },
        'closing-session': {
            label: 'Closing Session',
            icon: <Key className="w-5 h-5" />,
            color: 'text-green-600',
            bg: 'bg-green-100',
            gradient: 'from-green-500 to-green-600'
        },
        'property-inspection': {
            label: 'Property Inspection',
            icon: <Target className="w-5 h-5" />,
            color: 'text-amber-600',
            bg: 'bg-amber-100',
            gradient: 'from-amber-500 to-amber-600'
        },
        'follow-up-call': {
            label: 'Follow-up Call',
            icon: <PhoneCall className="w-5 h-5" />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            gradient: 'from-indigo-500 to-indigo-600'
        }
    }), []);

    // Check authentication and load data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser: any = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

            } catch (err) {
                message.error('Error occurred during authentication');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // Load user info
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const userData = JSON.parse(stored);
                setUserInfo(userData);
                setUid(userData.uid);
            } catch (error) {
                message.error("Error loading user information");
            }
        } else {
            message.error("User not logged in");
            router.push("/login");
        }
    }, []);

    // Fetch event data
    const fetchEventData = useCallback(async () => {
        if (!uid || !eventId) return;

        try {
            setLoading(true);
            const eventData: any = await getData(`events/${uid}/${eventId}`);

            if (eventData) {
                setEvent({ id: eventId, ...eventData });

                if (eventData.clientIds?.length > 0) {
                    const resolvedClients = await abstractClients(eventData.clientIds);
                    setClients(resolvedClients);
                } else {
                    setClients([]);
                }
            }
            else {
                message.error("Event not found");
                router.push(`/realstate/${uid}/events`);
            }
        } catch (error) {
            console.error("Error fetching event:", error);
            message.error('Failed to load event data');
        } finally {
            setLoading(false);
        }
    }, [uid, eventId, router]);

    const abstractClients = async (clientIds: string[]) => {
        try {
            const clientData: any = await getData('clients/');
            if (!clientData) return [];

            const clientsArray = Object.entries(clientData).map(
                ([id, value]: [string, any]) => ({
                    id,
                    ...value
                })
            );

            // ONLY clients linked to this event
            return clientsArray.filter(client =>
                clientIds.includes(client.id)
            );

        } catch (error) {
            console.error("Error fetching clients", error);
            return [];
        }
    };


    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

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
                    color: 'text-green-600',
                    bg: 'bg-green-100',
                    icon: <CheckCircle className="w-4 h-4" />
                };
            case 'in-progress':
                return {
                    label: 'In Progress',
                    color: 'text-amber-600',
                    bg: 'bg-amber-100',
                    icon: <AlertCircle className="w-4 h-4" />
                };
            default:
                return {
                    label: 'Upcoming',
                    color: 'text-blue-600',
                    bg: 'bg-blue-100',
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
        if (!event) return { text: 'N/A', color: 'text-gray-600', bg: 'bg-gray-100' };

        try {
            const eventDateTime = new Date(`${event.date}T${event.startTime}`);
            const now = new Date();
            const diffMs = eventDateTime.getTime() - now.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMs < 0) return { text: 'Past Due', color: 'text-red-600', bg: 'bg-red-100' };
            if (diffDays > 1) return { text: `In ${diffDays} days`, color: 'text-blue-600', bg: 'bg-blue-100' };
            if (diffDays === 1) return { text: 'Tomorrow', color: 'text-green-600', bg: 'bg-green-100' };
            if (diffHours > 0) return { text: `In ${diffHours} hours`, color: 'text-amber-600', bg: 'bg-amber-100' };
            return { text: 'Today', color: 'text-purple-600', bg: 'bg-purple-100' };
        } catch {
            return { text: 'N/A', color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    }, [event]);

    // Memoized values
    const typeConfig = useMemo(() =>
        event ? eventTypeConfig[event.eventType] || eventTypeConfig['client-meeting'] : eventTypeConfig['client-meeting'],
        [event, eventTypeConfig]
    );

    const statusConfig = useMemo(() => getStatusConfig(), [getStatusConfig]);
    const timeUntil = useMemo(() => getTimeUntilEvent(), [getTimeUntilEvent]);

    // Panel configuration
    const panels = [
        { id: 'overview', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
        { id: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> },
        { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'details', label: 'Details', icon: <FileText className="w-4 h-4" /> }
    ];

    if (loading) {
        return <Loader />;
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
                        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
                        <Button
                            label="Back to Events"
                            onClick={() => uid ? router.push(`/realstate/${uid}/events`) : router.back()}
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
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-white">
            <Header userData={userInfo} />

            <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Event Header */}
                <div className="mb-8 mt-5">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left Section */}
                        <div className="flex items-start gap-3 sm:items-center">
                            <button
                                onClick={() => router.push(`/realstate/${uid}/events`)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                    {event.title.split(' ')[0] || 'Untitled Event'} {''}
                                    <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-transparent bg-clip-text">
                                        {event.title.split(' ')[1] || 'Untitled Event'}
                                    </span>
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Event Details • Real Estate
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-lg ${typeConfig.bg} ${typeConfig.color} flex items-center gap-2`}>
                                {typeConfig.icon}
                                <span className="text-sm font-medium">{typeConfig.label}</span>
                            </div>

                            <div className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.color} flex items-center gap-2`}>
                                {statusConfig.icon}
                                <span className="text-sm font-medium">{statusConfig.label}</span>
                            </div>

                            <Button
                                label="Edit"
                                onClick={() => router.push(`/realstate/${uid}/events/edit/${eventId}`)}
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
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-lg ${typeConfig.bg}`}>
                                    <div className={typeConfig.color}>
                                        {typeConfig.icon}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
                                    <p className="text-sm text-gray-600">{typeConfig.label}</p>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Date</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Time</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Location</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 truncate">{event.address || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Reminder</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {event.reminderSent ? 'Sent ✓' : 'Not Sent'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Main Panel */}
                    <div className="lg:col-span-2">
                        {/* Panel Navigation */}
                        <div className="bg-white rounded-xl border border-gray-200 p-1.5 mb-6 shadow-sm">
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                                {panels.map((panel) => (
                                    <button
                                        key={panel.id}
                                        onClick={() => setActivePanel(panel.id)}
                                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                                            ${activePanel === panel.id
                                                ? 'bg-purple-50 text-purple-600'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {panel.icon}
                                        {panel.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Panel Content */}
                        <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
                            {activePanel === 'overview' && (
                                <div className="space-y-6">
                                    {/* Description */}
                                    {event.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                                            <div className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50">
                                                <p className="text-gray-700">{event.description}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Location Details */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                                            {event.address && (
                                                <button
                                                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
                                                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open Maps
                                                </button>
                                            )}
                                        </div>
                                        {event.address ? (
                                            <div className="px-4 py-2 rounded-lg border border-gray-200">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Address</p>
                                                        <p className="text-gray-700 mt-1">{event.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">No address provided</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activePanel === 'clients' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Clients ({event.clientDetails?.length ?? event.clientIds?.length ?? 0})
                                    </h3>

                                    {/* CASE 1: Full client objects */}
                                    {clients.length > 0 ? (
                                        <div className="space-y-4">
                                            {clients.map((client: any) => (
                                                <div
                                                    key={client.id}
                                                    className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                                // onClick={() => navigateToClient(client.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 text-lg sm:text-xl rounded-lg bg-black text-white flex items-center justify-center font-semibold shadow-md">
                                                            {client.firstName?.charAt(0) || 'C'}
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900 text-sm">
                                                                {client.firstName || 'Unknown'} {client.lastName || ''}
                                                            </span>
                                                            <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                                                {client.email || 'No email'}
                                                            </span>
                                                            <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                                                <span>{client.phone || 'No phone'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    ) : (

                                        /* CASE 3: No clients */
                                        <div className="text-center py-8">
                                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">No clients assigned to this event</p>
                                        </div>
                                    )}
                                </div>
                            )}



                            {activePanel === 'notes' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Notes</h3>

                                    {event.notes ? (
                                        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                                            <p className="text-gray-700 whitespace-pre-wrap">{event.notes}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">No notes added for this event</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'details' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Created On</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Duration</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Bell className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Reminder Status</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {event.reminderSent ? 'Sent successfully' : 'Not sent yet'}
                                            </span>
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