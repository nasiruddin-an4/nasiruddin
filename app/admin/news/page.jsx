"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNews, deleteNews } from "../actions";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      await deleteNews(id);
      loadNews();
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Manage News</h1>
        <Link
          href="/admin/news/new"
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add News Item
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <div key={n._id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {n.image && (
              <div className="w-full h-40 bg-zinc-900 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs text-brandYellow font-mono uppercase tracking-widest mb-2">{n.category}</span>
              <h3 className="text-xl font-bold mb-2">{n.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{n.metaDescription || n.content}</p>

              <div className="flex justify-between items-center mt-auto border-t border-zinc-800 pt-4">
                <span className="text-xs text-zinc-500">{n.date}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/news/${n._id}`}
                    className="text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg"
                    title="Edit News Item"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                    title="Delete News Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
