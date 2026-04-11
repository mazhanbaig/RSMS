'use client';

export default function StatsCard({ stat }:any) {
    return (
        <div className="relative group">
            <div className="relative bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                <div className="absolute -top-3 left-4">
                    <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-lg">
                        {stat.icon}
                    </div>
                </div>
                <div className="-mt-1">
                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</h3>
                        <p className="text-gray-600 text-xs mb-2">{stat.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}