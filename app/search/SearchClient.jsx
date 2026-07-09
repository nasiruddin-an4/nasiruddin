"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PressCard from "../components/PressCard";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";

export default function SearchClient({ projects, experiences, educations, news, blogs }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  if (!query) {
    return (
      <div className="text-zinc-400 font-serif">
        Please enter a search term in the sidebar to begin searching.
      </div>
    );
  }

  const lowerQ = query.toLowerCase();

  const isProjectSearch = ['project', 'projects', 'portfolio'].includes(lowerQ);
  const isExperienceSearch = ['experience', 'experiences', 'job', 'work', 'career'].includes(lowerQ);
  const isEducationSearch = ['education', 'study', 'university', 'college', 'degree'].includes(lowerQ);
  const isNewsSearch = ['news', 'press', 'article', 'articles'].includes(lowerQ);
  const isBlogSearch = ['blog', 'blogs', 'post', 'posts'].includes(lowerQ);

  const filteredProjects = projects.filter(p => 
    isProjectSearch ||
    p.title?.toLowerCase().includes(lowerQ) || 
    p.description?.toLowerCase().includes(lowerQ) ||
    p.technologies?.some(t => t.toLowerCase().includes(lowerQ)) ||
    p.category?.toLowerCase().includes(lowerQ)
  );

  const filteredExperiences = experiences.filter(e => 
    isExperienceSearch ||
    e.role?.toLowerCase().includes(lowerQ) || 
    e.company?.toLowerCase().includes(lowerQ) ||
    (Array.isArray(e.description) 
      ? e.description.some(d => d.toLowerCase().includes(lowerQ))
      : e.description?.toLowerCase().includes(lowerQ))
  );

  const filteredEducations = educations.filter(e => 
    isEducationSearch ||
    e.degree?.toLowerCase().includes(lowerQ) || 
    e.institution?.toLowerCase().includes(lowerQ)
  );

  const filteredNews = news.filter(n => 
    isNewsSearch ||
    n.title?.toLowerCase().includes(lowerQ) || 
    n.shortDescription?.toLowerCase().includes(lowerQ)
  );

  const filteredBlogs = blogs.filter(b => 
    isBlogSearch ||
    b.title?.toLowerCase().includes(lowerQ) || 
    b.shortDescription?.toLowerCase().includes(lowerQ)
  );

  const results = {
    projects: filteredProjects,
    experiences: filteredExperiences,
    educations: filteredEducations,
    news: filteredNews,
    blogs: filteredBlogs
  };

  const totalResults = results.projects.length + results.experiences.length + results.educations.length + results.news.length + results.blogs.length;

  if (totalResults === 0) {
    return (
      <div className="text-zinc-400 font-serif">
        No results found for &quot;<span className="text-white">{query}</span>&quot;. Try another search term.
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <p className="text-brandYellow font-mono text-sm">Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{query}&quot;</p>

      {/* Projects */}
      {results.projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif border-b border-zinc-800 pb-2 mb-6">Projects ({results.projects.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.projects.map((project) => (
              <div key={project.id} className="bg-[#1a1a1a] rounded-lg p-6 border border-zinc-800/60 flex flex-col h-full hover:border-brandYellow/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif text-white group-hover:text-brandYellow transition-colors">{project.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 flex items-center gap-1.5">
                        <FaCode className="text-brandYellow" />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4 mt-auto pt-4 border-t border-zinc-800">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 hover:text-brandYellow transition-colors">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  <Link href="/projects" className="text-sm text-brandYellow flex items-center gap-2 hover:text-white transition-colors">
                    View in Projects
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {results.experiences.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif border-b border-zinc-800 pb-2 mb-6">Experience ({results.experiences.length})</h2>
          <div className="space-y-6">
            {results.experiences.map((exp) => (
              <div key={exp.id} className="bg-[#1a1a1a] p-6 rounded-lg border border-zinc-800/60">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brandYellow">{exp.role}</h3>
                    <p className="text-white text-lg">{exp.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span className="text-zinc-400 block">{exp.duration}</span>
                    <span className="text-zinc-500 text-sm">{exp.location}</span>
                  </div>
                </div>
                <Link href="/experience" className="text-sm text-brandYellow hover:text-white transition-colors mt-2 inline-block">View in Experience →</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {results.educations.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif border-b border-zinc-800 pb-2 mb-6">Education ({results.educations.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.educations.map((edu) => (
              <div key={edu.id} className="bg-[#1a1a1a] p-6 rounded-lg border border-zinc-800/60">
                <h3 className="text-xl font-bold text-brandYellow mb-2">{edu.degree}</h3>
                <p className="text-white mb-2">{edu.institution}</p>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>{edu.duration}</span>
                  <span>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* News & Blogs */}
      {(results.news.length > 0 || results.blogs.length > 0) && (
        <section>
          <h2 className="text-2xl font-serif border-b border-zinc-800 pb-2 mb-6">News & Blogs ({results.news.length + results.blogs.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.news.map((item) => (
              <PressCard key={item.id} article={item} isNews={true} />
            ))}
            {results.blogs.map((item) => (
              <PressCard key={item.id} article={item} isNews={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
