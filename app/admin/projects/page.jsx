"use client";

import { useState, useEffect } from "react";
import { getProjects, createProject, deleteProject } from "../actions";
import { Plus, Trash2, X, ExternalLink, Github } from "lucide-react";
import CloudinaryUpload from "../components/CloudinaryUpload";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    category: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createProject({
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()),
    });
    setIsModalOpen(false);
    setFormData({ title: "", description: "", tech: "", category: "", liveUrl: "", githubUrl: "", image: "" });
    loadProjects();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Manage Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p._id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {p.image && (
              <div className="w-full h-40 bg-zinc-900 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{p.description}</p>
              
              <div className="flex justify-between items-center mt-auto border-t border-zinc-800 pt-4">
                <div className="flex gap-3">
                  {p.liveUrl && p.liveUrl !== "#" && <ExternalLink className="w-4 h-4 text-brandYellow" />}
                  {p.githubUrl && p.githubUrl !== "#" && <Github className="w-4 h-4 text-zinc-400" />}
                </div>
                <button
                  onClick={() => handleDelete(p._id)}
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
              <h2 className="text-xl font-oswald uppercase tracking-widest text-brandYellow">New Project</h2>
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
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Description</label>
                <textarea required rows={3} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Tech Stack (comma separated)</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Live Demo URL</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Github URL</label>
                  <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:border-brandYellow outline-none" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Project Image</label>
                <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, image: url})} />
              </div>

              <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-3 rounded uppercase tracking-wider mt-6">
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
