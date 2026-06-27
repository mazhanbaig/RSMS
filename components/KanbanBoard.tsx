'use client';

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, UserPlus, Phone, Home, FileText, CheckCircle, XCircle } from "lucide-react";

interface KanbanColumn {
  id: string;
  label: string;
  color: string;
  icon: any;
  statuses: string[];
}

const columns: KanbanColumn[] = [
  { id: 'new', label: 'New Lead', color: 'border-l-indigo-500', icon: UserPlus, statuses: ['new', 'lead'] },
  { id: 'contacted', label: 'Contacted', color: 'border-l-blue-500', icon: Phone, statuses: ['contacted'] },
  { id: 'viewing', label: 'Viewing Scheduled', color: 'border-l-amber-500', icon: Home, statuses: ['viewing', 'viewing-scheduled'] },
  { id: 'offer', label: 'Offer Made', color: 'border-l-purple-500', icon: FileText, statuses: ['offer', 'offer-made'] },
  { id: 'closed', label: 'Closed / Lost', color: 'border-l-rose-500', icon: XCircle, statuses: ['closed', 'converted', 'lost'] },
];

export default function KanbanBoard({ clients, userUid, onAdd }: any) {
  const router = useRouter();

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const col of columns) {
      map[col.id] = clients.filter((c: any) =>
        col.statuses.includes(c.status?.toLowerCase() || 'new')
      );
    }
    return map;
  }, [clients]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => {
        const items = grouped[col.id] || [];
        const Icon = col.icon;
        return (
          <div key={col.id} className={`bg-white rounded-xl border border-slate-200 shadow-sm border-l-4 ${col.color}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Icon size={14} className="text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">{col.label}</span>
                <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{items.length}</span>
              </div>
            </div>
            <div className="p-3 space-y-2 min-h-[200px]">
              {items.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">No clients</div>
              )}
              {items.map((client: any) => (
                <div
                  key={client.id}
                  onClick={() => router.push(`/realstate/${userUid}/clients/viewclient/${client.id}`)}
                  className="p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-sm text-slate-800">
                    {client.firstName} {client.lastName}
                  </div>
                  {client.email && (
                    <div className="text-xs text-slate-500 mt-1 truncate">{client.email}</div>
                  )}
                  {client.phone && (
                    <div className="text-xs text-slate-400">{client.phone}</div>
                  )}
                </div>
              ))}
              <button
                onClick={onAdd}
                className="w-full py-2 rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center justify-center gap-1"
              >
                <Plus size={12} />
                Add Client
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
