'use client';

import { getPublicData, updatePublicData } from "@/FBConfig/fbFunctions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, MapPin, Bed, Bath, Square, Phone, Share2, Eye, Heart, Calendar, Check, Building, Users, Award } from "lucide-react";
import Link from "next/link";
import { message, Skeleton, Tag, Tooltip } from "antd";

export default function PublicPropertyPage() {
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const { propertyid } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!propertyid) return;
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid;
        fetchPublicProperty(id);
    }, [propertyid]);

    const fetchPublicProperty = async (id: string) => {
        setLoading(true);
        try {
            // ✅ Use getPublicData (no auth required!)
            const data = await getPublicData(`public_properties/${id}`);

            if (data && data.id) {
                setProperty(data);
                // Increment view count
                await updatePublicData(`public_properties/${id}`, {
                    viewCount: (data.viewCount || 0) + 1
                });
            } else {
                message.error("Property not found");
                setTimeout(() => router.push('/'), 2000);
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to load property");
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        const shareText = `🏠 Check out ${property?.title} in ${property?.city}! Price: ₹${property?.price} ${property?.priceUnit}`;
        if (navigator.share) {
            navigator.share({
                title: property?.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            message.success("Property link copied!");
        }
    };

    const getStatusStyle = (status: string) => {
        const styles: any = {
            available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Available' },
            rented: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Rented' },
            sold: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Sold' },
            'under-Negotiation': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Under Negotiation' }
        };
        return styles[status] || styles.available;
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-IN').format(Number(price));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <Skeleton active avatar paragraph={{ rows: 10 }} />
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
                    <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
                    <Link href="/" className="text-purple-600 hover:text-purple-700">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const statusStyle = getStatusStyle(property.propertyStatus);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Building className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">Z-RealEstate</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/public-properties">
                            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
                                Browse All
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                                Join as Agent
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="relative h-96 bg-gray-100">
                                {property.images?.[0] ? (
                                    <img
                                        src={property.images[currentImageIndex]?.url || property.images[currentImageIndex]}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Home className="w-20 h-20 text-gray-300" />
                                    </div>
                                )}
                                {property.images && property.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                        {property.images.map((_: any, idx: number) => (
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

                        {/* Title & Status */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag className={`${statusStyle.bg} ${statusStyle.text} border-0 px-2 py-0.5 rounded-full`}>
                                            {statusStyle.label}
                                        </Tag>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">{property.location}, {property.city}</span>
                                    </div>
                                </div>
                                <Tooltip title="Save property">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="p-2 rounded-full hover:bg-gray-100 transition"
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                    </button>
                                </Tooltip>
                            </div>
                            <div className="border-t pt-4">
                                <div className="text-sm text-gray-500 mb-1">Price</div>
                                <div className="text-3xl font-bold text-purple-600">
                                    ₹{formatPrice(property.price)} <span className="text-lg text-gray-500">/{property.priceUnit}</span>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="font-semibold text-lg mb-4">Key Specifications</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg text-center">
                                    <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                    <div className="text-xs text-gray-600">Bedrooms</div>
                                    <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-center">
                                    <Bath className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                    <div className="text-xs text-gray-600">Bathrooms</div>
                                    <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-center">
                                    <Square className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                    <div className="text-xs text-gray-600">Area</div>
                                    <div className="font-semibold text-gray-900">{property.area} {property.areaUnit}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-center">
                                    <Calendar className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                                    <div className="text-xs text-gray-600">Year Built</div>
                                    <div className="font-semibold text-gray-900">{property.yearBuilt || '-'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {property.description && (
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="font-semibold text-lg mb-2">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{property.description}</p>
                            </div>
                        )}

                        {/* Features */}
                        {property.features && property.features.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="font-semibold text-lg mb-3">Features</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
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
                                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4 hover:bg-green-100 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        <span className="font-medium">{property.ownerContact}</span>
                                    </div>
                                    <span className="text-green-600 text-sm">Call Now</span>
                                </a>
                            )}

                            <div className="border-t pt-4 mt-2">
                                <p className="text-sm text-gray-600 mb-4">
                                    Want to contact the owner and access more properties?
                                </p>
                                <Link href="/signup">
                                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2">
                                        <Award className="w-4 h-4" />
                                        Join as Agent - Free
                                    </button>
                                </Link>
                            </div>

                            <button
                                onClick={handleShare}
                                className="w-full mt-3 border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-medium"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Property
                            </button>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-purple-600" />
                                Property Stats
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Views</span>
                                    <span className="font-semibold text-gray-900">{property.viewCount || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Property ID</span>
                                    <span className="font-mono text-xs text-gray-500">#{property.id?.slice(-8)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}