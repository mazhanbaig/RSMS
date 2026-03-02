"use client";

import { Menu, X, Home, BookOpen, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomeHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/tutorial", label: "How to Use", icon: BookOpen },
        { href: "/login", label: "Login", icon: LogIn },
        { href: "/signup", label: "Sign Up", icon: User },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <header className={`
                fixed top-6 left-1/2 -translate-x-1/2 z-50
                w-[95%] max-w-6xl
                transition-all duration-500 ease-in-out
                ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/60"
                    : "bg-white/60 backdrop-blur-md border border-slate-200/40"
                }
                rounded-2xl px-6 py-3
            `}>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="leading-tight">
                        <p className="text-xl font-extrabold text-slate-900 tracking-tight">
                            ZSTATE
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Real Estate System
                        </p>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md rounded-2xl p-1 border border-slate-200/50 shadow-inner">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        relative px-5 py-2 rounded-2xl flex items-center gap-2 
                                        text-sm font-medium transition-all duration-300
                                        ${active
                                            ? "text-slate-900"
                                            : "text-slate-500 hover:text-slate-900"
                                        }
                                    `}
                                >
                                    {active && (
                                        <span className="absolute inset-0 bg-white rounded-2xl shadow-md border border-slate-200/70"></span>
                                    )}
                                    <Icon size={17} className="relative z-10" />
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                        {isMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
                    </button>
                </nav>

                {isMenuOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                            <p className="text-sm font-medium text-slate-900">Welcome to ZSTATE</p>
                            <p className="text-xs text-slate-500 mt-0.5">Real Estate Management System</p>
                        </div>

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
                                            flex items-center space-x-3 px-4 py-3.5 transition-all
                                            ${active
                                                ? 'bg-slate-50 text-slate-900 border-l-2 border-slate-900'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm font-medium">{link.label}</span>
                                        {link.label === "Sign Up" && (
                                            <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                                Free
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            {/* Spacer */}
            <div className="h-20"></div>
        </>
    );
}