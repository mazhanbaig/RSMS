
// app/public-properties/page.tsx
'use client';

import { getData } from "@/FBConfig/fbFunctions";
import { useEffect, useState } from "react";
import { Home, MapPin, Search, Filter, ChevronRight, Building } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import { Input, Select, Empty, Spin } from "antd";

const { Search: AntSearch } = Input;

export default function PublicPropertiesPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCity, setFilterCity] = useState("");
    const [filterType, setFilterType] = useState("");

    useEffect(() => {
        fetchPublicProperties();
    }, []);

    const fetchPublicProperties = async () => {
        setLoading(true);
        try {
            const data = await getData(`public_properties`);
            if (data) {
                const propertiesArray = Object.entries(data)
                    .map(([key, value]: [string, any]) => ({ id: key, ...value }))
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setProperties(propertiesArray);
                setFilteredProperties(propertiesArray);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = properties;

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCity) {
            filtered = filtered.filter(p => p.city === filterCity);
        }

        if (filterType) {
            filtered = filtered.filter(p => p.propertyType === filterType);
        }

        setFilteredProperties(filtered);
    }, [searchTerm, filterCity, filterType, properties]);

    const cities = [...new Set(properties.map(p => p.city))];
    const types = [...new Set(properties.map(p => p.propertyType))];

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-IN').format(Number(price));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Spin size="large" tip="Loading properties..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <Building className="w-6 h-6 text-purple-600" />
                        <span className="font-bold text-xl">Z-RealEstate</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse All Properties</h1>
                    <p className="text-gray-600">Discover your dream property from our extensive collection</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <AntSearch
                            placeholder="Search by title, location, or city..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="large"
                            className="rounded-lg"
                        />
                        <Select
                            placeholder="Filter by City"
                            allowClear
                            onChange={(value) => setFilterCity(value)}
                            className="rounded-lg"
                            size="large"
                            options={cities.map(city => ({ label: city, value: city }))}
                        />
                        <Select
                            placeholder="Filter by Property Type"
                            allowClear
                            onChange={(value) => setFilterType(value)}
                            className="rounded-lg"
                            size="large"
                            options={types.map(type => ({ label: type, value: type }))}
                        />
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">
                        Found <span className="font-bold text-gray-900">{filteredProperties.length}</span> properties
                    </p>
                </div>

                {/* Properties Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property, idx) => (
                            <Link key={property.id} href={`/public-property/${property.id}`}>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
                                    <div className="relative h-56 overflow-hidden">
                                        {property.images?.[0] ? (
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-100">
                                                <Home className="w-12 h-12 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium">
                                                {property.city}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{property.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-gray-500">Price</span>
                                                <div className="font-bold text-purple-600">
                                                    ₹{formatPrice(property.price)} <span className="text-xs">/{property.priceUnit}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.bedrooms} Beds</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.bathrooms} Baths</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Empty
                        description="No properties found matching your criteria"
                        className="py-12"
                    />
                )}
            </main>
        </div>
    );
}