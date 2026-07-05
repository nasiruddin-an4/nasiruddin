"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
} from "react-icons/fa6";
import socialLinks from "@/data/social.json";

const iconMap = {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaBehance,
};
import {
  FaPhoneAlt,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navData = [
  {
    name: "Profile",
    id: "profile",
    subLinks: [
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Professional Photos", href: "/professional-photos" },
      { label: "CV", href: "/cv" },
    ],
  },
  {
    name: "Portfolio",
    id: "portfolio",
    subLinks: [
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const searchInputRef = useRef(null);
  const pathname = usePathname();

  // Smoothly close search with exit animation
  const closeSearch = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsSearchOpen(false);
      setIsClosing(false);
    }, 300);
  }, [isClosing]);

  // Auto-focus input when search opens + Escape to close
  useEffect(() => {
    if (isSearchOpen && !isClosing) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      const handleKey = (e) => {
        if (e.key === "Escape") closeSearch();
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isSearchOpen, isClosing, closeSearch]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* MOBILE TOP NAVBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[72px] bg-black/50 backdrop-blur-sm flex items-center justify-between px-6 z-200 border-r border-gray-500">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/A.png"
            alt="Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSearchOpen(true)}>
            <FaSearch className="text-white text-xl hover:text-gray-300 transition-colors" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-white text-2xl hover:text-gray-300 transition-colors" />
            ) : (
              <FaBars className="text-white text-2xl hover:text-gray-300 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-brandBlack/50 z-150 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div
        className={`fixed top-0 bottom-0 bg-black text-white flex flex-col justify-between overflow-y-auto z-160 transition-transform duration-300 
        w-[80%] right-0 md:w-72 md:left-0 md:right-auto md:translate-x-0 pt-[72px] md:pt-0
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* LOGO (Desktop Only) */}
        <div className="hidden md:block px-10 py-10 mt-2">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            {/* Logo from public folder */}
            <Image
              src="/A.png"
              alt="Logo"
              width={180}
              height={80}
              className="w-full h-auto"
              priority
            />
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-col mt-4 space-y-6 px-10">
          {navData.map((item) =>
            item.subLinks ? (
              <div key={item.id}>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={`w-full text-left uppercase text-2xl tracking-wide flex items-center justify-between transition-colors ${item.subLinks?.some((sub) => sub.href === pathname)
                    ? "text-yellow-500"
                    : "text-white hover:text-gray-300"
                    }`}
                >
                  <span>{item.name}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 text-xs ${openDropdown === item.id ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${openDropdown === item.id
                    ? "grid-rows-[1fr] opacity-100 mt-3"
                    : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col pl-4 space-y-3 pb-1">
                      {item.subLinks.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`text-xl uppercase transition-colors ${pathname === subItem.href
                            ? "text-yellow-500"
                            : "text-gray-100 hover:text-yellow-500"
                            }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`uppercase text-xl tracking-wide transition-colors block ${pathname === item.href
                  ? "text-yellow-500"
                  : "hover:text-gray-300"
                  }`}
              >
                {item.name}
              </Link>
            ),
          )}

          <button
            className="text-left mt-2 block"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch className="text-lg hover:text-gray-300 transition-colors" />
          </button>
        </nav>

        {/* SOCIAL ICONS */}
        <div className="px-10 pb-10 mt-10">
          <div className="grid grid-cols-4 gap-y-6 gap-x-4 text-md text-white/90">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank" rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SEARCH OVERLAY ── */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 right-0 bottom-0 left-0 md:left-72 z-250 transition-opacity duration-300"
            style={{
              backgroundColor: isClosing ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.6)",
            }}
            onClick={closeSearch}
          />
          {/* Search Panel */}
          <div
            className="fixed top-0 left-0 md:left-72 right-0 z-260 bg-brandBlack"
            style={{
              animation: isClosing
                ? "searchSlideUp 0.3s ease-in forwards"
                : "searchSlideDown 0.35s ease-out",
            }}
          >
            <div className="w-full max-w-4xl mx-auto px-8 md:px-16 py-12 md:py-16">
              {/* Input Row */}
              <div className="relative flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-white text-3xl md:text-5xl font-serif tracking-wide placeholder:text-white/80 focus:outline-none border-none pb-4 pr-14"
                />
                <button
                  onClick={closeSearch}
                  className="group absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:rotate-90"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {/* Yellow underline */}
              <div className="h-[2px] w-full bg-brandYellow" />
              {/* Hint text */}
              <p className="mt-5 text-zinc-400 text-sm font-serif">
                Hit enter to search or ESC to close
              </p>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes searchSlideDown {
          from {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
          }
          to {
            opacity: 1;
            transform: scaleY(1);
            transform-origin: top;
          }
        }
        @keyframes searchSlideUp {
          from {
            opacity: 1;
            transform: scaleY(1);
            transform-origin: top;
          }
          to {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
          }
        }
      `}</style>
    </>
  );
}
