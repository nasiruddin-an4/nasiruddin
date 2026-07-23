"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedHeading from "../components/AnimatedHeading";
import AboutHeroSlider from "../components/AboutHeroSlider";
import EducationGrid from "../components/EducationGrid";

export default function AboutClient({ topProjects, educationRecords }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3D Parallax and rotation effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  const imgRotateY = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  return (
    <main className="flex-1 w-full max-w-full bg-brandBlack min-h-screen text-[#f3f1ea] flex flex-col overflow-x-clip box-border" ref={containerRef}>
      {/* Full Bleed Draggable Hero Slider */}
      <AboutHeroSlider />

      <motion.div 
        className="relative w-full max-w-7xl mx-auto px-4 md:px-0 pb-10 mt-8 sm:mt-12 md:mt-20"
        style={{ perspective: 1200, scale, rotateX }}
      >
        {/* Vertical dossier spine — signature element, desktop only */}
        <div className="hidden lg:flex absolute -left-16 top-0 bottom-0 w-10 items-start justify-center">
          <span
            className="font-oswald text-xs tracking-[0.35em] text-[#5a5a56] uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Profile — 002 / About
          </span>
        </div>

        {/* Header Block */}
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-14 border-b border-[#2a2a27] pb-6 sm:pb-8 md:pb-10"
          style={{ y: y1 }}
        >
          <AnimatedHeading
            className="font-oswald font-bold uppercase text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight"
            initialColor="text-brandBlack"
            finalColor="text-brandBlack"
          >
            About Nasir
          </AnimatedHeading>

          <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap gap-x-3 gap-y-2">
            {[
              "Software Engineer",
              "Full-Stack Digital Marketer",
              "AI-Powered Web Solutions",
            ].map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                <span className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-wide text-[#c9c9c4]">
                  {role}
                </span>
                {i < 3 && <span className="text-[#fceb3b]">/</span>}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-20" style={{ transformStyle: "preserve-3d" }}>
          {/* Main Bio Content */}
          <motion.div className="lg:col-span-7 flex flex-col order-2 lg:order-1" style={{ y: y1 }}>
            <h2 className="font-oswald uppercase leading-snug md:leading-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 sm:mb-7 md:mb-9 text-[#f3f1ea]">
              Building responsive, user-friendly, and
              high-performance digital solutions.
            </h2>

            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-[#a8a8a3] text-sm sm:text-base md:text-lg lg:text-xl font-serif leading-relaxed">
              <p>
                I am a Software Engineer and Full-Stack Digital Marketer with
                experience in developing modern web applications, corporate
                websites, enterprise dashboards, and digital products. I have a
                strong interest in creating responsive, user-friendly, and
                high-performance digital solutions that support business growth
                and enhance user experience.
              </p>

              <p>
                I enjoy combining software engineering with digital marketing to
                build impactful digital experiences. By leveraging modern web
                technologies and AI-powered tools, I continuously strive to
                deliver innovative, efficient, and business-focused solutions.
              </p>

              {/* Signature pull quote — oversized mark instead of a plain border box */}
              <div className="relative my-8 sm:my-10 md:my-14 pl-8 sm:pl-10 md:pl-14">
                <span
                  className="absolute -left-1 -top-1 sm:-top-1 md:-top-1 font-oswald text-[80px] sm:text-[100px] md:text-[130px] leading-none text-[#fceb3b]/90 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="relative font-oswald text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-tight text-[#f3f1ea]">
                  Code meets creativity.
                </p>
              </div>



              <p className="pt-6 sm:pt-8">
                I bring a unique blend of technical proficiency and marketing
                expertise — bridging the gap between building great software
                and creating impactful digital experiences that drive real
                business results.
              </p>
            </div>
          </motion.div>

          {/* Right Column — press-badge sidebar */}
          <motion.div className="lg:col-span-5 h-full relative order-1 lg:order-2 hidden md:block" style={{ y: y2 }}>
            <div className="sticky top-24 space-y-6 sm:space-y-8" style={{ perspective: 1200 }}>
              <div className="w-[55%] sm:w-[65%] md:w-full mx-auto md:mx-0">
                <motion.div 
                  className="relative w-full aspect-square sm:aspect-3/4 md:aspect-4/5 bg-[#141412] border border-[#2a2a27] p-1 sm:p-2 shadow-2xl"
                  style={{ rotateY: imgRotateY, scale: imgScale }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="/surmatech.jpg"
                      alt="Nasir Uddin"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-1000 hover:scale-105 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brandBlack/60 to-transparent pointer-events-none" />

                    {/* Rotated stamp — signature detail on the badge */}
                    <div className="absolute top-4 -right-9 rotate-45">
                      <span className="block bg-[#fceb3b] text-brandBlack font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-10 py-1 shadow-md">
                        Available
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spec sheet card — replaces the plain paragraph block */}
              <motion.div 
                className="bg-[#141412] border border-[#2a2a27] shadow-xl"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <dl className="divide-y divide-[#2a2a27]">
                  {[
                    { label: "Role", value: "Software Engineer / Digital Marketer" },
                    { label: "Based in", value: "Dhaka, Bangladesh" },
                    { label: "Status", value: "Open to Full-Stack & Marketing roles" },
                    { label: "Focus", value: "Software Engineering, Digital Marketing, AI Solutions" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
                    >
                      <dt className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#5a5a56]">
                        {row.label}
                      </dt>
                      <dd className="font-sans text-xs sm:text-sm text-[#f3f1ea] text-right">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-[#2a2a27]">
                  <p className="font-oswald text-[#fceb3b] font-bold text-sm sm:text-base uppercase tracking-wide">
                    Let&apos;s connect →
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full bg-[#0a0a0a] pt-10 pb-10 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <EducationGrid educationRecords={educationRecords} />
      </div>

    </main>
  );
}
