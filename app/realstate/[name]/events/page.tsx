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
//     Layers, HomeIcon, Briefcase
// } from "lucide-react";
// import Header from "@/components/Header";
// import Button from "@/components/Button";
// import Loader from "@/components/Loader";
// import DraggableButton from "@/components/DraggableButton";
// import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

// const ListIcon = ({ className }: { className?: string }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
// );

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
//     clientIds: string[]; // Can contain both client and owner IDs
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

// interface AttendeeInfo {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     type: 'client' | 'owner';
//     propertyInfo?: string;
// }

// export default function ElegantEventsPage() {
//     const router = useRouter();
//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//     const [events, setEvents] = useState<EventData[]>([]);
//     const [clients, setClients] = useState<ClientData[]>([]);
//     const [owners, setOwners] = useState<OwnerData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState<string>('all');
//     const [filterStatus, setFilterStatus] = useState<string>('all');
//     const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//     const [deletingId, setDeletingId] = useState<string | null>(null);

//     // Event type configuration
//     const eventTypeConfig = useMemo(() => ({
//         'property-viewing': {
//             label: 'Property Viewing',
//             icon: <Eye className="w-4 h-4" />,
//             color: 'text-blue-600',
//             bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
//             border: 'border-blue-200'
//         },
//         'client-meeting': {
//             label: 'Client Meeting',
//             icon: <Users className="w-4 h-4" />,
//             color: 'text-purple-600',
//             bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
//             border: 'border-purple-200'
//         },
//         'closing-session': {
//             label: 'Closing Session',
//             icon: <Key className="w-4 h-4" />,
//             color: 'text-green-600',
//             bg: 'bg-gradient-to-br from-green-50 to-green-100',
//             border: 'border-green-200'
//         },
//         'property-inspection': {
//             label: 'Property Inspection',
//             icon: <Target className="w-4 h-4" />,
//             color: 'text-amber-600',
//             bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
//             border: 'border-amber-200'
//         },
//         'follow-up-call': {
//             label: 'Follow-up Call',
//             icon: <PhoneCall className="w-4 h-4" />,
//             color: 'text-indigo-600',
//             bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
//             border: 'border-indigo-200'
//         }
//     }), []);

//     // Get event status
//     const getEventStatus = useCallback((event: EventData) => {
//         const now = new Date();
//         const eventDate = new Date(`${event.date}T${event.startTime}`);
//         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

//         if (eventEndDate < now) {
//             return 'completed';
//         } else if (eventDate <= now && eventEndDate >= now) {
//             return 'in-progress';
//         } else {
//             return 'scheduled';
//         }
//     }, []);

//     // Status configuration
//     const statusConfig = useMemo(() => ({
//         'scheduled': {
//             label: 'Scheduled',
//             color: 'text-blue-600',
//             bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
//             border: 'border-blue-200',
//             icon: <Calendar className="w-3 h-3" />
//         },
//         'in-progress': {
//             label: 'In Progress',
//             color: 'text-amber-600',
//             bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
//             border: 'border-amber-200',
//             icon: <AlertCircle className="w-3 h-3" />
//         },
//         'completed': {
//             label: 'Completed',
//             color: 'text-green-600',
//             bg: 'bg-gradient-to-r from-green-50 to-green-100',
//             border: 'border-green-200',
//             icon: <CheckCircle className="w-3 h-3" />
//         }
//     }), []);

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

//     // Get attendee info by ID (works for both clients and owners)
//     const getAttendeeInfo = useCallback((id: string): AttendeeInfo | null => {
//         const client = clients.find(c => c.id === id);
//         if (client) {
//             return {
//                 ...client,
//                 type: 'client',
//                 propertyInfo: client.propertyType
//             };
//         }
//         const owner = owners.find(o => o.id === id);
//         if (owner) {
//             return {
//                 ...owner,
//                 type: 'owner',
//                 propertyInfo: owner.propertyAddress
//             };
//         }
//         return null;
//     }, [clients, owners]);

//     // Get formatted attendees string for table
//     const getAttendeesDisplay = useCallback((clientIds: string[]) => {
//         if (!clientIds || clientIds.length === 0) {
//             return { text: 'No attendees', hasMultiple: false, attendees: [] };
//         }

//         const attendees = clientIds.map(id => getAttendeeInfo(id)).filter(Boolean) as AttendeeInfo[];

//         if (attendees.length === 0) {
//             return { text: 'Unknown attendees', hasMultiple: false, attendees: [] };
//         }

//         const clientCount = attendees.filter(a => a.type === 'client').length;
//         const ownerCount = attendees.filter(a => a.type === 'owner').length;

//         let text = '';
//         if (clientCount > 0 && ownerCount > 0) {
//             text = `${clientCount} client${clientCount > 1 ? 's' : ''}, ${ownerCount} owner${ownerCount > 1 ? 's' : ''}`;
//         } else if (clientCount > 0) {
//             text = `${clientCount} client${clientCount > 1 ? 's' : ''}`;
//         } else if (ownerCount > 0) {
//             text = `${ownerCount} owner${ownerCount > 1 ? 's' : ''}`;
//         }

//         return {
//             text,
//             hasMultiple: attendees.length > 1,
//             attendees
//         };
//     }, [getAttendeeInfo]);

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
//                     // Fetch all data in parallel
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

//     // Format helpers
//     const formatDate = useCallback((dateString: string) => {
//         const date = new Date(dateString);
//         const today = new Date();
//         const tomorrow = new Date(today);
//         tomorrow.setDate(tomorrow.getDate() + 1);

//         if (date.toDateString() === today.toDateString()) {
//             return 'Today';
//         } else if (date.toDateString() === tomorrow.toDateString()) {
//             return 'Tomorrow';
//         } else {
//             return date.toLocaleDateString('en-US', {
//                 weekday: 'short',
//                 month: 'short',
//                 day: 'numeric'
//             });
//         }
//     }, []);

//     const formatTime = useCallback((timeString: string) => {
//         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//         });
//     }, []);

//     // Filter events
//     const filteredEvents = useMemo(() => {
//         return events.filter(event => {
//             const matchesSearch = searchTerm === '' ||
//                 event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 event.address?.toLowerCase().includes(searchTerm.toLowerCase());

//             const matchesType = filterType === 'all' || event.eventType === filterType;
//             const eventStatus = getEventStatus(event);
//             const matchesStatus = filterStatus === 'all' || eventStatus === filterStatus;

//             return matchesSearch && matchesType && matchesStatus;
//         }).sort((a, b) => {
//             const dateA = new Date(`${a.date}T${a.startTime}`);
//             const dateB = new Date(`${b.date}T${b.startTime}`);
//             return dateA.getTime() - dateB.getTime();
//         });
//     }, [events, searchTerm, filterType, filterStatus, getEventStatus]);

//     // Event statistics
//     const eventStats = useMemo(() => ({
//         total: events.length,
//         upcoming: events.filter(e => {
//             const eventDate = new Date(`${e.date}T${e.startTime}`);
//             return eventDate > new Date();
//         }).length,
//         today: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
//         completed: events.filter(e => getEventStatus(e) === 'completed').length
//     }), [events, getEventStatus]);

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

//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
//             <Header userData={userInfo} />

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
//                             <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
//                             <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Events Management</span>
//                             <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
//                         </div>

//                         <div className="space-y-3">
//                             <div>
//                                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                                     Schedule & {" "}
//                                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                         Events
//                                     </span>
//                                 </h1>
//                                 <p className="text-gray-600 mt-2 max-w-xl">
//                                     Manage property viewings, client meetings, and real estate appointments
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Overview */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
//                     {[
//                         { title: 'Total Events', value: eventStats.total, icon: <Calendar className="w-5 h-5 text-purple-600" />, color: 'purple' },
//                         { title: 'Upcoming', value: eventStats.upcoming, icon: <TrendingUp className="w-5 h-5 text-blue-600" />, color: 'blue' },
//                         { title: 'Today', value: eventStats.today, icon: <Clock className="w-5 h-5 text-green-600" />, color: 'green' },
//                         { title: 'Completed', value: eventStats.completed, icon: <CheckCircle className="w-5 h-5 text-amber-600" />, color: 'amber' }
//                     ].map((stat, idx) => (
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

//                 {/* Search and Filter Bar */}
//                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-6">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                         <div className="flex flex-wrap gap-3">
//                             <Button label="Add Event" onClick={handleCreateEvent} variant="theme" icon={<Layers className="w-4 h-4" />} size="md" />
//                             <Button label={viewMode === 'grid' ? 'List View' : 'Grid View'} onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} variant="theme2" icon={viewMode === 'grid' ? <ListIcon className="w-4 h-4" /> : <Grid className="w-4 h-4" />} size="md" />
//                         </div>
//                         <div className="relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                             <input type="text" placeholder="Search by events or address" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors md:min-w-80" />
//                         </div>
//                     </div>

//                     {/* Filter Buttons */}
//                     <div className="flex flex-wrap gap-2 mt-4">
//                         {[
//                             { id: 'all', label: 'All Types', count: events.length },
//                             ...Object.entries(eventTypeConfig).map(([key, config]) => ({
//                                 id: key,
//                                 label: config.label,
//                                 count: events.filter(e => e.eventType === key).length
//                             }))
//                         ].map((filter) => (
//                             <button key={filter.id} onClick={() => setFilterType(filter.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === filter.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
//                                 {filter.label}
//                                 <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${filterType === filter.id ? 'bg-white/20' : 'bg-white'}`}>{filter.count}</span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Events Table View */}
//                 <div className="mt-6">
//                     <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-xl font-bold text-gray-900">All Events</h2>
//                         <div className="text-sm text-gray-600">Showing {filteredEvents.length} of {events.length} events</div>
//                     </div>

//                     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Event</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Type</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Status</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Date & Time</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Address</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Attendees</th>
//                                         <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {filteredEvents.length > 0 ? (
//                                         filteredEvents.map((event) => {
//                                             const typeConfig = eventTypeConfig[event.eventType];
//                                             const eventStatus = getEventStatus(event);
//                                             const statusConfigItem = statusConfig[eventStatus];
//                                             const attendeesDisplay = getAttendeesDisplay(event.clientIds);

//                                             return (
//                                                 <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewEvent(event.id)}>
//                                                     <td className="px-4 py-3 font-medium text-gray-900">{event.title}</td>
//                                                     <td className="px-4 py-3">
//                                                         <div className="flex items-center gap-2">
//                                                             <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
//                                                                 <div className={typeConfig.color}>{typeConfig.icon}</div>
//                                                             </div>
//                                                             <span className="text-sm text-gray-700">{typeConfig.label}</span>
//                                                         </div>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfigItem.bg} ${statusConfigItem.color}`}>
//                                                             {statusConfigItem.label}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <div className="text-sm text-gray-700">
//                                                             {formatDate(event.date)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
//                                                         </div>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <span className="text-sm text-gray-700 line-clamp-1 max-w-xs">{event.address}</span>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         {attendeesDisplay.attendees.length > 0 ? (
//                                                             <div className="flex flex-col gap-1">
//                                                                 <span className="text-sm text-gray-700 font-medium">
//                                                                     {attendeesDisplay.text}
//                                                                 </span>
//                                                                 {attendeesDisplay.hasMultiple && (
//                                                                     <div className="flex -space-x-2">
//                                                                         {attendeesDisplay.attendees.slice(0, 3).map((attendee, idx) => (
//                                                                             <div key={attendee.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${attendee.type === 'client' ? 'bg-purple-500' : 'bg-amber-500'} ring-2 ring-white`} title={`${attendee.firstName} ${attendee.lastName} (${attendee.type === 'client' ? 'Client' : 'Owner'})`}>
//                                                                                 {attendee.firstName?.charAt(0)}{attendee.lastName?.charAt(0)}
//                                                                             </div>
//                                                                         ))}
//                                                                         {attendeesDisplay.attendees.length > 3 && (
//                                                                             <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 ring-2 ring-white">
//                                                                                 +{attendeesDisplay.attendees.length - 3}
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 )}
//                                                             </div>
//                                                         ) : (
//                                                             <span className="text-sm text-gray-400">No attendees</span>
//                                                         )}
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" disabled={deletingId === event.id}>
//                                                             <Trash2 className={`h-4 w-4 ${deletingId === event.id ? 'opacity-50' : ''}`} />
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })
//                                     ) : (
//                                         <tr>
//                                             <td colSpan={7} className="p-8 text-center">
//                                                 <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                                 <p className="text-gray-600">No events found</p>
//                                                 <p className="text-sm text-gray-500 mt-2">Try changing your search or filters</p>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
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
    Layers, HomeIcon, Briefcase, ChevronLeft
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import DraggableButton from "@/components/DraggableButton";
import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";

const ListIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

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

interface AttendeeInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    type: 'client' | 'owner';
    propertyInfo?: string;
}

// Event type configuration
const eventTypeConfig = {
    'property-viewing': {
        label: 'Property Viewing',
        icon: <Eye className="w-4 h-4" />,
        color: 'text-blue-600',
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-200'
    },
    'client-meeting': {
        label: 'Client Meeting',
        icon: <Users className="w-4 h-4" />,
        color: 'text-purple-600',
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
        border: 'border-purple-200'
    },
    'closing-session': {
        label: 'Closing Session',
        icon: <Key className="w-4 h-4" />,
        color: 'text-green-600',
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
        border: 'border-green-200'
    },
    'property-inspection': {
        label: 'Property Inspection',
        icon: <Target className="w-4 h-4" />,
        color: 'text-amber-600',
        bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
        border: 'border-amber-200'
    },
    'follow-up-call': {
        label: 'Follow-up Call',
        icon: <PhoneCall className="w-4 h-4" />,
        color: 'text-indigo-600',
        bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
        border: 'border-indigo-200'
    }
};

// Status configuration
const statusConfig = {
    'scheduled': {
        label: 'Scheduled',
        color: 'text-blue-600',
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: <Calendar className="w-3 h-3" />
    },
    'in-progress': {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
        border: 'border-amber-200',
        icon: <AlertCircle className="w-3 h-3" />
    },
    'completed': {
        label: 'Completed',
        color: 'text-green-600',
        bg: 'bg-gradient-to-r from-green-50 to-green-100',
        border: 'border-green-200',
        icon: <CheckCircle className="w-3 h-3" />
    }
};

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

    // Get event status
    const getEventStatus = useCallback((event: EventData) => {
        const now = new Date();
        const eventDate = new Date(`${event.date}T${event.startTime}`);
        const eventEndDate = new Date(`${event.date}T${event.endTime}`);

        if (eventEndDate < now) {
            return 'completed';
        } else if (eventDate <= now && eventEndDate >= now) {
            return 'in-progress';
        } else {
            return 'scheduled';
        }
    }, []);

    // Fetch clients and owners
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

    // Get attendee info by ID
    const getAttendeeInfo = useCallback((id: string): AttendeeInfo | null => {
        const client = clients.find(c => c.id === id);
        if (client) {
            return {
                ...client,
                type: 'client',
                propertyInfo: client.propertyType
            };
        }
        const owner = owners.find(o => o.id === id);
        if (owner) {
            return {
                ...owner,
                type: 'owner',
                propertyInfo: owner.propertyAddress
            };
        }
        return null;
    }, [clients, owners]);

    // Load all data
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

    // Calendar helpers
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

        const days: (Date | null)[] = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

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
    };

    // Get events for a specific date
    const getEventsForDate = (date: Date) => {
        if (!date) return [];
        const dateString = date.toISOString().split('T')[0];
        return events.filter(event => event.date === dateString);
    };

    // Events for selected date
    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    // Format helpers
    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    }, []);

    const formatTime = useCallback((timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    // Event statistics
    const eventStats = useMemo(() => ({
        total: events.length,
        upcoming: events.filter(e => {
            const eventDate = new Date(`${e.date}T${e.startTime}`);
            return eventDate > new Date();
        }).length,
        today: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
        completed: events.filter(e => getEventStatus(e) === 'completed').length
    }), [events, getEventStatus]);

    // Handlers
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

    if (loading) {
        return <Loader />;
    }

    const calendarDays = getDaysInMonth(currentMonth);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Calendar Events</span>
                            <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Event {" "}
                                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Calendar
                                    </span>
                                </h1>
                                <p className="text-gray-600 mt-2 max-w-xl">
                                    View and manage all your property viewings, client meetings, and appointments in a beautiful calendar interface
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                    {[
                        { title: 'Total Events', value: eventStats.total, icon: <Calendar className="w-5 h-5 text-purple-600" />, color: 'purple' },
                        { title: 'Upcoming', value: eventStats.upcoming, icon: <TrendingUp className="w-5 h-5 text-blue-600" />, color: 'blue' },
                        { title: 'Today', value: eventStats.today, icon: <Clock className="w-5 h-5 text-green-600" />, color: 'green' },
                        { title: 'Completed', value: eventStats.completed, icon: <CheckCircle className="w-5 h-5 text-amber-600" />, color: 'amber' }
                    ].map((stat, idx) => (
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

                {/* Calendar and Events Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Calendar Header */}
                            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-purple-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={goToToday}
                                            variant="secondary"
                                            size="sm"
                                            className="px-3 py-1.5 text-sm"
                                        >
                                            Today
                                        </Button>
                                        <button
                                            onClick={goToPreviousMonth}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={goToNextMonth}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Week Days Header */}
                            <div className="grid grid-cols-7 gap-px bg-gray-200">
                                {weekDays.map((day, idx) => (
                                    <div key={idx} className="bg-gray-50 py-3 text-center">
                                        <span className="text-sm font-medium text-gray-600">{day}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-px bg-gray-200">
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
                                                min-h-[100px] bg-white p-2 transition-all cursor-pointer hover:bg-purple-50/50
                                                ${!isCurrentMonth && 'bg-gray-50/80'}
                                                ${isSelected && 'ring-2 ring-purple-500 ring-inset'}
                                            `}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`
                                                    text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full
                                                    ${isToday ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : ''}
                                                    ${!isToday && isCurrentMonth ? 'text-gray-700' : ''}
                                                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                                                `}>
                                                    {date ? date.getDate() : ''}
                                                </span>
                                                {hasEvents && (
                                                    <div className="flex gap-0.5">
                                                        {dayEvents.slice(0, 3).map((_, i) => (
                                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-1 space-y-1">
                                                {dayEvents.slice(0, 2).map((event) => {
                                                    const typeConfig = eventTypeConfig[event.eventType];
                                                    return (
                                                        <div
                                                            key={event.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleViewEvent(event.id);
                                                            }}
                                                            className="text-xs p-1 rounded-md truncate bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                                                            title={event.title}
                                                        >
                                                            {event.title.length > 12 ? event.title.slice(0, 10) + '...' : event.title}
                                                        </div>
                                                    );
                                                })}
                                                {dayEvents.length > 2 && (
                                                    <div className="text-xs text-gray-500 pl-1">
                                                        +{dayEvents.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Events List Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {selectedDate ? formatDate(selectedDate.toISOString().split('T')[0]) : 'No Date Selected'}
                                        </h2>
                                    </div>
                                    <Button
                                        onClick={handleCreateEvent}
                                        variant="theme"
                                        size="sm"
                                        icon={<Plus className="w-4 h-4" />}
                                        className="px-3 py-1.5 text-sm"
                                    >
                                        Add Event
                                    </Button>
                                </div>
                                {selectedDate && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px]">
                                {selectedDateEvents.length > 0 ? (
                                    selectedDateEvents.map((event) => {
                                        const typeConfig = eventTypeConfig[event.eventType];
                                        const eventStatus = getEventStatus(event);
                                        const status = statusConfig[eventStatus];

                                        return (
                                            <div
                                                key={event.id}
                                                onClick={() => handleViewEvent(event.id)}
                                                className="group bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-purple-200"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <div className={`p-1.5 rounded-lg ${typeConfig.bg}`}>
                                                            <div className={typeConfig.color}>{typeConfig.icon}</div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-medium text-gray-900 text-sm">
                                                                {event.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Clock className="w-3 h-3 text-gray-400" />
                                                                <span className="text-xs text-gray-600">
                                                                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                                                </span>
                                                            </div>
                                                            {event.address && (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <MapPin className="w-3 h-3 text-gray-400" />
                                                                    <span className="text-xs text-gray-500 truncate">
                                                                        {event.address}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                                                            {status.label}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteEvent(event.id);
                                                            }}
                                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                                                            disabled={deletingId === event.id}
                                                        >
                                                            <Trash2 className={`h-3.5 w-3.5 text-red-500 ${deletingId === event.id ? 'opacity-50' : ''}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12">
                                        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No events for this day</p>
                                        <Button
                                            onClick={handleCreateEvent}
                                            variant="theme2"
                                            size="sm"
                                            className="mt-4"
                                            icon={<Plus className="w-4 h-4" />}
                                        >
                                            Add Event
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Upcoming Events Summary */}
                            {events.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date()).length > 0 && (
                                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-purple-600" />
                                        Upcoming Events
                                    </h3>
                                    <div className="space-y-2">
                                        {events
                                            .filter(e => new Date(`${e.date}T${e.startTime}`) > new Date())
                                            .sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime())
                                            .slice(0, 3)
                                            .map(event => (
                                                <div key={event.id} className="flex items-center gap-2 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                                    <span className="text-gray-600">{formatDate(event.date)}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-700 truncate flex-1">{event.title}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DraggableButton onClick={handleCreateEvent} />
            </main>
        </div>
    );
}