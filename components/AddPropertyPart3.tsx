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
