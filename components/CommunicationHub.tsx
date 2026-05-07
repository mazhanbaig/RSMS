// components/CommunicationHub.tsx
'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Phone, Mail, Users as UsersIcon, CheckCircle, Clock } from "lucide-react";

interface MessageTemplate {
    id: string;
    name: string;
    content: string;
    type: 'whatsapp' | 'sms' | 'email';
}

export default function CommunicationHub({ clients, onSendMessage }: any) {
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [messageType, setMessageType] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
    const [message, setMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const templates: MessageTemplate[] = [
        {
            id: '1',
            name: 'Property Showing Reminder',
            content: "Hi {name}, just reminding you about our property showing tomorrow at 2 PM. Looking forward to seeing you there!",
            type: 'whatsapp'
        },
        {
            id: '2',
            name: 'Follow-up',
            content: "Hi {name}, hope you're doing well! Have you had a chance to think about the property we viewed?",
            type: 'whatsapp'
        },
        {
            id: '3',
            name: 'Document Request',
            content: "Hi {name}, please send over your pre-approval letter when you get a chance. Thanks!",
            type: 'email'
        }
    ];

    const handleTemplateSelect = (template: MessageTemplate) => {
        setSelectedTemplate(template.id);
        setMessage(template.content.replace('{name}', selectedClient?.firstName || 'Client'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
        >
            <div className="px-5 pt-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-slate-800">Communication Hub</h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">Send messages to clients instantly</p>
            </div>

            <div className="p-5">
                {/* Select Client */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Client</label>
                    <select
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                        onChange={(e) => setSelectedClient(clients.find((c: any) => c.id === e.target.value))}
                    >
                        <option value="">Choose a client...</option>
                        {clients.map((client:any) => (
                            <option key={client.id} value={client.id}>
                                {client.firstName} {client.lastName} - {client.phone}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Message Type */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Channel</label>
                    <div className="flex gap-2">
                        {[
                            { type: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
                            { type: 'sms', icon: Phone, label: 'SMS' },
                            { type: 'email', icon: Mail, label: 'Email' }
                        ].map((channel) => (
                            <button
                                key={channel.type}
                                onClick={() => setMessageType(channel.type as any)}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${messageType === channel.type
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                <channel.icon size={14} />
                                {channel.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates */}
                {selectedClient && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Quick Templates</label>
                        <div className="flex flex-wrap gap-2">
                            {templates.filter(t => t.type === messageType).map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTemplate === template.id
                                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                            : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
                                        }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Message Input */}
                {selectedClient && (
                    <>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                        />

                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                {messageType === 'whatsapp' && (
                                    <span>✓ Delivered via WhatsApp Business API</span>
                                )}
                                {messageType === 'sms' && (
                                    <span>📱 Standard SMS rates apply</span>
                                )}
                                {messageType === 'email' && (
                                    <span>📧 Will be sent to {selectedClient.email}</span>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md"
                                onClick={() => onSendMessage(selectedClient.id, message, messageType)}
                            >
                                <Send size={14} />
                                Send Message
                            </motion.button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}