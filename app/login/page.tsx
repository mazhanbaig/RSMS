"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/FBConfig/fbFunctions";
import Link from "next/link";
import Button from "@/components/Button";
import { Building, ArrowRight, CheckCircle } from "lucide-react";
import { message } from "antd";
import Image from "next/image";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const res: any = await signInWithGoogle();
            localStorage.setItem('userInfo', JSON.stringify({
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName
            }))

            // You might want to get the name from Google profile instead of user input
            const userName = res.user.displayName || "user";
            const cleanName = userName.trim().toLowerCase().replace(/\s+/g, "-");
            router.replace(`/realstate/${cleanName}`);
            message.success('Login Successful')
        } catch (err: any) {
            console.log("Login Error:", err.message);
            message.error('Error While Login')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header Section */}
                <div className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-10">
                    <Building className="w-16 h-16 mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Zestate</h1>
                    <p className="text-gray-300 text-center">Manage properties, clients, and owners with ease</p>
                </div>

                {/* Form Panel */}
                <div className="w-full p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Login to your Zestate portal</p>
                    </div>

                    {/* Benefits List */}
                    <div className="mb-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Quick one-click login</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">Enhanced security</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">No password to remember</span>
                        </div>
                    </div>

                    <Button
                        label={isLoading ? "Logging in..." : "Login with Google"}
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        variant="theme2"
                        classNameC="w-full h-13"
                        icon={
                            !isLoading && (
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                            )
                        }
                    />


                    {/* Signup Link */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-gray-900 font-semibold hover:text-gray-700 transition inline-flex items-center gap-1"
                            >
                                Sign Up here <ArrowRight className="w-4 h-4" />
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-center text-gray-400 text-xs mt-6">
                        By logging in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}