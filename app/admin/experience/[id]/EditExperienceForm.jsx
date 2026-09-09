"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateExperience } from "../../actions";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../components/CloudinaryUpload";

export default function EditExperienceForm({ experience }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: experience.title || "",
    company: experience.company || "",
    duration: experience.duration || "",
    description: experience.description || "",
    website: experience.website || "",
    logo: experience.logo || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExperience(experience._id, formData);
    router.push("/admin/experience");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-white font-sans pb-20">
      <div className="flex items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <Link href="/admin/experience" className="text-zinc-400 hover:text-brandYellow transition-colors p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700">
          <MoveLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Edit Experience</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Role / Title</label>
            <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Company</label>
            <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Duration</label>
            <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. Jan 2024 - Present" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Company Website (optional)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} placeholder="https://" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Description (optional)</label>
          <textarea rows={3} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Company Logo</label>
          <CloudinaryUpload defaultImage={formData.logo} onUploadSuccess={(url) => setFormData({...formData, logo: url})} />
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <button type="submit" className="w-full bg-brandYellow text-brandBlack font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2">
            <Save className="w-5 h-5" /> Update Experience
          </button>
        </div>
      </form>
    </div>
  );
}
