"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExperiences, deleteExperience } from "../actions";
import { Plus, Trash2, ExternalLink, Edit, Briefcase } from "lucide-react";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);

  const loadExperiences = async () => {
    const data = await getExperiences();
    setExperiences(data);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await deleteExperience(id);
      loadExperiences();
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-zinc-800">
        <h1 className="text-2xl font-oswald uppercase tracking-widest text-brandYellow">Manage Experience</h1>
        <Link
          href="/admin/experience/new"
          className="bg-brandYellow text-brandBlack px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Experience
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            <div className="w-full h-32 bg-zinc-900 relative flex items-center justify-center">
              {exp.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={exp.logo} alt={exp.company} className="max-h-full max-w-full object-contain p-4" />
              ) : (
                <Briefcase className="w-10 h-10 text-zinc-700" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
              <p className="text-sm text-brandYellow font-semibold mb-1">{exp.company}</p>
              <p className="text-xs text-zinc-500 mb-4">{exp.duration}</p>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{exp.description}</p>

              <div className="flex justify-between items-center mt-auto border-t border-zinc-800 pt-4">
                <div className="flex gap-3">
                  {exp.website && exp.website !== "#" && (
                    <a href={exp.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 text-brandYellow" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/experience/${exp._id}`}
                    className="text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-lg"
                    title="Edit Experience"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-500 hover:text-red-400 transition-colors bg-red-500/10 p-2 rounded-lg"
                    title="Delete Experience"
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
