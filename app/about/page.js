import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "../components/AnimatedHeading";
import AboutHeroSlider from "../components/AboutHeroSlider";
import EducationGrid from "../components/EducationGrid";
import { fetchEducations, fetchProjects } from "@/lib/api";
export const metadata = {
  title: "About | Nasir Uddin",
  description:
    "Learn more about Nasir Uddin — Software Engineer & Full-Stack Digital Marketer with experience in React, Next.js, and modern web development.",
};

export default async function About() {
  const projectsData = await fetchProjects();
  const educationRecords = await fetchEducations();
  const topProjects = projectsData.slice(0, 6);
  return (
    <main className="flex-1 w-full max-w-full bg-brandBlack min-h-screen text-[#f3f1ea] flex flex-col overflow-x-clip box-border">
      {/* Full Bleed Draggable Hero Slider */}
      <AboutHeroSlider />

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-0 mb-12 sm:mb-16 md:mb-24 mt-8 sm:mt-12 md:mt-20">
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
        <div className="mb-8 sm:mb-10 md:mb-14 border-b border-[#2a2a27] pb-6 sm:pb-8 md:pb-10">

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
              "React & Next.js Developer",
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
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
          {/* Main Bio Content */}
          <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
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

              {/* Notable Projects — indexed casefile, not a bullet list */}
              <div className="mt-6 sm:mt-8 md:mt-12">
                <div className="flex items-baseline justify-between border-b border-[#2a2a27] pb-3 mb-4 sm:mb-6">
                  <h3 className="font-oswald text-lg sm:text-xl md:text-2xl font-bold uppercase text-[#f3f1ea]">
                    Notable Projects
                  </h3>
                  <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#5a5a56]">
                    {String(topProjects.length).padStart(2, "0")} Records
                  </span>
                </div>

                <ul>
                  {topProjects.map((project, i) => (
                    <li
                      key={project.id}
                      className="group border-b border-[#1c1c19] last:border-b-0"
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] items-start gap-x-3 sm:gap-x-6 py-4 sm:py-5 cursor-pointer"
                      >
                        <span className="font-oswald text-sm sm:text-base text-[#5a5a56] pt-0.5 group-hover:text-[#fceb3b] transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-sans font-semibold text-sm sm:text-base md:text-lg text-[#f3f1ea] group-hover:text-[#fceb3b] transition-colors">
                            {project.title}
                          </p>
                          <p className="font-serif text-xs sm:text-sm md:text-base text-[#8a8a86] mt-1 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <span className="hidden sm:inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-[#fceb3b] border border-[#3a3a34] rounded-full px-3 py-1 h-fit self-center whitespace-nowrap group-hover:bg-[#fceb3b] group-hover:text-brandBlack transition-colors">
                          {project.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pt-6 sm:pt-8">
                I bring a unique blend of technical proficiency and marketing
                expertise — bridging the gap between building great software
                and creating impactful digital experiences that drive real
                business results.
              </p>
            </div>
          </div>

          {/* Right Column — press-badge sidebar */}
          <div className="lg:col-span-5 h-full relative order-1 lg:order-2 hidden md:block">
            <div className="sticky top-24 space-y-6 sm:space-y-8">
              <div className="w-[55%] sm:w-[65%] md:w-full mx-auto md:mx-0">
                <div className="relative w-full aspect-square sm:aspect-3/4 md:aspect-4/5 bg-[#141412] border border-[#2a2a27] p-1 sm:p-2">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="/Hero.webp"
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
                </div>
              </div>

              {/* Spec sheet card — replaces the plain paragraph block */}
              <div className="bg-[#141412] border border-[#2a2a27]">
                <dl className="divide-y divide-[#2a2a27]">
                  {[
                    { label: "Role", value: "Software Engineer / Marketer" },
                    { label: "Based in", value: "Savar, Dhaka" },
                    { label: "Status", value: "Open to opportunities" },
                    { label: "Focus", value: "Frontend, React, Next.js" },
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#0a0a0a] pt-10 pb-10">
        <EducationGrid educationRecords={educationRecords} />
      </div>

    </main>
  );
}