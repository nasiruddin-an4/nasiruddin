"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";


export default function ProjectSection({ projectsData = [] }) {
  // Take top 4 projects to display on the home screen
  const recentProjects = projectsData.slice(0, 4);

  return (
    <section className="w-full bg-brandBlack text-white flex flex-col py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <div className="mb-4">
              <AnimatedHeading
                className="text-2xl md:text-3xl lg:text-4xl"
                initialColor="text-brandBlack"
                finalColor="text-brandBlack"
              >
                MY WORK
              </AnimatedHeading>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold max-w-2xl">
              Recent Projects
            </h3>
            <p className="mt-4 text-zinc-400 text-lg md:text-xl font-serif max-w-2xl">
              A selection of my recent work in web development, design, and digital experiences.
            </p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <Link href="/projects">
              <button className="bg-transparent hover:bg-white text-white hover:text-brandBlack border border-white transition-colors duration-300 px-6 py-4 uppercase tracking-widest text-sm font-bold">
                View All Projects
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {recentProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <Link href={`/projects/${project.id}`}>
                <motion.div
                  className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer mb-6"
                  style={{ perspective: 1200 }}
                >
                  <motion.div
                    className="w-full h-full origin-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brandBlack/20 group-hover:bg-transparent transition-colors duration-500" />
                  </motion.div>
                  
                  {/* Plus Button overlay */}
                  <div className="absolute bottom-5 right-5 w-12 h-12 bg-white text-brandBlack group-hover:bg-[#fceb3b] rounded-full flex items-center justify-center text-3xl font-light transition-colors duration-300 z-10 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                    +
                  </div>
                </motion.div>
              </Link>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#fceb3b] transition-colors duration-300">
                <Link href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
              </h3>
              <p className="text-zinc-500 text-sm md:text-base font-serif leading-relaxed line-clamp-2 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((t, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-zinc-800/60 text-zinc-400 text-xs rounded-full border border-zinc-700/30"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-3 py-1 bg-zinc-800/60 text-zinc-400 text-xs rounded-full border border-zinc-700/30">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
