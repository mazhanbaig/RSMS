'use client';

import { ChevronRight, Building } from "lucide-react";
import Button from "@/components/Button";

export default function RecentOwners({ owners, userUid, onViewAll, onNavigate }:any) {
    const recentOwners = owners.slice(-2).reverse();

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Owners</h2>
                    <p className="mt-1 text-sm text-gray-600">Latest owners inquiries</p>
                </div>
                <Button
                    label="View Owners"
                    variant="theme2"
                    size="sm"
                    onClick={onViewAll}
                />
            </div>
            <div className="space-y-3">
                {recentOwners.length > 0 ? (
                    recentOwners.map((owner:any) => (
                        <div
                            key={owner.id}
                            className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            onClick={() => onNavigate(owner.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="min-w-[50px] my-auto text-center">
                                    <div className="text-xl font-bold text-indigo-600">
                                        {owner.firstName?.charAt(0) || 'O'}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 text-sm">
                                        {owner.firstName?.slice(0, 30) || 'Unknown'} {owner.lastName || ''}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                        {owner.email || 'No email'}
                                    </span>
                                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                        <span>{owner.phone || 'No phone'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No owners yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}