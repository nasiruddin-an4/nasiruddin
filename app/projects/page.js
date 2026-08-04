import { fetchProjects } from "@/lib/api";
import ProjectsClient from "./ProjectsClient.jsx";

export const metadata = {
  title: "Projects | Nasir Uddin",
  description: "A showcase of web applications, corporate websites, and digital products built by Nasir Uddin using React, Next.js, and modern technologies.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projectsData = await fetchProjects();

  return <ProjectsClient projectsData={projectsData} />;
}
