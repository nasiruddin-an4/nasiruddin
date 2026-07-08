'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderGit2, FileText, Newspaper, GraduationCap, Briefcase } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    news: 0,
    experience: 0,
    education: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, blogsRes, newsRes, expRes, eduRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs'),
          fetch('/api/news'),
          fetch('/api/experience'),
          fetch('/api/education'),
        ]);

        const [projects, blogs, news, experience, education] = await Promise.all([
          projectsRes.json(),
          blogsRes.json(),
          newsRes.json(),
          expRes.json(),
          eduRes.json(),
        ]);

        setStats({
          projects: projects.length || 0,
          blogs: blogs.length || 0,
          news: news.length || 0,
          experience: experience.length || 0,
          education: education.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Projects', count: stats.projects, icon: FolderGit2, color: 'text-blue-600', bg: 'bg-blue-100', href: '/admin/projects' },
    { title: 'Total Blogs', count: stats.blogs, icon: FileText, color: 'text-green-600', bg: 'bg-green-100', href: '/admin/blogs' },
    { title: 'Total News', count: stats.news, icon: Newspaper, color: 'text-purple-600', bg: 'bg-purple-100', href: '/admin/news' },
    { title: 'Experience Entries', count: stats.experience, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100', href: '/admin/experience' },
    { title: 'Education Entries', count: stats.education, icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-100', href: '/admin/education' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bg}`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{card.count}</span>
                </div>
                <h3 className="text-gray-600 font-medium">{card.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
