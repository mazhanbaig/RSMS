'use client';

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, deleleData, checkUserSession } from "@/FBConfig/fbFunctions";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useCallback, useState } from "react";
import {
    Users, Eye, Edit,
    Trash2, DollarSign, TrendingUp,
    UserCheck,
    Import,
    Layers
} from "lucide-react";
import React from "react";
import Loader from "@/components/Loader";
import DraggableButton from "@/components/DraggableButton";

export default function ClientsPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
    }

    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);

    // SINGLE useEffect for authentication and user data
    useEffect(() => {
        const initPage = async () => {
            try {
                setLoading(true);

                // 1. Check Firebase Auth session
                const sessionUser = await checkUserSession();
                if (!sessionUser) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                // 2. Get user data from localStorage
                const storedUser = localStorage.getItem('userInfo');
                if (!storedUser) {
                    message.error('User data not found');
                    router.replace('/login');
                    return;
                }

                const userData: any = JSON.parse(storedUser);
                setUserInfo(userData);

                // 3. Fetch clients immediately
                await fetchClients(userData.uid);

            } catch (err) {
                message.error("Something went wrong!");
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        initPage();
    }, [router]);

    // Separate function to fetch clients
    const fetchClients = async (uid: string) => {
        try {
            const res = await getData(`clients/${uid}`);
            if (res) {
                const clientsArray = Object.entries(res).map(([id, value]: any) => ({
                    id,
                    ...value
                })).reverse()
                setClients(clientsArray);
            } else {
                setClients([]);
            }
        } catch (err) {
            message.error("Failed to load clients");
        }
    };

    // Optimized delete function
    const deleteClient = useCallback(async (id: string) => {
        if (!confirm("Are you sure you want to delete this client?")) return;
        if (!id) {
            message.error("Something went wrong")
            return
        }
        try {
            if (!userInfo?.uid) {
                message.error("Something went wrong")
                return
            }
            await deleleData(`clients/${userInfo?.uid}/${id}`);
            setClients(prev => prev.filter(client => client.id !== id));
            message.success("Client deleted successfully");
        } catch (err) {
            console.error(err);
            message.error("Something went wrong!");
        }
    }, [userInfo?.uid]);

    // Fast filtered clients (memoized)
    const filteredClients = useMemo(() => {
        if (!clients.length) return [];

        return clients.filter(client => {
            const matchesSearch = !searchVal ||
                client.firstName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                client.lastName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                client.email?.toLowerCase().includes(searchVal.toLowerCase()) ||
                client.phone?.includes(searchVal);

            const matchesFilter = activeFilter === "all" ||
                client.status?.toLowerCase() === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [clients, searchVal, activeFilter]);

    // Fast status filters (memoized)
    const statusFilters = useMemo(() => [
        { id: "all", label: "All Clients", count: clients.length },
        { id: "active", label: "Active", count: clients.filter(c => c.status === 'active').length },
        { id: "new", label: "New", count: clients.filter(c => c.status === 'new').length },
        { id: "converted", label: "Converted", count: clients.filter(c => c.status === 'converted').length },
        { id: "lost", label: "Lost", count: clients.filter(c => c.status === 'lost').length }
    ], [clients]);

    // Fast growth calculation
    const calculateClientsGrowth = useMemo(() => {
        if (!clients.length) return 0;

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const thisMonthCount = clients.filter(client =>
            client.createdAt && new Date(client.createdAt) >= thisMonthStart
        ).length;

        return Math.round((thisMonthCount / clients.length) * 100);
    }, [clients]);

    // Fast status color function
    const getStatusColor = useCallback((status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'new': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'converted': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'lost': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    }, []);

    // Optimized handlers
    const handleAddClient = useCallback(() => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients/addclient`);
        }
    }, [router, userInfo?.uid]);

    const handleViewClient = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients/viewclient/${id}`);
        }
    }, [router, userInfo?.uid]);

    const handleEditClient = useCallback((client: any, e: React.MouseEvent) => {
        e.stopPropagation();
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients/addclient?clientData=${encodeURIComponent(JSON.stringify(client))}`);
        }
    }, [router, userInfo?.uid]);

    const handleDeleteClient = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteClient(id);
    }, [deleteClient]);

    const handleRowClick = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients/viewclient/${id}`);
        }
    }, [router, userInfo?.uid]);

    // Show loader while loading
    if (loading || !userInfo) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Welcome Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        {/* Left Side - Welcome Message */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Clients Management</span>
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                        Client's {''}
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Directory
                                        </span>
                                    </h1>
                                    <p className="text-slate-500 mt-2 max-w-xl">
                                        Manage your client relationships, track inquiries, and grow your real estate business.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Quick Stats */}
                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-5 py-4 border border-indigo-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-indigo-600" />
                                        <span className="text-sm font-medium text-slate-700">Client Growth</span>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600">+{calculateClientsGrowth}% this month</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-800">{clients.length} Clients</div>
                                <div className="text-sm text-slate-500 mt-1">Total in your portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm px-4 py-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Client"
                                icon={<Layers className="w-4 h-4" />}
                                onClick={handleAddClient}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Client"
                                icon={<Import className="w-4 h-4" />}
                                onClick={handleAddClient}
                                variant="theme"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                value={searchVal}
                                placeholder="Search clients by name, email, number"
                                className="md:min-w-80 border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === filter.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {filter.label}
                                <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800">All Clients</h2>
                        <div className="text-sm text-slate-500">
                            Showing {filteredClients.length} of {clients.length} clients
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-slate-800">Client</th>
                                        <th className="text-left p-4 font-semibold text-slate-800">Contact</th>
                                        <th className="text-left p-4 font-semibold text-slate-800">Preferences</th>
                                        <th className="text-left p-4 font-semibold text-slate-800">Budget</th>
                                        <th className="text-left p-4 font-semibold text-slate-800">Status</th>
                                        <th className="text-left p-4 font-semibold text-slate-800">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredClients.length > 0 ? (
                                        filteredClients.map((client: any) => (
                                            <tr
                                                key={client.id}
                                                className="hover:bg-slate-50 cursor-pointer"
                                                onClick={() => handleRowClick(client.id)}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                                            <span className="font-bold text-indigo-600">
                                                                {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-800">
                                                                {client.firstName} {client.lastName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-slate-800">{client.email}</div>
                                                        <div className="text-sm text-slate-500">{client.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-slate-800">{client.propertyType}</div>
                                                        <div className="text-sm text-slate-500">{client.bedrooms} Beds • {client.preferredLocations}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm font-medium text-slate-800">
                                                        ${client.minBudget} - ${client.maxBudget}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(client.status)}`}>
                                                        {client.status || 'New'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => handleViewClient(client.id, e)}
                                                            className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleEditClient(client, e)}
                                                            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition-colors"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDeleteClient(client.id, e)}
                                                            className="p-2 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center">
                                                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                                <p className="text-slate-600">No clients found</p>
                                                <p className="text-sm text-slate-500 mt-2">
                                                    {searchVal || activeFilter !== 'all'
                                                        ? 'Try changing your search or filter'
                                                        : 'Click "Add Client" to add your first client'}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <DraggableButton onClick={handleAddClient} />
            </main>
        </div>
    );
}