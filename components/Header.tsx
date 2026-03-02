

"use client";

import { logout } from "@/FBConfig/fbFunctions";
import {
    Menu, X, LayoutDashboard, Building2, Users, UserCircle,
    Calendar, LogOut, Settings, ChevronDown, Bell, Search
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface UserInfo {
    name: string;
    uid: string;
    email: string;
    createdAt: string;
}

export default function Header({ userData }: { userData?: Partial<UserInfo> | null }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { label: "Dashboard", href: `/realstate/${userData?.uid}`, icon: LayoutDashboard },
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
        <>
            <header
                className={`
    fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[97%]
    transition-all duration-500 ease-in-out
    ${isScrolled
                        ? "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/60"
                        : "bg-white/60 backdrop-blur-md border border-slate-200/40"
                    }
    rounded-2xl px-6 py-3
  `}
            >
                <nav className="flex items-center justify-between">     {/* Logo Section */}
                    <Link
                        href={`/realstate/${userData?.uid}`}
                        className="flex items-center gap-3"
                    >
                        <div className="leading-tight">
                            <p className="text-xl font-extrabold text-slate-900 tracking-tight">
                                ZSTATE
                            </p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                Real Estate System
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md rounded-2xl p-1 border border-slate-200/50 shadow-inner">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
          relative px-5 py-2 rounded-2xl flex items-center gap-2 
          text-sm font-medium transition-all duration-300
          ${active
                                            ? "text-slate-900 "
                                            : "text-slate-500 hover:text-slate-900"
                                        }
        `}
                                >
                                    {active && (
                                        <span className="absolute inset-0 bg-white rounded-2xl shadow-md border border-slate-200/70"></span>
                                    )}

                                    <Icon size={17} className="relative z-10 " />
                                    <span className="relative z-1">{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-all group"
                            >
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-sm">
                                        <span className="text-sm font-medium">
                                            {userData?.name?.[0]?.toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-xs font-medium text-slate-700">
                                        {userData?.name?.split(' ')[0] || "User"}
                                    </p>
                                    <p className="text-[10px] text-slate-400">Online</p>
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={`
                                        text-slate-400 transition-transform duration-200
                                        ${dropdownOpen ? 'rotate-180' : ''}
                                    `}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <p className="text-sm font-semibold text-slate-900">{userData?.name || "User Name"}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{userData?.email || "user@example.com"}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <UserCircle size={18} className="text-slate-400" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href={`/realstate/${userData?.uid}/settings`}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Settings size={18} className="text-slate-400" />
                                            <span>Settings</span>
                                        </Link>
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-slate-100 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`
                    md:hidden fixed inset-x-4 top-20 transition-all duration-300 transform
                    ${isMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-4 pointer-events-none'
                    }
                `}>
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                        {/* Mobile Search */}
                        <div className="p-3 border-b border-slate-100">
                            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none outline-none text-sm px-2 w-full placeholder-slate-400"
                                />
                            </div>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="py-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`
                                            flex items-center space-x-3 px-4 py-3 transition-colors
                                            ${active
                                                ? 'bg-slate-50 text-slate-900'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm font-medium">{link.label}</span>
                                        {active && (
                                            <span className="ml-auto w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-20"></div>
        </>
    );
}