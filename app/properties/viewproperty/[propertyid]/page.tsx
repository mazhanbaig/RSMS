'use client'

import { getData, deleleData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Home, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, User, Check, Star, ArrowLeft, Edit, Trash2 } from "lucide-react"
import Button from "@/components/Button"
import { message } from "antd"
import Header from "@/components/Header"

export default function ViewProperty() {
    const [property, setProperty] = useState<any>(null)
    const [relatedProperties, setRelatedProperties] = useState<any[]>([])
    const { id } = useParams()
    const router = useRouter()

    useEffect(() => {
        if (id) {
            fetchPropertyData()
        }
    }, [id])

    const fetchPropertyData = () => {
        getData(`properties/${id}`)
            .then((res) => {
                setProperty(res)
                // Fetch related properties (same city or type)
                getData('properties/')
                    .then(allProperties => {
                        if (allProperties) {
                            const propertiesArray = Object.values(allProperties)
                            const related = propertiesArray
                                .filter((p: any) =>
                                    p.id !== id &&
                                    (p.city === res.city || p.propertyType === res.propertyType)
                                )
                                .slice(0, 4)
                            setRelatedProperties(related)
                        }
                    })
            })
            .catch(err => {
                console.error(err)
                message.error('Failed to load property')
            })
    }

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this property?')) {
            deleteData(`properties/${id}`)
                .then(() => {
                    message.success('Property deleted successfully')
                    router.push('/properties')
                })
                .catch(err => {
                    message.error('Failed to delete property')
                })
        }
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-40 bg-gray-200 rounded-xl"></div>
                                <div className="h-40 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Properties</span>
                    </button>
                </div>

                {/* Property Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <MapPin size={18} className="text-purple-600" />
                                    <span>{property.location}, {property.city}</span>
                                </div>
                                <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                                    {property.propertyCondition || 'Available'}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                label="Edit"
                                variant="theme2"
                                size="md"
                                onClick={() => router.push(`/properties/edit/${id}`)}
                            />
                            <Button
                                label="Delete"
                                variant="danger"
                                size="md"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>

                    {/* Price Display */}
                    <div className="p-6 bg-gradient-to-r from-gray-900 to-black rounded-xl text-white mb-6">
                        <div className="text-sm font-medium text-gray-300 mb-1">TOTAL PRICE</div>
                        <div className="text-5xl font-bold mb-2">{property.price} {property.priceUnit}</div>
                        <div className="text-gray-300">
                            {property.area} {property.areaUnit} • {property.propertyType}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column - Images */}
                        <div className="md:col-span-2">
                            {/* Main Image */}
                            <div className="mb-6">
                                {property.images && property.images[0] ? (
                                    <div className="relative h-96 rounded-xl overflow-hidden">
                                        <img
                                            src={property.images[0]}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                                        <Home size={64} className="text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {property.images && property.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3 mb-8">
                                    {property.images.slice(1, 5).map((img: string, idx: number) => (
                                        <div key={idx} className="h-24 rounded-lg overflow-hidden">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Features */}
                            {property.features && property.features.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {property.features.map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <Check size={16} className="text-green-600" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bed size={20} />
                                            <span>Bedrooms</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.bedrooms}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bath size={20} />
                                            <span>Bathrooms</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.bathrooms}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Square size={20} />
                                            <span>Area</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.area} {property.areaUnit}</span>
                                    </div>
                                    {property.yearBuilt && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={20} />
                                                <span>Year Built</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{property.yearBuilt}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Home size={20} />
                                            <span>Property Type</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.propertyType}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                                <div className="space-y-3">
                                    {property.hasParking && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-gray-700">Parking Available</span>
                                        </div>
                                    )}
                                    {property.hasGarden && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-700">Garden</span>
                                        </div>
                                    )}
                                    {property.hasSecurity && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-gray-700">Security</span>
                                        </div>
                                    )}
                                    {property.isFurnished && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span className="text-gray-700">Fully Furnished</span>
                                        </div>
                                    )}
                                    {property.amenities && property.amenities.map((amenity: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            <span className="text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Owner Info */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                                            {property.ownerName?.charAt(0).toUpperCase() || 'O'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{property.ownerName}</div>
                                            <div className="text-sm text-gray-600">Property Owner</div>
                                        </div>
                                    </div>
                                    {property.ownerContact && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Phone size={18} />
                                            <span>{property.ownerContact}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Properties */}
                    {relatedProperties.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedProperties.map((related) => (
                                    <div
                                        key={related.id}
                                        onClick={() => router.push(`/properties/viewproperty/${related.id}`)}
                                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 line-clamp-1 mb-2">{related.title}</h3>
                                            <div className="flex items-center gap-1 text-gray-600 mb-3">
                                                <MapPin size={12} />
                                                <span className="text-xs truncate">{related.location}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-lg font-bold text-gray-900">{related.price}</div>
                                                <div className="text-sm text-gray-500">{related.bedrooms} Beds</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}