'use client';

import { Crown } from "lucide-react";

export default function WelcomeSection({ greeting, userName }:any) {
    return (
        <div className="mb-10 ml-2 sm:ml-0">
            <div className="relative">
                <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6 mt-6 sm:mt-3">
                                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Dashboard</span>
                                <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:block p-2 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-400/10">
                                        <Crown className="h-6 w-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                            {greeting},{" "}
                                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                {userName}
                                            </span>
                                        </h1>
                                        <p className="text-gray-600 mt-2 max-w-xl">
                                            Your real estate management hub. Track properties, connect with clients, and grow your business.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}