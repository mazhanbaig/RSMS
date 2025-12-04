"use client";
import { useState } from "react";
import { signUpUser } from "@/FBConfig/fbFunctions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { message } from "antd";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const route = useRouter();

  const handleSignup = async () => {
    setIsLoading(true);
    let userInfo = { email, password, name };

    try {
      const res:any = await signUpUser(userInfo);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: res.user.uid,
          email: res.user.email,
        })
      );
      message.success('Account Created Successfully')
      route.push(`/realstate/${name}`);
    } catch (err: any) {
      console.log("Signup error:", err.message);
      message.error('Error While Signup')

    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordStrength = (pass: string) => {
    if (pass.length === 0) {
      setPasswordStrength("");
      return;
    }
    if (pass.length < 6) {
      setPasswordStrength("Weak");
    } else if (pass.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500">Join thousands of real estate professionals</p>
          </div>

          <div className="space-y-5">
            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {passwordStrength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className={`text-sm font-medium ${passwordStrength === "Weak" ? "text-red-500" :
                    passwordStrength === "Medium" ? "text-yellow-500" :
                      "text-green-500"
                    }`}>
                    {passwordStrength} password
                  </div>
                  {passwordStrength === "Strong" && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              )}
            </div>

            {/* Signup Button */}
            <Button
              label={isLoading ? "Creating Account..." : "Create Account"}
              onClick={handleSignup}
              disabled={isLoading}
              classNameC="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            />
          </div>

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
