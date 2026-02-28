'use client';

import { getData } from "@/FBConfig/fbFunctions";
import { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;

interface ImagesOwnerProps {
    formData: any;
    handleChange: (e: any) => void;
    imagePreviews: string[];
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;
}
interface Owner {
    id: string,
    createdAt: any,
    agentUid: string,
    agentName: string,

    firstName: string,
    lastName: string,
    email: string,
    phone: string,

    status: "active" | "deal-Done" | "lost",
    notes: string,
}

export default function AddPropertyPart3({
    formData,
    handleChange,
    imagePreviews,
    handleImageUpload,
    removeImage
}: ImagesOwnerProps) {

    const [owners, setOwners] = useState<Owner[]>([]);
    const [loadingOwners, setLoadingOwners] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('userInfo');
        if (!userData) return;

        const parsed = JSON.parse(userData);

        getData(`owners/${parsed?.uid}`)
            .then((res: any) => {
                if (!res) return;

                const ownersArray: Owner[] = Object.entries(res).map(
                    ([uid, value]: [string, any]) => ({
                        uid,
                        ...value
                    })
                );

                const filtered = ownersArray.filter(
                    (o) => o.agentUid === parsed.uid
                );

                setOwners(filtered.reverse());
            })
            .catch(console.error)
            .finally(() => setLoadingOwners(false));
    }, []);

    const handleOwnerSelect = (id: string) => {
        const selectedOwner = owners.find(o => o.id === id);
        if (!selectedOwner) return;

        handleChange({ target: { name: "ownerId", value: selectedOwner?.id } });
        handleChange({ target: { name: "ownerName", value: `${selectedOwner.firstName} ${selectedOwner.lastName}` } });
        handleChange({ target: { name: "ownerContact", value: selectedOwner.phone || selectedOwner.phone || "" } });
    };

    return (
        <div className="space-y-6">

            {/* ================= PROPERTY IMAGES ================= */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Images</h2>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images (Max 10)
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                    </div>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imagePreviews.length >= 10}
                    />
                </label>

                {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img src={preview} className="w-full h-24 object-cover rounded-lg" />
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= OWNER INFORMATION ================= */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* OWNER SELECT */}
                    <Select
                        showSearch
                        placeholder={loadingOwners ? "Loading owners..." : "Select owner"}
                        value={formData.ownerUid || undefined}
                        className="w-full"
                        onChange={handleOwnerSelect}
                        filterOption={(input, option) => {
                            const label = option?.children;
                            if (!label) return false;
                            return label.toString().toLowerCase().includes(input.toLowerCase());
                        }}

                    >
                        {owners.map(o => (
                            <Option key={o.id} value={o.id}>{o.firstName} {o.lastName}</Option>
                        ))}
                    </Select>

                    {/* OWNER CONTACT (READ-ONLY) */}
                    <Select
                        disabled
                        value={formData.ownerContact || undefined}
                        className="w-full"
                        placeholder="Owner contact"
                    >
                        {formData.ownerContact && <Option value={formData.ownerContact}>{formData.ownerContact}</Option>}
                    </Select>

                </div>
            </div>
        </div>
    );
}
