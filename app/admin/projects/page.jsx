"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects, deleteProject, toggleFeaturedProject } from "../actions";
import { Plus, Trash2, ExternalLink, Edit, Star } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      loadProjects();
    }
  };

  const handleToggleFeatured = async (p) => {
    await toggleFeaturedProject(p._id, !p.featured);
    loadProjects();
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p._id} className={`bg-[#1a1a1a] border rounded-xl overflow-hidden shadow-lg flex flex-col ${p.featured ? "border-brandYellow" : "border-zinc-800"}`}>
            <div className="w-full h-40 bg-zinc-900 relative">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              )}
              <span className="absolute top-2 left-2 bg-black/70 text-zinc-300 text-xs font-mono px-2 py-1 rounded-md">
                #{p.order || 0}
              </span>
              <button
                onClick={() => handleToggleFeatured(p)}
                title={p.featured ? "Unpin from featured" : "Pin as featured"}
                className={`absolute top-2 right-2 p-1.5 rounded-md transition-colors ${
                  p.featured ? "bg-brandYellow text-brandBlack" : "bg-black/70 text-zinc-300 hover:text-brandYellow"
                }`}
              >
                <Star className="w-4 h-4" fill={p.featured ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{p.description}</p>

              <div className="flex justify-between items-center mt-auto border-t border-zinc-800 pt-4">
                <div className="flex gap-3">
                  {p.liveUrl && p.liveUrl !== "#" && <ExternalLink className="w-4 h-4 text-brandYellow" />}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${p._id}`}
                    className="text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                    title="Delete Project"
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
