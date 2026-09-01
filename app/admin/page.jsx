import Link from 'next/link';
import { FolderKanban, FileText, Newspaper, Activity, Zap, ArrowRight } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import News from '@/models/News';
import Experience from '@/models/Experience';
import Visit from '@/models/Visit';
import VisitsChart from './components/VisitsChart';

export const revalidate = 0; // Ensure data is always fresh on reload

export default async function AdminDashboard() {
  await connectToDatabase();
  
  const [projectCount, blogCount, newsCount, experienceCount, totalVisits, uniqueVisits, utmSources, monthlyVisitsRaw] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    News.countDocuments(),
    Experience.countDocuments(),
    Visit.countDocuments(),
    Visit.distinct('sessionId').then(res => res.length),
    Visit.aggregate([
      { $match: { utm_source: { $ne: '' }, utm_source: { $exists: true } } },
      { $group: { _id: '$utm_source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]),
    Visit.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          visits: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyVisits = monthlyVisitsRaw.map(item => ({
    month: monthNames[item._id - 1] || "Unknown",
    visits: item.visits
  }));

  const stats = [
    {
      title: 'Projects',
      count: projectCount,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'from-blue-500/20 to-blue-500/0',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/50'
    },
    {
      title: 'Blogs',
      count: blogCount,
      icon: FileText,
      href: '/admin/blogs',
      color: 'from-brandYellow/20 to-brandYellow/0',
      iconColor: 'text-brandYellow',
      borderColor: 'border-brandYellow/20',
      hoverBorder: 'hover:border-brandYellow/50'
    },
    {
      title: 'News',
      count: newsCount,
      icon: Newspaper,
      href: '/admin/news',
      color: 'from-purple-500/20 to-purple-500/0',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      hoverBorder: 'hover:border-purple-500/50'
    },
    {
      title: 'Experiences',
      count: experienceCount,
      icon: Activity,
      href: '/admin', // Update href if a dedicated route exists
      color: 'from-emerald-500/20 to-emerald-500/0',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={index} 
              href={stat.href}
              className={`relative group bg-[#151515] border ${stat.borderColor} ${stat.hoverBorder} p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50`}
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-1">{stat.title}</h2>
                  <p className="text-4xl font-bold text-white font-oswald tracking-wide">{stat.count}</p>
                </div>
                <div className={`p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 ${stat.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="relative z-10 mt-6 flex items-center text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                Manage {stat.title}
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* System & Actions Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Analytics Overview */}
        <div className="lg:col-span-2 bg-[#151515] border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-oswald uppercase tracking-widest text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brandYellow" />
            Analytics Overview
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-black/40 rounded-xl border border-zinc-800/50">
              <p className="text-sm font-sans text-zinc-400 mb-1">Total Page Views</p>
              <p className="text-3xl font-bold text-white font-oswald">{totalVisits}</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-zinc-800/50">
              <p className="text-sm font-sans text-zinc-400 mb-1">Unique Visitors</p>
              <p className="text-3xl font-bold text-white font-oswald">{uniqueVisits}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Visits Over Time</p>
            <VisitsChart data={monthlyVisits} />
          </div>
          
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Top UTM Sources</p>
            {utmSources.length > 0 ? (
              <div className="space-y-3">
                {utmSources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                    <span className="text-sm font-sans text-zinc-300 capitalize">{source._id}</span>
                    <span className="text-sm font-mono text-brandYellow bg-brandYellow/10 px-2 py-1 rounded-md">{source.count} visits</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500 italic p-4 bg-black/20 rounded-lg border border-zinc-800/30 text-center">No UTM campaign data recorded yet.</p>
            )}
          </div>
        </div>
        
        <div className="bg-[#151515] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-oswald uppercase tracking-widest text-white mb-6">Quick Actions</h3>
          <div className="space-y-3 flex-1">
            <Link href="/admin/projects" className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all group">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform"><FolderKanban className="w-4 h-4" /></div>
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Add New Project</span>
            </Link>
            <Link href="/admin/blogs" className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all group">
              <div className="p-2 bg-brandYellow/10 text-brandYellow rounded-lg group-hover:scale-110 transition-transform"><FileText className="w-4 h-4" /></div>
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Write Blog Post</span>
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all group">
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-110 transition-transform"><Newspaper className="w-4 h-4" /></div>
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Publish News</span>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-2">
               <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Tracker Status</p>
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            <p className="text-xs text-zinc-400">Your custom analytics tracker is active and capturing visits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
