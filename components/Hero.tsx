// import { UserContext } from "@/app/context/UserContext";
import Button from "./Button";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
    name: string;
    uid: string;
    email: string;
    createdAt: string;
    [key: string]: any;
}

export default function Hero({ userData }: { userData?: UserInfo }) {
    let router = useRouter()
    return (
        <div className="flex items-center justify-center min-h-[100vh] bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="text-center max-w-4xl">
                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Welcome to{" "}
                    <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Zstate!
                    </span>
                </h1>

                {/* Personalized Greeting */}
                <div className="relative inline-block mb-8">
                    <p className="text-2xl md:text-3xl text-gray-700">
                        Hello,
                        <span className="font-semibold text-purple-600 relative">
                            {userData?.name.toUpperCase()}!
                        </span>
                    </p>
                </div>

                {/* Main Description */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                    We're thrilled to have you here. Your real estate management journey
                    starts now with powerful tools at your fingertips.
                </p>

                {/* Stats Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                        <div className="text-sm text-gray-600">Support</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                        <div className="text-sm text-gray-600">Secure</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-2xl font-bold text-green-600 mb-1">Easy</div>
                        <div className="text-sm text-gray-600">To Use</div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <Button
                        label="Get Started Today"
                        variant="theme"
                        size="lg"
                        onClick={() => {
                            router.push(`/clients`)
                        }}
                    />
                    <Button
                        label="About Us"
                        variant="theme2"
                        size="lg"
                        onClick={() => {
                            router.push(`/about`)
                        }}
                    />
                </div>

                {/* Floating Elements for visual interest */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-300 rounded-full opacity-50 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-30 animate-float-delayed"></div>
            </div>
        </div>
    );
}