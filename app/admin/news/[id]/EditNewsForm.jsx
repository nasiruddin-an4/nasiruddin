"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNews } from "../../actions";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import RichTextEditor from "../../components/RichTextEditor";

export default function EditNewsForm({ newsItem }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: newsItem.title || "",
    category: newsItem.category || "",
    date: newsItem.date || "",
    link: newsItem.link || "#",
    tags: newsItem.tags ? newsItem.tags.join(", ") : "",
    metaTitle: newsItem.metaTitle || "",
    metaDescription: newsItem.metaDescription || "",
    content: newsItem.content || "",
    image: newsItem.image || "",
    alt: newsItem.alt || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    await updateNews(newsItem._id, dataToSave);
    router.push("/admin/news");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white font-sans pb-20">
      <div className="flex items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <Link href="/admin/news" className="text-zinc-400 hover:text-brandYellow transition-colors p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700">
          <MoveLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Edit News Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-12">

        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Basic Info</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Title</label>
            <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Date</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">External Link (optional)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Tags (comma separated)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>
        </section>

        {/* SEO */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">SEO</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Meta Title (optional, defaults to Title)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Meta Description (short excerpt, for cards & SEO)</label>
            <textarea required rows={2} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors resize-none" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} />
          </div>
        </section>

        {/* Content */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Content</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Full Content</label>
            <RichTextEditor value={formData.content} onChange={(html) => setFormData({...formData, content: html})} placeholder="Write the full article..." />
          </div>
        </section>

        {/* Media */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Media</h2>
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <label className="block text-xs font-mono uppercase tracking-widest text-brandYellow mb-2">Cover Image</label>
            <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, image: url})} />
            {formData.image && <img src={formData.image} alt="Cover" className="mt-4 h-32 w-full object-cover rounded-lg" />}
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Image Alt Text</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.alt} onChange={e => setFormData({...formData, alt: e.target.value})} placeholder="Describe the image for accessibility & SEO" />
          </div>
        </section>

        <div className="pt-6 border-t border-zinc-800">
          <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2">
            <Save className="w-5 h-5" /> Update News Item
          </button>
        </div>
      </form>
    </div>
  );
}
