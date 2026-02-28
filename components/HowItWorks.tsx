import { ShieldCheck, UsersRound, Building, Trophy } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Sign Up & Create Account",
        description: "Register as a real estate professional",
        icon: <ShieldCheck className="w-6 h-6" />,
        color: "from-purple-500 to-blue-500",
        details: ["Create professional profile", "Set up your dashboard", "Configure preferences", "Get instant access"]
    },
    {
        number: "02",
        title: "Add Clients & Properties",
        description: "Register your clients and list properties",
        icon: <UsersRound className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500",
        details: ["Capture client information", "List property details", "Add photos & specifications", "Set pricing & terms"]
    },
    {
        number: "03",
        title: "Manage & Show Properties",
        description: "Organize and showcase properties efficiently",
        icon: <Building className="w-6 h-6" />,
        color: "from-cyan-500 to-green-500",
        details: ["Virtual property tours", "Schedule showings", "Track client interests", "Manage communications"]
    },
    {
        number: "04",
        title: "Close Deals & Grow",
        description: "Complete transactions and grow your business",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500",
        details: ["Track negotiations", "Manage documentation", "Process payments", "Generate reports"]
    }
];

export default function HowItWorks() {
    return (
        <>
            {/* How It Works */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            How <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ZState</span> Works
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Simple, efficient workflow for managing your real estate business
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                number: "01",
                                title: "Sign Up & Create Account",
                                description: "Register as a real estate professional",
                                icon: <ShieldCheck className="w-6 h-6" />,
                                color: "from-purple-500 to-blue-500",
                                details: [
                                    "Create professional profile",
                                    "Set up your dashboard",
                                    "Configure preferences",
                                    "Get instant access"
                                ]
                            },
                            {
                                number: "02",
                                title: "Add Clients & Properties",
                                description: "Register your clients and list properties",
                                icon: <UsersRound className="w-6 h-6" />,
                                color: "from-blue-500 to-cyan-500",
                                details: [
                                    "Capture client information",
                                    "List property details",
                                    "Add photos & specifications",
                                    "Set pricing & terms"
                                ]
                            },
                            {
                                number: "03",
                                title: "Manage & Show Properties",
                                description: "Organize and showcase properties efficiently",
                                icon: <Building className="w-6 h-6" />,
                                color: "from-cyan-500 to-green-500",
                                details: [
                                    "Virtual property tours",
                                    "Schedule showings",
                                    "Track client interests",
                                    "Manage communications"
                                ]
                            },
                            {
                                number: "04",
                                title: "Close Deals & Grow",
                                description: "Complete transactions and grow your business",
                                icon: <Trophy className="w-6 h-6" />,
                                color: "from-green-500 to-emerald-500",
                                details: [
                                    "Track negotiations",
                                    "Manage documentation",
                                    "Process payments",
                                    "Generate reports"
                                ]
                            }
                        ].map((step, idx) => (
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
                                                <h4 className="font-bold text-slate-900">What You Get</h4>
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
            </section>

        </>
    );
}