'use client';
import { getPublicData, updatePublicData } from "@/FBConfig/fbFunctions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
import {
    Home, MapPin, Bed, Bath, Square, Phone, Share2, Eye, Heart, Calendar,
    Check, Building, Users, Award, X, ChevronLeft, ChevronRight,
    Maximize2, Clock, Shield, Car, Trees, Sparkles, Navigation, ExternalLink,
    MessageCircle, Star, BadgeCheck, Compass, Ruler, ArrowLeft, Briefcase,
    Layers, Target, Clipboard, CheckCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { message, Tooltip, Modal, Input, Button as AntButton } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HomeHeader from "@/components/HomeHeader";

// ==================== TYPES ====================

interface Property {
    id: string;
    title: string;
    price: number;
    area: number;
    areaUnit: string;
    bedrooms: number;
    bathrooms: number;
    location: string;
    city: string;
    description?: string;
    images: Array<{ url: string } | string>;
    propertyStatus: keyof typeof propertyStatusConfig;
    propertyType: keyof typeof propertyTypeConfig;
    propertyCondition?: string;
    dealType?: string;
    viewCount?: number;
    agentName?: string;
    ownerContact?: string;
    yearBuilt?: string;
    facingDirection?: string;
    isFurnished?: boolean;
    hasParking?: boolean;
    hasGarden?: boolean;
    hasSecurity?: boolean;
    features?: string[];
    priceUnit?: string;
}

interface InquiryData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// ==================== CONSTANTS ====================

const constants = {
    GALLERY: {
        ANIMATION_DURATION: 0.4
    },
    PRICE: {
        DEFAULT_CURRENCY: 'INR'
    },
    TOUCH: {
        SWIPE_THRESHOLD: 50
    }
} as const;

const propertyStatusConfig = {
    'available': {
        label: 'Available',
        color: 'text-green-600',
        bg: 'bg-gradient-to-r from-green-50 to-green-100',
        border: 'border-green-200',
        icon: <Check className="w-3 h-3" />
    },
    'rented': {
        label: 'Rented',
        color: 'text-blue-600',
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: <CheckCircle className="w-3 h-3" />
    },
    'sold': {
        label: 'Sold',
        color: 'text-purple-600',
        bg: 'bg-gradient-to-r from-purple-50 to-purple-100',
        border: 'border-purple-200',
        icon: <CheckCircle className="w-3 h-3" />
    },
    'under-Negotiation': {
        label: 'Under Negotiation',
        color: 'text-orange-600',
        bg: 'bg-gradient-to-r from-orange-50 to-orange-100',
        border: 'border-orange-200',
        icon: <Clock className="w-3 h-3" />
    }
} as const;

const propertyTypeConfig = {
    'House': {
        label: 'House',
        icon: <Home className="w-4 h-4" />,
        color: 'text-green-600',
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
    },
    'Flat/Apartment': {
        label: 'Apartment',
        icon: <Building className="w-4 h-4" />,
        color: 'text-blue-600',
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    'Commercial': {
        label: 'Commercial',
        icon: <Briefcase className="w-4 h-4" />,
        color: 'text-purple-600',
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    },
    'Plot': {
        label: 'Plot',
        icon: <Square className="w-4 h-4" />,
        color: 'text-amber-600',
        bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    }
} as const;

const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'details', label: 'Details', icon: <Clipboard className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Target className="w-4 h-4" /> },
    { id: 'location', label: 'Location', icon: <Navigation className="w-4 h-4" /> }
] as const;

// ==================== MAIN COMPONENT ====================

export default function PublicPropertyPage() {
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
    const [inquiryData, setInquiryData] = useState<InquiryData>({ name: '', email: '', phone: '', message: '' });
    const [sendingInquiry, setSendingInquiry] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSticky, setIsSticky] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const { propertyid } = useParams();
    const router = useRouter();

    // ==================== HELPER FUNCTIONS ====================

    const formatPrice = (value: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // ==================== MEMOIZED VALUES ====================

    const currentStatusConfig = useMemo(() =>
        property ? propertyStatusConfig[property.propertyStatus] : propertyStatusConfig.available,
        [property]
    );

    const currentTypeConfig = useMemo(() =>
        property ? propertyTypeConfig[property.propertyType as keyof typeof propertyTypeConfig] || propertyTypeConfig.House : propertyTypeConfig.House,
        [property]
    );

    const propertyAge = useMemo(() => {
        if (!property?.yearBuilt) return 'New construction';
        const years = new Date().getFullYear() - Number(property.yearBuilt);
        return `${years} years`;
    }, [property?.yearBuilt]);

    // ==================== CALLBACKS ====================

    const fetchPublicProperty = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const data = await getPublicData(`public_properties/${id}`);
            if (data && data.id) {
                setProperty(data);
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
    }, [router]);

    const nextImage = useCallback(() => {
        if (property?.images?.length) {
            setCurrentImageIndex(prev => (prev + 1) % property.images.length);
        }
    }, [property]);

    const prevImage = useCallback(() => {
        if (property?.images?.length) {
            setCurrentImageIndex(prev => (prev - 1 + property.images.length) % property.images.length);
        }
    }, [property]);

    const handleLike = useCallback(async () => {
        setIsLiking(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLiked(!isLiked);
            message.success(isLiked ? 'Removed from saved' : 'Saved successfully');
        } catch (error) {
            message.error('Failed to save property');
        } finally {
            setIsLiking(false);
        }
    }, [isLiked]);

    const handleShare = useCallback(async () => {
        const shareData = {
            title: property?.title,
            text: `🏠 ${property?.title} - ${formatPrice(property?.price || 0)} ${property?.priceUnit || ''}`,
            url: window.location.href
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (e) { }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            message.success("Link copied to clipboard!");
        }
    }, [property]);

    const handleInquiry = useCallback(async () => {
        if (!inquiryData.name || !inquiryData.email) {
            message.warning("Please fill in your name and email");
            return;
        }
        setSendingInquiry(true);
        try {
            await updatePublicData(`inquiries/${Date.now()}`, {
                propertyId: property?.id,
                propertyTitle: property?.title,
                ...inquiryData,
                createdAt: new Date().toISOString()
            });
            message.success("Inquiry sent! The agent will contact you soon.");
            setIsInquiryModalOpen(false);
            setInquiryData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            message.error("Failed to send inquiry");
        } finally {
            setSendingInquiry(false);
        }
    }, [inquiryData, property?.id, property?.title]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(diff) > constants.TOUCH.SWIPE_THRESHOLD) {
            diff > 0 ? prevImage() : nextImage();
        }
    }, [touchStart, prevImage, nextImage]);

    // ==================== EFFECTS ====================

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isFullscreen) {
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'Escape') setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, prevImage, nextImage]);

    useEffect(() => {
        if (!propertyid) return;
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid;
        fetchPublicProperty(id);

        const handleScroll = () => {
            setIsSticky(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [propertyid, fetchPublicProperty]);

    if (loading) return <LuxurySkeleton />;
    if (!property) return <PropertyNotFound />;

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-white">
                <HomeHeader />
                <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Property Header */}
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${currentStatusConfig.bg} ${currentStatusConfig.color}`}>
                                        {currentStatusConfig.icon}
                                        {currentStatusConfig.label}
                                    </span>
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${currentTypeConfig.bg} ${currentTypeConfig.color}`}>
                                        {currentTypeConfig.icon}
                                        {currentTypeConfig.label}
                                    </div>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {property.viewCount || 0} views
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin className="w-4 h-4" />
                                    <span>{property.location}, {property.city}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tooltip title="Save property">
                                    <button
                                        onClick={handleLike}
                                        disabled={isLiking}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
                                        aria-label="Save property"
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} ${isLiking ? 'animate-pulse' : ''}`} />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Share property">
                                    <button
                                        onClick={handleShare}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                                        aria-label="Share property"
                                    >
                                        <Share2 className="w-5 h-5 text-gray-500" />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <p className="text-purple-100 text-sm">Property Price</p>
                                    <p className="text-3xl sm:text-4xl font-bold mt-1">
                                        {formatPrice(property.price)} <span className="text-lg font-normal">{property.priceUnit}</span>
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-3 text-purple-100 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Ruler className="w-3.5 h-3.5" />
                                            {property.area} {property.areaUnit}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Bed className="w-3.5 h-3.5" />
                                            {property.bedrooms} Beds
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Bath className="w-3.5 h-3.5" />
                                            {property.bathrooms} Baths
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Hero Image Section */}
                            <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                                <div
                                    className="relative h-80 md:h-96"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndex}
                                            className="relative w-full h-full"
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: constants.GALLERY.ANIMATION_DURATION }}
                                        >
                                            <Image
                                                src={typeof property.images?.[currentImageIndex] === 'string'
                                                    ? property.images[currentImageIndex]
                                                    : property.images?.[currentImageIndex]?.url || ''}
                                                alt={property.title}
                                                fill
                                                className="object-cover cursor-pointer"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                                onClick={() => setIsFullscreen(true)}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {property.images && property.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all flex items-center justify-center"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-white" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all flex items-center justify-center"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-5 h-5 text-white" />
                                            </button>
                                            <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs">
                                                {currentImageIndex + 1} / {property.images.length}
                                            </div>
                                        </>
                                    )}

                                    <button
                                        onClick={() => setIsFullscreen(true)}
                                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all flex items-center justify-center"
                                        aria-label="Fullscreen"
                                    >
                                        <Maximize2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* Thumbnail Strip */}
                                {property.images && property.images.length > 1 && (
                                    <div className="flex gap-2 p-3 bg-white/95 backdrop-blur-sm overflow-x-auto">
                                        {property.images.map((img: any, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all ${currentImageIndex === idx ? 'ring-2 ring-purple-500 ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            >
                                                <Image
                                                    src={typeof img === 'string' ? img : img?.url || ''}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Tab Navigation */}
                            <div className="bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
                                <div className="flex gap-4 overflow-x-auto">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                                                ${activeTab === tab.id
                                                    ? 'bg-purple-50 text-purple-600'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                            aria-label={`Tab ${tab.label}`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {activeTab === 'overview' && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6"
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Star className="w-5 h-5 text-amber-500" />
                                                Key Highlights
                                            </h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                                                        <Ruler className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div className="text-xs text-gray-500">Built Area</div>
                                                    <div className="font-semibold text-gray-900 text-sm mt-1">{property.area} {property.areaUnit}</div>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                                                        <Compass className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div className="text-xs text-gray-500">Facing</div>
                                                    <div className="font-semibold text-gray-900 text-sm mt-1">{property.facingDirection || 'Not specified'}</div>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                                                        <Calendar className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div className="text-xs text-gray-500">Age</div>
                                                    <div className="font-semibold text-gray-900 text-sm mt-1">{propertyAge}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'details' && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6"
                                    >
                                        <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-xs text-gray-500">Bedrooms</div>
                                                <div className="font-bold text-gray-900 text-lg mt-1">{property.bedrooms}</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-xs text-gray-500">Bathrooms</div>
                                                <div className="font-bold text-gray-900 text-lg mt-1">{property.bathrooms}</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-xs text-gray-500">Area</div>
                                                <div className="font-bold text-gray-900 text-lg mt-1">{property.area} <span className="text-sm">{property.areaUnit}</span></div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-xs text-gray-500">Year Built</div>
                                                <div className="font-bold text-gray-900 text-lg mt-1">{property.yearBuilt || '-'}</div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Shield className="w-5 h-5 text-purple-600" />
                                                Amenities
                                            </h2>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                <div className={`flex items-center gap-2 p-3 rounded-lg transition-all ${property.isFurnished ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100 opacity-60'}`}>
                                                    <Home className={`w-4 h-4 ${property.isFurnished ? 'text-green-600' : 'text-gray-400'}`} />
                                                    <span className={`text-sm ${property.isFurnished ? 'text-gray-700' : 'text-gray-500'}`}>Furnished</span>
                                                </div>
                                                <div className={`flex items-center gap-2 p-3 rounded-lg transition-all ${property.hasParking ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100 opacity-60'}`}>
                                                    <Car className={`w-4 h-4 ${property.hasParking ? 'text-green-600' : 'text-gray-400'}`} />
                                                    <span className={`text-sm ${property.hasParking ? 'text-gray-700' : 'text-gray-500'}`}>Parking</span>
                                                </div>
                                                <div className={`flex items-center gap-2 p-3 rounded-lg transition-all ${property.hasGarden ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100 opacity-60'}`}>
                                                    <Trees className={`w-4 h-4 ${property.hasGarden ? 'text-green-600' : 'text-gray-400'}`} />
                                                    <span className={`text-sm ${property.hasGarden ? 'text-gray-700' : 'text-gray-500'}`}>Garden</span>
                                                </div>
                                                <div className={`flex items-center gap-2 p-3 rounded-lg transition-all ${property.hasSecurity ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100 opacity-60'}`}>
                                                    <Shield className={`w-4 h-4 ${property.hasSecurity ? 'text-green-600' : 'text-gray-400'}`} />
                                                    <span className={`text-sm ${property.hasSecurity ? 'text-gray-700' : 'text-gray-500'}`}>24/7 Security</span>
                                                </div>
                                            </div>
                                        </div>

                                        {property.features && property.features.length > 0 && (
                                            <div className="pt-4 border-t border-gray-100">
                                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Check className="w-5 h-5 text-green-500" />
                                                    Features
                                                </h2>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {property.features.map((feature: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                            <Check className="w-4 h-4 text-green-500" />
                                                            <span className="text-sm text-gray-700">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'features' && (
                                    <motion.div
                                        key="features"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6"
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Layers className="w-5 h-5 text-purple-600" />
                                                Property Insights
                                            </h2>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Property Type</span>
                                                    <span className="font-medium text-gray-900 capitalize">{property.propertyType}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Property Condition</span>
                                                    <span className="font-medium text-gray-900 capitalize">{property.propertyCondition || 'Not specified'}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                    <span className="text-gray-600">Deal Type</span>
                                                    <span className="font-medium text-gray-900 capitalize">{property.dealType || 'Not specified'}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray-600">Total Views</span>
                                                    <span className="font-medium text-gray-900">{property.viewCount || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'location' && (
                                    <motion.div
                                        key="location"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4"
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <Navigation className="w-5 h-5 text-purple-600" />
                                                Location Details
                                            </h2>
                                            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                                                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-gray-700 font-medium">{property.location}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{property.city}</p>
                                                    <button
                                                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(property.location + ', ' + property.city)}`, '_blank')}
                                                        className="inline-flex items-center gap-1 mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
                                                        aria-label="View on Google Maps"
                                                    >
                                                        View on Google Maps <ExternalLink className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className={`space-y-6 transition-all duration-300 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
                            {/* Contact Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Listed by</div>
                                            <div className="text-sm text-gray-600 flex items-center gap-1">
                                                {property.agentName || 'Professional Agent'}
                                                <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {property.ownerContact && (
                                        <a
                                            href={`tel:${property.ownerContact}`}
                                            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all mb-4 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Phone className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{property.ownerContact}</span>
                                            </div>
                                            <span className="text-green-600 text-xs font-medium">Call Now →</span>
                                        </a>
                                    )}

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setIsInquiryModalOpen(true)}
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                            aria-label="Send inquiry"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Send Inquiry
                                        </button>

                                        <button
                                            onClick={handleShare}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                            aria-label="Share property"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share Property
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Why Join Card */}
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-purple-600" />
                                    Why Join as an Agent?
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {["Direct contact with owners", "Schedule property viewings", "List unlimited properties", "Get verified agent badge"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                                            <Check className="w-3 h-3 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/signup">
                                    <button className="w-full mt-4 py-2 border border-purple-200 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all">
                                        Start Free Trial →
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Inquiry Modal */}
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <MessageCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold">Request Property Information</span>
                        </div>
                    }
                    open={isInquiryModalOpen}
                    onCancel={() => setIsInquiryModalOpen(false)}
                    footer={null}
                    className="rounded-2xl"
                    width={500}
                >
                    <div className="space-y-4 py-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <Input
                                value={inquiryData.name}
                                onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                                placeholder="Enter your full name"
                                className="rounded-lg"
                                size="large"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                            <Input
                                type="email"
                                value={inquiryData.email}
                                onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                                placeholder="your@email.com"
                                className="rounded-lg"
                                size="large"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                value={inquiryData.phone}
                                onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                                placeholder="+91 XXXXX XXXXX"
                                className="rounded-lg"
                                size="large"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <Input.TextArea
                                value={inquiryData.message}
                                onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                                placeholder="I'm interested in this property. Please send me more details..."
                                rows={4}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <AntButton onClick={() => setIsInquiryModalOpen(false)} size="large" className="flex-1">
                                Cancel
                            </AntButton>
                            <AntButton
                                type="primary"
                                onClick={handleInquiry}
                                loading={sendingInquiry}
                                size="large"
                                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                            >
                                Send Inquiry
                            </AntButton>
                        </div>
                    </div>
                </Modal>

                {/* Fullscreen Gallery */}
                {isFullscreen && property.images && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
                        <motion.div
                            key={currentImageIndex}
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={typeof property.images[currentImageIndex] === 'string' ? property.images[currentImageIndex] : property.images[currentImageIndex]?.url || ''}
                                alt={property.title}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>

                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                                    {currentImageIndex + 1} / {property.images.length}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* <ClientChat
                propertyId={property.id}
                propertyTitle={property.title}
                agentId="admin"
                agentName="Support Team"
            /> */}
        </>
    );
}

// ==================== SUB-COMPONENTS ====================

const LuxurySkeleton = memo(() => (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="animate-pulse">
            <div className="h-16 bg-white/90 border-b border-gray-100" />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-96 bg-gray-200 rounded-xl" />
                        <div className="h-12 bg-gray-200 rounded-xl" />
                        <div className="h-64 bg-gray-200 rounded-xl" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-64 bg-gray-200 rounded-xl" />
                        <div className="h-48 bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
));

LuxurySkeleton.displayName = 'LuxurySkeleton';

const PropertyNotFound = memo(() => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
            <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Home className="w-14 h-14 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Property Not Found</h2>
            <p className="text-gray-600 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    Back to Home
                </button>
            </Link>
        </div>
    </div>
));

PropertyNotFound.displayName = 'PropertyNotFound';