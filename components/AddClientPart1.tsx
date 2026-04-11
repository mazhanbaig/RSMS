// "use client";

// interface PersonalInfoProps {
//     formData: any;
//     handleChange: (e: any) => void;
// }

// export default function AddClientPart1({ formData, handleChange }: PersonalInfoProps) {
//     return (
//         <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         placeholder="First Name"
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Last Name
//                     </label>
//                     <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         placeholder="Last Name"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="Phone Number"
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Status <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     >
//                         <option value="active">Active</option>
//                         <option value="deal-Done">Deal Done</option>
//                         <option value="lost">Lost</option>

//                     </select>
//                 </div>

//             </div>
//         </div>
//     );
// }



"use client";

import { User, Mail, Phone, UserCheck } from "lucide-react";

interface PersonalInfoProps {
    formData: any;
    handleChange: (e: any) => void;
}

export default function AddClientPart1({ formData, handleChange }: PersonalInfoProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                    />
                </div>

                {/* Email */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="client@example.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Client Status <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                        >
                            <option value="active">🟢 Active</option>
                            <option value="deal-Done">✅ Deal Done</option>
                            <option value="lost">🔴 Lost</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}