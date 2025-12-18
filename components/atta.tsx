// Optional StatCard update for gradient backgrounds
function StatCard({ label, value, icon, gradient }) {
    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200/50`}>
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white shadow-xs">
                    {icon}
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-slate-800">{value}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{label}</p>
        </div>
    );
}