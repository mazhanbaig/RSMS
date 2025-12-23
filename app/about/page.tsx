'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import {
    Building,
    Users,
    UserPlus,
    Home,
    Eye,
    Shield,
    Database,
    FileText,
    Search,
    Calendar,
    PhoneCall,
    Smartphone,
    Clock,
    MapPin,
    ImageIcon,
    CheckCircle,
    ArrowRight,
    Target,
    BarChart3,
    Zap,
    Phone,
    Mail,
    Video,
    DollarSign,
    TrendingUp,
    Lock,
    FolderOpen,
    Filter,
    MessageSquare,
    CalendarDays,
    ClipboardCheck,
    UsersRound,
    ChevronRight,
    Globe,
    Zap as Lightning,
    ShieldCheck,
    Trophy,
    Sparkles,
    LineChart,
    BadgeCheck,
    CreditCard
} from "lucide-react";

export default function AboutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const workflowSteps = [
        {
            number: "01",
            title: "Owner Registration",
            description: "Real estate owner creates a secure account",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "from-purple-500 to-blue-500",
            details: [
                "Create professional profile",
                "Set up agency dashboard",
                "Invite team members",
                "Configure preferences"
            ]
        },
        {
            number: "02",
            title: "Add Clients & Sellers",
            description: "Register every buyer and property seller",
            icon: <UsersRound className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
            details: [
                "Capture complete client information",
                "Store property seller details",
                "Record preferences & requirements",
                "Track communication history"
            ]
        },
        {
            number: "03",
            title: "Property Management",
            description: "List properties with full details & photos",
            icon: <Building className="w-6 h-6" />,
            color: "from-cyan-500 to-green-500",
            details: [
                "Upload high-quality property photos",
                "Add detailed specifications",
                "Set pricing & terms",
                "Enable virtual tours"
            ]
        },
        {
            number: "04",
            title: "Virtual Showings",
            description: "Show properties digitally to interested clients",
            icon: <Video className="w-6 h-6" />,
            color: "from-green-500 to-emerald-500",
            details: [
                "Filter properties by client preferences",
                "Share property presentations",
                "Schedule virtual tours",
                "Collect client feedback"
            ]
        },
        {
            number: "05",
            title: "Deal Management",
            description: "Complete transactions efficiently",
            icon: <Trophy className="w-6 h-6" />,
            color: "from-emerald-500 to-orange-500",
            details: [
                "Track negotiations",
                "Manage documentation",
                "Process payments",
                "Generate certificates"
            ]
        }
    ];

    const problemsSolutions = [
        {
            problem: "Lost Client Contacts",
            solution: "Centralized Client Database",
            icon: <Database className="w-5 h-5" />,
            stat: "100%"
        },
        {
            problem: "Fuel & Time Waste",
            solution: "Virtual Property Showings",
            icon: <Video className="w-5 h-5" />,
            stat: "70%"
        },
        {
            problem: "Poor Organization",
            solution: "Structured Workflow",
            icon: <ClipboardCheck className="w-5 h-5" />,
            stat: "3x"
        },
        {
            problem: "Manual Tracking",
            solution: "Automated CRM",
            icon: <BarChart3 className="w-5 h-5" />,
            stat: "24/7"
        }
    ];

    const testimonials = [
        {
            name: "Ahmad Raza",
            role: "Real Estate Agency Owner",
            location: "Lahore",
            content: "Saved over Rs. 15,000 monthly on fuel. Now I show properties from my office and only visit when client is serious.",
            stats: "80% more efficient"
        },
        {
            name: "Sana Khan",
            role: "Property Dealer",
            location: "Karachi",
            content: "All my 200+ client contacts are now organized. No more searching through WhatsApp chats and phone memory.",
            stats: "200+ clients"
        },
        {
            name: "Imran Sheikh",
            role: "Real Estate Investor",
            location: "Islamabad",
            content: "My agents show 4x more properties daily using virtual tours. Client satisfaction increased dramatically.",
            stats: "4x more showings"
        }
    ];

    const features = [
        {
            title: "Client Management",
            description: "Complete CRM for all your buyers and sellers",
            icon: <Users className="w-6 h-6" />,
            stats: "Unlimited Clients"
        },
        {
            title: "Property Dashboard",
            description: "Manage all properties in one organized interface",
            icon: <Home className="w-6 h-6" />,
            stats: "Easy Management"
        },
        {
            title: "Virtual Tours",
            description: "Show properties digitally before physical visits",
            icon: <Eye className="w-6 h-6" />,
            stats: "Save 70% Fuel"
        },
        {
            title: "Analytics & Reports",
            description: "Track performance and make data-driven decisions",
            icon: <LineChart className="w-6 h-6" />,
            stats: "Smart Insights"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
            <Header />

            {/* Hero Section - Matching your theme */}
            <section className="relative pt-15 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl hidden sm:block" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl hidden sm:block" />
                <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-100/20 to-blue-100/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700">Trusted by Real Estate Professionals</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            The Professional <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Estate</span><br />
                            Management Platform
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Built specifically for real estate agents and property dealers to manage clients, properties,
                            and deals efficiently from one unified platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Button
                                label="Start Free Trial"
                                size="lg"
                                onClick={() => window.location.href = "/clients"}
                                icon={<ArrowRight className="ml-2 w-5 h-5" />}
                                classNameC="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            />
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow border border-slate-100">
                                <UsersRound className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 mb-1">Organized</div>
                                <div className="text-slate-600">Client Management</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow border border-slate-100">
                                <Building className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 mb-1">Complete</div>
                                <div className="text-slate-600">Property Dashboard</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow border border-slate-100">
                                <Video className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 mb-1">Virtual</div>
                                <div className="text-slate-600">Property Showings</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow border border-slate-100">
                                <Database className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 mb-1">Smart</div>
                                <div className="text-slate-600">CRM Integration</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problems & Solutions */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Solving Real <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Problems</span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            The actual challenges real estate professionals face daily
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {problemsSolutions.map((item, idx) => (
                            <div key={idx} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                <div className="relative bg-gradient-to-b from-white to-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-purple-100 to-blue-100' :
                                            idx === 1 ? 'from-blue-100 to-cyan-100' :
                                                idx === 2 ? 'from-cyan-100 to-green-100' : 'from-green-100 to-emerald-100'}`}>
                                            {item.icon}
                                        </div>
                                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            {item.stat}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">{item.problem}</h3>
                                    <p className="text-sm text-slate-600 mb-3">→ {item.solution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Steps */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            How <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ZState</span> Works
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Simple, efficient workflow for managing your real estate business
                        </p>
                    </div>

                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-blue-200 to-emerald-200 hidden md:block" />

                        <div className="space-y-8">
                            {workflowSteps.map((step, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3">
                                            <div className="flex items-center gap-4">
                                                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-2xl`}>
                                                    {step.number}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                                    <p className="text-slate-600">{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3">
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color} bg-opacity-10`}>
                                                        {step.icon}
                                                    </div>
                                                    <h4 className="font-bold text-slate-900">Key Features</h4>
                                                </div>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {step.details.map((detail, detailIdx) => (
                                                        <li key={detailIdx} className="flex items-center gap-2 text-slate-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Everything You Need in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">One Platform</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group">
                                <div className="relative bg-gradient-to-b from-white to-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-purple-100 to-blue-100' :
                                                idx === 1 ? 'from-blue-100 to-cyan-100' :
                                                    idx === 2 ? 'from-cyan-100 to-green-100' : 'from-green-100 to-emerald-100'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            {feature.stats}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Trusted by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Estate</span> Professionals
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="group">
                                <div className="relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all h-full">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{testimonial.name}</div>
                                            <div className="text-sm text-slate-600">{testimonial.role}, {testimonial.location}</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 mb-4 italic">"{testimonial.content}"</p>
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            {testimonial.stats}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}