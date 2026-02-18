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

export default function OwnersPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
    }

    const router = useRouter();
    const [owners, setOwners] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);

    // ✅ SINGLE useEffect for authentication and user data
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

                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

                // 3. Fetch owners immediately
                await fetchOwners(userData.uid);

            } catch (err) {
                message.error('Error loading page');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        initPage();
    }, [router]);

    // ✅ Separate function to fetch owners
    const fetchOwners = async (uid: string) => {
        try {
            const res = await getData(`owners/${uid}`);
            if (res) {
                const ownersArray = Object.entries(res).map(([id, value]: any) => ({
                    id,
                    ...value
                }));

                // Filter only this agent's owners
                const userOwners = ownersArray
                    .filter(owner => owner.agentUid === uid)
                    .reverse();

                setOwners(userOwners);
            } else {
                setOwners([]);
            }
        } catch (err) {
            console.error("Fetch owners error:", err);
            message.error("Failed to load owners");
        }
    };

    // ✅ Optimized delete function
    const deleteOwner = useCallback(async (id: string) => {
        if (!confirm("Are you sure you want to delete this owner?")) return;

        try {
            if (!userInfo?.uid) {
                message.error("Something went wrong")
                return
            }
            await deleleData(`owners/${userInfo?.uid}/${id}`);
            setOwners(prev => prev.filter(owner => owner.id !== id));
            message.success("Owner deleted successfully");
        } catch (err) {
            console.error(err);
            message.error("Failed to delete owner");
        }
    }, [userInfo?.uid]);

    // ✅ Fast filtered owners (memoized)
    const filteredOwners = useMemo(() => {
        if (!owners.length) return [];

        return owners.filter(owner => {
            const matchesSearch = !searchVal ||
                owner.firstName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.lastName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.email?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.phone?.includes(searchVal);

            const matchesFilter = activeFilter === "all" ||
                owner.status?.toLowerCase() === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [owners, searchVal, activeFilter]);

    // ✅ Fast stats calculation (memoized)
    const ownerStats = useMemo(() => [
        {
            title: "Total Owners",
            value: owners.length,
            icon: <Users className="h-5 w-5 text-blue-600" />,
        },
        {
            title: "Active Owners",
            value: owners.filter(o => o.status === 'active').length,
            icon: <UserCheck className="h-5 w-5 text-green-600" />,
        },
        {
            title: "Deal Done",
            value: owners.filter(o => o.status === 'deal-done').length,
            icon: <DollarSign className="h-5 w-5 text-purple-600" />,
        },
        {
            title: "Properties",
            value: owners.reduce((acc, o) => acc + (o.propertyCount || 0), 0),
            icon: <TrendingUp className="h-5 w-5 text-amber-600" />,
        }
    ], [owners]);

    // ✅ Fast status filters (memoized)
    const statusFilters = useMemo(() => [
        { id: "all", label: "All Owners", count: owners.length },
        { id: "active", label: "Active", count: owners.filter(o => o.status === 'active').length },
        { id: "deal-done", label: "Deal Done", count: owners.filter(o => o.status === 'deal-done').length },
        { id: "inactive", label: "Inactive", count: owners.filter(o => o.status === 'inactive').length }
    ], [owners]);

    // ✅ Fast growth calculation
    const calculateOwnersGrowth = useMemo(() => {
        if (!owners.length) return 0;

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const thisMonthCount = owners.filter(owner =>
            owner.createdAt && new Date(owner.createdAt) >= thisMonthStart
        ).length;

        return Math.round((thisMonthCount / owners.length) * 100);
    }, [owners]);

    // ✅ Fast status color function
    const getStatusColor = useCallback((status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'deal-done': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }, []);

    // ✅ Optimized handlers
    const handleAddOwner = useCallback(() => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners/addowner`);
        }
    }, [router, userInfo?.uid]);

    const handleViewOwner = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners/viewowner/${id}`);
        }
    }, [router, userInfo?.uid]);

    const handleEditOwner = useCallback((owner: any, e: React.MouseEvent) => {
        e.stopPropagation();
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners/addowner?ownerData=${encodeURIComponent(JSON.stringify(owner))}`);
        }
    }, [router, userInfo?.uid]);

    const handleDeleteOwner = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteOwner(id);
    }, [deleteOwner]);

    const handleRowClick = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners/viewowner/${id}`);
        }
    }, [router, userInfo?.uid]);

    // Show loader while loading
    if (loading || !userInfo) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Welcome Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        {/* Left Side - Welcome Message */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Owners Management</span>
                                <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Owner's {''}
                                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Directory
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 mt-2 max-w-xl">
                                        Manage your property owners, track their properties, and grow your real estate business.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Quick Stats */}
                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl px-5 py-4 border border-purple-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">Owner Growth</span>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">+{calculateOwnersGrowth}% this month</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{owners.length} Owners</div>
                                <div className="text-sm text-gray-600 mt-1">Total in your portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm px-4 py-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Owner"
                                icon={<Layers className="w-4 h-4" />}
                                onClick={handleAddOwner}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Owner"
                                icon={<Import className="w-4 h-4" />}
                                onClick={handleAddOwner}
                                variant="theme"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                value={searchVal}
                                placeholder="Search owners by name, email, number"
                                className="md:min-w-80 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                        <h2 className="text-xl font-bold text-gray-900">All Owners</h2>
                        <div className="text-sm text-gray-600">
                            Showing {filteredOwners.length} of {owners.length} owners
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-900">Owner</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Contact</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Properties</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredOwners.length > 0 ? (
                                        filteredOwners.map((owner: any) => (
                                            <tr
                                                key={owner.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => handleRowClick(owner.id)}
                                            >
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                            <span className="font-bold text-purple-600">
                                                                {owner.firstName?.charAt(0)}{owner.lastName?.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {owner.firstName} {owner.lastName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-900">{owner.email}</div>
                                                        <div className="text-sm text-gray-500">{owner.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {owner.propertyCount || 0} Properties
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {owner.propertyTypes || "Various types"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(owner.status)}`}>
                                                        {owner.status || 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => handleViewOwner(owner.id, e)}
                                                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleEditOwner(owner, e)}
                                                            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition-colors"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDeleteOwner(owner.id, e)}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center">
                                                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-600">No owners found</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {searchVal || activeFilter !== 'all'
                                                        ? 'Try changing your search or filter'
                                                        : 'Click "Add Owner" to add your first owner'}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}