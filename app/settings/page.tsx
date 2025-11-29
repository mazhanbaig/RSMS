'use client'

import Header from "@/components/Header"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                {/* Page Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account, security, and preferences</p>
                </div>

                {/* Profile Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                            defaultValue="John"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                            defaultValue="Doe"
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                        defaultValue="john.doe@example.com"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                        defaultValue="+1 (555) 123-4567"
                    />
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Account Security</h2>
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                    />
                    <button className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition">
                        Update Password
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
                    <p className="text-gray-600">Deleting your account is permanent and cannot be undone.</p>
                    <button className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition">
                        Delete Account
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition">
                        Cancel
                    </button>
                    <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
