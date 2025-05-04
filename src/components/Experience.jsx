import { motion } from 'framer-motion';
import { Calendar, Building, Briefcase, Award, Target, Users, Code } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: 'Jan 2022 - Present',
    description: 'Leading frontend development for multiple web applications. Implementing modern UI/UX designs using React and Tailwind CSS. Mentoring junior developers and reviewing code.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Led the migration from legacy codebase to modern React architecture'
    ],
    responsibilities: [
      'Lead a team of 5 frontend developers',
      'Architect and implement scalable frontend solutions',
      'Conduct code reviews and maintain code quality',
      'Mentor junior developers and facilitate knowledge sharing'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Jest', 'GitHub Actions']
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: 'Mar 2019 - Dec 2021',
    description: 'Developed responsive web applications using React, Redux, and styled-components. Collaborated with designers to implement UI/UX designs. Participated in agile development processes.',
    achievements: [
      'Developed key features for company\'s flagship product',
      'Reduced bug count by 35% through implementing comprehensive testing',
      'Improved site accessibility to WCAG 2.1 AA standards'
    ],
    responsibilities: [
      'Develop and maintain client-facing applications',
      'Collaborate with UX designers and backend developers',
      'Implement responsive designs and ensure cross-browser compatibility',
      'Write unit tests and integration tests'
    ],
    technologies: ['React', 'Redux', 'Styled Components', 'JavaScript', 'REST APIs', 'Git']
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'Creative Agency',
    period: 'Jun 2017 - Feb 2019',
    description: 'Created and maintained websites for various clients. Worked with HTML, CSS, JavaScript, and jQuery to build responsive websites. Collaborated with design team to implement visual elements.',
    achievements: [
      'Successfully delivered 15+ client websites on time and within budget',
      'Implemented mobile-first design approach improving mobile conversions by 25%',
      'Introduced modern build tools to improve development workflow'
    ],
    responsibilities: [
      'Build and maintain client websites',
      'Implement responsive designs',
      'Optimize website performance',
      'Handle client communication and feedback'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'WordPress', 'PHP']
  }
];

const ExperienceCard = ({ experience, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 gap-4`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2 z-0"></div>
      
      {/* Date bubble in the middle */}
      <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10 items-center justify-center w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white border-4 border-white dark:border-gray-800">
        <Calendar size={20} />
      </div>

      {/* Content */}
      <div className={`md:w-1/2 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'} z-10`}>
        <div className="card hover:shadow-lg transition-all duration-300">
          <div className="flex md:hidden gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Calendar size={20} />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-400">{experience.period}</span>
          </div>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Building size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{experience.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span>{experience.company}</span>
                <span>•</span>
                <span className="hidden md:inline">{experience.period}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {experience.description}
          </p>
          
          <div className="space-y-6">
            {/* Key Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={20} className="text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Key Achievements</h4>
              </div>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Core Responsibilities */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target size={20} className="text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Core Responsibilities</h4>
              </div>
              <ul className="space-y-2">
                {experience.responsibilities.map((responsibility, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                    <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Technologies Used */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code size={20} className="text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Technologies Used</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for the other side */}
      <div className="md:w-1/2"></div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">My Experience</h2>
        <p className="section-subtitle">
          My professional journey and career highlights
        </p>

        <div className="flex items-center gap-4 justify-center mb-12">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold">Over 5 Years of Professional Experience</h3>
        </div>

        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;