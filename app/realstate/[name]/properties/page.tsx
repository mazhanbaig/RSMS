"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { MapPin, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, checkUserSession, deleleData, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { message } from "antd";

export default function PropertiesPage() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);
    const [properties, setProperties] = useState<any[]>([]);

    const deleteProperty = (id: string) => {
        deleleData(`properties/${id}`)
            .then(() => {
                setProperties(prev => prev.filter(p => p.id !== id));
                message.error("Property Deleted");
            })
            .catch(err => console.error("Failed to delete property:", err));
    };

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
            }
        };

        checkAuth();
    }, [router]);

    if (!userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
            <Header userData={userInfo} />

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mt-16 px-6">
                <h1 className="text-2xl md:text-[40px] font-bold text-gray-900 mb-2">
                    Manage{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Properties
                    </span>
                </h1>

                <p className="text-gray-600 text-lg mb-6">
                    Smartly manage everything you own or handle.
                </p>

                <Button
                    label="Add Property"
                    variant="theme2"
                    onClick={() => router.push("/properties/addproperty")}
                />

                {/* SEARCH */}
                <div className="mt-6 flex items-center gap-4">
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

            {/* PROPERTY GRID */}
            <div className="max-w-6xl mx-auto mt-14 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                    .filter(p =>
                        p.title?.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((p: any) => {
                        const isClosed =
                            p.propertyStatus === "sold" ||
                            p.propertyStatus === "rented";

                        return (
                            <div
                                key={p.id}
                                onClick={() => {
                                    if (isClosed) return;
                                    router.push(
                                        `/properties/viewproperty/${encodeURIComponent(
                                            p.id
                                        )}`
                                    );
                                }}
                                className={`relative bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300
                                    ${isClosed
                                    ? `opacity-70 grayscale  ${p.propertyStatus == 'rented' ? '' : 'cursor-not-allowed'}`
                                        : "hover:shadow-2xl cursor-pointer"
                                    }
                                `}
                            >
                                {/* SOLD / RENTED OVERLAY */}
                                {isClosed && (
                                    <div
                                    onClick={()=>{
                                            router.push(`/properties/viewproperty/${encodeURIComponent(p.id)}`)
                                    }} 
                                    className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                                        <span
                                            className={`px-6 py-3 text-lg font-extrabold tracking-wider rounded-full shadow-xl
                                                ${p.propertyStatus === "sold"
                                                    ? "bg-red-600 text-white"
                                                    : "bg-blue-600 text-white"
                                                }
                                            `}
                                        >
                                            {p.propertyStatus.toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                {/* CONTENT */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                                {p.title}
                                            </h3>

                                            <div className="flex items-center gap-1.5 text-gray-600 mt-1">
                                                <MapPin size={14} className="text-purple-600" />
                                                <span className="text-sm truncate">
                                                    {p.location}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteProperty(p.id);
                                            }}
                                            className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* STATS */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="text-center bg-blue-50 rounded-lg py-1">
                                            <div className="font-bold">
                                                {p.bedrooms || 0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Beds
                                            </div>
                                        </div>
                                        <div className="text-center bg-green-50 rounded-lg py-1">
                                            <div className="font-bold">
                                                {p.bathrooms || 0}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Baths
                                            </div>
                                        </div>
                                        <div className="text-center bg-purple-50 rounded-lg py-1">
                                            <div className="font-bold">
                                                {p.area}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Area
                                            </div>
                                        </div>
                                    </div>

                                    {/* PRICE */}
                                    <div className="flex justify-between border-t pt-3">
                                        <div>
                                            <div className="text-xs text-gray-500">
                                                Type
                                            </div>
                                            <div className="font-medium">
                                                {p.propertyType}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">
                                                Price
                                            </div>
                                            <div className="font-bold text-lg">
                                                {p.price} {p.priceUnit}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
