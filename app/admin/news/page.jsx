"use client";

import { useState, useEffect } from "react";
import { getNews, createNews, deleteNews } from "../actions";
import { Plus, Trash2, X } from "lucide-react";
import CloudinaryUpload from "../components/CloudinaryUpload";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    image: "",
    link: "#",
    metaTitle: "",
    metaDescription: "",
    tags: ""
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createNews({
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()),
      type: "News"
    });
    setIsModalOpen(false);
    setFormData({ title: "", content: "", category: "", date: new Date().toLocaleDateString(), image: "", link: "#", metaTitle: "", metaDescription: "", tags: "" });
    loadNews();
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add News Item
        </button>
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
                <button
                  onClick={() => handleDelete(n._id)}
                  className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-oswald uppercase tracking-widest text-brandYellow">New Press / News</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Title</label>
                <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Meta Description (Short Excerpt)</label>
                <textarea required rows={2} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Full Content</label>
                <textarea rows={4} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">External Link (optional)</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Tags (comma separated)</label>
                <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">News Cover Image</label>
                <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, image: url})} />
              </div>

              <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-3 rounded uppercase tracking-wider mt-6">
                Publish News
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
