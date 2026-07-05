"use client";

import {
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCode,
} from "react-icons/fa";
import Footer from "../components/Footer";
import AnimatedHeading from "../components/AnimatedHeading";
import socialLinks from "@/data/social.json";

export default function CVPage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="flex-1 w-full flex flex-col relative bg-zinc-950 min-h-screen font-serif">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-brandYellow/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="pt-24 pb-12 px-6 md:px-12 lg:px-20 container mx-auto print:pt-8 print:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-800 pb-10 print:border-brandBlack">
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 font-serif print:text-brandBlack">
              Nasir Uddin
              <span className="text-brandYellow print:text-brandBlack">.</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-medium mb-6 font-serif print:text-zinc-800">
              Software Engineer{" "}
              <span className="text-brandYellow mx-2">&bull;</span>Full-Stack
              Digital Marketer{" "}
              <span className="text-brandYellow mx-2">&bull;</span> Web
              Developer
            </p>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-zinc-300 print:text-brandBlack text-sm md:text-base font-light">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brandYellow print:bg-transparent print:text-brandBlack shrink-0">
                  <FaMapMarkerAlt />
                </span>
                <span>Savar, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brandYellow print:bg-transparent print:text-brandBlack shrink-0">
                  <FaPhoneAlt />
                </span>
                <span>+880 1XX XXXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brandYellow print:bg-transparent print:text-brandBlack shrink-0">
                  <FaEnvelope />
                </span>
                <a
                  href="mailto:your.email@example.com"
                  className="hover:text-white print:text-brandBlack hover:underline transition-all"
                >
                  your.email@example.com
                </a>
              </div>
              {socialLinks.find((s) => s.name === "LinkedIn") && (
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brandYellow print:bg-transparent print:text-brandBlack shrink-0">
                    <FaLinkedin />
                  </span>
                  <a
                    href={socialLinks.find((s) => s.name === "LinkedIn").url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white print:text-brandBlack hover:underline transition-all"
                  >
                    linkedin.com/in/nasiruddna4
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brandYellow print:bg-transparent print:text-brandBlack shrink-0">
                  <FaGithub />
                </span>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white print:text-brandBlack hover:underline transition-all"
                >
                  github.com/nasiruddin
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-start md:justify-end print:hidden">
            <button
              onClick={handleDownload}
              className="group relative cursor-pointer flex items-center gap-3 bg-brandYellow text-brandBlack px-8 py-4 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.2)]"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <FaDownload className="relative z-10 text-xl" />
              <span className="relative z-10">Download CV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] gap-12 xl:gap-20 mt-12 print:grid-cols-1 print:gap-8">
          {/* Main Content Column (Left) */}
          <div className="space-y-16">
            {/* About Me */}
            <section>
              <h2 className="text-2xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-brandYellow print:bg-brandBlack"></span>
                About Me
              </h2>
              <div className="bg-zinc-900/50 print:bg-transparent rounded-2xl p-6 md:p-8 border border-zinc-800 print:border-none print:p-0">
                <p className="text-zinc-300 print:text-brandBlack leading-relaxed text-base md:text-lg mb-6 font-light">
                  I am a Software Engineer and Full-Stack Digital Marketer with
                  experience in developing modern web applications, corporate
                  websites, enterprise dashboards, and digital products. I have
                  a strong interest in creating responsive, user-friendly, and
                  high-performance digital solutions that support business
                  growth and enhance user experience.
                </p>
                <div className="w-full h-px bg-zinc-800 print:bg-zinc-300 my-6"></div>
                <p className="text-zinc-300 print:text-brandBlack leading-relaxed text-base md:text-lg font-light">
                  I enjoy combining software engineering with digital marketing
                  to build impactful digital experiences. By leveraging modern
                  web technologies and AI-powered tools, I continuously strive
                  to deliver innovative, efficient, and business-focused
                  solutions.
                </p>
              </div>
            </section>

            {/* Experience Timeline */}
            <section>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-2xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-4">
                  <span className="w-8 h-px bg-brandYellow print:bg-brandBlack"></span>
                  Employment History
                </h2>
              </div>

              <div className="relative pl-6 md:pl-8 border-l border-zinc-800 print:border-brandBlack space-y-12">
                {/* Exp 1 — Betopia Group */}
                <div className="relative group">
                  <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 print:bg-white border-2 border-brandYellow print:border-brandBlack group-hover:bg-brandYellow transition-colors duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="text-xl md:text-2xl text-white print:text-brandBlack font-bold group-hover:text-brandYellow transition-colors duration-300">
                      Software Engineer and Executive, Branding & Marketing Team
                    </h3>
                    <span className="text-zinc-500 print:text-zinc-600 text-sm md:text-base font-medium mt-1 md:mt-0 uppercase tracking-widest shrink-0">
                      Feb 2026 – Present
                    </span>
                  </div>
                  <p className="text-brandYellow print:text-zinc-800 text-lg font-medium mb-4">
                    Betopia Group
                  </p>
                  <div className="mb-4 inline-block bg-zinc-900 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded px-3 py-1">
                    <span className="text-xs uppercase tracking-widest text-zinc-500 print:text-zinc-500 mr-2">
                      Stack:
                    </span>
                    <span className="text-sm text-zinc-300 print:text-brandBlack">
                      React JS, Next JS, Tailwind CSS, JavaScript, SEO
                    </span>
                  </div>
                  <ul className="list-none space-y-3 text-zinc-400 print:text-brandBlack font-light text-base leading-relaxed">
                    {[
                      "Lead branding and digital marketing initiatives across multiple Betopia Group business units.",
                      "Plan and execute corporate website projects from concept to deployment.",
                      "Collaborate with leadership to develop digital brand identity and online presence.",
                      "Design and manage landing pages, marketing assets, and corporate communication materials.",
                      "Coordinate with developers, designers, and stakeholders to deliver high-quality digital products.",
                      "Support SEO optimization, content strategy, and performance improvement.",
                      "Maintain consistency across websites, dashboards, and digital platforms.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-brandYellow print:before:bg-brandBlack before:rounded-full"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exp 2 — DIU */}
                <div className="relative group">
                  <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 print:bg-white border-2 border-brandYellow print:border-brandBlack group-hover:bg-brandYellow transition-colors duration-300"></div>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="text-xl md:text-2xl text-white print:text-brandBlack font-bold group-hover:text-brandYellow transition-colors duration-300">
                      Full Stack Developer
                    </h3>
                    <span className="text-zinc-500 print:text-zinc-600 text-sm md:text-base font-medium mt-1 md:mt-0 uppercase tracking-widest shrink-0">
                      Jun 2024 – Jan 2026
                    </span>
                  </div>
                  <p className="text-brandYellow print:text-zinc-800 text-lg font-medium mb-4">
                    Daffodil International University (DIU)
                  </p>
                  <div className="mb-4 inline-block bg-zinc-900 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded px-3 py-1">
                    <span className="text-xs uppercase tracking-widest text-zinc-500 print:text-zinc-500 mr-2">
                      Stack:
                    </span>
                    <span className="text-sm text-zinc-300 print:text-brandBlack">
                      React JS, Next JS, Tailwind CSS, Bootstrap, JavaScript
                    </span>
                  </div>
                  <ul className="list-none space-y-3 text-zinc-400 print:text-brandBlack font-light text-base leading-relaxed">
                    {[
                      "Conducted user research to improve usability and overall user experience.",
                      "Designed wireframes, user flows, and interactive prototypes for new features.",
                      "Developed and maintained responsive web applications using React JS, Next JS, Tailwind CSS, and Bootstrap.",
                      "Collaborated closely with designers and stakeholders to convert UI/UX designs into functional components.",
                      "Implemented reusable components and optimized performance for improved efficiency.",
                      "Worked on multiple institutional web platforms used by a large number of users.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-zinc-600 print:before:bg-zinc-400 before:rounded-full group-hover:before:bg-brandYellow transition-colors duration-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Previous Engagements */}
                <div className="relative pt-6">
                  <h3 className="text-lg text-white print:text-brandBlack font-bold mb-6 tracking-widest uppercase pb-2 border-b border-zinc-800 print:border-zinc-300">
                    Previous Engagements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* DIIT */}
                    <div>
                      <h4 className="text-white print:text-brandBlack font-semibold">
                        Assistant Officer, Creative & Digital Marketing
                      </h4>
                      <div className="flex items-center text-sm my-1">
                        <span className="text-brandYellow print:text-zinc-800 font-medium mr-2">
                          DAFFODIL INSTITUTE OF IT (DIIT)
                        </span>
                        <span className="text-zinc-500">
                          Nov 2021 – Jun 2024
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 print:text-zinc-800 font-light mt-2 line-clamp-3">
                        Managed social media platforms and executed digital
                        marketing campaigns. Designed graphics, videos, and
                        promotional content.
                      </p>
                    </div>
                    {/* SurmaTechZone */}
                    <div>
                      <h4 className="text-white print:text-brandBlack font-semibold">
                        Social Media Creative Designer
                      </h4>
                      <div className="flex items-center text-sm my-1">
                        <span className="text-brandYellow print:text-zinc-800 font-medium mr-2">
                          SURMATECHZONE
                        </span>
                        <span className="text-zinc-500">
                          Jun 2023 – Dec 2023
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 print:text-zinc-800 font-light mt-2 line-clamp-3">
                        Designed social media creatives and visual assets.
                        Conducted research to improve content effectiveness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notable Projects */}
            <section>
              <h2 className="text-2xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-brandYellow print:bg-brandBlack"></span>
                Notable Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Betopia Group",
                    desc: "Corporate website representing Betopia Group and its ecosystem of 22+ business units with responsive, modern interfaces.",
                  },
                  {
                    name: "Muhammad Monir Hossain",
                    desc: "Official personal portfolio website for the Founder & CEO of Betopia Group, showcasing professional profile and achievements.",
                  },
                  {
                    name: "Betopia Limited",
                    desc: "Corporate website with responsive layouts and optimized frontend performance for the company's digital branding.",
                  },
                  {
                    name: "Betopia Daily",
                    desc: "Internal e-commerce platform for employee grocery and daily essentials ordering with responsive interfaces.",
                  },
                  {
                    name: "Daffodil HR Portal",
                    desc: "Frontend features for the HR management portal, improving usability and employee access to HR services.",
                  },
                  {
                    name: "DIU Media Corner",
                    desc: "Centralized media portal for university news and announcements with responsive content layouts.",
                  },
                  {
                    name: "DIIT Official Website",
                    desc: "Developed and maintained the institute's official website, enhancing responsiveness and user experience.",
                  },
                  {
                    name: "DIU Faculty Directory",
                    desc: "University faculty directory platform with improved accessibility and enhanced navigation for students and staff.",
                  },
                ].map((project, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900/50 print:bg-transparent p-5 rounded-lg border border-zinc-800 print:border-zinc-300 hover:border-brandYellow/50 transition-all duration-300 group"
                  >
                    <h4 className="text-white print:text-brandBlack font-semibold text-base mb-2 group-hover:text-brandYellow transition-colors flex items-center gap-2">
                      <FaCode className="text-brandYellow text-sm shrink-0" />
                      {project.name}
                    </h4>
                    <p className="text-sm text-zinc-400 print:text-zinc-600 font-light leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column (Right) */}
          <div className="space-y-12">
            {/* Core Skills */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                Web & Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
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
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-zinc-900/80 print:bg-transparent border border-zinc-800 print:border-zinc-400 text-zinc-300 print:text-brandBlack px-4 py-2 rounded text-sm font-medium hover:border-brandYellow hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Digital Marketing Skills */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                Digital Marketing
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Social Media Marketing",
                  "Campaign Planning",
                  "Content Strategy",
                  "Performance Marketing",
                  "SEO Optimization",
                  "Analytics & Reporting",
                  "Lead Generation",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-zinc-900/80 print:bg-transparent border border-zinc-800 print:border-zinc-400 text-zinc-300 print:text-brandBlack px-4 py-2 rounded text-sm font-medium hover:border-brandYellow hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* AI Tools */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                AI Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "ChatGPT",
                  "Midjourney",
                  "Google AI Studio",
                  "Canva AI",
                  "Adobe Firefly",
                  "Meta AI",
                ].map((tool, index) => (
                  <span
                    key={index}
                    className="bg-zinc-900/80 print:bg-transparent border border-zinc-800 print:border-zinc-400 text-zinc-300 print:text-brandBlack px-4 py-2 rounded text-sm font-medium hover:border-brandYellow hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                Education
              </h2>
              <div className="space-y-6">
                <div className="group border-l-2 border-transparent hover:border-brandYellow pl-4 transition-all">
                  <h3 className="text-white print:text-brandBlack font-bold">
                    B.Sc. (Eng.) in CSE
                  </h3>
                  <p className="text-zinc-400 print:text-zinc-700 text-sm mt-1">
                    Daffodil Institute of IT (DIIT)
                  </p>
                  <p className="text-brandYellow print:text-brandBlack font-bold text-sm mt-1">
                    2025
                  </p>
                </div>
                <div className="group border-l-2 border-transparent hover:border-brandYellow pl-4 transition-all">
                  <h3 className="text-white print:text-brandBlack font-bold">
                    HSC
                  </h3>
                  <p className="text-zinc-400 print:text-zinc-700 text-sm mt-1">
                    Nindupur M.K. Alomgir High School and College
                  </p>
                  <p className="text-brandYellow print:text-brandBlack font-bold text-sm mt-1">
                    2019
                  </p>
                </div>
                <div className="group border-l-2 border-transparent hover:border-brandYellow pl-4 transition-all">
                  <h3 className="text-white print:text-brandBlack font-bold">
                    SSC
                  </h3>
                  <p className="text-zinc-400 print:text-zinc-700 text-sm mt-1">
                    Nandarpur Union High School
                  </p>
                  <p className="text-brandYellow print:text-brandBlack font-bold text-sm mt-1">
                    2017
                  </p>
                </div>
              </div>
            </section>

            {/* Soft Skills */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Team Collaboration",
                  "Problem Solving",
                  "Communication",
                  "Time Management",
                  "Adaptability",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-zinc-900/80 print:bg-transparent border border-zinc-800 print:border-zinc-400 text-zinc-300 print:text-brandBlack px-4 py-2 rounded text-sm font-medium hover:border-brandYellow hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Personal Details */}
            <section>
              <h2 className="text-xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brandYellow print:bg-brandBlack"></span>
                Personal Info
              </h2>
              <ul className="space-y-3 text-sm text-zinc-300 print:text-brandBlack font-light bg-zinc-900/30 print:bg-transparent p-6 rounded border border-zinc-800/50 print:border-zinc-300">
                <li className="flex justify-between border-b border-zinc-800/50 print:border-zinc-200 pb-2">
                  <span className="text-zinc-500">Gender</span>{" "}
                  <span className="font-medium text-white print:text-brandBlack">
                    Male
                  </span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/50 print:border-zinc-200 pb-2">
                  <span className="text-zinc-500">Nationality</span>{" "}
                  <span className="font-medium text-white print:text-brandBlack">
                    Bangladeshi
                  </span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/50 print:border-zinc-200 pb-2">
                  <span className="text-zinc-500">Location</span>{" "}
                  <span className="font-medium text-white print:text-brandBlack">
                    Savar, Dhaka
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Creative & Design Skills - Full Width */}
        <section className="mt-20 border-t border-zinc-800 print:border-brandBlack pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <h2 className="text-2xl text-white print:text-brandBlack font-bold uppercase tracking-widest flex items-center gap-4">
              <span className="w-8 h-px bg-brandYellow print:bg-brandBlack"></span>
              Creative & Design Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Social Media Creatives",
              "Video & Promotional Content Design",
              "Branding & Visual Identity",
              "UI/UX for Marketing Landing Pages",
              "Landing Page Design & Optimization",
              "Basic SEO & Performance Optimization",
              "WordPress & Website Maintenance",
              "Funnel Optimization",
            ].map((skill, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 print:bg-transparent p-5 rounded-lg border border-zinc-800 print:border-zinc-300 hover:border-brandYellow/50 transition-all duration-300 group"
              >
                <h4 className="text-white print:text-brandBlack font-semibold text-sm group-hover:text-brandYellow transition-colors">
                  {skill}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Declaration & Signature */}
        <div className="mt-20 pt-16 border-t border-zinc-800 print:border-brandBlack flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="w-full md:w-2/3">
            <p className="text-zinc-400 print:text-brandBlack font-light italic mb-8 border-l-2 border-brandYellow print:border-brandBlack pl-4">
              I, do hereby, declare that all the above information provided are
              accurate to the best of my knowledge & belief.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-auto items-start md:items-end">
            <div
              className="text-5xl text-white print:text-brandBlack mb-1 opacity-80"
              style={{
                fontFamily: "cursive, 'Brush Script MT', 'Great Vibes'",
              }}
            >
              Nasir
            </div>
            <div className="w-48 h-px bg-zinc-600 print:bg-brandBlack mb-3"></div>
            <p className="text-white print:text-brandBlack font-bold uppercase tracking-widest text-sm">
              Nasir Uddin
            </p>
          </div>
        </div>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
