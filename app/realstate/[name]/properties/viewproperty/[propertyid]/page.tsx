'use client'

import { auth, checkUserSession, getData, updateData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Home, MapPin, Bed, Bath, Square, Calendar,
    Phone, Check, Share2, Heart, Car, Trees, Shield
} from "lucide-react"
import Button from "@/components/Button"
import { message } from "antd"
import Header from "@/components/Header"
import { onAuthStateChanged } from "firebase/auth"
import CertificateGenerator from "@/components/CertificateGenerator"

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
    images?: string[];
    propertyStatus: 'available' | 'rented' | 'sold' | 'under-Negotiation'
    dealType:'sold' | 'rented'
}

export default function ViewPropertyPage() {
    const [property, setProperty] = useState<PropertyFormData | null>(null)
    const [relatedProperties, setRelatedProperties] = useState<any[]>([])
    const [currIndex, setCurrIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [liked, setLiked] = useState(false)

    const { propertyid } = useParams()
    const router = useRouter()

    // Check authentication and load data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }

                const storedUser: any = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedUser);
                setUserInfo(userData);

            } catch (err) {
                message.error('Error occurred during authentication');
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // Fetch property
    useEffect(() => {
        if (!propertyid) return
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid
        fetchPropertyData(id)
    }, [propertyid])

    useEffect(() => {
        if (property && userInfo) fetchRelatedProperties()
    }, [property, userInfo])

    const fetchPropertyData = (id: string) => {
        setLoading(true)
        getData(`properties/${id}`)
            .then((res: any) => {
                if (!res) { message.error("Property not found"); router.push('/properties'); return }
                setProperty(res)
                console.log(res);
                
                fetchRelatedProperties()
            })
            .catch(err => { console.error(err); message.error("Failed to load property") })
            .finally(() => setLoading(false))
    }

    const fetchRelatedProperties = () => {
        getData('properties')
            .then((allProps: any) => {
                if (!allProps) return
                const propsArray = Object.entries(allProps).map(([key, value]: [string, any]) => ({ id: key, ...value }))
                const ownersProps = propsArray.filter(p => p.ownerUid == userInfo?.uid)
                let related = ownersProps.filter((p) => {
                    const target: any = property?.price;
                    const min = target * 0.9;
                    const max = target * 1.1;
                    return p.price >= min && p.price <= max;
                });
                setRelatedProperties(related)
            })
            .catch(err => console.error(err))
    }

    const handleNext = () => {
        if (!property?.images) return;
        setCurrIndex(prev => prev + 1 < property.images!.length ? prev + 1 : 0);
    };

    const handleShare = () => {
        const shareText = `Check out ${property?.title} at ${property?.location}, ${property?.city}. Price: ₹${property?.price} ${property?.priceUnit}`
        if (navigator.share) { navigator.share({ title: property?.title, text: shareText, url: window.location.href }) }
        else { navigator.clipboard.writeText(shareText); message.success('Copied!') }
    }
    if (loading) return <div className="min-h-screen bg-gray-50 animate-pulse"><Header userData={userInfo} /></div>
    if (!property) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <Header userData={userInfo} />
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <Button label="Back to Properties" variant="theme2" onClick={() => router.push('/properties')} />
        </div>
    )

    function deleteData(arg0: string) {
        throw new Error("Function not implemented.")
    }

    const handleStatusChange = (e: any) => {
        const newStatus = e.target.value as PropertyFormData['propertyStatus']
        updateData(`properties/${propertyid}`, { propertyStatus: newStatus })
            .then((res: any) => {
                setProperty(prev => prev ? { ...prev, propertyStatus: newStatus } : prev)
                message.success(`Property marked as ${newStatus}`)
                if(newStatus=='sold' || newStatus=='rented'){
                    router.push(`/properties/dealpage?id=${propertyid}&type=${newStatus}`)
                }
            })
            .catch((err) => {
                message.error('Failed to chnage Status of Property')
            })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />

            <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

                {/* Floating Buttons */}
                <div className="fixed right-6 top-24 flex flex-col gap-3 z-10">
                    <button onClick={() => setLiked(!liked)} className={`p-3 rounded-full shadow ${liked ? 'bg-red-500 text-white' : 'bg-white'}`}>
                        <Heart size={20} fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button onClick={handleShare} className="p-3 rounded-full shadow bg-white">
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Property Header */}
                <div className="bg-white rounded-2xl p-6 shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                                <MapPin size={16} /> {property.location}, {property.city}
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{property.propertyCondition}</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-purple-700">₹{Number(property.price).toLocaleString('en-IN')} {property.priceUnit}</div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Image */}
                        <div className="relative h-[400px] rounded-xl overflow-hidden shadow">
                            {property.images?.[currIndex] ? (
                                <img src={property.images[currIndex]} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-200">
                                    <Home size={64} className="text-gray-400" />
                                </div>
                            )}
                            <button onClick={handleNext} className="absolute bottom-4 right-4 px-3 py-1 bg-white rounded-full shadow">Next <span className="font-extrabold">→</span></button>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-bold mb-2">About Property</h2>
                            <p className="text-gray-700">{property.description || "No description provided."}</p>
                        </div>

                        {/* Features */}
                        {property.features?.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h2 className="text-xl font-bold mb-3">Key Features</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <Check size={16} className="text-purple-600" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">

                        {/* Stats */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold mb-3">Property Details</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2"><Bed size={16} /> {property.bedrooms} Beds</div>
                                <div className="flex items-center gap-2"><Bath size={16} /> {property.bathrooms} Baths</div>
                                <div className="flex items-center gap-2"><Square size={16} /> {property.area} {property.areaUnit}</div>
                                <div className="flex items-center gap-2"><Calendar size={16} /> {property.yearBuilt || '-'}</div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white p-6 rounded-xl shadow space-y-2">
                            <h3 className="font-bold">Amenities</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2"><Home size={16} /> {property.isFurnished ? "Furnished" : "Unfurnished"}</div>
                                <div className="flex items-center gap-2"><Car size={16} /> {property.hasParking ? "Parking" : "No Parking"}</div>
                                <div className="flex items-center gap-2"><Trees size={16} /> {property.hasGarden ? "Garden" : "No Garden"}</div>
                                <div className="flex items-center gap-2"><Shield size={16} /> {property.hasSecurity ? "24/7 Security" : "No Security"}</div>
                            </div>
                        </div>

                        {/* Owner */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Owner Information
                            </h3>
                            <div className="space-y-2">

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                                        {property.ownerName?.charAt(0).toUpperCase() || 'O'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">
                                            {property.ownerName || 'Not specified'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Property Owner
                                        </div>
                                    </div>
                                </div>

                                {property.ownerContact && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone size={18} />
                                        {property.ownerContact}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Owner Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Property</h3>

                            {/* Status Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium">Property Status</label>
                                <select
                                    value={property.propertyStatus}
                                    onChange={(e) => {
                                        handleStatusChange(e)
                                    }}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                    <option value="rented">Rented</option>
                                    <option value="under-Negotiation">Under Negotiation</option>
                                </select>
                            </div>

                            {/* Delete Button */}
                            <Button
                                label="Delete Property"
                                variant="danger"
                                classNameC="w-full justify-center py-3"
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this property?")) {
                                        deleteData(`properties/${propertyid}`)
                                        message.success("Property deleted successfully")
                                        router.push('/properties')
                                    }
                                }}
                            />
                        </div>

                    </div>
                </div>

                {/* Related */}
                {relatedProperties.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Similar Properties</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedProperties.map(p => (
                                <div key={p.id} onClick={() => router.push(`/property/viewproperty/${p.id}`)} className="bg-white rounded-xl shadow cursor-pointer overflow-hidden hover:shadow-lg transition">
                                    <img src={p.images?.[0]} className="w-full h-36 object-cover" />
                                    <div className="p-3">
                                        <h3 className="font-bold text-gray-900">{p.title}</h3>
                                        <div className="text-gray-600 text-sm flex items-center gap-1"><MapPin size={12} /> {p.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}