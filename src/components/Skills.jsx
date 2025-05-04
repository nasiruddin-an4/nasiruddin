import { motion } from 'framer-motion';
import { Code, Palette, Layout, Globe, Server, Database, Terminal, Cpu } from 'lucide-react';

const skills = [
  {
    name: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces',
    icon: Layout,
    technologies: ['React', 'Next.js', 'Vue.js', 'HTML5/CSS3'],
    level: 90
  },
  {
    name: 'UI/UX Design',
    description: 'Creating beautiful and intuitive user experiences',
    icon: Palette,
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Canva'],
    level: 85
  },
  {
    name: 'Backend Development',
    description: 'Developing robust server-side applications',
    icon: Server,
    technologies: ['Node.js', 'Express', 'Python', 'PHP'],
    level: 80
  },
  {
    name: 'Database Management',
    description: 'Designing and optimizing database structures',
    icon: Database,
    technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    level: 75
  },
  {
    name: 'Web Technologies',
    description: 'Implementing modern web standards and practices',
    icon: Globe,
    technologies: ['JavaScript', 'TypeScript', 'REST APIs', 'GraphQL'],
    level: 85
  },
  {
    name: 'DevOps & Tools',
    description: 'Managing development and deployment workflows',
    icon: Terminal,
    technologies: ['Git', 'Docker', 'AWS', 'CI/CD'],
    level: 70
  },
  {
    name: 'Programming',
    description: 'Writing clean, efficient, and maintainable code',
    icon: Code,
    technologies: ['JavaScript', 'Python', 'Java', 'C++'],
    level: 85
  },
  {
    name: 'System Architecture',
    description: 'Designing scalable and efficient systems',
    icon: Cpu,
    technologies: ['Microservices', 'Cloud Computing', 'System Design', 'API Design'],
    level: 75
  }
];

const SkillCard = ({ skill: { name, description, icon: Icon, technologies, level } }) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        
        <p className="text-gray-400 mb-4">{description}</p>
        
        <div className="mt-auto">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Proficiency</span>
              <span className="text-blue-400">{level}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;