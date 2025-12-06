export default function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string | number;
    icon: React.JSX.Element;
}) {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 xs:p-3 flex items-center justify-between text-[9px] xs:text-xs sm:text-base font-medium shadow-sm">
            <div>
                <div className="text-sm xs:text-lg sm:text-xl font-bold">{value}</div>
                <div className="text-gray-600">{label}</div>
            </div>
            {icon}
        </div>
    );
}
