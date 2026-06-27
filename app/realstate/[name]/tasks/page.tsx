'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import {
    CheckSquare, Plus, Calendar, Clock, ArrowUp,
    ArrowDown, Trash2, Edit, User, Home,
    Filter, Search, AlertCircle, CheckCircle2,
    Circle, Flag, Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import DraggableButton from "@/components/DraggableButton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { getData, saveData, deleleData, queryList } from "@/FBConfig/fbFunctions";
import { useAuth } from "@/hooks/useAuth";

interface TaskData {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    linkedType?: 'client' | 'property';
    linkedId?: string;
    linkedName?: string;
    createdAt: string;
}

const priorityConfig = {
    low: { label: 'Low', color: 'text-slate-500', bg: 'bg-slate-100', icon: ArrowDown },
    medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', icon: Flag },
    high: { label: 'High', color: 'text-rose-600', bg: 'bg-rose-50', icon: ArrowUp },
};

export default function TasksPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [searchVal, setSearchVal] = useState('');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const uid = user?.uid;

    const fetchTasks = useCallback(async () => {
        if (!uid) return;
        try {
            setLoading(true);
            setFetchError(null);
            const data = await queryList(`tasks/${uid}`);
            setTasks(data.reverse());
        } catch (err) {
            setFetchError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }, [uid]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            message.error('Please Login First');
            router.replace('/login');
            return;
        }
        fetchTasks();
    }, [user, authLoading, router, fetchTasks]);

    const handleToggleComplete = async (task: TaskData) => {
        if (!uid) return;
        try {
            const updated = { ...task, completed: !task.completed };
            await saveData(`tasks/${uid}/${task.id}`, updated);
            setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
            message.success(updated.completed ? 'Task completed' : 'Task reopened');
        } catch {
            message.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!uid || !confirm('Delete this task?')) return;
        try {
            await deleleData(`tasks/${uid}/${taskId}`);
            setTasks(prev => prev.filter(t => t.id !== taskId));
            message.success('Task deleted');
        } catch {
            message.error('Failed to delete task');
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            if (searchVal && !t.title.toLowerCase().includes(searchVal.toLowerCase())) return false;
            if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
            if (filterStatus === 'open' && t.completed) return false;
            if (filterStatus === 'done' && !t.completed) return false;
            return true;
        });
    }, [tasks, searchVal, filterPriority, filterStatus]);

    const stats = useMemo(() => ({
        total: tasks.length,
        open: tasks.filter(t => !t.completed).length,
        done: tasks.filter(t => t.completed).length,
        high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    }), [tasks]);

    if (loading || authLoading) return <Loader />;
    if (fetchError) return <ErrorState message={fetchError} onRetry={fetchTasks} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            <Header userData={user} />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CheckSquare className="w-5 h-5 text-indigo-500" />
                            <h1 className="text-2xl font-bold text-slate-800">Tasks</h1>
                        </div>
                        <p className="text-sm text-slate-500">Manage your to-do items tied to clients and properties</p>
                    </div>
                    <Button label="New Task" icon={<Plus className="w-4 h-4" />} onClick={() => router.push(`/realstate/${uid}/tasks/new`)} variant="theme2" size="md" />
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Total', value: stats.total, color: 'text-indigo-600' },
                        { label: 'Open', value: stats.open, color: 'text-amber-600' },
                        { label: 'Done', value: stats.done, color: 'text-emerald-600' },
                        { label: 'High Priority', value: stats.high, color: 'text-rose-600' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
                            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-6">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search tasks..." value={searchVal} onChange={e => setSearchVal(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="done">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    {filteredTasks.length === 0 ? (
                        <EmptyState
                            title={tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
                            message={tasks.length === 0 ? "Create your first task to stay organized" : "Try changing your filters"}
                            icon={<CheckSquare size={28} className="text-indigo-400" />}
                            action={tasks.length === 0 ? { label: 'Create Task', onClick: () => router.push(`/realstate/${uid}/tasks/new`) } : undefined}
                        />
                    ) : (
                        filteredTasks.map(task => {
                            const pConfig = priorityConfig[task.priority];
                            const PrioIcon = pConfig.icon;
                            return (
                                <div key={task.id} className={`bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all ${task.completed ? 'opacity-60' : ''}`}>
                                    <div className="flex items-start gap-3 p-4">
                                        <button onClick={() => handleToggleComplete(task)} className="mt-0.5 flex-shrink-0">
                                            {task.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className={`font-medium text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{task.title}</h3>
                                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${pConfig.bg} ${pConfig.color}`}>
                                                    <PrioIcon className="w-3 h-3" />
                                                    {pConfig.label}
                                                </span>
                                            </div>
                                            {task.description && <p className="text-xs text-slate-500 mt-1">{task.description}</p>}
                                            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                                                {task.dueDate && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {task.linkedName && (
                                                    <span className="flex items-center gap-1">
                                                        {task.linkedType === 'client' ? <User className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                                                        {task.linkedName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteTask(task.id)} className="p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-500 transition-colors flex-shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <DraggableButton onClick={() => router.push(`/realstate/${uid}/tasks/new`)} />
            </main>
        </div>
    );
}
