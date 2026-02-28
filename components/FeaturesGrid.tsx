import { Users, Home, Eye, LineChart } from "lucide-react";

const features = [
    { title: "Client Management", description: "Complete CRM for all your buyers and sellers", icon: <Users className="w-6 h-6" />, stats: "Unlimited Clients" },
    { title: "Property Dashboard", description: "Manage all properties in one organized interface", icon: <Home className="w-6 h-6" />, stats: "Easy Management" },
    { title: "Virtual Tours", description: "Show properties digitally before physical visits", icon: <Eye className="w-6 h-6" />, stats: "Save 70% Fuel" },
    { title: "Analytics & Reports", description: "Track performance and make data-driven decisions", icon: <LineChart className="w-6 h-6" />, stats: "Smart Insights" }
];

export default function FeaturesGrid() {
    return (
        <>
            {/* Features Grid */}
            <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Everything You Need in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">One Platform</span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Complete tools for managing your real estate business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
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
                        ].map((feature, idx) => (
                            <div key={idx} className="group">
                                <div className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-3 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
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
        </>
    );
}