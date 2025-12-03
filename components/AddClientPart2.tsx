"use client";

interface PropertyInfoProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AddClientPart2({ formData, handleChange }: PropertyInfoProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Property Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="" disabled>Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Preferred Locations
                    </label>
                    <input
                        type="text"
                        name="preferredLocations"
                        value={formData.preferredLocations}
                        onChange={handleChange}
                        placeholder="Preferred Locations"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Min Budget <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="minBudget"
                        value={formData.minBudget}
                        onChange={handleChange}
                        placeholder="Min Budget"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Max Budget <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="maxBudget"
                        value={formData.maxBudget}
                        onChange={handleChange}
                        placeholder="Max Budget"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                </div>

            </div>
        </div>
    );
}
