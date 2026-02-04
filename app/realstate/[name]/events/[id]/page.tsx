// // 'use client';

// // import { useRouter, useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { message } from "antd";
// // import {
// //     Calendar, Clock, MapPin, Users, PhoneCall, Mail,
// //     MessageSquare, Edit, ArrowLeft, MoreVertical,
// //     Eye, Target, Key, Building, ChevronRight,
// //     CheckCircle, AlertCircle, ExternalLink,
// //     Copy, Share2, Phone, Home, User,
// //     Printer, Bell, Download
// // } from "lucide-react";
// // import Header from "@/components/Header";
// // import Loader from "@/components/Loader";
// // import { getData, updateData } from "@/FBConfig/fbFunctions";

// // interface UserInfo {
// //     uid: string;
// //     name?: string;
// //     email?: string;
// // }

// // interface ClientDetail {
// //     id: string;
// //     name: string;
// //     email: string;
// //     phone: string;
// // }

// // interface EventData {
// //     id: string;
// //     title: string;
// //     description: string;
// //     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
// //     clientIds: string[];
// //     clientDetails?: ClientDetail[];
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

// // export default function EventDetailPage() {
// //     const router = useRouter();
// //     const params = useParams();
// //     const uid = params.uid as string;
// //     const eventId = params.id as string;

// //     const [userInfo, setUserInfo] = useState<any>('');
// //     const [event, setEvent] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [showMoreOptions, setShowMoreOptions] = useState(false);

// //     // Event type configuration
// //     const eventTypeConfig: any = {
// //         'property-viewing': {
// //             label: 'Property Viewing',
// //             icon: <Eye className="w-5 h-5" />,
// //             color: 'text-blue-600',
// //             bg: 'bg-gradient-to-br from-blue-50 to-blue-100'
// //         },
// //         'client-meeting': {
// //             label: 'Client Meeting',
// //             icon: <Users className="w-5 h-5" />,
// //             color: 'text-purple-600',
// //             bg: 'bg-gradient-to-br from-purple-50 to-purple-100'
// //         },
// //         'closing-session': {
// //             label: 'Closing Session',
// //             icon: <Key className="w-5 h-5" />,
// //             color: 'text-green-600',
// //             bg: 'bg-gradient-to-br from-green-50 to-green-100'
// //         },
// //         'property-inspection': {
// //             label: 'Property Inspection',
// //             icon: <Target className="w-5 h-5" />,
// //             color: 'text-amber-600',
// //             bg: 'bg-gradient-to-br from-amber-50 to-amber-100'
// //         },
// //         'follow-up-call': {
// //             label: 'Follow-up Call',
// //             icon: <PhoneCall className="w-5 h-5" />,
// //             color: 'text-indigo-600',
// //             bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100'
// //         }
// //     };

// //     useEffect(() => {
// //         const fetchEventDetails = async () => {
// //             try {
// //                 const stored = localStorage.getItem('userInfo');
// //                 if (stored) {
// //                     const userData = JSON.parse(stored);
// //                     setUserInfo(userData);
// //                 }

// //                 // First, get all events for this user
// //                 const eventsData: any = await getData(`events/${uid}/`);

// //                 if (eventsData) {
// //                     // Find the specific event by its ID
// //                     const eventData = eventsData[eventId];

// //                     if (eventData) {
// //                         setEvent({ id: eventId, ...eventData });
// //                     } else {
// //                         message.error('Event not found');
// //                         router.back();
// //                     }
// //                 } else {
// //                     message.error('No events found for this user');
// //                     router.back();
// //                 }
// //             } catch (err) {
// //                 console.error('Error:', err);
// //                 message.error('Error loading event details');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         if (uid && eventId) {
// //             fetchEventDetails();
// //         }
// //     }, [uid, eventId, router]);

// //     const formatDate = (dateString: string) => {
// //         const date = new Date(dateString);
// //         const today = new Date();
// //         const tomorrow = new Date(today);
// //         tomorrow.setDate(tomorrow.getDate() + 1);

// //         if (date.toDateString() === today.toDateString()) {
// //             return 'Today';
// //         } else if (date.toDateString() === tomorrow.toDateString()) {
// //             return 'Tomorrow';
// //         } else {
// //             return date.toLocaleDateString('en-US', {
// //                 weekday: 'long',
// //                 year: 'numeric',
// //                 month: 'long',
// //                 day: 'numeric'
// //             });
// //         }
// //     };

// //     const formatTime = (timeString: string) => {
// //         return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
// //             hour: 'numeric',
// //             minute: '2-digit',
// //             hour12: true
// //         });
// //     };

// //     const getEventStatus = () => {
// //         if (!event) return 'scheduled';

// //         const now = new Date();
// //         const eventDate = new Date(`${event.date}T${event.startTime}`);
// //         const eventEndDate = new Date(`${event.date}T${event.endTime}`);

// //         if (eventEndDate < now) return 'completed';
// //         if (eventDate <= now && eventEndDate >= now) return 'in-progress';
// //         return 'upcoming';
// //     };

// //     const getStatusConfig = () => {
// //         const status = getEventStatus();
// //         switch (status) {
// //             case 'completed':
// //                 return { label: 'Completed', color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle className="w-4 h-4" /> };
// //             case 'in-progress':
// //                 return { label: 'In Progress', color: 'text-amber-600', bg: 'bg-amber-50', icon: <AlertCircle className="w-4 h-4" /> };
// //             default:
// //                 return { label: 'Upcoming', color: 'text-blue-600', bg: 'bg-blue-50', icon: <Calendar className="w-4 h-4" /> };
// //         }
// //     };

// //     const handleEdit = () => {
// //         router.push(`/realstate/${uid}/events/edit/${eventId}`);
// //     };

// //     const handleShare = () => {
// //         if (navigator.share) {
// //             navigator.share({
// //                 title: event?.title || 'Event Details',
// //                 text: `Check out this event: ${event?.title}`,
// //                 url: window.location.href,
// //             });
// //         } else {
// //             navigator.clipboard.writeText(window.location.href);
// //             message.success('Link copied to clipboard');
// //         }
// //     };

// //     if (loading) {
// //         return <Loader />;
// //     }

// //     if (!event) {
// //         return (
// //             <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50 flex items-center justify-center">
// //                 <div className="text-center">
// //                     <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                     <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
// //                     <button
// //                         onClick={() => router.back()}
// //                         className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 mx-auto"
// //                     >
// //                         <ArrowLeft className="w-4 h-4" />
// //                         Back to Events
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     const typeConfig: any = eventTypeConfig[event.eventType];
// //     const statusConfig: any = getStatusConfig();

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
// //             <Header userData={userInfo} />

// //             <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //                 {/* Header */}
// //                 <div className="mb-8">
// //                     <div className="flex items-center gap-3 mb-6">
// //                         <button
// //                             onClick={() => router.push(`/realstate/${uid}/events`)}
// //                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                         >
// //                             <ArrowLeft className="w-5 h-5 text-gray-600" />
// //                         </button>
// //                         <div className="h-6 w-px bg-gray-300"></div>
// //                         <div>
// //                             <h1 className="text-2xl font-bold text-gray-900">
// //                                 {event.title}
// //                             </h1>
// //                             <p className="text-gray-600">Event Details</p>
// //                         </div>
// //                     </div>

// //                     {/* Status & Type */}
// //                     <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
// //                         <div className="flex items-center gap-3">
// //                             <div className={`px-3 py-1.5 rounded-full ${typeConfig?.bg} ${typeConfig?.color} flex items-center gap-2`}>
// //                                 {typeConfig?.icon}
// //                                 <span className="text-sm font-medium">{typeConfig?.label}</span>
// //                             </div>
// //                             <div className={`px-3 py-1.5 rounded-full ${statusConfig?.bg} ${statusConfig?.color} flex items-center gap-2`}>
// //                                 {statusConfig?.icon}
// //                                 <span className="text-sm font-medium">{statusConfig?.label}</span>
// //                             </div>
// //                         </div>

// //                         <div className="flex gap-2">
// //                             <button
// //                                 onClick={handleEdit}
// //                                 className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
// //                             >
// //                                 <Edit className="w-4 h-4" />
// //                                 Edit Event
// //                             </button>
// //                             <div className="relative">
// //                                 <button
// //                                     onClick={() => setShowMoreOptions(!showMoreOptions)}
// //                                     className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //                                 >
// //                                     <MoreVertical className="w-5 h-5 text-gray-600" />
// //                                 </button>

// //                                 {showMoreOptions && (
// //                                     <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
// //                                         <button
// //                                             onClick={handleShare}
// //                                             className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
// //                                         >
// //                                             <Share2 className="w-4 h-4" />
// //                                             Share Event
// //                                         </button>
// //                                         <button
// //                                             onClick={() => window.print()}
// //                                             className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
// //                                         >
// //                                             <Printer className="w-4 h-4" />
// //                                             Print Details
// //                                         </button>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Main Content */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                     {/* Left Column - Event Details */}
// //                     <div className="lg:col-span-2 space-y-6">
// //                         {/* Date & Time Card */}
// //                         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                             <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
// //                                     <div className="flex items-center gap-3">
// //                                         <div className="p-2 bg-white rounded-lg shadow-sm">
// //                                             <Calendar className="w-5 h-5 text-purple-600" />
// //                                         </div>
// //                                         <div>
// //                                             <p className="text-sm text-gray-600">Date</p>
// //                                             <p className="font-semibold text-gray-900">{formatDate(event.date)}</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
// //                                     <div className="flex items-center gap-3">
// //                                         <div className="p-2 bg-white rounded-lg shadow-sm">
// //                                             <Clock className="w-5 h-5 text-blue-600" />
// //                                         </div>
// //                                         <div>
// //                                             <p className="text-sm text-gray-600">Time</p>
// //                                             <p className="font-semibold text-gray-900">
// //                                                 {formatTime(event.startTime)} - {formatTime(event.endTime)}
// //                                             </p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* Location Card */}
// //                         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                             <div className="flex items-center justify-between mb-4">
// //                                 <h2 className="text-lg font-semibold text-gray-900">Location</h2>
// //                                 <button
// //                                     onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
// //                                     className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
// //                                 >
// //                                     <ExternalLink className="w-4 h-4" />
// //                                     Open in Maps
// //                                 </button>
// //                             </div>
// //                             <div className="p-4 rounded-lg bg-gray-50">
// //                                 <div className="flex items-start gap-3">
// //                                     <div className="p-2 bg-white rounded-lg shadow-sm mt-1">
// //                                         <MapPin className="w-5 h-5 text-red-500" />
// //                                     </div>
// //                                     <div>
// //                                         <p className="font-semibold text-gray-900 mb-1">Meeting Address</p>
// //                                         <p className="text-gray-700">{event.address}</p>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* Clients Card */}
// //                         {event.clientDetails && event.clientDetails.length > 0 && (
// //                             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                                 <h2 className="text-lg font-semibold text-gray-900 mb-4">
// //                                     Clients ({event.clientDetails.length})
// //                                 </h2>
// //                                 <div className="space-y-3">
// //                                     {event.clientDetails.map((client: any, index: number) => (
// //                                         <div key={client.id} className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
// //                                             <div className="flex items-start gap-4">
// //                                                 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
// //                                                     {client.name?.split(' ').map((n: any) => n[0]).join('').toUpperCase() || 'C'}
// //                                                 </div>
// //                                                 <div className="flex-1">
// //                                                     <div className="flex justify-between items-start">
// //                                                         <div>
// //                                                             <h3 className="font-semibold text-gray-900">{client.name}</h3>
// //                                                             <div className="space-y-1 mt-2">
// //                                                                 <div className="flex items-center gap-2 text-sm text-gray-600">
// //                                                                     <Phone className="w-3.5 h-3.5" />
// //                                                                     <span>{client.phone}</span>
// //                                                                 </div>
// //                                                                 <div className="flex items-center gap-2 text-sm text-gray-600">
// //                                                                     <Mail className="w-3.5 h-3.5" />
// //                                                                     <span className="truncate">{client.email}</span>
// //                                                                 </div>
// //                                                             </div>
// //                                                         </div>
// //                                                         <div className="flex gap-2">
// //                                                             <button
// //                                                                 onClick={() => window.open(`tel:${client.phone}`, '_blank')}
// //                                                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                                                             >
// //                                                                 <PhoneCall className="w-4 h-4" />
// //                                                             </button>
// //                                                             <button
// //                                                                 onClick={() => window.open(`mailto:${client.email}`, '_blank')}
// //                                                                 className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
// //                                                             >
// //                                                                 <Mail className="w-4 h-4" />
// //                                                             </button>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* If no clientDetails but clientIds exists */}
// //                         {(!event.clientDetails || event.clientDetails.length === 0) && event.clientIds && event.clientIds.length > 0 && (
// //                             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                                 <h2 className="text-lg font-semibold text-gray-900 mb-4">
// //                                     Clients ({event.clientIds.length})
// //                                 </h2>
// //                                 <div className="space-y-3">
// //                                     {event.clientIds.map((clientId: string, index: number) => (
// //                                         <div key={clientId} className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
// //                                             <div className="flex items-start gap-4">
// //                                                 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
// //                                                     C{index + 1}
// //                                                 </div>
// //                                                 <div className="flex-1">
// //                                                     <div className="flex justify-between items-start">
// //                                                         <div>
// //                                                             <h3 className="font-semibold text-gray-900">Client {index + 1}</h3>
// //                                                             <div className="space-y-1 mt-2">
// //                                                                 <div className="text-sm text-gray-600">
// //                                                                     ID: {clientId.substring(0, 8)}...
// //                                                                 </div>
// //                                                             </div>
// //                                                         </div>
// //                                                         <div className="flex gap-2">
// //                                                             <button
// //                                                                 onClick={() => router.push(`/realstate/${uid}/clients/${clientId}`)}
// //                                                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                                                             >
// //                                                                 <User className="w-4 h-4" />
// //                                                             </button>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* Description Card */}
// //                         {event.description && (
// //                             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
// //                                 <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
// //                                     <p className="text-gray-700">{event.description}</p>
// //                                 </div>
// //                             </div>
// //                         )}

// //                         {/* Notes Card */}
// //                         {event.notes && (
// //                             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
// //                                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
// //                                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                                     <p className="text-gray-700 whitespace-pre-wrap">{event.notes}</p>
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>

// //                     {/* Right Column - Quick Info */}
// //                     <div className="space-y-6">
// //                         {/* Quick Actions */}
// //                         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
// //                             <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
// //                             <div className="space-y-2">
// //                                 <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center gap-3">
// //                                     <Calendar className="w-4 h-4 text-purple-600" />
// //                                     <span>Add to Calendar</span>
// //                                 </button>
// //                                 <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-3">
// //                                     <Bell className="w-4 h-4 text-blue-600" />
// //                                     <span>Set Reminder</span>
// //                                 </button>
// //                                 <button className="w-full p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors flex items-center gap-3">
// //                                     <Mail className="w-4 h-4 text-green-600" />
// //                                     <span>Send Invitation</span>
// //                                 </button>
// //                             </div>
// //                         </div>

// //                         {/* Event Info */}
// //                         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
// //                             <h3 className="font-semibold text-gray-900 mb-4">Event Information</h3>
// //                             <div className="space-y-3">
// //                                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
// //                                     <span className="text-sm text-gray-600">Created</span>
// //                                     <span className="text-sm font-medium text-gray-900">
// //                                         {new Date(event.createdAt).toLocaleDateString()}
// //                                     </span>
// //                                 </div>
// //                                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
// //                                     <span className="text-sm text-gray-600">Agent</span>
// //                                     <span className="text-sm font-medium text-gray-900">
// //                                         {event.agentName}
// //                                     </span>
// //                                 </div>
// //                                 <div className="flex justify-between items-center py-2 border-b border-gray-100">
// //                                     <span className="text-sm text-gray-600">Duration</span>
// //                                     <span className="text-sm font-medium text-gray-900">
// //                                         {formatTime(event.startTime)} - {formatTime(event.endTime)}
// //                                     </span>
// //                                 </div>
// //                                 <div className="flex justify-between items-center py-2">
// //                                     <span className="text-sm text-gray-600">Reminder</span>
// //                                     <span className="text-sm font-medium text-gray-900">
// //                                         {event.reminderSent ? 'Sent ✓' : 'Not Sent'}
// //                                     </span>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* Agent Info */}
// //                         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
// //                             <h3 className="font-semibold text-gray-900 mb-4">Agent Information</h3>
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
// //                                     {event.agentName?.split(' ').map((n: any) => n[0]).join('').toUpperCase() || 'A'}
// //                                 </div>
// //                                 <div>
// //                                     <h4 className="font-medium text-gray-900">{event.agentName}</h4>
// //                                     <p className="text-sm text-gray-600">Real Estate Agent</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }
// 'use client'

// import { useRouter, useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { message } from "antd";
// import {
//     Calendar, Clock, MapPin, Users, Phone, Mail,
//     MessageSquare, Edit, ArrowLeft, MoreVertical,
//     Eye, Target, Key, Building, ChevronRight,
//     CheckCircle, AlertCircle, ExternalLink,
//     Copy, Share2, Home, User, Printer,
//     Bell, Download, Video, FileText,
//     Navigation, Smartphone, Globe, QrCode,
//     Shield, Star, Zap, Heart, ThumbsUp
// } from "lucide-react";
// import Header from "@/components/Header";
// import Loader from "@/components/Loader";
// import { getData } from "@/FBConfig/fbFunctions";

// interface UserInfo {
//     uid: string;
//     name?: string;
//     email?: string;
// }

// interface ClientDetail {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     avatarColor?: string;
// }

// interface EventData {
//     id: string;
//     title: string;
//     description: string;
//     eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
//     clientIds: string[];
//     clientDetails?: ClientDetail[];
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
//     propertyAddress?: string;
//     propertyId?: string;
//     priority?: 'low' | 'medium' | 'high';
// }

// export default function EventDetailPage() {
//     const router = useRouter();
//     const params = useParams();
//     const eventId = params.id as string;

//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//     const [event, setEvent] = useState<EventData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [uid, setUid] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'notes'>('overview');

//     // Event type configuration with enhanced styling
//     const eventTypeConfig = {
//         'property-viewing': {
//             label: 'Property Viewing',
//             icon: <Eye className="w-5 h-5" />,
//             color: 'text-blue-600',
//             bg: 'bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50',
//             border: 'border-blue-200',
//             gradient: 'from-blue-500 to-cyan-500'
//         },
//         'client-meeting': {
//             label: 'Client Meeting',
//             icon: <Users className="w-5 h-5" />,
//             color: 'text-purple-600',
//             bg: 'bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50',
//             border: 'border-purple-200',
//             gradient: 'from-purple-500 to-pink-500'
//         },
//         'closing-session': {
//             label: 'Closing Session',
//             icon: <Key className="w-5 h-5" />,
//             color: 'text-green-600',
//             bg: 'bg-gradient-to-br from-green-50 via-green-100 to-emerald-50',
//             border: 'border-green-200',
//             gradient: 'from-green-500 to-emerald-500'
//         },
//         'property-inspection': {
//             label: 'Property Inspection',
//             icon: <Target className="w-5 h-5" />,
//             color: 'text-amber-600',
//             bg: 'bg-gradient-to-br from-amber-50 via-amber-100 to-orange-50',
//             border: 'border-amber-200',
//             gradient: 'from-amber-500 to-orange-500'
//         },
//         'follow-up-call': {
//             label: 'Follow-up Call',
//             icon: <Phone className="w-5 h-5" />,
//             color: 'text-indigo-600',
//             bg: 'bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-50',
//             border: 'border-indigo-200',
//             gradient: 'from-indigo-500 to-violet-500'
//         }
//     };

//     const priorityConfig = {
//         high: { label: 'High Priority', color: 'text-red-600', bg: 'bg-red-50', icon: <Zap className="w-4 h-4" /> },
//         medium: { label: 'Medium Priority', color: 'text-amber-600', bg: 'bg-amber-50', icon: <AlertCircle className="w-4 h-4" /> },
//         low: { label: 'Low Priority', color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle className="w-4 h-4" /> }
//     };

//     useEffect(() => {
//         const stored = localStorage.getItem('userInfo');
//         if (stored) {
//             try {
//                 const userData = JSON.parse(stored);
//                 setUserInfo(userData);
//                 setUid(userData.uid);
//             } catch (error) {
//                 console.error("Error parsing userInfo:", error);
//                 message.error("Error loading user information");
//             }
//         } else {
//             message.error("User not logged in");
//             router.push("/login");
//         }
//     }, []);

//     useEffect(() => {
//         if (!uid || !eventId) return;

//         const fetchEventDetails = async () => {
//             try {
//                 setLoading(true);
//                 const eventData: any = await getData(`events/${uid}/${eventId}`);

//                 if (eventData) {
//                     setEvent({ id: eventId, ...eventData });
//                 } else {
//                     message.error("Event not found");
//                     router.push(`/realstate/${uid}/events`);
//                 }
//             } catch (error) {
//                 console.error("Error loading event:", error);
//                 message.error("Error loading event details");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEventDetails();
//     }, [uid, eventId, router]);

//     const formatDate = (dateString: string) => {
//         if (!dateString) return 'N/A';
//         try {
//             const date = new Date(dateString);
//             const options: Intl.DateTimeFormatOptions = {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             };
//             return date.toLocaleDateString('en-US', options);
//         } catch {
//             return 'Invalid Date';
//         }
//     };

//     const formatTime = (timeString: string) => {
//         if (!timeString) return 'N/A';
//         try {
//             return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
//                 hour: 'numeric',
//                 minute: '2-digit',
//                 hour12: true
//             });
//         } catch {
//             return 'Invalid Time';
//         }
//     };

//     const getEventStatus = () => {
//         if (!event) return 'scheduled';
//         try {
//             const now = new Date();
//             const eventDate = new Date(`${event.date}T${event.startTime}`);
//             const eventEndDate = new Date(`${event.date}T${event.endTime}`);

//             if (eventEndDate < now) return 'completed';
//             if (eventDate <= now && eventEndDate >= now) return 'in-progress';
//             return 'upcoming';
//         } catch {
//             return 'upcoming';
//         }
//     };

//     const getStatusConfig = () => {
//         const status = getEventStatus();
//         switch (status) {
//             case 'completed':
//                 return {
//                     label: 'Completed',
//                     color: 'text-green-600',
//                     bg: 'bg-green-50',
//                     border: 'border-green-200',
//                     icon: <CheckCircle className="w-4 h-4" />
//                 };
//             case 'in-progress':
//                 return {
//                     label: 'In Progress',
//                     color: 'text-amber-600',
//                     bg: 'bg-amber-50',
//                     border: 'border-amber-200',
//                     icon: <AlertCircle className="w-4 h-4" />
//                 };
//             default:
//                 return {
//                     label: 'Upcoming',
//                     color: 'text-blue-600',
//                     bg: 'bg-blue-50',
//                     border: 'border-blue-200',
//                     icon: <Calendar className="w-4 h-4" />
//                 };
//         }
//     };

//     const handleEdit = () => {
//         if (!uid || !eventId) return;
//         router.push(`/realstate/${uid}/events/edit/${eventId}`);
//     };

//     const handleShare = () => {
//         if (!event) return;
//         navigator.clipboard.writeText(window.location.href);
//         message.success('Link copied to clipboard!');
//     };

//     const handleCall = (phone: string) => {
//         window.open(`tel:${phone}`, '_blank');
//     };

//     const handleEmail = (email: string) => {
//         window.open(`mailto:${email}`, '_blank');
//     };

//     const handleOpenMaps = () => {
//         if (!event?.address) return;
//         window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank');
//     };

//     if (loading) return <Loader />;

//     if (!event) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
//                 <div className="text-center p-8">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
//                         <AlertCircle className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Not Found</h2>
//                     <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
//                     <button
//                         onClick={() => uid ? router.push(`/realstate/${uid}/events`) : router.back()}
//                         className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                         Back to Events
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const typeConfig = eventTypeConfig[event.eventType] || eventTypeConfig['client-meeting'];
//     const statusConfig = getStatusConfig();
//     const priority = event.priority || 'medium';
//     const priorityInfo = priorityConfig[priority];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//             <Header userData={userInfo} />

//             {/* Floating Action Buttons */}
//             <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
//                 <button
//                     onClick={handleEdit}
//                     className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
//                 >
//                     <Edit className="w-6 h-6" />
//                 </button>
//                 <button
//                     onClick={handleShare}
//                     className="p-4 bg-white text-gray-700 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group border border-gray-200"
//                 >
//                     <Share2 className="w-6 h-6 group-hover:text-purple-600 transition-colors" />
//                 </button>
//             </div>

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <div className="flex items-center gap-4 mb-6">
//                         <button
//                             onClick={() => router.push(`/realstate/${uid}/events`)}
//                             className="group p-3 hover:bg-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-gray-200"
//                         >
//                             <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
//                         </button>
//                         <div className="flex-1">
//                             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                                 {event.title || 'Untitled Event'}
//                             </h1>
//                             <div className="flex items-center gap-3">
//                                 <div className={`px-4 py-1.5 rounded-full ${typeConfig.bg} ${typeConfig.color} border ${typeConfig.border} flex items-center gap-2 shadow-sm`}>
//                                     {typeConfig.icon}
//                                     <span className="font-semibold">{typeConfig.label}</span>
//                                 </div>
//                                 <div className={`px-4 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border} flex items-center gap-2 shadow-sm`}>
//                                     {statusConfig.icon}
//                                     <span className="font-semibold">{statusConfig.label}</span>
//                                 </div>
//                                 <div className={`px-4 py-1.5 rounded-full ${priorityInfo.bg} ${priorityInfo.color} border border-gray-200 flex items-center gap-2 shadow-sm`}>
//                                     {priorityInfo.icon}
//                                     <span className="font-semibold">{priorityInfo.label}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Stats Bar */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
//                                     <Calendar className="w-6 h-6 text-purple-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-600">Date</p>
//                                     <p className="font-bold text-gray-900">{formatDate(event.date)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
//                                     <Clock className="w-6 h-6 text-blue-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-600">Time</p>
//                                     <p className="font-bold text-gray-900">
//                                         {formatTime(event.startTime)} - {formatTime(event.endTime)}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
//                                     <Users className="w-6 h-6 text-green-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-600">Attendees</p>
//                                     <p className="font-bold text-gray-900">
//                                         {(event.clientDetails?.length || event.clientIds?.length || 0) + 1}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
//                                     <Bell className="w-6 h-6 text-amber-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-600">Reminder</p>
//                                     <p className="font-bold text-gray-900">
//                                         {event.reminderSent ? 'Sent ✓' : 'Pending'}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Column - Main Content */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Tabs */}
//                         <div className="bg-white rounded-2xl border border-gray-200 p-1 shadow-sm">
//                             <div className="flex space-x-1">
//                                 {(['overview', 'clients', 'notes'] as const).map((tab) => (
//                                     <button
//                                         key={tab}
//                                         onClick={() => setActiveTab(tab)}
//                                         className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab
//                                                 ? `bg-gradient-to-r ${typeConfig.gradient} text-white shadow-md`
//                                                 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//                                             }`}
//                                     >
//                                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Tab Content */}
//                         <div className="transition-all duration-300">
//                             {/* Overview Tab */}
//                             {activeTab === 'overview' && (
//                                 <div className="space-y-6">
//                                     {/* Description Card */}
//                                     {event.description && (
//                                         <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
//                                             <div className="flex items-center gap-3 mb-4">
//                                                 <div className="p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
//                                                     <FileText className="w-5 h-5 text-purple-600" />
//                                                 </div>
//                                                 <h3 className="text-lg font-bold text-gray-900">Description</h3>
//                                             </div>
//                                             <p className="text-gray-700 leading-relaxed">{event.description}</p>
//                                         </div>
//                                     )}

//                                     {/* Location Card */}
//                                     <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
//                                         <div className="flex items-center justify-between mb-4">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="p-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
//                                                     <MapPin className="w-5 h-5 text-red-500" />
//                                                 </div>
//                                                 <h3 className="text-lg font-bold text-gray-900">Location</h3>
//                                             </div>
//                                             <button
//                                                 onClick={handleOpenMaps}
//                                                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
//                                             >
//                                                 <Navigation className="w-4 h-4" />
//                                                 Open in Maps
//                                             </button>
//                                         </div>
//                                         <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
//                                             <p className="font-medium text-gray-900">{event.address || 'No address provided'}</p>
//                                         </div>
//                                     </div>

//                                     {/* Agent Info Card */}
//                                     <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border border-purple-200 p-6 shadow-sm">
//                                         <h3 className="text-lg font-bold text-gray-900 mb-4">Hosted By</h3>
//                                         <div className="flex items-center gap-4">
//                                             <div className="relative">
//                                                 <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                                                     {event.agentName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A'}
//                                                 </div>
//                                                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                                                     <CheckCircle className="w-3 h-3 text-white" />
//                                                 </div>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <h4 className="font-bold text-gray-900 text-lg">{event.agentName || 'Unknown Agent'}</h4>
//                                                 <p className="text-gray-600 mb-3">Real Estate Agent</p>
//                                                 <div className="flex gap-3">
//                                                     <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-purple-600 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors">
//                                                         <Mail className="w-4 h-4" />
//                                                         Message
//                                                     </button>
//                                                     <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
//                                                         <Phone className="w-4 h-4" />
//                                                         Call
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Clients Tab */}
//                             {activeTab === 'clients' && event.clientDetails && event.clientDetails.length > 0 && (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {event.clientDetails.map((client, index) => {
//                                         const colors = ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-amber-500 to-orange-500'];
//                                         const colorClass = colors[index % colors.length];

//                                         return (
//                                             <div key={client.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
//                                                 <div className="flex items-start justify-between mb-4">
//                                                     <div className="flex items-center gap-4">
//                                                         <div className={`w-14 h-14 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
//                                                             {client.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C'}
//                                                         </div>
//                                                         <div>
//                                                             <h4 className="font-bold text-gray-900">{client.name || 'Unnamed Client'}</h4>
//                                                             <p className="text-sm text-gray-600">Client #{index + 1}</p>
//                                                         </div>
//                                                     </div>
//                                                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                                                         <MoreVertical className="w-5 h-5 text-gray-400" />
//                                                     </button>
//                                                 </div>

//                                                 <div className="space-y-3">
//                                                     {client.phone && (
//                                                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                                                             <div className="flex items-center gap-2">
//                                                                 <Smartphone className="w-4 h-4 text-gray-500" />
//                                                                 <span className="text-sm text-gray-700">Phone</span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="font-medium text-gray-900">{client.phone}</span>
//                                                                 <button
//                                                                     onClick={() => handleCall(client.phone)}
//                                                                     className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
//                                                                 >
//                                                                     <Phone className="w-4 h-4 text-blue-600" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     )}

//                                                     {client.email && (
//                                                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                                                             <div className="flex items-center gap-2">
//                                                                 <Mail className="w-4 h-4 text-gray-500" />
//                                                                 <span className="text-sm text-gray-700">Email</span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="font-medium text-gray-900 truncate">{client.email}</span>
//                                                                 <button
//                                                                     onClick={() => handleEmail(client.email)}
//                                                                     className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
//                                                                 >
//                                                                     <Mail className="w-4 h-4 text-purple-600" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 <div className="flex gap-2 mt-4">
//                                                     <button
//                                                         onClick={() => uid && router.push(`/realstate/${uid}/clients/${client.id}`)}
//                                                         className="flex-1 py-2.5 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-lg border border-gray-300 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
//                                                     >
//                                                         <User className="w-4 h-4" />
//                                                         View Profile
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             )}

//                             {/* Notes Tab */}
//                             {activeTab === 'notes' && event.notes && (
//                                 <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
//                                     <div className="flex items-center gap-3 mb-6">
//                                         <div className="p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
//                                             <FileText className="w-5 h-5 text-amber-600" />
//                                         </div>
//                                         <h3 className="text-lg font-bold text-gray-900">Meeting Notes</h3>
//                                     </div>
//                                     <div className="p-5 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-200">
//                                         <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.notes}</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Right Column - Sidebar */}
//                     <div className="space-y-6">
//                         {/* Quick Actions */}
//                         <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm">
//                             <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
//                             <div className="grid grid-cols-2 gap-3">
//                                 <button className="group p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:border-blue-300 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 flex flex-col items-center justify-center">
//                                     <div className="p-2 bg-white rounded-lg mb-2 group-hover:scale-110 transition-transform">
//                                         <Calendar className="w-5 h-5 text-blue-600" />
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-900">Calendar</span>
//                                 </button>
//                                 <button className="group p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:border-purple-300 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 flex flex-col items-center justify-center">
//                                     <div className="p-2 bg-white rounded-lg mb-2 group-hover:scale-110 transition-transform">
//                                         <Bell className="w-5 h-5 text-purple-600" />
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-900">Reminder</span>
//                                 </button>
//                                 <button className="group p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-300 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 flex flex-col items-center justify-center">
//                                     <div className="p-2 bg-white rounded-lg mb-2 group-hover:scale-110 transition-transform">
//                                         <Video className="w-5 h-5 text-green-600" />
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-900">Meeting</span>
//                                 </button>
//                                 <button className="group p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:border-amber-300 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 flex flex-col items-center justify-center">
//                                     <div className="p-2 bg-white rounded-lg mb-2 group-hover:scale-110 transition-transform">
//                                         <FileText className="w-5 h-5 text-amber-600" />
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-900">Notes</span>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Event Timeline */}
//                         <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
//                             <h3 className="text-lg font-bold text-gray-900 mb-4">Event Timeline</h3>
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="relative">
//                                         <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
//                                             <Calendar className="w-5 h-5" />
//                                         </div>
//                                         <div className="absolute left-5 top-10 h-8 w-0.5 bg-gradient-to-b from-purple-200 to-blue-200"></div>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium text-gray-900">Event Created</p>
//                                         <p className="text-sm text-gray-600">
//                                             {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'N/A'}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     <div className="relative">
//                                         <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
//                                             <CheckCircle className="w-5 h-5" />
//                                         </div>
//                                         <div className="absolute left-5 top-10 h-8 w-0.5 bg-gradient-to-b from-green-200 to-emerald-200"></div>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium text-gray-900">Reminder Status</p>
//                                         <p className="text-sm text-gray-600">
//                                             {event.reminderSent ? 'Sent successfully' : 'Pending to send'}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     <div className="relative">
//                                         <div className={`w-10 h-10 bg-gradient-to-r ${typeConfig.gradient} rounded-full flex items-center justify-center text-white`}>
//                                             {typeConfig.icon}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p className="font-medium text-gray-900">Event Type</p>
//                                         <p className="text-sm text-gray-600">{typeConfig.label}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Event QR Code */}
//                         <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-xl">
//                             <div className="text-center">
//                                 <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
//                                     <QrCode className="w-24 h-24 text-gray-900" />
//                                 </div>
//                                 <h3 className="text-white font-bold text-lg mb-2">Event QR Code</h3>
//                                 <p className="text-gray-400 text-sm mb-4">Scan to share event details</p>
//                                 <button
//                                     onClick={handleShare}
//                                     className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
//                                 >
//                                     <Share2 className="w-5 h-5" />
//                                     Share Event
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { message } from "antd";
import {
    Calendar, Clock, MapPin, Users, Phone, Mail,
    MessageSquare, Edit, ArrowLeft, MoreVertical,
    Eye, Target, Key, Building, CheckCircle,
    AlertCircle, ExternalLink, Share2, Printer,
    Download, PhoneCall, User, FileText, Navigation,
    ChevronRight, XCircle, Home, DollarSign,
    Bed, Plus, Bell, Layers, Compass
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { getData } from "@/FBConfig/fbFunctions";

interface UserInfo {
    uid: string;
    name?: string;
    email?: string;
}

interface ClientDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface EventData {
    id: string;
    title: string;
    description: string;
    eventType: 'property-viewing' | 'client-meeting' | 'closing-session' | 'property-inspection' | 'follow-up-call';
    clientIds: string[];
    clientDetails?: ClientDetail[];
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

export default function ViewEventPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState('overview');

    // Event type configuration matching your theme
    const eventTypeConfig = useMemo(() => ({
        'property-viewing': {
            label: 'Property Viewing',
            icon: <Eye className="w-5 h-5" />,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            gradient: 'from-blue-500 to-blue-600'
        },
        'client-meeting': {
            label: 'Client Meeting',
            icon: <Users className="w-5 h-5" />,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            gradient: 'from-purple-500 to-purple-600'
        },
        'closing-session': {
            label: 'Closing Session',
            icon: <Key className="w-5 h-5" />,
            color: 'text-green-600',
            bg: 'bg-green-100',
            gradient: 'from-green-500 to-green-600'
        },
        'property-inspection': {
            label: 'Property Inspection',
            icon: <Target className="w-5 h-5" />,
            color: 'text-amber-600',
            bg: 'bg-amber-100',
            gradient: 'from-amber-500 to-amber-600'
        },
        'follow-up-call': {
            label: 'Follow-up Call',
            icon: <PhoneCall className="w-5 h-5" />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            gradient: 'from-indigo-500 to-indigo-600'
        }
    }), []);

    // Load user info
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            try {
                const userData = JSON.parse(stored);
                setUserInfo(userData);
                setUid(userData.uid);
            } catch (error) {
                message.error("Error loading user information");
            }
        } else {
            message.error("User not logged in");
            router.push("/login");
        }
    }, []);

    // Fetch event data
    const fetchEventData = useCallback(async () => {
        if (!uid || !eventId) return;

        try {
            setLoading(true);
            const eventData: any = await getData(`events/${uid}/${eventId}`);

            if (eventData) {
                setEvent({ id: eventId, ...eventData });
            } else {
                message.error("Event not found");
                router.push(`/realstate/${uid}/events`);
            }
        } catch (error) {
            console.error("Error fetching event:", error);
            message.error('Failed to load event data');
        } finally {
            setLoading(false);
        }
    }, [uid, eventId, router]);

    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    // Helper functions
    const getEventStatus = useCallback(() => {
        if (!event) return 'upcoming';
        try {
            const now = new Date();
            const eventDate = new Date(`${event.date}T${event.startTime}`);
            const eventEndDate = new Date(`${event.date}T${event.endTime}`);

            if (eventEndDate < now) return 'completed';
            if (eventDate <= now && eventEndDate >= now) return 'in-progress';
            return 'upcoming';
        } catch {
            return 'upcoming';
        }
    }, [event]);

    const getStatusConfig = useCallback(() => {
        const status = getEventStatus();
        switch (status) {
            case 'completed':
                return {
                    label: 'Completed',
                    color: 'text-green-600',
                    bg: 'bg-green-100',
                    icon: <CheckCircle className="w-4 h-4" />
                };
            case 'in-progress':
                return {
                    label: 'In Progress',
                    color: 'text-amber-600',
                    bg: 'bg-amber-100',
                    icon: <AlertCircle className="w-4 h-4" />
                };
            default:
                return {
                    label: 'Upcoming',
                    color: 'text-blue-600',
                    bg: 'bg-blue-100',
                    icon: <Calendar className="w-4 h-4" />
                };
        }
    }, [getEventStatus]);

    const formatDate = useCallback((dateString: string) => {
        if (!dateString) return 'N/A';
        try {
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
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }
        } catch {
            return 'Invalid Date';
        }
    }, []);

    const formatTime = useCallback((timeString: string) => {
        if (!timeString) return 'N/A';
        try {
            return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return 'Invalid Time';
        }
    }, []);

    const getTimeUntilEvent = useCallback(() => {
        if (!event) return { text: 'N/A', color: 'text-gray-600', bg: 'bg-gray-100' };

        try {
            const eventDateTime = new Date(`${event.date}T${event.startTime}`);
            const now = new Date();
            const diffMs = eventDateTime.getTime() - now.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMs < 0) return { text: 'Past Due', color: 'text-red-600', bg: 'bg-red-100' };
            if (diffDays > 1) return { text: `In ${diffDays} days`, color: 'text-blue-600', bg: 'bg-blue-100' };
            if (diffDays === 1) return { text: 'Tomorrow', color: 'text-green-600', bg: 'bg-green-100' };
            if (diffHours > 0) return { text: `In ${diffHours} hours`, color: 'text-amber-600', bg: 'bg-amber-100' };
            return { text: 'Today', color: 'text-purple-600', bg: 'bg-purple-100' };
        } catch {
            return { text: 'N/A', color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    }, [event]);

    // Memoized values
    const typeConfig = useMemo(() =>
        event ? eventTypeConfig[event.eventType] || eventTypeConfig['client-meeting'] : eventTypeConfig['client-meeting'],
        [event, eventTypeConfig]
    );

    const statusConfig = useMemo(() => getStatusConfig(), [getStatusConfig]);
    const timeUntil = useMemo(() => getTimeUntilEvent(), [getTimeUntilEvent]);

    // Panel configuration
    const panels = [
        { id: 'overview', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
        { id: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> },
        { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'details', label: 'Details', icon: <FileText className="w-4 h-4" /> }
    ];

    if (loading) {
        return <Loader />;
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
                        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
                        <Button
                            label="Back to Events"
                            onClick={() => uid ? router.push(`/realstate/${uid}/events`) : router.back()}
                            variant="theme"
                            size="md"
                            icon={<ArrowLeft className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <Header userData={userInfo} />

            <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Event Header */}
                <div className="mb-8 mt-5">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left Section */}
                        <div className="flex items-start gap-3 sm:items-center">
                            <button
                                onClick={() => router.push(`/realstate/${uid}/events`)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                    {event.title.split(' ')[0] || 'Untitled Event'} {''}
                                    <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-transparent bg-clip-text">
                                        {event.title.split(' ')[1] || 'Untitled Event'}
                                    </span>
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Event Details • Real Estate
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-lg ${typeConfig.bg} ${typeConfig.color} flex items-center gap-2`}>
                                {typeConfig.icon}
                                <span className="text-sm font-medium">{typeConfig.label}</span>
                            </div>

                            <div className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.color} flex items-center gap-2`}>
                                {statusConfig.icon}
                                <span className="text-sm font-medium">{statusConfig.label}</span>
                            </div>

                            <Button
                                label="Edit"
                                onClick={() => router.push(`/realstate/${uid}/events/edit/${eventId}`)}
                                variant="theme"
                                size="sm"
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Event Info */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-lg ${typeConfig.bg}`}>
                                    <div className={typeConfig.color}>
                                        {typeConfig.icon}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
                                    <p className="text-sm text-gray-600">{typeConfig.label}</p>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Date</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Time</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Location</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 truncate">{event.address || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Reminder</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {event.reminderSent ? 'Sent ✓' : 'Not Sent'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Main Panel */}
                    <div className="lg:col-span-2">
                        {/* Panel Navigation */}
                        <div className="bg-white rounded-xl border border-gray-200 p-1.5 mb-6 shadow-sm">
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                                {panels.map((panel) => (
                                    <button
                                        key={panel.id}
                                        onClick={() => setActivePanel(panel.id)}
                                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                                            ${activePanel === panel.id
                                                ? 'bg-purple-50 text-purple-600'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {panel.icon}
                                        {panel.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Panel Content */}
                        <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
                            {activePanel === 'overview' && (
                                <div className="space-y-6">
                                    {/* Description */}
                                    {event.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                                            <div className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50">
                                                <p className="text-gray-700">{event.description}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Location Details */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                                            {event.address && (
                                                <button
                                                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
                                                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open Maps
                                                </button>
                                            )}
                                        </div>
                                        {event.address ? (
                                            <div className="px-4 py-2 rounded-lg border border-gray-200">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Address</p>
                                                        <p className="text-gray-700 mt-1">{event.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">No address provided</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activePanel === 'clients' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Clients ({event.clientDetails?.length || event.clientIds?.length || 0})
                                    </h3>

                                    {event.clientDetails && event.clientDetails.length > 0 ? (
                                        <div className="space-y-4">
                                            {event.clientDetails.map((client, index) => (
                                                <div key={client.id || index} className="px-4 py-1 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                                                                {client.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'C'}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{client.name || 'Unnamed Client'}</h4>
                                                                <div className="space-y-1 sm:flex justify-around items-center gap-3 mt-2">
                                                                    {client.phone && (
                                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                            <Phone className="w-3.5 h-3.5" />
                                                                            <span>{client.phone}</span>
                                                                        </div>
                                                                    )}
                                                                    {client.email && (
                                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                            <Mail className="w-3.5 h-3.5" />
                                                                            <span className="truncate">{client.email}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {client.phone && (
                                                                <button
                                                                    onClick={() => window.open(`tel:${client.phone}`, '_blank')}
                                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                >
                                                                    <PhoneCall className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                            {client.email && (
                                                                <button
                                                                    onClick={() => window.open(`mailto:${client.email}`, '_blank')}
                                                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                                >
                                                                    <Mail className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : event.clientIds && event.clientIds.length > 0 ? (
                                        <div className="space-y-4">
                                            {event.clientIds.map((clientId, index) => (
                                                <div key={clientId} className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                                                            C{index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900">Client {index + 1}</h4>
                                                            <div className="text-sm text-gray-600 mt-1">
                                                                ID: {clientId.substring(0, 8)}...
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => router.push(`/realstate/${uid}/clients/${clientId}`)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <User className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">No clients assigned to this event</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'notes' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Notes</h3>

                                    {event.notes ? (
                                        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                                            <p className="text-gray-700 whitespace-pre-wrap">{event.notes}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">No notes added for this event</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePanel === 'details' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Created On</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Duration</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Bell className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-600">Reminder Status</span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {event.reminderSent ? 'Sent successfully' : 'Not sent yet'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}