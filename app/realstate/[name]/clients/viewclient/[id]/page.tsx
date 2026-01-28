'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { message } from "antd";
import {
    Phone, Mail, MapPin, Home, DollarSign, Bed, Bath,
    CheckCircle, Clock, Edit, ArrowLeft, Plus,
    MessageSquare, PhoneCall, Users, Calendar,
    FileText, Activity, Zap, Target, Star,
    Heart, TrendingUp, Shield, Bell, Briefcase,
    Layers, Compass, LineChart, Clipboard
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

interface ClientData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyType: string;
    preferredLocations: string;
    bedrooms: string;
    minBudget: number;
    maxBudget: number;
    source: string;
    status: string;
    notes?: string;
    createdAt?: string;
    lastContacted?: string;
    requirements?: string;
    ownerUid: string;
    [key: string]: any;
}

export default function ViewClientPage() {
    const router = useRouter();
    const { id } = useParams();
    const [client, setClient] = useState<ClientData | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [activePanel, setActivePanel] = useState('details');
    const [newNote, setNewNote] = useState('');

    // Load user info
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const parsed: UserInfo = JSON.parse(stored);
                setUserInfo(parsed);
            } catch (err) {
                message.error('Error loading user info');
            }
        }
    }, []);

    // Fetch client data
    const fetchClientData = useCallback(async () => {
        if (!id) return;

        try {
            const clientData: any = await getData(`clients/${id}`);
            if (clientData) {
                setClient({ ...clientData, id: id as string });
            } else {
                message.error('Client not found');
                router.push(`/realstate/${userInfo?.uid}/clients`);
            }
        } catch (error) {
            console.error("Error fetching client:", error);
            message.error('Failed to load client data');
        } finally {
            setLoading(false);
        }
    }, [id, router, userInfo?.uid]);

    useEffect(() => {
        fetchClientData();
    }, [fetchClientData]);

    // Update status
    const updateStatus = useCallback(async (newStatus: string) => {
        if (!client || !id) return;

        try {
            await updateData(`clients/${id}`, {
                ...client,
                status: newStatus,
                lastContacted: new Date().toISOString().split('T')[0]
            });
            setClient(prev => prev ? { ...prev, status: newStatus } : null);
            message.success(`Status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            message.error('Failed to update status');
        }
    }, [client, id]);

    // Helper functions
    const getStatusConfig = useCallback((status: string) => {
        const configs = {
            'active': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: <CheckCircle className="w-4 h-4" /> },
            'pending': { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <Clock className="w-4 h-4" /> },
            'closed': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <CheckCircle className="w-4 h-4" /> },
            'lost': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <div className="w-4 h-4">✕</div> },
        };
        return configs[status as keyof typeof configs] || configs.active;
    }, []);

    const formatDate = useCallback((dateString?: string) => {
        if (!dateString) return 'Not contacted yet';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }, []);

    // Memoized values
    const clientInitials = useMemo(() =>
        client ? `${client.firstName.charAt(0)}${client.lastName.charAt(0)}`.toUpperCase() : '',
        [client]
    );

    const statusConfig = useMemo(() =>
        client ? getStatusConfig(client.status) : getStatusConfig('active'),
        [client, getStatusConfig]
    );

    // Panel configuration
    const panels = [
        { id: 'details', label: 'Details', icon: <Clipboard className="w-4 h-4" /> },
        { id: 'requirements', label: 'Requirements', icon: <Target className="w-4 h-4" /> },
        { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> }
    ];

    if (loading) {
        return <Loader />;
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="text-2xl">✕</div>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
                        <p className="text-gray-600 mb-6">The client you're looking for doesn't exist.</p>
                        <Button
                            label="Back to Clients"
                            onClick={() => router.push(`/realstate/${userInfo?.uid}/clients`)}
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
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <Header userData={userInfo} />

            <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Client Header - Elegant & Minimal */}
                <div className="mb-8 mt-5">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

                        {/* Left Section */}
                        <div className="flex items-start gap-3 sm:items-center">
                            <button
                                onClick={() => router.push(`/realstate/${userInfo?.uid}/clients`)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                    {client.firstName}{" "}
                                    <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-transparent bg-clip-text">
                                        {client.lastName}
                                    </span>
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Client Profile • Real Estate
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div
                                className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.border} border flex items-center gap-2`}
                            >
                                {statusConfig.icon}
                                <span className="text-sm font-medium capitalize">
                                    {client.status}
                                </span>
                            </div>

                            <Button
                                label="Edit"
                                onClick={() =>
                                    router.push(
                                        `/realstate/${userInfo?.uid}/clients/addclient?clientData=${encodeURIComponent(
                                            JSON.stringify(client)
                                        )}`
                                    )
                                }
                                variant="theme"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid - Balanced Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Client Info */}
                    <div className="space-y-6">
                        {/* Client Profile Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                                    {clientInitials}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">{client.firstName} {client.lastName}</h2>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-3.5 h-3.5" />
                                            <span className="truncate">{client.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-3.5 h-3.5" />
                                            <span>{client.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Source</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 capitalize">{client.source}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Last Contact</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(client.lastContacted)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Created</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(client.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    label="Send Email"
                                    variant="theme"
                                    icon={<Mail className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => window.location.href = `mailto:${client.email}`}
                                />
                                <Button
                                    label="Make Call"
                                    variant="theme2"
                                    icon={<PhoneCall className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => window.location.href = `tel:${client.phone}`}
                                />
                                <Button
                                    label="Schedule Viewing"
                                    variant="theme2"
                                    icon={<Calendar className="w-4 h-4" />}
                                    size="sm"
                                />
                            </div>
                        </div>

                        {/* Status Update */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { status: 'active', label: 'Active' },
                                    { status: 'deal-Done', label: 'Deal Done' },
                                    { status: 'lost', label: 'Lost' }
                                ].map((item) => {
                                    const config = getStatusConfig(item.status);
                                    const isActive = client.status === item.status;

                                    return (
                                        <button
                                            key={item.status}
                                            onClick={() => updateStatus(item.status)}
                                            className={`px-3 py-2.5 rounded-lg text-sm transition-all duration-200 border flex items-center justify-center gap-2
                                                ${isActive
                                                    ? `${config.bg} ${config.border} border ${config.color} font-medium`
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {config.icon}
                                            {item.label}
                                        </button>
                                    );
                                })}
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
                            {activePanel === 'details' && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Overview</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="px-4 py-2 rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-purple-100 rounded-lg">
                                                        <DollarSign className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Budget Range</div>
                                                        <div className="font-semibold text-gray-900">
                                                            ${client.minBudget.toLocaleString()} - ${client.maxBudget.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2  rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <Home className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Property Type</div>
                                                        <div className="font-semibold text-gray-900 capitalize">{client.propertyType}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2  rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <Bed className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Bedrooms</div>
                                                        <div className="font-semibold text-gray-900">{client.bedrooms}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-2  rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-amber-100 rounded-lg">
                                                        <Layers className="w-4 h-4 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Priority</div>
                                                        <div className="font-semibold text-gray-900">High</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Preferences</h3>
                                        <div className="p-4 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3 mb-3">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Preferred Locations</div>
                                                    <div className="text-gray-700 mt-1">{client.preferredLocations}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activePanel === 'requirements' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Requirements</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Home className="w-4 h-4 text-purple-600" />
                                                <span className="font-medium text-gray-900">Type</span>
                                            </div>
                                            <div className="text-gray-700 capitalize">{client.propertyType}</div>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Bed className="w-4 h-4 text-blue-600" />
                                                <span className="font-medium text-gray-900">Bedrooms</span>
                                            </div>
                                            <div className="text-gray-700">{client.bedrooms}</div>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <span className="font-medium text-gray-900">Min Budget</span>
                                            </div>
                                            <div className="text-gray-700">${client.minBudget.toLocaleString()}</div>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-amber-600" />
                                                <span className="font-medium text-gray-900">Max Budget</span>
                                            </div>
                                            <div className="text-gray-700">${client.maxBudget.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {client.requirements && (
                                        <div className="mt-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Plus className="w-4 h-4 text-gray-600" />
                                                <span className="font-medium text-gray-900">Additional Requirements</span>
                                            </div>
                                            <div className="p-4 rounded-lg bg-gray-50">
                                                <p className="text-gray-700">{client.requirements}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'notes' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Client Notes</h3>
                                        <Button
                                            label="Add Note"
                                            variant="theme"
                                            size="sm"
                                            icon={<Plus className="w-4 h-4" />}
                                            onClick={async () => {
                                                if (newNote.trim()) {
                                                    try {
                                                        const updatedNotes = client.notes ? `${client.notes}\n\n${newNote}` : newNote;
                                                        await updateData(`clients/${id}`, { ...client, notes: updatedNotes });
                                                        setClient(prev => prev ? { ...prev, notes: updatedNotes } : null);
                                                        setNewNote('');
                                                        message.success('Note added successfully');
                                                    } catch (error) {
                                                        message.error('Failed to add note');
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            placeholder="Add a new note..."
                                            className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
                                            rows={4}
                                        />
                                    </div>

                                    {client.notes ? (
                                        <div className="space-y-4">
                                            {client.notes.split('\n\n').filter(note => note.trim()).map((note, index) => (
                                                <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-500">{formatDate(client.createdAt)}</span>
                                                    </div>
                                                    <p className="text-gray-700">{note}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p>No notes yet. Add your first note above.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'activity' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Calendar className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Client Created</div>
                                                <div className="text-sm text-gray-600 mt-1">{formatDate(client.createdAt)}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <PhoneCall className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Last Contact</div>
                                                <div className="text-sm text-gray-600 mt-1">{formatDate(client.lastContacted)}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 px-4 py-2 rounded-lg border border-gray-200">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Status Updated</div>
                                                <div className="text-sm text-gray-600 mt-1">Changed to <span className="font-medium capitalize">{client.status}</span></div>
                                            </div>
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