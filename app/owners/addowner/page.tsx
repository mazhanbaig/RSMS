"use client";

import { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { UserContext } from "@/app/context/UserContext";
import { saveData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import AddClientPart1 from "@/components/AddClientPart1";
import { message } from 'antd'

export default function AddOwnerPage() {
    interface FormData {
        id?: string;
        firstName: string;
        lastName: string;
        email?: string;
        phone: string;
        status: string;
        notes?: string;
    }

    const [formData, setFormData] = useState<FormData>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "active",
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const userInfo = useContext(UserContext);

    // Prefill form if editing
    useEffect(() => {
        const ownerData = searchParams.get("ownerData");
        if (ownerData) {
            setFormData(prev => ({ ...prev, ...JSON.parse(ownerData) }));
        }
    }, [searchParams]);

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const requiredFields: (keyof FormData)[] = ["firstName", "phone", "status"];
        const emptyFields = requiredFields.filter(field => !formData[field]?.trim());

        if (emptyFields.length > 0) {
            alert(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        const ownerFullData = { ...formData, ownerUid: userInfo.uid };

        if (formData.id) {
            updateData(`owners/${formData.id}`, ownerFullData)
                .then(() => {
                    message.success("Edited Successfully");
                    router.push("/owners");
                })
                .catch(console.log);

        } else {
            const newId = crypto.randomUUID();
            saveData(`owners/${newId}`, { ...ownerFullData, id: newId })
                .then(() => {
                    message.success("Saved Successfully");
                    router.push("/owners");
                })
                .catch(console.log);

            setFormData({
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                status: "active",
                notes: "",
            });
            
        }
    };

    if (!userInfo)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500 animate-pulse">
                Loading…
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    {formData.id ? "Edit Owner" : "Add Owner"}
                </h1>
                <p className="text-center text-gray-600 mb-6">Fill in the owner details below</p>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AddClientPart1 formData={formData} handleChange={handleChange} />

                        <div className="flex justify-end">
                            <Button label="Save Owner" type="submit" size="md" variant="theme2" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
