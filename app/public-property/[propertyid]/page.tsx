'use client'

import { getData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import {
    Home, MapPin, Bed, Bath, Square, Calendar,
    Phone, Check, Share2, Car, Trees, Shield,
    ArrowLeft, DollarSign, Target, Users,
    FileText, Eye, Building, ChevronRight,
    CheckCircle, Clock, PhoneCall, X, Award,
    Sparkles, Globe, Heart, Maximize2
} from "lucide-react"
import Button from "@/components/Button"
import { message } from "antd"
import Link from "next/link"
import Image from "next/image"

interface PublicPropertyData {
    id: string;
    title: string;
    description: string;
    propertyType: string;
    price: string;
    priceUnit: string;
    location: string;
    city: string;
    area: string;
    areaUnit: string;
    bedrooms: string;
    bathrooms: string;
    yearBuilt?: string;
    ownerName: string;
    ownerContact?: string;
    features: string[];
    facingDirection?: string;
    propertyCondition: string;
    isFurnished: boolean;
    hasParking: boolean;
    hasGarden: boolean;
    hasSecurity: boolean;
    images?: any[];
    propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation';
    agentName?: string;
    createdAt?: string;
}

export default function PublicPropertyPage() {
    const [property, setProperty] = useState<PublicPropertyData | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const { propertyid } = useParams()
    const router = useRouter()

    // Fetch property from public collection
    useEffect(() => {
        if (!propertyid) return
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid
        fetchPublicProperty(id)
    }, [propertyid])

    const fetchPublicProperty = async (id: string) => {
        setLoading(true)
        try {
            const data = await getData(`properties/${id}`)
            if (data) {
                setProperty(data)
            } else {
                message.error("Property not found")
                setTimeout(() => router.push('/'), 2000)
            }
        } catch (error) {
            console.error(error)
            message.error("Failed to load property")
        } finally {
            setLoading(false)
        }
    }

    const handleShare = () => {
        const shareText = `🏠 Check out ${property?.title} in ${property?.city}! Price: ₹${property?.price} ${property?.priceUnit}`
        if (navigator.share) {
            navigator.share({
                title: property?.title,
                text: shareText,
                url: window.location.href
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            message.success("Property link copied to clipboard!")
        }
    }

    const getStatusStyle = (status: string) => {
        const styles: any = {
            available: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Available' },
            rented: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Rented' },
            sold: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500', label: 'Sold' },
            'under-Negotiation': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', label: 'Under Negotiation' }
        }
        return styles[status] || styles.available
    }

    const getPropertyTypeIcon = (type: string) => {
        const types: any = {
            house: <Home className="w-5 h-5" />,
            apartment: <Building className="w-5 h-5" />,
            commercial: <Building className="w-5 h-5" />,
            land: <Square className="w-5 h-5" />,
            villa: <Home className="w-5 h-5" />
        }
        return types[type?.toLowerCase()] || <Home className="w-5 h-5" />
    }

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-IN').format(Number(price))
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Recently'
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-2xl mb-6"></div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-48 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Home className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
                    <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
                    <Link href="/">
                        <Button label="Back to Home" variant="theme" size="lg" />
                    </Link>
                </div>
            </div>
        )
    }

    const statusStyle = getStatusStyle(property.propertyStatus)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple Public Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <Building className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-xl text-gray-900">Z-RealEstate</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button label="Login" variant="secondary" size="sm" />
                            </Link>
                            <Link href="/signup">
                                <Button label="Join as Agent" variant="theme" size="sm" icon={<Award className="w-4 h-4" />} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Images & Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="relative h-96 bg-gray-100">
                                {property.images && property.images.length > 0 ? (
                                    <>
                                        <img
                                            src={property.images[currentImageIndex]?.url || property.images[currentImageIndex]}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => setIsFullscreen(true)}
                                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                                        >
                                            <Maximize2 className="w-4 h-4 text-white" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                                        <Home className="w-20 h-20 text-gray-400" />
                                    </div>
                                )}

                                {/* Image Thumbnails */}
                                {property.images && property.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {property.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`}></span>
                                            {statusStyle.label}
                                        </span>
                                        <span className="text-xs text-gray-500">Listed {formatDate(property.createdAt)}</span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">{property.location}, {property.city}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </button>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <div className="text-sm text-gray-500 mb-1">Price</div>
                                <div className="text-3xl font-bold text-gray-900">
                                    ₹{formatPrice(property.price)} <span className="text-lg font-normal text-gray-500">{property.priceUnit}</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Key Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <Bed className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Bedrooms</div>
                                    <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <Bath className="w-5 h-5 text-green-600 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Bathrooms</div>
                                    <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <Square className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Area</div>
                                    <div className="font-semibold text-gray-900">{property.area} {property.areaUnit}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <Calendar className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Year Built</div>
                                    <div className="font-semibold text-gray-900">{property.yearBuilt || '-'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {property.description || "No description provided."}
                            </p>
                        </div>

                        {/* Features */}
                        {property.features && property.features.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`flex items-center gap-2 ${property.isFurnished ? 'text-gray-900' : 'text-gray-400'}`}>
                                    <Home className="w-4 h-4" />
                                    <span className="text-sm">{property.isFurnished ? 'Furnished' : 'Unfurnished'}</span>
                                </div>
                                <div className={`flex items-center gap-2 ${property.hasParking ? 'text-gray-900' : 'text-gray-400'}`}>
                                    <Car className="w-4 h-4" />
                                    <span className="text-sm">{property.hasParking ? 'Parking' : 'No Parking'}</span>
                                </div>
                                <div className={`flex items-center gap-2 ${property.hasGarden ? 'text-gray-900' : 'text-gray-400'}`}>
                                    <Trees className="w-4 h-4" />
                                    <span className="text-sm">{property.hasGarden ? 'Garden' : 'No Garden'}</span>
                                </div>
                                <div className={`flex items-center gap-2 ${property.hasSecurity ? 'text-gray-900' : 'text-gray-400'}`}>
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm">{property.hasSecurity ? '24/7 Security' : 'No Security'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & CTA */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Listed by</div>
                                    <div className="text-sm text-gray-600">{property.agentName || 'Professional Agent'}</div>
                                </div>
                            </div>

                            {property.ownerContact && (
                                <a
                                    href={`tel:${property.ownerContact}`}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium">{property.ownerContact}</span>
                                    </div>
                                    <PhoneCall className="w-4 h-4 text-gray-400" />
                                </a>
                            )}

                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-gray-900">Interested in this property?</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">
                                    Join Z-RealEstate as an agent to contact owners and access more properties.
                                </p>
                            </div>

                            <Link href="/signup">
                                <Button
                                    label="Join as Agent - Free"
                                    variant="theme"
                                    size="lg"
                                    icon={<Award className="w-4 h-4" />}
                                />
                            </Link>

                            <button
                                onClick={handleShare}
                                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Property
                            </button>
                        </div>

                        {/* Why Join Card */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5">
                            <h4 className="font-semibold text-gray-900 mb-2">Why join as an agent?</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Contact property owners directly
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Schedule property viewings
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    List your own properties
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Access to thousands of listings
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fullscreen Modal */}
            {isFullscreen && property.images && property.images[currentImageIndex] && (
                <div
                    className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                    onClick={() => setIsFullscreen(false)}
                >
                    <img
                        src={property.images[currentImageIndex]?.url || property.images[currentImageIndex]}
                        alt={property.title}
                        className="max-h-screen max-w-screen object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    {property.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : Number(property?.images?.length) - 1)
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                            >
                                ←
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(prev => prev < Number(property?.images?.length) - 1 ? prev + 1 : 0)
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                            >
                                →
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}