import React from 'react';
import { ExternalLink, Github, List, Clock, User, Lightbulb, Wrench } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
        >
          <List className="w-4 h-4 mr-2" />
          {isExpanded ? 'Show less' : 'Show more'}
        </button>

        {isExpanded && (
          <div className="space-y-4 mt-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={project.preview.desktop}
                alt="Desktop preview"
                className="rounded-lg shadow-sm"
              />
              <img
                src={project.preview.mobile}
                alt="Mobile preview"
                className="rounded-lg shadow-sm"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Role:</span>
                <span className="ml-2">{project.role}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Duration:</span>
                <span className="ml-2">{project.duration}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold flex items-center mb-2">
                <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                Challenge
              </h4>
              <p className="text-gray-400">{project.challenge}</p>
            </div>

            <div>
              <h4 className="font-semibold flex items-center mb-2">
                <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                Solution
              </h4>
              <p className="text-gray-400">{project.solution}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-4 pt-4 border-t">
          <a
            href={project.githubUrl}
            className="inline-flex items-center text-gray-300 hover:text-gray-500"
          >
            <Github className="w-5 h-5 mr-2" />
            Code
          </a>
          <a
            href={project.liveUrl}
            className="inline-flex items-center text-gray-300 hover:text-gray-500"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}