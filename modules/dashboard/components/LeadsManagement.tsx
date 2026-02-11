"use client";

import { Users, Phone, MessageSquare } from "lucide-react";

const mockLeads = [
  { id: "1", name: "יוסי כהן", type: "רענון", date: "היום, 10:30", status: "new" as const },
  { id: "2", name: "שרה לוי", type: "מתחמש חדש", date: "אתמול, 14:00", status: "contacted" as const },
  { id: "3", name: "דני אברהם", type: "חידוש", date: "לפני יומיים", status: "new" as const },
];

export function LeadsManagement() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-[var(--accent-blue)]" />
        לידים ({mockLeads.length})
      </h3>
      <div className="space-y-2">
        {mockLeads.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
            <div className="flex-1">
              <span className="text-sm font-medium">{lead.name}</span>
              <div className="text-[10px] text-[var(--text-muted)]">{lead.type} · {lead.date}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
              <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                lead.status === "new"
                  ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
                  : "bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]"
              }`}>
                {lead.status === "new" ? "חדש" : "בטיפול"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
