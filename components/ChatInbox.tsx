// components/ChatInbox.tsx
'use client';

import { ChevronRight, MessageCircle, Clock, Users as UsersIcon } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";

interface ChatThread {
    id: string;
    customerName: string;
    customerEmail: string;
    lastMessage: string;
    lastMessageTime: Date | string;
    unreadCount: number;
    customerInitial?: string;
    customerPhoto?: string;
}

interface ChatInboxProps {
    threads: ChatThread[];
    unreadTotal: number;
    agentUid: string;
    onViewAll?: () => void;
    onNavigateToChat?: (threadId: string) => void;
}

export default function ChatInbox({
    threads,
    unreadTotal,
    agentUid,
    onViewAll,
    onNavigateToChat
}: ChatInboxProps) {
    // Show only the 3 most recent chats with unread priority (unread first, then latest)
    const recentThreads = [...threads]
        .sort((a, b) => {
            // Unread threads come first
            if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
            if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
            // Then sort by last message time (newest first)
            return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
        })
        .slice(0, 3);

    const formatMessageTime = (time: Date | string) => {
        const date = new Date(time);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const truncateMessage = (message: string, maxLength: number = 40) => {
        if (message.length <= maxLength) return message;
        return message.slice(0, maxLength) + '...';
    };

    const handleThreadClick = (threadId: string) => {
        if (onNavigateToChat) {
            onNavigateToChat(threadId);
        } else {
            // Default navigation
            window.location.href = `/realstate/${agentUid}/chats?thread=${threadId}`;
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900">Customer Chats</h2>
                        {unreadTotal > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadTotal}
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                        {unreadTotal > 0
                            ? `You have ${unreadTotal} unread message${unreadTotal > 1 ? 's' : ''}`
                            : "No unread messages"}
                    </p>
                </div>
                <Button
                    label="View All"
                    variant="theme2"
                    size="sm"
                    onClick={onViewAll}
                />
            </div>
            <div className="space-y-3">
                {recentThreads.length > 0 ? (
                    recentThreads.map((thread) => (
                        <div
                            key={thread.id}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer group ${thread.unreadCount > 0
                                    ? 'border-purple-200 bg-purple-50/30 hover:bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                                }`}
                            onClick={() => handleThreadClick(thread.id)}
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {/* Avatar / Initial */}
                                <div className={`min-w-[45px] h-[45px] my-auto flex items-center justify-center rounded-full ${thread.unreadCount > 0
                                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'
                                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                                    }`}>
                                    <span className="text-lg font-bold">
                                        {thread.customerInitial || thread.customerName?.charAt(0) || 'C'}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={`font-semibold text-sm truncate ${thread.unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-700'
                                            }`}>
                                            {thread.customerName || 'Unknown Customer'}
                                        </span>
                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                            {formatMessageTime(thread.lastMessageTime)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs truncate flex-1 ${thread.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'
                                            }`}>
                                            {truncateMessage(thread.lastMessage)}
                                        </span>
                                        {thread.unreadCount > 0 && (
                                            <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 min-w-[20px] text-center">
                                                {thread.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center ml-2">
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No conversations yet</p>
                        <p className="text-sm text-gray-400 mt-1">When clients message you, they'll appear here</p>
                    </div>
                )}
            </div>

            {/* Quick action to start new conversation (optional) */}
            {threads.length === 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <Link href={`/realstate/${agentUid}/chats`}>
                        <div className="text-center text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1 transition-colors">
                            Go to Chat Center
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}