"use client";
import { useState } from "react";
import {
    User, Bell, Shield, Palette, Globe, CreditCard,
    Users, Key, Mail, Phone, MapPin, Building2,
    ChevronRight, Moon, Sun, Monitor, Save,
    Camera, Lock, Smartphone, Laptop, Eye,
    Clock, Languages, DollarSign, Download,
    Trash2, Crown, Settings
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { deleleData, logout, updateData } from "@/FBConfig/fbFunctions";
import { message } from "antd";
import { deleteUser, getAuth } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    const { user: userData, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState<string>(userData?.name ?? "");
    const [contactNo, setContactNo] = useState<any>('')
    const [city, setCity] = useState<any>('')
    const [companyName, setCompanyName] = useState<any>('')

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "account", label: "Account & Security", icon: Lock },
        { id: "billing", label: "Billing & Subscription", icon: CreditCard },
        { id: "delete", label: "Delete Things", icon: Trash2 },
    ];

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        try {
            await updateData(`users/${userData?.uid}`, { name, contactNo, city, companyName });
            message.success('Data updated successfully');
        } catch (error) {
            console.error(error);
            message.error('Error while updating data');
        } finally {
            setIsSaving(false);
        }
    };

    if (authLoading || !userData) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={userData} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Welcome Section - Matching Owners Page */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Settings</span>
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                        Account {''}
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Settings
                                        </span>
                                    </h1>
                                    <p className="text-slate-500 mt-2 max-w-xl">
                                        Manage your account preferences, security, and profile information
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-5 py-4 border border-indigo-100 mt-6 sm:mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-indigo-600" />
                                        <span className="text-sm font-medium text-slate-700">Account Status</span>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600">Active</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-800">{userData?.name || "User"}</div>
                                <div className="text-sm text-slate-500 mt-1">{userData?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Matching Owners Page Card Style */}
                    <div className="lg:w-80">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {userData?.photoURL ? (
                                            <Image
                                                src={userData.photoURL}
                                                alt={userData?.name || "Profile"}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 text-xl font-semibold shadow-md">
                                                {userData?.name?.[0]?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm transition-all">
                                            <Camera size={12} className="text-slate-600" />
                                        </button>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-800 truncate">{userData?.name || "User Name"}</p>
                                        <p className="text-xs text-slate-500 truncate">{userData?.email}</p>
                                        <div className="mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs - Matching Owners Page Filter Style */}
                            <div className="p-3">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                w-full flex items-center justify-between px-4 py-3 rounded-xl
                                                transition-all duration-200 mb-1 group
                                                ${isActive
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                                                <span className="text-sm font-medium">{tab.label}</span>
                                            </div>
                                            <ChevronRight
                                                size={16}
                                                className={`transition-all ${isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-50'}`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Matching Owners Page Table Style */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            {/* Profile Tab */}
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">
                                            Profile Information
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">Update your personal information</p>
                                    </div>

                                    {/* Form Fields - Matching Owners Page Input Style */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={userData?.email || ""}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg cursor-not-allowed text-slate-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Your Company Name"
                                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="City, State"
                                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account & Security Tab - Matching Owners Page Style */}
                            {activeTab === "account" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">
                                            Account Security
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">Your account is protected with Google Sign-In</p>
                                    </div>

                                    {/* Google Auth Banner - Matching Owners Page Card Style */}
                                    <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 flex items-start gap-4 hover:border-indigo-200 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-slate-800">Google Sign-In</h3>
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full border border-emerald-200">
                                                    Connected
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                Signed in as <span className="font-medium text-indigo-600">{userData?.email}</span>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-2">
                                                Authentication is handled through Google. We never store your password.
                                                Manage security settings directly in your Google account.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Security Overview Cards - Matching Owners Page Stats Style */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                                                        <Key size={14} className="text-indigo-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-slate-500">Auth Method</p>
                                                    <p className="text-sm font-semibold text-slate-800">Google OAuth</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                                                        <Lock size={14} className="text-purple-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-slate-500">Password</p>
                                                    <p className="text-sm font-semibold text-slate-800">Not Stored</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                                                        <Shield size={14} className="text-emerald-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-slate-500">2FA</p>
                                                    <p className="text-sm font-semibold text-slate-800">Via Google</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Google Links - Matching Owners Page Button Style */}
                                    <div className="border-t border-slate-200 pt-4">
                                        <p className="text-xs text-slate-400 mb-3">Manage your Google account settings:</p>
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href="https://myaccount.google.com/security"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"
                                            >
                                                <Shield size={16} />
                                                <span>Security Settings</span>
                                            </a>
                                            <a
                                                href="https://myaccount.google.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"
                                            >
                                                <Key size={16} />
                                                <span>Manage Account</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Delete Account Tab - Matching Owners Page Style */}
                            {activeTab === "delete" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-rose-600">Delete Account</h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Permanently delete your account and all associated data
                                        </p>
                                    </div>

                                    <div className="p-6 bg-rose-50/50 rounded-xl border border-rose-200">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-rose-100 rounded-lg">
                                                <Trash2 size={20} className="text-rose-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-rose-800 mb-1">Warning: This action cannot be undone</h3>
                                                <p className="text-sm text-rose-700 mb-4">
                                                    Deleting your account will permanently remove all your data including clients, properties, owners, and events. This action is irreversible.
                                                </p>
                                                <button
                                                    onClick={async () => {
                                                        if (!userData) return;
                                                        const confirmed = confirm(
                                                            "Are you absolutely sure you want to delete your account? All your data will be permanently lost."
                                                        );
                                                        if (!confirmed) return;

                                                        try {
                                                            const user = getAuth().currentUser;
                                                            if (!user) return;
                                                            await deleteUser(user);
                                                            await deleleData(`users/${userData.uid}`);
                                                            await logout();
                                                            message.success("Account deleted successfully");
                                                            window.location.replace('/signup');
                                                        } catch (err) {
                                                            console.error(err);
                                                            message.error("Failed to delete account");
                                                        }
                                                    }}
                                                    className="px-5 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all shadow-sm font-medium"
                                                >
                                                    Permanently Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button - Matching Owners Page Button Style */}
                            {activeTab === "profile" && (
                                <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save size={18} />
                                        <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
