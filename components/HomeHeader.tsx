"use client";

import { Menu, X, User, LogIn, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomeHeader() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home", icon: <Home size={18} /> },
        { href: "/tutorial", label: "How to Use", icon: <BookOpen size={18} /> },
        { href: "/login", label: "Login", icon: <LogIn size={18} /> },
        { href: "/signup", label: "Sign Up", icon: <User size={18} /> },
    ];

    return (
        <nav className="relative z-50 top-5 left-5 w-[95%] max-w-6xl bg-white/80 backdrop-blur-lg shadow-lg px-6 py-3 flex justify-between items-center rounded-xl border border-gray-100">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold text-gray-900 uppercase hover:opacity-80 transition-opacity">
                Zstate
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700 transition-colors"
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>

            {/* Mobile & User Menu */}
            <div className="flex items-center space-x-2">
                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* User Dropdown for Desktop */}
                <div className="hidden md:block relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                        aria-label="User menu"
                    >
                        <User size={20} />
                        <span className="font-medium">Account</span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10 animate-in slide-in-from-top-2">
                            <div className="py-2">
                                {navLinks.slice(2).map((link) => ( // Show only Login and Sign Up in dropdown
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="absolute right-0 top-16 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10 animate-in slide-in-from-top-2 md:hidden">
                    <div className="py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                {link.icon}
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}