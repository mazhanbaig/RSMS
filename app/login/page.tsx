"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/FBConfig/fbFunctions";
import Link from "next/link";
import Button from "@/components/Button"; // Use the Button component we made earlier

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const route = useRouter();

    const handleLogin = async () => {
        const userInfo = { email, password, name };
        loginUser(userInfo)
            .then(() => {
                const cleanName = name.trim().toLowerCase().replace(/\s+/g, "-");
                route.push(`/realstate/${cleanName}`);
            })
            .catch((err) => console.log("Login Error:", err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Login to your Zestate portal</p>
                </div>

                <div className="space-y-5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLowerCase())}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        label="Login"
                        onClick={handleLogin}
                        classNameC='font-bold w-[385px] bg-black text-white'
                        className="w-full py-3 bg-linear-to-r from-gray-900 to-gray-700"
                    />
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-gray-900 font-semibold hover:opacity-70">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
