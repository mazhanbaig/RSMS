'use client';

import { message, Badge, Tooltip, Modal, Empty, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
    Users, Home, Building, CalendarClock, TrendingUp, DollarSign,
    FileText, Bell, Star, Activity, Clock, CheckCircle,
    Download, RefreshCw, Eye, MessageCircle, Mail,
    ArrowUpRight, ArrowDownRight, MoreVertical, Filter,
    Search, Calendar, X, Sparkles, Trophy, Target,
    Zap, Shield, Award, Globe, Phone, Mail as MailIcon,
    Facebook, Twitter, Linkedin, Instagram
} from "lucide-react";
import { checkUserSession, getData, saveData } from "@/FBConfig/fbFunctions";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import DashboardClients from "@/components/DashboardClients";
import DashboardOwners from "@/components/DashboardOwners";
import DashboardEvents from "@/components/DashboardEvents";
import DashboardProperties from "@/components/DashboardProperties";
import WelcomeSection from "@/components/WelcomeSection";
import QuickActions from "@/components/QuickActions";
import {
    PieChart, Pie, Cell,
    ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface MetricData {
    totalRevenue: number;
    conversionRate: number;
    leadsGenerated: number;
    leadsConverted: number;
    satisfactionScore: number;
    activeListings: number;
    soldProperties: number;
    pendingTransactions: number;
    monthlyGrowth: number;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: Date;
}

interface LeadSource {
    name: string;
    value: number;
    color: string;
    growth: string;
    icon: React.ReactNode;
}

// Enhanced Stats Card Component
const StatsCard = ({ stat, onClick, index }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                <div className="absolute -top-3 left-4">
                    <motion.div
                        className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                    >
                        {stat.icon}
                    </motion.div>
                </div>
                <div className="mt-2">
                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
                        <p className="text-gray-600 text-xs mb-1">{stat.title}</p>
                        {stat.trend && (
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trendUp ? '↑' : '↓'} {stat.trend}
                                </span>
                                <span className="text-xs text-gray-400">vs last month</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [owners, setOwners] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [greeting, setGreeting] = useState("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // State for enhanced features
    const [metrics, setMetrics] = useState<MetricData>({
        totalRevenue: 0,
        conversionRate: 0,
        leadsGenerated: 0,
        leadsConverted: 0,
        satisfactionScore: 85,
        activeListings: 0,
        soldProperties: 0,
        pendingTransactions: 0,
        monthlyGrowth: 0
    });
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [selectedStat, setSelectedStat] = useState<any>(null);
    const [weeklyData, setWeeklyData] = useState<any[]>([]);

    const router = useRouter();
    const hasFetchedRef = useRef(false);

    const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    // Set greeting based on hour
    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(
            hour < 12 ? "Good Morning" :
                hour < 18 ? "Good Afternoon" :
                    "Good Evening"
        );
    }, []);

    // Auth check
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
                if (!storedUser) {
                    message.error('User info not found');
                    router.replace('/login');
                    return;
                }

                const userData = JSON.parse(storedUser);
                setUserInfo(userData);
            } catch (err) {
                console.error('Authentication error:', err);
                message.error('Error occurred during authentication');
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    // Calculate metrics from data
    const calculateMetrics = useCallback((clientsData: any[], propertiesData: any[]) => {
        const totalLeads = clientsData.length;
        const convertedLeads = clientsData.filter(c => c.status === 'converted' || c.isActive).length;
        const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

        const activeListings = propertiesData.filter(p => p.status === 'active' || p.status === 'available').length;
        const soldProperties = propertiesData.filter(p => p.status === 'sold' || p.status === 'rented').length;
        const pendingTransactions = propertiesData.filter(p => p.status === 'pending' || p.status === 'under_contract').length;

        const totalRevenue = propertiesData.reduce((sum, p) => {
            if (p.status === 'sold' && p.price) return sum + (p.price * 0.03);
            return sum;
        }, 0);

        const monthlyGrowth = conversionRate > 0 ? 12 : 0;

        return {
            totalRevenue,
            conversionRate,
            leadsGenerated: totalLeads,
            leadsConverted: convertedLeads,
            satisfactionScore: 92,
            activeListings,
            soldProperties,
            pendingTransactions,
            monthlyGrowth
        };
    }, []);


    // Fetch notifications
    const fetchNotifications = useCallback(async (uid: string) => {
        try {
            const notificationsData = await getData(`notifications/${uid}`);
            if (notificationsData) {
                const processed = Object.entries(notificationsData)
                    .map(([id, value]: any) => ({
                        id,
                        ...value,
                        timestamp: value.timestamp ? new Date(value.timestamp) : new Date()
                    }))
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .slice(0, 8);
                setNotifications(processed);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, []);

    const fetchAllData = useCallback(async () => {
        if (!userInfo?.uid) return;
        if (hasFetchedRef.current && !isInitialLoad && !refreshing) return;

        try {
            hasFetchedRef.current = true;

            const [clientsData, ownersData, propertiesData, eventsData]: any = await Promise.all([
                getData(`clients/${userInfo?.uid}`),
                getData(`owners/${userInfo?.uid}`),
                getData(`properties/${userInfo?.uid}`),
                getData(`events/${userInfo?.uid}`)
            ]);

            const processedClients = clientsData ? Object.entries(clientsData).map(([id, value]: any) => ({ id, ...value })) : [];
            const processedOwners = ownersData ? Object.entries(ownersData).map(([id, value]: any) => ({ id, ...value })) : [];
            const processedProperties = propertiesData ? Object.entries(propertiesData).map(([id, value]: any) => ({ id, ...value })) : [];

            let processedEvents: any[] = [];
            if (eventsData) {
                processedEvents = Object.entries(eventsData)
                    .map(([id, value]: any) => ({ id, ...value }))
                    .filter((event: any) => event.agentUid === userInfo?.uid);
            }

            setClients(processedClients);
            setOwners(processedOwners);
            setProperties(processedProperties);
            setEvents(processedEvents);

            const newMetrics = calculateMetrics(processedClients, processedProperties);
            setMetrics(newMetrics);

            await fetchNotifications(userInfo.uid);

        } catch (error) {
            message.error("Error Occurred while loading data");
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setIsInitialLoad(false);
        }
    }, [isInitialLoad, refreshing, userInfo?.uid, calculateMetrics, fetchNotifications]);

    useEffect(() => {
        if (userInfo?.uid) {
            fetchAllData();
        }
    }, [userInfo?.uid, fetchAllData]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAllData();
        message.success('Dashboard refreshed successfully');
    };

    const handleExportData = () => {
        const exportData = {
            clients,
            owners,
            properties,
            events,
            metrics,
            leadSources,
            weeklyData,
            exportedAt: new Date().toISOString()
        };
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `dashboard_data_${new Date().toISOString()}.json`);
        linkElement.click();
        message.success('Data exported successfully');
    };

    const handleStatClick = (stat: any) => {
        setSelectedStat(stat);
        setShowStatsModal(true);

        if (stat.title === "Total Clients" && userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients`);
        } else if (stat.title === "Property Owners" && userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners`);
        } else if (stat.title === "Active Listings" && userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/properties`);
        }
    };

    const markNotificationRead = async (notificationId: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ));
    };

    // Enhanced stats
    const enhancedStats = useMemo(() => {
        return [
            {
                title: "Total Clients",
                value: clients.length,
                icon: <Users className="h-4 w-4 text-purple-600" />,
                trend: "+12%",
                trendUp: true,
                description: "Active clients in system",
                detail: `${metrics.leadsConverted} converted this month`
            },
            {
                title: "Property Owners",
                value: owners.length,
                icon: <Building className="h-4 w-4 text-blue-600" />,
                trend: "+5%",
                trendUp: true,
                description: "Registered owners",
                detail: `${owners.filter(o => o.propertiesCount > 0).length} with properties`
            },
            {
                title: "Active Listings",
                value: metrics.activeListings,
                icon: <Home className="h-4 w-4 text-green-600" />,
                trend: "-2%",
                trendUp: false,
                description: "Currently available",
                detail: `${metrics.soldProperties} sold this quarter`
            },
            {
                title: "Conversion Rate",
                value: `${metrics.conversionRate.toFixed(1)}%`,
                icon: <Target className="h-4 w-4 text-amber-600" />,
                trend: "+8%",
                trendUp: true,
                description: "Lead to client conversion",
                detail: `${metrics.leadsConverted}/${metrics.leadsGenerated} leads converted`
            }
        ];
    }, [clients.length, owners.length, metrics]);

    const quickActions = useMemo(() => [
        {
            icon: <Users className="h-6 w-6" />,
            label: "Add Clients",
            description: "Register new clients",
            textColor: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/clients/addclient` : '#',
        },
        {
            icon: <Building className="h-6 w-6" />,
            label: "Add Owners",
            description: "Add property owners",
            textColor: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/owners/addowner` : '#',
        },
        {
            icon: <Home className="h-6 w-6" />,
            label: "Add Properties",
            description: "List new properties",
            textColor: "text-green-600",
            bgColor: "bg-gradient-to-br from-green-100 to-green-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/properties/addproperty` : '#',
        },
        {
            icon: <CalendarClock className="h-6 w-6" />,
            label: "Create Events",
            description: "Schedule events",
            textColor: "text-amber-600",
            bgColor: "bg-gradient-to-br from-amber-100 to-amber-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/events/addevent` : '#',
        },
        {
            icon: <FileText className="h-6 w-6" />,
            label: "Generate Report",
            description: "Export analytics",
            textColor: "text-indigo-600",
            bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-50",
            path: '#',
            onClick: handleExportData
        }
    ], [userInfo?.uid]);

    const navigateTo = useCallback((path: string) => {
        if (path && path !== '#') {
            router.push(path);
        }
    }, [router]);

    const navigateToClient = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/clients/viewclient/${id}`);
        }
    }, [router, userInfo?.uid]);

    const navigateToProperty = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/properties/viewproperty/${id}`);
        }
    }, [router, userInfo?.uid]);

    const navigateToOwner = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/owners/viewowner/${id}`);
        }
    }, [router, userInfo?.uid]);

    const navigateToEvent = useCallback((id: string) => {
        if (userInfo?.uid) {
            router.push(`/realstate/${userInfo.uid}/events/${id}`);
        }
    }, [router, userInfo?.uid]);

    const handleQuickAction = useCallback((path: string, e?: any, customHandler?: () => void) => {
        if (e) e.stopPropagation();
        if (customHandler) {
            customHandler();
        } else {
            navigateTo(path);
        }
    }, [navigateTo]);

    const handleViewAllEvents = useCallback(() => {
        if (userInfo?.uid) {
            navigateTo(`/realstate/${userInfo.uid}/events`);
        }
    }, [navigateTo, userInfo?.uid]);

    // Filter clients based on search
    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
                {/* Header with actions */}
                <div className="flex-col justify-between items-center mb-6">
                    <WelcomeSection
                        greeting={greeting}
                        userName={userInfo?.name?.split(" ")[0] || "Admin"}
                    />
                    <div className="flex gap-2">
                        <Tooltip title="Refresh Dashboard">
                            <button
                                onClick={handleRefresh}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                                disabled={refreshing}
                            >
                                <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </Tooltip>

                        <Tooltip title="Export Data">
                            <button
                                onClick={handleExportData}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                            >
                                <Download className="h-5 w-5 text-gray-600" />
                            </button>
                        </Tooltip>

                        {/* Notifications Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all relative"
                            >
                                <Bell className="h-5 w-5 text-gray-600" />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <div
                                        className="absolute left-10 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
                                    >
                                        <div className="p-3 border-b border-gray-100">
                                            <h4 className="font-semibold text-gray-900">Notifications</h4>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <Empty description="No notifications" className="py-8" />
                                            ) : (
                                                notifications.map(notification => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-3 hover:bg-gray-50 cursor-pointer transition-all ${!notification.read ? 'bg-purple-50' : ''}`}
                                                        onClick={() => markNotificationRead(notification.id)}
                                                    >
                                                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {notification.timestamp.toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {enhancedStats.map((stat, idx) => (
                        <StatsCard key={idx} index={idx} stat={stat} onClick={() => handleStatClick(stat)} />
                    ))}
                </div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <QuickActions
                            quickActions={quickActions}
                            clients={clients.length}
                            owners={owners.length}
                            properties={properties.length}
                            onQuickAction={handleQuickAction}
                        />

                        <DashboardProperties
                            properties={properties}
                            userUid={userInfo?.uid}
                             onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/properties`)}
                        />
                    </div>

                    <div className="space-y-8">
                        <DashboardEvents
                            events={events}
                            userUid={userInfo?.uid}
 onNavigate={(eventId:any) => {
                            navigateToEvent(eventId)                      
                            }}                            onNavigate={navigateToEvent}
                        />

                        <DashboardClients
                            clients={filteredClients}
                            userUid={userInfo?.uid}
                            onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/clients`)}
                            onNavigate={navigateToClient}
                        />

                        <DashboardOwners
                            owners={owners}
                            userUid={userInfo?.uid}
                            onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/owners`)}
                            onNavigate={navigateToOwner}
                        />
                    </div>
                </div>
            </main>

            {/* Stats Detail Modal */}
            <Modal
                title={selectedStat?.title}
                open={showStatsModal}
                onCancel={() => setShowStatsModal(false)}
                footer={null}
                width={600}
            >
                {selectedStat && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                            <div className="text-5xl font-bold text-gray-900">{selectedStat.value}</div>
                            <p className="text-gray-600 mt-2">{selectedStat.description}</p>
                            <div className="mt-4">
                                <Badge count={selectedStat.trend} className={selectedStat.trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} />
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-600">{selectedStat.detail}</p>
                        </div>
                    </motion.div>
                )}
            </Modal>
        </div>
    );
}