"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "../../actions";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import RichTextEditor from "../../components/RichTextEditor";

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    image: "",
    featured: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(formData);
    router.push("/admin/blogs");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white font-sans pb-20">
      <div className="flex items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <Link href="/admin/blogs" className="text-zinc-400 hover:text-brandYellow transition-colors p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700">
          <MoveLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Create Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-12">

        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Basic Info</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Title</label>
            <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Next.js App Router SEO Checklist" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Web Development" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Read Time</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} placeholder="5 min read" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Date</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <label className="flex items-center gap-3 mt-6 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-brandYellow" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Featured Post</span>
            </label>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Excerpt (short summary, for cards & SEO)</label>
            <textarea required rows={2} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors resize-none" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
          </div>
        </section>

        {/* Content */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Content</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Full Content</label>
            <RichTextEditor value={formData.content} onChange={(html) => setFormData({...formData, content: html})} placeholder="Write the full blog post..." />
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
        </section>

        <div className="pt-6 border-t border-zinc-800">
          <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2">
            <Save className="w-5 h-5" /> Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}
