function Benefit({ icon, text }: any) {
    return (
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <div className="text-purple-600">{icon}</div>
            <p className="text-sm text-gray-700">{text}</p>
        </div>
    )
}