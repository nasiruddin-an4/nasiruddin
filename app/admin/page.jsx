"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-oswald uppercase tracking-widest text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] border border-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-2">Projects</h2>
          <p className="text-4xl font-bold text-white">Manage</p>
        </div>
        <div className="bg-[#1a1a1a] border border-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-2">Blogs</h2>
          <p className="text-4xl font-bold text-white">Manage</p>
        </div>
        <div className="bg-[#1a1a1a] border border-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-2">News</h2>
          <p className="text-4xl font-bold text-white">Manage</p>
        </div>
      </div>
    </div>
  );
}
