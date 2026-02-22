// "use client";

// import { logout } from "@/FBConfig/fbFunctions";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface UserInfo {
//     name: string;
//     uid: string;
//     email: string;
//     createdAt: string;
//     // [key: string]: any;
// }

// export default function Header({ userData }: { userData?: Partial<UserInfo> | null }) {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const router = useRouter();

//     const navLinks = [
//         { label: "Dashboard", href: `/realstate/${userData?.uid}` },
//         { label: "Properties", href: `/realstate/${userData?.uid}/properties` },
//         { label: "Clients", href: `/realstate/${userData?.uid}/clients` },
//         { label: "Owners", href: `/realstate/${userData?.uid}/owners` },
//         { label: "Events", href: `/realstate/${userData?.uid}/events` },
//     ];

//     return (
//         <nav className="relative z-50 top-5 right-5 left-5 w-[96%] bg-white/70 backdrop-blur-lg shadow-lg px-6 py-3 flex flex-wrap justify-between items-center rounded-xl">
//             {/* Logo */}
//             <div className="text-2xl font-extrabold text-gray-900 uppercase">
//                 ZState
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-4">
//                 {navLinks.map((link) => (
//                     <Link
//                         key={link.href}
//                         href={link.href}
//                         className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
//                     >
//                         {link.label}
//                     </Link>
//                 ))}
//             </div>

//             {/* Right side */}
//             <div className="flex items-center space-x-2">
//                 {/* Mobile Hamburger */}
//                 <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//                 >
//                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>

//                 {/* User Avatar */}
//                 <div className="relative">
//                     <button
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                         className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition"
//                     >
//                         <div className="rounded-full bg-black text-white w-8 h-8 flex justify-center items-center">
//                             {userData?.name?.[0]?.toUpperCase() || "U"}
//                         </div>
//                     </button>

//                     {dropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
//                             <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                                 Profile
//                             </Link>
//                             <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
//                                 Settings
//                             </Link>
//                             <Link
//                                 href="/login"
//                                 onClick={() => logout()}
//                                 className="block px-4 py-2 text-red-500 hover:bg-gray-100"
//                             >
//                                 Logout
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Navigation */}
//             {isMenuOpen && (
//                 <div className="absolute right-0 top-14 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
//                     {navLinks.map((link) => (
//                         <Link
//                             key={link.href}
//                             href={link.href}
//                             onClick={() => setIsMenuOpen(false)}
//                             className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
//                         >
//                             {link.label}
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </nav>
//     );
// }


"use client";

import { logout } from "@/FBConfig/fbFunctions";
import { Menu, X, ChevronDown, User, Settings, LogOut, Home, Building2, Users, UserCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserInfo {
    name: string;
    uid: string;
    email: string;
    createdAt: string;
}

export default function Header({ userData }: { userData?: Partial<UserInfo> | null }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { label: "Dashboard", href: `/realstate/${userData?.uid}`, icon: Home },
        { label: "Properties", href: `/realstate/${userData?.uid}/properties`, icon: Building2 },
        { label: "Clients", href: `/realstate/${userData?.uid}/clients`, icon: Users },
        { label: "Owners", href: `/realstate/${userData?.uid}/owners`, icon: UserCircle },
        { label: "Events", href: `/realstate/${userData?.uid}/events`, icon: Calendar },
    ];

    const isActive = (href: string) => pathname === href;


    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <nav className="relative z-50 top-5 right-5 left-5 w-[96%] bg-white/70 backdrop-blur-lg shadow-lg px-6 py-3 flex flex-wrap justify-between items-center rounded-xl">
            {/* Logo */}
            <Link href={`/realstate/${userData?.uid}`} className="flex items-center">
                <span className="text-2xl  font-extrabold text-gray-900">Z</span>
                <span className="text-2xl  font-extrabold ">STATE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${isActive(link.href)
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-gray-100 transition-all"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                                {userData?.name?.[0]?.toUpperCase() || "U"}
                            </span>
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{userData?.name || "User"}</p>
                                <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                            </div>
                            <Link
                                href="/settings"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <Settings size={14} />
                                <span>Settings</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={14} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 bg-white rounded-2xl shadow-lg border border-gray-100 py-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 text-sm ${isActive
                                    ? 'text-purple-600 bg-purple-50'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}