import { fetchProjects, fetchNews } from "@/lib/api";
import HomeClient from "./HomeClient.jsx";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import RecentPress from "./components/RecentPress";

export const metadata = {
  title: "Nasir Uddin | Software Engineer",
  description: "Software Engineer & Full-Stack Digital Marketer Building Impactful Digital Experiences.",
};

export default async function Home() {
  const projectsData = await fetchProjects();
  const newsData = await fetchNews();

  return (
    <HomeClient>
      <AboutSection />
      <ProjectSection projectsData={projectsData} />
      <RecentPress pressData={newsData} />
    </HomeClient>
  );
}
