import React from 'react';

const skills = {
  'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux'],
  'Backend': ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'],
  'Tools': ['Git', 'Docker', 'AWS', 'Jest', 'Webpack'],
  'Soft Skills': ['Problem Solving', 'Team Leadership', 'Communication', 'Agile']
};

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-400 mb-8">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-gray-500 mb-4">{category}</h3>
              <div className="space-y-2">
                {items.map((skill, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg shadow-sm border border-gray-100"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}