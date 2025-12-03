'use client';

interface BasicInfoProps {
    formData: any;
    handleChange: (e: any) => void;
}

export default function AddPropertyPart1({ formData, handleChange }: BasicInfoProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Property Title *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Property Type *</option>
                    <option value="House">House</option>
                    <option value="Flat/Apartment">Flat/Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Farm House">Farm House</option>
                    <option value="Commercial Plaza">Commercial Plaza</option>
                    <option value="Shop">Shop</option>
                    <option value="Plot">Plot</option>
                </select>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="Enter price"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <select
                            name="priceUnit"
                            value={formData.priceUnit}
                            onChange={handleChange}
                            className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="Lakh">Lakh</option>
                            <option value="Crore">Crore</option>
                            <option value="Thousand">Thousand</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="col-span-2 block text-sm font-medium text-gray-700 mb-2">Area *</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            placeholder="Enter area"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <select
                            name="areaUnit"
                            value={formData.areaUnit}
                            onChange={handleChange}
                            className="w-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="Square Feet">Square Feet</option>
                            <option value="Square Yards">Square Yards</option>
                            <option value="Marla">Marla</option>
                            <option value="Kanal">Kanal</option>
                        </select>
                    </div>
                </div>

                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select City *</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                </select>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location/Sector *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Bedrooms</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                    ))}
                </select>

                <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Bathrooms</option>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}