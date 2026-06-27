'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import {
  Plus, X, PhoneCall, Mail, MessageSquare, MapPin, Calendar, Clock, Users, Eye, Key, Target
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { getData, saveData } from "@/FBConfig/fbFunctions";
import { useAuth } from "@/hooks/useAuth";

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  preferredLocations: string;
  ownerUid?: string;
  agentUid?: string;
}

interface EventFormData {
  title: string;
  description: string;
  eventType: string;
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
  clientIds: string[];
  reminderTime: '15' | '30' | '60' | '120';
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

export default function AddEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [owners, setOwners] = useState<OwnerData[]>([]);
  const [ownersLoading, setOwnersLoading] = useState(false);
  const [attendeeType, setAttendeeType] = useState<'clients' | 'owners'>('clients');
  const [saving, setSaving] = useState(false);

  // Get date from URL params or use today
  const getInitialDate = useCallback(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      return dateParam;
    }
    return new Date().toISOString().split('T')[0];
  }, [searchParams]);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    eventType: 'property-viewing',
    address: '',
    date: getInitialDate(),
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

  const fetchClients = useCallback(async (uid: string) => {
    if (!uid) return;
    setClientsLoading(true);
    try {
      const clientsData: any = await getData(`clients/${uid}`);
      if (!clientsData) {
        setClients([]);
        return;
      }
      const clientsArray = Object.entries(clientsData)
        .map(([id, data]: [string, any]) => ({
          id,
          ...data,
        }))
        .filter((client) => client.agentUid === uid || client.ownerUid === uid);
      setClients(clientsArray);
    } catch (error) {
      message.error("Failed to load clients");
    } finally {
      setClientsLoading(false);
    }
  }, []);

  const fetchOwners = useCallback(async (uid: string) => {
    if (!uid) return;
    setOwnersLoading(true);
    try {
      const ownersData: any = await getData(`owners/${uid}`);
      if (!ownersData) {
        setOwners([]);
        return;
      }
      const ownersArray = Object.entries(ownersData)
        .map(([id, data]: [string, any]) => ({ id, ...data }))
        .filter((owner) => owner.agentUid === uid);
      setOwners(ownersArray);
    } catch (error) {
      message.error("Failed to load owners");
    } finally {
      setOwnersLoading(false);
    }
  }, []);

  // Get selected clients
  const selectedClients = clients.filter(client => formData.clientIds.includes(client.id));

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      message.error('Please Login First');
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);
    Promise.all([
      fetchClients(user.uid),
      fetchOwners(user.uid)
    ]).then(() => {
      const dateParam = searchParams.get('date');
      if (dateParam) {
        setFormData(prev => ({ ...prev, date: dateParam }));
      }
    }).finally(() => setLoading(false));
  }, [user?.uid, fetchClients, fetchOwners, searchParams]);

  const handleClientSelect = (clientId: string) => {
    if (!clientId || formData.clientIds.includes(clientId)) return;

    setFormData(prev => ({
      ...prev,
      clientIds: [...prev.clientIds, clientId],
    }));

    const selectedClient = clients.find(c => c.id === clientId);
    if (selectedClient && formData.eventType) {
      const eventTypeLabel = eventTypes.find(et => et.value === formData.eventType)?.label || '';
      setFormData(prev => ({
        ...prev,
        title: `${eventTypeLabel} with ${selectedClient.firstName} ${selectedClient.lastName}`
      }));
    }
  };

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user?.uid) {
      message.error('User not authenticated');
      return;
    }

    setSaving(true);

    try {
      const eventId = crypto.randomUUID();
      const eventData = {
        ...formData,
        id: eventId,
        agentUid: user.uid,
        agentName: user.name || user.email,
        reminderSent: false,
        createdAt: new Date().toISOString(),
      };

      await saveData(`events/${user?.uid}/${eventId}`, eventData);

      message.success('Event created successfully!');
      router.push(`/realstate/${user.uid}/events`);

    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event');
    } finally {
      setSaving(false);
    }
  };

  if (loading || clientsLoading || authLoading || !user?.uid) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <Header userData={user} />

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
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Event Type Selection */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
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

              {/* Attendee Type Toggle + Selection */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-3">
                  <Users size={22} className="w-5 h-5 text-purple-600" />
                  <span>Select Attendee</span>
                </label>

                {/* Toggle between Clients & Owners */}
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setAttendeeType('clients')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${attendeeType === 'clients'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Clients
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendeeType('owners')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${attendeeType === 'owners'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Owners
                  </button>
                </div>

                {/* Dropdown */}
                <select
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (!selectedId) return;

                    if (attendeeType === 'clients') {
                      handleClientSelect(selectedId);
                    } else {
                      const selectedOwner = owners.find(o => o.id === selectedId);
                      if (selectedOwner && !formData.clientIds.includes(selectedId)) {
                        setFormData(prev => ({
                          ...prev,
                          clientIds: [...prev.clientIds, selectedId]
                        }));
                        const eventTypeLabel = eventTypes.find(et => et.value === formData.eventType)?.label || '';
                        setFormData(prev => ({
                          ...prev,
                          title: `${eventTypeLabel} with Owner ${selectedOwner.firstName} ${selectedOwner.lastName}`
                        }));
                      }
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                  value=""
                >
                  <option value="">Select {attendeeType === 'clients' ? 'a client' : 'an owner'}...</option>
                  {(attendeeType === 'clients' ? clients : owners).map(person => (
                    <option key={person.id} value={person.id}>
                      {person.firstName} {person.lastName} • {person.email}
                      {attendeeType === 'owners' && (person as OwnerData).propertyAddress && ` • ${(person as OwnerData).propertyAddress}`}
                    </option>
                  ))}
                </select>

                {(attendeeType === 'clients' ? clientsLoading : ownersLoading) && (
                  <div className="mt-2 text-sm text-gray-500">Loading...</div>
                )}

                {/* Selected attendees display */}
                {selectedClients.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedClients.map(person => {
                      const isOwner = owners.some(o => o.id === person.id);
                      return (
                        <div key={person.id} className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                              {person.firstName?.charAt(0)}{person.lastName?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {person.firstName} {person.lastName}
                                {isOwner && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Owner</span>}
                              </div>
                              <div className="text-sm text-gray-600">
                                {person.email} • {person.phone}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              clientIds: prev.clientIds.filter(id => id !== person.id)
                            }))}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Title & Address */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                    <span>Event Details</span>
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
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can select any date - past, today, or future
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Start Time
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
                        End Time
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

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Reminder
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

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of the event..."
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
                    />
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

          {/* Action Buttons */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Button
                label="Cancel"
                type="button"
                variant="theme2"
                onClick={() => router.push(`/realstate/${user?.uid}/events`)}
                disabled={saving}
              />

              <Button
                label={saving ? "Saving..." : "Create Event"}
                type="submit"
                variant="theme"
                icon={!saving && <Plus className="w-4 h-4" />}
                disabled={saving}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}