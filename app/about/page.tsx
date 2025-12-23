'use client';

import Header from "@/components/Header";
import Button from "@/components/Button";

import {
    Building,
    Users,
    UserPlus,
    Home,
    Phone,
    MessageSquare,
    Eye,
    Shield,
    Database,
    FileText,
    Search,
    Target,
    Calendar,
    PhoneCall,
    UserCircle,
    Smartphone,
    Clock,
    BarChart,
    MapPin,
    Image as ImageIcon,
    Filter,
    CheckCircle,
    ArrowRight,
    Mail,
    Download
} from "lucide-react";
import AboutHero from "@/components/AboutHero";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* Hero Section */}
            <AboutHero />

            {/* Core System Overview */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Real Estate Management System</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                            A comprehensive platform where real estate owners manage both property sellers and buyers,
                            eliminating physical property visits and organizing all client information in one place.
                        </p>
                    </div>

                    {/* Main Workflow */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">1. Owner Account</h3>
                            <p className="text-sm text-gray-600">Real estate owner creates account</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">2. Add Clients</h3>
                            <p className="text-sm text-gray-600">Register buyers visiting your real estate</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">3. List Properties</h3>
                            <p className="text-sm text-gray-600">Add properties with images & details</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">4. Virtual Showings</h3>
                            <p className="text-sm text-gray-600">Show properties digitally to clients</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed System Flow */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How Zestate Transforms Real Estate Business</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                        <UserCircle className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Step 1: Owner Registration
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Owner Creates Account</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-blue-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <Shield className="w-5 h-5" /> Secure Dashboard
                                            </h4>
                                            <p className="text-gray-600">Personalized dashboard to manage your entire real estate business</p>
                                        </div>
                                        <div className="bg-blue-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <Database className="w-5 h-5" /> Centralized Database
                                            </h4>
                                            <p className="text-gray-600">All your property and client data organized in one secure location</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                                        <Users className="w-8 h-8 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Step 2: Client & Seller Management
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Manage Both Buyers and Property Sellers</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                                        <div className="bg-purple-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <UserPlus className="w-5 h-5" /> Add Clients
                                            </h4>
                                            <p className="text-gray-600">Register buyers who visit your real estate office with their preferences</p>
                                        </div>
                                        <div className="bg-purple-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <Building className="w-5 h-5" /> List Property Sellers
                                            </h4>
                                            <p className="text-gray-600">Add owners who want to sell properties through your agency</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2">🚀 Key Benefit:</h4>
                                        <p className="text-gray-600">
                                            No more saving contacts in phone memory! All client and seller information is stored in your
                                            Zestate account with instant access to contact details, communication history, and preferences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                                        <Home className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Step 3: Property Management
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Properties with Complete Details</h3>
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <div className="text-lg font-semibold text-green-700 mb-1 flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5" /> Property Images
                                            </div>
                                            <div className="text-sm text-gray-600">Upload multiple high-quality photos</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <div className="text-lg font-semibold text-green-700 mb-1 flex items-center gap-2">
                                                <FileText className="w-5 h-5" /> Detailed Information
                                            </div>
                                            <div className="text-sm text-gray-600">Complete property specifications & features</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <div className="text-lg font-semibold text-green-700 mb-1 flex items-center gap-2">
                                                <MapPin className="w-5 h-5" /> Location & Area
                                            </div>
                                            <div className="text-sm text-gray-600">Exact location with neighborhood details</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                                        <Eye className="w-8 h-8 text-orange-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Step 4: Virtual Property Showings
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Show Properties Digitally to Clients</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-orange-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <Search className="w-5 h-5" /> Smart Property Matching
                                            </h4>
                                            <p className="text-gray-600">Filter and show properties based on client preferences and budget</p>
                                        </div>
                                        <div className="bg-orange-50 p-5 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                <Smartphone className="w-5 h-5" /> Digital Presentations
                                            </h4>
                                            <p className="text-gray-600">Share property details, images, and virtual tours with clients</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                                        <h4 className="font-bold text-gray-900 mb-2">💰 Major Savings:</h4>
                                        <p className="text-gray-600">
                                            Eliminates the need for physical property visits! Save on petrol/diesel costs and time
                                            by showing multiple properties digitally from your office or remotely.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Communication & Contact Management */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Communication System</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            All your client and seller communications in one place
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <PhoneCall className="w-7 h-7 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Instant Contact Access</h3>
                                    <p className="text-gray-600">No more searching through phone contacts</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">One-click calling to clients & sellers</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Direct messaging within platform</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Email integration for formal communication</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Communication history tracking</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border border-purple-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                                    <Calendar className="w-7 h-7 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Complete Profile Management</h3>
                                    <p className="text-gray-600">Detailed profiles for everyone in your network</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Client preferences & requirements</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Seller property details & expectations</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Interaction history & notes</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Document storage & sharing</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Features Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon: Enhanced Features</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We're continuously improving to serve you better
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Appointment Scheduling</h3>
                            <p className="text-sm text-gray-600">Schedule property visits & meetings directly in platform</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                <BarChart className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Advanced Analytics</h3>
                            <p className="text-sm text-gray-600">Track performance, client conversion rates & market trends</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                <Filter className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">AI Property Matching</h3>
                            <p className="text-sm text-gray-600">Smart suggestions based on client behavior & preferences</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}



