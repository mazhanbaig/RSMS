'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import {
  Calendar, Clock, MapPin, Users, Home, DollarSign,
  ArrowLeft, Plus, X, PhoneCall, Mail, MessageSquare,
  Building, Target, Eye, Key, Bell, FileText,
  User, HomeIcon, Briefcase, Layers
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { getData, saveData, updateData } from "@/FBConfig/fbFunctions";

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
}

interface EventFormData {
  title: string;
  description: string;
  eventType: 'viewing' | 'meeting' | 'closing' | 'inspection' | 'followup';
  clientId: string;
  propertyAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed';
  notes: string;
  participants: string[];
  reminderTime: '15' | '30' | '60' | '120';
  propertyType: string;
  budget: string;
  priority: 'low' | 'medium' | 'high';
}

export default function AddEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [participantInput, setParticipantInput] = useState('');
  const [saving, setSaving] = useState(false);

  // Initialize form with default values
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    eventType: (searchParams.get('type') as EventFormData['eventType']) || 'viewing',
    clientId: '',
    propertyAddress: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    status: 'scheduled',
    notes: '',
    participants: [],
    reminderTime: '30',
    propertyType: '',
    budget: '',
    priority: 'medium'
  });

  // Event type options
  const eventTypes = [
    { value: 'viewing', label: 'Property Viewing', icon: <Eye className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'meeting', label: 'Client Meeting', icon: <Users className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'closing', label: 'Closing Session', icon: <Key className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'inspection', label: 'Property Inspection', icon: <Target className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { value: 'followup', label: 'Follow-up Call', icon: <PhoneCall className="w-4 h-4" />, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50' },
    { value: 'high', label: 'High', color: 'text-red-600', bg: 'bg-red-50' }
  ];

  // Reminder time options
  const reminderOptions = [
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '120', label: '2 hours before' }
  ];

  // Load user info
  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      try {
        const parsed: UserInfo = JSON.parse(stored);
        setUserInfo(parsed);
        fetchClients(parsed.uid);
      } catch (err) {
        message.error('Error loading user info');
        setLoading(false);
      }
    }
  }, []);

  // Fetch clients
  const fetchClients = async (uid: string) => {
    try {
      const clientsData = await getData(`clients/${uid}`);
      if (clientsData) {
        const clientsArray = Object.entries(clientsData).map(([id, data]: [string, any]) => ({
          id,
          ...data
        }));
        setClients(clientsArray);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      message.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  // Handle client selection
  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setFormData(prev => ({
        ...prev,
        clientId,
        propertyType: client.propertyType || '',
        // Auto-generate title based on client and event type
        title: `${eventTypes.find(et => et.value === formData.eventType)?.label} - ${client.firstName} ${client.lastName}`,
        propertyAddress: client.preferredLocations || ''
      }));
    }
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add participant
  const addParticipant = () => {
    if (participantInput.trim() && !formData.participants.includes(participantInput.trim())) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantInput.trim()]
      }));
      setParticipantInput('');
    }
  };

  // Remove participant
  const removeParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      message.error('Please enter a title for the event');
      return false;
    }
    if (!formData.clientId) {
      message.error('Please select a client');
      return false;
    }
    if (!formData.propertyAddress.trim()) {
      message.error('Please enter property address');
      return false;
    }
    if (!formData.date) {
      message.error('Please select a date');
      return false;
    }
    if (!formData.startTime || !formData.endTime) {
      message.error('Please select start and end time');
      return false;
    }
    if (formData.startTime >= formData.endTime) {
      message.error('End time must be after start time');
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
      const eventData = {
        ...formData,
        clientName: selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : '',
        ownerUid: userInfo.uid,
        reminderSent: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveData(`events/${userInfo.uid}`, eventData);

      message.success('Event created successfully!');
      router.push(`/realstate/${userInfo.uid}/events`);

    } catch (error) {
      console.error("Error creating event:", error);
      message.error('Failed to create event');
    } finally {
      setSaving(false);
    }
  };

  // Quick fill example data (for demo purposes)
  const fillExampleData = () => {
    if (clients.length > 0) {
      const exampleClient = clients[0];
      setSelectedClient(exampleClient);
      setFormData({
        title: `Property Viewing - ${exampleClient.firstName} ${exampleClient.lastName}`,
        description: 'First viewing of the property. Discuss requirements and show key features.',
        eventType: 'viewing',
        clientId: exampleClient.id,
        propertyAddress: exampleClient.preferredLocations || '123 Example Street, City',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        startTime: '14:00',
        endTime: '15:00',
        status: 'scheduled',
        notes: 'Client is interested in modern amenities and good neighborhood.',
        participants: [`${exampleClient.firstName} ${exampleClient.lastName}`, 'Spouse'],
        reminderTime: '30',
        propertyType: exampleClient.propertyType || 'apartment',
        budget: '$500,000 - $600,000',
        priority: 'high'
      });
      message.info('Example data filled');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <Header userData={userInfo} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 sm:items-center">
              <button
                onClick={() => router.push(`/realstate/${userInfo?.uid}/events`)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                  Schedule
                  <span className="bg-gradient-to-br from-purple-500 to-blue-500 text-transparent bg-clip-text">
                    {" "}New Event
                  </span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Create property viewings, meetings, and client appointments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                label="Fill Example"
                variant="theme2"
                size="sm"
                onClick={fillExampleData}
                disabled={clients.length === 0}
              />
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
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {/* Event Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-900 mb-4">
                Select Event Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('eventType', type.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${formData.eventType === type.value
                        ? `${type.bg} border-${type.color.split('-')[1]}-300`
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Select Client
                {selectedClient && (
                  <span className="ml-2 text-sm text-gray-600">
                    • {selectedClient.firstName} {selectedClient.lastName}
                  </span>
                )}
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => handleClientSelect(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                required
              >
                <option value="">Select a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName} • {client.email}
                  </option>
                ))}
              </select>

              {selectedClient && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {selectedClient.firstName.charAt(0)}{selectedClient.lastName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedClient.firstName} {selectedClient.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedClient.email} • {selectedClient.phone}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedClient(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Property Viewing - Luxury Villa"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    placeholder="Enter full property address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the event..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
              />
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-4 h-4" />
                    Property Type
                  </div>
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors bg-white"
                >
                  <option value="">Select type...</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Budget Range
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., $500,000 - $600,000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Priority
                  </div>
                </label>
                <div className="flex gap-2">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => handleInputChange('priority', priority.value)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.priority === priority.value
                          ? `${priority.bg} ${priority.color} border ${priority.color.replace('text', 'border')}-200`
                          : 'border border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Schedule & Timing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Status
                  </div>
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'scheduled', label: 'Scheduled', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { value: 'confirmed', label: 'Confirmed', color: 'text-green-600', bg: 'bg-green-50' }
                  ].map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => handleInputChange('status', status.value as any)}
                      className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${formData.status === status.value
                          ? `${status.bg} ${status.color} border ${status.color.replace('text', 'border')}-200`
                          : 'border border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Participants Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Participants
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Add Participants
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={participantInput}
                  onChange={(e) => setParticipantInput(e.target.value)}
                  placeholder="Enter participant name..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                />
                <Button
                  label="Add"
                  type="button"
                  variant="theme2"
                  onClick={addParticipant}
                />
              </div>
            </div>

            {formData.participants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Participants ({formData.participants.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{participant}</span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
                  label="Save as Draft"
                  type="button"
                  variant="theme2"
                  onClick={() => {
                    handleInputChange('status', 'scheduled');
                    message.info('Saved as draft');
                  }}
                  disabled={saving}
                />
                <Button
                  label={saving ? "Saving..." : "Create Event"}
                  type="submit"
                  variant="theme"
                  icon={!saving && <Plus className="w-4 h-4" />}
                  disabled={saving}
                  loading={saving}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Quick Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Set reminders to never miss an appointment</li>
                <li>• Add all participants for better coordination</li>
                <li>• Use detailed notes for follow-up reference</li>
                <li>• Mark high priority for important meetings</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}