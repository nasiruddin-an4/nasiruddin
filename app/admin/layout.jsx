"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Newspaper, Briefcase, LogOut, User, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/projects")) return "Projects";
    if (pathname.startsWith("/admin/blogs")) return "Blogs";
    if (pathname.startsWith("/admin/news")) return "News";
    if (pathname.startsWith("/admin/experience")) return "Experience";
    if (pathname.startsWith("/admin/settings")) return "Settings";
    return "Admin Panel";
  };

  if (pathname === "/admin/login") {
    return (
      <>
        <meta name="robots" content="noindex, nofollow" />
        {children}
      </>
    );
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-brandBlack text-white flex">
      <meta name="robots" content="noindex, nofollow" />
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="text-2xl font-oswald uppercase tracking-widest text-brandYellow font-bold">
            Nasir Uddin
          </Link>
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans transition-colors ${
                  isActive ? "bg-brandYellow text-brandBlack font-semibold" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-[#111111] border-b border-zinc-800 p-4 flex justify-between items-center z-10">
          <div className="md:hidden">
            <Link href="/admin" className="font-oswald uppercase tracking-widest text-brandYellow font-bold">
              Admin
            </Link>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-oswald uppercase tracking-widest text-white">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              <User className="w-5 h-5 text-zinc-300" />
            </button>
            
            {/* Dropdown Modal */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-zinc-800 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-zinc-800 mb-2">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-xs text-zinc-400 mt-1">Manage your portfolio</p>
                </div>
                
                <Link 
                  href="/admin/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0a0a0a]">
          {children}
        </div>
      </main>
    </div>
  );
}
