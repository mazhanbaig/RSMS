// "use client";

// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Button from "@/components/Button";
// import { MapPin, Trash2, Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { auth, checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";
// import { onAuthStateChanged } from "firebase/auth";
// import { message } from "antd";

// export default function PropertiesPage() {
//     const router = useRouter();

//     const [search, setSearch] = useState("");
//     const [userInfo, setUserInfo] = useState<any>(null);
//     const [properties, setProperties] = useState<any[]>([]);

//     const deleteProperty = (id: string) => {
//         deleleData(`properties/${id}`)
//             .then(() => {
//                 setProperties(prev => prev.filter(p => p.id !== id));
//                 message.error("Property Deleted");
//             })
//             .catch(err => console.error("Failed to delete property:", err));
//     };

//     // Check authentication and load data
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const user: any = await checkUserSession();
//                 if (!user) {
//                     message.error('Please Login First');
//                     router.replace('/login');
//                     return;
//                 }

//                 const storedUser: any = localStorage.getItem('userInfo')
//                 const userData = JSON.parse(storedUser);
//                 setUserInfo(userData);

//             } catch (err) {
//                 message.error('Error occurred during authentication');
//                 router.replace('/login');
//             } finally {
//             }
//         };

//         checkAuth();
//     }, [router]);

//     if (!userInfo) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
//             <Header userData={userInfo} />

//             {/* HEADER */}
//             <div className="max-w-6xl mx-auto mt-16 px-6">
//                 <h1 className="text-2xl md:text-[40px] font-bold text-gray-900 mb-2">
//                     Manage{" "}
//                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                         Properties
//                     </span>
//                 </h1>

//                 <p className="text-gray-600 text-lg mb-6">
//                     Smartly manage everything you own or handle.
//                 </p>

//                 <Button
//                     label="Add Property"
//                     variant="theme2"
//                     onClick={() => router.push("/properties/addproperty")}
//                 />

//                 {/* SEARCH */}
//                 <div className="mt-6 flex items-center gap-4">
//                     <div className="flex items-center bg-white shadow px-4 py-2 rounded-xl w-full">
//                         <Search className="text-gray-500 mr-2" />
//                         <input
//                             placeholder="Search properties..."
//                             className="w-full h-8 outline-none bg-transparent"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* PROPERTY GRID */}
//             <div className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {properties
//                     .filter(p =>
//                         p.title?.toLowerCase().includes(search.toLowerCase())
//                     )
//                     .map((p: any) => {
//                         const isClosed =
//                             p.propertyStatus === "sold" ||
//                             p.propertyStatus === "rented";

//                         return (
//                             <div
//                                 key={p.id}
//                                 onClick={() => {
//                                     if (isClosed) return;
//                                     router.push(
//                                         `/properties/viewproperty/${encodeURIComponent(
//                                             p.id
//                                         )}`
//                                     );
//                                 }}
//                                 className={`relative bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300
//                                     ${isClosed
//                                     ? `opacity-70 grayscale  ${p.propertyStatus == 'rented' ? '' : 'cursor-not-allowed'}`
//                                         : "hover:shadow-2xl cursor-pointer"
//                                     }
//                                 `}
//                             >
//                                 {/* SOLD / RENTED OVERLAY */}
//                                 {isClosed && (
//                                     <div
//                                     onClick={()=>{
//                                             router.push(`/properties/viewproperty/${encodeURIComponent(p.id)}`)
//                                     }}
//                                     className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
//                                         <span
//                                             className={`px-6 py-3 text-lg font-extrabold tracking-wider rounded-full shadow-xl
//                                                 ${p.propertyStatus === "sold"
//                                                     ? "bg-red-600 text-white"
//                                                     : "bg-blue-600 text-white"
//                                                 }
//                                             `}
//                                         >
//                                             {p.propertyStatus.toUpperCase()}
//                                         </span>
//                                     </div>
//                                 )}

//                                 {/* CONTENT */}
//                                 <div className="p-5">
//                                     <div className="flex justify-between items-start mb-3">
//                                         <div className="flex-1">
//                                             <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
//                                                 {p.title}
//                                             </h3>

//                                             <div className="flex items-center gap-1.5 text-gray-600 mt-1">
//                                                 <MapPin size={14} className="text-purple-600" />
//                                                 <span className="text-sm truncate">
//                                                     {p.location}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 deleteProperty(p.id);
//                                             }}
//                                             className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-lg transition"
//                                         >
//                                             <Trash2 size={16} />
//                                         </button>
//                                     </div>

//                                     {/* STATS */}
//                                     <div className="grid grid-cols-3 gap-2 mb-4">
//                                         <div className="text-center bg-blue-50 rounded-lg py-1">
//                                             <div className="font-bold">
//                                                 {p.bedrooms || 0}
//                                             </div>
//                                             <div className="text-xs text-gray-600">
//                                                 Beds
//                                             </div>
//                                         </div>
//                                         <div className="text-center bg-green-50 rounded-lg py-1">
//                                             <div className="font-bold">
//                                                 {p.bathrooms || 0}
//                                             </div>
//                                             <div className="text-xs text-gray-600">
//                                                 Baths
//                                             </div>
//                                         </div>
//                                         <div className="text-center bg-purple-50 rounded-lg py-1">
//                                             <div className="font-bold">
//                                                 {p.area}
//                                             </div>
//                                             <div className="text-xs text-gray-600">
//                                                 Area
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* PRICE */}
//                                     <div className="flex justify-between border-t pt-3">
//                                         <div>
//                                             <div className="text-xs text-gray-500">
//                                                 Type
//                                             </div>
//                                             <div className="font-medium">
//                                                 {p.propertyType}
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-xs text-gray-500">
//                                                 Price
//                                             </div>
//                                             <div className="font-bold text-lg">
//                                                 {p.price} {p.priceUnit}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>
//         </div>
//     );
// }



"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import {
    MapPin, Trash2, Search, Home, DollarSign,
    TrendingUp, Eye, Edit, Building, Bed,
    Bath, Square, Plus, Layers, Import,
    Users, Calendar, Target, CheckCircle,
    XCircle, Filter, ChevronRight, Star,
    Car, Trees, Shield, Sofa, Sun,
    Building2, Check, Clock, X, AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";
import { message } from "antd";

interface UserInfo {
    uid: string;
    email?: string;
    name?: string;
    [key: string]: any;
}

interface Property {
    id: string;
    createdAt: any;
    agentUid: string;
    agentName: string;
    ownerName: string;
    ownerContact?: string;
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
    features: string[];
    amenities: string[];
    facingDirection?: string;
    propertyCondition: string;
    isFurnished: boolean;
    hasParking: boolean;
    hasGarden: boolean;
    hasSecurity: boolean;
    propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation';
    images: any[];
}

export default function PropertiesPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Property type configuration
    const propertyTypeConfig = useMemo(() => ({
        'House': {
            label: 'House',
            icon: <Home className="w-4 h-4" />,
            color: 'text-green-600',
            bg: 'bg-gradient-to-br from-green-50 to-green-100',
            border: 'border-green-200'
        },
        'Flat/Apartment': {
            label: 'Flat/Apartment',
            icon: <Building className="w-4 h-4" />,
            color: 'text-blue-600',
            bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
            border: 'border-blue-200'
        },
        'Commercial': {
            label: 'Commercial',
            icon: <Building2 className="w-4 h-4" />,
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
    }), []);

    // Property status configuration
    const propertyStatusConfig = useMemo(() => ({
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
            icon: <Calendar className="w-3 h-3" />
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
    }), []);

    // Feature icons
    const featureIcons = useMemo(() => ({
        'Furnished': <Sofa className="w-3 h-3" />,
        'Parking': <Car className="w-3 h-3" />,
        'Garden': <Trees className="w-3 h-3" />,
        'Security': <Shield className="w-3 h-3" />,
    }), []);

    // Load user info and properties
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
                let userData;

                if (storedUser) {
                    userData = JSON.parse(storedUser);
                } else {
                    userData = await getData(`users/${user.uid}`);
                    if (userData) {
                        localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, ...userData }));
                    }
                }

                if (userData) {
                    setUserInfo({ uid: user.uid, ...userData });
                    await fetchProperties(user.uid);
                }
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

    const fetchProperties = async (uid: string) => {
        try {
            setLoading(true);
            const propertiesData: any = await getData('properties/');

            if (propertiesData) {
                const propertiesArray: Property[] = Object.entries(propertiesData)
                    .map(([id, data]: [string, any]) => ({
                        id,
                        ...data
                    }))
                    .filter((property: Property) => property.agentUid === uid)
                    .sort((a: Property, b: Property) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });

                setProperties(propertiesArray);
            } else {
                setProperties([]);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            message.error('Failed to fetch properties');
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete property
    const deleteProperty = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;

        setDeletingId(id);
        try {
            await deleleData(`properties/${id}`);
            setProperties(prev => prev.filter(p => p.id !== id));
            message.success('Property deleted successfully');
        } catch (error) {
            message.error('Failed to delete property');
        } finally {
            setDeletingId(null);
        }
    };

    // Filter properties
    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            const matchesSearch = searchTerm === '' ||
                property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === 'all' || property.propertyType === filterType;
            const matchesStatus = filterStatus === 'all' || property.propertyStatus === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [properties, searchTerm, filterType, filterStatus]);

    // Property statistics
    const propertyStats = useMemo(() => ({
        total: properties.length,
        available: properties.filter(p => p.propertyStatus === 'available').length,
        rented: properties.filter(p => p.propertyStatus === 'rented').length,
        sold: properties.filter(p => p.propertyStatus === 'sold').length,
        underNegotiation: properties.filter(p => p.propertyStatus === 'under-Negotiation').length,
        active: properties.filter(p => ['available', 'under-Negotiation'].includes(p.propertyStatus)).length,
        totalValue: properties.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0)
    }), [properties]);

    // Format price
    const formatPrice = useCallback((price: string, unit: string) => {
        const priceNum = parseFloat(price) || 0;
        if (unit === 'Lakh') {
            return `Rs ${(priceNum / 100000).toFixed(2)} Lakh`;
        } else if (unit === 'Crore') {
            return `Rs ${(priceNum / 10000000).toFixed(2)} Crore`;
        } else if (unit === 'Million') {
            return `$${priceNum} Million`;
        }
        return `PKR${priceNum.toLocaleString()}`;
    }, []);

    // Calculate property growth
    const calculatePropertiesGrowth = useMemo(() => {
        if (!properties || properties.length === 0) return 0;

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const thisMonthCount = properties.filter((property: Property) => {
            if (!property.createdAt) return false;
            const createdAt = property.createdAt.toDate ?
                property.createdAt.toDate() : new Date(property.createdAt);
            return createdAt >= thisMonthStart;
        }).length;

        const percentage = Math.round(
            (thisMonthCount / properties.length) * 100
        );

        return percentage;
    }, [properties]);

    // Handlers
    const handleViewProperty = (id: string) => {
        router.push(`/realstate/${userInfo?.uid}/properties/viewproperty/${id}`);
    };

    const handleEditProperty = (id: string) => {
        router.push(`/realstate/${userInfo?.uid}/properties/addproperty?edit=${id}`);
    };

    const handleAddProperty = () => {
        router.push(`/realstate/${userInfo?.uid}/properties/addproperty`);
    };

    // Render property features
    const renderFeatures = (property: Property) => {
        const features = [];
        if (property.isFurnished) features.push('Furnished');
        if (property.hasParking) features.push('Parking');
        if (property.hasGarden) features.push('Garden');
        if (property.hasSecurity) features.push('Security');

        return features.slice(0, 3).map(feature => (
            <span key={feature} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {featureIcons[feature as keyof typeof featureIcons]}
                {feature}
            </span>
        ));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Welcome Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        {/* Left Side - Welcome Message */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Properties Management</span>
                                <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Property {''}
                                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Portfolio
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 mt-2 max-w-xl">
                                        Manage your real estate listings, track property status, and maximize your sales potential.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Quick Stats */}
                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl px-5 py-4 border border-purple-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Home className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">Property Growth</span>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">+{calculatePropertiesGrowth}% this month</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{properties.length} Properties</div>
                                <div className="text-sm text-gray-600 mt-1">Total in your portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                    {[
                        {
                            title: 'Total Properties',
                            value: propertyStats.total,
                            icon: <Home className="w-5 h-5 text-purple-600" />,
                            color: 'purple'
                        },
                        {
                            title: 'Available',
                            value: propertyStats.available,
                            icon: <Check className="w-5 h-5 text-green-600" />,
                            color: 'green'
                        },
                        {
                            title: 'Under Negotiation',
                            value: propertyStats.underNegotiation,
                            icon: <Clock className="w-5 h-5 text-orange-600" />,
                            color: 'orange'
                        },
                    ].map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                <div className="absolute -top-3 left-4">
                                    <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
                                        {stat.icon}
                                    </div>
                                </div>

                                <div className="-mt-1">
                                    <div className="text-right">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
                                        <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                label="Add Property"
                                onClick={handleAddProperty}
                                variant="theme2"
                                icon={<Layers className="w-4 h-4" />}
                                size="md"
                            />
                        </div>

                        {/* Search Input */}
                        <div className="flex flex-wrap gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search properties by title, location, or city"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors md:min-w-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {/* Property Type Filters */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'all', label: 'All Types', count: properties.length },
                                ...Object.entries(propertyTypeConfig).map(([key, config]) => ({
                                    id: key,
                                    label: config.label,
                                    count: properties.filter(p => p.propertyType === key).length
                                }))
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setFilterType(filter.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterType === filter.id
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter.label}
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${filterType === filter.id
                                        ? 'bg-white/20'
                                        : 'bg-white'
                                        }`}>
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Status Filters */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'all', label: 'All Status', count: properties.length },
                                ...Object.entries(propertyStatusConfig).map(([key, config]) => ({
                                    id: key,
                                    label: config.label,
                                    count: properties.filter(p => p.propertyStatus === key).length
                                }))
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setFilterStatus(filter.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStatus === filter.id
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter.label}
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${filterStatus === filter.id
                                        ? 'bg-white/20'
                                        : 'bg-white'
                                        }`}>
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* properties */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">All Properties</h2>
                        <div className="text-sm text-gray-600">
                            Showing {filteredProperties.length} of {properties.length} properties
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-900">Property Details</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Location</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Specifications</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Price</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredProperties.length > 0 ? (
                                        filteredProperties.map((property) => {
                                            const typeConfig = propertyTypeConfig[property.propertyType as keyof typeof propertyTypeConfig] || propertyTypeConfig['House'];
                                            const statusConfigItem = propertyStatusConfig[property.propertyStatus];

                                            return (
                                                <tr
                                                    key={property.id}
                                                    className="hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => handleViewProperty(property.id)}
                                                >
                                                    {/* Property Details */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2.5 rounded-lg ${typeConfig.bg}`}>
                                                                <div className={typeConfig.color}>
                                                                    {typeConfig.icon}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 line-clamp-1">
                                                                    {property.title}
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    {typeConfig.label}
                                                                </div>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {renderFeatures(property)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Location */}
                                                    <td className="px-4 py-3">
                                                        <div className="max-w-xs">
                                                            <div className="text-sm text-gray-900 flex items-start gap-2">
                                                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                                <span className="line-clamp-2">{property.location}, {property.city}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Specifications */}
                                                    <td className="px-4 py-3">
                                                        <div className="space-y-1">
                                                            <div className="text-sm text-gray-900">
                                                                {property.bedrooms} Beds • {property.bathrooms} Baths
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {property.area} {property.areaUnit}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Price */}
                                                    <td className="px-4 py-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {formatPrice(property.price, property.priceUnit)}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {property.propertyType}
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-4 py-3">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfigItem.bg} ${statusConfigItem.color}`}>
                                                            {statusConfigItem.label}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleViewProperty(property.id);
                                                                }}
                                                                className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                                                                title="View Property"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditProperty(property.id);
                                                                }}
                                                                className="p-2 hover:bg-purple-50 rounded-lg text-purple-600"
                                                                title="Edit Property"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteProperty(property.id);
                                                                }}
                                                                className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                                                                title="Delete Property"
                                                                disabled={deletingId === property.id}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center">
                                                <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-600">No properties found</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                                                        ? 'Try changing your search or filter'
                                                        : 'Click "Add Property" to add your first property'}
                                                </p>
                                                <Button
                                                    label="Add Property"
                                                    onClick={handleAddProperty}
                                                    variant="theme"
                                                    icon={<Plus className="w-4 h-4" />}
                                                    classNameC="mt-4"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    onClick={handleAddProperty}
                    className="fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-50"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </main>
        </div>
    );
}