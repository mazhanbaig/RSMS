'use client';

import { useState } from "react";
import { message, Modal } from "antd";
import { Send, Mail, X } from "lucide-react";

interface EmailTemplate {
  label: string;
  subject: string;
  body: string;
}

const templates: EmailTemplate[] = [
  {
    label: "General",
    subject: "Hello from Zestate",
    body: "Dear {name},\n\nI hope this message finds you well.\n\nBest regards,\n{agentName}",
  },
  {
    label: "Property Viewing Confirmation",
    subject: "Property Viewing Confirmation",
    body: "Dear {name},\n\nYour property viewing has been confirmed. We look forward to seeing you.\n\nBest regards,\n{agentName}",
  },
  {
    label: "Follow Up",
    subject: "Following Up",
    body: "Dear {name},\n\nI wanted to follow up on our recent conversation. Please let me know if you have any questions.\n\nBest regards,\n{agentName}",
  },
];

interface CommunicationHubProps {
  open: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName: string;
  agentName?: string;
}

export default function CommunicationHub({ open, onClose, recipientEmail, recipientName, agentName }: CommunicationHubProps) {
  const [to] = useState(recipientEmail);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const applyTemplate = (tpl: EmailTemplate) => {
    setSubject(tpl.subject);
    setBody(
      tpl.body
        .replace(/\{name\}/g, recipientName)
        .replace(/\{agentName\}/g, agentName || "Your Agent")
    );
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      message.warning("Please fill in all fields");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          html: body.replace(/\n/g, "<br/>"),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }
      message.success("Email sent successfully!");
      onClose();
    } catch (err: any) {
      message.error(err.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-indigo-500" />
          <span>Send Email to {recipientName}</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
    >
      <div className="space-y-4 py-2">
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">To</label>
          <input
            type="email"
            value={to}
            readOnly
            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Templates</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {templates.map((tpl) => (
              <button
                key={tpl.label}
                onClick={() => applyTemplate(tpl)}
                className="px-3 py-1.5 text-xs rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject..."
            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
            rows={8}
            className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Send size={14} />
            {sending ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
