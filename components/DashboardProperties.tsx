'use client';

import Button from "@/components/Button";
import PropertyCard from "@/components/PropertyCard";

export default function RecentProperties({ properties, userUid, onViewAll, onNavigate }:any) {
    const recentProperties = properties.slice(-2).reverse();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Recent Properties
                </h2>
                <Button
                    label="View All"
                    variant="theme2"
                    size="sm"
                    onClick={onViewAll}
                />
            </div>
            <div className="space-y-4">
                {recentProperties.map((property:any) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        userUid={userUid}
                        variant="list"
                    />
                ))}
            </div>
        </div>
    );
}