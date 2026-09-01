"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "../../actions";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../components/CloudinaryUpload";

export default function EditProjectForm({ project }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: project.title || "",
    category: project.category || "",
    tech: project.tech ? project.tech.join(", ") : "",
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    description: project.description || "",
    aboutText: project.aboutText || "",
    problemStatement: project.problemStatement || "",
    solutionText: project.solutionText || "",
    image: project.image || "", 
    coverImage: project.coverImage || "",
    middleImage: project.middleImage || "",
    showcaseImages: project.showcaseImages || [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      tech: typeof formData.tech === 'string' ? formData.tech.split(",").map((t) => t.trim()) : formData.tech,
    };
    await updateProject(project._id, dataToSave);
    router.push("/admin/projects");
  };

  const addShowcaseImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      showcaseImages: [...prev.showcaseImages, url],
    }));
  };

  const removeShowcaseImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.showcaseImages];
      newImages.splice(index, 1);
      return { ...prev, showcaseImages: newImages };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white font-sans pb-20">
      <div className="flex items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <Link href="/admin/projects" className="text-zinc-400 hover:text-brandYellow transition-colors p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700">
          <MoveLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Edit Case Study</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-12">
        
        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Project Title</label>
              <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
              <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Tech Stack (comma separated)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Live Demo URL</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Github URL</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Short Description (for project list cards)</label>
            <textarea required rows={2} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
        </section>

        {/* Case Study Content */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Case Study Story</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">About The Project</label>
            <textarea rows={5} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.aboutText} onChange={e => setFormData({...formData, aboutText: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">The Problem</label>
              <textarea rows={6} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.problemStatement} onChange={e => setFormData({...formData, problemStatement: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">The Solution</label>
              <textarea rows={6} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.solutionText} onChange={e => setFormData({...formData, solutionText: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Media & Images */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Media & Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Thumbnail (List View)</label>
              <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, image: url})} />
              {formData.image && <img src={formData.image} alt="Thumbnail" className="mt-4 h-32 w-full object-cover rounded-lg" />}
            </div>
            
            <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <label className="block text-xs font-mono uppercase tracking-widest text-brandYellow mb-2">Hero Cover Image</label>
              <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, coverImage: url})} />
              {formData.coverImage && <img src={formData.coverImage} alt="Cover" className="mt-4 h-32 w-full object-cover rounded-lg" />}
            </div>
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Middle Break Image (Optional)</label>
            <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, middleImage: url})} />
            {formData.middleImage && <img src={formData.middleImage} alt="Middle" className="mt-4 h-48 w-full object-cover rounded-lg" />}
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <label className="block text-xs font-mono uppercase tracking-widest text-brandYellow mb-2">Showcase Gallery (3-5 Images)</label>
            <CloudinaryUpload onUploadSuccess={addShowcaseImage} />
            
            {formData.showcaseImages && formData.showcaseImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {formData.showcaseImages.map((img, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-zinc-700">
                    <img src={img} alt={`Showcase ${idx}`} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => removeShowcaseImage(idx)} className="text-red-400 text-sm font-bold uppercase tracking-widest hover:text-red-300">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="pt-6 border-t border-zinc-800">
          <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2">
            <Save className="w-5 h-5" /> Update Case Study
          </button>
        </div>
      </form>
    </div>
  );
}
