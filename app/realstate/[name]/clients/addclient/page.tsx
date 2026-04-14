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
import { UserPlus, ArrowLeft, ArrowRight, Save, User, Home, FileText, CheckCircle } from "lucide-react";
import Loader from "@/components/Loader";

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sections = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "property", label: "Preferences", icon: Home },
        { id: "additional", label: "Additional", icon: FileText }
    ];

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user: any = await checkUserSession();
                if (!user) {
                    message.error('Please Login First');
                    router.replace('/login');
                    return;
                }
                const storedUser: any = localStorage.getItem('userInfo');
                const userData = JSON.parse(storedUser);
                setUserInfo(userData);
            } catch (err) {
                message.error("Something went wrong!");
                router.replace('/login');
            }
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        const clientData = searchParams.get("clientData");
        if (clientData) {
            try {
                const parsedData = JSON.parse(clientData);
                setFormData(prev => ({ ...prev, ...parsedData }));
            } catch (err) {
                message.error("Something went wrong!");
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

        const requiredFields: (keyof FormData)[] = [
            "firstName", "phone", "propertyType", "minBudget", "maxBudget", "bedrooms", "status"
        ];

        const emptyFields = requiredFields.filter(field => !(formData[field]?.trim()));
        if (emptyFields.length > 0) {
            message.error(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        setIsSubmitting(true);
        try {
            if (formData.id) {
                await updateData(`clients/${userInfo.uid}/${formData.id}`, {
                    ...formData,
                    agentUid: userInfo.uid,
                    agentName: userInfo.name,
                    updatedAt: new Date().toISOString()
                });
                message.success("Client Updated Successfully");
            } else {
                const newId = crypto.randomUUID();
                await saveData(`clients/${userInfo.uid}/${newId}`, {
                    ...formData,
                    id: newId,
                    createdAt: new Date().toISOString(),
                    agentUid: userInfo.uid,
                    agentName: userInfo.name
                });
                message.success("Client Added Successfully");

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
                    status: "active",
                    notes: "",
                });
                setActiveSection("personal");
            }
            router.push(`/realstate/${userInfo.uid}/clients`);
        } catch (err) {
            message.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
    const isFirstSection = currentSectionIndex === 0;
    const isLastSection = currentSectionIndex === sections.length - 1;

    if (!userInfo) {
        return (
           <Loader/>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userInfo} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                {formData.id ? 'Edit Client' : 'New Client'}
                            </span>
                            <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div>
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                                    {formData.id ? 'Edit Client' : 'Add New Client'}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {sections.map((section, idx) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                const isCompleted = sections.findIndex(s => s.id === activeSection) > idx;

                                return (
                                    <div key={section.id} className="flex-1 relative">
                                        <div className="flex flex-col items-center">
                                            <button
                                                onClick={() => setActiveSection(section.id)}
                                                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 text-white scale-110'
                                                    : isCompleted
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5" />
                                                ) : (
                                                    <Icon className="h-5 w-5" />
                                                )}
                                            </button>
                                            <span className={`mt-2 text-xs font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'
                                                }`}>
                                                {section.label}
                                            </span>
                                        </div>
                                        {idx < sections.length - 1 && (
                                            <div className={`absolute top-6 left-1/2 w-full h-0.5 ${sections.findIndex(s => s.id === activeSection) > idx
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl shadow-purple-900/5 overflow-hidden">
                        <div className="relative px-6 pt-5 pb-3 border-b border-gray-100/80">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                                    {activeSection === "personal" && <User className="h-3.5 w-3.5 text-purple-500" />}
                                    {activeSection === "property" && <Home className="h-3.5 w-3.5 text-blue-500" />}
                                    {activeSection === "additional" && <FileText className="h-3.5 w-3.5 text-cyan-500" />}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {activeSection === "personal" && "Personal Information"}
                                    {activeSection === "property" && "Property Preferences"}
                                    {activeSection === "additional" && "Additional Details"}
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {activeSection === "personal" && <AddClientPart1 formData={formData} handleChange={handleChange} />}
                            {activeSection === "property" && <AddClientPart2 formData={formData} handleChange={handleChange} />}
                            {activeSection === "additional" && <AddClientPart3 formData={formData} handleChange={handleChange} />}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
                                <Button
                                    label="Previous"
                                    onClick={() => {
                                        if (!isFirstSection) {
                                            setActiveSection(sections[currentSectionIndex - 1].id);
                                        }
                                    }}
                                    variant="secondary"
                                    classNameC={`rounded-xl ${isFirstSection ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    size="md"
                                    icon={<ArrowLeft />}
                                    disabled={isFirstSection}
                                />

                                {!isLastSection ? (
                                    <Button
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            setActiveSection(sections[currentSectionIndex + 1].id);
                                        }}
                                        label="Next Step"
                                        size="md"
                                        variant="theme"
                                        icon={<ArrowRight />}
                                    />
                                ) : (
                                    <Button
                                        label={isSubmitting ? "Saving..." : (formData.id ? "Update Client" : "Save Client")}
                                        type="submit"
                                        size="md"
                                        variant="theme2"
                                        icon={<Save />}
                                        disabled={isSubmitting}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}