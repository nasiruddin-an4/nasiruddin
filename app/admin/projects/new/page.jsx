"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../actions";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import RichTextEditor from "../../components/RichTextEditor";

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    company: "",
    timeline: "",
    tech: "",
    liveUrl: "",
    featured: false,
    order: 0,
    description: "",
    aboutText: "",
    problemStatement: "",
    solutionText: "",
    image: "", // list view thumbnail
    coverImage: "", // hero image
    middleImage: "",
    showcaseImages: [],
    myRole: "",
    keyFeatures: "",
    impact: "",
    testimonialQuote: "",
    testimonialAuthor: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const splitList = (v) => (v ? v.split(",").map((t) => t.trim()).filter(Boolean) : []);
    const dataToSave = {
      ...formData,
      tech: splitList(formData.tech),
      keyFeatures: splitList(formData.keyFeatures),
      impact: splitList(formData.impact),
      order: Number(formData.order) || 0,
    };
    await createProject(dataToSave);
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
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Create Case Study</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-8 space-y-12">
        
        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Project Title</label>
              <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. E-Commerce Platform" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Category</label>
              <input required className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Web Development" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Company / Client</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Defaults to the project title if left blank" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Timeline</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} placeholder="e.g. Jan 2026 – Mar 2026" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Tech Stack (comma separated)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} placeholder="Next.js, Tailwind, MongoDB" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Live Demo URL</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Short Description (for project list cards)</label>
            <textarea required rows={2} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="A brief 1-2 sentence overview." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Display Order (serial number)</label>
              <input type="number" className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} placeholder="0" />
              <p className="text-xs text-zinc-500 mt-2">Lower numbers show first. Featured projects always come before non-featured ones regardless of this number.</p>
            </div>
            <div>
              <label className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg cursor-pointer select-none">
                <input type="checkbox" className="w-5 h-5 accent-brandYellow" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                <span className="text-sm font-semibold text-white">Pin as Featured</span>
              </label>
            </div>
          </div>
        </section>

        {/* Case Study Content */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Case Study Story</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">About The Project</label>
            <RichTextEditor value={formData.aboutText} onChange={(html) => setFormData({...formData, aboutText: html})} placeholder="In-depth background about the project..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">The Problem</label>
              <RichTextEditor value={formData.problemStatement} onChange={(html) => setFormData({...formData, problemStatement: html})} placeholder="What challenge were you solving?" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">The Solution</label>
              <RichTextEditor value={formData.solutionText} onChange={(html) => setFormData({...formData, solutionText: html})} placeholder="How did you solve it?" />
            </div>
          </div>
        </section>

        {/* Credibility */}
        <section className="space-y-6">
          <h2 className="text-xl font-oswald uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Credibility</h2>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">My Role</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.myRole} onChange={e => setFormData({...formData, myRole: e.target.value})} placeholder="e.g. Solo Full-Stack Developer, or Led frontend & SEO on a team of 4" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Key Features (comma separated)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.keyFeatures} onChange={e => setFormData({...formData, keyFeatures: e.target.value})} placeholder="Faculty search, Admin CMS, Responsive design" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Results / Impact (comma separated)</label>
            <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.impact} onChange={e => setFormData({...formData, impact: e.target.value})} placeholder="40% faster page load, 500+ faculty profiles migrated" />
            <p className="text-xs text-zinc-500 mt-2">Short, quantifiable outcomes. This is what makes the case study read as proof, not just a description.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Testimonial Quote (optional)</label>
              <textarea rows={3} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.testimonialQuote} onChange={e => setFormData({...formData, testimonialQuote: e.target.value})} placeholder="Leave blank if you don't have one — never fabricate a quote." />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Testimonial Author</label>
              <input className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-brandYellow outline-none transition-colors" value={formData.testimonialAuthor} onChange={e => setFormData({...formData, testimonialAuthor: e.target.value})} placeholder="Name, Role at Company" />
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
            <p className="text-xs text-zinc-500 mb-4">Upload mockups of web, mobile, and tablet versions here.</p>
            <CloudinaryUpload onUploadSuccess={addShowcaseImage} />
            
            {formData.showcaseImages.length > 0 && (
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
            <Save className="w-5 h-5" /> Publish Case Study
          </button>
        </div>
      </form>
    </div>
  );
}
