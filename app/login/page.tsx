"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/FBConfig/fbFunctions";
import Link from "next/link";
import Button from "@/components/Button";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Building,
    ArrowRight
} from "lucide-react";
import { message } from "antd";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRouter();

    const handleLogin = async () => {
        setIsLoading(true);
        const userInfo = { email, password, name };
        try {
            await loginUser(userInfo);
            const cleanName = name.trim().toLowerCase().replace(/\s+/g, "-");
            route.push(`/realstate/${cleanName}`);
            message.success('Login Successfull')
        } catch (err: any) {
            console.log("Login Error:", err.message);
            message.error('Error While Login')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Visual Panel */}
                <div className="hidden sm:flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white md:w-1/2 p-10 relative overflow-hidden">
                    <Building className="w-16 h-16 mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Zestate</h1>
                    <p className="text-gray-300 text-center">Manage properties, clients, and owners with ease</p>

                    {/* Decorative Circles */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-600 opacity-20"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500 opacity-20"></div>
                </div>

                {/* Form Panel */}
                <div className="w-full md:w-1/2 p-10">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Login to your Zestate portal</p>
                    </div>

                    <div className="space-y-5">
                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                                value={name}
                                onChange={(e) => setName(e.target.value.toLowerCase())}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <Button
                            label={isLoading ? "Logging in..." : "Login"}
                            onClick={handleLogin}
                            disabled={isLoading}
                            classNameC="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        />
                    </div>

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
