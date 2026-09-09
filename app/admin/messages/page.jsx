"use client";

import { useState, useEffect } from "react";
import { getContacts, deleteContact, markContactRead } from "../actions";
import { Trash2, Mail, MailOpen, Phone } from "lucide-react";

export default function AdminMessages() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this message?")) {
      await deleteContact(id);
      loadContacts();
    }
  };

  const handleToggleRead = async (c) => {
    await markContactRead(c._id, !c.read);
    loadContacts();
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Messages</h1>
        <span className="text-sm text-zinc-400">
          {contacts.filter((c) => !c.read).length} unread / {contacts.length} total
        </span>
      </div>

      {!loading && contacts.length === 0 && (
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
          No messages yet.
        </div>
      )}

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className={`bg-[#1a1a1a] border rounded-xl p-6 ${c.read ? "border-zinc-800" : "border-brandYellow/40"}`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold">{c.firstName} {c.lastName}</h3>
                  {!c.read && (
                    <span className="text-xs bg-brandYellow text-brandBlack font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                  )}
                </div>
                <p className="text-sm text-brandYellow font-semibold mb-1">{c.subject}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 mb-3">
                  <a href={`mailto:${c.email}`} className="hover:text-brandYellow transition-colors">{c.email}</a>
                  {c.phone && (
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {c.phone}</span>
                  )}
                  <span>{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-zinc-300 whitespace-pre-wrap">{c.message}</p>
              </div>

              <div className="flex md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleToggleRead(c)}
                  title={c.read ? "Mark as unread" : "Mark as read"}
                  className="text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg"
                >
                  {c.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  title="Delete message"
                  className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
