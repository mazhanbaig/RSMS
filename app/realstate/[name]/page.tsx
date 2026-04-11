// 'use client'
// import { message } from "antd"
// import { useRouter } from "next/navigation"
// import { useEffect, useState, useMemo, useCallback, useRef } from "react"
// import {
//     Users, Home, DollarSign, Building,
//     ChevronRight, Bed, Bath, Crown,
//     CalendarClock,
//     Clock,
//     MapPin,
//     HomeIcon,
//     CalendarPlus,
//     UserPlus,
//     Sparkles
// } from "lucide-react"
// import { checkUserSession, getData } from "@/FBConfig/fbFunctions"
// import Loader from "@/components/Loader"
// import Header from "@/components/Header"
// import Button from "@/components/Button"
// import PropertyCard from "@/components/PropertyCard"

// export default function AdminDashboardPage() {
//     const [loading, setLoading] = useState(true)
//     const [userInfo, setUserInfo] = useState<any>(null)
//     const [clients, setClients] = useState<any[]>([])
//     const [owners, setOwners] = useState<any[]>([])
//     const [properties, setProperties] = useState<any[]>([])
//     const [events, setEvents] = useState<any[]>([])
//     const [greeting, setGreeting] = useState("")
//     const [isInitialLoad, setIsInitialLoad] = useState(true)

//     const router = useRouter()
//     const hasFetchedRef = useRef(false)

//     // Memoized greeting calculation
//     useEffect(() => {
//         const hour = new Date().getHours();
//         setGreeting(
//             hour < 12 ? "Good Morning" :
//                 hour < 18 ? "Good Afternoon" :
//                     "Good Evening"
//         );
//     }, []);

//     // Check authentication and load data
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const user: any = await checkUserSession();
//                 if (!user) {
//                     message.error('Please Login First');
//                     router.replace('/login');
//                     return;
//                 }

//                 const storedUser: any = localStorage.getItem('userInfo')
//                 if (!storedUser) {
//                     message.error('User info not found');
//                     router.replace('/login');
//                     return;
//                 }

//                 const userData = JSON.parse(storedUser);
//                 setUserInfo(userData);
//             } catch (err) {
//                 console.error('Authentication error:', err);
//                 message.error('Error occurred during authentication');
//                 router.replace('/login');
//             }
//         };

//         checkAuth();
//     }, [router]);

//     // Optimized data fetching with single call
//     const fetchAllData = useCallback(async () => {
//         if (!userInfo?.uid) return;

//         // Prevent multiple fetches
//         if (hasFetchedRef.current && !isInitialLoad) return;

//         try {
//             hasFetchedRef.current = true;
//             setIsInitialLoad(false);

//             // Fetch all data in parallel
//             const [clientsData, ownersData, propertiesData, eventsData]: any = await Promise.all([
//                 getData(`clients/${userInfo?.uid}`),
//                 getData(`owners/${userInfo?.uid}`),
//                 getData(`properties/${userInfo?.uid}`),
//                 getData(`events/${userInfo?.uid}`)
//             ]);

//             // Process data in parallel
//             const processedClients = clientsData ? Object.entries(clientsData).map(([id, value]: any) => ({ id, ...value })) : [];
//             const processedOwners = ownersData ? Object.entries(ownersData).map(([id, value]: any) => ({ id, ...value })) : [];
//             const processedProperties = propertiesData ? Object.entries(propertiesData).map(([id, value]: any) => ({ id, ...value })) : [];

//             // ✅ FIXED: Process events - flat structure filtered by agentUid
//             let processedEvents: any[] = [];
//             if (eventsData) {
//                 processedEvents = Object.entries(eventsData)
//                     .map(([id, value]: any) => ({ id, ...value }))
//                     .filter((event: any) => event.agentUid === userInfo?.uid);
//             }

//             // Batch state updates
//             setClients(processedClients);
//             setOwners(processedOwners);
//             setProperties(processedProperties);
//             setEvents(processedEvents);

//         } catch (error) {
//             message.error("Error Occurred");
//         } finally {
//             setLoading(false);
//         }
//     }, [isInitialLoad, userInfo?.uid]);

//     // Fetch data once when component mounts and when userInfo changes
//     useEffect(() => {
//         if (userInfo?.uid) {
//             fetchAllData();
//         }
//     }, [userInfo?.uid, fetchAllData]);

//     // Memoized stats to prevent recalculation on every render
//     const stats = useMemo(() => {
//         const totalValue = properties.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

//         return [
//             {
//                 title: "Total Clients",
//                 value: clients.length,
//                 icon: <Users className="h-5 w-5 text-blue-600" />,
//             },
//             {
//                 title: "Property Owners",
//                 value: owners.length,
//                 icon: <Building className="h-5 w-5 text-purple-600" />,
//             },
//             {
//                 title: "Listed Properties",
//                 value: properties.length,
//                 icon: <Home className="h-5 w-5 text-green-600" />,
//             },
//             {
//                 title: "Upcoming Events",
//                 value: events.length,
//                 icon: <CalendarClock className="h-5 w-5 text-amber-600" />,
//             }
//         ];
//     }, [clients.length, owners.length, properties.length, events.length]);

//     // ✅ FIXED: Memoized quick actions with safe paths
//     const quickActions = useMemo(() => [
//         {
//             icon: <Users className="h-6 w-6" />,
//             label: "Add Clients",
//             description: "Register new clients",
//             textColor: "text-blue-600",
//             bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
//             path: userInfo?.uid ? `/realstate/${userInfo.uid}/clients/addclient` : '#',
//         },
//         {
//             icon: <Building className="h-6 w-6" />,
//             label: "Add Owners",
//             description: "Add property owners",
//             textColor: "text-purple-600",
//             bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
//             path: userInfo?.uid ? `/realstate/${userInfo.uid}/owners/addowner` : '#',
//         },
//         {
//             icon: <Home className="h-6 w-6" />,
//             label: "Add Properties",
//             description: "List new properties",
//             textColor: "text-green-600",
//             bgColor: "bg-gradient-to-br from-green-100 to-green-50",
//             path: userInfo?.uid ? `/realstate/${userInfo.uid}/properties/addproperty` : '#',
//         },
//         {
//             icon: <CalendarClock className="h-6 w-6" />,
//             label: "Create Events",
//             description: "Add your events",
//             textColor: "text-blue-600",
//             bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
//             path: userInfo?.uid ? `/realstate/${userInfo.uid}/events/addevent` : '#',
//         }
//     ], [userInfo?.uid]);

//     // Memoized recent items with limit
//     const recentClients = useMemo(() => clients.slice(-2).reverse(), [clients]);
//     const recentProperties = useMemo(() => properties.slice(-2).reverse(), [properties]);
//     const recentOwners = useMemo(() => owners.slice(-2).reverse(), [owners]);

//     // Format events for display
//     const upcomingEvents = useMemo(() => {
//         return events
//             .filter(event => {
//                 if (!event.date) return false;
//                 const eventDate = new Date(event.date);
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);
//                 return eventDate >= today;
//             })
//             .sort((a, b) => {
//                 const dateA = new Date(a.date).getTime();
//                 const dateB = new Date(b.date).getTime();
//                 return dateA - dateB;
//             })
//             .slice(0, 2);
//     }, [events]);

//     // Memoized status color function
//     const getStatusColor = useCallback((status: string) => {
//         switch (status?.toLowerCase()) {
//             case 'active': return 'bg-green-100 text-green-800';
//             case 'pending': return 'bg-yellow-100 text-yellow-800';
//             case 'sold': return 'bg-blue-100 text-blue-800';
//             case 'rented': return 'bg-purple-100 text-purple-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     }, []);

//     // Optimized navigation handlers
//     const navigateTo = useCallback((path: string) => {
//         if (path && path !== '#') {
//             router.push(path);
//         }
//     }, [router]);

//     const navigateToClient = useCallback((id: string) => {
//         if (userInfo?.uid) {
//             router.push(`/realstate/${userInfo.uid}/clients/viewclient/${id}`);
//         }
//     }, [router, userInfo?.uid]);

//     const navigateToProperty = useCallback((id: string) => {
//         if (userInfo?.uid) {
//             router.push(`/realstate/${userInfo.uid}/properties/viewproperty/${id}`);
//         }
//     }, [router, userInfo?.uid]);

//     const navigateToOwner = useCallback((id: string) => {
//         if (userInfo?.uid) {
//             router.push(`/realstate/${userInfo.uid}/owners/viewowner/${id}`);
//         }
//     }, [router, userInfo?.uid]);

//     // Quick action handler
//     const handleQuickAction = useCallback((path: string, e?: any) => {
//         if (e) e.stopPropagation();
//         navigateTo(path);
//     }, [navigateTo]);

//     // Handle view all events
//     const handleViewAllEvents = useCallback(() => {
//         if (userInfo?.uid) {
//             navigateTo(`/realstate/${userInfo.uid}/events`);
//         }
//     }, [navigateTo, userInfo?.uid]);

//     if (loading) {
//         return <Loader />
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
//             <Header userData={userInfo} />

//             <main className="flex-1 p-4 sm:p-6 lg:p-8">
//                 {/* Welcome Section - Optimized */}
//                 <div className="mb-10 ml-2 sm:ml-0">
//                     <div className="relative">
//                         <div className="relative">
//                             <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
//                                         <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
//                                         <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Dashboard</span>
//                                         <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
//                                     </div>

//                                     <div className="space-y-3">
//                                         <div className="flex items-center gap-3">
//                                             <div className="hidden sm:block p-2 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-400/10">
//                                                 <Crown className="h-6 w-6 text-amber-500" />
//                                             </div>
//                                             <div>
//                                                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                                                     {greeting},{" "}
//                                                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                                         {userInfo?.name?.split(" ")[0] || "Admin"}
//                                                     </span>
//                                                 </h1>
//                                                 <p className="text-gray-600 mt-2 max-w-xl">
//                                                     Your real estate management hub. Track properties, connect with clients, and grow your business.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Grid - Optimized rendering */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
//                     {stats.map((stat, idx) => (
//                         <div key={idx} className="relative group">
//                             <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
//                                 <div className="absolute -top-3 left-4">
//                                     <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
//                                         {stat.icon}
//                                     </div>
//                                 </div>

//                                 <div className="-mt-1">
//                                     <div className="text-right">
//                                         <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
//                                         <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Column */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Quick Actions - Optimized */}
//                         {/* <div className="bg-white rounded-xl border border-gray-100 px-6 pt-3 pb-4 shadow-lg shadow-black/5">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div>
//                                     <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
//                                         Quick Actions
//                                     </h2>
//                                     <p className="text-sm text-gray-600 mt-1">Essential management tools</p>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//                                 {quickActions.map((action, index) => (
//                                     <div
//                                         key={index}
//                                         onClick={(e) => handleQuickAction(action.path, e)}
//                                         className={`px-3 py-2 rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all ${action.path && action.path !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
//                                     >
//                                         <div className="flex items-center gap-3">
//                                             <div className={`p-2 rounded-lg ${action.bgColor}`}>
//                                                 <div className={action.textColor}>
//                                                     {action.icon}
//                                                 </div>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <h4 className="font-semibold text-gray-900 truncate">{action.label}</h4>
//                                                 <div className="flex items-center justify-between text-xs text-gray-500">
//                                                     <span>{action.description}</span>
//                                                     {action.path && action.path !== '#' && (
//                                                         <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div> */}

//                         {/* Quick Actions - Premium Elegant Design */}
//                         <div className="relative">
//                             {/* Decorative background elements */}
//                             <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
//                             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-amber-100/30 to-rose-100/30 rounded-full blur-2xl"></div>

//                             <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
//                                 {/* Glass morphism header */}
//                                 <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
//                                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500"></div>
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <div className="flex items-center gap-2 mb-1">
//                                                 <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
//                                                     <Sparkles className="h-3.5 w-3.5 text-purple-500" />
//                                                 </div>
//                                                 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Instant Access</span>
//                                             </div>
//                                             <h2 className="text-lg font-semibold text-gray-800">
//                                                 Quick Actions
//                                             </h2>
//                                             <p className="text-[11px] text-gray-400 mt-0.5">Streamline your workflow</p>
//                                         </div>
//                                         <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50/80 border border-gray-100">
//                                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
//                                             <span className="text-[10px] text-gray-500">Ready</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Action Grid */}
//                                 <div className="p-5">
//                                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//                                         {/* Add Client - Luxury Card */}
//                                         <button
//                                             onClick={() => handleQuickAction(quickActions[0].path)}
//                                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-blue-50/20 border border-gray-100/80 hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                                         >
//                                             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-transparent group-hover:from-blue-600/5 transition-all duration-500"></div>
//                                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

//                                             <div className="relative mb-3">
//                                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
//                                                     <UserPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                                 </div>
//                                             </div>

//                                             <div className="relative text-left">
//                                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">Add Client</h4>
//                                                 <p className="text-[10px] text-gray-400 mt-0.5">Register new client</p>
//                                             </div>

//                                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                                 <ChevronRight className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
//                                             </div>
//                                         </button>

//                                         {/* Add Owner */}
//                                         <button
//                                             onClick={() => handleQuickAction(quickActions[1].path)}
//                                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-purple-50/20 border border-gray-100/80 hover:border-purple-200/60 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                                         >
//                                             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-transparent to-transparent group-hover:from-purple-600/5 transition-all duration-500"></div>
//                                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

//                                             <div className="relative mb-3">
//                                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
//                                                     <Building className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                                 </div>
//                                             </div>

//                                             <div className="relative text-left">
//                                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-purple-600 transition-colors">Add Owner</h4>
//                                                 <p className="text-[10px] text-gray-400 mt-0.5">Register property owner</p>
//                                             </div>

//                                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                                 <ChevronRight className="h-3.5 w-3.5 text-purple-500" strokeWidth={2} />
//                                             </div>
//                                         </button>

//                                         {/* Add Property */}
//                                         <button
//                                             onClick={() => handleQuickAction(quickActions[2].path)}
//                                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50/20 border border-gray-100/80 hover:border-emerald-200/60 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                                         >
//                                             <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-transparent to-transparent group-hover:from-emerald-600/5 transition-all duration-500"></div>
//                                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

//                                             <div className="relative mb-3">
//                                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
//                                                     <HomeIcon className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                                 </div>
//                                             </div>

//                                             <div className="relative text-left">
//                                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">Add Property</h4>
//                                                 <p className="text-[10px] text-gray-400 mt-0.5">List new property</p>
//                                             </div>

//                                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                                 <ChevronRight className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
//                                             </div>
//                                         </button>

//                                         {/* Create Event */}
//                                         <button
//                                             onClick={() => handleQuickAction(quickActions[3].path)}
//                                             className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-white to-amber-50/20 border border-gray-100/80 hover:border-amber-200/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-400 cursor-pointer overflow-hidden"
//                                         >
//                                             <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-transparent to-transparent group-hover:from-amber-600/5 transition-all duration-500"></div>
//                                             <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

//                                             <div className="relative mb-3">
//                                                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 group-hover:shadow-xl group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-105">
//                                                     <CalendarPlus className="h-4 w-4 text-white" strokeWidth={1.8} />
//                                                 </div>
//                                             </div>

//                                             <div className="relative text-left">
//                                                 <h4 className="font-medium text-gray-800 text-sm group-hover:text-amber-600 transition-colors">Create Event</h4>
//                                                 <p className="text-[10px] text-gray-400 mt-0.5">Schedule appointment</p>
//                                             </div>

//                                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
//                                                 <ChevronRight className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
//                                             </div>
//                                         </button>
//                                     </div>

//                                     {/* Elegant Footer Stats */}
//                                     <div className="mt-5 pt-3 border-t border-gray-100/80 flex items-center justify-between">
//                                         <div className="flex items-center gap-4">
//                                             {[
//                                                 { label: 'Clients', value: clients.length, color: 'blue' },
//                                                 { label: 'Owners', value: owners.length, color: 'purple' },
//                                                 { label: 'Properties', value: properties.length, color: 'emerald' }
//                                             ].map((stat, i) => (
//                                                 <div key={i} className="flex items-center gap-2">
//                                                     <div className={`w-1 h-1 rounded-full bg-${stat.color}-400`}></div>
//                                                     <span className="text-[10px] font-medium text-gray-500">{stat.label}</span>
//                                                     <span className="text-[11px] font-semibold text-gray-700">{stat.value}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="text-[9px] text-gray-300 font-mono">
//                                             {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Recent Properties - Optimized */}
//                         <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-lg shadow-black/5">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                     Recent Properties
//                                 </h2>
//                                 <Button
//                                     label="View All"
//                                     variant="theme2"
//                                     size="sm"
//                                     onClick={() => navigateTo(`/realstate/${userInfo?.uid}/properties`)}
//                                 />
//                             </div>

//                             {/* Example of using list view in a different section */}
//                             <div className="space-y-4">
//                                 {recentProperties.map((property) => (
//                                     <PropertyCard
//                                         key={property.id}
//                                         property={property}
//                                         userUid={userInfo?.uid}
//                                         variant="list"
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-8">
//                         {/* Upcoming Events - Enhanced */}
//                         <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div>
//                                     <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
//                                     <p className="text-sm text-gray-500 mt-1">Upcoming appointments</p>
//                                 </div>
//                                 <Button
//                                     label="View Calendar"
//                                     variant="theme2"
//                                     size="sm"
//                                     onClick={() => navigateTo(`/realstate/${userInfo?.uid}/events`)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 {events.slice(0, 3).map((event, idx) => (
//                                     <div key={event.id || idx} className="flex items-start gap-3 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50">
//                                         <div className="min-w-[50px] my-auto text-center">
//                                             <div className="text-xl font-bold text-indigo-600">
//                                                 {event.date ? new Date(event.date).getDate() : '??'}
//                                             </div>
//                                             <div className="text-xs text-gray-500">
//                                                 {event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : ''}
//                                             </div>
//                                         </div>
//                                         <div className="flex-1">
//                                             <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
//                                             <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                                                 <Clock className="h-3 w-3" />
//                                                 <span>{event.startTime || 'TBD'}</span>
//                                                 <MapPin className="h-3 w-3 ml-2" />
//                                                 <span className="truncate">{event.address || 'Location TBD'}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         {/* Recent Clients - Optimized */}
//                         <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div>
//                                     <h2 className="text-xl font-bold text-gray-900">
//                                         Clients
//                                     </h2>
//                                     <p className="mt-1 text-sm text-gray-600">Latest client inquiries</p>
//                                 </div>
//                                 <Button
//                                     label="View Clients"
//                                     variant="theme2"
//                                     size="sm"
//                                     onClick={() => navigateTo(`/realstate/${userInfo?.uid}/clients`)}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 {recentClients.length > 0 ? (
//                                     recentClients.map((client) => (
//                                         <div
//                                             key={client.id}
//                                             className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
//                                             onClick={() => navigateToClient(client.id)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className="min-w-[50px] my-auto text-center">
//                                                     <div className="text-xl font-bold text-indigo-600">
//                                                         {client.firstName?.charAt(0) || 'C'}
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex flex-col">
//                                                     <span className="font-semibold text-gray-900 text-sm">
//                                                         {client.firstName?.slice(0, 30) || 'Unknown'} {client.lastName || ''}
//                                                     </span>
//                                                     <span className="text-xs text-gray-500 truncate max-w-[120px]">
//                                                         {client.email || 'No email'}
//                                                     </span>
//                                                     <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
//                                                         <span>{client.phone || 'No phone'}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center">
//                                                 <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-center">
//                                         <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                         <p className="text-gray-600">No clients yet</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Recent Owners - Optimized */}
//                         <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div>
//                                     <h2 className="text-xl font-bold text-gray-900">
//                                         Owners
//                                     </h2>
//                                     <p className="mt-1 text-sm text-gray-600">Latest owners inquiries</p>
//                                 </div>
//                                 <Button
//                                     label="View Owners"
//                                     variant="theme2"
//                                     size="sm"
//                                     onClick={() => navigateTo(`/realstate/${userInfo?.uid}/owners`)}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 {recentOwners.length > 0 ? (
//                                     recentOwners.map((owner) => (
//                                         <div
//                                             key={owner.id}
//                                             className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
//                                             onClick={() => navigateToOwner(owner.id)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className="min-w-[50px] my-auto text-center">
//                                                     <div className="text-xl font-bold text-indigo-600">
//                                                         {owner.firstName?.charAt(0) || 'O'}
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex flex-col">
//                                                     <span className="font-semibold text-gray-900 text-sm">
//                                                         {owner.firstName?.slice(0, 30) || 'Unknown'} {owner.lastName || ''}
//                                                     </span>
//                                                     <span className="text-xs text-gray-500 truncate max-w-[120px]">
//                                                         {owner.email || 'No email'}
//                                                     </span>
//                                                     <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
//                                                         <span>{owner.phone || 'No phone'}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center">
//                                                 <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-center">
//                                         <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                         <p className="text-gray-600">No owners yet</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Upcoming Events
//                         <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
//                             <div className="flex items-center justify-between mb-3">
//                                 <div>
//                                     <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                         Upcoming Events
//                                     </h2>
//                                     <p className="mt-1 text-sm text-gray-600">Property viewings & meetings</p>
//                                 </div>
//                                 <Button
//                                     label="View All"
//                                     variant="theme2"
//                                     size="sm"
//                                     onClick={handleViewAllEvents}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 {upcomingEvents.length > 0 ? (
//                                     upcomingEvents.map((event, idx) => (
//                                         <div
//                                             key={event.id || idx}
//                                             className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
//                                             onClick={() => navigateTo(`/realstate/${userInfo?.uid}/events/${event.id}`)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-10 h-10 text-lg sm:text-xl bg-black rounded-lg flex items-center justify-center font-semibold shadow-md text-white">
//                                                     {event.date ? new Date(event.date).getDate() : '?'}
//                                                 </div>
//                                                 <div className="flex flex-col">
//                                                     <span className="font-semibold text-gray-900 text-sm">{event.title?.slice(0, 30) || 'Untitled Event'}</span>
//                                                     <span className="text-xs text-gray-500">
//                                                         {event.date ? new Date(event.date).toLocaleDateString() : 'No date'} • {event.startTime || ''}
//                                                     </span>
//                                                     <div className="text-xs text-gray-600 mt-1">
//                                                         {event.address || 'No location'}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center">
//                                                 <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-center">
//                                         <CalendarClock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                         <p className="text-gray-600">No upcoming events</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div> */}

//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }




'use client'
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { Users, Home, Building, CalendarClock } from "lucide-react"
import { checkUserSession, getData } from "@/FBConfig/fbFunctions"
import Loader from "@/components/Loader"
import Header from "@/components/Header"
import DashboardClients from "@/components/DashboardClients"
import DashboardOwners from "@/components/DashboardOwners"
import DashboardEvents from "@/components/DashboardEvents"
import DashboardProperties from "@/components/DashboardProperties"
import WelcomeSection from "@/components/WelcomeSection"
import QuickActions from "@/components/QuickActions"
import DashboardStats from "@/components/DashboardStats"

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
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
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
            </main>
        </div>
    )
}