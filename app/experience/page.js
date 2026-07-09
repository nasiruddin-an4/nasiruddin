import ExperienceHero from "../components/ExperienceHero";
import ExperienceGrid from "../components/ExperienceGrid";
import { FaCode } from "react-icons/fa";
import { fetchExperiences, fetchNews } from "@/lib/api";
import RecentPress from "../components/RecentPress";

export const metadata = {
  title: "Experience | Nasir Uddin",
  description: "Professional experience of Nasir Uddin — Software Engineer & Full-Stack Digital Marketer.",
};

export default async function Experience() {
  const rawExperiences = await fetchExperiences();
  
  // Parse end date for sorting. "Present" is Infinity.
  const parseEndDate = (duration) => {
    if (!duration) return 0;
    const parts = duration.split(/[-–]/).map(s => s.trim());
    const endStr = parts.length > 1 ? parts[1] : parts[0];
    if (endStr.toLowerCase() === 'present' || endStr.toLowerCase() === 'current') return Infinity;
    const date = new Date(endStr);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  // Parse start date for secondary sorting.
  const parseStartDate = (duration) => {
    if (!duration) return 0;
    const parts = duration.split(/[-–]/).map(s => s.trim());
    const date = new Date(parts[0]);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  const experiences = [...rawExperiences].sort((a, b) => {
    const aEnd = parseEndDate(a.duration);
    const bEnd = parseEndDate(b.duration);
    if (aEnd !== bEnd) return bEnd - aEnd;
    return parseStartDate(b.duration) - parseStartDate(a.duration);
  });

  const newsData = await fetchNews();
  return (
    <main className="flex-1 w-full bg-brandBlack text-white flex flex-col">
      <ExperienceHero />

      <div className="w-full bg-[#0a0a0a] pt-24">
        {/* Experience Grid Component */}
        <ExperienceGrid experiences={experiences} />
      </div>

      {/* ── Tech Stack Overview ── */}
      <section className="px-6 md:px-12 lg:px-16 mb-20 mt-20">
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

      <RecentPress pressData={newsData} />


    </main>
  );
}
