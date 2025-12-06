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

export default function AddPropertyPart3({
    formData,
    handleChange,
    imagePreviews,
    handleImageUpload,
    removeImage
}: ImagesOwnerProps) {

    const [owners, setOwners] = useState<any[]>([]); // store full objects

    useEffect(() => {
        const userData: any = localStorage.getItem('userInfo');
        if (!userData) return;
        const parsed = JSON.parse(userData);

        getData(`owners/`)
            .then((res: any) => {
                if (!res) return;
                const ownersArray = Object.values(res);
                const filtered = ownersArray.filter((o: any) => o.ownerUid === parsed.uid);
                filtered.reverse()
                setOwners(filtered); // store full objects
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            {/* Property Images Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Images</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Max 10)</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm text-gray-500">
                                Click to upload or drag and drop
                            </p>
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
                </div>

                {imagePreviews.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Uploaded Images ({imagePreviews.length}/10)</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {imagePreviews.map((preview:any, index:number) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Owner Info Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Owner Name Select */}
                    <Select
                        showSearch
                        placeholder={owners.length === 0 ? "Loading owners..." : "Select owner"}
                        optionFilterProp="children"
                        value={formData.ownerName || undefined}
                        onChange={(value) => handleChange({ target: { name: "ownerName", value } })}
                        className="w-full"
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {owners.map((o, i) => (
                            <Option key={i} value={`${o.firstName} ${o.lastName}`}>
                                {`${o.firstName} ${o.lastName}`}
                            </Option>
                        ))}
                    </Select>

                    {/* Owner Contact Select */}
                    <Select
                        showSearch
                        placeholder={owners.length === 0 ? "Loading contacts..." : "Select contact"}
                        optionFilterProp="children"
                        value={formData.ownerContact || undefined}
                        onChange={(value) => handleChange({ target: { name: "ownerContact", value } })}
                        className="w-full"
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {owners.map((o, i) => (
                            <Option key={i} value={o.phone || o.contactNumber || o.ownerContact || ""}>
                                {`${o.phone || o.contactNumber || o.ownerContact || ""}`}
                            </Option>
                        ))}
                    </Select>

                </div>
            </div>
        </div>
    );
}
