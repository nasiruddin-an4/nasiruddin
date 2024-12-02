
import { Users, CheckCircle, ArrowRight, Trophy, Clock, Briefcase, Target } from 'lucide-react';

export function Experience() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      label: 'Happy Clients',
      value: '1234',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      label: 'Projects Completed',
      value: '1234',
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      label: 'Years of Experience',
      value: '4+',
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      label: 'Awards Won',
      value: '15+',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">Work Experience</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-300 mb-6">
              4 Years of Experience as a Web Designer & Developer
            </h2>
            <p className="text-gray-400 mb-8">
              Throughout my journey, I've had the privilege of working with diverse clients
              and technologies, delivering high-quality solutions that drive business growth
              and user satisfaction. My expertise spans from crafting beautiful user
              interfaces to building robust backend systems.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Strategic Problem Solver</h3>
                  <p className="text-gray-400">
                    Proven track record of solving complex technical challenges with innovative solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Client-Focused Approach</h3>
                  <p className="text-gray-400">
                    Dedicated to understanding and exceeding client expectations through effective communication.
                  </p>
                </div>
              </div>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View My Work
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}