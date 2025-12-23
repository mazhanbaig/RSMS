function Feature({ icon, title, desc }: any) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm text-center">
            <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-600">{desc}</p>
        </div>
    )
}