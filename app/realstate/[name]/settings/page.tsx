"use client";

import { useState, useEffect } from "react";
import {
    User, Bell, Shield, Palette, Globe, CreditCard,
    Users, Key, Mail, Phone, MapPin, Building2,
    ChevronRight, Moon, Sun, Monitor, Save,
    Camera, Lock, Smartphone, Laptop, Eye,
    Clock, Languages, DollarSign, Download,
    Trash2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { deleleData, logout, saveData, updateData } from "@/FBConfig/fbFunctions";
import { message } from "antd";

interface UserInfo {
    name: string;
    uid: string;
    email: string;
    createdAt: string;
    photoURL?: string;
    phone?: string;
    company?: string;
    location?: string;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState<string>(userData?.name ?? "");
    const [contactNo, setContactNo] = useState<any>('')
    const [city, setCity] = useState<any>('')
    const [companyName, setCompanyName] = useState<any>('')

    const loadUserData = () => {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
            setUserData(JSON.parse(stored));
        }
    };

    useEffect(() => {
        loadUserData(); 
    }, []);

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "account", label: "Account & Security", icon: Lock },
        { id: "billing", label: "Billing & Subscription", icon: CreditCard },
        { id: "delete", label: "Delete Things", icon: Trash2 }, // new tab
    ];

    const handleSave = async () => {
        if (isSaving) return; // Prevent multiple clicks
        setIsSaving(true); // Start saving

        try {
            // Simulate async save or call your updateData
            await updateData(`users/${userData?.uid}`, { name, contactNo, city, companyName });
            localStorage.setItem('userInfo', JSON.stringify({ ...userData, name }))
            loadUserData();
            message.success('Data updated successfully');
        } catch (error) {
            console.error(error);
            message.error('Error while updating data');
        } finally {
            setIsSaving(false); // Reset saving state
        }
    };

    if (!userData) return null;

    function deleteData(arg0: string) {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Header Spacer */}
            <Header userData={userData} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                        <p className="text-slate-500 mt-1">Manage your account preferences and configurations</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
                    >
                        <Save size={18} />
                        <span className="text-sm font-medium">
                            {isSaving ? "Saving..." : "Save Changes"}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-72">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                            {/* User Summary */}
                            <div className="p-5 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-lg font-semibold">
                                        {userData?.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{userData?.name || "User Name"}</p>
                                        <p className="text-xs text-slate-500">{userData?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs */}
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
                                                transition-all duration-200 mb-1
                                                ${isActive
                                                    ? 'bg-slate-100 text-slate-900'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} />
                                                <span className="text-sm font-medium">{tab.label}</span>
                                            </div>
                                            <ChevronRight size={16} className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6">
                            {/* Profile Tab */}
                            {/* Profile Tab */}
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
                                        <p className="text-sm text-slate-500">Update your personal information</p>
                                    </div>

                                    {/* Profile Picture */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-2xl font-semibold">
                                                {userData?.name?.[0]?.toUpperCase() || "U"}
                                            </div>
                                            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm">
                                                <Camera size={16} className="text-slate-600" />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Profile Photo</p>
                                            <p className="text-xs text-slate-500">JPG, GIF, or PNG. Max 2MB.</p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={userData?.email || ""}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-not-allowed text-slate-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="ZState Real Estate"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="City"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account & Security Tab */}
                            {activeTab === "account" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">Account Security</h2>
                                        <p className="text-sm text-slate-500">
                                            Your account is protected and authenticated using Google Sign-In.
                                        </p>
                                    </div>

                                    {/* Google Auth Banner */}
                                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm text-slate-600">
                                                You are signed in with <span className="font-medium">{userData?.email}</span>.
                                                Google handles all authentication, two-factor settings, and password management.
                                                We never store your password locally, ensuring maximum security integrity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account & Security Tab */}
                            {activeTab === "account" && (
                                <div className="space-y-6">

                                    {/* Header */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Account Security
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            View how your account is authenticated and managed.
                                        </p>
                                    </div>

                                    {/* Google Authentication Status */}
                                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="flex items-start gap-4">

                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-slate-900">
                                                        Google Sign-In
                                                    </h3>
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                                                        Connected
                                                    </span>
                                                </div>

                                                <p className="text-sm text-slate-600">
                                                    You are signed in with{" "}
                                                    <span className="font-medium">{userData?.email}</span>
                                                </p>

                                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                    Authentication is handled through your Google account.
                                                    We do not store your password on our servers.
                                                    Any two-factor authentication or additional security settings
                                                    are managed directly within your Google account.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Overview */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <p className="text-sm font-medium text-slate-900">
                                                Authentication Method
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Google OAuth (External Provider)
                                            </p>
                                        </div>

                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <p className="text-sm font-medium text-slate-900">
                                                Password Storage
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Not stored on this platform
                                            </p>
                                        </div>

                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <p className="text-sm font-medium text-slate-900">
                                                Active Session
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                This device session
                                            </p>
                                        </div>
                                    </div>

                                    {/* Manage Through Google */}
                                    <div className="border-t border-slate-200 pt-4">
                                        <p className="text-xs text-slate-400 mb-3">
                                            Security settings can be reviewed and updated through your Google account.
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href="https://myaccount.google.com/security"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                                            >
                                                <Shield size={16} />
                                                <span>Google Security Settings</span>
                                            </a>

                                            <a
                                                href="https://myaccount.google.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                                            >
                                                <Key size={16} />
                                                <span>Manage Google Account</span>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {activeTab === "delete" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-red-800">Delete Account</h2>
                                        <p className="text-sm text-red-600 mt-1">
                                            Permanently delete your account and all associated data. This action cannot be undone.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-red-50/80 backdrop-blur-sm rounded-2xl border border-red-200 shadow-sm">
                                        <p className="text-sm text-red-700 mb-4">
                                            Deleting your account will remove your local data and backend profile.
                                        </p>

                                        <button
                                            onClick={async () => {
                                                if (!userData) return;

                                                const confirmed = confirm(
                                                    "Are you sure you want to delete your account? This cannot be undone."
                                                );
                                                if (!confirmed) return;

                                                try {
                                                    // 1️⃣ Delete backend data
                                                    await deleleData(`users/${userData.uid}`);

                                                    // 2️⃣ Clear localStorage
                                                    localStorage.removeItem("userInfo");

                                                    await logout();
                                                    
                                                    window.location.replace('/signup')

                                                    setUserData(null);

                                                    message.success("Your account has been deleted successfully.");
                                                } catch (err) {
                                                    console.error(err);
                                                    message.error("Failed to delete account. Try again later.");
                                                }
                                            }}
                                            className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Check(props: any) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}