// "use client";

// interface AdditionalInfoProps {
//     formData: any;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
// }

// export default function AddClientPart3({ formData, handleChange }: AdditionalInfoProps) {
//     return (
//         <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Source
//                     </label>
//                     <select
//                         name="source"
//                         value={formData.source}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     >
//                         <option value="">Source</option>
//                         <option value="website">Website</option>
//                         <option value="referral">Referral</option>
//                         <option value="social-media">Social Media</option>
//                         <option value="walk-in">Walk-in</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Additional Notes
//                     </label>
//                     <textarea
//                         name="notes"
//                         value={formData.notes}
//                         onChange={handleChange}
//                         rows={4}
//                         placeholder="Additional Notes"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//             </div>
//         </div>
//     );
// }



"use client";

import { Users, FileText } from "lucide-react";

interface AdditionalInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function AddClientPart3({ formData, handleChange }: AdditionalInfoProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
                {/* Source */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Lead Source
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500" />
                        <select
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                        >
                            <option value="" disabled>How did you find us?</option>
                            <option value="website">🌐 Website</option>
                            <option value="referral">🤝 Referral</option>
                            <option value="social-media">📱 Social Media</option>
                            <option value="walk-in">🚶 Walk-in</option>
                        </select>
                    </div>
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Additional Notes
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Any special requirements or notes about this client..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white resize-none"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                        Include preferences, requirements, or any important details
                    </p>
                </div>
            </div>
        </div>
    );
}