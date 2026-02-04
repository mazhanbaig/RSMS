'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { message, Modal } from "antd";
import {
    Calendar, Clock, MapPin, Users, Home, DollarSign,
    ArrowLeft, PhoneCall, Mail, MessageSquare,
    Building, Target, Eye, Key, Bell, FileText,
    User, ChevronLeft, Edit, Trash2, Phone,
    Mail as MailIcon, Map, ExternalLink, Share2,
    Copy, Download, Printer, CalendarDays, AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { checkUserSession, getData, deleleData } from "@/FBConfig/fbFunctions";

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
    eventType: string;
    address: string;
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    reminderTime: string;
    agentUid: string;
    agentName: string;
    reminderSent: boolean;
    createdAt: string;
    clientDetails: Array<{
        id: string;
        name: string;
        email: string;
        phone: string;
    }>;
}

export default function ViewEventPage() {
    const router = useRouter();
    const params = useParams();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<EventData | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Event type mapping
    const eventTypeConfig = {
        'property-viewing': {
            label: 'Property Viewing',
            icon: <Eye className="w-5 h-5" />,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        },
        'client-meeting': {
            label: 'Client Meeting',
            icon: <Users className="w-5 h-5" />,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-200'
        },
        'closing-session': {
            label: 'Closing Session',
            icon: <Key className="w-5 h-5" />,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200'
        },
        'property-inspection': {
            label: 'Property Inspection',
            icon: <Target className="w-5 h-5" />,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200'
        },
        'follow-up-call': {
            label: 'Follow-up Call',
            icon: <PhoneCall className="w-5 h-5" />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-200'
        }
    };

    // Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser: any = localStorage.getItem('userInfo');
                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

            } catch (err) {
                message.error('Error occurred during authentication');
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    // Fetch event data
    useEffect(() => {
        const fetchEvent = async () => {
            if (!userInfo?.uid || !params.eventId) return;

            try {
                setLoading(true);
                const eventData: any = await getData(`events/${userInfo.uid}/${params.id}`);

                if (!eventData) {
                    message.error('Event not found');
                    router.push(`/realstate/${userInfo.uid}/events`);
                    return;
                }

                setEvent({
                    id: params.eventId as string,
                    ...eventData
                });

            } catch (error) {
                console.error('Error fetching event:', error);
                message.error('Failed to load event details');
                router.push(`/realstate/${userInfo?.uid}/events`);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo?.uid) {
            fetchEvent();
        }
    }, [userInfo?.uid, params.eventId, router]);

    // Format date
    const formatDate = useCallback((dateString: string) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, []);

    // Calculate duration
    const calculateDuration = useCallback((startTime: string, endTime: string) => {
        if (!startTime || !endTime) return 'N/A';

        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffHours === 0) {
            return `${diffMinutes} minutes`;
        }
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes > 0 ? `${diffMinutes} minutes` : ''}`;
    }, []);

    // Get event type config
    const getEventTypeConfig = (type: string) => {
        return eventTypeConfig[type as keyof typeof eventTypeConfig] || {
            label: 'Event',
            icon: <Calendar className="w-5 h-5" />,
            color: 'text-gray-600',
            bg: 'bg-gray-50',
            border: 'border-gray-200'
        };
    };

    // Handle delete
    const handleDelete = async () => {
        if (!userInfo?.uid || !event?.id) return;

        setDeleting(true);
        try {
            await deleleData(`events/${userInfo.uid}/${event.id}`);
            message.success('Event deleted successfully');
            router.push(`/realstate/${userInfo.uid}/events`);
        } catch (error) {
            console.error('Error deleting event:', error);
            message.error('Failed to delete event');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    // Handle edit
    const handleEdit = () => {
        if (!userInfo?.uid || !event) return;
        router.push(`/realstate/${userInfo.uid}/events/editevent/${event.id}`);
    };

    // Handle copy event link
    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => message.success('Event link copied to clipboard'))
            .catch(() => message.error('Failed to copy link'));
    };

    // Handle share event
    const handleShare = () => {
        if (navigator.share && event) {
            navigator.share({
                title: event.title,
                text: `${event.title} - ${formatDate(event.date)} ${event.startTime}`,
                url: window.location.href,
            });
        } else {
            handleCopyLink();
        }
    };

    // Handle contact client
    const handleContactClient = (client: any, method: 'phone' | 'email') => {
        if (method === 'phone' && client.phone) {
            window.open(`tel:${client.phone}`);
        } else if (method === 'email' && client.email) {
            window.open(`mailto:${client.email}`);
        }
    };

    // Handle view client
    const handleViewClient = (clientId: string) => {
        router.push(`/realstate/${userInfo?.uid}/clients/viewclient/${clientId}`);
    };

    // Handle get directions
    const handleGetDirections = () => {
        if (event?.address) {
            const encodedAddress = encodeURIComponent(event.address);
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!userInfo || !event) {
        return null;
    }

    const eventType = getEventTypeConfig(event.eventType);
    const formattedDate = formatDate(event.date);
    const duration = calculateDuration(event.startTime, event.endTime);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <Header userData={userInfo} />

            <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
                {/* Back Navigation */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push(`/realstate/${userInfo.uid}/events`)}
                        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Events</span>
                    </button>
                </div>

                {/* Header Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl ${eventType.bg} ${eventType.border}`}>
                                    <div className={eventType.color}>
                                        {eventType.icon}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{event.title}</h1>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventType.bg} ${eventType.color}`}>
                                            {eventType.label}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mt-2">{event.description}</p>
                                </div>
                            </div>

                            {/* Event Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <CalendarDays className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Date</p>
                                        <p className="font-semibold text-gray-900">{formattedDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Time</p>
                                        <p className="font-semibold text-gray-900">
                                            {event.startTime} - {event.endTime} ({duration})
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Reminder</p>
                                        <p className="font-semibold text-gray-900">
                                            {event.reminderTime} minutes before
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <p className="font-semibold text-gray-900">
                                            {event.reminderSent ? 'Reminder Sent' : 'Reminder Pending'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                            <Button
                                label="Edit Event"
                                icon={<Edit className="w-4 h-4" />}
                                onClick={handleEdit}
                                variant="theme"
                                size="md"
                            />
                            <Button
                                label="Share"
                                icon={<Share2 className="w-4 h-4" />}
                                onClick={handleShare}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Delete"
                                icon={<Trash2 className="w-4 h-4" />}
                                onClick={() => setShowDeleteModal(true)}
                                variant="danger"
                                size="md"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Location Section */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                    Location
                                </h2>
                                <Button
                                    label="Get Directions"
                                    icon={<ExternalLink className="w-4 h-4" />}
                                    onClick={handleGetDirections}
                                    variant="theme2"
                                    size="sm"
                                />
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Map className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">Meeting Address</p>
                                        <p className="text-gray-600 mt-1">{event.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clients Section */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                <Users className="w-5 h-5 text-purple-600" />
                                Attendees ({event.clientDetails?.length || 0})
                            </h2>

                            {event.clientDetails && event.clientDetails.length > 0 ? (
                                <div className="space-y-4">
                                    {event.clientDetails.map((client, index) => (
                                        <div
                                            key={client.id || index}
                                            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => handleViewClient(client.id)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                                                        {client.name?.split(' ').map(n => n[0]).join('') || 'C'}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-semibold text-gray-900">{client.name}</h3>
                                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                                Client
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mt-1">{client.email}</p>
                                                        <p className="text-gray-600 text-sm">{client.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleContactClient(client, 'phone');
                                                        }}
                                                        className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                                                        title="Call"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleContactClient(client, 'email');
                                                        }}
                                                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                        title="Email"
                                                    >
                                                        <MailIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600">No attendees added to this event</p>
                                </div>
                            )}
                        </div>

                        {/* Notes Section */}
                        {event.notes && (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-5 h-5 text-purple-600" />
                                    Additional Notes
                                </h2>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-gray-700 whitespace-pre-wrap">{event.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Event Details Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Event Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Created By</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                                            <User className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <p className="font-medium text-gray-900">{event.agentName}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Created On</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(event.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Event ID</p>
                                    <div className="flex items-center gap-2">
                                        <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                                            {event.id}
                                        </code>
                                        <button
                                            onClick={handleCopyLink}
                                            className="p-1 hover:bg-gray-100 rounded"
                                            title="Copy Event ID"
                                        >
                                            <Copy className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <Button
                                        label="Print"
                                        icon={<Printer className="w-4 h-4" />}
                                        onClick={() => window.print()}
                                        variant="theme2"
                                        size="sm"
                                    />
                                    <Button
                                        label="Export"
                                        icon={<Download className="w-4 h-4" />}
                                        onClick={() => message.info('Export feature coming soon')}
                                        variant="theme"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reminder Status */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Reminder Status</h2>

                            <div className={`p-4 rounded-xl ${event.reminderSent ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                                <div className="flex items-start gap-3">
                                    <Bell className={`w-5 h-5 ${event.reminderSent ? 'text-green-600' : 'text-yellow-600'}`} />
                                    <div>
                                        <p className={`font-semibold ${event.reminderSent ? 'text-green-800' : 'text-yellow-800'}`}>
                                            {event.reminderSent ? 'Reminder Sent ✓' : 'Reminder Pending'}
                                        </p>
                                        <p className={`text-sm mt-1 ${event.reminderSent ? 'text-green-700' : 'text-yellow-700'}`}>
                                            {event.reminderSent
                                                ? 'Clients have been notified about this event'
                                                : `Clients will be notified ${event.reminderTime} minutes before the event`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {!event.reminderSent && (
                                <div className="mt-4">
                                    <Button
                                        label="Send Reminder Now"
                                        onClick={() => message.info('Reminder feature coming soon')}
                                        variant="theme"
                                        size="sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Event"
                open={showDeleteModal}
                onOk={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                okText={deleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                okButtonProps={{ danger: true, loading: deleting }}
            >
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-50 text-red-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Are you sure you want to delete this event?</p>
                            <p className="text-gray-600 mt-1">
                                This action cannot be undone. All event details will be permanently removed.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-gray-900">{event?.title}</p>
                        <p className="text-sm text-gray-600">
                            {event?.date && formatDate(event.date)} • {event?.startTime} - {event?.endTime}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}