// 'use client';

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MessageCircle, Send, Phone, Mail, Users as UsersIcon, CheckCircle, Clock, Plus, Save } from "lucide-react";

// interface MessageTemplate {
//     id: string;
//     name: string;
//     content: string;
//     type: 'whatsapp' | 'sms' | 'email';
// }

// export default function CommunicationHub({
//     clients,
//     onSendMessage,
//     onBulkMessage,
//     templates = [],
//     onSaveTemplate
// }: any) {
//     const [selectedClient, setSelectedClient] = useState<any>(null);
//     const [selectedClients, setSelectedClients] = useState<string[]>([]);
//     const [messageType, setMessageType] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
//     const [message, setMessage] = useState('');
//     const [selectedTemplate, setSelectedTemplate] = useState('');
//     const [isBulkMode, setIsBulkMode] = useState(false);
//     const [showSaveTemplate, setShowSaveTemplate] = useState(false);
//     const [newTemplateName, setNewTemplateName] = useState('');

//     const defaultTemplates: MessageTemplate[] = [
//         {
//             id: '1',
//             name: 'Property Showing Reminder',
//             content: "Hi {name}, just reminding you about our property showing tomorrow at 2 PM. Looking forward to seeing you there!",
//             type: 'whatsapp'
//         },
//         {
//             id: '2',
//             name: 'Follow-up',
//             content: "Hi {name}, hope you're doing well! Have you had a chance to think about the property we viewed?",
//             type: 'whatsapp'
//         },
//         {
//             id: '3',
//             name: 'Document Request',
//             content: "Hi {name}, please send over your pre-approval letter when you get a chance. Thanks!",
//             type: 'email'
//         }
//     ];

//     const allTemplates = [...defaultTemplates, ...(templates || [])];

//     const handleTemplateSelect = (template: MessageTemplate) => {
//         setSelectedTemplate(template.id);
//         const recipientName = isBulkMode ? 'client' : (selectedClient?.firstName || 'Client');
//         setMessage(template.content.replace('{name}', recipientName));
//     };

//     const handleSaveTemplate = () => {
//         if (newTemplateName.trim() && message.trim()) {
//             onSaveTemplate?.(newTemplateName, message, messageType);
//             setNewTemplateName('');
//             setShowSaveTemplate(false);
//         }
//     };

//     const handleSend = () => {
//         if (isBulkMode) {
//             if (selectedClients.length === 0) {
//                 alert('Please select at least one client');
//                 return;
//             }
//             onBulkMessage?.(selectedClients, message, messageType);
//             setSelectedClients([]);
//         } else {
//             if (!selectedClient) {
//                 alert('Please select a client');
//                 return;
//             }
//             onSendMessage?.(selectedClient.id, message, messageType);
//         }
//         setMessage('');
//         setSelectedTemplate('');
//     };

//     const toggleClientSelection = (clientId: string) => {
//         setSelectedClients(prev =>
//             prev.includes(clientId)
//                 ? prev.filter(id => id !== clientId)
//                 : [...prev, clientId]
//         );
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
//         >
//             <div className="px-5 pt-5 pb-3 border-b border-slate-100">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         <MessageCircle className="h-5 w-5 text-indigo-500" />
//                         <h2 className="text-lg font-bold text-slate-800">Communication Hub</h2>
//                     </div>
//                     <button
//                         onClick={() => setIsBulkMode(!isBulkMode)}
//                         className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${isBulkMode
//                             ? 'bg-purple-100 text-purple-700 border border-purple-200'
//                             : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                             }`}
//                     >
//                         {isBulkMode ? '📢 Bulk Mode' : '👤 Single Mode'}
//                     </button>
//                 </div>
//                 <p className="text-xs text-slate-400 mt-1">
//                     {isBulkMode ? 'Send messages to multiple clients at once' : 'Send messages to clients instantly'}
//                 </p>
//             </div>

//             <div className="p-5">
//                 {/* Select Client(s) */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-slate-700 mb-2">
//                         {isBulkMode ? 'Select Clients' : 'Select Client'}
//                     </label>

//                     {isBulkMode ? (
//                         <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl p-2 space-y-1">
//                             {clients.length === 0 ? (
//                                 <p className="text-sm text-slate-400 text-center py-2">No clients available</p>
//                             ) : (
//                                 clients.map((client: any) => (
//                                     <label key={client.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedClients.includes(client.id)}
//                                             onChange={() => toggleClientSelection(client.id)}
//                                             className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
//                                         />
//                                         <span className="text-sm text-slate-700">
//                                             {client.firstName} {client.lastName} - {client.phone}
//                                         </span>
//                                     </label>
//                                 ))
//                             )}
//                         </div>
//                     ) : (
//                         <select
//                             className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//                             onChange={(e) => setSelectedClient(clients.find((c: any) => c.id === e.target.value))}
//                             value={selectedClient?.id || ''}
//                         >
//                             <option value="">Choose a client...</option>
//                             {clients.map((client: any) => (
//                                 <option key={client.id} value={client.id}>
//                                     {client.firstName} {client.lastName} - {client.phone}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                 </div>

//                 {/* Message Type */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-slate-700 mb-2">Channel</label>
//                     <div className="flex gap-2">
//                         {[
//                             { type: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
//                             { type: 'sms', icon: Phone, label: 'SMS' },
//                             { type: 'email', icon: Mail, label: 'Email' }
//                         ].map((channel) => (
//                             <button
//                                 key={channel.type}
//                                 onClick={() => setMessageType(channel.type as any)}
//                                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${messageType === channel.type
//                                     ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
//                                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                                     }`}
//                             >
//                                 <channel.icon size={14} />
//                                 {channel.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Templates */}
//                 {(selectedClient || isBulkMode) && (
//                     <div className="mb-4">
//                         <div className="flex items-center justify-between mb-2">
//                             <label className="block text-sm font-medium text-slate-700">Quick Templates</label>
//                             <button
//                                 onClick={() => setShowSaveTemplate(!showSaveTemplate)}
//                                 className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
//                             >
//                                 <Plus size={12} />
//                                 Save current as template
//                             </button>
//                         </div>

//                         {showSaveTemplate && (
//                             <div className="mb-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
//                                 <input
//                                     type="text"
//                                     placeholder="Template name"
//                                     value={newTemplateName}
//                                     onChange={(e) => setNewTemplateName(e.target.value)}
//                                     className="w-full px-3 py-1.5 rounded-lg border border-indigo-200 text-sm mb-2"
//                                 />
//                                 <button
//                                     onClick={handleSaveTemplate}
//                                     className="w-full flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm"
//                                 >
//                                     <Save size={12} />
//                                     Save Template
//                                 </button>
//                             </div>
//                         )}

//                         <div className="flex flex-wrap gap-2">
//                             {allTemplates
//                                 .filter((t: MessageTemplate) => t.type === messageType)
//                                 .map((template: MessageTemplate) => (
//                                     <button
//                                         key={template.id}
//                                         onClick={() => handleTemplateSelect(template)}
//                                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTemplate === template.id
//                                             ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
//                                             : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
//                                             }`}
//                                     >
//                                         {template.name}
//                                     </button>
//                                 ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Message Input */}
//                 {(selectedClient || (isBulkMode && selectedClients.length > 0)) && (
//                     <>
//                         <textarea
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="Type your message here..."
//                             className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
//                         />

//                         <div className="flex items-center justify-between mt-3">
//                             <div className="flex items-center gap-2 text-xs text-slate-400">
//                                 {messageType === 'whatsapp' && <span>✓ Delivered via WhatsApp Business API</span>}
//                                 {messageType === 'sms' && <span>📱 Standard SMS rates apply</span>}
//                                 {messageType === 'email' && !isBulkMode && selectedClient && (
//                                     <span>📧 Will be sent to {selectedClient.email}</span>
//                                 )}
//                                 {isBulkMode && <span>📨 Will be sent to {selectedClients.length} client(s)</span>}
//                             </div>

//                             <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md"
//                                 onClick={handleSend}
//                             >
//                                 <Send size={14} />
//                                 {isBulkMode ? `Send to ${selectedClients.length}` : 'Send Message'}
//                             </motion.button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </motion.div>
//     );
// }


import React from 'react'

const CommunicationHub = () => {
  return (
    <div>CommunicationHub</div>
  )
}

export default CommunicationHub