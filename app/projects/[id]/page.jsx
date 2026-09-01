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
  const desc = project.aboutText || project.description || `View ${project.title} by Nasir Uddin.`;
  return {
    title: `${project.title} | Nasir Uddin`,
    description: desc.substring(0, 160),
    alternates: {
      canonical: `/projects/${id}`,
    },
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
      
      {/* 1. Cover Image Hero */}
      {(project.coverImage || project.image) && (
        <section className="relative w-full h-[60vh] md:h-[80vh]">
          <Image
            src={project.coverImage || project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full px-4 md:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto relative z-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-6 group"
              >
                <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                BACK TO PROJECTS
              </Link>
              
              <div className="flex items-center gap-4 mb-4 text-sm uppercase tracking-widest font-bold">
                <span className="text-brandYellow bg-brandYellow/10 px-3 py-1 rounded-full">{project.category}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-8xl mb-6 font-bold">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs md:text-sm bg-black/50 backdrop-blur-sm text-zinc-300 border border-zinc-700/50 px-4 py-2 rounded-full font-sans tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* If no cover image exists, render a simple header */}
        {!(project.coverImage || project.image) && (
          <header className="pt-20 pb-12 border-b border-zinc-900">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-12 group"
            >
              <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              BACK TO PROJECTS
            </Link>
            <div className="flex items-center gap-4 mb-6 text-sm uppercase tracking-widest font-bold">
              <span className="text-brandYellow">{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, index) => (
                <span key={index} className="text-xs md:text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2 rounded-full font-sans tracking-wide">{tech}</span>
              ))}
            </div>
          </header>
        )}

        {/* 2. About Project */}
        <section className="py-16 md:py-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-brandYellow pl-6">About The Project</h2>
          <div className="text-zinc-300 leading-relaxed font-sans font-light text-lg space-y-6">
            {(project.aboutText || project.description || "").split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 3. Middle Break Image */}
        {project.middleImage && (
          <section className="py-10">
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <Image src={project.middleImage} alt="Feature View" fill className="object-cover" />
            </div>
          </section>
        )}

        {/* 4. Problem & Solution */}
        {(project.problemStatement || project.solutionText) && (
          <section className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {project.problemStatement && (
                <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">01</span>
                    The Problem
                  </h3>
                  <div className="text-zinc-400 leading-relaxed font-light text-lg">
                    {project.problemStatement.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                  </div>
                </div>
              )}
              {project.solutionText && (
                <div className="bg-brandYellow/5 p-8 rounded-3xl border border-brandYellow/10">
                  <h3 className="text-2xl font-bold text-brandYellow mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brandYellow/20 text-brandYellow flex items-center justify-center text-sm">02</span>
                    The Solution
                  </h3>
                  <div className="text-zinc-300 leading-relaxed font-light text-lg">
                    {project.solutionText.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Showcase Images Gallery */}
        {project.showcaseImages && project.showcaseImages.length > 0 && (
          <section className="py-16 md:py-24">
            <h2 className="text-3xl font-bold text-center text-white mb-16">Visual Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.showcaseImages.map((img, idx) => (
                <div key={idx} className={`relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl ${idx === 2 && project.showcaseImages.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <Image src={img} alt={`Showcase ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Call to Action / URLs */}
        <section className="py-24 border-t border-zinc-900 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">Ready to explore?</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {project.liveUrl && project.liveUrl !== "#" && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg text-brandBlack bg-brandYellow hover:bg-white px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-colors"
              >
                <FaExternalLinkAlt /> Live Demo
              </Link>
            )}
            {project.githubUrl && project.githubUrl !== "#" && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg text-white border border-zinc-700 hover:border-brandYellow hover:text-brandYellow px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-colors"
              >
                <FaGithub /> Source Code
              </Link>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
