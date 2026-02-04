'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import {
  Calendar, Clock, MapPin, Users, Home, DollarSign,
  ArrowLeft, Plus, X, PhoneCall, Mail, MessageSquare,
  Building, Target, Eye, Key, Bell, FileText,
  User, HomeIcon, Briefcase, Layers,
  Presentation,
  ListFilter,
  PenLine
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { checkUserSession, getData, saveData, updateData } from "@/FBConfig/fbFunctions";

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
  propertyType: string;
  preferredLocations: string;
  ownerUid?: string;
  agentUid?: string; // Added this
}

interface EventFormData {
  title: string;
  description: string;
  eventType: string;
  address: string;
  date: string; // Changed from object to string
  startTime: string;
  endTime: string;
  notes: string;
  clientIds: string[];
  reminderTime: '15' | '30' | '60' | '120';
}

export default function AddEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    eventType: 'property-viewing',
    address: '',
    date: new Date().toISOString().split('T')[0], // Simplified date format
    startTime: '10:00',
    endTime: '11:00',
    notes: '',
    clientIds: [],
    reminderTime: '30',
  });

  // Event type options
  const eventTypes = [
    { value: 'property-viewing', label: 'Property Viewing', icon: <Eye className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'client-meeting', label: 'Client Meeting', icon: <Users className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'closing-session', label: 'Closing Session', icon: <Key className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'property-inspection', label: 'Property Inspection', icon: <Target className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { value: 'follow-up-call', label: 'Follow-up Call', icon: <PhoneCall className="w-4 h-4" />, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  // Reminder time options
  const reminderOptions = [
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '120', label: '2 hours before' }
  ];

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);

      const clientsData: any = await getData("clients");

      if (!clientsData) {
        setClients([]);
        return;
      }

      const clientsArray = Object.entries(clientsData)
        .map(([id, data]: [string, any]) => ({
          id,
          ...data,
        }))
        .filter((client) => client.agentUid === userInfo?.uid || client.ownerUid === userInfo?.uid);

      setClients(clientsArray);
    } catch (error) {
      console.error("Failed to load clients:", error);
      message.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, [userInfo?.uid]);

  // Get selected clients
  const selectedClients = clients.filter(client => formData.clientIds.includes(client.id));

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

        const storedUser: any = localStorage.getItem('userInfo');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserInfo(userData);
        } else {
          message.error('No user info found');
          router.replace('/login');
        }

      } catch (err) {
        console.error('Authentication error:', err);
        message.error('Error occurred during authentication');
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch clients when userInfo is available
  useEffect(() => {
    if (userInfo?.uid) {
      fetchClients();
    }
  }, [userInfo?.uid, fetchClients]);

  const handleClientSelect = (clientId: string) => {
    if (!clientId || formData.clientIds.includes(clientId)) return;

    setFormData(prev => ({
      ...prev,
      clientIds: [...prev.clientIds, clientId],
    }));
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update title if event type changes
    if (field === 'eventType') {
      const eventTypeLabel = eventTypes.find(et => et.value === value)?.label || '';
      setFormData(prev => ({
        ...prev,
        title: `${eventTypeLabel}${selectedClients.length > 0 ? ` with ${selectedClients[0].firstName}` : ''}`
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      message.error('Please enter a title for the event');
      return false;
    }
    if (!formData.address.trim()) {
      message.error('Please enter property address');
      return false;
    }
    if (!formData.date) {
      message.error('Please select a date');
      return false;
    }
    if (!formData.startTime) {
      message.error('Please select start time');
      return false;
    }
    if (formData.startTime >= formData.endTime) {
      message.error('End time must be after start time');
      return false;
    }
    if (formData.clientIds.length === 0) {
      message.error('Please select at least one client');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!userInfo?.uid) {
      message.error('User not authenticated');
      return;
    }

    setSaving(true);

    try {
      
      // Generate a unique ID for the event
      const eventId = crypto.randomUUID();
      const eventData = {
        ...formData,
        id:eventId,
        agentUid: userInfo.uid,
        agentName: userInfo.name || userInfo.email,
        reminderSent: false,
        createdAt: new Date().toISOString(),
      };

      // Save event under user's events collection
      await saveData(`events/${userInfo.uid}/${eventId}`, eventData);

      message.success('Event created successfully!');
      router.push(`/realstate/${userInfo.uid}/events`);

    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!userInfo) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <Header userData={userInfo} />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 mt-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
              <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Events Management</span>
              <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            </div>

            <div className="space-y-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Schedule
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}New Event
                  </span>
                </h1>
                <p className="text-gray-600 mt-2 max-w-xl">
                  Create property viewings, meetings, and client appointments
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <span className="text-xs text-gray-600 mt-2">Details</span>
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
                  2
                </div>
                <span className="text-xs text-gray-600 mt-2">Schedule</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
                  3
                </div>
                <span className="text-xs text-gray-600 mt-2">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Event Type Selection */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                  <ListFilter size={22} className="w-5 h-5 text-purple-600" />
                  <span>Select Event Type</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('eventType', type.value)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${formData.eventType === type.value
                        ? `${type.bg} border-purple-300`
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className={`${type.color}`}>
                        {type.icon}
                      </div>
                      <span className={`text-xs font-medium ${formData.eventType === type.value ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Selection */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-3">
                  <User size={22} className="w-5 h-5 text-purple-600" />
                  <span>Select Client</span>
                  {selectedClients.length > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      • {selectedClients[0].firstName} {selectedClients[0].lastName}
                      {selectedClients.length > 1 && ` + ${selectedClients.length - 1} more`}
                    </span>
                  )}
                </label>
                <select
                  onChange={(e) => handleClientSelect(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                  value=""
                >
                  <option value="">Select a client...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName} • {client.email}
                    </option>
                  ))}
                </select>
                {selectedClients.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedClients.map(client => (
                      <div
                        key={client.id}
                        className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                            {client.firstName?.charAt(0) || ''}
                            {client.lastName?.charAt(0) || ''}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {client.email} • {client.phone}
                            </div>
                          </div>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData(prev => ({
                              ...prev,
                              clientIds: prev.clientIds.filter(id => id !== client.id),
                            }))
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                    <PenLine size={22} className="w-5 h-5 text-purple-600" />
                    <span>Event Description</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Property Viewing - Luxury Villa"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Meeting Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter full property address"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of the event..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Schedule Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Schedule & Timing
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Start Time
                        </div>
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          End Time
                        </div>
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Reminder
                        </div>
                      </label>
                      <select
                        value={formData.reminderTime}
                        onChange={(e) => handleInputChange('reminderTime', e.target.value as any)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                      >
                        {reminderOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Additional Notes
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Notes for this event
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add any special instructions, requirements, or notes for this event..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Full Width at Bottom */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Button
                label="Cancel"
                type="button"
                variant="theme2"
                onClick={() => router.push(`/realstate/${userInfo?.uid}/events`)}
                disabled={saving}
              />

              <div className="flex gap-4">
                <Button
                  label={saving ? "Saving..." : "Create Event"}
                  type="submit"
                  variant="theme"
                  icon={!saving && <Plus className="w-4 h-4" />}
                  disabled={saving}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}