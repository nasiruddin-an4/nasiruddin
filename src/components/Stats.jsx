import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statsData } from '../constants';

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
  green: 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20',
  purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20',
  orange: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20',
  red: 'bg-red-500/10 text-red-400 group-hover:bg-red-500/20',
};

const AnimatedCounter = ({ value, suffix = '', color }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      setCount(Math.floor(progress * value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <span className={`text-4xl md:text-5xl font-bold ${colorMap[color].split(' ')[1]}`}>
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex items-center gap-6 p-8 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
              >
                <div className={`p-5 rounded-xl shrink-0 transition-all duration-300 ${colorMap[stat.color]}`}>
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    color={stat.color}
                  />
                  <h3 className="text-xl font-semibold mt-2 text-gray-300 group-hover:text-white transition-colors">
                    {stat.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;