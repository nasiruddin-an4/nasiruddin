import { fetchEducations, fetchProjects } from "@/lib/api";
import AboutClient from "./AboutClient";

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
    <AboutClient topProjects={topProjects} educationRecords={educationRecords} />
  );
}