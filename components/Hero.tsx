'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Users, Shield, Zap, ArrowRight } from "lucide-react";
import Button from "./Button";
import StatCard from './StatCard'
import { getData } from "@/FBConfig/fbFunctions";

interface UserInfo {
    name?: string;
    email?: string;
    uid?: string;
}

export default function Hero({ userData }: { userData?: UserInfo }) {
    const router = useRouter();
    const [greeting, setGreeting] = useState("");
    const [ownerProperties, setOwnerProperties] = useState<any[]>([]);
    const [ownerClients, setOwnerClients] = useState<any[]>([]);
    const firstName = userData?.name?.split(" ")[0] || "There";

    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(
            hour < 12 ? "Good Morning" :
                hour < 18 ? "Good Afternoon" :
                    "Good Evening"
        );

        if (userData?.uid) {
            getData("properties/").then((res: any) => {
                const list = Object.values(res || {}).filter(
                    (p: any) => p.ownerUid === userData.uid
                );
                setOwnerProperties(list);
            });

            getData("clients/").then((res: any) => {
                const list = Object.values(res || {}).filter(
                    (c: any) => c.ownerUid === userData.uid
                );
                setOwnerClients(list);
            });
        }
    }, [userData?.uid]);

    return (
        <section className="relative w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-100">

            {/* Soft background glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl hidden sm:block" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl hidden sm:block" />

            <div className="relative max-w-6xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-6">

                {/* Greeting */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                    {greeting},{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {firstName}
                    </span>
                </h1>

                <p className="text-xs sm:text-base text-slate-600 max-w-xs sm:max-w-md">
                    Manage properties, clients, and deals from one secure and powerful platform.
                </p>

                {/* Stats */}
                {userData && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-5xl mt-4 sm:mt-6">
                        <StatCard
                            label="Properties"
                            value={ownerProperties.length}
                            icon={<Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
                        />
                        <StatCard
                            label="Clients"
                            value={ownerClients.length}
                            icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />}
                        />
                        <StatCard
                            label="Support"
                            value="24/7"
                            icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
                        />
                        <StatCard
                            label="Secure"
                            value="100%"
                            icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />}
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 w-full sm:w-auto">
                    <Button
                        label="Get Started With ZState"
                        onClick={() => router.push("/clients")}
                        icon={<ArrowRight className="ml-2" />}
                        className="w-full sm:w-auto"
                    />
                    <Button
                        label="About Us"
                        variant="theme2"
                        onClick={() => router.push("/about")}
                        className="w-full sm:w-auto"
                    />
                    <Button
                        label="Contact Us"
                        variant="theme2"
                        onClick={() => router.push("/contact")}
                        className="w-full sm:w-auto"
                    />
                </div>
            </div>
        </section>
    );
}
