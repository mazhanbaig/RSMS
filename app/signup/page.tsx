"use client";
import { useState } from "react";
import { addUser } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const route = useRouter();

  const handleSignup = async () => {
    let userInfo = { email, password, name };
    signUpUser(userInfo)
      .then((res:any) => {
        route.push(`/realstate/${name}`);
      })
      .catch((err:any) => console.log("Signup error:", err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Zestate</h1>
          <p className="text-gray-500 text-sm">Create your personal real estate portal</p>
        </div>

        {/* Inputs */}
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
           label="Create Account"
           onClick={handleSignup}
           classNameC="bg-black text-white w-[385px]"
           />
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-900 font-semibold hover:opacity-70">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
