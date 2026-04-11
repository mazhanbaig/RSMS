'use client';

import StatsCard from "./StatsCard";

export default function StatsGrid({ stats }:any) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {stats.map((stat:any, idx:number) => (
                <StatsCard key={idx} stat={stat} />
            ))}
        </div>
    );
}