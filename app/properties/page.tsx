"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Home, MapPin, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, deleleData, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { message } from "antd";

export default function PropertiesPage() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null)
    const [properties, setProperties] = useState<any[]>([]);

    const deleteProperty = (id: string) => {
        deleleData(`properties/${id}`)
            .then(() => {
                // Remove from local state
                setProperties(prev => prev.filter(p => p.id !== id));
                message.error('Property Deleted')
            })
            .catch(err => console.error("Failed to delete property:", err));
    };

    useEffect(() => {
        const loadData = async () => {
            onAuthStateChanged(auth, (user) => {
                if (!user) router.replace(`/login`);
            });

            const data = localStorage.getItem("userInfo");
            if (!data) return;

            try {
                const parsed = JSON.parse(data);

                // 1️⃣ Fetch user info
                const userRes: any = await getData(`users/${parsed.uid}`);
                setUserInfo(userRes);

                // 2️⃣ Fetch properties after user info is loaded
                const allProps = await getData("properties/");
                if (allProps) {
                    const propertiesArray = Object.entries(allProps)
                        .map(([id, value]) => ({ id, ...value }))
                        .filter((p) => p.ownerUid === userRes.uid);

                    setProperties(propertiesArray.reverse());
                }
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };

        loadData();
    }, []);


    if (!userInfo) {
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
            <Header userData={userInfo} />

            {/* PAGE TITLE */}
            <div className="max-w-6xl mx-auto mt-16 px-6">
                <h1 className="text-2xl md:text-[40px] font-bold text-gray-900 mb-2">
                    Manage{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                        Properties
                    </span>
                </h1>
                <p className="text-gray-600 text-lg">
                    Smartly manage everything you own or handle.
                </p>

                <Button
                    label={"Add Property"}
                    variant="theme2"
                    onClick={() => {
                        router.push(`/properties/addproperty`)
                    }}
                />

                {/* Search + Add button */}
                <div className="mt-6 flex gap-4 items-center">
                    <div className="flex items-center bg-white shadow px-4 py-2 rounded-xl w-full">
                        <Search className="text-gray-500 mr-2" />
                        <input
                            placeholder="Search properties..."
                            className="w-full h-8 outline-none bg-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* PROPERTY LIST */}
            <div className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
                    .map((p: any) => (
                        <div
                            onClick={() => router.push(`/properties/viewproperty/${encodeURIComponent(p.id)}`)}
                            key={p.id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{p.title}</h3>
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <MapPin size={14} className="text-purple-600" />
                                            <span className="text-sm truncate">{p.location}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteProperty(p.id)
                                        }}
                                        className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors duration-300"
                                    >
                                        <Trash2 size={16} className="text-gray-600" />
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="text-center px-2 py-0.5 bg-blue-50 rounded-lg">
                                        <div className="text-xl font-bold text-gray-900">{p.bedrooms || '0'}</div>
                                        <div className="text-xs text-gray-600">Beds</div>
                                    </div>
                                    <div className="text-center px-2 py-0.5 bg-green-50 rounded-lg">
                                        <div className="text-xl font-bold text-gray-900">{p.bathrooms || '0'}</div>
                                        <div className="text-xs text-gray-600">Baths</div>
                                    </div>
                                    <div className="text-center px-2 py-0.5 bg-purple-50 rounded-lg">
                                        <div className="text-xl font-bold text-gray-900">{p.area}</div>
                                        <div className="text-xs text-gray-600">Area</div>
                                    </div>
                                </div>

                                {/* Type and Price */}
                                <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                                    <div>
                                        <div className="text-xs text-gray-500">Type</div>
                                        <div className="font-medium text-gray-900">{p.propertyType}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Price</div>
                                        <div className="text-lg font-bold text-gray-900">{p.price} {p.priceUnit}</div>
                                    </div>
                                </div>

                                {/* Features Preview */}
                                {p.features && p.features.length > 0 && (
                                    <div className="mt-1 pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <div className="text-xs text-gray-500">Features:</div>
                                            <div className="flex-1 flex gap-1 overflow-hidden">
                                                {p.features.slice(0, 2).map((feature: any, idx: number) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {p.features.length > 2 && (
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                        +{p.features.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
