import { fetchProjects } from "@/lib/api";
import HomeClient from "./HomeClient.jsx";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import ReadThisSection from "./components/ReadThisSection";


export const metadata = {
  title: "Nasir Uddin | Software Engineer",
  description: "Software Engineer & Full-Stack Digital Marketer Building Impactful Digital Experiences.",
};

export default async function Home() {
  const projectsData = await fetchProjects();

  return (
    <HomeClient>
      <AboutSection />
      <ProjectSection projectsData={projectsData} />
      <ReadThisSection />
    </HomeClient>
  );
}
