// "use client";

// interface PropertyInfoProps {
//     formData: any;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// export default function AddClientPart2({ formData, handleChange }: PropertyInfoProps) {
//     return (
//         <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Property Preferences</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Property Type <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         name="propertyType"
//                         value={formData.propertyType}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     >
//                         <option value="" disabled>Property Type</option>
//                         <option value="apartment">Apartment</option>
//                         <option value="house">House</option>
//                         <option value="villa">Villa</option>
//                         <option value="commercial">Commercial</option>
//                         <option value="land">Land</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Preferred Locations
//                     </label>
//                     <input
//                         type="text"
//                         name="preferredLocations"
//                         value={formData.preferredLocations}
//                         onChange={handleChange}
//                         placeholder="Preferred Locations"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Min Budget <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="minBudget"
//                         value={formData.minBudget}
//                         onChange={handleChange}
//                         placeholder="Min Budget"
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Max Budget <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="maxBudget"
//                         value={formData.maxBudget}
//                         onChange={handleChange}
//                         placeholder="Max Budget"
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-gray-700">
//                         Bedrooms <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         name="bedrooms"
//                         value={formData.bedrooms}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     >
//                         <option value="">Bedrooms</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4+">4+</option>
//                     </select>
//                 </div>

//             </div>
//         </div>
//     );
// }



"use client";

import { Home, MapPin, DollarSign, Bed, Building } from "lucide-react";

interface PropertyInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AddClientPart2({ formData, handleChange }: PropertyInfoProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Property Type */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500" />
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select property type</option>
                            <option value="apartment">🏢 Apartment</option>
                            <option value="house">🏠 House</option>
                            <option value="villa">🏰 Villa</option>
                            <option value="commercial">🏭 Commercial</option>
                            <option value="land">🌾 Land</option>
                        </select>
                    </div>
                </div>

                {/* Preferred Locations */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Preferred Locations
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            name="preferredLocations"
                            value={formData.preferredLocations}
                            onChange={handleChange}
                            placeholder="e.g., Downtown, Westside"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Min Budget */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Minimum Budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500" />
                        <input
                            type="text"
                            name="minBudget"
                            value={formData.minBudget}
                            onChange={handleChange}
                            placeholder="$50,000"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Max Budget */}
                <div className="group">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Maximum Budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500" />
                        <input
                            type="text"
                            name="maxBudget"
                            value={formData.maxBudget}
                            onChange={handleChange}
                            placeholder="$500,000"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Bedrooms */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                            <option value="4+">4+ Bedrooms</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}