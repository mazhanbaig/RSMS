"use client";
import { useState } from "react";
import { signInWithGoogle } from "@/FBConfig/fbFunctions"; // You'll need to create this function
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { Building, CheckCircle, ArrowRight } from "lucide-react";
import { message } from "antd";
import Image from "next/image";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    setIsLoading(true);

    try {
      const res: any = await signInWithGoogle();
      console.log(res);

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName,
        })
      );
      message.success('Account Created Successfully');
      router.push(`/realstate/${res.name}`);
    } catch (err: any) {
      console.log("Google signup error:", err.message);
      message.error('Error While Signup');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Zestate</h2>
            <p className="text-gray-500">Sign up with Google to get started</p>
          </div>

          {/* Benefits List */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">No password to remember</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">One-click sign in</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Enhanced security</span>
            </div>
          </div>

          {/* Google Signup Button */}
          <Button
            label={isLoading ? "Signing up..." : "Sign up with Google"}
            onClick={handleGoogleSignup}
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
          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gray-900 font-semibold hover:text-gray-700 transition inline-flex items-center gap-1"
              >
                Login here <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-gray-400 text-xs mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}