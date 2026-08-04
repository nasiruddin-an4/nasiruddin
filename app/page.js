import { fetchProjects, fetchNews } from "@/lib/api";
import HomeClient from "./HomeClient.jsx";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import RecentPress from "./components/RecentPress";

export const metadata = {
  title: "Nasir Uddin | Software Engineer & Full-Stack Digital Marketer",
  description: "Nasir Uddin is a Software Engineer and Digital Marketer from Dhaka, specializing in building modern web applications, scalable solutions, and driving digital growth. Check out my projects and experience.",
  alternates: {
    canonical: "/",
  },
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
