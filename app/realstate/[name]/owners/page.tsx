'use client'

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { getData, deleleData, auth, checkUserSession } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "@/components/Loader";
import {
    Users, Search, Eye, Edit, Trash2,
    Mail, Phone, Home, DollarSign, Calendar,
    TrendingUp, UserCheck, Building,
    Import,
    Layers
} from "lucide-react";
import { message } from "antd";

export default function OwnersPage() {
    const router = useRouter();
    const [owners, setOwners] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    // ✅ SINGLE useEffect for authentication and user data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);

                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser = localStorage.getItem('userInfo');
                if (!storedUser) {
                    message.error('User data not found');
                    router.replace('/login');
                    return;
                }

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
    }, [router]); // ✅ Runs only once

    // ✅ Fetch owners once userInfo is available
    useEffect(() => {
        if (userInfo?.uid) {
            setLoading(true);
            getData("owners/")
                .then((res: any) => {
                    if (res) {
                        const allOwners = Object.entries(res).map(([id, value]: [string, any]) => ({
                            id,
                            ...value
                        }));

                        const userOwners = allOwners.filter(
                            (owner: any) => owner.agentUid === userInfo?.uid
                        ).reverse()

                        setOwners(userOwners);
                    } else {
                        setOwners([]);
                    }
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    message.error('Error occurred while fetching owners');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userInfo?.uid]); // ✅ Only depends on uid

    const deleteOwner = (id: string) => {
        if (confirm("Are you sure you want to delete this owner?")) {
            deleleData(`owners/${id}`)
                .then(() => {
                    setOwners(prev => prev.filter(owner => owner.id !== id));
                    message.success("Owner deleted successfully");
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                    message.error('Error while deleting owner');
                });
        }
    };

    // Filter owners based on search input and active filter
    const filteredOwners = useMemo(() => {
        return owners.filter(owner => {
            const matchesSearch =
                owner.firstName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.lastName?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.email?.toLowerCase().includes(searchVal.toLowerCase()) ||
                owner.phone?.includes(searchVal);

            const matchesFilter =
                activeFilter === "all" ||
                owner.status?.toLowerCase() === activeFilter.toLowerCase(); // ✅ Fixed: both lowercase

            return matchesSearch && matchesFilter;
        });
    }, [owners, searchVal, activeFilter]);

    // ✅ Status filters (fixed comparison)
    const statusFilters = [
        { id: "all", label: "All Owners", count: owners.length },
        { id: "active", label: "Active", count: owners.filter(o => o.status?.toLowerCase() === 'active').length },
        { id: "deal-done", label: "Deal Done", count: owners.filter(o => o.status?.toLowerCase() === 'deal-done').length },
        { id: "inactive", label: "Inactive", count: owners.filter(o => o.status?.toLowerCase() === 'inactive').length }
    ];

    const calculateOwnersGrowth = useMemo(() => {
        if (!owners || owners.length === 0) return 0;

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const thisMonthCount = owners.filter((owner: any) => {
            if (!owner.createdAt) return false;
            return new Date(owner.createdAt) >= thisMonthStart;
        }).length;

        const percentage = Math.round((thisMonthCount / owners.length) * 100);
        return percentage;
    }, [owners]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'deal-done': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

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
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                    Owner's Management
                                </span>
                                <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Owner's{' '}
                                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Directory
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 mt-2 max-w-xl">
                                        Manage property owners, track their properties, and grow your real estate business.
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
                                    <span className="text-sm font-medium text-green-600">
                                        +{calculateOwnersGrowth}% this month
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{owners.length} Owners</div>
                                <div className="text-sm text-gray-600 mt-1">Total in your portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Owner"
                                icon={<Layers className="w-4 h-4" />}
                                onClick={() => router.push(`/realstate/${userInfo?.uid}/owners/addowner`)}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Owner"
                                icon={<Import className="w-4 h-4" />}
                                onClick={() => router.push(`/realstate/${userInfo?.uid}/owners/addowner`)}
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

                {/* Table */}
                <div>
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
                                        filteredOwners.map((owner) => (
                                            <tr
                                                key={owner.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => router.push(`/realstate/${userInfo?.uid}/owners/viewowner/${owner.id}`)}
                                            >
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                            <span className="font-bold text-purple-600 px-2">
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
                                                        <div className="flex items-center gap-2 text-sm text-gray-900">
                                                            <Mail className="h-3 w-3" />
                                                            {owner.email || "-"}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Phone className="h-3 w-3" />
                                                            {owner.phone}
                                                        </div>
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
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/realstate/${userInfo?.uid}/owners/viewowner/${owner.id}`);
                                                            }}
                                                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // ✅ FIXED: Added userInfo?.uid in path
                                                                router.push(
                                                                    `/realstate/${userInfo?.uid}/owners/addowner?ownerData=${encodeURIComponent(
                                                                        JSON.stringify(owner)
                                                                    )}`
                                                                );
                                                            }}
                                                            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteOwner(owner.id);
                                                            }}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
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
                                                    Click "Add Owner" to add your first owner
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