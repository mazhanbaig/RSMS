// "use client";

// import { useState, useEffect } from "react";
// import {
//     User, Bell, Shield, Palette, Globe, CreditCard,
//     Users, Key, Mail, Phone, MapPin, Building2,
//     ChevronRight, Moon, Sun, Monitor, Save,
//     Camera, Lock, Smartphone, Laptop, Eye,
//     Clock, Languages, DollarSign, Download,
//     Trash2
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import Header from "@/components/Header";
// import { deleleData, logout, saveData, updateData } from "@/FBConfig/fbFunctions";
// import { message } from "antd";
// import { deleteUser } from "firebase/auth";
// import { auth } from "@/FBConfig/config";

// interface UserInfo {
//     name: string;
//     uid: string;
//     email: string;
//     createdAt: string;
//     photoURL?: string;
//     phone?: string;
//     company?: string;
//     location?: string;
// }

// export default function SettingsPage() {
// const [activeTab, setActiveTab] = useState("profile");
// const [userData, setUserData] = useState<UserInfo | null>(null);
// const [isSaving, setIsSaving] = useState(false);
// const [name, setName] = useState<string>(userData?.name ?? "");
// const [contactNo, setContactNo] = useState<any>('')
// const [city, setCity] = useState<any>('')
// const [companyName, setCompanyName] = useState<any>('')

// const loadUserData = () => {
//     const stored = localStorage.getItem("userInfo");
//     if (stored) {
//         setUserData(JSON.parse(stored));
//     }
// };

// useEffect(() => {
//     loadUserData();
// }, []);

// const tabs = [
//     { id: "profile", label: "Profile", icon: User },
//     { id: "account", label: "Account & Security", icon: Lock },
//     { id: "billing", label: "Billing & Subscription", icon: CreditCard },
//     { id: "delete", label: "Delete Things", icon: Trash2 }, // new tab
// ];

// const handleSave = async () => {
//     if (isSaving) return; // Prevent multiple clicks
//     setIsSaving(true); // Start saving

//     try {
//         // Simulate async save or call your updateData
//         await updateData(`users/${userData?.uid}`, { name, contactNo, city, companyName });
//         localStorage.setItem('userInfo', JSON.stringify({ ...userData, name }))
//         loadUserData();
//         message.success('Data updated successfully');
//     } catch (error) {
//         console.error(error);
//         message.error('Error while updating data');
//     } finally {
//         setIsSaving(false); // Reset saving state
//     }
// };

// if (!userData) return null;

// function deleteData(arg0: string) {
//     throw new Error("Function not implemented.");
// }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//             {/* Header Spacer */}
//             <Header userData={userData} />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Page Header */}
//                 <div className="mb-8 flex items-center justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
//                         <p className="text-slate-500 mt-1">Manage your account preferences and configurations</p>
//                     </div>
//                     <button
//                         onClick={handleSave}
//                         disabled={isSaving}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
//                     >
//                         <Save size={18} />
//                         <span className="text-sm font-medium">
//                             {isSaving ? "Saving..." : "Save Changes"}
//                         </span>
//                     </button>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Sidebar */}
//                     <div className="lg:w-72">
//                         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
//                             {/* User Summary */}
//                             <div className="p-5 border-b border-slate-100">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-lg font-semibold">
//                                         {userData?.name?.[0]?.toUpperCase() || "U"}
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold text-slate-900">{userData?.name || "User Name"}</p>
//                                         <p className="text-xs text-slate-500">{userData?.email}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Navigation Tabs */}
//                             <div className="p-3">
//                                 {tabs.map((tab) => {
//                                     const Icon = tab.icon;
//                                     const isActive = activeTab === tab.id;
//                                     return (
//                                         <button
//                                             key={tab.id}
//                                             onClick={() => setActiveTab(tab.id)}
//                                             className={`
//                                                 w-full flex items-center justify-between px-4 py-3 rounded-xl
//                                                 transition-all duration-200 mb-1
//                                                 ${isActive
//                                                     ? 'bg-slate-100 text-slate-900'
//                                                     : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
//                                                 }
//                                             `}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <Icon size={18} />
//                                                 <span className="text-sm font-medium">{tab.label}</span>
//                                             </div>
//                                             <ChevronRight size={16} className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="flex-1">
//                         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6">
//                             {/* Profile Tab */}
//                             {/* Profile Tab */}
//                             {activeTab === "profile" && (
//                                 <div className="space-y-6">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
//                                         <p className="text-sm text-slate-500">Update your personal information</p>
//                                     </div>

//                                     {/* Profile Picture */}
//                                     <div className="flex items-center gap-6">
//                                         <div className="relative">
//                                             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-2xl font-semibold">
//                                                 {userData?.name?.[0]?.toUpperCase() || "U"}
//                                             </div>
//                                             <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm">
//                                                 <Camera size={16} className="text-slate-600" />
//                                             </button>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-medium text-slate-900">Profile Photo</p>
//                                             <p className="text-xs text-slate-500">JPG, GIF, or PNG. Max 2MB.</p>
//                                         </div>
//                                     </div>

//                                     {/* Form Fields */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
//                                             <input
//                                                 type="text"
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
//                                             <input
//                                                 type="email"
//                                                 value={userData?.email || ""}
//                                                 readOnly
//                                                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-not-allowed text-slate-500"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
//                                             <input
//                                                 type="tel"
//                                                 value={contactNo}
//                                                 onChange={(e) => setContactNo(e.target.value)}
//                                                 placeholder="+1 (555) 000-0000"
//                                                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
//                                             <input
//                                                 type="text"
//                                                 value={companyName}
//                                                 onChange={(e) => setCompanyName(e.target.value)}
//                                                 placeholder="ZState Real Estate"
//                                                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             />
//                                         </div>

//                                         <div className="md:col-span-2">
//                                             <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
//                                             <input
//                                                 type="text"
//                                                 value={city}
//                                                 onChange={(e) => setCity(e.target.value)}
//                                                 placeholder="City"
//                                                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Account & Security Tab */}
//                             {activeTab === "account" && (
//                                 <div className="space-y-6">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-slate-900">Account Security</h2>
//                                         <p className="text-sm text-slate-500">
//                                             Your account is protected and authenticated using Google Sign-In.
//                                         </p>
//                                     </div>

//                                     {/* Google Auth Banner */}
//                                     <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-4">
//                                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
//                                             <svg className="w-5 h-5" viewBox="0 0 24 24">
//                                                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                             </svg>
//                                         </div>

//                                         <div className="flex-1">
//                                             <p className="text-sm text-slate-600">
//                                                 You are signed in with <span className="font-medium">{userData?.email}</span>.
//                                                 Google handles all authentication, two-factor settings, and password management.
//                                                 We never store your password locally, ensuring maximum security integrity.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Account & Security Tab */}
//                             {activeTab === "account" && (
//                                 <div className="space-y-6">

//                                     {/* Header */}
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-slate-900">
//                                             Account Security
//                                         </h2>
//                                         <p className="text-sm text-slate-500">
//                                             View how your account is authenticated and managed.
//                                         </p>
//                                     </div>

//                                     {/* Google Authentication Status */}
//                                     <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
//                                         <div className="flex items-start gap-4">

//                                             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
//                                                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                                                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                                 </svg>
//                                             </div>

//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-1">
//                                                     <h3 className="font-semibold text-slate-900">
//                                                         Google Sign-In
//                                                     </h3>
//                                                     <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
//                                                         Connected
//                                                     </span>
//                                                 </div>

//                                                 <p className="text-sm text-slate-600">
//                                                     You are signed in with{" "}
//                                                     <span className="font-medium">{userData?.email}</span>
//                                                 </p>

//                                                 <p className="text-xs text-slate-500 mt-2 leading-relaxed">
//                                                     Authentication is handled through your Google account.
//                                                     We do not store your password on our servers.
//                                                     Any two-factor authentication or additional security settings
//                                                     are managed directly within your Google account.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Security Overview */}
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

//                                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
//                                             <p className="text-sm font-medium text-slate-900">
//                                                 Authentication Method
//                                             </p>
//                                             <p className="text-xs text-slate-500 mt-1">
//                                                 Google OAuth (External Provider)
//                                             </p>
//                                         </div>

//                                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
//                                             <p className="text-sm font-medium text-slate-900">
//                                                 Password Storage
//                                             </p>
//                                             <p className="text-xs text-slate-500 mt-1">
//                                                 Not stored on this platform
//                                             </p>
//                                         </div>

//                                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
//                                             <p className="text-sm font-medium text-slate-900">
//                                                 Active Session
//                                             </p>
//                                             <p className="text-xs text-slate-500 mt-1">
//                                                 This device session
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Manage Through Google */}
//                                     <div className="border-t border-slate-200 pt-4">
//                                         <p className="text-xs text-slate-400 mb-3">
//                                             Security settings can be reviewed and updated through your Google account.
//                                         </p>

//                                         <div className="flex flex-wrap gap-3">
//                                             <a
//                                                 href="https://myaccount.google.com/security"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
//                                             >
//                                                 <Shield size={16} />
//                                                 <span>Google Security Settings</span>
//                                             </a>

//                                             <a
//                                                 href="https://myaccount.google.com/"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
//                                             >
//                                                 <Key size={16} />
//                                                 <span>Manage Google Account</span>
//                                             </a>
//                                         </div>
//                                     </div>

//                                 </div>
//                             )}

//                             {activeTab === "delete" && (
//                                 <div className="space-y-6">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-red-800">Delete Account</h2>
//                                         <p className="text-sm text-red-600 mt-1">
//                                             Permanently delete your account and all associated data. This action cannot be undone.
//                                         </p>
//                                     </div>

//                                     <div className="p-6 bg-red-50/80 backdrop-blur-sm rounded-2xl border border-red-200 shadow-sm">
//                                         <p className="text-sm text-red-700 mb-4">
//                                             Deleting your account will remove your local data and backend profile.
//                                         </p>

//                                         <button
//                                             onClick={async () => {
//                                                 if (!userData) return;

//                                                 const confirmed = confirm(
//                                                     "Are you sure you want to delete your account? This cannot be undone."
//                                                 );
//                                                 if (!confirmed) return;

//                                                 try {
// const user: any = auth.currentUser;
// deleteUser(user).then(() => {
// }).catch((error) => {
//     message.error("Failed to delete account. Try again later.");
//     return
// });
//                                                     // 1️⃣ Delete backend data
//                                                     await deleleData(`users/${userData.uid}`);

//                                                     // 2️⃣ Clear localStorage
//                                                     localStorage.removeItem("userInfo");

//                                                     await logout();

//                                                     window.location.replace('/signup')

//                                                     setUserData(null);

//                                                     message.success("Your account has been deleted successfully.");
//                                                 } catch (err) {
//                                                     console.error(err);
//                                                     message.error("Failed to delete account. Try again later.");
//                                                 }
//                                             }}
//                                             className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
//                                         >
//                                             Delete Account
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function Check(props: any) {
//     return (
//         <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <polyline points="20 6 9 17 4 12" />
//         </svg>
//     );
// }



"use client";
import { auth } from "@/FBConfig/fbFunctions";
import { useState, useEffect } from "react";
import {
    User, Bell, Shield, Palette, Globe, CreditCard,
    Users, Key, Mail, Phone, MapPin, Building2,
    ChevronRight, Moon, Sun, Monitor, Save,
    Camera, Lock, Smartphone, Laptop, Eye,
    Clock, Languages, DollarSign, Download,
    Trash2, Crown
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { deleleData, logout, updateData } from "@/FBConfig/fbFunctions";
import { message } from "antd";
import { deleteUser, getAuth } from "firebase/auth";


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
            await updateData(`users/${userData?.uid}`, { name, contactNo, city, companyName });
            localStorage.setItem('userInfo', JSON.stringify({ ...userData, name }))
            loadUserData();
            message.success('Data updated successfully');
        } catch (error) {
            console.error(error);
            message.error('Error while updating data');
        } finally {
            setIsSaving(false);
        }
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50">
            <Header userData={userData} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {/* Welcome Section - Matching dashboard style */}
                <div className="mb-10 ml-2 sm:ml-0">
                    <div className="relative">
                        <div className="relative">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                        <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Settings</span>
                                        <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="hidden sm:block p-2 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-400/10">
                                                <Crown className="h-6 w-6 text-amber-500" />
                                            </div>
                                            <div>
                                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                                    Account Settings
                                                </h1>
                                                <p className="text-gray-600 mt-2 max-w-xl">
                                                    Manage your account preferences, security, and profile information
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Redesigned to match dashboard cards */}
                    <div className="lg:w-80">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-black/5 overflow-hidden">
                            <div className="p-5 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {auth.currentUser?.photoURL ? (
                                            <Image
                                                src={auth.currentUser.photoURL}
                                                alt={userData?.name || "Profile"}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center text-white text-xl font-semibold shadow-md">
                                                {userData?.name?.[0]?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 shadow-sm transition-all">
                                            <Camera size={12} className="text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">{userData?.name || "User Name"}</p>
                                        <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                                        <div className="mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs - Matching dashboard style */}
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
                                                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-gray-900 border border-purple-100'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className={isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'} />
                                                <span className="text-sm font-medium">{tab.label}</span>
                                            </div>
                                            <ChevronRight
                                                size={16}
                                                className={`transition-all ${isActive ? 'opacity-100 text-purple-600' : 'opacity-0 group-hover:opacity-50'}`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Redesigned to match dashboard cards */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-black/5 p-6">
                            {/* Profile Tab */}
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Profile Information
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
                                    </div>


                                    {/* Form Fields - Matching dashboard input style */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={userData?.email || ""}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl cursor-not-allowed text-gray-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Your Company Name"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="City, State"
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account & Security Tab - Redesigned */}
                            {activeTab === "account" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Account Security
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">Your account is protected with Google Sign-In</p>
                                    </div>

                                    {/* Google Auth Banner - Matching dashboard style */}
                                    <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 flex items-start gap-4 hover:border-purple-200 transition-all">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">Google Sign-In</h3>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                                    Connected
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Signed in as <span className="font-medium text-purple-600">{userData?.email}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Authentication is handled through Google. We never store your password.
                                                Manage security settings directly in your Google account.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Security Overview Cards - Matching dashboard stats style */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                                                        <Key size={14} className="text-purple-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-gray-500">Auth Method</p>
                                                    <p className="text-sm font-semibold text-gray-900">Google OAuth</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                                                        <Lock size={14} className="text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-gray-500">Password</p>
                                                    <p className="text-sm font-semibold text-gray-900">Not Stored</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                                                <div className="absolute -top-2 left-3">
                                                    <div className="p-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                                                        <Shield size={14} className="text-green-600" />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs font-medium text-gray-500">2FA</p>
                                                    <p className="text-sm font-semibold text-gray-900">Via Google</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Google Links - Matching dashboard button style */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-xs text-gray-400 mb-3">Manage your Google account settings:</p>
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href="https://myaccount.google.com/security"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all hover:shadow-sm"
                                            >
                                                <Shield size={16} />
                                                <span>Security Settings</span>
                                            </a>
                                            <a
                                                href="https://myaccount.google.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all hover:shadow-sm"
                                            >
                                                <Key size={16} />
                                                <span>Manage Account</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Delete Account Tab - Redesigned with warning style */}
                            {activeTab === "delete" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Permanently delete your account and all associated data
                                        </p>
                                    </div>

                                    <div className="p-6 bg-red-50/50 rounded-xl border border-red-200">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-red-100 rounded-lg">
                                                <Trash2 size={20} className="text-red-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-red-800 mb-1">Warning: This action cannot be undone</h3>
                                                <p className="text-sm text-red-700 mb-4">
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
                                                            const auth:any = getAuth();
                                                            const user = auth.currentUser; deleteUser(user).then(() => {
                                                            }).catch((error:any) => {
                                                                message.error("Failed to delete account. Try again later.");
                                                                return
                                                            });
                                                            await deleleData(`users/${userData.uid}`);
                                                            localStorage.removeItem("userInfo");
                                                            await logout();
                                                            message.success("Account deleted successfully");
                                                            window.location.replace('/signup');
                                                        } catch (err) {
                                                            console.error(err);
                                                            message.error("Failed to delete account");
                                                        }
                                                    }}
                                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow-md font-medium"
                                                >
                                                    Permanently Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button - For tabs that need saving */}
                            {activeTab === "profile" && (
                                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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