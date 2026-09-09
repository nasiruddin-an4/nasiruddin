import { fetchEducations, fetchProjects } from "@/lib/api";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Nasir Uddin",
  description:
    "Nasir Uddin is a Software Engineer & Full-Stack Digital Marketer based in Dhaka. B.Sc. in Computer Science & Engineering (CSE) from Daffodil Institute of IT (DIIT), part of the Daffodil Family of institutions alongside Daffodil International University (DIU).",
  alternates: {
    canonical: "/about",
  },
};

export default async function About() {
  const projectsData = await fetchProjects();
  const educationRecords = await fetchEducations();
  const topProjects = projectsData.slice(0, 6);
  
  return (
    <AboutClient topProjects={topProjects} educationRecords={educationRecords} />
  );
}