import { motion } from 'framer-motion';
import { skillsData } from '../constants';

const Skills = () => {
  return (
    <section className="py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <p className="text-gray-400 text-lg mb-4">|| Professional Skills</p>
          <h2 className="text-5xl font-serif text-white mb-8">
            My Special Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-gray-800/50 rounded-lg p-8 hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
                  <category.icon size={28} />
                </div>
                <h3 className="text-2xl font-semibold">{category.name}</h3>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;