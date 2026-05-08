// // components/DocumentManager.tsx
// 'use client';

import RefAutoComplete from "antd/es/auto-complete/AutoComplete";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FileText, Upload, Download, Trash2, Eye, FolderOpen, File, Image, FileSignature } from "lucide-react";

// interface Document {
//     id: string;
//     name: string;
//     type: 'contract' | 'agreement' | 'invoice' | 'pre-approval' | 'other';
//     clientId?: string;
//     propertyId?: string;
//     uploadedAt: Date;
//     size: number;
//     url: string;
// }

// export default function DocumentManager({ documents, onUpload, onDelete, onView }: any) {
//     const [activeTab, setActiveTab] = useState<'all' | 'contracts' | 'client' | 'property'>('all');
//     const [dragActive, setDragActive] = useState(false);

//     const getFileIcon = (type: string) => {
//         switch (type) {
//             case 'contract': return <FileSignature className="h-5 w-5 text-indigo-500" />;
//             case 'pre-approval': return <FileText className="h-5 w-5 text-emerald-500" />;
//             default: return <File className="h-5 w-5 text-slate-400" />;
//         }
//     };

//     const formatFileSize = (bytes: number) => {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
//         >
//             <div className="px-5 pt-5 pb-3 border-b border-slate-100">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <div className="flex items-center gap-2">
//                             <FolderOpen className="h-5 w-5 text-indigo-500" />
//                             <h2 className="text-lg font-bold text-slate-800">Document Manager</h2>
//                         </div>
//                         <p className="text-xs text-slate-400 mt-1">Secure document storage</p>
//                     </div>

//                     {/* Upload Area */}
//                     <label className="cursor-pointer">
//                         <input type="file" className="hidden" multiple onChange={(e) => onUpload(e.target.files)} />
//                         <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-medium shadow-md"
//                         >
//                             <Upload size={12} />
//                             Upload
//                         </motion.div>
//                     </label>
//                 </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-slate-100 px-5">
//                 {[
//                     { id: 'all', label: 'All Documents', icon: FileText },
//                     { id: 'contracts', label: 'Contracts', icon: FileSignature },
//                     { id: 'client', label: 'Client Files', icon: File },
//                     { id: 'property', label: 'Property Docs', icon: Image }
//                 ].map((tab) => (
//                     <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id as any)}
//                         className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${activeTab === tab.id
//                                 ? 'border-indigo-600 text-indigo-600'
//                                 : 'border-transparent text-slate-500 hover:text-slate-700'
//                             }`}
//                     >
//                         <tab.icon size={14} />
//                         {tab.label}
//                     </button>
//                 ))}
//             </div>

//             {/* Document List */}
//             <div className="p-5 max-h-96 overflow-y-auto">
//                 {documents.length === 0 ? (
//                     <div className="text-center py-8">
//                         <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
//                         <p className="text-slate-500">No documents yet</p>
//                         <p className="text-xs text-slate-400 mt-1">Upload contracts, agreements, and more</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-2">
//                         {documents.map((doc: Document) => (
//                             <motion.div
//                                 key={doc.id}
//                                 whileHover={{ x: 4 }}
//                                 className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer"
//                                 onClick={() => onView(doc.id)}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     {getFileIcon(doc.type)}
//                                     <div>
//                                         <h3 className="font-medium text-sm text-slate-800">{doc.name}</h3>
//                                         <div className="flex items-center gap-2 mt-0.5">
//                                             <span className="text-[10px] text-slate-400">{formatFileSize(doc.size)}</span>
//                                             <span className="text-[10px] text-slate-400">•</span>
//                                             <span className="text-[10px] text-slate-400">
//                                                 {new Date(doc.uploadedAt).toLocaleDateString()}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <button
//                                         onClick={(e) => { e.stopPropagation(); onView(doc.id); }}
//                                         className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors"
//                                     >
//                                         <Eye size={14} className="text-indigo-500" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
//                                         className="p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
//                                     >
//                                         <Trash2 size={14} className="text-rose-500" />
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Storage Used */}
//             <div className="px-5 pb-5">
//                 <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
//                     <span>Storage Used</span>
//                     <span>245 MB / 5 GB</span>
//                 </div>
//                 <div className="w-full bg-slate-100 rounded-full h-1.5">
//                     <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-1.5" style={{ width: '5%' }} />
//                 </div>
//             </div>
//         </motion.div>
//     );
// }


import React from 'react'

export const DocumentManager = () => {
  return (
    <div>DocumentManager</div>
  )
}
