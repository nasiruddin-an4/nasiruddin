import Footer from "../components/Footer";
import ExperienceHero from "../components/ExperienceHero";
import ExperienceGrid from "../components/ExperienceGrid";
import experiences from "../../data/experience.json";
import RecentPress from "../components/RecentPress";

export const metadata = {
  title: "Experience | Nasir Uddin",
  description: "Professional experience of Nasir Uddin — Software Engineer & Full-Stack Digital Marketer.",
};

export default async function Experience() {
  return (
    <main className="flex-1 w-full bg-[#0a0a0a] text-white flex flex-col">
      <ExperienceHero />

      <div className="w-full bg-[#0a0a0a] pt-24">
        {/* Experience Grid Component */}
        <ExperienceGrid experiences={experiences} />
      </div>

      <RecentPress />

      <Footer />
    </main>
  );
}
