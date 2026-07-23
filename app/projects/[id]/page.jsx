import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProjects } from "@/lib/api";
import { MoveLeft } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Footer from "@/app/components/Footer";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const projectsData = await fetchProjects();
  const project = projectsData.find((item) => item.id.toString() === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Nasir Uddin`,
    description: project.description ? project.description.substring(0, 160) : `View ${project.title} by Nasir Uddin.`,
  };
}

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const projectsData = await fetchProjects();
  const project = projectsData.find((item) => item.id.toString() === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brandBlack text-white overflow-hidden pb-20">
      {/* Hero Section */}
      <section className="relative pt-14 pb-5 px-4 md:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-12 group"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO PROJECTS
          </Link>

          <header className="mb-0">
            <div className="flex items-center gap-4 mb-6 text-sm uppercase tracking-widest font-bold">
              <span className="text-brandYellow">{project.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6">
              {project.title}
            </h1>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs md:text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2 rounded-full font-sans tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pb-6">
              {project.liveUrl && project.liveUrl !== "#" && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm md:text-base text-brandBlack bg-brandYellow hover:bg-white px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-colors"
                >
                  <FaExternalLinkAlt /> Live Demo
                </Link>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm md:text-base text-white border border-zinc-700 hover:border-brandYellow hover:text-brandYellow px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-colors"
                >
                  <FaGithub /> Source Code
                </Link>
              )}
            </div>
          </header>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {project.image && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl">
              <Image
                src={project.image}
                alt={project.title || "Project Image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-4xl mx-auto text-zinc-300 leading-relaxed font-sans font-light text-lg md:text-xl space-y-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">About The Project</h2>
            <p>{project.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
