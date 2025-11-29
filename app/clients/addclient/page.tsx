"use client";

import { useContext, useState } from "react";
import Header from "@/components/Header";
import AddClientPart1 from "@/components/AddClientPart1"; // Personal Info
import AddClientPart2 from "@/components/AddClientPart2"; // Property Info
import AddClientPart3 from "@/components/AddClientPart3"; // Additional Info
import Button from "@/components/Button";
import { UserContext } from "@/app/context/UserContext";
import { saveData } from "@/FBConfig/fbFunctions";

export default function AddClientPage() {
    const [formData, setFormData] = useState({
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
        notes: ""
    });

    const [activeSection, setActiveSection] = useState("personal");
    const sections = ["personal", "property", "additional"];

    let  userInfo  = useContext(UserContext)

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userInfo);
        console.log('thsiss ss s s  s s s  s s s ssssssssssssss');

        saveData(`clients/${formData.firstName}`, formData).then(() => {
            console.log('edoneeeee');

        }).catch((err) => {
            console.log(err);

        })


    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-5xl mx-auto p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Client</h1>
                    <p className="text-gray-600">Enter client details step by step</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {activeSection === "personal" && <AddClientPart1 formData={formData} handleChange={handleChange} />}
                        {activeSection === "property" && <AddClientPart2 formData={formData} handleChange={handleChange} />}
                        {activeSection === "additional" && <AddClientPart3 formData={formData} handleChange={handleChange} />}

                        <div className="flex justify-between mt-6">
                            <Button
                                label='Previous'
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
                                    onClick={() => {
                                        const idx = sections.indexOf(activeSection);
                                        if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
                                    }}
                                    label="Next"
                                    size="md"
                                />
                            ) : (
                                <Button
                                    label={"Add Client"}
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

