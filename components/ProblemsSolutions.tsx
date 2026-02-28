import { Database, Video, ClipboardCheck, BarChart3 } from "lucide-react";

const problems = [
    { problem: "Lost Client Contacts", solution: "Centralized Client Database", icon: <Database className="w-5 h-5" /> },
    { problem: "Fuel & Time Waste", solution: "Virtual Property Showings", icon: <Video className="w-5 h-5" /> },
    { problem: "Poor Organization", solution: "Structured Workflow", icon: <ClipboardCheck className="w-5 h-5" /> },
    { problem: "Manual Tracking", solution: "Automated CRM", icon: <BarChart3 className="w-5 h-5" /> }
];

export default function ProblemsSolutions() {
    return (
        <>
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
                        {[
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
                        ].map((item, idx) => (
                            <div key={idx} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                <div className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-3 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all">
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
        </>
    );
}