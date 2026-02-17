"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import AddClientPart1 from "@/components/AddClientPart1";
import AddClientPart2 from "@/components/AddClientPart2";
import AddClientPart3 from "@/components/AddClientPart3";
import Button from "@/components/Button";
import { checkUserSession, getData, saveData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { Timestamp } from "firebase/firestore";
import { strict } from "assert";

interface UserInfo {
    uid: string;
    email: string;
    name: string
}

export default function AddClientPage() {
    interface FormData {
        id?: string;
        firstName: string;
        lastName?: string;
        email?: string;
        phone: string;
        propertyType: string;
        minBudget: string;
        maxBudget: string;
        preferredLocations?: string;
        bedrooms: string;
        source?: string;
        status: string;
        notes?: string;
    }

    const [formData, setFormData] = useState<FormData>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyType: "",
        minBudget: "",
        maxBudget: "",
        preferredLocations: "",
        bedrooms: "",
        source: "",
        status: "active",
        notes: "",
    });

    const [activeSection, setActiveSection] = useState("personal");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const sections = ["personal", "property", "additional"];
    const searchParams = useSearchParams();
    const router = useRouter();
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

    // Prefill form for editing
    useEffect(() => {
        const clientData = searchParams.get("clientData");
        if (clientData) {
            try {
                const parsedData = JSON.parse(clientData);
                setFormData(prev => ({ ...prev, ...parsedData }));
            } catch (err) {
                console.error("Failed to parse clientData:", err);
            }
        }
    }, [searchParams]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userInfo) {
            message.error("User not detected!");
            return;
        }

        // Required fields
        const requiredFields: (keyof FormData)[] = [
            "firstName",
            "phone",
            "propertyType",
            "minBudget",
            "maxBudget",
            "bedrooms",
            "status"
        ];

        // Check for empty fields
        const emptyFields = requiredFields.filter(field => !(formData[field]?.trim()));
        if (emptyFields.length > 0) {
            alert(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        try {
            if (formData.id) {
                await updateData(`clients/${userInfo.uid}/${formData.id}`, {
                    ...formData,
                    agentUid: userInfo.uid,
                    agentName: userInfo.name
                });
                message.success("Edited Successfully");
            } else {
                const newId = crypto.randomUUID();
                await saveData(`clients/${userInfo.uid}/${newId}`, {
                    ...formData,
                    id: newId,
                    createdAt: new Date().toISOString(),
                    agentUid: userInfo.uid,
                    agentName: userInfo.name
                });
                message.success("Saved Successfully");

                setFormData({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    propertyType: "",
                    minBudget: "",
                    maxBudget: "",
                    preferredLocations: "",
                    bedrooms: "",
                    source: "",
                    status: "lead",
                    notes: "",
                });
                setActiveSection("personal");
            }

            router.push(`/realstate/${userInfo.uid}/clients`);
        } catch (err) {
            console.log(err);
            message.error("Something went wrong!");
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
            <div className="max-w-5xl mx-auto p-6">
                <div className="text-center mb-8 flex-col justify-start items-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add / Edit Client</h1>
                    <p className="text-gray-600">Enter client details step by step</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {activeSection === "personal" && <AddClientPart1 formData={formData} handleChange={handleChange} />}
                        {activeSection === "property" && <AddClientPart2 formData={formData} handleChange={handleChange} />}
                        {activeSection === "additional" && <AddClientPart3 formData={formData} handleChange={handleChange} />}

                        <div className="flex justify-between mt-6">
                            <Button
                                label="Previous"
                                onClick={() => {
                                    const idx = sections.indexOf(activeSection);
                                    if (idx > 0) setActiveSection(sections[idx - 1]);
                                }}
                                variant="secondary"
                                classNameC="rounded w-23"
                                size="md"
                            />
                            {activeSection !== "additional" ? (
                                <Button
                                    onClick={(e: any) => {
                                        e.preventDefault()
                                        const idx = sections.indexOf(activeSection);
                                        if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
                                    }}
                                    label="Next"
                                    size="md"
                                    variant="theme"
                                />
                            ) : (
                                <Button
                                    label="Save Client"
                                    type="submit"
                                    size="md"
                                    variant="theme2"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
