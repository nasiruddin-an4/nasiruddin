"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import Footer from "@/app/components/Footer";
import projectsData from "@/data/projects.json";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

const categories = [
  "All",
  "Corporate Website",
  "Portfolio",
  "E-Commerce",
  "Enterprise Dashboard",
  "Web Application",
  "Institutional Website",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <main className="flex-1 w-full bg-brandBlack min-h-screen text-white flex flex-col">
      {/* ── Header & Stats ── */}
      <div className="pt-10 md:pt-20 pb-10 px-4 md:px-12 lg:px-16 mb-8 border-b border-zinc-800/50">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Left Side: Title & Description */}
          <div className="flex-1">
            <AnimatedHeading className="text-3xl md:text-5xl">
              Projects
            </AnimatedHeading>
            <p className="mt-6 text-zinc-500 text-base md:text-lg font-serif max-w-xl">
              A showcase of web applications, corporate websites, and digital
              products I&apos;ve built using modern technologies.
            </p>
          </div>

          {/* Right Side: Stats Data */}
          <div className="flex flex-wrap gap-8 md:gap-12 pt-6 lg:pt-0">
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl text-brandYellow font-bold">
                {projectsData.length}+
              </span>
              <span className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest mt-2 font-semibold">
                Projects
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl text-brandYellow font-bold">
                {new Set(projectsData.flatMap((p) => p.tech)).size}+
              </span>
              <span className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest mt-2 font-semibold">
                Technologies
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl text-brandYellow font-bold">
                {new Set(projectsData.map((p) => p.category)).size}
              </span>
              <span className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest mt-2 font-semibold">
                Categories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 text-xs font-serif transition-all duration-300 rounded-full border ${activeCategory === cat
                  ? "bg-white text-brandBlack border-white"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── All Projects Grid ── */}
      <section className="px-6 md:px-12 lg:px-16 mb-16 flex-1">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {filteredProjects.map((project, i) => (
              <motion.div
                custom={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.15 }}
                key={project.id}
                className="flex flex-col gap-6 group"
              >
                {/* Image Container with 3D Hover */}
                <Link href={`/projects/${project.id}`}>
                  <motion.div
                    className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                    style={{ perspective: 1200 }}
                  >
                    <motion.div
                      className="w-full h-full origin-center"
                      whileHover={{ rotateX: 4, rotateY: -6, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-brandBlack/20 group-hover:bg-transparent transition-colors duration-500" />
                    </motion.div>

                    {/* Plus Button */}
                    <div className="absolute bottom-5 right-5 w-12 h-12 bg-white text-brandBlack group-hover:bg-brandYellow rounded-full flex items-center justify-center text-3xl font-light transition-colors duration-300 z-10 shadow-2xl pointer-events-none">
                      +
                    </div>
                  </motion.div>
                </Link>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-brandYellow transition-colors duration-300">
                    <Link href={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base font-serif leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-zinc-800/60 text-zinc-400 text-xs rounded-full border border-zinc-700/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg font-serif">
              No projects found in this category.
            </p>
          </div>
        )}
      </section>

      {/* ── Tech Stack Overview ── */}
      <section className="px-6 md:px-12 lg:px-16 mb-20">
        <div className="relative bg-[#1a1a1a] border border-zinc-800/60 overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-brandYellow" />
          <div className="p-8 md:p-12 lg:p-16">
            <h3 className="text-2xl md:text-3xl uppercase tracking-wider mb-8 flex items-center gap-3">
              <FaCode className="text-brandYellow" />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "React JS",
                "Next.js",
                "Tailwind CSS",
                "Bootstrap",
                "Node.js",
                "Express.js",
                "Git & GitHub",
                "REST API",
                "WordPress",
                "Figma",
                "SEO",
                "Responsive Design",
                "ChatGPT",
                "Google AI Studio",
              ].map((tech, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/80 border border-zinc-800 hover:border-brandYellow/50 px-4 py-3 rounded text-center text-sm text-zinc-300 hover:text-brandYellow transition-all duration-300 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
