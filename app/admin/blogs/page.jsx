"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs, deleteBlog } from "../actions";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    const data = await getBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
      loadBlogs();
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Manage Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div key={b._id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {b.image && (
              <div className="w-full h-40 bg-zinc-900 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs text-brandYellow font-mono uppercase tracking-widest mb-2">{b.category}</span>
              <h3 className="text-xl font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{b.excerpt}</p>

              <div className="flex justify-between items-center mt-auto border-t border-zinc-800 pt-4">
                <span className="text-xs text-zinc-500">{b.date}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/blogs/${b._id}`}
                    className="text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg"
                    title="Edit Blog"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                    title="Delete Blog"
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
