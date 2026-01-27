'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { auth, getData, saveData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import AddClientPart1 from "@/components/AddClientPart1";
import { message } from 'antd'
import { onAuthStateChanged } from "firebase/auth";

export default function AddOwnerPage() {
    interface UserInfo {
        uid: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "active",
        notes: "",
    });

    const [userInfo, setUserInfo] = useState<UserInfo|null>(null)
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace(`/login`)
            }
        })
        const storedUser = localStorage.getItem("userInfo");
        if (!storedUser) return;

        const { uid } = JSON.parse(storedUser);

        getData(`users/${uid}`)
            .then((res: any) => {
                setUserInfo(res);
                console.log(userInfo);
            })
    }, [])


    // Prefill form if editing
    useEffect(() => {
        const ownerData = searchParams.get("ownerData");
        if (ownerData) setFormData(prev => ({ ...prev, ...JSON.parse(ownerData) }));
    }, [searchParams]);

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo) return message.error("User not detected!");

        const requiredFields: (keyof typeof formData)[] = ["firstName", "phone", "status"];
        const emptyFields = requiredFields.filter(f => !formData[f]?.trim());
        if (emptyFields.length > 0) return alert(`Please fill in: ${emptyFields.join(", ")}`);

        const ownerFullData = { ...formData, ownerUid: userInfo.uid };

        if (formData.id) {
            updateData(`owners/${formData.id}`, ownerFullData)
                .then(() => { message.success("Edited Successfully"); router.push("/owners"); })
                .catch(console.log);
        } else {
            const newId = crypto.randomUUID();
            saveData(`owners/${newId}`, { ...ownerFullData, id: newId })
                .then(() => { message.success("Saved Successfully"); router.push("/owners"); })
                .catch(console.log);
        }
    };

    if (!userInfo) {
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userData={userInfo} />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    {formData.id ? "Edit Owner" : "Add Owner"}
                </h1>
                <p className="text-center text-gray-600 mb-6">Fill in the owner details below</p>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AddClientPart1 formData={formData} handleChange={handleChange} />
                        <div className="flex justify-end">
                            <Button label="Save Owner" type="submit" size="md" variant="theme2" disabled={!userInfo} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
