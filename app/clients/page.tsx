// 'use client';

// import Button from "@/components/Button";
// import Header from "@/components/Header";
// import { getData, deleleData, auth } from "@/FBConfig/fbFunctions";
// import { message } from "antd";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ClientsPage() {
//     interface UserInfo {
//         uid: string;
//         email?: string;
//         name?: string;
//         [key: string]: any;
//     }

//     const router = useRouter();
//     const [clients, setClients] = useState<any[]>([]);
//     const [searchVal, setSearchVal] = useState<string>('');
//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (!user) {
//                 router.replace("/login");
//             }
//         });
//         return () => unsubscribe();
//     }, [])


//     // Load userInfo from localStorage once
//     useEffect(() => {
//         const stored = localStorage.getItem('userInfo');
//         if (stored) {
//             try {
//                 const parsed: UserInfo = JSON.parse(stored);
//                 getData(`users/${parsed.uid}`)
//                     .then((res: any) => {
//                         setUserInfo(res)
//                     })
//                     .catch((err: any) => {
//                         console.error(err.message);
//                     })
//                 setUserInfo(parsed);
//             } catch (err) {
//                 console.error("Failed to parse userInfo:", err);
//             }
//         }
//     }, []);

//     // Fetch clients once userInfo is available
//     useEffect(() => {
//         getData('clients/')
//             .then((res: any) => {
//                 if (res) {
//                     const clientsArray = Object.values(res);

//                     const ownerClients = clientsArray.filter(
//                         (client: any) => client.ownerUid === userInfo?.uid
//                     );

//                     setClients(ownerClients);
//                     console.log('Fetched clients:', ownerClients);
//                 } else {
//                     setClients([]);
//                 }
//             })
//             .catch(err => console.log(err));
//     }, [userInfo]);

//     // Delete client
//     const deleteClient = (i: number) => {
//         const client = clients[i];
//         deleleData(`clients/${client.id}`)
//             .then(() => {
//                 const updated = [...clients];
//                 updated.splice(i, 1);
//                 setClients(updated);
//             })
//             .catch(err => console.log(err));
//     };

//     // Filter clients based on search input
//     const filteredClients = clients.filter(client =>
//         client.firstName.toLowerCase().includes(searchVal.toLowerCase())
//     );

//     if (!userInfo) {
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//         </div>
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header userData={userInfo} />

//             <div className="p-6 max-w-7xl mx-auto">
//                 {/* Page Header with Stats */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//                     <h1 className="text-3xl font-bold text-gray-900">Clients</h1>

//                     <div className="flex gap-6">
//                         <div className="text-center">
//                             <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
//                             <div className="text-sm text-gray-600">Total Clients</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                 {clients.filter(c => c.status === 'active').length}
//                             </div>
//                             <div className="text-sm text-gray-600">Active</div>
//                         </div>
//                     </div>
//                 </div>

// {/* Action Bar */}
// <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex flex-wrap gap-3">
//             <Button
//                 label="+ Add Client"
//                 onClick={() => router.push("/clients/addclient")}
//                 variant="theme2"
//                 size="md"
//             />
//             <Button
//                 label="Import Client"
//                 onClick={() => router.push("/clients/addclient")}
//                 variant="theme"
//                 size="md"
//             />
//         </div>

//         <div className="flex flex-wrap gap-3">
//             <input
//                 type="text"
//                 value={searchVal}
//                 placeholder="Search clients..."
//                 className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 onChange={(e) => setSearchVal(e.target.value)}
//             />
//         </div>
//     </div>
// </div>

//                 {/* Clients Table */}
//                 <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
//                     <table className="w-full min-w-[800px]">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="text-left p-3 font-semibold text-gray-900">#</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Client Name</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Email</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Phone</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Property Type</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Preferred Locations</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Bedrooms</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Budget</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Source</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Status</th>
//                                 <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {filteredClients.length > 0 ? (
//                                 filteredClients.map((client: any, index: number) => (
//                                     <tr
//                                         onClick={() => {
//                                             router.push(`/clients/viewclient/${client.id}`)
//                                         }}
//                                         key={index} className="hover:bg-gray-50">
//                                         <td className="p-3">{index + 1}</td>
//                                         <td className="p-3">{client.firstName} {client.lastName}</td>
//                                         <td className="p-3">{client.email}</td>
//                                         <td className="p-3">{client.phone}</td>
//                                         <td className="p-3">{client.propertyType}</td>
//                                         <td className="p-3">{client.preferredLocations}</td>
//                                         <td className="p-3">{client.bedrooms}</td>
//                                         <td className="p-3">{client.minBudget} - {client.maxBudget}</td>
//                                         <td className="p-3">{client.source}</td>
//                                         <td className={`p-3 capitalize ${client.status === "active" ? "text-green-500" : client.status === "lost" ? 'text-red-500' : 'text-purple-500'}`}>
//                                             {client.status}
//                                         </td>
//                                         <td className="p-3 flex gap-2">
//                                             <Button
//                                                 onClick={(e: any) => {
//                                                     e.stopPropagation()
//                                                     router.push(`/clients/addclient?clientData=${encodeURIComponent(JSON.stringify(client))}`)
//                                                 }}
//                                                 label='Edit'
//                                                 size="sm"
//                                                 variant="theme2"
//                                             />
//                                             <Button onClick={(e: any) => {
//                                                 e.stopPropagation()
//                                                 deleteClient(index)
//                                             }} label='Delete' size="sm" variant="theme" />
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={12} className="p-8 text-center text-gray-500">
//                                         No clients found. Click "Add Client" to get started.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }



'use client';

import Button from "@/components/Button";
import Header from "@/components/Header";
import { getData, deleleData, auth } from "@/FBConfig/fbFunctions";
import { message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
    Users, Search, Filter, Plus, MoreVertical,
    Mail, Phone, MapPin, Calendar, UserCheck,
    UserX, TrendingUp, Download, Eye, Edit,
    Trash2, ChevronRight, Home, Building,
    DollarSign, Clock
} from "lucide-react";
import React from "react";
import Loader from "@/components/Loader";

export default function ClientsPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/login");
            }
        });
        return () => unsubscribe();
    }, []);

    // Load userInfo from localStorage once
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const parsed: UserInfo = JSON.parse(stored);
                getData(`users/${parsed.uid}`)
                    .then((res: any) => {
                        setUserInfo(res);
                    })
                    .catch((err: any) => {
                        console.error(err.message);
                    });
            } catch (err) {
                console.error("Failed to parse userInfo:", err);
            }
        }
    }, []);

    // Fetch clients once userInfo is available
    useEffect(() => {
        if (userInfo?.uid) {
            getData('clients/')
                .then((res: any) => {
                    if (res) {
                        const clientsArray = Object.entries(res).map(([id, value]: [string, any]) => ({
                            id,
                            ...value
                        }));

                        const ownerClients = clientsArray.filter(
                            (client: any) => client.ownerUid === userInfo?.uid
                        );

                        setClients(ownerClients);
                        setLoading(false);
                    } else {
                        setClients([]);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [userInfo]);

    // Delete client
    const deleteClient = (id: string) => {
        if (confirm("Are you sure you want to delete this client?")) {
            deleleData(`clients/${id}`)
                .then(() => {
                    setClients(clients.filter(client => client.id !== id));
                    message.success("Client deleted successfully");
                })
                .catch(err => {
                    console.log(err);
                    message.error("Failed to delete client");
                });
        }
    };

    // Filter clients based on search input and active filter
    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.firstName?.toLowerCase().includes(searchVal.toLowerCase()) ||
            client.lastName?.toLowerCase().includes(searchVal.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchVal.toLowerCase()) ||
            client.phone?.includes(searchVal);

        const matchesFilter =
            activeFilter === "all" ||
            client.status?.toLowerCase() === activeFilter;

        return matchesSearch && matchesFilter;
    });

    // Stats data
    const clientStats = [
        {
            title: "Total Clients",
            value: clients.length,
            change: "+12%",
            trend: "up",
            icon: <Users className="h-5 w-5 text-blue-600" />,
            color: "from-blue-600 to-blue-500",
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
        },
        {
            title: "Active Clients",
            value: clients.filter(c => c.status === 'active').length,
            change: "+8%",
            trend: "up",
            icon: <UserCheck className="h-5 w-5 text-green-600" />,
            color: "from-green-600 to-emerald-500",
            bgColor: "bg-gradient-to-br from-green-50 to-emerald-100"
        },
        {
            title: "Recent Inquiries",
            value: clients.filter(c => c.status === 'new').length,
            change: "+15%",
            trend: "up",
            icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
            color: "from-purple-600 to-purple-500",
            bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
        },
        {
            title: "Converted",
            value: clients.filter(c => c.status === 'converted').length,
            change: "+5%",
            trend: "up",
            icon: <DollarSign className="h-5 w-5 text-amber-600" />,
            color: "from-amber-600 to-amber-500",
            bgColor: "bg-gradient-to-br from-amber-50 to-amber-100"
        }
    ];

    // Status filters
    const statusFilters = [
        { id: "all", label: "All Clients", count: clients.length },
        { id: "active", label: "Active", count: clients.filter(c => c.status === 'active').length },
        { id: "new", label: "New", count: clients.filter(c => c.status === 'new').length },
        { id: "converted", label: "Converted", count: clients.filter(c => c.status === 'converted').length },
        { id: "lost", label: "Lost", count: clients.filter(c => c.status === 'lost').length }
    ];
    
    const calculateClientsGrowth = useMemo(() => {

    }, [clients])

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'converted': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'lost': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!userInfo) {
        return null;
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
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Clients Management</span>
                                <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Client {''}
                                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Portfolio
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 mt-2 max-w-xl">
                                        Manage your client relationships, track inquiries, and grow your real estate business.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Quick Stats */}
                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100  mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">Client Growth</span>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">+{18}% this month</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{clients.length} Clients</div>
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
                                label="+ Add Client"
                                onClick={() => router.push("/clients/addclient")}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Client"
                                onClick={() => router.push("/clients/addclient")}
                                variant="theme"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                value={searchVal}
                                placeholder="Search clients..."
                                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Table View Toggle (Optional) */}
                <div className="mt-9">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">All Clients</h2>
                        <div className="text-sm text-gray-600">
                            Showing {filteredClients.length} of {clients.length} clients
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-900">Client</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Contact</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Preferences</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Budget</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredClients.slice(0, 5).map((client: any) => (
                                        <tr
                                            key={client.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => router.push(`/clients/viewclient/${client.id}`)}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                        <span className="font-bold text-purple-600">
                                                            {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {client.firstName} {client.lastName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Added: {new Date(client.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <div className="text-sm text-gray-900">{client.email}</div>
                                                    <div className="text-sm text-gray-500">{client.phone}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <div className="text-sm text-gray-900">{client.propertyType}</div>
                                                    <div className="text-sm text-gray-500">{client.bedrooms} Beds • {client.preferredLocations}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ${client.minBudget} - ${client.maxBudget}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(client.status)}`}>
                                                    {client.status || 'New'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push(`/clients/viewclient/${client.id}`);
                                                        }}
                                                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push(`/clients/addclient?clientData=${encodeURIComponent(JSON.stringify(client))}`);
                                                        }}
                                                        className="p-2 hover:bg-purple-50 rounded-lg text-purple-600"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteClient(client.id);
                                                        }}
                                                        className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}