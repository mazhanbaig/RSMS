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
                    .filter((p) =>
                        p.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((p) => (
                        <div
                            key={p.id}
                            className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-5 hover:shadow-2xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {p.title}
                                </h3>
                                <Trash2
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => deleteProperty(p.id)}
                                />
                            </div>

                            <p className="mt-3 flex items-center gap-2 text-gray-600">
                                <MapPin size={18} /> {p.location}
                            </p>

                            <p className="mt-2 flex items-center gap-2 text-gray-700 text-lg font-semibold">
                                <Home size={18} /> {p.type}
                            </p>

                            <p className="mt-2 text-purple-600 font-bold">{p.price}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
