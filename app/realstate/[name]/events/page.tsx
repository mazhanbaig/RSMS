// // // // 'use client';

// // // // import { useEffect, useState, useMemo, useCallback } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { message } from "antd";
// // // // import {
// // // //     Calendar, Clock, MapPin, Users, Home, DollarSign,
// // // //     ArrowLeft, Plus, Filter, Search, ChevronRight,
// // // //     PhoneCall, Mail, MessageSquare, CheckCircle,
// // // //     XCircle, Building, Key, Target, Zap,
// // // //     Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
// // // //     ChevronDown, MoreVertical, Edit, Trash2,
// // // //     User, Sparkles, Crown, Bed, Bath,
// // // //     Check, X, AlertCircle, ExternalLink,
// // // //     Layers, HomeIcon, Briefcase
// // // // } from "lucide-react";
// // // // import Header from "@/components/Header";
// // // // import Button from "@/components/Button";
// // // // import Loader from "@/components/Loader";
// // // // import DraggableButton from "@/components/DraggableButton";
// // // // import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// // // // const ListIcon = ({ className }: { className?: string }) => (
// // // //     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // // //     </svg>
// // // // );

// // // // interface UserInfo {
// // // //     uid: string;
// // // //     email?: string;
// // // //     name?: string;
// // // //     [key: string]: any;
// // // // }

// // // // interface ClientData {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     propertyType?: string;
// // // //     preferredLocations?: string;
// // // //     ownerUid?: string;
// // // //     agentUid?: string;
// // // // }

// // // // interface OwnerData {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     propertyAddress?: string;
// // // //     ownerUid?: string;
// // // //     agentUid?: string;
// // // // }

// // // // interface EventData {
// // // //     id: string;
// // // //     title: string;
// // // //     description: string;
// // // //     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
// // // //     clientIds: string[]; // Can contain both client and owner IDs
// // // //     address: string;
// // // //     date: string;
// // // //     startTime: string;
// // // //     endTime: string;
// // // //     notes?: string;
// // // //     reminderTime: string;
// // // //     agentUid: string;
// // // //     agentName: string;
// // // //     reminderSent: boolean;
// // // //     createdAt: string;
// // // // }

// // // // interface AttendeeInfo {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     type: 'client' | 'owner';
// // // //     propertyInfo?: string;
// // // // }

// // // // export default function ElegantEventsPage() {
// // // //     const router = useRouter();
// // // //     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
// // // //     const [events, setEvents] = useState<EventData[]>([]);
// // // //     const [clients, setClients] = useState<ClientData[]>([]);
// // // //     const [owners, setOwners] = useState<OwnerData[]>([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [searchTerm, setSearchTerm] = useState('');
// // // //     const [filterType, setFilterType] = useState<string>('all');
// // // //     const [filterStatus, setFilterStatus] = useState<string>('all');
// // // //     const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// // // //     const [deletingId, setDeletingId] = useState<string | null>(null);

// // // //     // Event type configuration
// // // //     const eventTypeConfig = useMemo(() => ({
// // // //         'property-viewing': {
// // // //             label: 'Property Viewing',
// // // //             icon: <Eye className="w-4 h-4" />,
// // // //             color: 'text-blue-600',
// // // //             bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
// // // //             border: 'border-blue-200'
// // // //         },
// // // //         'client-meeting': {
// // // //             label: 'Client Meeting',
// // // //             icon: <Users className="w-4 h-4" />,
// // // //             color: 'text-purple-600',
// // // //             bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
// // // //             border: 'border-purple-200'
// // // //         },
// // // //         'closing-session': {
// // // //             label: 'Closing Session',
// // // //             icon: <Key className="w-4 h-4" />,
// // // //             color: 'text-green-600',
// // // //             bg: 'bg-gradient-to-br from-green-50 to-green-100',
// // // //             border: 'border-green-200'
// // // //         },
// // // //         'property-inspection': {
// // // //             label: 'Property Inspection',
// // // //             icon: <Target className="w-4 h-4" />,
// // // //             color: 'text-amber-600',
// // // //             bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
// // // //             border: 'border-amber-200'
// // // //         },
// // // //         'follow-up-call': {
// // // //             label: 'Follow-up Call',
// // // //             icon: <PhoneCall className="w-4 h-4" />,
// // // //             color: 'text-indigo-600',
// // // //             bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
// // // //             border: 'border-indigo-200'
// // // //         }
// // // //     }), []);

// // // //     // Get event status
// // // //     const getEventStatus = useCallback((event: EventData) => {
// // // //         const now = new Date();
// // // //         const eventDate = new Date(`${event.date}T${event.startTime}`);
// // // //         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

// // // //         if (eventEndDate < now) {
// // // //             return 'completed';
// // // //         } else if (eventDate <= now && eventEndDate >= now) {
// // // //             return 'in-progress';
// // // //         } else {
// // // //             return 'scheduled';
// // // //         }
// // // //     }, []);

// // // //     // Status configuration
// // // //     const statusConfig = useMemo(() => ({
// // // //         'scheduled': {
// // // //             label: 'Scheduled',
// // // //             color: 'text-blue-600',
// // // //             bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
// // // //             border: 'border-blue-200',
// // // //             icon: <Calendar className="w-3 h-3" />
// // // //         },
// // // //         'in-progress': {
// // // //             label: 'In Progress',
// // // //             color: 'text-amber-600',
// // // //             bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
// // // //             border: 'border-amber-200',
// // // //             icon: <AlertCircle className="w-3 h-3" />
// // // //         },
// // // //         'completed': {
// // // //             label: 'Completed',
// // // //             color: 'text-green-600',
// // // //             bg: 'bg-gradient-to-r from-green-50 to-green-100',
// // // //             border: 'border-green-200',
// // // //             icon: <CheckCircle className="w-3 h-3" />
// // // //         }
// // // //     }), []);

// // // //     // Fetch clients and owners
// // // //     const fetchClients = useCallback(async (uid: string) => {
// // // //         try {
// // // //             const clientsData: any = await getData(`clients/${uid}`);
// // // //             if (clientsData) {
// // // //                 const clientsArray = Object.entries(clientsData)
// // // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // // //                     .filter((client) => client.agentUid === uid || client.ownerUid === uid);
// // // //                 setClients(clientsArray);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching clients:', error);
// // // //         }
// // // //     }, []);

// // // //     const fetchOwners = useCallback(async (uid: string) => {
// // // //         try {
// // // //             const ownersData: any = await getData(`owners/${uid}`);
// // // //             if (ownersData) {
// // // //                 const ownersArray = Object.entries(ownersData)
// // // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // // //                     .filter((owner) => owner.agentUid === uid);
// // // //                 setOwners(ownersArray);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching owners:', error);
// // // //         }
// // // //     }, []);

// // // //     // Get attendee info by ID (works for both clients and owners)
// // // //     const getAttendeeInfo = useCallback((id: string): AttendeeInfo | null => {
// // // //         const client = clients.find(c => c.id === id);
// // // //         if (client) {
// // // //             return {
// // // //                 ...client,
// // // //                 type: 'client',
// // // //                 propertyInfo: client.propertyType
// // // //             };
// // // //         }
// // // //         const owner = owners.find(o => o.id === id);
// // // //         if (owner) {
// // // //             return {
// // // //                 ...owner,
// // // //                 type: 'owner',
// // // //                 propertyInfo: owner.propertyAddress
// // // //             };
// // // //         }
// // // //         return null;
// // // //     }, [clients, owners]);

// // // //     // Get formatted attendees string for table
// // // //     const getAttendeesDisplay = useCallback((clientIds: string[]) => {
// // // //         if (!clientIds || clientIds.length === 0) {
// // // //             return { text: 'No attendees', hasMultiple: false, attendees: [] };
// // // //         }

// // // //         const attendees = clientIds.map(id => getAttendeeInfo(id)).filter(Boolean) as AttendeeInfo[];

// // // //         if (attendees.length === 0) {
// // // //             return { text: 'Unknown attendees', hasMultiple: false, attendees: [] };
// // // //         }

// // // //         const clientCount = attendees.filter(a => a.type === 'client').length;
// // // //         const ownerCount = attendees.filter(a => a.type === 'owner').length;

// // // //         let text = '';
// // // //         if (clientCount > 0 && ownerCount > 0) {
// // // //             text = `${clientCount} client${clientCount > 1 ? 's' : ''}, ${ownerCount} owner${ownerCount > 1 ? 's' : ''}`;
// // // //         } else if (clientCount > 0) {
// // // //             text = `${clientCount} client${clientCount > 1 ? 's' : ''}`;
// // // //         } else if (ownerCount > 0) {
// // // //             text = `${ownerCount} owner${ownerCount > 1 ? 's' : ''}`;
// // // //         }

// // // //         return {
// // // //             text,
// // // //             hasMultiple: attendees.length > 1,
// // // //             attendees
// // // //         };
// // // //     }, [getAttendeeInfo]);

// // // //     // Load all data
// // // //     useEffect(() => {
// // // //         const checkAuth = async () => {
// // // //             try {
// // // //                 const user: any = await checkUserSession();
// // // //                 if (!user) {
// // // //                     message.error('Please Login First');
// // // //                     router.replace('/login');
// // // //                     return;
// // // //                 }

// // // //                 const storedUser = localStorage.getItem('userInfo');
// // // //                 let userData;

// // // //                 if (storedUser) {
// // // //                     userData = JSON.parse(storedUser);
// // // //                 } else {
// // // //                     userData = await getData(`users/${user.uid}`);
// // // //                     if (userData) {
// // // //                         localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
// // // //                     }
// // // //                 }

// // // //                 if (userData) {
// // // //                     setUserInfo({ uid: user.uid, ...userData });
// // // //                     // Fetch all data in parallel
// // // //                     await Promise.all([
// // // //                         fetchEvents(user.uid),
// // // //                         fetchClients(user.uid),
// // // //                         fetchOwners(user.uid)
// // // //                     ]);
// // // //                 }
// // // //             } catch (err) {
// // // //                 console.error('Authentication error:', err);
// // // //                 message.error('Error occurred during authentication');
// // // //                 router.replace('/login');
// // // //             } finally {
// // // //                 setLoading(false);
// // // //             }
// // // //         };

// // // //         checkAuth();
// // // //     }, [router, fetchClients, fetchOwners]);

// // // //     const fetchEvents = async (uid: string) => {
// // // //         try {
// // // //             const eventsData: any = await getData(`events/${uid}`);

// // // //             if (eventsData) {
// // // //                 let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
// // // //                     id,
// // // //                     ...value
// // // //                 }));
// // // //                 eventsArray = eventsArray.reverse();
// // // //                 setEvents(eventsArray);
// // // //             } else {
// // // //                 setEvents([]);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching events:', error);
// // // //             message.error('Failed to fetch events');
// // // //             setEvents([]);
// // // //         }
// // // //     };

// // // //     // Format helpers
// // // //     const formatDate = useCallback((dateString: string) => {
// // // //         const date = new Date(dateString);
// // // //         const today = new Date();
// // // //         const tomorrow = new Date(today);
// // // //         tomorrow.setDate(tomorrow.getDate() + 1);

// // // //         if (date.toDateString() === today.toDateString()) {
// // // //             return 'Today';
// // // //         } else if (date.toDateString() === tomorrow.toDateString()) {
// // // //             return 'Tomorrow';
// // // //         } else {
// // // //             return date.toLocaleDateString('en-US', {
// // // //                 weekday: 'short',
// // // //                 month: 'short',
// // // //                 day: 'numeric'
// // // //             });
// // // //         }
// // // //     }, []);

// // // //     const formatTime = useCallback((timeString: string) => {
// // // //         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// // // //             hour: 'numeric',
// // // //             minute: '2-digit',
// // // //             hour12: true
// // // //         });
// // // //     }, []);

// // // //     // Filter events
// // // //     const filteredEvents = useMemo(() => {
// // // //         return events.filter(event => {
// // // //             const matchesSearch = searchTerm === '' ||
// // // //                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //                 event.address?.toLowerCase().includes(searchTerm.toLowerCase());

// // // //             const matchesType = filterType === 'all' || event.eventType === filterType;
// // // //             const eventStatus = getEventStatus(event);
// // // //             const matchesStatus = filterStatus === 'all' || eventStatus === filterStatus;

// // // //             return matchesSearch && matchesType && matchesStatus;
// // // //         }).sort((a, b) => {
// // // //             const dateA = new Date(`${a.date}T${a.startTime}`);
// // // //             const dateB = new Date(`${b.date}T${b.startTime}`);
// // // //             return dateA.getTime() - dateB.getTime();
// // // //         });
// // // //     }, [events, searchTerm, filterType, filterStatus, getEventStatus]);

// // // //     // Event statistics
// // // //     const eventStats = useMemo(() => ({
// // // //         total: events.length,
// // // //         upcoming: events.filter(e => {
// // // //             const eventDate = new Date(`${e.date}T${e.startTime}`);
// // // //             return eventDate > new Date();
// // // //         }).length,
// // // //         today: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
// // // //         completed: events.filter(e => getEventStatus(e) === 'completed').length
// // // //     }), [events, getEventStatus]);

// // // //     // Handlers
// // // //     const handleDeleteEvent = async (eventId: string) => {
// // // //         if (!window.confirm('Are you sure you want to delete this event?')) return;

// // // //         setDeletingId(eventId);
// // // //         try {
// // // //             await deleleData(`events/${userInfo?.uid}/${eventId}`);
// // // //             setEvents(events.filter(event => event.id !== eventId));
// // // //             message.success('Event deleted successfully');
// // // //         } catch (error) {
// // // //             console.error("Delete error:", error);
// // // //             message.error('Failed to delete event');
// // // //         } finally {
// // // //             setDeletingId(null);
// // // //         }
// // // //     };

// // // //     const handleViewEvent = (eventId: string) => {
// // // //         router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
// // // //     };

// // // //     const handleCreateEvent = () => {
// // // //         router.push(`/realstate/${userInfo?.uid}/events/addevent`);
// // // //     };

// // // //     if (loading) {
// // // //         return <Loader />;
// // // //     }

// // // //     return (
// // // //         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
// // // //             <Header userData={userInfo} />

// // // //             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // // //                 {/* Header Section */}
// // // //                 <div className="mb-8">
// // // //                     <div className="flex-1">
// // // //                         <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
// // // //                             <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
// // // //                             <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Events Management</span>
// // // //                             <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
// // // //                         </div>

// // // //                         <div className="space-y-3">
// // // //                             <div>
// // // //                                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
// // // //                                     Schedule & {" "}
// // // //                                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
// // // //                                         Events
// // // //                                     </span>
// // // //                                 </h1>
// // // //                                 <p className="text-gray-600 mt-2 max-w-xl">
// // // //                                     Manage property viewings, client meetings, and real estate appointments
// // // //                                 </p>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Stats Overview */}
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
// // // //                     {[
// // // //                         { title: 'Total Events', value: eventStats.total, icon: <Calendar className="w-5 h-5 text-purple-600" />, color: 'purple' },
// // // //                         { title: 'Upcoming', value: eventStats.upcoming, icon: <TrendingUp className="w-5 h-5 text-blue-600" />, color: 'blue' },
// // // //                         { title: 'Today', value: eventStats.today, icon: <Clock className="w-5 h-5 text-green-600" />, color: 'green' },
// // // //                         { title: 'Completed', value: eventStats.completed, icon: <CheckCircle className="w-5 h-5 text-amber-600" />, color: 'amber' }
// // // //                     ].map((stat, idx) => (
// // // //                         <div key={idx} className="relative group">
// // // //                             <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
// // // //                                 <div className="absolute -top-3 left-4">
// // // //                                     <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
// // // //                                         {stat.icon}
// // // //                                     </div>
// // // //                                 </div>
// // // //                                 <div className="-mt-1">
// // // //                                     <div className="text-right">
// // // //                                         <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
// // // //                                         <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>

// // // //                 {/* Search and Filter Bar */}
// // // //                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-6">
// // // //                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //                         <div className="flex flex-wrap gap-3">
// // // //                             <Button label="Add Event" onClick={handleCreateEvent} variant="theme" icon={<Layers className="w-4 h-4" />} size="md" />
// // // //                             <Button label={viewMode === 'grid' ? 'List View' : 'Grid View'} onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} variant="theme2" icon={viewMode === 'grid' ? <ListIcon className="w-4 h-4" /> : <Grid className="w-4 h-4" />} size="md" />
// // // //                         </div>
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// // // //                             <input type="text" placeholder="Search by events or address" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors md:min-w-80" />
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Filter Buttons */}
// // // //                     <div className="flex flex-wrap gap-2 mt-4">
// // // //                         {[
// // // //                             { id: 'all', label: 'All Types', count: events.length },
// // // //                             ...Object.entries(eventTypeConfig).map(([key, config]) => ({
// // // //                                 id: key,
// // // //                                 label: config.label,
// // // //                                 count: events.filter(e => e.eventType === key).length
// // // //                             }))
// // // //                         ].map((filter) => (
// // // //                             <button key={filter.id} onClick={() => setFilterType(filter.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === filter.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// // // //                                 {filter.label}
// // // //                                 <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${filterType === filter.id ? 'bg-white/20' : 'bg-white'}`}>{filter.count}</span>
// // // //                             </button>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Events Table View */}
// // // //                 <div className="mt-6">
// // // //                     <div className="flex items-center justify-between mb-4">
// // // //                         <h2 className="text-xl font-bold text-gray-900">All Events</h2>
// // // //                         <div className="text-sm text-gray-600">Showing {filteredEvents.length} of {events.length} events</div>
// // // //                     </div>

// // // //                     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
// // // //                         <div className="overflow-x-auto">
// // // //                             <table className="w-full">
// // // //                                 <thead className="bg-gray-50">
// // // //                                     <tr>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Event</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Type</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Status</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Date & Time</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Address</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Attendees</th>
// // // //                                         <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
// // // //                                     </tr>
// // // //                                 </thead>
// // // //                                 <tbody className="divide-y divide-gray-200">
// // // //                                     {filteredEvents.length > 0 ? (
// // // //                                         filteredEvents.map((event) => {
// // // //                                             const typeConfig = eventTypeConfig[event.eventType];
// // // //                                             const eventStatus = getEventStatus(event);
// // // //                                             const statusConfigItem = statusConfig[eventStatus];
// // // //                                             const attendeesDisplay = getAttendeesDisplay(event.clientIds);

// // // //                                             return (
// // // //                                                 <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewEvent(event.id)}>
// // // //                                                     <td className="px-4 py-3 font-medium text-gray-900">{event.title}</td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         <div className="flex items-center gap-2">
// // // //                                                             <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
// // // //                                                                 <div className={typeConfig.color}>{typeConfig.icon}</div>
// // // //                                                             </div>
// // // //                                                             <span className="text-sm text-gray-700">{typeConfig.label}</span>
// // // //                                                         </div>
// // // //                                                     </td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfigItem.bg} ${statusConfigItem.color}`}>
// // // //                                                             {statusConfigItem.label}
// // // //                                                         </span>
// // // //                                                     </td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         <div className="text-sm text-gray-700">
// // // //                                                             {formatDate(event.date)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
// // // //                                                         </div>
// // // //                                                     </td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         <span className="text-sm text-gray-700 line-clamp-1 max-w-xs">{event.address}</span>
// // // //                                                     </td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         {attendeesDisplay.attendees.length > 0 ? (
// // // //                                                             <div className="flex flex-col gap-1">
// // // //                                                                 <span className="text-sm text-gray-700 font-medium">
// // // //                                                                     {attendeesDisplay.text}
// // // //                                                                 </span>
// // // //                                                                 {attendeesDisplay.hasMultiple && (
// // // //                                                                     <div className="flex -space-x-2">
// // // //                                                                         {attendeesDisplay.attendees.slice(0, 3).map((attendee, idx) => (
// // // //                                                                             <div key={attendee.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${attendee.type === 'client' ? 'bg-purple-500' : 'bg-amber-500'} ring-2 ring-white`} title={`${attendee.firstName} ${attendee.lastName} (${attendee.type === 'client' ? 'Client' : 'Owner'})`}>
// // // //                                                                                 {attendee.firstName?.charAt(0)}{attendee.lastName?.charAt(0)}
// // // //                                                                             </div>
// // // //                                                                         ))}
// // // //                                                                         {attendeesDisplay.attendees.length > 3 && (
// // // //                                                                             <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 ring-2 ring-white">
// // // //                                                                                 +{attendeesDisplay.attendees.length - 3}
// // // //                                                                             </div>
// // // //                                                                         )}
// // // //                                                                     </div>
// // // //                                                                 )}
// // // //                                                             </div>
// // // //                                                         ) : (
// // // //                                                             <span className="text-sm text-gray-400">No attendees</span>
// // // //                                                         )}
// // // //                                                     </td>
// // // //                                                     <td className="px-4 py-3">
// // // //                                                         <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" disabled={deletingId === event.id}>
// // // //                                                             <Trash2 className={`h-4 w-4 ${deletingId === event.id ? 'opacity-50' : ''}`} />
// // // //                                                         </button>
// // // //                                                     </td>
// // // //                                                 </tr>
// // // //                                             );
// // // //                                         })
// // // //                                     ) : (
// // // //                                         <tr>
// // // //                                             <td colSpan={7} className="p-8 text-center">
// // // //                                                 <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
// // // //                                                 <p className="text-gray-600">No events found</p>
// // // //                                                 <p className="text-sm text-gray-500 mt-2">Try changing your search or filters</p>
// // // //                                             </td>
// // // //                                         </tr>
// // // //                                     )}
// // // //                                 </tbody>
// // // //                             </table>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 <DraggableButton onClick={handleCreateEvent} />
// // // //             </main>
// // // //         </div>
// // // //     );
// // // // }




// // // // 'use client';

// // // // import { useEffect, useState, useMemo, useCallback } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { message } from "antd";
// // // // import {
// // // //     Calendar, Clock, MapPin, Users, Home, DollarSign,
// // // //     ArrowLeft, Plus, Filter, Search, ChevronRight,
// // // //     PhoneCall, Mail, MessageSquare, CheckCircle,
// // // //     XCircle, Building, Key, Target, Zap,
// // // //     Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
// // // //     ChevronDown, MoreVertical, Edit, Trash2,
// // // //     User, Sparkles, Crown, Bed, Bath,
// // // //     Check, X, AlertCircle, ExternalLink,
// // // //     Layers, HomeIcon, Briefcase, ChevronLeft,
// // // //     CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
// // // //     ListFilter, Clock8
// // // // } from "lucide-react";
// // // // import Header from "@/components/Header";
// // // // import Button from "@/components/Button";
// // // // import Loader from "@/components/Loader";
// // // // import DraggableButton from "@/components/DraggableButton";
// // // // import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// // // // const ListIcon = ({ className }: { className?: string }) => (
// // // //     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // // //     </svg>
// // // // );

// // // // interface UserInfo {
// // // //     uid: string;
// // // //     email?: string;
// // // //     name?: string;
// // // //     [key: string]: any;
// // // // }

// // // // interface ClientData {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     propertyType?: string;
// // // //     preferredLocations?: string;
// // // //     ownerUid?: string;
// // // //     agentUid?: string;
// // // // }

// // // // interface OwnerData {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     propertyAddress?: string;
// // // //     ownerUid?: string;
// // // //     agentUid?: string;
// // // // }

// // // // interface EventData {
// // // //     id: string;
// // // //     title: string;
// // // //     description: string;
// // // //     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
// // // //     clientIds: string[];
// // // //     address: string;
// // // //     date: string;
// // // //     startTime: string;
// // // //     endTime: string;
// // // //     notes?: string;
// // // //     reminderTime: string;
// // // //     agentUid: string;
// // // //     agentName: string;
// // // //     reminderSent: boolean;
// // // //     createdAt: string;
// // // // }

// // // // interface AttendeeInfo {
// // // //     id: string;
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     type: 'client' | 'owner';
// // // //     propertyInfo?: string;
// // // // }

// // // // // Event type configuration
// // // // const eventTypeConfig = {
// // // //     'property-viewing': {
// // // //         label: 'Property Viewing',
// // // //         icon: <Eye className="w-4 h-4" />,
// // // //         color: 'text-blue-600',
// // // //         bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
// // // //         border: 'border-blue-200'
// // // //     },
// // // //     'client-meeting': {
// // // //         label: 'Client Meeting',
// // // //         icon: <Users className="w-4 h-4" />,
// // // //         color: 'text-purple-600',
// // // //         bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
// // // //         border: 'border-purple-200'
// // // //     },
// // // //     'closing-session': {
// // // //         label: 'Closing Session',
// // // //         icon: <Key className="w-4 h-4" />,
// // // //         color: 'text-green-600',
// // // //         bg: 'bg-gradient-to-br from-green-50 to-green-100',
// // // //         border: 'border-green-200'
// // // //     },
// // // //     'property-inspection': {
// // // //         label: 'Property Inspection',
// // // //         icon: <Target className="w-4 h-4" />,
// // // //         color: 'text-amber-600',
// // // //         bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
// // // //         border: 'border-amber-200'
// // // //     },
// // // //     'follow-up-call': {
// // // //         label: 'Follow-up Call',
// // // //         icon: <PhoneCall className="w-4 h-4" />,
// // // //         color: 'text-indigo-600',
// // // //         bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
// // // //         border: 'border-indigo-200'
// // // //     }
// // // // };

// // // // // Status configuration
// // // // const statusConfig = {
// // // //     'scheduled': {
// // // //         label: 'Scheduled',
// // // //         color: 'text-blue-600',
// // // //         bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
// // // //         border: 'border-blue-200',
// // // //         icon: <Calendar className="w-3 h-3" />
// // // //     },
// // // //     'in-progress': {
// // // //         label: 'In Progress',
// // // //         color: 'text-amber-600',
// // // //         bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
// // // //         border: 'border-amber-200',
// // // //         icon: <AlertCircle className="w-3 h-3" />
// // // //     },
// // // //     'completed': {
// // // //         label: 'Completed',
// // // //         color: 'text-green-600',
// // // //         bg: 'bg-gradient-to-r from-green-50 to-green-100',
// // // //         border: 'border-green-200',
// // // //         icon: <CheckCircle className="w-3 h-3" />
// // // //     }
// // // // };

// // // // // Time filter options - UPDATED: Tomorrow instead of Yesterday
// // // // type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month' | 'all';

// // // // const timeFilterConfig: Record<TimeFilter, { label: string; icon: any }> = {
// // // //     'today': { label: 'Today', icon: <Clock8 className="w-4 h-4" /> },
// // // //     'tomorrow': { label: 'Tomorrow', icon: <CalendarPlus className="w-4 h-4" /> },
// // // //     'this-week': { label: 'This Week', icon: <CalendarRange className="w-4 h-4" /> },
// // // //     'this-month': { label: 'This Month', icon: <CalendarCheck className="w-4 h-4" /> },
// // // //     'all': { label: 'All Events', icon: <ListFilter className="w-4 h-4" /> },
// // // // };

// // // // export default function CalendarEventsPage() {
// // // //     const router = useRouter();
// // // //     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
// // // //     const [events, setEvents] = useState<EventData[]>([]);
// // // //     const [clients, setClients] = useState<ClientData[]>([]);
// // // //     const [owners, setOwners] = useState<OwnerData[]>([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [currentMonth, setCurrentMonth] = useState(new Date());
// // // //     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
// // // //     const [deletingId, setDeletingId] = useState<string | null>(null);
// // // //     const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
// // // //     const [searchTerm, setSearchTerm] = useState('');
// // // //     const [filterType, setFilterType] = useState<string>('all');
// // // //     const [showFilters, setShowFilters] = useState(false);
// // // //     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// // // //     // Get event status
// // // //     const getEventStatus = useCallback((event: EventData) => {
// // // //         const now = new Date();
// // // //         const eventDate = new Date(`${event.date}T${event.startTime}`);
// // // //         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

// // // //         if (eventEndDate < now) {
// // // //             return 'completed';
// // // //         } else if (eventDate <= now && eventEndDate >= now) {
// // // //             return 'in-progress';
// // // //         } else {
// // // //             return 'scheduled';
// // // //         }
// // // //     }, []);

// // // //     // Fetch clients and owners
// // // //     const fetchClients = useCallback(async (uid: string) => {
// // // //         try {
// // // //             const clientsData: any = await getData(`clients/${uid}`);
// // // //             if (clientsData) {
// // // //                 const clientsArray = Object.entries(clientsData)
// // // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // // //                     .filter((client) => client.agentUid === uid || client.ownerUid === uid);
// // // //                 setClients(clientsArray);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching clients:', error);
// // // //         }
// // // //     }, []);

// // // //     const fetchOwners = useCallback(async (uid: string) => {
// // // //         try {
// // // //             const ownersData: any = await getData(`owners/${uid}`);
// // // //             if (ownersData) {
// // // //                 const ownersArray = Object.entries(ownersData)
// // // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // // //                     .filter((owner) => owner.agentUid === uid);
// // // //                 setOwners(ownersArray);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching owners:', error);
// // // //         }
// // // //     }, []);

// // // //     // Get attendee info by ID
// // // //     const getAttendeeInfo = useCallback((id: string): AttendeeInfo | null => {
// // // //         const client = clients.find(c => c.id === id);
// // // //         if (client) {
// // // //             return {
// // // //                 ...client,
// // // //                 type: 'client',
// // // //                 propertyInfo: client.propertyType
// // // //             };
// // // //         }
// // // //         const owner = owners.find(o => o.id === id);
// // // //         if (owner) {
// // // //             return {
// // // //                 ...owner,
// // // //                 type: 'owner',
// // // //                 propertyInfo: owner.propertyAddress
// // // //             };
// // // //         }
// // // //         return null;
// // // //     }, [clients, owners]);

// // // //     // Load all data
// // // //     useEffect(() => {
// // // //         const checkAuth = async () => {
// // // //             try {
// // // //                 const user: any = await checkUserSession();
// // // //                 if (!user) {
// // // //                     message.error('Please Login First');
// // // //                     router.replace('/login');
// // // //                     return;
// // // //                 }

// // // //                 const storedUser = localStorage.getItem('userInfo');
// // // //                 let userData;

// // // //                 if (storedUser) {
// // // //                     userData = JSON.parse(storedUser);
// // // //                 } else {
// // // //                     userData = await getData(`users/${user.uid}`);
// // // //                     if (userData) {
// // // //                         localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
// // // //                     }
// // // //                 }

// // // //                 if (userData) {
// // // //                     setUserInfo({ uid: user.uid, ...userData });
// // // //                     await Promise.all([
// // // //                         fetchEvents(user.uid),
// // // //                         fetchClients(user.uid),
// // // //                         fetchOwners(user.uid)
// // // //                     ]);
// // // //                 }
// // // //             } catch (err) {
// // // //                 console.error('Authentication error:', err);
// // // //                 message.error('Error occurred during authentication');
// // // //                 router.replace('/login');
// // // //             } finally {
// // // //                 setLoading(false);
// // // //             }
// // // //         };

// // // //         checkAuth();
// // // //     }, [router, fetchClients, fetchOwners]);

// // // //     const fetchEvents = async (uid: string) => {
// // // //         try {
// // // //             const eventsData: any = await getData(`events/${uid}`);

// // // //             if (eventsData) {
// // // //                 let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
// // // //                     id,
// // // //                     ...value
// // // //                 }));
// // // //                 eventsArray = eventsArray.reverse();
// // // //                 setEvents(eventsArray);
// // // //             } else {
// // // //                 setEvents([]);
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching events:', error);
// // // //             message.error('Failed to fetch events');
// // // //             setEvents([]);
// // // //         }
// // // //     };

// // // //     // Calendar helpers
// // // //     const getDaysInMonth = (date: Date) => {
// // // //         const year = date.getFullYear();
// // // //         const month = date.getMonth();
// // // //         const firstDay = new Date(year, month, 1);
// // // //         const lastDay = new Date(year, month + 1, 0);
// // // //         const daysInMonth = lastDay.getDate();
// // // //         const startingDayOfWeek = firstDay.getDay();

// // // //         const days: (Date | null)[] = [];

// // // //         for (let i = 0; i < startingDayOfWeek; i++) {
// // // //             days.push(null);
// // // //         }

// // // //         for (let i = 1; i <= daysInMonth; i++) {
// // // //             days.push(new Date(year, month, i));
// // // //         }

// // // //         return days;
// // // //     };

// // // //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// // // //     const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// // // //     const goToPreviousMonth = () => {
// // // //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// // // //     };

// // // //     const goToNextMonth = () => {
// // // //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// // // //     };

// // // //     const goToToday = () => {
// // // //         setCurrentMonth(new Date());
// // // //         setSelectedDate(new Date());
// // // //         setTimeFilter('today');
// // // //     };

// // // //     // Get date range based on time filter - UPDATED: Tomorrow instead of Yesterday
// // // //     const getDateRange = useCallback((filter: TimeFilter): { start: Date | null; end: Date | null } => {
// // // //         const now = new Date();
// // // //         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // //         const tomorrow = new Date(today);
// // // //         tomorrow.setDate(tomorrow.getDate() + 1);

// // // //         switch (filter) {
// // // //             case 'today':
// // // //                 return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
// // // //             case 'tomorrow':
// // // //                 return { start: tomorrow, end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1) };
// // // //             case 'this-week': {
// // // //                 const start = new Date(today);
// // // //                 start.setDate(today.getDate() - today.getDay());
// // // //                 const end = new Date(start);
// // // //                 end.setDate(start.getDate() + 6);
// // // //                 end.setHours(23, 59, 59, 999);
// // // //                 return { start, end };
// // // //             }
// // // //             case 'this-month': {
// // // //                 const start = new Date(today.getFullYear(), today.getMonth(), 1);
// // // //                 const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// // // //                 end.setHours(23, 59, 59, 999);
// // // //                 return { start, end };
// // // //             }
// // // //             case 'all':
// // // //             default:
// // // //                 return { start: null, end: null };
// // // //         }
// // // //     }, []);

// // // //     // Filter events based on time filter
// // // //     const filterEventsByTime = useCallback((events: EventData[], filter: TimeFilter) => {
// // // //         if (filter === 'all') return events;

// // // //         const range = getDateRange(filter);
// // // //         if (!range.start) return events;

// // // //         return events.filter(event => {
// // // //             const eventDate = new Date(event.date);
// // // //             if (range.end) {
// // // //                 return eventDate >= range.start! && eventDate <= range.end!;
// // // //             }
// // // //             return eventDate >= range.start!;
// // // //         });
// // // //     }, [getDateRange]);

// // // //     // Filtered events based on time filter, search, and type
// // // //     const filteredEvents = useMemo(() => {
// // // //         let filtered = filterEventsByTime(events, timeFilter);

// // // //         if (searchTerm) {
// // // //             filtered = filtered.filter(event =>
// // // //                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //                 event.address?.toLowerCase().includes(searchTerm.toLowerCase())
// // // //             );
// // // //         }

// // // //         if (filterType !== 'all') {
// // // //             filtered = filtered.filter(event => event.eventType === filterType);
// // // //         }

// // // //         return filtered.sort((a, b) => {
// // // //             const dateA = new Date(`${a.date}T${a.startTime}`);
// // // //             const dateB = new Date(`${b.date}T${b.startTime}`);
// // // //             return dateA.getTime() - dateB.getTime();
// // // //         });
// // // //     }, [events, timeFilter, searchTerm, filterType, filterEventsByTime]);

// // // //     const formatDateForComparison = (date: Date) => {
// // // //         const year = date.getFullYear();
// // // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // // //         const day = String(date.getDate()).padStart(2, '0');
// // // //         return `${year}-${month}-${day}`;
// // // //     };

// // // //     const getEventsForDate = useCallback((date: Date) => {
// // // //         if (!date) return [];
// // // //         const dateString = formatDateForComparison(date);
// // // //         return events.filter(event => event.date === dateString);
// // // //     }, [events]);

// // // //     // Events for selected date
// // // //     const selectedDateEvents = useMemo(() => {
// // // //         if (!selectedDate) return [];

// // // //         let selectedEvents = getEventsForDate(selectedDate);

// // // //         if (searchTerm) {
// // // //             selectedEvents = selectedEvents.filter(event =>
// // // //                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //                 event.address?.toLowerCase().includes(searchTerm.toLowerCase())
// // // //             );
// // // //         }

// // // //         if (filterType !== 'all') {
// // // //             selectedEvents = selectedEvents.filter(
// // // //                 event => event.eventType === filterType
// // // //             );
// // // //         }

// // // //         return selectedEvents.sort((a, b) => {
// // // //             const dateA = new Date(`${a.date}T${a.startTime}`);
// // // //             const dateB = new Date(`${b.date}T${b.startTime}`);
// // // //             return dateA.getTime() - dateB.getTime();
// // // //         });
// // // //     }, [selectedDate, getEventsForDate, searchTerm, filterType]);

// // // //     // Format helpers
// // // //     const formatDate = useCallback((dateString: string) => {
// // // //         const date = new Date(dateString);
// // // //         const today = new Date();
// // // //         const tomorrow = new Date(today);
// // // //         tomorrow.setDate(tomorrow.getDate() + 1);

// // // //         if (date.toDateString() === today.toDateString()) {
// // // //             return 'Today';
// // // //         } else if (date.toDateString() === tomorrow.toDateString()) {
// // // //             return 'Tomorrow';
// // // //         } else {
// // // //             return date.toLocaleDateString('en-US', {
// // // //                 weekday: 'short',
// // // //                 month: 'short',
// // // //                 day: 'numeric'
// // // //             });
// // // //         }
// // // //     }, []);

// // // //     const formatTime = useCallback((timeString: string) => {
// // // //         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// // // //             hour: 'numeric',
// // // //             minute: '2-digit',
// // // //             hour12: true
// // // //         });
// // // //     }, []);

// // // //     // Event statistics with time filter applied
// // // //     const eventStats = useMemo(() => ({
// // // //         total: filteredEvents.length,
// // // //         upcoming: filteredEvents.filter(e => {
// // // //             const eventDate = new Date(`${e.date}T${e.startTime}`);
// // // //             return eventDate > new Date();
// // // //         }).length,
// // // //         today: filteredEvents.filter(
// // // //             e => e.date === formatDateForComparison(new Date())
// // // //         ).length,
// // // //         completed: filteredEvents.filter(e => getEventStatus(e) === 'completed').length
// // // //     }), [filteredEvents, getEventStatus]);

// // // //     // Handlers
// // // //     const handleDeleteEvent = async (eventId: string) => {
// // // //         if (!window.confirm('Are you sure you want to delete this event?')) return;

// // // //         setDeletingId(eventId);
// // // //         try {
// // // //             await deleleData(`events/${userInfo?.uid}/${eventId}`);
// // // //             setEvents(events.filter(event => event.id !== eventId));
// // // //             message.success('Event deleted successfully');
// // // //         } catch (error) {
// // // //             console.error("Delete error:", error);
// // // //             message.error('Failed to delete event');
// // // //         } finally {
// // // //             setDeletingId(null);
// // // //         }
// // // //     };

// // // //     const handleViewEvent = (eventId: string) => {
// // // //         router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
// // // //     };

// // // //     const handleCreateEvent = () => {
// // // //         router.push(`/realstate/${userInfo?.uid}/events/addevent`);
// // // //     };

// // // //     if (loading) {
// // // //         return <Loader />;
// // // //     }

// // // //     const calendarDays = getDaysInMonth(currentMonth);

// // // //     return (
// // // //         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
// // // //             <Header userData={userInfo} />

// // // //             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // // //                 {/* Header Section */}
// // // //                 <div className="mb-8">
// // // //                     <div className="flex-1">
// // // //                         <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
// // // //                             <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
// // // //                             <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Calendar Events</span>
// // // //                             <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
// // // //                         </div>

// // // //                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // // //                             <div>
// // // //                                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
// // // //                                     Event {" "}
// // // //                                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
// // // //                                         Calendar
// // // //                                     </span>
// // // //                                 </h1>
// // // //                                 <p className="text-gray-600 mt-2 max-w-xl">
// // // //                                     View and manage all your property viewings, client meetings, and appointments
// // // //                                 </p>
// // // //                             </div>
// // // //                             <div className="flex items-center gap-3">
// // // //                                 <Button
// // // //                                     onClick={handleCreateEvent}
// // // //                                     variant="theme"
// // // //                                     icon={<Plus className="w-4 h-4" />}
// // // //                                     size="md"
// // // //                                 >
// // // //                                     Add Event
// // // //                                 </Button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Stats Overview */}
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
// // // //                     {[
// // // //                         { title: 'Total Events', value: eventStats.total, icon: <Calendar className="w-5 h-5 text-purple-600" /> },
// // // //                         { title: 'Upcoming', value: eventStats.upcoming, icon: <TrendingUp className="w-5 h-5 text-blue-600" /> },
// // // //                         { title: 'Today', value: eventStats.today, icon: <Clock className="w-5 h-5 text-green-600" /> },
// // // //                         { title: 'Completed', value: eventStats.completed, icon: <CheckCircle className="w-5 h-5 text-amber-600" /> }
// // // //                     ].map((stat, idx) => (
// // // //                         <div key={idx} className="relative group">
// // // //                             <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
// // // //                                 <div className="absolute -top-3 left-4">
// // // //                                     <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
// // // //                                         {stat.icon}
// // // //                                     </div>
// // // //                                 </div>
// // // //                                 <div className="-mt-1">
// // // //                                     <div className="text-right">
// // // //                                         <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
// // // //                                         <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>

// // // //                 {/* Calendar and Events Section */}
// // // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //                     {/* Calendar Column */}
// // // //                     <div className="lg:col-span-2">
// // // //                         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
// // // //                             {/* Calendar Header */}
// // // //                             <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
// // // //                                 <div className="flex items-center justify-between">
// // // //                                     <div className="flex items-center gap-2">
// // // //                                         <CalendarDays className="w-5 h-5 text-purple-600" />
// // // //                                         <h2 className="text-lg font-semibold text-gray-900">
// // // //                                             {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
// // // //                                         </h2>
// // // //                                     </div>
// // // //                                     <div className="flex items-center gap-2">
// // // //                                         <Button
// // // //                                             onClick={goToToday}
// // // //                                             variant="secondary"
// // // //                                             size="sm"
// // // //                                             className="px-3 py-1.5 text-sm"
// // // //                                         >
// // // //                                             Today
// // // //                                         </Button>
// // // //                                         <button
// // // //                                             onClick={goToPreviousMonth}
// // // //                                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// // // //                                         >
// // // //                                             <ChevronLeft className="w-5 h-5 text-gray-600" />
// // // //                                         </button>
// // // //                                         <button
// // // //                                             onClick={goToNextMonth}
// // // //                                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// // // //                                         >
// // // //                                             <ChevronRight className="w-5 h-5 text-gray-600" />
// // // //                                         </button>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>

// // // //                             {/* Week Days Header */}
// // // //                             <div className="grid grid-cols-7 gap-px bg-gray-200">
// // // //                                 {weekDays.map((day, idx) => (
// // // //                                     <div key={idx} className="bg-gray-50 py-3 text-center">
// // // //                                         <span className="text-sm font-medium text-gray-600">{day}</span>
// // // //                                     </div>
// // // //                                 ))}
// // // //                             </div>

// // // //                             {/* Calendar Grid */}
// // // //                             <div className="grid grid-cols-7 gap-px bg-gray-200">
// // // //                                 {calendarDays.map((date, idx) => {
// // // //                                     const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
// // // //                                     const isToday = date && date.toDateString() === new Date().toDateString();
// // // //                                     const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
// // // //                                     const dayEvents = date ? getEventsForDate(date) : [];
// // // //                                     const hasEvents = dayEvents.length > 0;

// // // //                                     return (
// // // //                                         <div
// // // //                                             key={idx}
// // // //                                             onClick={() => date && setSelectedDate(date)}
// // // //                                             className={`
// // // //                                                 min-h-[100px] bg-white p-2 transition-all cursor-pointer hover:bg-purple-50/50
// // // //                                                 ${!isCurrentMonth && 'bg-gray-50/80'}
// // // //                                                 ${isSelected && 'ring-2 ring-purple-500 ring-inset'}
// // // //                                             `}
// // // //                                         >
// // // //                                             <div className="flex justify-between items-start">
// // // //                                                 <span className={`
// // // //                                                     text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full
// // // //                                                     ${isToday ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : ''}
// // // //                                                     ${!isToday && isCurrentMonth ? 'text-gray-700' : ''}
// // // //                                                     ${!isCurrentMonth ? 'text-gray-400' : ''}
// // // //                                                 `}>
// // // //                                                     {date ? date.getDate() : ''}
// // // //                                                 </span>
// // // //                                                 {hasEvents && (
// // // //                                                     <div className="flex gap-0.5">
// // // //                                                         {dayEvents.slice(0, 3).map((_, i) => (
// // // //                                                             <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
// // // //                                                         ))}
// // // //                                                     </div>
// // // //                                                 )}
// // // //                                             </div>
// // // //                                             <div className="mt-1 space-y-1">
// // // //                                                 {dayEvents.slice(0, 2).map((event) => {
// // // //                                                     const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
// // // //                                                     return (
// // // //                                                         <div
// // // //                                                             key={event.id}
// // // //                                                             onClick={(e) => {
// // // //                                                                 e.stopPropagation();
// // // //                                                                 handleViewEvent(event.id);
// // // //                                                             }}
// // // //                                                             className="text-xs p-1 rounded-md truncate bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
// // // //                                                             title={event.title}
// // // //                                                         >
// // // //                                                             {event.title.length > 12 ? event.title.slice(0, 10) + '...' : event.title}
// // // //                                                         </div>
// // // //                                                     );
// // // //                                                 })}
// // // //                                                 {dayEvents.length > 2 && (
// // // //                                                     <div className="text-xs text-gray-500 pl-1">
// // // //                                                         +{dayEvents.length - 2} more
// // // //                                                     </div>
// // // //                                                 )}
// // // //                                             </div>
// // // //                                         </div>
// // // //                                     );
// // // //                                 })}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Events List Column */}
// // // //                     <div className="lg:col-span-1">
// // // //                         <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
// // // //                             {/* Today Header with Dropdown Filter */}
// // // //                             <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
// // // //                                 <div className="flex items-center justify-between mb-3">
// // // //                                     <div className="flex items-center gap-2">
// // // //                                         <Clock className="w-5 h-5 text-purple-600" />
// // // //                                         <h2 className="text-lg font-semibold text-gray-900">
// // // //                                             {selectedDate ? formatDate(selectedDate.toISOString().split('T')[0]) : 'No Date Selected'}
// // // //                                         </h2>
// // // //                                     </div>
// // // //                                     <Button
// // // //                                         onClick={handleCreateEvent}
// // // //                                         variant="theme"
// // // //                                         size="sm"
// // // //                                         icon={<Plus className="w-4 h-4" />}
// // // //                                         className="px-3 py-1.5 text-sm"
// // // //                                     >
// // // //                                         Add
// // // //                                     </Button>
// // // //                                 </div>
// // // //                                 {selectedDate && (
// // // //                                     <p className="text-sm text-gray-500 mb-3">
// // // //                                         {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
// // // //                                     </p>
// // // //                                 )}

// // // //                                 {/* DROPDOWN FILTER */}
// // // //                                 <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
// // // //                                     <span className="text-xs text-gray-500">View:</span>
// // // //                                     <div className="relative">
// // // //                                         <button
// // // //                                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // // //                                             className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5
// // // //                                                 ${isDropdownOpen
// // // //                                                     ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25'
// // // //                                                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// // // //                                                 }
// // // //                                             `}
// // // //                                         >
// // // //                                             {timeFilterConfig[timeFilter].icon}
// // // //                                             {timeFilterConfig[timeFilter].label}
// // // //                                             <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
// // // //                                         </button>

// // // //                                         {isDropdownOpen && (
// // // //                                             <>
// // // //                                                 <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
// // // //                                                 <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
// // // //                                                     {Object.entries(timeFilterConfig).map(([key, config]) => {
// // // //                                                         const isActive = timeFilter === key;
// // // //                                                         return (
// // // //                                                             <button
// // // //                                                                 key={key}
// // // //                                                                 onClick={() => {
// // // //                                                                     setTimeFilter(key as TimeFilter);
// // // //                                                                     if (key === 'today') {
// // // //                                                                         setCurrentMonth(new Date());
// // // //                                                                         setSelectedDate(new Date());
// // // //                                                                     }
// // // //                                                                     setIsDropdownOpen(false);
// // // //                                                                 }}
// // // //                                                                 className={`w-full px-3 py-2 text-xs font-medium transition-all flex items-center gap-2 text-left
// // // //                                                                     ${isActive
// // // //                                                                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
// // // //                                                                         : 'text-gray-700 hover:bg-gray-50'
// // // //                                                                     }
// // // //                                                                 `}
// // // //                                                             >
// // // //                                                                 {config.icon}
// // // //                                                                 {config.label}
// // // //                                                                 {isActive && (
// // // //                                                                     <CheckCircle className="w-3 h-3 ml-auto" />
// // // //                                                                 )}
// // // //                                                             </button>
// // // //                                                         );
// // // //                                                     })}
// // // //                                                     <div className="border-t border-gray-100">
// // // //                                                         <button
// // // //                                                             onClick={() => {
// // // //                                                                 setSearchTerm('');
// // // //                                                                 setFilterType('all');
// // // //                                                                 setTimeFilter('all');
// // // //                                                                 setIsDropdownOpen(false);
// // // //                                                             }}
// // // //                                                             className="w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left flex items-center gap-2"
// // // //                                                         >
// // // //                                                             <X className="w-3 h-3" />
// // // //                                                             Clear All Filters
// // // //                                                         </button>
// // // //                                                     </div>
// // // //                                                 </div>
// // // //                                             </>
// // // //                                         )}
// // // //                                     </div>

// // // //                                     <button
// // // //                                         onClick={() => setShowFilters(!showFilters)}
// // // //                                         className={`px-2 py-0.5 rounded-full text-xs transition-all flex items-center gap-1
// // // //                                             ${showFilters
// // // //                                                 ? 'bg-purple-600 text-white'
// // // //                                                 : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
// // // //                                             }
// // // //                                         `}
// // // //                                     >
// // // //                                         <Filter className="w-3 h-3" />
// // // //                                         Filters
// // // //                                         <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
// // // //                                     </button>
// // // //                                 </div>

// // // //                                 {/* Filter count badge */}
// // // //                                 <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-gray-500">
// // // //                                     <span className="font-medium">Showing:</span>
// // // //                                     <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
// // // //                                         {filteredEvents.length} events
// // // //                                     </span>
// // // //                                     {timeFilter !== 'all' && (
// // // //                                         <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
// // // //                                             {timeFilterConfig[timeFilter].label}
// // // //                                         </span>
// // // //                                     )}
// // // //                                     {filterType !== 'all' && (
// // // //                                         <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
// // // //                                             {eventTypeConfig[filterType as keyof typeof eventTypeConfig]?.label || filterType}
// // // //                                         </span>
// // // //                                     )}
// // // //                                 </div>

// // // //                                 {/* Expanded Filters */}
// // // //                                 {showFilters && (
// // // //                                     <div className="border-t border-gray-200 pt-3 mt-2 space-y-3">
// // // //                                         {/* Search */}
// // // //                                         <div className="relative">
// // // //                                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
// // // //                                             <input
// // // //                                                 type="text"
// // // //                                                 placeholder="Search events or address..."
// // // //                                                 value={searchTerm}
// // // //                                                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //                                                 className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-xs"
// // // //                                             />
// // // //                                         </div>

// // // //                                         {/* Event Type Filter */}
// // // //                                         <div className="flex flex-wrap gap-1.5">
// // // //                                             <span className="text-xs text-gray-500 flex items-center mr-1">Type:</span>
// // // //                                             <button
// // // //                                                 onClick={() => setFilterType('all')}
// // // //                                                 className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors
// // // //                                                     ${filterType === 'all'
// // // //                                                         ? 'bg-purple-600 text-white'
// // // //                                                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// // // //                                                     }
// // // //                                                 `}
// // // //                                             >
// // // //                                                 All
// // // //                                             </button>
// // // //                                             {Object.entries(eventTypeConfig).map(([key, config]) => (
// // // //                                                 <button
// // // //                                                     key={key}
// // // //                                                     onClick={() => setFilterType(key)}
// // // //                                                     className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1
// // // //                                                         ${filterType === key
// // // //                                                             ? 'bg-purple-600 text-white'
// // // //                                                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// // // //                                                         }
// // // //                                                     `}
// // // //                                                 >
// // // //                                                     {config.icon}
// // // //                                                     {config.label}
// // // //                                                 </button>
// // // //                                             ))}
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>

// // // //                             {/* Events List */}
// // // //                             <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px]">
// // // //                                 {selectedDateEvents.length > 0 ? (
// // // //                                     selectedDateEvents.map((event) => {
// // // //                                         const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
// // // //                                         const eventStatus = getEventStatus(event);
// // // //                                         const status = statusConfig[eventStatus];

// // // //                                         return (
// // // //                                             <div
// // // //                                                 key={event.id}
// // // //                                                 onClick={() => handleViewEvent(event.id)}
// // // //                                                 className="group bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-purple-200"
// // // //                                             >
// // // //                                                 <div className="flex items-start justify-between">
// // // //                                                     <div className="flex items-center gap-2 flex-1">
// // // //                                                         <div className={`p-1.5 rounded-lg ${typeConfig.bg}`}>
// // // //                                                             <div className={typeConfig.color}>{typeConfig.icon}</div>
// // // //                                                         </div>
// // // //                                                         <div className="flex-1">
// // // //                                                             <h3 className="font-medium text-gray-900 text-sm">
// // // //                                                                 {event.title}
// // // //                                                             </h3>
// // // //                                                             <div className="flex items-center gap-2 mt-1">
// // // //                                                                 <Clock className="w-3 h-3 text-gray-400" />
// // // //                                                                 <span className="text-xs text-gray-600">
// // // //                                                                     {formatTime(event.startTime)} - {formatTime(event.endTime)}
// // // //                                                                 </span>
// // // //                                                             </div>
// // // //                                                             {event.address && (
// // // //                                                                 <div className="flex items-center gap-2 mt-1">
// // // //                                                                     <MapPin className="w-3 h-3 text-gray-400" />
// // // //                                                                     <span className="text-xs text-gray-500 truncate">
// // // //                                                                         {event.address}
// // // //                                                                     </span>
// // // //                                                                 </div>
// // // //                                                             )}
// // // //                                                         </div>
// // // //                                                     </div>
// // // //                                                     <div className="flex items-center gap-1">
// // // //                                                         <span className={`text-xs px-1.5 py-0.5 rounded-full ${status.bg} ${status.color}`}>
// // // //                                                             {status.label}
// // // //                                                         </span>
// // // //                                                         <button
// // // //                                                             onClick={(e) => {
// // // //                                                                 e.stopPropagation();
// // // //                                                                 handleDeleteEvent(event.id);
// // // //                                                             }}
// // // //                                                             className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
// // // //                                                             disabled={deletingId === event.id}
// // // //                                                         >
// // // //                                                             <Trash2 className={`h-3.5 w-3.5 text-red-500 ${deletingId === event.id ? 'opacity-50' : ''}`} />
// // // //                                                         </button>
// // // //                                                     </div>
// // // //                                                 </div>
// // // //                                             </div>
// // // //                                         );
// // // //                                     })
// // // //                                 ) : (
// // // //                                     <div className="text-center pt-12">
// // // //                                         <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
// // // //                                         <p className="text-gray-500">No events for this day</p>
// // // //                                             <div className="pl-[34.5%]">
// // // //                                             <Button
// // // //                                                 label="Add Event"
// // // //                                                 onClick={handleCreateEvent}
// // // //                                                 variant="theme2"
// // // //                                                 size="sm"
// // // //                                                 className="mt-4"
// // // //                                                 icon={<Plus className="w-4 h-4" />}
// // // //                                             >
// // // //                                             </Button>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>

// // // //                             {/* Upcoming Events Summary - IMPROVED */}
// // // //                             {filteredEvents.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date()).length > 0 && (
// // // //                                 <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
// // // //                                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
// // // //                                         <TrendingUp className="w-4 h-4 text-purple-600" />
// // // //                                         Upcoming Events
// // // //                                         <span className="ml-auto text-xs text-gray-400">
// // // //                                             {filteredEvents.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date()).length} upcoming
// // // //                                         </span>
// // // //                                     </h3>
// // // //                                     <div className="space-y-2">
// // // //                                         {filteredEvents
// // // //                                             .filter(e => new Date(`${e.date}T${e.startTime}`) > new Date())
// // // //                                             .sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime())
// // // //                                             .slice(0, 5)
// // // //                                             .map(event => {
// // // //                                                 const isToday = formatDate(event.date) === 'Today';
// // // //                                                 const isTomorrow = formatDate(event.date) === 'Tomorrow';
// // // //                                                 return (
// // // //                                                     <div
// // // //                                                         key={event.id}
// // // //                                                         className={`flex items-center gap-2 text-xs p-2 rounded-lg transition-colors
// // // //                                                             ${isToday ? 'bg-purple-50 border border-purple-100' : ''}
// // // //                                                             ${isTomorrow ? 'bg-blue-50 border border-blue-100' : ''}
// // // //                                                             hover:bg-gray-50 cursor-pointer
// // // //                                                         `}
// // // //                                                         onClick={() => handleViewEvent(event.id)}
// // // //                                                     >
// // // //                                                         <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-purple-500' : isTomorrow ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
// // // //                                                         <span className={`font-medium ${isToday ? 'text-purple-700' : isTomorrow ? 'text-blue-700' : 'text-gray-700'}`}>
// // // //                                                             {formatDate(event.date)}
// // // //                                                         </span>
// // // //                                                         <span className="text-gray-300">•</span>
// // // //                                                         <span className="text-gray-600 truncate flex-1">{event.title}</span>
// // // //                                                         <span className="text-gray-400 text-[10px]">{formatTime(event.startTime)}</span>
// // // //                                                     </div>
// // // //                                                 );
// // // //                                             })
// // // //                                         }
// // // //                                     </div>
// // // //                                     {filteredEvents.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date()).length > 5 && (
// // // //                                         <button
// // // //                                             onClick={() => setTimeFilter('all')}
// // // //                                             className="mt-2 text-xs text-purple-600 hover:text-purple-700 font-medium"
// // // //                                         >
// // // //                                             View all {filteredEvents.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date()).length} upcoming events →
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 <DraggableButton onClick={handleCreateEvent} />
// // // //             </main>
// // // //         </div>
// // // //     );
// // // // }



// // // 'use client';

// // // import { useEffect, useState, useMemo, useCallback } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { message } from "antd";
// // // import {
// // //     Calendar, Clock, MapPin, Users, Home, DollarSign,
// // //     ArrowLeft, Plus, Filter, Search, ChevronRight,
// // //     PhoneCall, Mail, MessageSquare, CheckCircle,
// // //     XCircle, Building, Key, Target, Zap,
// // //     Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
// // //     ChevronDown, MoreVertical, Edit, Trash2,
// // //     User, Sparkles, Crown, Bed, Bath,
// // //     Check, X, AlertCircle, ExternalLink,
// // //     Layers, HomeIcon, Briefcase, ChevronLeft,
// // //     CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
// // //     ListFilter, Clock8, LayoutGrid, List,
// // //     ArrowUpRight, ArrowDownRight, Circle,
// // //     GripVertical, Menu, Sparkle, Gem,
// // //     BarChart3, Activity, CalendarClock
// // // } from "lucide-react";
// // // import Header from "@/components/Header";
// // // import Button from "@/components/Button";
// // // import Loader from "@/components/Loader";
// // // import DraggableButton from "@/components/DraggableButton";
// // // import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// // // interface UserInfo {
// // //     uid: string;
// // //     email?: string;
// // //     name?: string;
// // //     [key: string]: any;
// // // }

// // // interface ClientData {
// // //     id: string;
// // //     firstName: string;
// // //     lastName: string;
// // //     email: string;
// // //     phone: string;
// // //     propertyType?: string;
// // //     preferredLocations?: string;
// // //     ownerUid?: string;
// // //     agentUid?: string;
// // // }

// // // interface OwnerData {
// // //     id: string;
// // //     firstName: string;
// // //     lastName: string;
// // //     email: string;
// // //     phone: string;
// // //     propertyAddress?: string;
// // //     ownerUid?: string;
// // //     agentUid?: string;
// // // }

// // // interface EventData {
// // //     id: string;
// // //     title: string;
// // //     description: string;
// // //     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
// // //     clientIds: string[];
// // //     address: string;
// // //     date: string;
// // //     startTime: string;
// // //     endTime: string;
// // //     notes?: string;
// // //     reminderTime: string;
// // //     agentUid: string;
// // //     agentName: string;
// // //     reminderSent: boolean;
// // //     createdAt: string;
// // // }

// // // // Event type configuration
// // // const eventTypeConfig = {
// // //     'property-viewing': {
// // //         label: 'Property Viewing',
// // //         icon: Eye,
// // //         color: 'text-blue-600',
// // //         bg: 'bg-blue-50',
// // //         border: 'border-blue-200',
// // //         gradient: 'from-blue-500 to-blue-600',
// // //         emoji: '🏠',
// // //         lightBg: 'bg-blue-50/80'
// // //     },
// // //     'client-meeting': {
// // //         label: 'Client Meeting',
// // //         icon: Users,
// // //         color: 'text-purple-600',
// // //         bg: 'bg-purple-50',
// // //         border: 'border-purple-200',
// // //         gradient: 'from-purple-500 to-purple-600',
// // //         emoji: '🤝',
// // //         lightBg: 'bg-purple-50/80'
// // //     },
// // //     'closing-session': {
// // //         label: 'Closing Session',
// // //         icon: Key,
// // //         color: 'text-emerald-600',
// // //         bg: 'bg-emerald-50',
// // //         border: 'border-emerald-200',
// // //         gradient: 'from-emerald-500 to-emerald-600',
// // //         emoji: '🔑',
// // //         lightBg: 'bg-emerald-50/80'
// // //     },
// // //     'property-inspection': {
// // //         label: 'Property Inspection',
// // //         icon: Target,
// // //         color: 'text-amber-600',
// // //         bg: 'bg-amber-50',
// // //         border: 'border-amber-200',
// // //         gradient: 'from-amber-500 to-amber-600',
// // //         emoji: '🔍',
// // //         lightBg: 'bg-amber-50/80'
// // //     },
// // //     'follow-up-call': {
// // //         label: 'Follow-up Call',
// // //         icon: PhoneCall,
// // //         color: 'text-indigo-600',
// // //         bg: 'bg-indigo-50',
// // //         border: 'border-indigo-200',
// // //         gradient: 'from-indigo-500 to-indigo-600',
// // //         emoji: '📞',
// // //         lightBg: 'bg-indigo-50/80'
// // //     }
// // // };

// // // const statusConfig = {
// // //     'scheduled': {
// // //         label: 'Scheduled',
// // //         color: 'text-blue-700',
// // //         bg: 'bg-blue-50',
// // //         dot: 'bg-blue-500',
// // //         border: 'border-blue-200',
// // //         lightBg: 'bg-blue-50/60'
// // //     },
// // //     'in-progress': {
// // //         label: 'In Progress',
// // //         color: 'text-amber-700',
// // //         bg: 'bg-amber-50',
// // //         dot: 'bg-amber-500',
// // //         border: 'border-amber-200',
// // //         lightBg: 'bg-amber-50/60'
// // //     },
// // //     'completed': {
// // //         label: 'Completed',
// // //         color: 'text-emerald-700',
// // //         bg: 'bg-emerald-50',
// // //         dot: 'bg-emerald-500',
// // //         border: 'border-emerald-200',
// // //         lightBg: 'bg-emerald-50/60'
// // //     }
// // // };

// // // type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month';

// // // export default function CalendarEventsPage() {
// // //     const router = useRouter();
// // //     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
// // //     const [events, setEvents] = useState<EventData[]>([]);
// // //     const [clients, setClients] = useState<ClientData[]>([]);
// // //     const [owners, setOwners] = useState<OwnerData[]>([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [currentMonth, setCurrentMonth] = useState(new Date());
// // //     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
// // //     const [deletingId, setDeletingId] = useState<string | null>(null);
// // //     const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
// // //     const [searchTerm, setSearchTerm] = useState('');
// // //     const [filterType, setFilterType] = useState<string>('all');

// // //     // Get event status
// // //     const getEventStatus = useCallback((event: EventData) => {
// // //         const now = new Date();
// // //         const eventDate = new Date(`${event.date}T${event.startTime}`);
// // //         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

// // //         if (eventEndDate < now) return 'completed';
// // //         if (eventDate <= now && eventEndDate >= now) return 'in-progress';
// // //         return 'scheduled';
// // //     }, []);

// // //     // Fetch clients and owners
// // //     const fetchClients = useCallback(async (uid: string) => {
// // //         try {
// // //             const clientsData: any = await getData(`clients/${uid}`);
// // //             if (clientsData) {
// // //                 const clientsArray = Object.entries(clientsData)
// // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // //                     .filter((client) => client.agentUid === uid || client.ownerUid === uid);
// // //                 setClients(clientsArray);
// // //             }
// // //         } catch (error) {
// // //             console.error('Error fetching clients:', error);
// // //         }
// // //     }, []);

// // //     const fetchOwners = useCallback(async (uid: string) => {
// // //         try {
// // //             const ownersData: any = await getData(`owners/${uid}`);
// // //             if (ownersData) {
// // //                 const ownersArray = Object.entries(ownersData)
// // //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// // //                     .filter((owner) => owner.agentUid === uid);
// // //                 setOwners(ownersArray);
// // //             }
// // //         } catch (error) {
// // //             console.error('Error fetching owners:', error);
// // //         }
// // //     }, []);

// // //     // Load all data
// // //     useEffect(() => {
// // //         const checkAuth = async () => {
// // //             try {
// // //                 const user: any = await checkUserSession();
// // //                 if (!user) {
// // //                     message.error('Please Login First');
// // //                     router.replace('/login');
// // //                     return;
// // //                 }

// // //                 const storedUser = localStorage.getItem('userInfo');
// // //                 let userData;

// // //                 if (storedUser) {
// // //                     userData = JSON.parse(storedUser);
// // //                 } else {
// // //                     userData = await getData(`users/${user.uid}`);
// // //                     if (userData) {
// // //                         localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
// // //                     }
// // //                 }

// // //                 if (userData) {
// // //                     setUserInfo({ uid: user.uid, ...userData });
// // //                     await Promise.all([
// // //                         fetchEvents(user.uid),
// // //                         fetchClients(user.uid),
// // //                         fetchOwners(user.uid)
// // //                     ]);
// // //                 }
// // //             } catch (err) {
// // //                 console.error('Authentication error:', err);
// // //                 message.error('Error occurred during authentication');
// // //                 router.replace('/login');
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         checkAuth();
// // //     }, [router, fetchClients, fetchOwners]);

// // //     const fetchEvents = async (uid: string) => {
// // //         try {
// // //             const eventsData: any = await getData(`events/${uid}`);
// // //             if (eventsData) {
// // //                 let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
// // //                     id,
// // //                     ...value
// // //                 }));
// // //                 eventsArray = eventsArray.reverse();
// // //                 setEvents(eventsArray);
// // //             } else {
// // //                 setEvents([]);
// // //             }
// // //         } catch (error) {
// // //             console.error('Error fetching events:', error);
// // //             message.error('Failed to fetch events');
// // //             setEvents([]);
// // //         }
// // //     };

// // //     // Calendar helpers
// // //     const getDaysInMonth = (date: Date) => {
// // //         const year = date.getFullYear();
// // //         const month = date.getMonth();
// // //         const firstDay = new Date(year, month, 1);
// // //         const lastDay = new Date(year, month + 1, 0);
// // //         const daysInMonth = lastDay.getDate();
// // //         const startingDayOfWeek = firstDay.getDay();

// // //         const days: (Date | null)[] = [];
// // //         for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
// // //         for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
// // //         return days;
// // //     };

// // //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// // //     const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// // //     const goToPreviousMonth = () => {
// // //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// // //     };

// // //     const goToNextMonth = () => {
// // //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// // //     };

// // //     const goToToday = () => {
// // //         setCurrentMonth(new Date());
// // //         setSelectedDate(new Date());
// // //         setTimeFilter('today');
// // //     };

// // //     const formatDateForComparison = (date: Date) => {
// // //         const year = date.getFullYear();
// // //         const month = String(date.getMonth() + 1).padStart(2, '0');
// // //         const day = String(date.getDate()).padStart(2, '0');
// // //         return `${year}-${month}-${day}`;
// // //     };

// // //     const getEventsForDate = useCallback((date: Date) => {
// // //         if (!date) return [];
// // //         const dateString = formatDateForComparison(date);
// // //         return events.filter(event => event.date === dateString);
// // //     }, [events]);

// // //     // Format helpers
// // //     const formatDate = useCallback((dateString: string) => {
// // //         const date = new Date(dateString);
// // //         const today = new Date();
// // //         const tomorrow = new Date(today);
// // //         tomorrow.setDate(tomorrow.getDate() + 1);

// // //         if (date.toDateString() === today.toDateString()) return 'Today';
// // //         if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
// // //         return date.toLocaleDateString('en-US', {
// // //             weekday: 'short',
// // //             month: 'short',
// // //             day: 'numeric'
// // //         });
// // //     }, []);

// // //     const formatTime = useCallback((timeString: string) => {
// // //         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// // //             hour: 'numeric',
// // //             minute: '2-digit',
// // //             hour12: true
// // //         });
// // //     }, []);

// // //     // Filter events by search and type
// // //     const filteredEvents = useMemo(() => {
// // //         let filtered = events;

// // //         if (searchTerm) {
// // //             filtered = filtered.filter(event =>
// // //                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //                 event.address?.toLowerCase().includes(searchTerm.toLowerCase())
// // //             );
// // //         }

// // //         if (filterType !== 'all') {
// // //             filtered = filtered.filter(event => event.eventType === filterType);
// // //         }

// // //         return filtered;
// // //     }, [events, searchTerm, filterType]);

// // //     // Get date range based on filter
// // //     const getDateRange = useCallback((filter: TimeFilter): { start: Date; end: Date } => {
// // //         const now = new Date();
// // //         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // //         const tomorrow = new Date(today);
// // //         tomorrow.setDate(tomorrow.getDate() + 1);

// // //         switch (filter) {
// // //             case 'today':
// // //                 return {
// // //                     start: today,
// // //                     end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
// // //                 };
// // //             case 'tomorrow':
// // //                 return {
// // //                     start: tomorrow,
// // //                     end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1)
// // //                 };
// // //             case 'this-week': {
// // //                 const start = new Date(today);
// // //                 start.setDate(today.getDate() - today.getDay());
// // //                 const end = new Date(start);
// // //                 end.setDate(start.getDate() + 6);
// // //                 end.setHours(23, 59, 59, 999);
// // //                 return { start, end };
// // //             }
// // //             case 'this-month': {
// // //                 const start = new Date(today.getFullYear(), today.getMonth(), 1);
// // //                 const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// // //                 end.setHours(23, 59, 59, 999);
// // //                 return { start, end };
// // //             }
// // //             default:
// // //                 return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
// // //         }
// // //     }, []);

// // //     // Get upcoming events based on time filter
// // //     const upcomingEvents = useMemo(() => {
// // //         const range = getDateRange(timeFilter);
// // //         return filteredEvents
// // //             .filter(event => {
// // //                 const status = getEventStatus(event);
// // //                 if (status === 'completed') return false;
// // //                 const eventDate = new Date(event.date);
// // //                 return eventDate >= range.start && eventDate <= range.end;
// // //             })
// // //             .sort((a, b) => {
// // //                 const dateA = new Date(`${a.date}T${a.startTime}`);
// // //                 const dateB = new Date(`${b.date}T${b.startTime}`);
// // //                 return dateA.getTime() - dateB.getTime();
// // //             });
// // //     }, [filteredEvents, timeFilter, getDateRange, getEventStatus]);

// // //     // Get completed events
// // //     const completedEvents = useMemo(() => {
// // //         return filteredEvents
// // //             .filter(event => getEventStatus(event) === 'completed')
// // //             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// // //     }, [filteredEvents, getEventStatus]);

// // //     // Stats
// // //     const eventStats = useMemo(() => ({
// // //         total: events.length,
// // //         upcoming: filteredEvents.filter(e => getEventStatus(e) !== 'completed').length,
// // //         completed: completedEvents.length,
// // //         today: filteredEvents.filter(e => e.date === formatDateForComparison(new Date())).length
// // //     }), [events, filteredEvents, completedEvents, getEventStatus]);

// // //     // Handlers
// // //     const handleDeleteEvent = async (eventId: string) => {
// // //         if (!window.confirm('Are you sure you want to delete this event?')) return;
// // //         setDeletingId(eventId);
// // //         try {
// // //             await deleleData(`events/${userInfo?.uid}/${eventId}`);
// // //             setEvents(events.filter(event => event.id !== eventId));
// // //             message.success('Event deleted successfully');
// // //         } catch (error) {
// // //             console.error("Delete error:", error);
// // //             message.error('Failed to delete event');
// // //         } finally {
// // //             setDeletingId(null);
// // //         }
// // //     };

// // //     const handleViewEvent = (eventId: string) => {
// // //         router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
// // //     };

// // //     const handleCreateEvent = () => {
// // //         router.push(`/realstate/${userInfo?.uid}/events/addevent`);
// // //     };

// // //     if (loading) {
// // //         return <Loader />;
// // //     }

// // //     const calendarDays = getDaysInMonth(currentMonth);

// // //     // Time filter config
// // //     const timeFilterConfig: Record<TimeFilter, { label: string; icon: any; color: string }> = {
// // //         'today': { label: 'Today', icon: Clock, color: 'emerald' },
// // //         'tomorrow': { label: 'Tomorrow', icon: CalendarPlus, color: 'blue' },
// // //         'this-week': { label: 'This Week', icon: CalendarRange, color: 'purple' },
// // //         'this-month': { label: 'This Month', icon: CalendarCheck, color: 'indigo' },
// // //     };

// // //     // Event Card Component - Grid Layout
// // //     const EventCard = ({ event }: { event: EventData }) => {
// // //         const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
// // //         const status = getEventStatus(event);
// // //         const statusConfigItem = statusConfig[status];
// // //         const Icon = typeConfig.icon;

// // //         return (
// // //             <div
// // //                 onClick={() => handleViewEvent(event.id)}
// // //                 className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
// // //             >
// // //                 {/* Top gradient bar */}
// // //                 <div className={`h-1.5 w-full bg-gradient-to-r ${typeConfig.gradient}`} />

// // //                 <div className="px-5 pt-2 pb-5">
// // //                     <div className="flex items-start justify-between">
// // //                         <div className="flex items-center gap-3">
// // //                             <div className={`p-2.5 rounded-xl ${typeConfig.bg} border ${typeConfig.border}`}>
// // //                                 <Icon className={`w-5 h-5 ${typeConfig.color}`} />
// // //                             </div>
// // //                             <div>
// // //                                 <h4 className="font-semibold text-slate-900 text-base line-clamp-1">
// // //                                     {event.title}
// // //                                 </h4>
// // //                                 <span className={`text-xs px-2.5 py-0.5 rounded-full ${statusConfigItem.bg} ${statusConfigItem.color} border ${statusConfigItem.border} flex items-center gap-1.5 inline-flex mt-1`}>
// // //                                     <span className={`w-1.5 h-1.5 rounded-full ${statusConfigItem.dot}`} />
// // //                                     {statusConfigItem.label}
// // //                                 </span>
// // //                             </div>
// // //                         </div>
// // //                         <button
// // //                             onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 handleDeleteEvent(event.id);
// // //                             }}
// // //                             className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-lg transition-all"
// // //                             disabled={deletingId === event.id}
// // //                         >
// // //                             <Trash2 className={`w-4 h-4 text-red-400 hover:text-red-600 ${deletingId === event.id ? 'opacity-50' : ''}`} />
// // //                         </button>
// // //                     </div>

// // //                     <div className="mt-4 space-y-2">
// // //                         <div className="flex items-center gap-3 text-sm text-slate-500">
// // //                             <div className="flex items-center gap-1.5">
// // //                                 <Clock className="w-4 h-4 text-slate-400" />
// // //                                 <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
// // //                             </div>
// // //                         </div>

// // //                         {event.address && (
// // //                             <div className="flex items-center gap-1.5 text-sm text-slate-500">
// // //                                 <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
// // //                                 <span className="truncate">{event.address}</span>
// // //                             </div>
// // //                         )}

// // //                         <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
// // //                             <span className="text-xs text-slate-400 flex items-center gap-1.5">
// // //                                 <Calendar className="w-3.5 h-3.5" />
// // //                                 {formatDate(event.date)}
// // //                             </span>
// // //                             <span className="text-xs text-slate-300">•</span>
// // //                             <span className="text-xs text-slate-400 flex items-center gap-1">
// // //                                 {typeConfig.emoji}
// // //                                 {typeConfig.label}
// // //                             </span>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
// // //             <Header userData={userInfo} />

// // //             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //                 {/* ===== HERO HEADER ===== */}
// // //                 <div className="relative mb-10">
// // //                     <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl" />
// // //                     <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />

// // //                     <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
// // //                         <div>
// // //                             <div className="flex items-center gap-3 mb-3">
// // //                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
// // //                                     <CalendarDays className="w-5 h-5 text-white" />
// // //                                 </div>
// // //                                 <span className="text-xs font-semibold text-purple-600 uppercase tracking-[0.15em] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
// // //                                     Calendar
// // //                                 </span>
// // //                                 <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.1em]">
// // //                                     • {events.length} events
// // //                                 </span>
// // //                             </div>
// // //                             <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
// // //                                 Event <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Schedule</span>
// // //                             </h1>
// // //                             <p className="text-slate-500 mt-2 max-w-lg text-sm">
// // //                                 Manage property viewings, client meetings, and appointments in one elegant dashboard.
// // //                             </p>
// // //                         </div>
// // //                         <div className="flex items-center gap-3">
// // //                             <Button
// // //                                 onClick={handleCreateEvent}
// // //                                 variant="theme"
// // //                                 icon={<Plus className="w-4 h-4" />}
// // //                                 size="md"
// // //                                 className="shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
// // //                             >
// // //                                 New Event
// // //                             </Button>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* ===== STATS ===== */}
// // //                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //                     {[
// // //                         { title: 'Total Events', value: eventStats.total, icon: Calendar, color: 'purple' },
// // //                         { title: 'Upcoming', value: eventStats.upcoming, icon: TrendingUp, color: 'blue' },
// // //                         { title: 'Today', value: eventStats.today, icon: Clock, color: 'emerald' },
// // //                         { title: 'Completed', value: eventStats.completed, icon: CheckCircle, color: 'amber' }
// // //                     ].map((stat, idx) => {
// // //                         const colorMap = {
// // //                             purple: 'from-purple-500/10 to-purple-600/5 border-purple-200/50 text-purple-600',
// // //                             blue: 'from-blue-500/10 to-blue-600/5 border-blue-200/50 text-blue-600',
// // //                             emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 text-emerald-600',
// // //                             amber: 'from-amber-500/10 to-amber-600/5 border-amber-200/50 text-amber-600'
// // //                         };
// // //                         const iconColorMap = {
// // //                             purple: 'bg-purple-100 text-purple-600',
// // //                             blue: 'bg-blue-100 text-blue-600',
// // //                             emerald: 'bg-emerald-100 text-emerald-600',
// // //                             amber: 'bg-amber-100 text-amber-600'
// // //                         };
// // //                         const Icon = stat.icon;
// // //                         return (
// // //                             <div key={idx} className={`group bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} rounded-2xl border p-5 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300`}>
// // //                                 <div className="flex items-center justify-between">
// // //                                     <div>
// // //                                         <p className="text-sm font-medium text-slate-600">{stat.title}</p>
// // //                                         <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
// // //                                     </div>
// // //                                     <div className={`p-3 rounded-xl ${iconColorMap[stat.color as keyof typeof iconColorMap]}`}>
// // //                                         <Icon className="w-5 h-5" />
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         );
// // //                     })}
// // //                 </div>

// // //                 {/* ===== FILTERS ===== */}
// // //                 <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 mb-8">
// // //                     <div className="flex flex-col sm:flex-row gap-4">
// // //                         <div className="flex-1 relative">
// // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="Search events by title or address..."
// // //                                 value={searchTerm}
// // //                                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm bg-slate-50"
// // //                             />
// // //                         </div>
// // //                         <div className="flex flex-wrap gap-2">
// // //                             <button
// // //                                 onClick={() => setFilterType('all')}
// // //                                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === 'all'
// // //                                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25'
// // //                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// // //                                     }`}
// // //                             >
// // //                                 All Types
// // //                             </button>
// // //                             {Object.entries(eventTypeConfig).map(([key, config]) => {
// // //                                 const Icon = config.icon;
// // //                                 return (
// // //                                     <button
// // //                                         key={key}
// // //                                         onClick={() => setFilterType(key)}
// // //                                         className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${filterType === key
// // //                                                 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25'
// // //                                                 : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// // //                                             }`}
// // //                                     >
// // //                                         <Icon className="w-3.5 h-3.5" />
// // //                                         {config.label}
// // //                                     </button>
// // //                                 );
// // //                             })}
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* ===== MAIN CONTENT ===== */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //                     {/* Left Column: Calendar */}
// // //                     <div className="lg:col-span-1">
// // //                         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden sticky top-6">
// // //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// // //                                 <div className="flex items-center justify-between">
// // //                                     <div className="flex items-center gap-2">
// // //                                         <span className="font-semibold text-slate-900">
// // //                                             {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
// // //                                         </span>
// // //                                     </div>
// // //                                     <div className="flex items-center gap-1">
// // //                                         <button
// // //                                             onClick={goToToday}
// // //                                             className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100"
// // //                                         >
// // //                                             Today
// // //                                         </button>
// // //                                         <button
// // //                                             onClick={goToPreviousMonth}
// // //                                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// // //                                         >
// // //                                             <ChevronLeft className="w-4 h-4 text-slate-600" />
// // //                                         </button>
// // //                                         <button
// // //                                             onClick={goToNextMonth}
// // //                                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// // //                                         >
// // //                                             <ChevronRight className="w-4 h-4 text-slate-600" />
// // //                                         </button>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>

// // //                             <div className="grid grid-cols-7 gap-px bg-slate-100">
// // //                                 {weekDays.map((day, idx) => (
// // //                                     <div key={idx} className="bg-slate-50/80 py-2 text-center">
// // //                                         <span className="text-xs font-medium text-slate-500">{day}</span>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>

// // //                             <div className="grid grid-cols-7 gap-px bg-slate-100">
// // //                                 {calendarDays.map((date, idx) => {
// // //                                     const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
// // //                                     const isToday = date && date.toDateString() === new Date().toDateString();
// // //                                     const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
// // //                                     const dayEvents = date ? getEventsForDate(date) : [];
// // //                                     const hasEvents = dayEvents.length > 0;

// // //                                     return (
// // //                                         <div
// // //                                             key={idx}
// // //                                             onClick={() => date && setSelectedDate(date)}
// // //                                             className={`
// // //                                                 min-h-[60px] bg-white p-1.5 transition-all cursor-pointer hover:bg-purple-50/50
// // //                                                 ${!isCurrentMonth && 'bg-slate-50/60'}
// // //                                                 ${isSelected && 'ring-2 ring-purple-500 ring-inset bg-purple-50/50'}
// // //                                                 ${isToday && !isSelected && 'bg-blue-50/30'}
// // //                                             `}
// // //                                         >
// // //                                             <div className="flex justify-between items-start">
// // //                                                 <span className={`
// // //                                                     text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full
// // //                                                     ${isToday ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm shadow-purple-500/25' : ''}
// // //                                                     ${!isToday && isCurrentMonth ? 'text-slate-700' : ''}
// // //                                                     ${!isCurrentMonth ? 'text-slate-400' : ''}
// // //                                                 `}>
// // //                                                     {date ? date.getDate() : ''}
// // //                                                 </span>
// // //                                                 {hasEvents && (
// // //                                                     <div className="flex gap-0.5">
// // //                                                         {dayEvents.slice(0, 2).map((_, i) => (
// // //                                                             <div key={i} className="w-1 h-1 rounded-full bg-purple-400"></div>
// // //                                                         ))}
// // //                                                     </div>
// // //                                                 )}
// // //                                             </div>
// // //                                             {hasEvents && (
// // //                                                 <div className="mt-0.5 space-y-0.5">
// // //                                                     {dayEvents.slice(0, 1).map((event) => (
// // //                                                         <div
// // //                                                             key={event.id}
// // //                                                             onClick={(e) => {
// // //                                                                 e.stopPropagation();
// // //                                                                 handleViewEvent(event.id);
// // //                                                             }}
// // //                                                             className="text-[8px] px-1 py-0.5 rounded truncate bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
// // //                                                         >
// // //                                                             {event.title.length > 8 ? event.title.slice(0, 6) + '…' : event.title}
// // //                                                         </div>
// // //                                                     ))}
// // //                                                 </div>
// // //                                             )}
// // //                                         </div>
// // //                                     );
// // //                                 })}
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Right Column: Events */}
// // //                     <div className="lg:col-span-2 space-y-8">
// // //                         {/* ===== SECTION 1: UPCOMING EVENTS WITH TABS ===== */}
// // //                         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
// // //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// // //                                 <div className="flex items-center justify-between flex-wrap gap-3">
// // //                                     <div className="flex items-center gap-3">
// // //                                         <div className="p-2 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100">
// // //                                             <TrendingUp className="w-5 h-5 text-purple-600" />
// // //                                         </div>
// // //                                         <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
// // //                                         <span className="text-sm text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
// // //                                             {upcomingEvents.length}
// // //                                         </span>
// // //                                     </div>
// // //                                 </div>

// // //                                 {/* Time Filter Tabs */}
// // //                                 <div className="flex flex-wrap gap-1.5 mt-4">
// // //                                     {Object.entries(timeFilterConfig).map(([key, config]) => {
// // //                                         const Icon = config.icon;
// // //                                         const isActive = timeFilter === key;
// // //                                         const colorMap = {
// // //                                             emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
// // //                                             blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
// // //                                             purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
// // //                                             indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/25'
// // //                                         };
// // //                                         return (
// // //                                             <button
// // //                                                 key={key}
// // //                                                 onClick={() => setTimeFilter(key as TimeFilter)}
// // //                                                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive
// // //                                                         ? `bg-gradient-to-r ${colorMap[config.color as keyof typeof colorMap]} text-white shadow-md`
// // //                                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// // //                                                     }`}
// // //                                             >
// // //                                                 <Icon className="w-4 h-4" />
// // //                                                 {config.label}
// // //                                             </button>
// // //                                         );
// // //                                     })}
// // //                                 </div>
// // //                             </div>

// // //                             <div className="p-6">
// // //                                 {upcomingEvents.length > 0 ? (
// // //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                                         {upcomingEvents.map(event => (
// // //                                             <EventCard key={event.id} event={event} />
// // //                                         ))}
// // //                                     </div>
// // //                                 ) : (
// // //                                     <div className="text-center py-12">
// // //                                         <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
// // //                                             <Calendar className="w-8 h-8 text-slate-300" />
// // //                                         </div>
// // //                                         <p className="text-slate-500 font-medium">No upcoming events</p>
// // //                                         <p className="text-sm text-slate-400 mt-1">
// // //                                             No events scheduled for {timeFilterConfig[timeFilter].label.toLowerCase()}
// // //                                         </p>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         </div>

// // //                         {/* ===== SECTION 2: COMPLETED EVENTS ===== */}
// // //                         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
// // //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// // //                                 <div className="flex items-center gap-3">
// // //                                     <div className="p-2 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100">
// // //                                         <CheckCircle className="w-5 h-5 text-amber-600" />
// // //                                     </div>
// // //                                     <h2 className="text-lg font-semibold text-slate-900">Completed Events</h2>
// // //                                     <span className="text-sm text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
// // //                                         {completedEvents.length}
// // //                                     </span>
// // //                                 </div>
// // //                             </div>

// // //                             <div className="p-6">
// // //                                 {completedEvents.length > 0 ? (
// // //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                                         {completedEvents.map(event => (
// // //                                             <EventCard key={event.id} event={event} />
// // //                                         ))}
// // //                                     </div>
// // //                                 ) : (
// // //                                     <div className="text-center py-12">
// // //                                         <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
// // //                                             <CheckCircle className="w-8 h-8 text-slate-300" />
// // //                                         </div>
// // //                                         <p className="text-slate-500 font-medium">No completed events</p>
// // //                                         <p className="text-sm text-slate-400 mt-1">Completed events will appear here</p>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 <DraggableButton onClick={handleCreateEvent} />
// // //             </main>
// // //         </div>
// // //     );
// // // }



// // 'use client';

// // import { useEffect, useState, useMemo, useCallback } from "react";
// // import { useRouter } from "next/navigation";
// // import { message } from "antd";
// // import {
// //     Calendar, Clock, MapPin, Users, Home, DollarSign,
// //     ArrowLeft, Plus, Filter, Search, ChevronRight,
// //     PhoneCall, Mail, MessageSquare, CheckCircle,
// //     XCircle, Building, Key, Target, Zap,
// //     Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
// //     ChevronDown, MoreVertical, Edit, Trash2,
// //     User, Sparkles, Crown, Bed, Bath,
// //     Check, X, AlertCircle, ExternalLink,
// //     Layers, HomeIcon, Briefcase, ChevronLeft,
// //     CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
// //     ListFilter, Clock8, LayoutGrid, List,
// //     ArrowUpRight, ArrowDownRight, Circle,
// //     GripVertical, Menu, Sparkle, Gem,
// //     BarChart3, Activity, CalendarClock,
// //     ChevronsUp, ChevronsDown
// // } from "lucide-react";
// // import Header from "@/components/Header";
// // import Button from "@/components/Button";
// // import Loader from "@/components/Loader";
// // import DraggableButton from "@/components/DraggableButton";
// // import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// // interface UserInfo {
// //     uid: string;
// //     email?: string;
// //     name?: string;
// //     [key: string]: any;
// // }

// // interface ClientData {
// //     id: string;
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phone: string;
// //     propertyType?: string;
// //     preferredLocations?: string;
// //     ownerUid?: string;
// //     agentUid?: string;
// // }

// // interface OwnerData {
// //     id: string;
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phone: string;
// //     propertyAddress?: string;
// //     ownerUid?: string;
// //     agentUid?: string;
// // }

// // interface EventData {
// //     id: string;
// //     title: string;
// //     description: string;
// //     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
// //     clientIds: string[];
// //     address: string;
// //     date: string;
// //     startTime: string;
// //     endTime: string;
// //     notes?: string;
// //     reminderTime: string;
// //     agentUid: string;
// //     agentName: string;
// //     reminderSent: boolean;
// //     createdAt: string;
// // }

// // // Event type configuration
// // const eventTypeConfig = {
// //     'property-viewing': {
// //         label: 'Property Viewing',
// //         icon: Eye,
// //         color: 'text-blue-600',
// //         bg: 'bg-blue-50',
// //         border: 'border-blue-200',
// //         gradient: 'from-blue-500 to-blue-600',
// //         emoji: '🏠',
// //         lightBg: 'bg-blue-50/80'
// //     },
// //     'client-meeting': {
// //         label: 'Client Meeting',
// //         icon: Users,
// //         color: 'text-purple-600',
// //         bg: 'bg-purple-50',
// //         border: 'border-purple-200',
// //         gradient: 'from-purple-500 to-purple-600',
// //         emoji: '🤝',
// //         lightBg: 'bg-purple-50/80'
// //     },
// //     'closing-session': {
// //         label: 'Closing Session',
// //         icon: Key,
// //         color: 'text-emerald-600',
// //         bg: 'bg-emerald-50',
// //         border: 'border-emerald-200',
// //         gradient: 'from-emerald-500 to-emerald-600',
// //         emoji: '🔑',
// //         lightBg: 'bg-emerald-50/80'
// //     },
// //     'property-inspection': {
// //         label: 'Property Inspection',
// //         icon: Target,
// //         color: 'text-amber-600',
// //         bg: 'bg-amber-50',
// //         border: 'border-amber-200',
// //         gradient: 'from-amber-500 to-amber-600',
// //         emoji: '🔍',
// //         lightBg: 'bg-amber-50/80'
// //     },
// //     'follow-up-call': {
// //         label: 'Follow-up Call',
// //         icon: PhoneCall,
// //         color: 'text-indigo-600',
// //         bg: 'bg-indigo-50',
// //         border: 'border-indigo-200',
// //         gradient: 'from-indigo-500 to-indigo-600',
// //         emoji: '📞',
// //         lightBg: 'bg-indigo-50/80'
// //     }
// // };

// // const statusConfig = {
// //     'scheduled': {
// //         label: 'Scheduled',
// //         color: 'text-blue-700',
// //         bg: 'bg-blue-50',
// //         dot: 'bg-blue-500',
// //         border: 'border-blue-200',
// //         lightBg: 'bg-blue-50/60'
// //     },
// //     'in-progress': {
// //         label: 'In Progress',
// //         color: 'text-amber-700',
// //         bg: 'bg-amber-50',
// //         dot: 'bg-amber-500',
// //         border: 'border-amber-200',
// //         lightBg: 'bg-amber-50/60'
// //     },
// //     'completed': {
// //         label: 'Completed',
// //         color: 'text-emerald-700',
// //         bg: 'bg-emerald-50',
// //         dot: 'bg-emerald-500',
// //         border: 'border-emerald-200',
// //         lightBg: 'bg-emerald-50/60'
// //     }
// // };

// // type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month';

// // const ITEMS_PER_PAGE = 4;

// // export default function CalendarEventsPage() {
// //     const router = useRouter();
// //     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
// //     const [events, setEvents] = useState<EventData[]>([]);
// //     const [clients, setClients] = useState<ClientData[]>([]);
// //     const [owners, setOwners] = useState<OwnerData[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [currentMonth, setCurrentMonth] = useState(new Date());
// //     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
// //     const [deletingId, setDeletingId] = useState<string | null>(null);
// //     const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [filterType, setFilterType] = useState<string>('all');

// //     // Pagination states
// //     const [upcomingPage, setUpcomingPage] = useState(1);
// //     const [completedPage, setCompletedPage] = useState(1);
// //     const [showAllUpcoming, setShowAllUpcoming] = useState(false);
// //     const [showAllCompleted, setShowAllCompleted] = useState(false);

// //     // Get event status
// //     const getEventStatus = useCallback((event: EventData) => {
// //         const now = new Date();
// //         const eventDate = new Date(`${event.date}T${event.startTime}`);
// //         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

// //         if (eventEndDate < now) return 'completed';
// //         if (eventDate <= now && eventEndDate >= now) return 'in-progress';
// //         return 'scheduled';
// //     }, []);

// //     // Fetch clients and owners
// //     const fetchClients = useCallback(async (uid: string) => {
// //         try {
// //             const clientsData: any = await getData(`clients/${uid}`);
// //             if (clientsData) {
// //                 const clientsArray = Object.entries(clientsData)
// //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// //                     .filter((client) => client.agentUid === uid || client.ownerUid === uid);
// //                 setClients(clientsArray);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching clients:', error);
// //         }
// //     }, []);

// //     const fetchOwners = useCallback(async (uid: string) => {
// //         try {
// //             const ownersData: any = await getData(`owners/${uid}`);
// //             if (ownersData) {
// //                 const ownersArray = Object.entries(ownersData)
// //                     .map(([id, data]: [string, any]) => ({ id, ...data }))
// //                     .filter((owner) => owner.agentUid === uid);
// //                 setOwners(ownersArray);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching owners:', error);
// //         }
// //     }, []);

// //     // Load all data
// //     useEffect(() => {
// //         const checkAuth = async () => {
// //             try {
// //                 const user: any = await checkUserSession();
// //                 if (!user) {
// //                     message.error('Please Login First');
// //                     router.replace('/login');
// //                     return;
// //                 }

// //                 const storedUser = localStorage.getItem('userInfo');
// //                 let userData;

// //                 if (storedUser) {
// //                     userData = JSON.parse(storedUser);
// //                 } else {
// //                     userData = await getData(`users/${user.uid}`);
// //                     if (userData) {
// //                         localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
// //                     }
// //                 }

// //                 if (userData) {
// //                     setUserInfo({ uid: user.uid, ...userData });
// //                     await Promise.all([
// //                         fetchEvents(user.uid),
// //                         fetchClients(user.uid),
// //                         fetchOwners(user.uid)
// //                     ]);
// //                 }
// //             } catch (err) {
// //                 console.error('Authentication error:', err);
// //                 message.error('Error occurred during authentication');
// //                 router.replace('/login');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         checkAuth();
// //     }, [router, fetchClients, fetchOwners]);

// //     const fetchEvents = async (uid: string) => {
// //         try {
// //             const eventsData: any = await getData(`events/${uid}`);
// //             if (eventsData) {
// //                 let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
// //                     id,
// //                     ...value
// //                 }));
// //                 eventsArray = eventsArray.reverse();
// //                 setEvents(eventsArray);
// //             } else {
// //                 setEvents([]);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching events:', error);
// //             message.error('Failed to fetch events');
// //             setEvents([]);
// //         }
// //     };

// //     // Calendar helpers
// //     const getDaysInMonth = (date: Date) => {
// //         const year = date.getFullYear();
// //         const month = date.getMonth();
// //         const firstDay = new Date(year, month, 1);
// //         const lastDay = new Date(year, month + 1, 0);
// //         const daysInMonth = lastDay.getDate();
// //         const startingDayOfWeek = firstDay.getDay();

// //         const days: (Date | null)[] = [];
// //         for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
// //         for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
// //         return days;
// //     };

// //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// //     const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// //     const goToPreviousMonth = () => {
// //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// //     };

// //     const goToNextMonth = () => {
// //         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// //     };

// //     const goToToday = () => {
// //         setCurrentMonth(new Date());
// //         setSelectedDate(new Date());
// //         setTimeFilter('today');
// //         // Reset pagination when changing filter
// //         setUpcomingPage(1);
// //         setCompletedPage(1);
// //         setShowAllUpcoming(false);
// //         setShowAllCompleted(false);
// //     };

// //     const formatDateForComparison = (date: Date) => {
// //         const year = date.getFullYear();
// //         const month = String(date.getMonth() + 1).padStart(2, '0');
// //         const day = String(date.getDate()).padStart(2, '0');
// //         return `${year}-${month}-${day}`;
// //     };

// //     const getEventsForDate = useCallback((date: Date) => {
// //         if (!date) return [];
// //         const dateString = formatDateForComparison(date);
// //         return events.filter(event => event.date === dateString);
// //     }, [events]);

// //     // Format helpers
// //     const formatDate = useCallback((dateString: string) => {
// //         const date = new Date(dateString);
// //         const today = new Date();
// //         const tomorrow = new Date(today);
// //         tomorrow.setDate(tomorrow.getDate() + 1);

// //         if (date.toDateString() === today.toDateString()) return 'Today';
// //         if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
// //         return date.toLocaleDateString('en-US', {
// //             weekday: 'short',
// //             month: 'short',
// //             day: 'numeric'
// //         });
// //     }, []);

// //     const formatTime = useCallback((timeString: string) => {
// //         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// //             hour: 'numeric',
// //             minute: '2-digit',
// //             hour12: true
// //         });
// //     }, []);

// //     // Filter events by search and type
// //     const filteredEvents = useMemo(() => {
// //         let filtered = events;

// //         if (searchTerm) {
// //             filtered = filtered.filter(event =>
// //                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                 event.address?.toLowerCase().includes(searchTerm.toLowerCase())
// //             );
// //         }

// //         if (filterType !== 'all') {
// //             filtered = filtered.filter(event => event.eventType === filterType);
// //         }

// //         return filtered;
// //     }, [events, searchTerm, filterType]);

// //     // Get date range based on filter
// //     const getDateRange = useCallback((filter: TimeFilter): { start: Date; end: Date } => {
// //         const now = new Date();
// //         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// //         const tomorrow = new Date(today);
// //         tomorrow.setDate(tomorrow.getDate() + 1);

// //         switch (filter) {
// //             case 'today':
// //                 return {
// //                     start: today,
// //                     end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
// //                 };
// //             case 'tomorrow':
// //                 return {
// //                     start: tomorrow,
// //                     end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1)
// //                 };
// //             case 'this-week': {
// //                 const start = new Date(today);
// //                 start.setDate(today.getDate() - today.getDay());
// //                 const end = new Date(start);
// //                 end.setDate(start.getDate() + 6);
// //                 end.setHours(23, 59, 59, 999);
// //                 return { start, end };
// //             }
// //             case 'this-month': {
// //                 const start = new Date(today.getFullYear(), today.getMonth(), 1);
// //                 const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// //                 end.setHours(23, 59, 59, 999);
// //                 return { start, end };
// //             }
// //             default:
// //                 return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
// //         }
// //     }, []);

// //     // Get upcoming events based on time filter
// //     const upcomingEvents = useMemo(() => {
// //         const range = getDateRange(timeFilter);
// //         return filteredEvents
// //             .filter(event => {
// //                 const status = getEventStatus(event);
// //                 if (status === 'completed') return false;
// //                 const eventDate = new Date(event.date);
// //                 return eventDate >= range.start && eventDate <= range.end;
// //             })
// //             .sort((a, b) => {
// //                 const dateA = new Date(`${a.date}T${a.startTime}`);
// //                 const dateB = new Date(`${b.date}T${b.startTime}`);
// //                 return dateA.getTime() - dateB.getTime();
// //             });
// //     }, [filteredEvents, timeFilter, getDateRange, getEventStatus]);

// //     // Get completed events
// //     const completedEvents = useMemo(() => {
// //         return filteredEvents
// //             .filter(event => getEventStatus(event) === 'completed')
// //             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// //     }, [filteredEvents, getEventStatus]);

// //     // Paginated events
// //     const paginatedUpcoming = useMemo(() => {
// //         if (showAllUpcoming) return upcomingEvents;
// //         return upcomingEvents.slice(0, ITEMS_PER_PAGE);
// //     }, [upcomingEvents, showAllUpcoming]);

// //     const paginatedCompleted = useMemo(() => {
// //         if (showAllCompleted) return completedEvents;
// //         return completedEvents.slice(0, ITEMS_PER_PAGE);
// //     }, [completedEvents, showAllCompleted]);

// //     // Stats
// //     const eventStats = useMemo(() => ({
// //         total: events.length,
// //         upcoming: filteredEvents.filter(e => getEventStatus(e) !== 'completed').length,
// //         completed: completedEvents.length,
// //         today: filteredEvents.filter(e => e.date === formatDateForComparison(new Date())).length
// //     }), [events, filteredEvents, completedEvents, getEventStatus]);

// //     // Handlers
// //     const handleDeleteEvent = async (eventId: string) => {
// //         if (!window.confirm('Are you sure you want to delete this event?')) return;
// //         setDeletingId(eventId);
// //         try {
// //             await deleleData(`events/${userInfo?.uid}/${eventId}`);
// //             setEvents(events.filter(event => event.id !== eventId));
// //             message.success('Event deleted successfully');
// //         } catch (error) {
// //             console.error("Delete error:", error);
// //             message.error('Failed to delete event');
// //         } finally {
// //             setDeletingId(null);
// //         }
// //     };

// //     const handleViewEvent = (eventId: string) => {
// //         router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
// //     };

// //     const handleCreateEvent = () => {
// //         router.push(`/realstate/${userInfo?.uid}/events/addevent`);
// //     };

// //     const handleShowMoreUpcoming = () => {
// //         setShowAllUpcoming(true);
// //     };

// //     const handleShowLessUpcoming = () => {
// //         setShowAllUpcoming(false);
// //         setUpcomingPage(1);
// //         // Scroll to top of upcoming section
// //         const element = document.getElementById('upcoming-section');
// //         if (element) {
// //             element.scrollIntoView({ behavior: 'smooth' });
// //         }
// //     };

// //     const handleShowMoreCompleted = () => {
// //         setShowAllCompleted(true);
// //     };

// //     const handleShowLessCompleted = () => {
// //         setShowAllCompleted(false);
// //         setCompletedPage(1);
// //         // Scroll to top of completed section
// //         const element = document.getElementById('completed-section');
// //         if (element) {
// //             element.scrollIntoView({ behavior: 'smooth' });
// //         }
// //     };

// //     if (loading) {
// //         return <Loader />;
// //     }

// //     const calendarDays = getDaysInMonth(currentMonth);

// //     // Time filter config
// //     const timeFilterConfig: Record<TimeFilter, { label: string; icon: any; color: string }> = {
// //         'today': { label: 'Today', icon: Clock, color: 'emerald' },
// //         'tomorrow': { label: 'Tomorrow', icon: CalendarPlus, color: 'blue' },
// //         'this-week': { label: 'This Week', icon: CalendarRange, color: 'purple' },
// //         'this-month': { label: 'This Month', icon: CalendarCheck, color: 'indigo' },
// //     };

// //     // Event Card Component - Grid Layout
// //     const EventCard = ({ event }: { event: EventData }) => {
// //         const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
// //         const status = getEventStatus(event);
// //         const statusConfigItem = statusConfig[status];
// //         const Icon = typeConfig.icon;

// //         return (
// //             <div
// //                 onClick={() => handleViewEvent(event.id)}
// //                 className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
// //             >
// //                 <div className={`h-1.5 w-full bg-gradient-to-r ${typeConfig.gradient}`} />

// //                 <div className="p-5">
// //                     <div className="flex items-start justify-between">
// //                         <div className="flex items-center gap-3 min-w-0 flex-1">
// //                             <div className={`p-2.5 rounded-xl ${typeConfig.bg} border ${typeConfig.border} shrink-0`}>
// //                                 <Icon className={`w-5 h-5 ${typeConfig.color}`} />
// //                             </div>
// //                             <div className="min-w-0">
// //                                 <h4 className="font-semibold text-slate-900 text-base truncate">
// //                                     {event.title}
// //                                 </h4>
// //                                 <span className={`text-xs px-2.5 py-0.5 rounded-full ${statusConfigItem.bg} ${statusConfigItem.color} border ${statusConfigItem.border} flex items-center gap-1.5 inline-flex mt-1`}>
// //                                     <span className={`w-1.5 h-1.5 rounded-full ${statusConfigItem.dot}`} />
// //                                     {statusConfigItem.label}
// //                                 </span>
// //                             </div>
// //                         </div>
// //                         <button
// //                             onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleDeleteEvent(event.id);
// //                             }}
// //                             className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-lg transition-all shrink-0 ml-2"
// //                             disabled={deletingId === event.id}
// //                         >
// //                             <Trash2 className={`w-4 h-4 text-red-400 hover:text-red-600 ${deletingId === event.id ? 'opacity-50' : ''}`} />
// //                         </button>
// //                     </div>

// //                     <div className="mt-4 space-y-2">
// //                         <div className="flex items-center gap-3 text-sm text-slate-500">
// //                             <div className="flex items-center gap-1.5">
// //                                 <Clock className="w-4 h-4 text-slate-400" />
// //                                 <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
// //                             </div>
// //                         </div>

// //                         {event.address && (
// //                             <div className="flex items-center gap-1.5 text-sm text-slate-500">
// //                                 <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
// //                                 <span className="truncate">{event.address}</span>
// //                             </div>
// //                         )}

// //                         <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
// //                             <span className="text-xs text-slate-400 flex items-center gap-1.5">
// //                                 <Calendar className="w-3.5 h-3.5" />
// //                                 {formatDate(event.date)}
// //                             </span>
// //                             <span className="text-xs text-slate-300">•</span>
// //                             <span className="text-xs text-slate-400 flex items-center gap-1">
// //                                 {typeConfig.emoji}
// //                                 {typeConfig.label}
// //                             </span>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     };

// //     // Pagination Controls Component
// //     const PaginationControls = ({
// //         total,
// //         shown,
// //         onShowMore,
// //         onShowLess,
// //         isAllShown
// //     }: {
// //         total: number;
// //         shown: number;
// //         onShowMore: () => void;
// //         onShowLess: () => void;
// //         isAllShown: boolean;
// //     }) => {
// //         if (total <= ITEMS_PER_PAGE) return null;

// //         return (
// //             <div className="flex justify-center mt-6">
// //                 {!isAllShown ? (
// //                     <button
// //                         onClick={onShowMore}
// //                         className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center gap-2 hover:-translate-y-0.5"
// //                     >
// //                         <ChevronsDown className="w-4 h-4" />
// //                         Show More ({total - shown} remaining)
// //                     </button>
// //                 ) : (
// //                     <button
// //                         onClick={onShowLess}
// //                         className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-all flex items-center gap-2"
// //                     >
// //                         <ChevronsUp className="w-4 h-4" />
// //                         Show Less
// //                     </button>
// //                 )}
// //             </div>
// //         );
// //     };

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
// //             <Header userData={userInfo} />

// //             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //                 {/* ===== HERO HEADER ===== */}
// //                 <div className="relative mb-10">
// //                     <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl" />
// //                     <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />

// //                     <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
// //                         <div>
// //                             <div className="flex items-center gap-3 mb-3">
// //                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
// //                                     <CalendarDays className="w-5 h-5 text-white" />
// //                                 </div>
// //                                 <span className="text-xs font-semibold text-purple-600 uppercase tracking-[0.15em] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
// //                                     Calendar
// //                                 </span>
// //                                 <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.1em]">
// //                                     • {events.length} events
// //                                 </span>
// //                             </div>
// //                             <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
// //                                 Event <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Schedule</span>
// //                             </h1>
// //                             <p className="text-slate-500 mt-2 max-w-lg text-sm">
// //                                 Manage property viewings, client meetings, and appointments in one elegant dashboard.
// //                             </p>
// //                         </div>
// //                         <div className="flex items-center gap-3">
// //                             <Button
// //                                 onClick={handleCreateEvent}
// //                                 variant="theme"
// //                                 icon={<Plus className="w-4 h-4" />}
// //                                 size="md"
// //                                 className="shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
// //                             >
// //                                 New Event
// //                             </Button>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* ===== STATS ===== */}
// //                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //                     {[
// //                         { title: 'Total Events', value: eventStats.total, icon: Calendar, color: 'purple' },
// //                         { title: 'Upcoming', value: eventStats.upcoming, icon: TrendingUp, color: 'blue' },
// //                         { title: 'Today', value: eventStats.today, icon: Clock, color: 'emerald' },
// //                         { title: 'Completed', value: eventStats.completed, icon: CheckCircle, color: 'amber' }
// //                     ].map((stat, idx) => {
// //                         const colorMap = {
// //                             purple: 'from-purple-500/10 to-purple-600/5 border-purple-200/50 text-purple-600',
// //                             blue: 'from-blue-500/10 to-blue-600/5 border-blue-200/50 text-blue-600',
// //                             emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 text-emerald-600',
// //                             amber: 'from-amber-500/10 to-amber-600/5 border-amber-200/50 text-amber-600'
// //                         };
// //                         const iconColorMap = {
// //                             purple: 'bg-purple-100 text-purple-600',
// //                             blue: 'bg-blue-100 text-blue-600',
// //                             emerald: 'bg-emerald-100 text-emerald-600',
// //                             amber: 'bg-amber-100 text-amber-600'
// //                         };
// //                         const Icon = stat.icon;
// //                         return (
// //                             <div key={idx} className={`group bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} rounded-2xl border p-5 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300`}>
// //                                 <div className="flex items-center justify-between">
// //                                     <div>
// //                                         <p className="text-sm font-medium text-slate-600">{stat.title}</p>
// //                                         <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
// //                                     </div>
// //                                     <div className={`p-3 rounded-xl ${iconColorMap[stat.color as keyof typeof iconColorMap]}`}>
// //                                         <Icon className="w-5 h-5" />
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         );
// //                     })}
// //                 </div>

// //                 {/* ===== FILTERS ===== */}
// //                 <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 mb-8">
// //                     <div className="flex flex-col sm:flex-row gap-4">
// //                         <div className="flex-1 relative">
// //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                             <input
// //                                 type="text"
// //                                 placeholder="Search events by title or address..."
// //                                 value={searchTerm}
// //                                 onChange={(e) => {
// //                                     setSearchTerm(e.target.value);
// //                                     // Reset pagination when searching
// //                                     setShowAllUpcoming(false);
// //                                     setShowAllCompleted(false);
// //                                 }}
// //                                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm bg-slate-50"
// //                             />
// //                         </div>
// //                         <div className="flex flex-wrap gap-2">
// //                             <button
// //                                 onClick={() => {
// //                                     setFilterType('all');
// //                                     setShowAllUpcoming(false);
// //                                     setShowAllCompleted(false);
// //                                 }}
// //                                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterType === 'all'
// //                                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25'
// //                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// //                                     }`}
// //                             >
// //                                 All Types
// //                             </button>
// //                             {Object.entries(eventTypeConfig).map(([key, config]) => {
// //                                 const Icon = config.icon;
// //                                 return (
// //                                     <button
// //                                         key={key}
// //                                         onClick={() => {
// //                                             setFilterType(key);
// //                                             setShowAllUpcoming(false);
// //                                             setShowAllCompleted(false);
// //                                         }}
// //                                         className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${filterType === key
// //                                                 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25'
// //                                                 : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// //                                             }`}
// //                                     >
// //                                         <Icon className="w-3.5 h-3.5" />
// //                                         {config.label}
// //                                     </button>
// //                                 );
// //                             })}
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* ===== MAIN CONTENT ===== */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //                     {/* Left Column: Calendar */}
// //                     <div className="lg:col-span-1">
// //                         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden sticky top-6">
// //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// //                                 <div className="flex items-center justify-between">
// //                                     <div className="flex items-center gap-2">
// //                                         <span className="font-semibold text-slate-900">
// //                                             {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
// //                                         </span>
// //                                     </div>
// //                                     <div className="flex items-center gap-1">
// //                                         <button
// //                                             onClick={goToToday}
// //                                             className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100"
// //                                         >
// //                                             Today
// //                                         </button>
// //                                         <button
// //                                             onClick={goToPreviousMonth}
// //                                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// //                                         >
// //                                             <ChevronLeft className="w-4 h-4 text-slate-600" />
// //                                         </button>
// //                                         <button
// //                                             onClick={goToNextMonth}
// //                                             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
// //                                         >
// //                                             <ChevronRight className="w-4 h-4 text-slate-600" />
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="grid grid-cols-7 gap-px bg-slate-100">
// //                                 {weekDays.map((day, idx) => (
// //                                     <div key={idx} className="bg-slate-50/80 py-2 text-center">
// //                                         <span className="text-xs font-medium text-slate-500">{day}</span>
// //                                     </div>
// //                                 ))}
// //                             </div>

// //                             <div className="grid grid-cols-7 gap-px bg-slate-100">
// //                                 {calendarDays.map((date, idx) => {
// //                                     const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
// //                                     const isToday = date && date.toDateString() === new Date().toDateString();
// //                                     const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
// //                                     const dayEvents = date ? getEventsForDate(date) : [];
// //                                     const hasEvents = dayEvents.length > 0;

// //                                     return (
// //                                         <div
// //                                             key={idx}
// //                                             onClick={() => date && setSelectedDate(date)}
// //                                             className={`
// //                                                 min-h-[60px] bg-white p-1.5 transition-all cursor-pointer hover:bg-purple-50/50
// //                                                 ${!isCurrentMonth && 'bg-slate-50/60'}
// //                                                 ${isSelected && 'ring-2 ring-purple-500 ring-inset bg-purple-50/50'}
// //                                                 ${isToday && !isSelected && 'bg-blue-50/30'}
// //                                             `}
// //                                         >
// //                                             <div className="flex justify-between items-start">
// //                                                 <span className={`
// //                                                     text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full
// //                                                     ${isToday ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm shadow-purple-500/25' : ''}
// //                                                     ${!isToday && isCurrentMonth ? 'text-slate-700' : ''}
// //                                                     ${!isCurrentMonth ? 'text-slate-400' : ''}
// //                                                 `}>
// //                                                     {date ? date.getDate() : ''}
// //                                                 </span>
// //                                                 {hasEvents && (
// //                                                     <div className="flex gap-0.5">
// //                                                         {dayEvents.slice(0, 2).map((_, i) => (
// //                                                             <div key={i} className="w-1 h-1 rounded-full bg-purple-400"></div>
// //                                                         ))}
// //                                                     </div>
// //                                                 )}
// //                                             </div>
// //                                             {hasEvents && (
// //                                                 <div className="mt-0.5 space-y-0.5">
// //                                                     {dayEvents.slice(0, 1).map((event) => (
// //                                                         <div
// //                                                             key={event.id}
// //                                                             onClick={(e) => {
// //                                                                 e.stopPropagation();
// //                                                                 handleViewEvent(event.id);
// //                                                             }}
// //                                                             className="text-[8px] px-1 py-0.5 rounded truncate bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
// //                                                         >
// //                                                             {event.title.length > 8 ? event.title.slice(0, 6) + '…' : event.title}
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                     );
// //                                 })}
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Right Column: Events */}
// //                     <div className="lg:col-span-2 space-y-8">
// //                         {/* ===== SECTION 1: UPCOMING EVENTS WITH TABS ===== */}
// //                         <div id="upcoming-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
// //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// //                                 <div className="flex items-center justify-between flex-wrap gap-3">
// //                                     <div className="flex items-center gap-3">
// //                                         <div className="p-2 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100">
// //                                             <TrendingUp className="w-5 h-5 text-purple-600" />
// //                                         </div>
// //                                         <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
// //                                         <span className="text-sm text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
// //                                             {upcomingEvents.length}
// //                                         </span>
// //                                     </div>
// //                                     {upcomingEvents.length > ITEMS_PER_PAGE && (
// //                                         <span className="text-xs text-slate-400">
// //                                             Showing {Math.min(ITEMS_PER_PAGE, paginatedUpcoming.length)} of {upcomingEvents.length}
// //                                         </span>
// //                                     )}
// //                                 </div>

// //                                 {/* Time Filter Tabs */}
// //                                 <div className="flex flex-wrap gap-1.5 mt-4">
// //                                     {Object.entries(timeFilterConfig).map(([key, config]) => {
// //                                         const Icon = config.icon;
// //                                         const isActive = timeFilter === key;
// //                                         const colorMap = {
// //                                             emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
// //                                             blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
// //                                             purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
// //                                             indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/25'
// //                                         };
// //                                         return (
// //                                             <button
// //                                                 key={key}
// //                                                 onClick={() => {
// //                                                     setTimeFilter(key as TimeFilter);
// //                                                     setShowAllUpcoming(false);
// //                                                 }}
// //                                                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive
// //                                                         ? `bg-gradient-to-r ${colorMap[config.color as keyof typeof colorMap]} text-white shadow-md`
// //                                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// //                                                     }`}
// //                                             >
// //                                                 <Icon className="w-4 h-4" />
// //                                                 {config.label}
// //                                             </button>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             </div>

// //                             <div className="p-6">
// //                                 {paginatedUpcoming.length > 0 ? (
// //                                     <>
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                             {paginatedUpcoming.map(event => (
// //                                                 <EventCard key={event.id} event={event} />
// //                                             ))}
// //                                         </div>
// //                                         <PaginationControls
// //                                             total={upcomingEvents.length}
// //                                             shown={paginatedUpcoming.length}
// //                                             onShowMore={handleShowMoreUpcoming}
// //                                             onShowLess={handleShowLessUpcoming}
// //                                             isAllShown={showAllUpcoming}
// //                                         />
// //                                     </>
// //                                 ) : (
// //                                     <div className="text-center py-12">
// //                                         <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
// //                                             <Calendar className="w-8 h-8 text-slate-300" />
// //                                         </div>
// //                                         <p className="text-slate-500 font-medium">No upcoming events</p>
// //                                         <p className="text-sm text-slate-400 mt-1">
// //                                             No events scheduled for {timeFilterConfig[timeFilter].label.toLowerCase()}
// //                                         </p>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         {/* ===== SECTION 2: COMPLETED EVENTS ===== */}
// //                         <div id="completed-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
// //                             <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
// //                                 <div className="flex items-center justify-between flex-wrap gap-3">
// //                                     <div className="flex items-center gap-3">
// //                                         <div className="p-2 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100">
// //                                             <CheckCircle className="w-5 h-5 text-amber-600" />
// //                                         </div>
// //                                         <h2 className="text-lg font-semibold text-slate-900">Completed Events</h2>
// //                                         <span className="text-sm text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
// //                                             {completedEvents.length}
// //                                         </span>
// //                                     </div>
// //                                     {completedEvents.length > ITEMS_PER_PAGE && (
// //                                         <span className="text-xs text-slate-400">
// //                                             Showing {Math.min(ITEMS_PER_PAGE, paginatedCompleted.length)} of {completedEvents.length}
// //                                         </span>
// //                                     )}
// //                                 </div>
// //                             </div>

// //                             <div className="p-6">
// //                                 {paginatedCompleted.length > 0 ? (
// //                                     <>
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                             {paginatedCompleted.map(event => (
// //                                                 <EventCard key={event.id} event={event} />
// //                                             ))}
// //                                         </div>
// //                                         <PaginationControls
// //                                             total={completedEvents.length}
// //                                             shown={paginatedCompleted.length}
// //                                             onShowMore={handleShowMoreCompleted}
// //                                             onShowLess={handleShowLessCompleted}
// //                                             isAllShown={showAllCompleted}
// //                                         />
// //                                     </>
// //                                 ) : (
// //                                     <div className="text-center py-12">
// //                                         <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
// //                                             <CheckCircle className="w-8 h-8 text-slate-300" />
// //                                         </div>
// //                                         <p className="text-slate-500 font-medium">No completed events</p>
// //                                         <p className="text-sm text-slate-400 mt-1">Completed events will appear here</p>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <DraggableButton onClick={handleCreateEvent} />
// //             </main>
// //         </div>
// //     );
// // }





// 'use client';

// import { useEffect, useState, useMemo, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { message } from "antd";
// import {
//     Calendar, Clock, MapPin, Users, Home, DollarSign,
//     ArrowLeft, Plus, Filter, Search, ChevronRight,
//     PhoneCall, Mail, MessageSquare, CheckCircle,
//     XCircle, Building, Key, Target, Zap,
//     Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
//     ChevronDown, MoreVertical, Edit, Trash2,
//     User, Sparkles, Crown, Bed, Bath,
//     Check, X, AlertCircle, ExternalLink,
//     Layers, HomeIcon, Briefcase, ChevronLeft,
//     CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
//     ListFilter, Clock8, LayoutGrid, List,
//     ArrowUpRight, ArrowDownRight, Circle,
//     GripVertical, Menu, Sparkle, Gem,
//     BarChart3, Activity, CalendarClock,
//     ChevronsUp, ChevronsDown
// } from "lucide-react";
// import Header from "@/components/Header";
// import Button from "@/components/Button";
// import Loader from "@/components/Loader";
// import DraggableButton from "@/components/DraggableButton";
// import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// interface UserInfo {
//     uid: string;
//     email?: string;
//     name?: string;
//     [key: string]: any;
// }

// interface ClientData {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     propertyType?: string;
//     preferredLocations?: string;
//     ownerUid?: string;
//     agentUid?: string;
// }

// interface OwnerData {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     propertyAddress?: string;
//     ownerUid?: string;
//     agentUid?: string;
// }

// interface EventData {
//     id: string;
//     title: string;
//     description: string;
//     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
//     clientIds: string[];
//     address: string;
//     date: string;
//     startTime: string;
//     endTime: string;
//     notes?: string;
//     reminderTime: string;
//     agentUid: string;
//     agentName: string;
//     reminderSent: boolean;
//     createdAt: string;
// }

// // Event type configuration - monochrome
// const eventTypeConfig = {
//     'property-viewing': {
//         label: 'Viewing',
//         icon: Eye,
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         border: 'border-slate-200',
//         emoji: '🏠'
//     },
//     'client-meeting': {
//         label: 'Meeting',
//         icon: Users,
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         border: 'border-slate-200',
//         emoji: '🤝'
//     },
//     'closing-session': {
//         label: 'Closing',
//         icon: Key,
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         border: 'border-slate-200',
//         emoji: '🔑'
//     },
//     'property-inspection': {
//         label: 'Inspection',
//         icon: Target,
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         border: 'border-slate-200',
//         emoji: '🔍'
//     },
//     'follow-up-call': {
//         label: 'Follow-up',
//         icon: PhoneCall,
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         border: 'border-slate-200',
//         emoji: '📞'
//     }
// };

// const statusConfig = {
//     'scheduled': {
//         label: 'Scheduled',
//         color: 'text-slate-600',
//         bg: 'bg-slate-50',
//         dot: 'bg-slate-400',
//         border: 'border-slate-200'
//     },
//     'in-progress': {
//         label: 'In Progress',
//         color: 'text-amber-600',
//         bg: 'bg-amber-50',
//         dot: 'bg-amber-500',
//         border: 'border-amber-200'
//     },
//     'completed': {
//         label: 'Completed',
//         color: 'text-emerald-600',
//         bg: 'bg-emerald-50',
//         dot: 'bg-emerald-500',
//         border: 'border-emerald-200'
//     }
// };

// type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month';

// const ITEMS_PER_PAGE = 6;

// export default function CalendarEventsPage() {
//     const router = useRouter();
//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//     const [events, setEvents] = useState<EventData[]>([]);
//     const [clients, setClients] = useState<ClientData[]>([]);
//     const [owners, setOwners] = useState<OwnerData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//     const [deletingId, setDeletingId] = useState<string | null>(null);
//     const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState<string>('all');

//     // Pagination states
//     const [upcomingPage, setUpcomingPage] = useState(1);
//     const [completedPage, setCompletedPage] = useState(1);
//     const [showAllUpcoming, setShowAllUpcoming] = useState(false);
//     const [showAllCompleted, setShowAllCompleted] = useState(false);

//     // Get event status
//     const getEventStatus = useCallback((event: EventData) => {
//         const now = new Date();
//         const eventDate = new Date(`${event.date}T${event.startTime}`);
//         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

//         if (eventEndDate < now) return 'completed';
//         if (eventDate <= now && eventEndDate >= now) return 'in-progress';
//         return 'scheduled';
//     }, []);

//     // Fetch clients and owners
//     const fetchClients = useCallback(async (uid: string) => {
//         try {
//             const clientsData: any = await getData(`clients/${uid}`);
//             if (clientsData) {
//                 const clientsArray = Object.entries(clientsData)
//                     .map(([id, data]: [string, any]) => ({ id, ...data }))
//                     .filter((client) => client.agentUid === uid || client.ownerUid === uid);
//                 setClients(clientsArray);
//             }
//         } catch (error) {
//             console.error('Error fetching clients:', error);
//         }
//     }, []);

//     const fetchOwners = useCallback(async (uid: string) => {
//         try {
//             const ownersData: any = await getData(`owners/${uid}`);
//             if (ownersData) {
//                 const ownersArray = Object.entries(ownersData)
//                     .map(([id, data]: [string, any]) => ({ id, ...data }))
//                     .filter((owner) => owner.agentUid === uid);
//                 setOwners(ownersArray);
//             }
//         } catch (error) {
//             console.error('Error fetching owners:', error);
//         }
//     }, []);

//     // Load all data
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const user: any = await checkUserSession();
//                 if (!user) {
//                     message.error('Please Login First');
//                     router.replace('/login');
//                     return;
//                 }

//                 const storedUser = localStorage.getItem('userInfo');
//                 let userData;

//                 if (storedUser) {
//                     userData = JSON.parse(storedUser);
//                 } else {
//                     userData = await getData(`users/${user.uid}`);
//                     if (userData) {
//                         localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
//                     }
//                 }

//                 if (userData) {
//                     setUserInfo({ uid: user.uid, ...userData });
//                     await Promise.all([
//                         fetchEvents(user.uid),
//                         fetchClients(user.uid),
//                         fetchOwners(user.uid)
//                     ]);
//                 }
//             } catch (err) {
//                 console.error('Authentication error:', err);
//                 message.error('Error occurred during authentication');
//                 router.replace('/login');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, [router, fetchClients, fetchOwners]);

//     const fetchEvents = async (uid: string) => {
//         try {
//             const eventsData: any = await getData(`events/${uid}`);
//             if (eventsData) {
//                 let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
//                     id,
//                     ...value
//                 }));
//                 eventsArray = eventsArray.reverse();
//                 setEvents(eventsArray);
//             } else {
//                 setEvents([]);
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//             message.error('Failed to fetch events');
//             setEvents([]);
//         }
//     };

//     // Calendar helpers
//     const getDaysInMonth = (date: Date) => {
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const daysInMonth = lastDay.getDate();
//         const startingDayOfWeek = firstDay.getDay();

//         const days: (Date | null)[] = [];
//         for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
//         for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
//         return days;
//     };

//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     const goToPreviousMonth = () => {
//         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//     };

//     const goToNextMonth = () => {
//         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//     };

//     const goToToday = () => {
//         setCurrentMonth(new Date());
//         setSelectedDate(new Date());
//         setTimeFilter('today');
//         setUpcomingPage(1);
//         setCompletedPage(1);
//         setShowAllUpcoming(false);
//         setShowAllCompleted(false);
//     };

//     const formatDateForComparison = (date: Date) => {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };

//     const getEventsForDate = useCallback((date: Date) => {
//         if (!date) return [];
//         const dateString = formatDateForComparison(date);
//         return events.filter(event => event.date === dateString);
//     }, [events]);

//     // Format helpers
//     const formatDate = useCallback((dateString: string) => {
//         const date = new Date(dateString);
//         const today = new Date();
//         const tomorrow = new Date(today);
//         tomorrow.setDate(tomorrow.getDate() + 1);

//         if (date.toDateString() === today.toDateString()) return 'Today';
//         if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
//         return date.toLocaleDateString('en-US', {
//             weekday: 'short',
//             month: 'short',
//             day: 'numeric'
//         });
//     }, []);

//     const formatTime = useCallback((timeString: string) => {
//         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//         });
//     }, []);

//     // Filter events by search and type
//     const filteredEvents = useMemo(() => {
//         let filtered = events;

//         if (searchTerm) {
//             filtered = filtered.filter(event =>
//                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 event.address?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         if (filterType !== 'all') {
//             filtered = filtered.filter(event => event.eventType === filterType);
//         }

//         return filtered;
//     }, [events, searchTerm, filterType]);

//     // Get date range based on filter
//     const getDateRange = useCallback((filter: TimeFilter): { start: Date; end: Date } => {
//         const now = new Date();
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         const tomorrow = new Date(today);
//         tomorrow.setDate(tomorrow.getDate() + 1);

//         switch (filter) {
//             case 'today':
//                 return {
//                     start: today,
//                     end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
//                 };
//             case 'tomorrow':
//                 return {
//                     start: tomorrow,
//                     end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1)
//                 };
//             case 'this-week': {
//                 const start = new Date(today);
//                 start.setDate(today.getDate() - today.getDay());
//                 const end = new Date(start);
//                 end.setDate(start.getDate() + 6);
//                 end.setHours(23, 59, 59, 999);
//                 return { start, end };
//             }
//             case 'this-month': {
//                 const start = new Date(today.getFullYear(), today.getMonth(), 1);
//                 const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//                 end.setHours(23, 59, 59, 999);
//                 return { start, end };
//             }
//             default:
//                 return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
//         }
//     }, []);

//     // Get upcoming events based on time filter
//     const upcomingEvents = useMemo(() => {
//         const range = getDateRange(timeFilter);
//         return filteredEvents
//             .filter(event => {
//                 const status = getEventStatus(event);
//                 if (status === 'completed') return false;
//                 const eventDate = new Date(event.date);
//                 return eventDate >= range.start && eventDate <= range.end;
//             })
//             .sort((a, b) => {
//                 const dateA = new Date(`${a.date}T${a.startTime}`);
//                 const dateB = new Date(`${b.date}T${b.startTime}`);
//                 return dateA.getTime() - dateB.getTime();
//             });
//     }, [filteredEvents, timeFilter, getDateRange, getEventStatus]);

//     // Get completed events
//     const completedEvents = useMemo(() => {
//         return filteredEvents
//             .filter(event => getEventStatus(event) === 'completed')
//             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//     }, [filteredEvents, getEventStatus]);

//     // Paginated events
//     const paginatedUpcoming = useMemo(() => {
//         if (showAllUpcoming) return upcomingEvents;
//         return upcomingEvents.slice(0, ITEMS_PER_PAGE);
//     }, [upcomingEvents, showAllUpcoming]);

//     const paginatedCompleted = useMemo(() => {
//         if (showAllCompleted) return completedEvents;
//         return completedEvents.slice(0, ITEMS_PER_PAGE);
//     }, [completedEvents, showAllCompleted]);

//     // Stats - Minimal monochrome
//     const eventStats = useMemo(() => ({
//         total: events.length,
//         upcoming: filteredEvents.filter(e => getEventStatus(e) !== 'completed').length,
//         completed: completedEvents.length,
//         today: filteredEvents.filter(e => e.date === formatDateForComparison(new Date())).length
//     }), [events, filteredEvents, completedEvents, getEventStatus]);

//     // Handlers
//     const handleDeleteEvent = async (eventId: string) => {
//         if (!window.confirm('Are you sure you want to delete this event?')) return;
//         setDeletingId(eventId);
//         try {
//             await deleleData(`events/${userInfo?.uid}/${eventId}`);
//             setEvents(events.filter(event => event.id !== eventId));
//             message.success('Event deleted successfully');
//         } catch (error) {
//             console.error("Delete error:", error);
//             message.error('Failed to delete event');
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     const handleViewEvent = (eventId: string) => {
//         router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
//     };

//     const handleCreateEvent = () => {
//         router.push(`/realstate/${userInfo?.uid}/events/addevent`);
//     };

//     const handleShowMoreUpcoming = () => {
//         setShowAllUpcoming(true);
//     };

//     const handleShowLessUpcoming = () => {
//         setShowAllUpcoming(false);
//         setUpcomingPage(1);
//         const element = document.getElementById('upcoming-section');
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     const handleShowMoreCompleted = () => {
//         setShowAllCompleted(true);
//     };

//     const handleShowLessCompleted = () => {
//         setShowAllCompleted(false);
//         setCompletedPage(1);
//         const element = document.getElementById('completed-section');
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     if (loading) {
//         return <Loader />;
//     }

//     const calendarDays = getDaysInMonth(currentMonth);

//     // Time filter config - monochrome
//     const timeFilterConfig: Record<TimeFilter, { label: string; icon: any }> = {
//         'today': { label: 'Today', icon: Clock },
//         'tomorrow': { label: 'Tomorrow', icon: CalendarPlus },
//         'this-week': { label: 'This Week', icon: CalendarRange },
//         'this-month': { label: 'This Month', icon: CalendarCheck },
//     };

//     // ===== COMPACT EVENT CARD =====
//     const EventCard = ({ event }: { event: EventData }) => {
//         const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
//         const status = getEventStatus(event);
//         const statusConfigItem = statusConfig[status];
//         const Icon = typeConfig.icon;

//         return (
//             <div
//                 onClick={() => handleViewEvent(event.id)}
//                 className="group bg-white rounded-xl border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
//             >
//                 <div className="p-4">
//                     {/* Top row: Title + Status + Delete */}
//                     <div className="flex items-start justify-between gap-3">
//                         <div className="flex items-center gap-2.5 min-w-0 flex-1">
//                             <div className={`p-1.5 rounded-lg ${typeConfig.bg} border ${typeConfig.border} shrink-0`}>
//                                 <Icon className={`w-3.5 h-3.5 ${typeConfig.color}`} />
//                             </div>
//                             <h4 className="font-medium text-sm text-slate-800 truncate">
//                                 {event.title}
//                             </h4>
//                         </div>
//                         <div className="flex items-center gap-2 shrink-0">
//                             <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusConfigItem.bg} ${statusConfigItem.color} border ${statusConfigItem.border} flex items-center gap-1`}>
//                                 <span className={`w-1 h-1 rounded-full ${statusConfigItem.dot}`} />
//                                 {statusConfigItem.label}
//                             </span>
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleDeleteEvent(event.id);
//                                 }}
//                                 className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
//                                 disabled={deletingId === event.id}
//                             >
//                                 <Trash2 className={`w-3.5 h-3.5 text-slate-400 hover:text-red-500 ${deletingId === event.id ? 'opacity-50' : ''}`} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Bottom row: Time + Address + Type */}
//                     <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
//                         <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3 text-slate-400" />
//                             {formatTime(event.startTime)} - {formatTime(event.endTime)}
//                         </span>
//                         {event.address && (
//                             <span className="flex items-center gap-1 truncate max-w-[140px]">
//                                 <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
//                                 <span className="truncate">{event.address}</span>
//                             </span>
//                         )}
//                         <span className="flex items-center gap-1 text-slate-400">
//                             <Calendar className="w-3 h-3" />
//                             {formatDate(event.date)}
//                         </span>
//                         <span className="text-slate-300">•</span>
//                         <span className="text-slate-400 flex items-center gap-0.5">
//                             {typeConfig.emoji} {typeConfig.label}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // ===== PAGINATION CONTROLS =====
//     const PaginationControls = ({
//         total,
//         shown,
//         onShowMore,
//         onShowLess,
//         isAllShown
//     }: {
//         total: number;
//         shown: number;
//         onShowMore: () => void;
//         onShowLess: () => void;
//         isAllShown: boolean;
//     }) => {
//         if (total <= ITEMS_PER_PAGE) return null;

//         return (
//             <div className="flex justify-center mt-5">
//                 {!isAllShown ? (
//                     <button
//                         onClick={onShowMore}
//                         className="px-5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
//                     >
//                         <ChevronsDown className="w-4 h-4" />
//                         Show More ({total - shown} left)
//                     </button>
//                 ) : (
//                     <button
//                         onClick={onShowLess}
//                         className="px-5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-all flex items-center gap-2"
//                     >
//                         <ChevronsUp className="w-4 h-4" />
//                         Show Less
//                     </button>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-slate-50">
//             <Header userData={userInfo} />

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                 {/* ===== SIMPLE HEADER ===== */}
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//                     <div>
//                         <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
//                             Calendar
//                         </h1>
//                         <p className="text-sm text-slate-500 mt-0.5">
//                             {events.length} events total
//                         </p>
//                     </div>
//                     <Button
//                         onClick={handleCreateEvent}
//                         variant="theme"
//                         icon={<Plus className="w-4 h-4" />}
//                         size="md"
//                     >
//                         New Event
//                     </Button>
//                 </div>

//                 {/* ===== MINIMAL STATS (Monochrome) ===== */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//                     {[
//                         { label: 'Total', value: eventStats.total },
//                         { label: 'Upcoming', value: eventStats.upcoming },
//                         { label: 'Today', value: eventStats.today },
//                         { label: 'Completed', value: eventStats.completed }
//                     ].map((stat, idx) => (
//                         <div key={idx} className="bg-white rounded-xl border border-slate-200/70 px-4 py-3 text-center">
//                             <p className="text-xl font-semibold text-slate-800">{stat.value}</p>
//                             <p className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* ===== FILTERS ===== */}
//                 <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-3 mb-6">
//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <div className="flex-1 relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Search events..."
//                                 value={searchTerm}
//                                 onChange={(e) => {
//                                     setSearchTerm(e.target.value);
//                                     setShowAllUpcoming(false);
//                                     setShowAllCompleted(false);
//                                 }}
//                                 className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-all text-sm bg-slate-50"
//                             />
//                         </div>
//                         <div className="flex flex-wrap gap-1.5">
//                             <button
//                                 onClick={() => {
//                                     setFilterType('all');
//                                     setShowAllUpcoming(false);
//                                     setShowAllCompleted(false);
//                                 }}
//                                 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === 'all'
//                                         ? 'bg-slate-800 text-white'
//                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                                     }`}
//                             >
//                                 All
//                             </button>
//                             {Object.entries(eventTypeConfig).map(([key, config]) => {
//                                 const Icon = config.icon;
//                                 return (
//                                     <button
//                                         key={key}
//                                         onClick={() => {
//                                             setFilterType(key);
//                                             setShowAllUpcoming(false);
//                                             setShowAllCompleted(false);
//                                         }}
//                                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${filterType === key
//                                                 ? 'bg-slate-800 text-white'
//                                                 : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                                             }`}
//                                     >
//                                         <Icon className="w-3 h-3" />
//                                         {config.label}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ===== MAIN GRID ===== */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Calendar */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm overflow-hidden sticky top-6">
//                             <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
//                                 <span className="font-medium text-sm text-slate-700">
//                                     {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                                 </span>
//                                 <div className="flex items-center gap-0.5">
//                                     <button
//                                         onClick={goToToday}
//                                         className="px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
//                                     >
//                                         Today
//                                     </button>
//                                     <button
//                                         onClick={goToPreviousMonth}
//                                         className="p-1.5 hover:bg-slate-100 rounded transition-colors"
//                                     >
//                                         <ChevronLeft className="w-4 h-4 text-slate-500" />
//                                     </button>
//                                     <button
//                                         onClick={goToNextMonth}
//                                         className="p-1.5 hover:bg-slate-100 rounded transition-colors"
//                                     >
//                                         <ChevronRight className="w-4 h-4 text-slate-500" />
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-7 gap-px bg-slate-100">
//                                 {weekDays.map((day, idx) => (
//                                     <div key={idx} className="bg-slate-50 py-1.5 text-center">
//                                         <span className="text-[10px] font-medium text-slate-400">{day}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="grid grid-cols-7 gap-px bg-slate-100">
//                                 {calendarDays.map((date, idx) => {
//                                     const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
//                                     const isToday = date && date.toDateString() === new Date().toDateString();
//                                     const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
//                                     const dayEvents = date ? getEventsForDate(date) : [];
//                                     const hasEvents = dayEvents.length > 0;

//                                     return (
//                                         <div
//                                             key={idx}
//                                             onClick={() => date && setSelectedDate(date)}
//                                             className={`
//                                                 min-h-[44px] bg-white p-1 transition-all cursor-pointer hover:bg-slate-50
//                                                 ${!isCurrentMonth && 'bg-slate-50/60'}
//                                                 ${isSelected && 'ring-1 ring-slate-400 ring-inset bg-slate-50'}
//                                                 ${isToday && !isSelected && 'bg-slate-100/50'}
//                                             `}
//                                         >
//                                             <div className="flex justify-between items-start">
//                                                 <span className={`
//                                                     text-[11px] font-medium inline-flex items-center justify-center w-5 h-5 rounded-full
//                                                     ${isToday ? 'bg-slate-800 text-white' : ''}
//                                                     ${!isToday && isCurrentMonth ? 'text-slate-600' : ''}
//                                                     ${!isCurrentMonth ? 'text-slate-300' : ''}
//                                                 `}>
//                                                     {date ? date.getDate() : ''}
//                                                 </span>
//                                                 {hasEvents && (
//                                                     <div className="flex gap-0.5 mt-0.5">
//                                                         {dayEvents.slice(0, 2).map((_, i) => (
//                                                             <div key={i} className="w-1 h-1 rounded-full bg-slate-400"></div>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Events Lists */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Upcoming */}
//                         <div id="upcoming-section" className="bg-white rounded-xl border border-slate-200/70 shadow-sm overflow-hidden">
//                             <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
//                                 <div className="flex items-center gap-2">
//                                     <h2 className="text-sm font-semibold text-slate-700">Upcoming</h2>
//                                     <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
//                                         {upcomingEvents.length}
//                                     </span>
//                                 </div>
//                                 <div className="flex gap-1">
//                                     {Object.entries(timeFilterConfig).map(([key, config]) => {
//                                         const Icon = config.icon;
//                                         const isActive = timeFilter === key;
//                                         return (
//                                             <button
//                                                 key={key}
//                                                 onClick={() => {
//                                                     setTimeFilter(key as TimeFilter);
//                                                     setShowAllUpcoming(false);
//                                                 }}
//                                                 className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 ${isActive
//                                                         ? 'bg-slate-800 text-white'
//                                                         : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
//                                                     }`}
//                                             >
//                                                 <Icon className="w-3 h-3" />
//                                                 {config.label}
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             </div>

//                             <div className="p-4">
//                                 {paginatedUpcoming.length > 0 ? (
//                                     <>
//                                         <div className="space-y-2">
//                                             {paginatedUpcoming.map(event => (
//                                                 <EventCard key={event.id} event={event} />
//                                             ))}
//                                         </div>
//                                         <PaginationControls
//                                             total={upcomingEvents.length}
//                                             shown={paginatedUpcoming.length}
//                                             onShowMore={handleShowMoreUpcoming}
//                                             onShowLess={handleShowLessUpcoming}
//                                             isAllShown={showAllUpcoming}
//                                         />
//                                     </>
//                                 ) : (
//                                     <div className="text-center py-8">
//                                         <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
//                                         <p className="text-sm text-slate-500">No upcoming events</p>
//                                         <p className="text-xs text-slate-400 mt-0.5">
//                                             No events scheduled for {timeFilterConfig[timeFilter].label.toLowerCase()}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Completed */}
//                         <div id="completed-section" className="bg-white rounded-xl border border-slate-200/70 shadow-sm overflow-hidden">
//                             <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
//                                 <div className="flex items-center gap-2">
//                                     <h2 className="text-sm font-semibold text-slate-700">Completed</h2>
//                                     <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
//                                         {completedEvents.length}
//                                     </span>
//                                 </div>
//                                 {completedEvents.length > ITEMS_PER_PAGE && (
//                                     <span className="text-[10px] text-slate-400">
//                                         Showing {Math.min(ITEMS_PER_PAGE, paginatedCompleted.length)} of {completedEvents.length}
//                                     </span>
//                                 )}
//                             </div>

//                             <div className="p-4">
//                                 {paginatedCompleted.length > 0 ? (
//                                     <>
//                                         <div className="space-y-2">
//                                             {paginatedCompleted.map(event => (
//                                                 <EventCard key={event.id} event={event} />
//                                             ))}
//                                         </div>
//                                         <PaginationControls
//                                             total={completedEvents.length}
//                                             shown={paginatedCompleted.length}
//                                             onShowMore={handleShowMoreCompleted}
//                                             onShowLess={handleShowLessCompleted}
//                                             isAllShown={showAllCompleted}
//                                         />
//                                     </>
//                                 ) : (
//                                     <div className="text-center py-8">
//                                         <CheckCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
//                                         <p className="text-sm text-slate-500">No completed events</p>
//                                         <p className="text-xs text-slate-400 mt-0.5">Completed events will appear here</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <DraggableButton onClick={handleCreateEvent} />
//             </main>
//         </div>
//     );
// }





'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import {
    Calendar, Clock, MapPin, Users, Home, DollarSign,
    ArrowLeft, Plus, Filter, Search, ChevronRight,
    PhoneCall, Mail, MessageSquare, CheckCircle,
    XCircle, Building, Key, Target, Zap,
    Bell, Star, TrendingUp, Eye, Grid, CalendarDays,
    ChevronDown, MoreVertical, Edit, Trash2,
    User, Sparkles, Crown, Bed, Bath,
    Check, X, AlertCircle, ExternalLink,
    Layers, HomeIcon, Briefcase, ChevronLeft,
    CalendarRange, CalendarCheck, CalendarX, CalendarPlus,
    ListFilter, Clock8, LayoutGrid, List,
    ArrowUpRight, ArrowDownRight, Circle,
    GripVertical, Menu, Sparkle, Gem,
    BarChart3, Activity, CalendarClock,
    ChevronsUp, ChevronsDown, Import
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import DraggableButton from "@/components/DraggableButton";
import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

interface UserInfo {
    uid: string;
    email?: string;
    name?: string;
    [key: string]: any;
}

interface ClientData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyType?: string;
    preferredLocations?: string;
    ownerUid?: string;
    agentUid?: string;
}

interface OwnerData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyAddress?: string;
    ownerUid?: string;
    agentUid?: string;
}

interface EventData {
    id: string;
    title: string;
    description: string;
    eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
    clientIds: string[];
    address: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
    reminderTime: string;
    agentUid: string;
    agentName: string;
    reminderSent: boolean;
    createdAt: string;
}

// Event type configuration - monochrome
const eventTypeConfig = {
    'property-viewing': {
        label: 'Viewing',
        icon: Eye,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        emoji: '🏠'
    },
    'client-meeting': {
        label: 'Meeting',
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        emoji: '🤝'
    },
    'closing-session': {
        label: 'Closing',
        icon: Key,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        emoji: '🔑'
    },
    'property-inspection': {
        label: 'Inspection',
        icon: Target,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        emoji: '🔍'
    },
    'follow-up-call': {
        label: 'Follow-up',
        icon: PhoneCall,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        emoji: '📞'
    }
};

const statusConfig = {
    'scheduled': {
        label: 'Scheduled',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        dot: 'bg-blue-500',
        border: 'border-blue-200'
    },
    'in-progress': {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        dot: 'bg-amber-500',
        border: 'border-amber-200'
    },
    'completed': {
        label: 'Completed',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        dot: 'bg-emerald-500',
        border: 'border-emerald-200'
    }
};

type TimeFilter = 'today' | 'tomorrow' | 'this-week' | 'this-month' | 'all';

const ITEMS_PER_PAGE = 6;

export default function CalendarEventsPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [events, setEvents] = useState<EventData[]>([]);
    const [clients, setClients] = useState<ClientData[]>([]);
    const [owners, setOwners] = useState<OwnerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const [showAllCompleted, setShowAllCompleted] = useState(false);

    const getEventStatus = useCallback((event: EventData) => {
        const now = new Date();
        const eventDate = new Date(`${event.date}T${event.startTime}`);
        const eventEndDate = new Date(`${event.date}T${event.endTime}`);

        if (eventEndDate < now) return 'completed';
        if (eventDate <= now && eventEndDate >= now) return 'in-progress';
        return 'scheduled';
    }, []);

    const fetchClients = useCallback(async (uid: string) => {
        try {
            const clientsData: any = await getData(`clients/${uid}`);
            if (clientsData) {
                const clientsArray = Object.entries(clientsData)
                    .map(([id, data]: [string, any]) => ({ id, ...data }))
                    .filter((client) => client.agentUid === uid || client.ownerUid === uid);
                setClients(clientsArray);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }, []);

    const fetchOwners = useCallback(async (uid: string) => {
        try {
            const ownersData: any = await getData(`owners/${uid}`);
            if (ownersData) {
                const ownersArray = Object.entries(ownersData)
                    .map(([id, data]: [string, any]) => ({ id, ...data }))
                    .filter((owner) => owner.agentUid === uid);
                setOwners(ownersArray);
            }
        } catch (error) {
            console.error('Error fetching owners:', error);
        }
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

                const storedUser = localStorage.getItem('userInfo');
                let userData;

                if (storedUser) {
                    userData = JSON.parse(storedUser);
                } else {
                    userData = await getData(`users/${user.uid}`);
                    if (userData) {
                        localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
                    }
                }

                if (userData) {
                    setUserInfo({ uid: user.uid, ...userData });
                    await Promise.all([
                        fetchEvents(user.uid),
                        fetchClients(user.uid),
                        fetchOwners(user.uid)
                    ]);
                }
            } catch (err) {
                console.error('Authentication error:', err);
                message.error('Error occurred during authentication');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, fetchClients, fetchOwners]);

    const fetchEvents = async (uid: string) => {
        try {
            const eventsData: any = await getData(`events/${uid}`);
            if (eventsData) {
                let eventsArray: EventData[] = Object.entries(eventsData).map(([id, value]: any) => ({
                    id,
                    ...value
                }));
                eventsArray = eventsArray.reverse();
                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            message.error('Failed to fetch events');
            setEvents([]);
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
        setSelectedDate(new Date());
        setTimeFilter('today');
        setShowAllUpcoming(false);
        setShowAllCompleted(false);
    };

    const formatDateForComparison = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getEventsForDate = useCallback((date: Date) => {
        if (!date) return [];
        const dateString = formatDateForComparison(date);
        return events.filter(event => event.date === dateString);
    }, [events]);

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    const formatTime = useCallback((timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    const filteredEvents = useMemo(() => {
        let filtered = events;

        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.address?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(event => event.eventType === filterType);
        }

        return filtered;
    }, [events, searchTerm, filterType]);

    const getDateRange = useCallback((filter: TimeFilter): { start: Date; end: Date } => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        switch (filter) {
            case 'today':
                return {
                    start: today,
                    end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'tomorrow':
                return {
                    start: tomorrow,
                    end: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'this-week': {
                const start = new Date(today);
                start.setDate(today.getDate() - today.getDay());
                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
            case 'this-month': {
                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                return { start, end };
            }
            case 'all':
            default:
                return {
                    start: new Date(0),
                    end: new Date(8640000000000000)
                };
        }
    }, []);

    const upcomingEvents = useMemo(() => {
        const range = getDateRange(timeFilter);
        return filteredEvents
            .filter(event => {
                const status = getEventStatus(event);
                if (status === 'completed') return false;
                const eventDate = new Date(event.date);
                return eventDate >= range.start && eventDate <= range.end;
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateA.getTime() - dateB.getTime();
            });
    }, [filteredEvents, timeFilter, getDateRange, getEventStatus]);

    const completedEvents = useMemo(() => {
        return filteredEvents
            .filter(event => getEventStatus(event) === 'completed')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [filteredEvents, getEventStatus]);

    const paginatedUpcoming = useMemo(() => {
        if (showAllUpcoming) return upcomingEvents;
        return upcomingEvents.slice(0, ITEMS_PER_PAGE);
    }, [upcomingEvents, showAllUpcoming]);

    const paginatedCompleted = useMemo(() => {
        if (showAllCompleted) return completedEvents;
        return completedEvents.slice(0, ITEMS_PER_PAGE);
    }, [completedEvents, showAllCompleted]);

    const eventStats = useMemo(() => ({
        total: events.length,
        upcoming: filteredEvents.filter(e => getEventStatus(e) !== 'completed').length,
        completed: completedEvents.length,
        today: filteredEvents.filter(e => e.date === formatDateForComparison(new Date())).length
    }), [events, filteredEvents, completedEvents, getEventStatus]);

    const handleDeleteEvent = async (eventId: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        setDeletingId(eventId);
        try {
            await deleleData(`events/${userInfo?.uid}/${eventId}`);
            setEvents(events.filter(event => event.id !== eventId));
            message.success('Event deleted successfully');
        } catch (error) {
            console.error("Delete error:", error);
            message.error('Failed to delete event');
        } finally {
            setDeletingId(null);
        }
    };

    const handleViewEvent = (eventId: string) => {
        router.push(`/realstate/${userInfo?.uid}/events/${eventId}`);
    };

    const handleCreateEvent = () => {
        router.push(`/realstate/${userInfo?.uid}/events/addevent`);
    };

    const handleShowMoreUpcoming = () => {
        setShowAllUpcoming(true);
    };

    const handleShowLessUpcoming = () => {
        setShowAllUpcoming(false);
        const element = document.getElementById('upcoming-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleShowMoreCompleted = () => {
        setShowAllCompleted(true);
    };

    const handleShowLessCompleted = () => {
        setShowAllCompleted(false);
        const element = document.getElementById('completed-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) {
        return <Loader />;
    }

    const calendarDays = getDaysInMonth(currentMonth);

    const timeFilterConfig: Record<TimeFilter, { label: string; icon: any }> = {
        'today': { label: 'Today', icon: Clock },
        'tomorrow': { label: 'Tomorrow', icon: CalendarPlus },
        'this-week': { label: 'This Week', icon: CalendarRange },
        'this-month': { label: 'This Month', icon: CalendarCheck },
        'all': { label: 'All', icon: ListFilter },
    };

    const EventCard = ({ event }: { event: EventData }) => {
        const typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig];
        const status = getEventStatus(event);
        const statusConfigItem = statusConfig[status];
        const Icon = typeConfig.icon;

        return (
            <div
                onClick={() => handleViewEvent(event.id)}
                className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className={`p-1.5 rounded-lg ${typeConfig.bg} border ${typeConfig.border} shrink-0`}>
                                <Icon className={`w-3.5 h-3.5 ${typeConfig.color}`} />
                            </div>
                            <h4 className="font-medium text-sm text-slate-800 truncate">
                                {event.title}
                            </h4>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusConfigItem.bg} ${statusConfigItem.color} border ${statusConfigItem.border} flex items-center gap-1`}>
                                <span className={`w-1 h-1 rounded-full ${statusConfigItem.dot}`} />
                                {statusConfigItem.label}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-50 rounded transition-all"
                                disabled={deletingId === event.id}
                            >
                                <Trash2 className={`w-3.5 h-3.5 text-slate-400 hover:text-rose-500 ${deletingId === event.id ? 'opacity-50' : ''}`} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </span>
                        {event.address && (
                            <span className="flex items-center gap-1 truncate max-w-[140px]">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{event.address}</span>
                            </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.date)}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 flex items-center gap-0.5">
                            {typeConfig.emoji} {typeConfig.label}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const PaginationControls = ({
        total,
        shown,
        onShowMore,
        onShowLess,
        isAllShown
    }: {
        total: number;
        shown: number;
        onShowMore: () => void;
        onShowLess: () => void;
        isAllShown: boolean;
    }) => {
        if (total <= ITEMS_PER_PAGE) return null;

        return (
            <div className="flex justify-center mt-5">
                {!isAllShown ? (
                    <button
                        onClick={onShowMore}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <ChevronsDown className="w-4 h-4" />
                        Show More ({total - shown} left)
                    </button>
                ) : (
                    <button
                        onClick={onShowLess}
                        className="px-5 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                        <ChevronsUp className="w-4 h-4" />
                        Show Less
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={userInfo} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Calendar Events</span>
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                        Event {''}
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Calendar
                                        </span>
                                    </h1>
                                    <p className="text-slate-500 mt-2 max-w-xl">
                                        View and manage all your property viewings, client meetings, and appointments
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-5 py-4 border border-indigo-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-indigo-600" />
                                        <span className="text-sm font-medium text-slate-700">Events Overview</span>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600">{events.length} Total</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-800">{eventStats.upcoming} Upcoming</div>
                                <div className="text-sm text-slate-500 mt-1">Scheduled events</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Total', value: eventStats.total },
                        { label: 'Upcoming', value: eventStats.upcoming },
                        { label: 'Today', value: eventStats.today },
                        { label: 'Completed', value: eventStats.completed }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
                            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Event"
                                icon={<Layers className="w-4 h-4" />}
                                onClick={handleCreateEvent}
                                variant="theme2"
                                size="md"
                            />
                            <Button
                                label="Import Events"
                                icon={<Import className="w-4 h-4" />}
                                onClick={handleCreateEvent}
                                variant="theme"
                                size="md"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <input
                                type="text"
                                placeholder="Search events by title or address"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowAllUpcoming(false);
                                    setShowAllCompleted(false);
                                }}
                                className="md:min-w-80 border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Event Type Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => {
                                setFilterType('all');
                                setShowAllUpcoming(false);
                                setShowAllCompleted(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === 'all'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            All Events
                            <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                                {events.length}
                            </span>
                        </button>
                        {Object.entries(eventTypeConfig).map(([key, config]) => {
                            const Icon = config.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setFilterType(key);
                                        setShowAllUpcoming(false);
                                        setShowAllCompleted(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filterType === key
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {config.label}
                                    <span className="ml-0.5 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                                        {events.filter(e => e.eventType === key).length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Calendar and Events Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                <span className="font-medium text-sm text-slate-700">
                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </span>
                                <div className="flex items-center gap-0.5">
                                    <button
                                        onClick={goToToday}
                                        className="px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-slate-500" />
                                    </button>
                                    <button
                                        onClick={goToNextMonth}
                                        className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-slate-100">
                                {weekDays.map((day, idx) => (
                                    <div key={idx} className="bg-slate-50 py-1.5 text-center">
                                        <span className="text-[10px] font-medium text-slate-400">{day}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-slate-100">
                                {calendarDays.map((date, idx) => {
                                    const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth();
                                    const isToday = date && date.toDateString() === new Date().toDateString();
                                    const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
                                    const dayEvents = date ? getEventsForDate(date) : [];
                                    const hasEvents = dayEvents.length > 0;

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => date && setSelectedDate(date)}
                                            className={`
                                                min-h-[44px] bg-white p-1 transition-all cursor-pointer hover:bg-indigo-50
                                                ${!isCurrentMonth && 'bg-slate-50/60'}
                                                ${isSelected && 'ring-1 ring-indigo-500 ring-inset bg-indigo-50'}
                                                ${isToday && !isSelected && 'bg-indigo-50/50'}
                                            `}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`
                                                    text-[11px] font-medium inline-flex items-center justify-center w-5 h-5 rounded-full
                                                    ${isToday ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : ''}
                                                    ${!isToday && isCurrentMonth ? 'text-slate-600' : ''}
                                                    ${!isCurrentMonth ? 'text-slate-300' : ''}
                                                `}>
                                                    {date ? date.getDate() : ''}
                                                </span>
                                                {hasEvents && (
                                                    <div className="flex gap-0.5 mt-0.5">
                                                        {dayEvents.slice(0, 2).map((_, i) => (
                                                            <div key={i} className="w-1 h-1 rounded-full bg-indigo-400"></div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Events Lists */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Upcoming */}
                        <div id="upcoming-section" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-slate-700">Upcoming</h2>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {upcomingEvents.length}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {Object.entries(timeFilterConfig).map(([key, config]) => {
                                        const Icon = config.icon;
                                        const isActive = timeFilter === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setTimeFilter(key as TimeFilter);
                                                    setShowAllUpcoming(false);
                                                }}
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 ${isActive
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                    }`}
                                            >
                                                <Icon className="w-3 h-3" />
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4">
                                {paginatedUpcoming.length > 0 ? (
                                    <>
                                        <div className="space-y-2">
                                            {paginatedUpcoming.map(event => (
                                                <EventCard key={event.id} event={event} />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            total={upcomingEvents.length}
                                            shown={paginatedUpcoming.length}
                                            onShowMore={handleShowMoreUpcoming}
                                            onShowLess={handleShowLessUpcoming}
                                            isAllShown={showAllUpcoming}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No upcoming events</p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {timeFilter === 'all' ? 'No events scheduled' : `No events for ${timeFilterConfig[timeFilter].label.toLowerCase()}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Completed */}
                        <div id="completed-section" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-slate-700">Completed</h2>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {completedEvents.length}
                                    </span>
                                </div>
                                {completedEvents.length > ITEMS_PER_PAGE && (
                                    <span className="text-[10px] text-slate-400">
                                        Showing {Math.min(ITEMS_PER_PAGE, paginatedCompleted.length)} of {completedEvents.length}
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                {paginatedCompleted.length > 0 ? (
                                    <>
                                        <div className="space-y-2">
                                            {paginatedCompleted.map(event => (
                                                <EventCard key={event.id} event={event} />
                                            ))}
                                        </div>
                                        <PaginationControls
                                            total={completedEvents.length}
                                            shown={paginatedCompleted.length}
                                            onShowMore={handleShowMoreCompleted}
                                            onShowLess={handleShowLessCompleted}
                                            isAllShown={showAllCompleted}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <CheckCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No completed events</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Completed events will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DraggableButton onClick={handleCreateEvent} />
            </main>
        </div>
    );
}