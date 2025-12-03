"use client";

import { logout } from "@/FBConfig/fbFunctions";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { auth } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";

export default function Header({ name = "User" }: { name?: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const userInfo = useContext(UserContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) router.push("/login");
        });
    }, []);

    const navLinks = [
        { label: "Dashboard", href: `/realstate/${name}` },
        { label: "Properties", href: "/properties" },
        { label: "Clients", href: "/clients" },
        { label: "Owners", href: "/owners" },
    ];

    return (
        <nav className="relative top-5 right-5 left-5 w-[96%] bg-white/70 backdrop-blur-lg shadow-lg px-6 py-3 flex flex-wrap justify-between items-center rounded-2xl">

            {/* Logo */}
            <div className="text-2xl font-extrabold text-gray-900 uppercase">
                Zestate
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

            {/* Right side - mobile: hamburger + avatar, desktop: avatar */}
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
                            {userInfo?.name?.slice(0, 1).toUpperCase() || name[0].toUpperCase()}
                        </div>
                        <span className="hidden sm:inline">
                            {userInfo?.name?.toUpperCase() || name.toUpperCase()}
                        </span>
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
                                href={`/login`}
                                onClick={() => logout()}
                                className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Links */}
            {isMenuOpen && (
                <div className="absolute right-20 top-15 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
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
