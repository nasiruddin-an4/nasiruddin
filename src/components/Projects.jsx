import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, PlusCircle, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { projectsData } from '../constants';

const ProjectCard = ({ project, onPreview }) => {
  return (
    <motion.div 
      className="relative overflow-hidden group bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
      whileHover={{ y: -8 }}
    >
      {/* Decorative gradient backgrounds */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="relative overflow-hidden mb-4 rounded-lg">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button 
                onClick={() => onPreview(project)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Preview project"
              >
                <Play size={20} />
              </button>
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="View live project"
              >
                <ExternalLink size={20} />
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="View source code"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PreviewModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="aspect-video">
          <img 
            src={project.preview} 
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
          <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="flex gap-4">
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Demo
            </a>
            <button 
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [previewProject, setPreviewProject] = useState(null);

  return (
    <section id="projects" className="py-32 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <p className="text-gray-400 text-lg mb-4">|| My Projects</p>
          <h2 className="text-5xl font-serif text-white mb-8">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onPreview={setPreviewProject} 
            />
          ))}
        </div>
      </div>

      <PreviewModal 
        project={previewProject} 
        onClose={() => setPreviewProject(null)} 
      />
    </section>
  );
};

export default Projects;