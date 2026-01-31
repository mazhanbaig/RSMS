'use client'
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import {
    Users, Home, DollarSign, Building, PhoneCall,
    MessageSquare, Mail, ChevronRight, Bed, Bath, Crown
} from "lucide-react"
import { auth, checkUserSession, getData } from "@/FBConfig/fbFunctions"
import { onAuthStateChanged } from "firebase/auth"
import Loader from "@/components/Loader"
import Header from "@/components/Header"
import Button from "@/components/Button"
import React from "react"

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [clients, setClients] = useState<any[]>([])
    const [owners, setOwners] = useState<any[]>([])
    const [properties, setProperties] = useState<any[]>([])
    const [greeting, setGreeting] = useState("")
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const router = useRouter()
    const hasFetchedRef = useRef(false)

    // Memoized greeting calculation
    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(
            hour < 12 ? "Good Morning" :
                hour < 18 ? "Good Afternoon" :
                    "Good Evening"
        );
    }, []);

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
    // Optimized data fetching with single call
    const fetchAllData = useCallback(async () => {
        // Prevent multiple fetches
        if (hasFetchedRef.current && !isInitialLoad) return;

        try {
            hasFetchedRef.current = true;
            setIsInitialLoad(false);

            // Fetch all data in parallel
            const [clientsData, ownersData, propertiesData] = await Promise.all([
                getData('/clients/'),
                getData('/owners/'),
                getData('/properties/')
            ]);

            // Process data in parallel
            const processedClients = clientsData ? Object.entries(clientsData).map(([id, value]: any) => ({ id, ...value })) : [];
            const processedOwners = ownersData ? Object.entries(ownersData).map(([id, value]: any) => ({ id, ...value })) : [];
            const processedProperties = propertiesData ? Object.entries(propertiesData).map(([id, value]: any) => ({ id, ...value })) : [];

            // Batch state updates
            setClients(processedClients);
            setOwners(processedOwners);
            setProperties(processedProperties);

        } catch (error) {
            message.error("Error Occurred");
        } finally {
            setLoading(false);
        }
    }, [isInitialLoad]);

    // Fetch data once when component mounts
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Memoized stats to prevent recalculation on every render
    const stats = useMemo(() => {
        const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);

        return [
            {
                title: "Total Clients",
                value: clients.length,
                icon: <Users className="h-5 w-5 text-blue-600" />,
                change: "+12% this month",
            },
            {
                title: "Property Owners",
                value: owners.length,
                icon: <Building className="h-5 w-5 text-purple-600" />,
                change: "+5 new owners",
            },
            {
                title: "Listed Properties",
                value: properties.length,
                icon: <Home className="h-5 w-5 text-green-600" />,
                change: "+8 properties",
            },
            {
                title: "Total Value",
                value: `$${totalValue.toLocaleString()}`,
                icon: <DollarSign className="h-5 w-5 text-amber-600" />,
                change: "+15% growth",
            }
        ];
    }, [clients.length, owners.length, properties.length, properties]);

    // Memoized quick actions with useCallback for handlers
    const quickActions = useMemo(() => [
        {
            icon: <Users className="h-6 w-6" />,
            label: "Add Clients",
            description: "Register new clients",
            textColor: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
            path: `/realstate/${userInfo?.uid}/clients/addclient`,
        },
        {
            icon: <Building className="h-6 w-6" />,
            label: "Add Owners",
            description: "Add property owners",
            textColor: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
            path: `/realstate/${userInfo?.uid}/owners/addowner`,
        },
        {
            icon: <Home className="h-6 w-6" />,
            label: "Add Properties",
            description: "List new properties",
            textColor: "text-green-600",
            bgColor: "bg-gradient-to-br from-green-100 to-green-50",
            path: `/realstate/${userInfo?.uid}/properties/addproperty`,
        },
        {
            icon: <DollarSign className="h-6 w-6" />,
            label: "Analytics",
            description: "View performance insights",
            textColor: "text-amber-600",
            bgColor: "bg-gradient-to-br from-amber-100 to-amber-50",
            path: '',
        },
    ], []);

    // Memoized recent items with limit
    const recentClients = useMemo(() => clients.slice(0, 2), [clients]);
    const recentProperties = useMemo(() => properties.slice(0, 2), [properties]);
    const recentOwners = useMemo(() => owners.slice(0, 2), [owners]);

    // Pre-defined upcoming events (no need for state)
    const upcomingEvents = useMemo(() => [
        {
            id: 1,
            title: "Property Viewing - Modern Villa",
            date: "28 FEB",
            time: "9:00 AM",
            attendees: "2 clients",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            title: "Client Meeting - John Smith",
            date: "15 MAR",
            time: "2:00 PM",
            attendees: "Contract discussion",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Property Launch Event",
            date: "22 MAR",
            time: "6:00 PM",
            attendees: "All agents",
            color: "from-green-500 to-emerald-500"
        }
    ], []);

    // Memoized status color function
    const getStatusColor = useCallback((status: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'sold': return 'bg-blue-100 text-blue-800';
            case 'rented': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }, []);

    // Optimized navigation handlers
    const navigateTo = useCallback((path: string) => {
        router.push(path);
    }, [router]);

    const navigateToClient = useCallback((id: string) => {
        router.push(`/realstate/${userInfo?.uid}/clients/viewclient/${id}`);
    }, [router]);

    const navigateToProperty = useCallback((id: string) => {
        router.push(`/realstate/${userInfo?.uid}/properties/viewproperty/${id}`);
    }, [router]);

    const navigateToOwner = useCallback((id: string) => {
        router.push(`/realstate/${userInfo?.uid}/owners/viewowner/${id}`);
    }, [router]);

    // Quick action handler
    const handleQuickAction = useCallback((path: string, e?: any) => {
        if (e) e.stopPropagation();
        navigateTo(path);
    }, [navigateTo]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Welcome Section - Optimized */}
                <div className="mb-10 ml-2 sm:ml-0">
                    <div className="relative">
                        <div className="relative">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                        <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Dashboard</span>
                                        <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="hidden sm:block p-2 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-400/10">
                                                <Crown className="h-6 w-6 text-amber-500" />
                                            </div>
                                            <div>
                                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                                    {greeting},{" "}
                                                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                        {userInfo?.name?.split(" ")[0] || "Admin"}
                                                    </span>
                                                </h1>
                                                <p className="text-gray-600 mt-2 max-w-xl">
                                                    Your real estate management hub. Track properties, connect with clients, and grow your business.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Optimized rendering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                <div className="absolute -top-3 left-4">
                                    <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
                                        {stat.icon}
                                    </div>
                                </div>

                                <div className="-mt-1">
                                    <div className="text-right">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
                                        <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions - Optimized */}
                        <div className="bg-white rounded-xl border border-gray-100 px-6 pt-3 pb-4 shadow-lg shadow-black/5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                                        Quick Actions
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">Essential management tools</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {quickActions.map((action, index) => (
                                    <div
                                        key={index}
                                        onClick={(e) => handleQuickAction(action.path, e)}
                                        className="px-3 py-2 rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${action.bgColor}`}>
                                                <div className={action.textColor}>
                                                    {action.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 truncate">{action.label}</h4>
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{action.description}</span>
                                                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Properties - Optimized */}
                        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-lg shadow-black/5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Recent Properties
                                </h2>
                                <Button
                                    label="View All"
                                    variant="theme2"
                                    size="sm"
                                    onClick={() => navigateTo(`/realstate/${userInfo?.uid}/properties`)}
                                />
                            </div>

                            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2">
                                {recentProperties.length > 0 ? (
                                    recentProperties.map((property) => (
                                        <div
                                            key={property.id}
                                            onClick={() => navigateToProperty(property.id)}
                                            className="group flex items-center justify-between px-3 py-2
      rounded-xl border border-gray-200 bg-white
      hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                                                    <Home className="h-4 w-4" />
                                                </div>

                                                <div className="truncate">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {property.title || property.address}
                                                    </p>

                                                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Bed className="h-3 w-3" />
                                                            {property.bedrooms || '—'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Bath className="h-3 w-3" />
                                                            {property.bathrooms || '—'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ${property.price?.toLocaleString() || '0'}
                                                </span>

                                                <span
                                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium
          ${getStatusColor(property.status)}`}
                                                >
                                                    {property.status || 'active'}
                                                </span>

                                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6">
                                        <Home className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        <Button
                                            label="Add Property"
                                            size="sm"
                                            variant="theme"
                                            onClick={() => navigateTo('/properties/addproperty')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Recent Clients - Optimized */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Recent Clients
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">Latest client inquiries</p>
                                </div>
                                <Button
                                    label="View All"
                                    variant="theme2"
                                    size="sm"
                                    onClick={() => navigateTo(`/realstate/${userInfo?.uid}/clients`)}
                                />
                            </div>

                            <div className="space-y-3">
                                {recentClients.length > 0 ? (
                                    recentClients.map((client) => (
                                        <div
                                            key={client.id}
                                            className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                            onClick={() => navigateToClient(client.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 text-lg sm:text-xl rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 text-black flex items-center justify-center font-semibold shadow-md">
                                                    {client.firstName?.charAt(0) || 'C'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        {client.firstName} {client.lastName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                                        {client.email}
                                                    </span>
                                                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                                        <span>{client.phone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">No clients yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Owners - Optimized */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Recent Owners
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">Latest owners inquiries</p>
                                </div>
                                <Button
                                    label="View All"
                                    variant="theme2"
                                    size="sm"
                                    onClick={() => navigateTo(`/realstate/${userInfo?.uid}/owners`)}
                                />
                            </div>

                            <div className="space-y-3">
                                {recentOwners.length > 0 ? (
                                    recentOwners.map((owner) => (
                                        <div
                                            key={owner.id}
                                            className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                            onClick={() => navigateToOwner(owner.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 text-lg sm:text-xl rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 text-black flex items-center justify-center font-semibold shadow-md">
                                                    {owner.firstName?.charAt(0) || 'O'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        {owner.firstName} {owner.lastName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                                        {owner.email}
                                                    </span>
                                                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                                        <span>{owner.phone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">No owners yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events - Static data */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Upcoming Events
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">Property viewings & meetings</p>
                                </div>
                                <Button
                                    label="View All"
                                    variant="theme2"
                                    size="sm"
                                    onClick={() => navigateTo('/calendar')}
                                />
                            </div>

                            <div className="space-y-3">
                                {upcomingEvents.map((event, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 text-lg sm:text-xl bg-black rounded-lg flex items-center justify-center font-semibold shadow-md text-white`}>
                                                {event.date.split(' ')[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900 text-sm">{event.title}</span>
                                                <span className="text-xs text-gray-500">
                                                    {event.date} • {event.time}
                                                </span>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {event.attendees}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                            <p className="text-purple-100 mb-6">Our support team is available 24/7</p>
                            <div className="space-y-3">
                                <button className="flex items-center w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                    <PhoneCall className="w-5 h-5 mr-3" />
                                    <span>Call Support</span>
                                </button>
                                <button className="flex items-center w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                    <MessageSquare className="w-5 h-5 mr-3" />
                                    <span>Live Chat</span>
                                </button>
                                <button className="flex items-center w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                    <Mail className="w-5 h-5 mr-3" />
                                    <span>Email Support</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}