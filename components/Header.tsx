"use client";

import { logout } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { auth } from '@/FBConfig/fbFunctions'
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import { UserContext } from "@/app/context/UserContext";

export default function Header({ name = 'User' }: { name?: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    let userInfo=useContext(UserContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });
    }, []);

    return (
        <nav className="relative top-5 right-5 left-5 w-[96%] bg-white/70 backdrop-blur-lg shadow-lg px-6 py-3 flex justify-between items-center rounded-2xl">

            {/* Logo & Navigation */}
            <div className="flex items-center gap-6">
                <div className="text-2xl font-extrabold text-gray-900 uppercase">
                    Zestate
                </div>

                {/* Main Navigation Links */}
                <div className="flex items-center space-x-4">
                    <Link href={`/realstate/${name}`} className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
                        Dashboard
                    </Link>
                    <Link href="/properties" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
                        Properties
                    </Link>
                    <Link href={'/clients'} className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"> 
                        Clients
                    </Link>
                    <Link href="/transactions" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
                        Transactions
                    </Link>
                </div>
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition"
                >
                    <div className="rounded-full bg-black text-white w-8 h-8 flex justify-center items-center">
                        {userInfo?.name?.slice(0, 1).toUpperCase() || name[0].toUpperCase()}
                    </div>
                    <span>
                        {userInfo?.name?.toUpperCase() || name.toUpperCase()}
                    </span>

                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                        <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                            Profile
                        </Link>
                        <Link href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                            Settings
                        </Link>
                        <div className="border-t border-gray-200">
                            <Link href={`/login`} onClick={() => logout()} className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100">
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
