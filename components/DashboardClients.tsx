'use client';

import { ChevronRight, Users } from "lucide-react";
import Button from "@/components/Button";

export default function RecentClients({ clients, userUid, onViewAll, onNavigate }:any) {
    const recentClients = clients.slice(-2).reverse();

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Clients</h2>
                    <p className="mt-1 text-sm text-gray-600">Latest client inquiries</p>
                </div>
                <Button
                    label="View Clients"
                    variant="theme2"
                    size="sm"
                    onClick={onViewAll}
                />
            </div>
            <div className="space-y-3">
                {recentClients.length > 0 ? (
                    recentClients.map((client:any) => (
                        <div
                            key={client.id}
                            className="flex items-center justify-between px-3 py-1 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            onClick={() => onNavigate(client.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="min-w-[50px] my-auto text-center">
                                    <div className="text-xl font-bold text-indigo-600">
                                        {client.firstName?.charAt(0) || 'C'}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 text-sm">
                                        {client.firstName?.slice(0, 30) || 'Unknown'} {client.lastName || ''}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                        {client.email || 'No email'}
                                    </span>
                                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                        <span>{client.phone || 'No phone'}</span>
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
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No clients yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}