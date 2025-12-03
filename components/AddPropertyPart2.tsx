'use client';

interface PropertyDetailsProps {
    formData: any;
    handleChange: (e: any) => void;
    handleFeatureToggle: (feature: string) => void;
    handleAmenityToggle: (amenity: string) => void;
}

export default function AddPropertyPart2({
    formData,
    handleChange,
    handleFeatureToggle,
    handleAmenityToggle
}: PropertyDetailsProps) {
    const features = ['Boundary Wall', 'Main Gate', 'Mosque Nearby', 'School Nearby', 'Hospital Nearby', 'Market Nearby'];
    const amenities = ['Swimming Pool', 'Gym', 'Park', 'Security Cameras', 'Generator', 'Water Tank'];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Property Details</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your property..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    name="facingDirection"
                    value={formData.facingDirection}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Facing Direction</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                </select>

                <select
                    name="propertyCondition"
                    value={formData.propertyCondition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Property Condition</option>
                    <option value="New Construction">New Construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Renovated">Renovated</option>
                </select>

                <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    placeholder="Year Built"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                    <div className="space-y-2">
                        {features.map(feature => (
                            <label key={feature} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.features.includes(feature)}
                                    onChange={() => handleFeatureToggle(feature)}
                                    className="h-4 w-4 text-purple-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
                    <div className="space-y-2">
                        {amenities.map(amenity => (
                            <label key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(amenity)}
                                    onChange={() => handleAmenityToggle(amenity)}
                                    className="h-4 w-4 text-purple-600 rounded"
                                />
                                <span className="ml-2 text-gray-700">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.isFurnished}
                        onChange={() => handleChange({ target: { name: 'isFurnished', checked: !formData.isFurnished } })}
                        className="h-4 w-4 text-purple-600 rounded"
                    />
                    <span className="ml-2">Furnished</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.hasParking}
                        onChange={() => handleChange({ target: { name: 'hasParking', checked: !formData.hasParking } })}
                        className="h-4 w-4 text-purple-600 rounded"
                    />
                    <span className="ml-2">Parking</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.hasGarden}
                        onChange={() => handleChange({ target: { name: 'hasGarden', checked: !formData.hasGarden } })}
                        className="h-4 w-4 text-purple-600 rounded"
                    />
                    <span className="ml-2">Garden</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.hasSecurity}
                        onChange={() => handleChange({ target: { name: 'hasSecurity', checked: !formData.hasSecurity } })}
                        className="h-4 w-4 text-purple-600 rounded"
                    />
                    <span className="ml-2">Security</span>
                </label>
            </div>
        </div>
    );
}