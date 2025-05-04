import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, PlusCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and checkout system.',
    image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A drag-and-drop task management application with user authentication and real-time updates.',
    image: 'https://images.pexels.com/photos/6956780/pexels-photo-6956780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Context API'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that allows users to log workouts, track progress, and set goals.',
    image: 'https://images.pexels.com/photos/5926273/pexels-photo-5926273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather application showing current conditions and forecasts with location search functionality.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['JavaScript', 'Weather API', 'HTML/CSS', 'Local Storage'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
  }
];

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="card overflow-hidden group"
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden mb-4 rounded-lg">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <div className="flex gap-4">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="View live project"
            >
              <ExternalLink size={20} />
            </a>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="View source code"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span 
            key={tech} 
            className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  
  const currentProjects = projectsData.slice(
    currentPage * projectsPerPage, 
    (currentPage * projectsPerPage) + projectsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A selection of my recent work and personal projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <button 
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPage 
                      ? 'bg-blue-600 dark:bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            View More Projects
            <PlusCircle size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;