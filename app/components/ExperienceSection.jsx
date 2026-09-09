"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { ExperienceCard } from "./ExperienceGrid";

export default function ExperienceSection({ experiencesData = [] }) {
  const recentExperiences = experiencesData.slice(0, 4);

  if (recentExperiences.length === 0) return null;

  return (
    <section className="w-full bg-[#0a0a0a] text-white flex flex-col py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <div className="mb-4">
              <AnimatedHeading
                className="text-2xl md:text-3xl lg:text-4xl"
                initialColor="text-brandBlack"
                finalColor="text-brandBlack"
              >
                MY JOURNEY
              </AnimatedHeading>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold max-w-2xl">
              Experience Journey
            </h3>
            <p className="mt-4 text-zinc-400 text-lg md:text-xl font-serif max-w-2xl">
              A timeline of the roles and companies that shaped my path as a software engineer.
            </p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <Link href="/experience">
              <button className="bg-transparent hover:bg-white text-white hover:text-brandBlack border border-white transition-colors duration-300 px-6 py-4 uppercase tracking-widest text-sm font-bold">
                View Full Experience
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {recentExperiences.map((exp, idx) => (
            <ExperienceCard key={exp.id || idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
