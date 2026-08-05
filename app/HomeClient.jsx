"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomeClient({ children }) {
  return (
    <>
      <main className="flex-1 w-full flex flex-col relative bg-brandBlack">
        {/* Hero Section */}
        <HeroGeometric 
          badge="Welcome! Let's solve your problems together."
          title1="Nasir Uddin"
          title2="Software Engineer & Marketer"
          description="Hi, I'm Nasir — a Full-Stack Software Engineer and Digital Marketer based in Dhaka. I build high-performance web applications and marketing strategies designed to grow your business."
          actions={
            <>
              <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
                View My Work
                <Sparkles className="w-4 h-4" />
              </Link>
            </>
          }
        />

        {children}
      </main>

    </>
  );
}
