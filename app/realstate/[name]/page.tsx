'use client'
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { Users, Home, Building, CalendarClock } from "lucide-react"
import { checkUserSession, getData } from "@/FBConfig/fbFunctions"
import { MainLayout } from "@/components/Layout"
import { LoadingSpinner, Card, Badge, Button } from "@/components/ui"
import { useApp } from "@/lib/context/AppContext"
import DashboardClients from "@/components/DashboardClients"
import DashboardOwners from "@/components/DashboardOwners"
import DashboardEvents from "@/components/DashboardEvents"
import DashboardProperties from "@/components/DashboardProperties"
import WelcomeSection from "@/components/WelcomeSection"
import QuickActions from "@/components/QuickActions"
import DashboardStats from "@/components/DashboardStats"
import ActivityLog from "@/components/ActivityLog"
import { generateActivityLog } from "@/lib/dashboardUtils"

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [clients, setClients] = useState<any[]>([])
    const [owners, setOwners] = useState<any[]>([])
    const [properties, setProperties] = useState<any[]>([])
    const [events, setEvents] = useState<any[]>([])
    const [greeting, setGreeting] = useState("")
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const router = useRouter()
    const hasFetchedRef = useRef(false)

    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(
            hour < 12 ? "Good Morning" :
                hour < 18 ? "Good Afternoon" :
                    "Good Evening"
        );
    }, []);

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

    const fetchAllData = useCallback(async () => {
        if (!userInfo?.uid) return;

        if (hasFetchedRef.current && !isInitialLoad) return;

        try {
            hasFetchedRef.current = true;
            setIsInitialLoad(false);

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

        } catch (error) {
            message.error("Error Occurred");
        } finally {
            setLoading(false);
        }
    }, [isInitialLoad, userInfo?.uid]);

    useEffect(() => {
        if (userInfo?.uid) {
            fetchAllData();
        }
    }, [userInfo?.uid, fetchAllData]);

    const stats = useMemo(() => {
        return [
            {
                title: "Total Clients",
                value: clients.length,
                icon: <Users className="h-5 w-5 text-blue-600" />,
            },
            {
                title: "Property Owners",
                value: owners.length,
                icon: <Building className="h-5 w-5 text-purple-600" />,
            },
            {
                title: "Listed Properties",
                value: properties.length,
                icon: <Home className="h-5 w-5 text-green-600" />,
            },
            {
                title: "Upcoming Events",
                value: events.length,
                icon: <CalendarClock className="h-5 w-5 text-amber-600" />,
            }
        ];
    }, [clients.length, owners.length, properties.length, events.length]);

    const quickActions = useMemo(() => [
        {
            icon: <Users className="h-6 w-6" />,
            label: "Add Clients",
            description: "Register new clients",
            textColor: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/clients/addclient` : '#',
        },
        {
            icon: <Building className="h-6 w-6" />,
            label: "Add Owners",
            description: "Add property owners",
            textColor: "text-purple-600",
            bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
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
            description: "Add your events",
            textColor: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
            path: userInfo?.uid ? `/realstate/${userInfo.uid}/events/addevent` : '#',
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

    const handleQuickAction = useCallback((path: string, e?: any) => {
        if (e) e.stopPropagation();
        navigateTo(path);
    }, [navigateTo]);

    const handleViewAllEvents = useCallback(() => {
        if (userInfo?.uid) {
            navigateTo(`/realstate/${userInfo.uid}/events`);
        }
    }, [navigateTo, userInfo?.uid]);

    if (loading) {
        return <MainLayout><LoadingSpinner fullScreen text="Loading dashboard..." /></MainLayout>
    }

    const activities = generateActivityLog(properties, clients, owners, events);

    return (
        <MainLayout>
            <div className="space-y-8">
                <WelcomeSection
                    greeting={greeting}
                    userName={userInfo?.name?.split(" ")[0] || "Admin"}
                />

                <DashboardStats stats={stats} />

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
                            onViewAll={handleViewAllEvents}
                        />

                        <ActivityLog
                            activities={activities}
                            maxDisplay={5}
                            onViewAll={() => navigateTo(`/realstate/${userInfo?.uid}/activity`)}
                        />

                        <DashboardClients
                            clients={clients}
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
            </div>
        </MainLayout>
    )
}