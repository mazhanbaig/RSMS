'use client'

import { auth, checkUserSession, getData, updateData, deleleData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import {
    Home, MapPin, Bed, Bath, Square, Calendar,
    Phone, Check, Share2, Heart, Car, Trees, Shield,
    Edit, ArrowLeft, DollarSign, Star, Target, Users,
    FileText, Activity, Zap, Briefcase, Layers, Compass,
    LineChart, Clipboard, Eye, Building, AlertCircle,
    ChevronRight, CheckCircle, Clock, TrendingUp,
    MessageSquare, Plus, Mail, PhoneCall, ExternalLink,
    Trash2,
    X
} from "lucide-react"
import Button from "@/components/Button"
import { message } from "antd"
import Header from "@/components/Header"

interface PropertyFormData {
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
    amenities: string[];
    facingDirection?: string;
    propertyCondition: string;
    isFurnished: boolean;
    hasParking: boolean;
    hasGarden: boolean;
    hasSecurity: boolean;
    images?: any;
    propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation'
    dealType: 'sold' | 'rented'
    createdAt?: string;
    updatedAt?: string;
}

export default function ViewPropertyPage() {
    const [property, setProperty] = useState<PropertyFormData | null>(null)
    const [relatedProperties, setRelatedProperties] = useState<any[]>([])
    const [currIndex, setCurrIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [liked, setLiked] = useState(false)
    const [activePanel, setActivePanel] = useState('overview')
    const [isOpen, setIsOpen] = useState(false);
    const [viewDesc, setViewDesc] = useState<boolean>(true)

    const { propertyid } = useParams()
    const router = useRouter()

    // Property status configuration - Updated to match Owners page colors
    const propertyStatusConfig: any = useMemo(() => ({
        'available': {
            label: 'Available',
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
            border: 'border-emerald-200',
            icon: <Check className="w-3 h-3" />
        },
        'rented': {
            label: 'Rented',
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            border: 'border-indigo-200',
            icon: <CheckCircle className="w-3 h-3" />
        },
        'sold': {
            label: 'Sold',
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            border: 'border-purple-200',
            icon: <CheckCircle className="w-3 h-3" />
        },
        'under-Negotiation': {
            label: 'Under Negotiation',
            color: 'text-amber-600',
            bg: 'bg-amber-100',
            border: 'border-amber-200',
            icon: <Clock className="w-3 h-3" />
        }
    }), [])

    // Property type configuration - Updated to match Owners page colors
    const propertyTypeConfig = useMemo(() => ({
        'House': {
            label: 'House',
            icon: <Home className="w-4 h-4" />,
            color: 'text-emerald-600',
            bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
            border: 'border-emerald-200'
        },
        'Flat/Apartment': {
            label: 'Flat/Apartment',
            icon: <Building className="w-4 h-4" />,
            color: 'text-indigo-600',
            bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
            border: 'border-indigo-200'
        },
        'Commercial': {
            label: 'Commercial',
            icon: <Briefcase className="w-4 h-4" />,
            color: 'text-purple-600',
            bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
            border: 'border-purple-200'
        },
        'Plot': {
            label: 'Plot',
            icon: <Square className="w-4 h-4" />,
            color: 'text-amber-600',
            bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
            border: 'border-amber-200'
        }
    }), [])

    // Panel configuration
    const panels = useMemo(() => [
        { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
        { id: 'details', label: 'Details', icon: <Clipboard className="w-4 h-4" /> },
        { id: 'features', label: 'Features', icon: <Target className="w-4 h-4" /> },
        { id: 'media', label: 'Media', icon: <FileText className="w-4 h-4" /> }
    ], [])

    // ✅ SINGLE useEffect for authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser = localStorage.getItem('userInfo');
                if (!storedUser) {
                    message.error('User info not found');
                    router.replace('/login');
                    return;
                }

                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

            } catch (err) {
                console.error('Authentication error:', err);
                message.error('Error occurred during authentication');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // Fetch property when userInfo and propertyid are available
    useEffect(() => {
        if (!propertyid || !userInfo?.uid) return;
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid;
        fetchPropertyData(id);
    }, [propertyid, userInfo?.uid]);

    const fetchPropertyData = useCallback((id: string) => {
        setLoading(true);
        if (!userInfo?.uid) {
            message.error('Something went wrong!')
        }
        getData(`properties/${userInfo?.uid}/${id}`)
            .then((res: any) => {
                if (!res) {
                    message.error("Property not found");
                    if (userInfo?.uid) {
                        router.replace(`/realstate/${userInfo.uid}/properties`);
                    } else {
                        router.replace('/login');
                    }
                    return;
                }
                setProperty(res);
                fetchRelatedProperties(res);
            })
            .catch(err => {
                console.error(err);
                message.error("Failed to load property");
            })
            .finally(() => setLoading(false));
    }, [userInfo?.uid, router]);

    const fetchRelatedProperties = useCallback((currentProperty?: PropertyFormData) => {
        if (!userInfo?.uid) return;

        getData(`properties/${userInfo?.uid}`)
            .then((allProps: any) => {
                if (!allProps) return;
                const propsArray = Object.entries(allProps).map(([key, value]: [string, any]) => ({ id: key, ...value }));
                const current = currentProperty || property;

                if (current) {
                    let related = propsArray.filter((p: any) =>
                        p.id !== propertyid &&
                        p.city === current.city &&
                        p.propertyType === current.propertyType
                    ).slice(0, 3);
                    setRelatedProperties(related);
                }
            })
            .catch(err => console.error(err));
    }, [property, propertyid, userInfo?.uid]);

    const handleNext = useCallback(() => {
        if (!property?.images) return;
        setCurrIndex(prev => prev + 1 < property.images!.length ? prev + 1 : 0);
    }, [property]);

    const handleShare = useCallback(() => {
        const shareText = `Check out ${property?.title} at ${property?.location}, ${property?.city}. Price: ₹${property?.price} ${property?.priceUnit}`;
        if (navigator.share) {
            navigator.share({
                title: property?.title,
                text: shareText,
                url: `https://zstate.vercel.app/public-property/${propertyid}`
            });
        } else {
            navigator.clipboard.writeText(shareText);
            message.success('Copied to clipboard!');
        }
    }, [property]);

    const handleStatusChange = useCallback((newStatus: PropertyFormData['propertyStatus']) => {
        if (!propertyid || !userInfo?.uid) return;

        updateData(`properties/${propertyid}`, { propertyStatus: newStatus })
            .then(() => {
                setProperty(prev => prev ? { ...prev, propertyStatus: newStatus } : null);
                message.success(`Property marked as ${propertyStatusConfig[newStatus].label}`);
            })
            .catch((err) => {
                console.error(err);
                message.error('Failed to change status of property');
            });
    }, [propertyid, userInfo?.uid, propertyStatusConfig]);

    const handleDeleteProperty = useCallback(() => {
        if (!propertyid || !userInfo?.uid || !window.confirm("Are you sure you want to delete this property?")) return;

        deleleData(`properties/${propertyid}`)
            .then(() => {
                message.success("Property deleted successfully");
                router.replace(`/realstate/${userInfo.uid}/properties`);
            })
            .catch((err) => {
                console.error(err);
                message.error("Failed to delete property");
            });
    }, [propertyid, userInfo?.uid, router]);

    // Format date
    const formatDate = useCallback((dateString?: string) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }, []);

    // Memoized status config
    const currentStatusConfig = useMemo(() =>
        property ? propertyStatusConfig[property.propertyStatus] : propertyStatusConfig.available,
        [property, propertyStatusConfig]
    );

    // Memoized type config
    const currentTypeConfig = useMemo(() =>
        property ? propertyTypeConfig[property.propertyType as keyof typeof propertyTypeConfig] || propertyTypeConfig.House : propertyTypeConfig.House,
        [property, propertyTypeConfig]
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-64 bg-slate-200 rounded-xl"></div>
                                <div className="h-32 bg-slate-200 rounded-xl"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-48 bg-slate-200 rounded-xl"></div>
                                <div className="h-32 bg-slate-200 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
                <Header userData={userInfo} />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                            <div className="text-2xl">✕</div>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">Property Not Found</h2>
                        <p className="text-slate-500 mb-6">The property you're looking for doesn't exist.</p>
                        <Button
                            label="Back to Properties"
                            onClick={() => router.push(`/realstate/${userInfo?.uid}/properties`)}
                            variant="theme2"
                            size="md"
                            icon={<ArrowLeft className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={userInfo} />

            <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Property Header - Matching Owners Page Style */}
                <div className="mb-8 mt-5">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left Section */}
                        <div className="flex items-start gap-3 sm:items-center">
                            <button
                                onClick={() => router.back()}
                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </button>

                            <div className="hidden sm:block h-6 w-px bg-slate-300"></div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Property Details</span>
                                    <div className="w-4 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
                                    {property.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <p className="text-sm text-slate-600 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        {property.location}, {property.city}
                                    </p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${currentStatusConfig.bg} ${currentStatusConfig.color} ${currentStatusConfig.border}`}>
                                        {currentStatusConfig.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div
                                className={`px-3 py-1.5 rounded-lg ${currentTypeConfig.bg} border ${currentTypeConfig.border} flex items-center gap-2`}
                            >
                                {currentTypeConfig.icon}
                                <span className="text-sm font-medium text-slate-700">
                                    {currentTypeConfig.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Price Display - Matching Owners Page Card Style */}
                    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="text-sm font-medium text-slate-700">Total Price</div>
                                <div className="text-3xl font-bold text-slate-800 mt-1">
                                    Rs{property.price} {property.priceUnit}
                                </div>
                                <div className="text-sm text-slate-600 mt-2 flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Square className="w-4 h-4 text-indigo-500" />
                                        {property.area} {property.areaUnit}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bed className="w-4 h-4 text-indigo-500" />
                                        {property.bedrooms} Beds
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bath className="w-4 h-4 text-indigo-500" />
                                        {property.bathrooms} Baths
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors"
                                >
                                    <Share2 className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Panel Navigation - Matching Owners Page Filter Style */}
                        <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-sm">
                            <div className="flex gap-2 overflow-x-auto">
                                {panels.map((panel) => (
                                    <button
                                        key={panel.id}
                                        onClick={() => setActivePanel(panel.id)}
                                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                                            ${activePanel === panel.id
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                            }`}
                                    >
                                        {panel.icon}
                                        {panel.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Panel Content - Matching Owners Page Card Style */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            {activePanel === 'overview' && (
                                <div className="p-6">
                                    {/* Image Carousel */}
                                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                                        {property.images?.[currIndex] ? (
                                            <img
                                                src={property.images[currIndex]?.url}
                                                alt={property.title}
                                                className="w-full h-full object-fill cursor-pointer"
                                                onClick={() => setIsOpen(true)}
                                            />

                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-100 to-slate-200">
                                                <Home className="w-16 h-16 text-slate-400" />
                                            </div>
                                        )}
                                        {property.images && property.images.length > 1 && (
                                            <div>
                                                <button
                                                    onClick={handleNext}
                                                    className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow transition-shadow border border-slate-200"
                                                >
                                                    Next <ChevronRight className="w-4 h-4 inline ml-1" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setViewDesc(!viewDesc)
                                                    }}
                                                    className={`${viewDesc == true ? '' : 'hidden'} absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow transition-shadow border border-slate-200 text-xs text-slate-500`}
                                                >
                                                    Click image for full screen
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Overview Content */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-4">Property Overview</h3>
                                            <p className="text-slate-700 leading-relaxed">
                                                {property.description || "No description provided."}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Bed className="w-4 h-4 text-indigo-600" />
                                                    <span className="text-sm text-slate-600">Bedrooms</span>
                                                </div>
                                                <div className="font-bold text-slate-800 text-lg">{property.bedrooms}</div>
                                            </div>
                                            <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Bath className="w-4 h-4 text-emerald-600" />
                                                    <span className="text-sm text-slate-600">Bathrooms</span>
                                                </div>
                                                <div className="font-bold text-slate-800 text-lg">{property.bathrooms}</div>
                                            </div>
                                            <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Square className="w-4 h-4 text-purple-600" />
                                                    <span className="text-sm text-slate-600">Area</span>
                                                </div>
                                                <div className="font-bold text-slate-800 text-lg">{property.area} <span className="text-sm font-normal text-slate-500">{property.areaUnit}</span></div>
                                            </div>
                                            <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="w-4 h-4 text-amber-600" />
                                                    <span className="text-sm text-slate-600">Year Built</span>
                                                </div>
                                                <div className="font-bold text-slate-800 text-lg">{property.yearBuilt || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activePanel === 'details' && (
                                <div className="p-6 space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800">Property Details</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <MapPin className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800">Location Details</div>
                                                <div className="text-slate-700 mt-1">
                                                    {property.location}, {property.city}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <DollarSign className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800">Pricing Details</div>
                                                <div className="text-slate-700 mt-1">
                                                    Rs{property.price} {property.priceUnit} • {property.propertyCondition}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                <Building className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800">Property Type</div>
                                                <div className="text-slate-700 mt-1 capitalize">
                                                    {property.propertyType} • Facing {property.facingDirection || 'Not specified'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activePanel === 'features' && (
                                <div className="p-6 space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800">Features & Amenities</h3>

                                    {/* Key Features */}
                                    {property.features?.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="font-medium text-slate-800">Key Features</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {property.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                                                        <Check className="w-4 h-4 text-emerald-600" />
                                                        <span className="text-slate-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Amenities */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-slate-800">Amenities</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={`flex items-center gap-2 p-2.5 ${property.isFurnished ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'} border rounded-lg`}>
                                                <Home className={`w-4 h-4 ${property.isFurnished ? 'text-emerald-600' : 'text-slate-400'}`} />
                                                <span className={property.isFurnished ? 'text-slate-700' : 'text-slate-500'}>
                                                    {property.isFurnished ? "Furnished" : "Unfurnished"}
                                                </span>
                                            </div>
                                            <div className={`flex items-center gap-2 p-2.5 ${property.hasParking ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'} border rounded-lg`}>
                                                <Car className={`w-4 h-4 ${property.hasParking ? 'text-emerald-600' : 'text-slate-400'}`} />
                                                <span className={property.hasParking ? 'text-slate-700' : 'text-slate-500'}>
                                                    {property.hasParking ? "Parking" : "No Parking"}
                                                </span>
                                            </div>
                                            <div className={`flex items-center gap-2 p-2.5 ${property.hasGarden ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'} border rounded-lg`}>
                                                <Trees className={`w-4 h-4 ${property.hasGarden ? 'text-emerald-600' : 'text-slate-400'}`} />
                                                <span className={property.hasGarden ? 'text-slate-700' : 'text-slate-500'}>
                                                    {property.hasGarden ? "Garden" : "No Garden"}
                                                </span>
                                            </div>
                                            <div className={`flex items-center gap-2 p-2.5 ${property.hasSecurity ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'} border rounded-lg`}>
                                                <Shield className={`w-4 h-4 ${property.hasSecurity ? 'text-emerald-600' : 'text-slate-400'}`} />
                                                <span className={property.hasSecurity ? 'text-slate-700' : 'text-slate-500'}>
                                                    {property.hasSecurity ? "24/7 Security" : "No Security"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activePanel === 'media' && (
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Property Media</h3>
                                    {property.images && property.images.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {property.images.map((image: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-slate-200 hover:border-indigo-400 transition-colors"
                                                    onClick={() => setCurrIndex(index)}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Property ${index + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                    />
                                                    {index === currIndex && (
                                                        <div className="absolute inset-0 border-2 border-indigo-500"></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-slate-500">
                                            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                            <p>No images available for this property.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar - Matching Owners Page Card Style */}
                    <div className="space-y-6">
                        {/* Owner Info */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Owner Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                        {property.ownerName?.charAt(0).toUpperCase() || 'O'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">
                                            {property.ownerName || 'Not specified'}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            Property Owner
                                        </div>
                                    </div>
                                </div>

                                {property.ownerContact && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <Phone className="w-4 h-4 text-slate-600" />
                                        <span className="text-sm font-medium text-slate-800">{property.ownerContact}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Management */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Manage Property</h3>
                            </div>

                            {/* Status Update */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">Update Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(propertyStatusConfig).map(([key, config]: any) => (
                                        <button
                                            key={key}
                                            onClick={() => handleStatusChange(key as PropertyFormData['propertyStatus'])}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center justify-center gap-2
                                                ${property.propertyStatus === key
                                                    ? `${config.bg} ${config.color} ${config.border}`
                                                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            {config.icon}
                                            {config.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-2 mt-4">
                                <Button
                                    label="Contact Owner"
                                    variant="theme"
                                    icon={<PhoneCall className="w-4 h-4" />}
                                    size="sm"
                                    fullWidth
                                    onClick={() => { property.ownerContact && window.open(`tel:${property.ownerContact}`) }}
                                    disabled={!property.ownerContact}
                                />
                                <Button
                                    label="Schedule Viewing"
                                    variant="theme2"
                                    icon={<Calendar className="w-4 h-4" />}
                                    size="sm"
                                    fullWidth
                                    onClick={() => router.push(`/realstate/${userInfo?.uid}/events/addevent`)}
                                />
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={handleDeleteProperty}
                                className="w-full mt-4 px-4 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-2 border border-rose-200"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Property
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Properties - Matching Owners Page Card Style */}
                {relatedProperties.length > 0 && (
                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800">Similar Properties</h2>
                            <Button
                                label="View All"
                                variant="theme2"
                                size="sm"
                                onClick={() => router.push(`/realstate/${userInfo?.uid}/properties`)}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedProperties.map((prop) => {
                                const propTypeConfig: any = propertyTypeConfig[prop.propertyType as keyof typeof propertyTypeConfig] || propertyTypeConfig.House
                                const propStatusConfig = propertyStatusConfig[prop.propertyStatus]

                                return (
                                    <div
                                        key={prop.id}
                                        onClick={() => router.push(`/realstate/${userInfo?.uid}/properties/viewproperty/${prop.id}`)}
                                        className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                                    >
                                        <div className="relative h-40">
                                            {prop.images?.[0] ? (
                                                <img
                                                    src={prop.images[0]}
                                                    alt={prop.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-100 to-slate-200">
                                                    <Home className="w-8 h-8 text-slate-400" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${propStatusConfig.bg} ${propStatusConfig.color} ${propStatusConfig.border}`}>
                                                    {propStatusConfig.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`p-1.5 rounded-lg ${propTypeConfig.bg}`}>
                                                    <div className={propTypeConfig.color}>
                                                        {propTypeConfig.icon}
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-slate-800 truncate">{prop.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="truncate">{prop.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="font-bold text-slate-800">
                                                    ₹{Number(prop.price).toLocaleString('en-IN')} {prop.priceUnit}
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Full Screen Image Modal */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <img
                            src={property.images[currIndex]?.url}
                            alt={property.title}
                            className="max-h-[95vh] max-w-[95vw] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                )}

            </main>
        </div>
    )
}