import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight, Tags } from 'lucide-react';
import { projectsData } from '../constants';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden 
        backdrop-blur-lg border border-gray-700/30 hover:border-blue-500/30 transition-all duration-500
        hover:shadow-2xl hover:shadow-blue-500/10"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Hover Gradients */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Project Image */}
      <div className="relative h-[300px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transform transition-transform duration-700
            group-hover:scale-110 filter group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Tech Stack Tags - Positioned over image */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gray-800/90 backdrop-blur-md
              border border-gray-700/50 text-gray-300 transition-colors duration-300
              group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:text-blue-400">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 backdrop-blur-md
              border border-purple-500/40 text-purple-400">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 pt-4">
        <h3 className="text-2xl font-bold text-white mb-3 transform transition-transform duration-300
          group-hover:translate-x-2">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-auto">
          <button
            onClick={() => onClick(project)}
            className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300
              transition-colors group/btn"
          >
            View Details
            <ChevronRight size={16} className="transform transition-transform duration-300
              group-hover/btn:translate-x-1" />
          </button>

          <div className="flex-1" />

          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700/50
              hover:border-blue-500/30 transition-all duration-300 text-gray-400 hover:text-blue-400">
            <ExternalLink size={16} />
          </a>
          
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/50 hover:bg-purple-500/20 border border-gray-700/50
              hover:border-purple-500/30 transition-all duration-300 text-gray-400 hover:text-purple-400">
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-400
            hover:bg-red-500/20 hover:text-red-400 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[300px] md:h-full">
            <img 
              src={project.preview || project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-gray-400 mb-6">{project.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Tags size={16} className="text-blue-400" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs rounded-full bg-blue-500/10
                      border border-blue-500/20 text-blue-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                      <ChevronRight size={16} className="mt-1 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                  text-center transition-colors text-sm font-medium">
                View Live Demo
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg
                  text-center transition-colors text-sm font-medium">
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isGridView, setIsGridView] = useState(true);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ui', label: 'UI/UX' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-400 text-lg mb-4"
          >
            || MY PROJECTS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-serif text-white mb-12"
          >
            Featured Works
          </motion.h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid gap-6 ${
          isGridView 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;