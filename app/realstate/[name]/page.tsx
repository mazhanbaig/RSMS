'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { auth, getData } from "@/FBConfig/fbFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface UserInfo {
    uid: string;
    email: string;
    name: string;
    createdAt: string;
    [key: string]: any;
}

export default function RealStatePortal() {
    const { name } = useParams();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace('/login');
            } else {
                try {
                    const storedUser = localStorage.getItem('userInfo');
                    if (!storedUser) return;

                    const { uid } = JSON.parse(storedUser);

                    // Fetch full user data from your database
                    const userData = await getData(`users/${uid}`) as UserInfo;
                    setUserInfo(userData);
                } catch (err) {
                    console.log("Error fetching user info:", err);
                }
            }
        });

        return () => unsubscribe();
    }, []);
    
    if (!userInfo) {
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
            <Header userData={userInfo} />
            <Hero userData={userInfo} />
        </div>
    );
}
