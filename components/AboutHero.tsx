'use client'

import { Database, Eye, Home, UserPlus } from "lucide-react"

export default function AboutHero() {
    return <>
        <section className="pt-20 pb-5 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Revolutionizing <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Estate</span> Management
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A comprehensive platform that connects property owners, agents, and buyers in one seamless ecosystem.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                        <Home className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">Easy</div>
                        <div className="text-gray-600">Property Management</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                        <UserPlus className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">Smart</div>
                        <div className="text-gray-600">Client & Owner Onboarding</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                        <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">Virtual</div>
                        <div className="text-gray-600">Property Viewing</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                        <Database className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">Complete</div>
                        <div className="text-gray-600">CRM Integration</div>
                    </div>
                </div>
            </div>
        </section>
    </>
}