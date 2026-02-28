"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { message } from "antd";
import { loginWithGoogle } from "@/FBConfig/fbFunctions";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    setLoading(true);

    try {
      const res: any = await loginWithGoogle();
      console.log(res);

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL

        })
      );
      message.success('Account Created Successfully');
      router.replace(`/realstate/${res.user.uid}`)
    } catch (err: any) {
      message.error('Error While Signup');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4">
      <div className="relative w-full max-w-3xl">
        {/* Compact Horizontal container */}
        <div className="flex flex-col lg:flex-row bg-white/95 backdrop-blur-sm rounded-xl sm:border border-gray-200 sm:shadow-lg overflow-hidden">

          {/* Left side - Compact Branding */}
          <div className="lg:w-1/2 p-8 sm:bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center">
            <div className="mb-6">
              <div className="relative inline-block mb-4">
                <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  ZState
                </h1>

                <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400/20 rounded"></div>
                <div className="absolute -bottom-0.5 -right-2 w-2 h-2 bg-blue-400/20 rounded"></div>
              </div>

              <p className="text-gray-700 font-medium mb-1 text-sm">
                Intelligent real estate management
              </p>
              <p className="text-gray-500 text-xs">
                Start your property management journey with ZState
              </p>
            </div>

            {/* Compact Features */}
            <div className="hidden sm:block space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800">Secure & Encrypted</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-cyan-100 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800">Real-time Sync</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-800">Fast Setup</p>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="hidden sm:grid grid-cols-3 gap-3">
              <div className="bg-white/50 rounded p-2 text-center">
                <div className="text-lg font-bold text-blue-600">Free</div>
                <div className="text-xs text-gray-500">Forever Plan</div>
              </div>
              <div className="bg-white/50 rounded p-2 text-center">
                <div className="text-lg font-bold text-cyan-600">5K+</div>
                <div className="text-xs text-gray-500">New Users</div>
              </div>
              <div className="bg-white/50 rounded p-2 text-center">
                <div className="text-lg font-bold text-indigo-600">14-day</div>
                <div className="text-xs text-gray-500">Trial</div>
              </div>
            </div>
          </div>

          {/* Right side - Compact Signup form */}
          <div className="lg:w-1/2 px-8 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Your Account</h2>
              <p className="text-gray-500 text-sm">Sign up to start managing properties efficiently</p>
            </div>

            {/* Google Signup Button */}
            <div className="mb-4">
              <button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 
                         bg-white border border-gray-200 rounded-lg 
                         hover:border-blue-300 hover:shadow-sm 
                         active:scale-[0.98] transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-medium text-gray-800 text-sm">
                  {loading ? 'Creating account...' : 'Sign up with Google'}
                </span>
              </button>
            </div>

            {/* Compact Links Section */}
            <div className="flex justify-between text-xs mb-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 hover:underline transition-colors px-2 py-1 rounded hover:bg-blue-50"
              >
                Need help?
              </Link>
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors px-2 py-1 rounded hover:bg-blue-50"
              >
                Already have an account? →
              </Link>
            </div>

            {/* Compact Social proof */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">Join 5,000+ new users this month</p>
                </div>
              </div>
            </div>

            {/* Compact Benefits */}
            <div className="hidden sm:block mb-4 px-3 py-2 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-blue-700">Get started in 60 seconds</span>
              </div>
            </div>

            {/* Compact Footer */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400 text-center">
                By signing up, you agree to our{' '}
                <Link href="#" className="text-blue-500 hover:text-blue-600 hover:underline">Terms</Link>
                {' '}&{' '}
                <Link href="#" className="text-blue-500 hover:text-blue-600 hover:underline">Privacy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}