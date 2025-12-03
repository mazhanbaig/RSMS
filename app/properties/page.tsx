"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Home, MapPin, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getData } from "@/FBConfig/fbFunctions";

export default function PropertiesPage() {
    const router = useRouter();

    const [search, setSearch] = useState("");

    const [properties, setProperties] = useState<any[]>([]);

    const deleteProperty = (id: number) => {
        setProperties(properties.filter((p) => p.id !== id));
    };

    useEffect(() => {
        getData("properties")
            .then((res) => {
                if (!res) return; 
                const propertiesArray = Object.entries(res).map(([id, data]: [string, any]) => ({
                    id,
                    ...data
                }));
                setProperties(propertiesArray);
            })
            .catch((err) => console.log(err));
    }, []);

    


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
            <Header />

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
                onClick={()=>{
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
                    .map((p, index) => (
                        <div
                            key={p.id}
                            className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                            style={{
                                borderLeft: `5px solid ${['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'][index % 5]
                                    }`,
                            }}
                        >
                            {/* Animated background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-2xl" />

                            <div className="relative">
                                {/* Title with underline effect */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 relative inline-block">
                                            {p.title}
                                            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" />
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => deleteProperty(p.id)}
                                        className="p-2 hover:bg-red-100 rounded-full transition-colors transform hover:rotate-12 hover:scale-110"
                                    >
                                        <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
                                    </button>
                                </div>

                                {/* Location with animated pin */}
                                <div className="flex items-center gap-2 mb-3 group/location">
                                    <div className="relative">
                                        <MapPin
                                            size={20}
                                            className="text-purple-500 transform group-hover/location:scale-110 transition-transform"
                                        />
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{p.location}</span>
                                </div>

                                {/* Type with icon badge */}
                                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border">
                                    <Home size={16} className="text-gray-600" />
                                    <span className="text-sm font-semibold text-gray-800">{p.type}</span>
                                </div>

                                {/* Price with animated gradient */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="relative">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                            {p.price}
                                        </span>
                                        <div className="absolute -right-2 -top-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
                                    </div>
                                </div>

                                {/* Hover indicator dots */}
                                <div className="absolute bottom-3 left-5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                                            style={{ animationDelay: `${i * 100}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
