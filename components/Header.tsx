"use client";

import { logout } from "@/FBConfig/fbFunctions";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserInfo {
    name: string;
    uid: string;
    email: string;
    createdAt: string;
    // [key: string]: any;
}

export default function Header({ userData }: { userData?: Partial<UserInfo> | null }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const navLinks = [
        { label: "Dashboard", href: `/realstate/${userData?.uid}` },
        { label: "Properties", href: `/realstate/${userData?.uid}/properties` },
        { label: "Clients", href: `/realstate/${userData?.uid}/clients` },
        { label: "Owners", href: `/realstate/${userData?.uid}/owners` },
        { label: "Events", href: `/realstate/${userData?.uid}/events` },
    ];

    return (
        <nav className="relative z-50 top-5 right-5 left-5 w-[96%] bg-white/70 backdrop-blur-lg shadow-lg px-6 py-3 flex flex-wrap justify-between items-center rounded-xl">
            {/* Logo */}
            <div className="text-2xl font-extrabold text-gray-900 uppercase">
                ZState
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2">
                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* User Avatar */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition"
                    >
                        <div className="rounded-full bg-black text-white w-8 h-8 flex justify-center items-center">
                            {userData?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                Profile
                            </Link>
                            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                                Settings
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => logout()}
                                className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute right-0 top-14 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
