'use client'

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { getData, saveData, updateData } from "@/FBConfig/fbFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from 'antd'
import { useAuth } from "@/hooks/useAuth";
import { Building, UserPlus, Save, ArrowLeft, Briefcase, Phone, Mail, User, AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AddOwnerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            message.error('Please Login First');
            router.replace('/login');
        }
    }, [user, authLoading, router]);

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "active",
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const ownerData = searchParams.get("ownerData");
        if (ownerData) setFormData(prev => ({ ...prev, ...JSON.parse(ownerData) }));
    }, [searchParams]);

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            message.error("User not detected!");
            return;
        }

        const requiredFields: (keyof typeof formData)[] = ["firstName", "phone", "status"];
        const emptyFields = requiredFields.filter(f => !formData[f]?.trim());

        if (emptyFields.length > 0) {
            message.error(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        setIsSubmitting(true);

        const ownerFullData = {
            ...formData,
            updatedAt: new Date().toISOString(),
            agentUid: user.uid,
            agentName: user.name
        };

        try {
            if (formData.id) {
                await updateData(`owners/${user.uid}/${formData.id}`, ownerFullData);
                message.success("Owner Updated Successfully");
                router.push(`/realstate/${user?.uid}/owners`);
            } else {
                const newId = crypto.randomUUID();
                await saveData(`owners/${user.uid}/${newId}`, {
                    ...ownerFullData,
                    id: newId,
                    createdAt: new Date().toISOString()
                });
                message.success("Owner Added Successfully");
                router.push(`/realstate/${user?.uid}/owners`);
            }
        } catch (error) {
            message.error("Something went wrong!");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={user} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                                {formData.id ? 'Edit Owner' : 'New Owner'}
                            </span>
                            <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                    {formData.id ? 'Edit Owner' : 'Add New Owner'}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-xl shadow-indigo-900/5 overflow-hidden">
                        <div className="relative px-6 pt-5 pb-3 border-b border-slate-100">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                                    <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                                </div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Owner Information
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* First Name */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                                            First Name <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter first name"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="owner@example.com"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="group">
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                                            Phone Number <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 234 567 8900"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                                            Owner Status <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white appearance-none cursor-pointer"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="deal-Done">Deal Done</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                                        Additional Notes
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Any additional information about this owner (properties owned, preferences, etc.)..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-slate-50/50 hover:bg-white resize-none"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Include property details, special requirements, or any important notes
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                                <Button
                                    label="Cancel"
                                    onClick={() => router.back()}
                                    variant="secondary"
                                    classNameC="rounded-xl"
                                    size="md"
                                />
                                <Button
                                    label={isSubmitting ? "Saving..." : (formData.id ? "Update Owner" : "Save Owner")}
                                    type="submit"
                                    size="md"
                                    variant="theme2"
                                    icon={<Save />}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </form>
                    </div>

                    {/* Helpful Tips Card */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Building className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">Owner Management Tips</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    • Keep owner contact information up to date for property communications<br />
                                    • Track property ownership history for each owner<br />
                                    • Maintain notes about owner preferences for better service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}