"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Newspaper, LogOut } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return children;
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
  ];

  return (
    <div className="min-h-screen bg-brandBlack text-white flex">
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

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-sans"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#111111] border-b border-zinc-800 p-4 flex justify-between items-center">
          <Link href="/admin" className="font-oswald uppercase tracking-widest text-brandYellow font-bold">
            Admin
          </Link>
          <button onClick={handleLogout} className="text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0a0a0a]">
          {children}
        </div>
      </main>
    </div>
  );
}
