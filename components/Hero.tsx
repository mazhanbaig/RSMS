'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Users, Shield, Zap, ArrowRight } from "lucide-react";
import Button from "./Button";
import { getData } from "@/FBConfig/fbFunctions";
import StatCard from "./StatCard";

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
        setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");

        if (userData?.uid) {
            // Fetch properties
            getData(`properties/`).then((res: any) => {
                const ownerProps = Object.values(res).filter(
                    (p: any) => p.ownerUid === userData.uid
                );
                setOwnerProperties(ownerProps);
            });

            // Fetch clients
            getData(`clients/`).then((res: any) => {
                const ownerClnts = Object.values(res).filter(
                    (c: any) => c.ownerUid === userData.uid
                );
                setOwnerClients(ownerClnts);
            });
        }
    }, [userData?.uid]);

    return (
        <section className="relative flex flex-col items-center justify-start mt-20 px-2 sm:px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden text-center">
            {/* Floating Blobs */}
            <div className="absolute top-5 left-5 w-16 sm:w-20 h-16 sm:h-20 bg-purple-300 rounded-full opacity-30 animate-float"></div>
            <div className="absolute bottom-5 right-5 w-20 sm:w-24 h-20 sm:h-24 bg-blue-300 rounded-full opacity-20 animate-float animation-delay-2000"></div>

            {/* Greeting */}
            <h1 className="text-xl xs:text-2xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight">
                {greeting}, <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">{firstName}!</span>
            </h1>
            <p className="text-[10px] xs:text-xs sm:text-lg text-gray-600 mb-6 max-w-[220px] xs:max-w-xs sm:max-w-md">
                Your real estate journey starts here. Manage properties and clients easily.
            </p>

            {/* Stats */}
            {userData && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 mb-6 w-full max-w-[220px] xs:max-w-xs sm:max-w-3xl">
                    <StatCard label="Properties" value={ownerProperties.length} icon={<Home className="w-5 h-5 text-purple-500" />} />
                    <StatCard label="Clients" value={ownerClients.length} icon={<Users className="w-5 h-5 text-blue-500" />} />
                    <StatCard label="Support" value="24/7" icon={<Shield className="w-5 h-5 text-green-500" />} />
                    <StatCard label="Secure" value="100%" icon={<Zap className="w-5 h-5 text-orange-500" />} />
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-6 w-full max-w-[220px] xs:max-w-xs sm:max-w-full">
                <Button label="Get Started With ZState" size="md" onClick={() => router.push("/clients")} icon={<ArrowRight className="ml-2" />} />
                <Button label="About Us" size="md" variant="theme2" onClick={() => router.push("/about")} />
                <Button label="Contact Us" size="md" variant="theme2" onClick={() => router.push("/contact")} />
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </section>
    );
}
