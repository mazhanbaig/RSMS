'use client';

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Home, DollarSign, Bed, Bath, Car, AlertCircle, CheckCircle, Clock, Edit, ArrowLeft, User, Calendar, Plus, Trash2, Search, MessageSquare, PhoneCall } from "lucide-react";

export default function ViewClientPage() {
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

    const router = useRouter();
    const { id } = useParams();
    const [client, setClient] = useState<ClientData | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'activity'>('details');
    const [newNote, setNewNote] = useState('');

    // Load userInfo from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const parsed: UserInfo = JSON.parse(stored);
                setUserInfo(parsed);
            } catch (err) {
                console.error("Failed to parse userInfo:", err);
            }
        }
    }, []);

    // Fetch client data
    useEffect(() => {
        if (!id) return;

        const fetchClient = async () => {
            try {
                const clientData:any = await getData(`clients/${id}`);
                if (clientData) {
                    setClient(clientData);
                } else {
                    console.error("Client not found");
                    router.push('/clients');
                }
            } catch (error) {
                console.error("Error fetching client:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id, router]);

    // Update client status
    const updateStatus = async (newStatus: string) => {
        if (!client || !id) return;

        try {
            await updateData(`clients/${id}`, {
                ...client,
                status: newStatus,
                lastContacted: new Date().toISOString().split('T')[0]
            });
            setClient(prev => prev ? { ...prev, status: newStatus } : null);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-blue-100 text-blue-800';
            case 'lost': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'closed': return <CheckCircle className="w-4 h-4" />;
            case 'lost': return <AlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto mt-16 px-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Not Found</h2>
                        <p className="text-gray-600 mb-6">The client you're looking for doesn't exist or has been deleted.</p>
                        <Button
                            label="Back to Clients"
                            onClick={() => router.push('/clients')}
                            variant="theme2"
                            size="md"
                            icon={<ArrowLeft className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
            <Header userData={userInfo} />

            <div className="max-w-6xl mx-auto mt-16 px-4 sm:px-6 md:px-6 lg:px-6">

                {/* Client Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 mb-2">
                        Client{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                            Details
                        </span>
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Complete information and management for {client.firstName} {client.lastName}
                    </p>
                </div>

                {/* Client Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                                {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                                    {client.firstName} {client.lastName}
                                </h2>
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Mail size={14} className="text-purple-600" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Phone size={14} className="text-blue-600" />
                                        <span className="truncate">{client.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className={`px-3 py-1 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 ${getStatusColor(client.status)} text-xs sm:text-sm`}>
                                {getStatusIcon(client.status)}
                                <span className="font-semibold capitalize">{client.status}</span>
                            </div>
                            <Button
                                label="Edit Client"
                                onClick={() => router.push(`/clients/addclient?clientData=${encodeURIComponent(JSON.stringify(client))}`)}
                                variant="theme2"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        <div className="bg-gray-50 p-2 sm:p-4 rounded-xl text-xs sm:text-sm">
                            <div className="text-gray-600 mb-1 truncate">Source</div>
                            <div className="font-bold text-gray-900 capitalize truncate">{client.source}</div>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-4 rounded-xl text-xs sm:text-sm">
                            <div className="text-gray-600 mb-1 truncate">Property Type</div>
                            <div className="font-bold text-gray-900 capitalize truncate">{client.propertyType}</div>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-4 rounded-xl text-xs sm:text-sm">
                            <div className="text-gray-600 mb-1 truncate">Locations</div>
                            <div className="font-bold text-gray-900 truncate">{client.preferredLocations}</div>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-4 rounded-xl text-xs sm:text-sm">
                            <div className="text-gray-600 mb-1 truncate">Budget Range</div>
                            <div className="font-bold text-gray-900">${client.minBudget.toLocaleString()} - ${client.maxBudget.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Main Tabs + Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <nav className="flex flex-wrap">
                                    {['details', 'notes'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as 'details' | 'notes' | 'activity')}
                                            className={`flex-1 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors ${activeTab === tab ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-4 sm:p-6">
                                {activeTab === 'details' && (
                                    <div className="space-y-6">
                                        {/* Property Requirements */}
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Property Requirements</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Home className="w-5 h-5 text-purple-600" />
                                                        <div className="text-sm text-gray-600">Property Type</div>
                                                    </div>
                                                    <div className="font-bold text-gray-900 capitalize">{client.propertyType}</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Bed className="w-5 h-5 text-purple-600" />
                                                        <div className="text-sm text-gray-600">Bedrooms</div>
                                                    </div>
                                                    <div className="font-bold text-gray-900">{client.bedrooms}</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <DollarSign className="w-5 h-5 text-purple-600" />
                                                        <div className="text-sm text-gray-600">Budget Range</div>
                                                    </div>
                                                    <div className="font-bold text-gray-900">${client.minBudget.toLocaleString()} - ${client.maxBudget.toLocaleString()}</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <MapPin className="w-5 h-5 text-purple-600" />
                                                        <div className="text-sm text-gray-600">Preferred Areas</div>
                                                    </div>
                                                    <div className="font-bold text-gray-900">{client.preferredLocations}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold text-gray-900">Client Notes</h3>
                                            <Button
                                                label="Add Note"
                                                variant="theme2"
                                                size="sm"
                                                icon={<Plus className="w-4 h-4" />}
                                                onClick={() => {
                                                    if (newNote.trim()) {
                                                        const updatedNotes = client.notes ? `${client.notes} ${newNote}` : newNote;
                                                        updateData(`clients/${id}`, { ...client, notes: updatedNotes })
                                                            .then(() => {
                                                                setClient(prev => prev ? { ...prev, notes: updatedNotes } : null);
                                                                setNewNote('');
                                                            });
                                                    }
                                                }}
                                            />
                                        </div>
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            placeholder="Add a new note..."
                                            className="w-full h-32 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                        {client.notes ? (
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-gray-700 whitespace-pre-line">{client.notes}</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                                <p>No notes added yet. Add your first note above.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit">
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-4">Quick Actions</h3>
                        <div className="space-y-2 sm:space-y-3">
                            <Button
                                label="Send Email"
                                variant="theme2"
                                icon={<Mail className="w-4 h-4" />}
                                size="sm"
                                onClick={() => window.location.href = `mailto:${client.email}`}
                            />
                            <Button
                                label="Make Call"
                                variant="theme"
                                icon={<PhoneCall className="w-4 h-4" />}
                                size="sm"
                                onClick={() => window.location.href = `tel:${client.phone}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}  