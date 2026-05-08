'use client';

import { message, Badge, Tooltip, Modal, Empty } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
    Users, Home, Building, CalendarClock, TrendingUp, DollarSign,
    FileText, Bell, Star, Activity, Clock, CheckCircle,
    Download, RefreshCw, Eye, MessageCircle, Mail,
    Target, Zap, Shield, Award, Globe, Phone,
    Calendar, X, Sparkles, Trophy,
} from "lucide-react";
import { checkUserSession, deleleData, getData, saveData } from "@/FBConfig/fbFunctions";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import DashboardClients from "@/components/DashboardClients";
import DashboardOwners from "@/components/DashboardOwners";
import DashboardEvents from "@/components/DashboardEvents";
import DashboardProperties from "@/components/DashboardProperties";
import WelcomeSection from "@/components/WelcomeSection";
import QuickActions from "@/components/QuickActions";
import { motion, AnimatePresence } from 'framer-motion';
import CommunicationHub from "@/components/CommunicationHub";

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

// Stats Card Component
const StatsCard = ({ stat, onClick, index }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                <div className="absolute -top-3 left-4">
                    <motion.div
                        className="p-2 rounded-lg bg-white border border-slate-200 shadow-md group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                    >
                        {stat.icon}
                    </motion.div>
                </div>
                <div className="mt-2">
                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-slate-800 mb-0.5">{stat.value}</h3>
                        <p className="text-slate-500 text-xs mb-1">{stat.title}</p>
                        {stat.trend && (
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {stat.trendUp ? '↑' : '↓'} {stat.trend}
                                </span>
                                <span className="text-xs text-slate-400">vs last month</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function AdminDashboardPage() {
    // State
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [owners, setOwners] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [greeting, setGreeting] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [documents, setDocuments] = useState<any[]>([]);
    const [templates, setTemplates] = useState<any[]>([]);

    // Metrics State
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
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [selectedStat, setSelectedStat] = useState<any>(null);

    const router = useRouter();
    const hasFetchedRef = useRef(false);

    // Set greeting
    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(
            hour < 12 ? "Good Morning" :
                hour < 18 ? "Good Afternoon" : "Good Evening"
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

    // Calculate metrics
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

        return {
            totalRevenue,
            conversionRate,
            leadsGenerated: totalLeads,
            leadsConverted: convertedLeads,
            satisfactionScore: 92,
            activeListings,
            soldProperties,
            pendingTransactions,
            monthlyGrowth: 12
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

    // Fetch all data
    const fetchAllData = useCallback(async () => {
        if (!userInfo?.uid) return;
        if (hasFetchedRef.current) return;

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
        }
    }, [userInfo?.uid, calculateMetrics, fetchNotifications]);

    useEffect(() => {
        if (userInfo?.uid) {
            fetchAllData();
        }
    }, [userInfo?.uid, fetchAllData]);

    // Handlers
    const handleRefresh = async () => {
        setRefreshing(true);
        hasFetchedRef.current = false;
        await fetchAllData();
        message.success('Dashboard refreshed successfully');
    };

    const handleExportData = () => {
        const exportData = { clients, owners, properties, events, metrics, exportedAt: new Date().toISOString() };
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `zstate_dashboard_${new Date().toISOString().split('T')[0]}.json`);
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
    const enhancedStats = useMemo(() => [
        { title: "Total Clients", value: clients.length, icon: <Users className="h-4 w-4 text-indigo-500" />, trend: "+12%", trendUp: true, description: "Active clients in system", detail: `${metrics.leadsConverted} converted this month` },
        { title: "Property Owners", value: owners.length, icon: <Building className="h-4 w-4 text-purple-500" />, trend: "+5%", trendUp: true, description: "Registered owners", detail: `${owners.filter(o => o.propertiesCount > 0).length} with properties` },
        { title: "Active Listings", value: metrics.activeListings, icon: <Home className="h-4 w-4 text-emerald-500" />, trend: "-2%", trendUp: false, description: "Currently available", detail: `${metrics.soldProperties} sold this quarter` },
        { title: "Conversion Rate", value: `${metrics.conversionRate.toFixed(1)}%`, icon: <Target className="h-4 w-4 text-amber-500" />, trend: "+8%", trendUp: true, description: "Lead to client conversion", detail: `${metrics.leadsConverted}/${metrics.leadsGenerated} leads converted` }
    ], [clients.length, owners.length, metrics]);

    // Quick Actions
    const quickActions = useMemo(() => [
        { icon: <Users className="h-6 w-6" />, label: "Add Clients", description: "Register new clients", textColor: "text-indigo-500", bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100", path: userInfo?.uid ? `/realstate/${userInfo.uid}/clients/addclient` : '#' },
        { icon: <Building className="h-6 w-6" />, label: "Add Owners", description: "Add property owners", textColor: "text-purple-500", bgColor: "bg-gradient-to-br from-purple-50 to-purple-100", path: userInfo?.uid ? `/realstate/${userInfo.uid}/owners/addowner` : '#' },
        { icon: <Home className="h-6 w-6" />, label: "Add Properties", description: "List new properties", textColor: "text-emerald-500", bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100", path: userInfo?.uid ? `/realstate/${userInfo.uid}/properties/addproperty` : '#' },
        { icon: <CalendarClock className="h-6 w-6" />, label: "Create Events", description: "Schedule events", textColor: "text-amber-500", bgColor: "bg-gradient-to-br from-amber-50 to-amber-100", path: userInfo?.uid ? `/realstate/${userInfo.uid}/events/addevent` : '#' },
        { icon: <FileText className="h-6 w-6" />, label: "Generate Report", description: "Export analytics", textColor: "text-pink-500", bgColor: "bg-gradient-to-br from-pink-50 to-pink-100", path: '#', onClick: handleExportData }
    ], [userInfo?.uid]);

    // Navigation functions
    const navigateTo = useCallback((path: string) => { if (path && path !== '#') router.push(path); }, [router]);
    const navigateToClient = useCallback((id: string) => { if (userInfo?.uid) router.push(`/realstate/${userInfo.uid}/clients/viewclient/${id}`); }, [router, userInfo?.uid]);
    const navigateToProperty = useCallback((id: string) => { if (userInfo?.uid) router.push(`/realstate/${userInfo.uid}/properties/viewproperty/${id}`); }, [router, userInfo?.uid]);
    const navigateToOwner = useCallback((id: string) => { if (userInfo?.uid) router.push(`/realstate/${userInfo.uid}/owners/viewowner/${id}`); }, [router, userInfo?.uid]);
    const navigateToEvent = useCallback((id: string) => { if (userInfo?.uid) router.push(`/realstate/${userInfo.uid}/events/${id}`); }, [router, userInfo?.uid]);
    const handleQuickAction = useCallback((path: string, e?: any, customHandler?: () => void) => { if (e) e.stopPropagation(); customHandler ? customHandler() : navigateTo(path); }, [navigateTo]);
    const handleViewAllEvents = useCallback(() => { if (userInfo?.uid) navigateTo(`/realstate/${userInfo.uid}/events`); }, [navigateTo, userInfo?.uid]);

    // Filter clients
    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Communication Handlers
    const handleSendMessage = useCallback(async (clientId: string, messageText: string, channel: 'whatsapp' | 'sms' | 'email') => {
        if (!userInfo?.uid) { message.error('User not authenticated'); return; }
        const client = clients.find(c => c.id === clientId);
        if (!client) { message.error('Client not found'); return; }
        try {
            const messageId = crypto.randomUUID();
            await saveData(`messages/${userInfo.uid}/${messageId}`, {
                id: messageId, clientId, clientName: `${client.firstName} ${client.lastName}`,
                clientEmail: client.email, clientPhone: client.phone, message: messageText,
                channel, status: 'sent', sentBy: userInfo.uid, sentByName: userInfo.name,
                sentAt: new Date().toISOString(), read: false
            });
            message.success(`Message sent via ${channel.toUpperCase()} to ${client.firstName}`);
        } catch (error) { console.error('Error sending message:', error); message.error('Failed to send message'); }
    }, [userInfo?.uid, clients]);

    const handleBulkMessage = useCallback(async (clientIds: string[], messageText: string, channel: 'whatsapp' | 'sms' | 'email') => {
        if (!userInfo?.uid) { message.error('User not authenticated'); return; }
        const selectedClients = clients.filter(c => clientIds.includes(c.id));
        try {
            const bulkId = crypto.randomUUID();
            await saveData(`bulk_messages/${userInfo.uid}/${bulkId}`, {
                id: bulkId, recipientCount: selectedClients.length,
                recipients: selectedClients.map(c => ({ id: c.id, name: `${c.firstName} ${c.lastName}`, email: c.email, phone: c.phone })),
                message: messageText, channel, status: 'processing', sentBy: userInfo.uid, sentAt: new Date().toISOString()
            });
            message.success(`Bulk message queued for ${selectedClients.length} clients`);
        } catch (error) { console.error('Error sending bulk message:', error); message.error('Failed to send bulk messages'); }
    }, [userInfo?.uid, clients]);

    const saveTemplate = useCallback(async (name: string, content: string, type: 'whatsapp' | 'sms' | 'email') => {
        if (!userInfo?.uid) { message.error('User not authenticated'); return; }
        try {
            const templateId = crypto.randomUUID();
            await saveData(`message_templates/${userInfo.uid}/${templateId}`, {
                id: templateId, name, content, type, createdBy: userInfo.uid, createdAt: new Date().toISOString()
            });
            setTemplates(prev => [...prev, { id: templateId, name, content, type }]);
            message.success('Template saved successfully');
        } catch (error) { console.error('Error saving template:', error); message.error('Failed to save template'); }
    }, [userInfo?.uid]);

    // Document Handlers
    const getDocumentType = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return 'contract';
        if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) return 'image';
        if (ext === 'doc' || ext === 'docx') return 'document';
        return 'other';
    };

    const handleUpload = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        if (!userInfo?.uid) { message.error('User not authenticated'); return; }
        try {
            const uploadedDocs: any[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const docId = crypto.randomUUID();
                const docData = { id: docId, name: file.name, type: getDocumentType(file.name), size: file.size, uploadedAt: new Date().toISOString(), uploadedBy: userInfo.uid, url: URL.createObjectURL(file) };
                await saveData(`documents/${userInfo.uid}/${docId}`, docData);
                uploadedDocs.push(docData);
            }
            setDocuments(prev => [...uploadedDocs, ...prev]);
            message.success(`${files.length} document(s) uploaded successfully`);
        } catch (error) { console.error('Error uploading document:', error); message.error('Failed to upload documents'); }
    }, [userInfo?.uid]);

    const handleDeleteDocument = useCallback(async (docId: string) => {
        if (!userInfo?.uid) { message.error('User not authenticated'); return; }
        try {
            await deleleData(`documents/${userInfo.uid}/${docId}`);
            setDocuments(prev => prev.filter(doc => doc.id !== docId));
            message.success('Document deleted successfully');
        } catch (error) { console.error('Error deleting document:', error); message.error('Failed to delete document'); }
    }, [userInfo?.uid]);

    const handleViewDocument = useCallback((docId: string) => {
        const doc = documents.find(d => d.id === docId);
        if (doc?.url) window.open(doc.url, '_blank');
        else message.info('Preview coming soon');
    }, [documents]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <WelcomeSection greeting={greeting} userName={userInfo?.name?.split(" ")[0] || "Admin"} />
                    <div className="flex gap-2">
                        <Tooltip title="Refresh Dashboard">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRefresh} className="p-2 bg-white rounded-lg shadow-md shadow-slate-200/50 hover:shadow-lg transition-all" disabled={refreshing}>
                                <RefreshCw className={`h-5 w-5 text-indigo-500 ${refreshing ? 'animate-spin' : ''}`} />
                            </motion.button>
                        </Tooltip>
                        <Tooltip title="Export Data">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExportData} className="p-2 bg-white rounded-lg shadow-md shadow-slate-200/50 hover:shadow-lg transition-all">
                                <Download className="h-5 w-5 text-purple-500" />
                            </motion.button>
                        </Tooltip>

                        {/* Notifications */}
                        <div className="relative">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowNotifications(!showNotifications)} className="p-2 bg-white rounded-lg shadow-md shadow-slate-200/50 hover:shadow-lg transition-all relative">
                                <Bell className="h-5 w-5 text-slate-500" />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-[10px] flex items-center justify-center">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </motion.button>
                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                                        <div className="p-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                            <h4 className="font-semibold text-slate-800">Notifications</h4>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length === 0 ? <Empty description="No notifications" className="py-8" /> : notifications.map(notification => (
                                                <motion.div key={notification.id} whileHover={{ x: 4 }} className={`p-3 hover:bg-slate-50 cursor-pointer transition-all border-b border-slate-50 ${!notification.read ? 'bg-indigo-50/30' : ''}`} onClick={() => markNotificationRead(notification.id)}>
                                                    <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                                                    <p className="text-xs text-slate-400 mt-1">{notification.timestamp.toLocaleTimeString()}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {enhancedStats.map((stat, idx) => (<StatsCard key={idx} index={idx} stat={stat} onClick={() => handleStatClick(stat)} />))}
                </div>

                {/* Communication & Documents Section
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <CommunicationHub clients={filteredClients} onSendMessage={handleSendMessage} onBulkMessage={handleBulkMessage} templates={templates} onSaveTemplate={saveTemplate} />
                    <DocumentManager documents={documents} onUpload={handleUpload} onDelete={handleDeleteDocument} onView={handleViewDocument} />
                </div> */}

                {/* Main 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <QuickActions quickActions={quickActions} clients={clients.length} owners={owners.length} properties={properties.length} onQuickAction={handleQuickAction} />
                        <DashboardProperties properties={properties} userUid={userInfo?.uid} onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/properties`)} onNavigate={navigateToProperty} />
                    </div>
                    <div className="space-y-8">
                        <DashboardEvents events={events} userUid={userInfo?.uid} onNavigate={navigateToEvent} onViewAll={handleViewAllEvents} />
                        <DashboardClients clients={filteredClients} userUid={userInfo?.uid} onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/clients`)} onNavigate={navigateToClient} />
                        <DashboardOwners owners={owners} userUid={userInfo?.uid} onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/owners`)} onNavigate={navigateToOwner} />
                    </div>
                </div>
            </main>

            {/* Stats Modal */}
            <Modal title={selectedStat?.title} open={showStatsModal} onCancel={() => setShowStatsModal(false)} footer={null} width={600} className="rounded-2xl">
                {selectedStat && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                            <div className="text-5xl font-bold text-slate-800">{selectedStat.value}</div>
                            <p className="text-slate-500 mt-2">{selectedStat.description}</p>
                            <div className="mt-4">
                                <Badge count={selectedStat.trend} className={selectedStat.trendUp ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-4">
                            <p className="text-sm text-slate-600">{selectedStat.detail}</p>
                        </div>
                    </motion.div>
                )}
            </Modal>
        </div>
    );
}