'use client'

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Phone, AlertCircle, CheckCircle, Clock, Edit, ArrowLeft, User, Plus, MessageSquare } from "lucide-react";

export default function ViewOwnerPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    interface OwnerData {
        id: string;
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        status: string;
        notes?: string;
        createdAt?: string;
        [key: string]: any;
    }

    const router = useRouter();
    const { id } = useParams();
    const [owner, setOwner] = useState<OwnerData | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'details' | 'notes'>('details');
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) setUserInfo(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchOwner = async () => {
            try {
                const data:any = await getData(`owners/${id}`);
                if (data) setOwner(data);
                else router.push('/owners');
            } catch (err) {
                console.error("Error fetching owner:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOwner();
    }, [id, router]);

    const updateStatus = async (newStatus: string) => {
        if (!owner || !id) return;
        try {
            await updateData(`owners/${id}`, { ...owner, status: newStatus });
            setOwner(prev => prev ? { ...prev, status: newStatus } : null);
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'closed': return <AlertCircle className="w-4 h-4" />;
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

    if (!owner) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto mt-16 px-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Owner Not Found</h2>
                        <p className="text-gray-600 mb-6">The owner you're looking for doesn't exist or has been deleted.</p>
                        <Button
                            label="Back to Owners"
                            onClick={() => router.push('/owners')}
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
                {/* Back Navigation */}
                <div className="mb-6">
                    <Button
                        label="Back to Owners"
                        onClick={() => router.push('/owners')}
                        variant="theme2"
                        size="md"
                        icon={<ArrowLeft className="w-4 h-4" />}
                    />
                </div>

                {/* Owner Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 mb-2">
                        Owner{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                            Details
                        </span>
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Complete information and management for {owner.firstName} {owner.lastName}
                    </p>
                </div>

                {/* Owner Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                                {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                                    {owner.firstName} {owner.lastName}
                                </h2>
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                                    {owner.email && (
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={14} className="text-purple-600" />
                                            <span className="truncate">{owner.email}</span>
                                        </div>
                                    )}
                                    {owner.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={14} className="text-blue-600" />
                                            <span className="truncate">{owner.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className={`px-3 py-1 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 ${getStatusColor(owner.status)} text-xs sm:text-sm`}>
                                {getStatusIcon(owner.status)}
                                <span className="font-semibold capitalize">{owner.status}</span>
                            </div>
                            <Button
                                label="Edit Owner"
                                onClick={() => router.push(`/owners/addowner?ownerData=${encodeURIComponent(JSON.stringify(owner))}`)}
                                variant="theme2"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav className="flex flex-wrap">
                                    {['details', 'notes'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as 'details' | 'notes')}
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
                                        <p className="text-gray-700">Owner specific details can go here, e.g., assigned clients, total properties, or any custom fields.</p>
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold text-gray-900">Owner Notes</h3>
                                            <Button
                                                label="Add Note"
                                                variant="theme2"
                                                size="sm"
                                                icon={<Plus className="w-4 h-4" />}
                                                onClick={() => {
                                                    if (newNote.trim()) {
                                                        const updatedNotes = owner.notes ? `${owner.notes}\n${newNote}` : newNote;
                                                        updateData(`owners/${id}`, { ...owner, notes: updatedNotes })
                                                            .then(() => {
                                                                setOwner(prev => prev ? { ...prev, notes: updatedNotes } : null);
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
                                        {owner.notes ? (
                                            <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-line">{owner.notes}</div>
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

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit">
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-4">Quick Actions</h3>
                        <div className="space-y-2 sm:space-y-3">
                            {owner.email && (
                                <Button
                                    label="Send Email"
                                    variant="theme2"
                                    icon={<Mail className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => window.location.href = `mailto:${owner.email}`}
                                />
                            )}
                            {owner.phone && (
                                <Button
                                    label="Make Call"
                                    variant="theme"
                                    icon={<Phone className="w-4 h-4" />}
                                    size="sm"
                                    onClick={() => window.location.href = `tel:${owner.phone}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
