'use client';

import Header from "@/components/Header";
import Button from "@/components/Button";

import {
    Building,
    Users,
    Shield,
    Target,
    TrendingUp,
    Award,
    Globe,
    Heart,
    CheckCircle,
    ArrowRight,
    Home,
    UserPlus,
    FileText,
    Search,
    MessageSquare,
    Eye,
    Database,
    BarChart,
    Smartphone
} from "lucide-react";
import AboutHero from "@/components/AboutHero";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* Hero Section - Focus on System Capabilities */}
            <AboutHero/>

            {/* How It Works - System Flow */}
            <section className="py-2 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How Zestate Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A streamlined workflow for property owners and buyers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl h-full">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <Building className="w-7 h-7 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Property Owners Onboard</h3>
                                <p className="text-gray-600 mb-4">
                                    Property owners easily register their properties with detailed information, photos, and specifications.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Simple property listing</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Multiple property management</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Real-time updates</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl h-full">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Clients Discover Properties</h3>
                                <p className="text-gray-600 mb-4">
                                    Prospective buyers browse properties, filter by preferences, and get detailed information without physical visits.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Advanced search filters</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Virtual property tours</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Property comparison tools</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-3xl h-full">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <MessageSquare className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Seamless Connections</h3>
                                <p className="text-gray-600 mb-4">
                                    Owners communicate with interested clients, share property details, and close deals efficiently.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Direct messaging system</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Document sharing</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Deal tracking</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Detailed */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage your real estate business efficiently
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Property Management */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Home className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Intuitive Property Management</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Add and manage multiple properties with ease. Track listings, update status, and organize property details all in one place.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-purple-700 mb-1">Quick Add</div>
                                    <div className="text-sm text-gray-600">Add properties in minutes</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-blue-700 mb-1">Bulk Upload</div>
                                    <div className="text-sm text-gray-600">Upload multiple properties</div>
                                </div>
                            </div>
                        </div>

                        {/* Client & Owner Management */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Smart Relationship Management</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Manage property owners and clients efficiently. Track interactions, preferences, and communication history.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-blue-700 mb-1">Client Profiles</div>
                                    <div className="text-sm text-gray-600">Detailed client information</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-green-700 mb-1">Owner Dashboard</div>
                                    <div className="text-sm text-gray-600">Owner-specific views</div>
                                </div>
                            </div>
                        </div>

                        {/* Property Visualization */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Virtual Property Presentation</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Show properties to clients without physical visits. High-quality images, virtual tours, and detailed specifications.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-green-700 mb-1">360° Views</div>
                                    <div className="text-sm text-gray-600">Immersive property tours</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-orange-700 mb-1">Smart Matching</div>
                                    <div className="text-sm text-gray-600">Client-property matching</div>
                                </div>
                            </div>
                        </div>

                        {/* Analytics & Reporting */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <BarChart className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Analytics & Insights</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Track performance, analyze client behavior, and make data-driven decisions with comprehensive analytics.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-orange-700 mb-1">Performance Metrics</div>
                                    <div className="text-sm text-gray-600">Track key indicators</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl">
                                    <div className="text-lg font-semibold text-purple-700 mb-1">Client Insights</div>
                                    <div className="text-sm text-gray-600">Understand preferences</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits for Every Stakeholder</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            How each participant in the ecosystem benefits
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* For Property Owners */}
                        <div className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-3xl border border-purple-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Building className="w-8 h-8 text-purple-600" />
                                <h3 className="text-xl font-bold text-gray-900">For Property Owners</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Easy property listing and management</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Reach more qualified buyers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Reduce time wasted on unsuitable clients</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Track property performance and interest</span>
                                </li>
                            </ul>
                        </div>

                        {/* For Real Estate Agents */}
                        <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-3xl border border-blue-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Award className="w-8 h-8 text-blue-600" />
                                <h3 className="text-xl font-bold text-gray-900">For Real Estate Agents</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Streamlined client management</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Efficient property matching</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Automated communication tracking</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Performance analytics and reporting</span>
                                </li>
                            </ul>
                        </div>

                        {/* For Property Buyers */}
                        <div className="bg-gradient-to-b from-green-50 to-white p-8 rounded-3xl border border-green-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Search className="w-8 h-8 text-green-600" />
                                <h3 className="text-xl font-bold text-gray-900">For Property Buyers</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Find properties matching exact needs</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Virtual property tours without travel</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Direct communication with owners/agents</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-gray-600">Comprehensive property information</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}