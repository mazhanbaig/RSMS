// 'use client'

// import { auth, getData } from "@/FBConfig/fbFunctions"
// import { useParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import {
//     Home, MapPin, Bed, Bath, Square, Calendar, Phone, Check, ArrowLeft, Edit2, Trash2
// } from "lucide-react"
// import Button from "@/components/Button"
// import { message } from "antd"
// import Header from "@/components/Header"
// import { onAuthStateChanged } from "firebase/auth"

// export default function ViewPropertyPage() {
//     interface PropertyFormData {
//         title: string;
//         description: string;
//         propertyType: string;
//         price: string;
//         priceUnit: string;
//         location: string;
//         city: string;
//         area: string;
//         areaUnit: string;
//         bedrooms: string;
//         bathrooms: string;
//         yearBuilt?: string;
//         ownerName: string;
//         ownerContact?: string;
//         features: string[];
//         amenities: string[];
//         facingDirection?: string;
//         propertyCondition: string;
//         isFurnished: boolean;
//         hasParking: boolean;
//         hasGarden: boolean;
//         hasSecurity: boolean;
//     }
//     const [property, setProperty] = useState<PropertyFormData|null>(null)
//     const [relatedProperties, setRelatedProperties] = useState<any[]>([])
//     const [loading, setLoading] = useState(true)
//     const [userInfo, setUserInfo] = useState<any>(null)

//     const { propertyid } = useParams()
//     const router = useRouter()

//     // Check user auth
//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (!user) router.replace(`/login`)
//         })

//         const data = localStorage.getItem("userInfo")
//         if (data) {
//             try {
//                 const parsed = JSON.parse(data)
//                 getData(`users/${parsed.uid}`)
//                     .then(res => setUserInfo(res))
//                     .catch(err => console.error(err))
//             } catch (err) {
//                 console.error("Failed to parse userInfo:", err)
//             }
//         }
//     }, [])

//     // Fetch property
//     useEffect(() => {
//         if (!propertyid) return
//         fetchPropertyData()
//     }, [propertyid])

//     const fetchPropertyData = () => {
//         setLoading(true)
//         getData(`properties/${propertyid}`)
//             .then((res:any) => {
//                 if (!res) {
//                     message.error("Property not found")
//                     router.push('/properties')
//                     return
//                 }
//                 setProperty(res)
//                 fetchRelatedProperties(res.city, res.propertyType, propertyid)
//             })
//             .catch(err => {
//                 console.error(err)
//                 message.error("Failed to load property")
//             })
//             .finally(() => setLoading(false))
//     }

//     const fetchRelatedProperties = (city: string, propertyType: string, currentId: string) => {
//         getData('properties')
//             .then(allProps => {
//                 if (!allProps) return
//                 const propsArray = Object.entries(allProps).map(([key, value]: [string, any]) => ({ id: key, ...value }))
//                 const related = propsArray.filter(p => p.id !== currentId && (p.city === city || p.propertyType === propertyType)).slice(0, 4)
//                 setRelatedProperties(related)
//             })
//             .catch(err => console.error("Error fetching related properties:", err))
//     }

//     const handleEdit = () => router.push(`/properties/edit/${propertyid}`)
//     const handleDelete = () => message.warning("Delete not implemented yet")

//     // Loading skeleton
//     if (loading) return (
//         <div className="min-h-screen bg-gray-50">
//             <Header userData={userInfo} />
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <div className="animate-pulse">
//                     <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         <div className="md:col-span-2">
//                             <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="h-40 bg-gray-200 rounded-xl"></div>
//                             <div className="h-40 bg-gray-200 rounded-xl"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )

//     if (!property) return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />
//             <div className="max-w-7xl mx-auto px-4 py-20 text-center">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
//                 <p className="text-gray-600 mb-6">The property doesn't exist or has been removed.</p>
//                 <Button label="Back to Properties" variant="theme2" onClick={() => router.push('/properties')} />
//             </div>
//         </div>
//     )

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header userData={userInfo} />
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Back */}
//                 <button onClick={() => router.push('/properties')} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6">
//                     <ArrowLeft size={20} /> Back to Properties
//                 </button>

//                 {/* Property Header */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
//                             <div className="flex items-center gap-3 text-gray-600">
//                                 <div className="flex items-center gap-1">
//                                     <MapPin size={18} className="text-purple-600" />
//                                     <span>{property.location}, {property.city}</span>
//                                 </div>
//                                 <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
//                                     {property.propertyCondition || 'Available'}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <Button label="Edit" variant="theme2" size="md" onClick={handleEdit} icon={<Edit2 size={18} />} />
//                             <Button label="Delete" variant="danger" size="md" onClick={handleDelete} icon={<Trash2 size={18} />} />
//                         </div>
//                     </div>

                    

//                     {/* Main Grid */}
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {/* Left - Images & Description */}
//                         <div className="md:col-span-2">
//                             <div className="mb-6">
//                                 {property.images?.[0] ? (
//                                     <div className="relative h-46 rounded-xl overflow-hidden">
//                                         <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
//                                     </div>
//                                 ) : (
//                                     <div className="h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
//                                         <Home size={64} className="text-gray-400" />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
//                                 <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description || 'No description.'}</p>
//                             </div>
//                             {property.features?.length > 0 && (
//                                 <div className="mb-8">
//                                     <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
//                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                                         {property.features.map((f: string, i: number) => (
//                                             <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                                                 <Check size={16} className="text-green-600" />
//                                                 <span className="text-gray-700">{f}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Right - Details */}
//                         <div className="space-y-6">
//                             <div className="bg-white border border-gray-200 rounded-xl p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
//                                 <div className="space-y-4">
//                                     <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-600"><Bed size={20} />Bedrooms</div><span className="font-bold text-gray-900">{property.bedrooms || 'N/A'}</span></div>
//                                     <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-600"><Bath size={20} />Bathrooms</div><span className="font-bold text-gray-900">{property.bathrooms || 'N/A'}</span></div>
//                                     <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-600"><Square size={20} />Area</div><span className="font-bold text-gray-900">{property.area || 'N/A'} {property.areaUnit || ''}</span></div>
//                                     {property.yearBuilt && <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-600"><Calendar size={20} />Year Built</div><span className="font-bold text-gray-900">{property.yearBuilt}</span></div>}
//                                     <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-600"><Home size={20} />Property Type</div><span className="font-bold text-gray-900">{property.propertyType || 'N/A'}</span></div>
//                                 </div>
//                             </div>

//                             {/* Amenities */}
//                             <div className="bg-white border border-gray-200 rounded-xl p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
//                                 <div className="space-y-3">
//                                     <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${property.isFurnished ? 'bg-amber-500' : 'bg-gray-300'}`}></div><span className="text-gray-700">{property.isFurnished ? 'Fully Furnished' : 'Unfurnished'}</span></div>
//                                     <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${property.hasParking ? 'bg-blue-500' : 'bg-gray-300'}`}></div><span className="text-gray-700">{property.hasParking ? 'Parking Available' : 'No Parking'}</span></div>
//                                     <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${property.hasGarden ? 'bg-green-500' : 'bg-gray-300'}`}></div><span className="text-gray-700">{property.hasGarden ? 'Garden' : 'No Garden'}</span></div>
//                                     <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${property.hasSecurity ? 'bg-purple-500' : 'bg-gray-300'}`}></div><span className="text-gray-700">{property.hasSecurity ? 'Security' : 'No Security'}</span></div>
//                                     {property.amenities?.map((a: string, i: number) => (<div key={i} className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div><span className="text-gray-700">{a}</span></div>))}
//                                 </div>
//                             </div>

//                             {/* Owner */}
//                             <div className="bg-white border border-gray-200 rounded-xl p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h3>
//                                 <div className="space-y-4">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">{property.ownerName?.charAt(0).toUpperCase() || 'O'}</div>
//                                         <div>
//                                             <div className="font-bold text-gray-900">{property.ownerName || 'Not specified'}</div>
//                                             <div className="text-sm text-gray-600">Property Owner</div>
//                                         </div>
//                                     </div>
//                                     {property.ownerContact && <div className="flex items-center gap-2 text-gray-700"><Phone size={18} />{property.ownerContact}</div>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Related */}
//                     {relatedProperties.length > 0 && (
//                         <div className="mt-12">
//                             <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                                 {relatedProperties.map(r => (
//                                     <div key={r.id} onClick={() => router.push(`/property/viewproperty/${r.id}`)} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
//                                         <div className="p-4">
//                                             <h3 className="font-bold text-gray-900 line-clamp-1 mb-2">{r.title}</h3>
//                                             <div className="flex items-center gap-1 text-gray-600 mb-3"><MapPin size={12} /><span className="text-xs truncate">{r.location}</span></div>
//                                             <div className="flex justify-between items-center">
//                                                 <div className="text-lg font-bold text-gray-900">{r.price?.toLocaleString()} {r.priceUnit || 'PKR'}</div>
//                                                 <div className="text-sm text-gray-500">{r.bedrooms || 0} Beds</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }
'use client'

import { auth, getData } from "@/FBConfig/fbFunctions"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Home, MapPin, Bed, Bath, Square, Calendar,
    Phone, Check, ArrowLeft, Edit2, Trash2
} from "lucide-react"
import Button from "@/components/Button"
import { message } from "antd"
import Header from "@/components/Header"
import { onAuthStateChanged } from "firebase/auth"

// ✅ FIX: Interface moved outside component (Vercel-safe)
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
}

export default function ViewPropertyPage() {

    const [property, setProperty] = useState<PropertyFormData | null>(null)
    const [relatedProperties, setRelatedProperties] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState<any>(null)

    const { propertyid } = useParams()
    const router = useRouter()

    // Check user auth
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) router.replace(`/login`)
        })

        const data = localStorage.getItem("userInfo")
        if (data) {
            try {
                const parsed = JSON.parse(data)
                getData(`users/${parsed.uid}`)
                    .then(res => setUserInfo(res))
                    .catch(err => console.error(err))
            } catch (err) {
                console.error("Failed to parse userInfo:", err)
            }
        }
    }, [])

    // Fetch property
    useEffect(() => {
        if (!propertyid) return

        // ✅ FIX: Convert propertyid to string safely
        const id = Array.isArray(propertyid) ? propertyid[0] : propertyid

        fetchPropertyData(id)
    }, [propertyid])

    // ✅ FIX: fetchPropertyData now accepts string
    const fetchPropertyData = (id: string) => {
        setLoading(true)
        getData(`properties/${id}`)
            .then((res: any) => {
                if (!res) {
                    message.error("Property not found")
                    router.push('/properties')
                    return
                }
                setProperty(res)
                fetchRelatedProperties(res.city, res.propertyType, id)
            })
            .catch(err => {
                console.error(err)
                message.error("Failed to load property")
            })
            .finally(() => setLoading(false))
    }

    const fetchRelatedProperties = (city: string, propertyType: string, currentId: string) => {
        getData('properties')
            .then(allProps => {
                if (!allProps) return
                const propsArray = Object.entries(allProps).map(
                    ([key, value]: [string, any]) => ({ id: key, ...value })
                )
                const related = propsArray
                    .filter(p => p.id !== currentId &&
                        (p.city === city || p.propertyType === propertyType))
                    .slice(0, 4)
                setRelatedProperties(related)
            })
            .catch(err => console.error("Error fetching related properties:", err))
    }

    const handleEdit = () => router.push(`/properties/edit/${propertyid}`)
    const handleDelete = () => message.warning("Delete not implemented yet")

    // Loading skeleton
    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />
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

    if (!property) return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
                <p className="text-gray-600 mb-6">
                    The property doesn't exist or has been removed.
                </p>
                <Button
                    label="Back to Properties"
                    variant="theme2"
                    onClick={() => router.push('/properties')}
                />
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Back */}
                <button
                    onClick={() => router.push('/properties')}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} /> Back to Properties
                </button>

                {/* Property Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {property.title}
                            </h1>
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
                            <Button label="Edit" variant="theme2" size="md" onClick={handleEdit} icon={<Edit2 size={18} />} />
                            <Button label="Delete" variant="danger" size="md" onClick={handleDelete} icon={<Trash2 size={18} />} />
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Left - Images & Description */}
                        <div className="md:col-span-2">
                            <div className="mb-6">
                                {property.images?.[0] ? (
                                    <div className="relative h-46 rounded-xl overflow-hidden">
                                        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                                        <Home size={64} className="text-gray-400" />
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {property.description || 'No description.'}
                                </p>
                            </div>

                            {property.features?.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {property.features.map((f: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <Check size={16} className="text-green-600" />
                                                <span className="text-gray-700">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right - Details */}
                        <div className="space-y-6">

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
                                <div className="space-y-4">

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bed size={20} />Bedrooms
                                        </div>
                                        <span className="font-bold text-gray-900">
                                            {property.bedrooms || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bath size={20} />Bathrooms
                                        </div>
                                        <span className="font-bold text-gray-900">
                                            {property.bathrooms || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Square size={20} />Area
                                        </div>
                                        <span className="font-bold text-gray-900">
                                            {property.area || 'N/A'} {property.areaUnit || ''}
                                        </span>
                                    </div>

                                    {property.yearBuilt && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={20} />Year Built
                                            </div>
                                            <span className="font-bold text-gray-900">
                                                {property.yearBuilt}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Home size={20} />Property Type
                                        </div>
                                        <span className="font-bold text-gray-900">
                                            {property.propertyType || 'N/A'}
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                                <div className="space-y-3">

                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${property.isFurnished ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-700">
                                            {property.isFurnished ? 'Fully Furnished' : 'Unfurnished'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${property.hasParking ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-700">
                                            {property.hasParking ? 'Parking Available' : 'No Parking'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${property.hasGarden ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-700">
                                            {property.hasGarden ? 'Garden' : 'No Garden'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${property.hasSecurity ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-700">
                                            {property.hasSecurity ? 'Security' : 'No Security'}
                                        </span>
                                    </div>

                                    {property.amenities?.map((a: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            <span className="text-gray-700">{a}</span>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Owner */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Owner Information
                                </h3>
                                <div className="space-y-4">

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

                        </div>
                    </div>

                    {/* Related */}
                    {relatedProperties.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Similar Properties
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedProperties.map(r => (
                                    <div
                                        key={r.id}
                                        onClick={() => router.push(`/property/viewproperty/${r.id}`)}
                                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 line-clamp-1 mb-2">
                                                {r.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-gray-600 mb-3">
                                                <MapPin size={12} />
                                                <span className="text-xs truncate">{r.location}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {r.price?.toLocaleString()} {r.priceUnit || 'PKR'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {r.bedrooms || 0} Beds
                                                </div>
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
