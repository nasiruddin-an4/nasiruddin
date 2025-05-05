import { ExternalLink } from 'lucide-react';
import { projectsData } from '../constants';

// ProjectCard component for individual project cards
const ProjectCard = ({ project }) => {
  return (
    <div 
      className="relative overflow-hidden bg-gray-900/70 rounded-2xl backdrop-blur-md border border-gray-800/30 hover:border-blue-500/30 group transition-all duration-500 shadow-xl hover:-translate-y-2"
    >
      {/* Decorative gradient backgrounds */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="mb-6 rounded-xl overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <a 
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 text-gray-300 hover:text-blue-400 
              group/button font-medium transition-colors duration-300"
            aria-label="View project demo"
          >
            <span className="relative inline-flex items-center gap-2">
              View Demo
              <ExternalLink 
                size={18} 
                className="transform group-hover/button:translate-x-1 transition-transform duration-300"
              />
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 
              group-hover/button:w-full transition-all duration-300"></span>
          </a>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/30 hover:bg-blue-500/20 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Projects component
const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <p className="text-blue-400 text-lg mb-4 tracking-wider">
            || My Projects
          </p>
          <h2 className="text-5xl font-serif text-white mb-8 leading-tight">
            Featured Works & Creations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;