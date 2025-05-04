import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Happy Clients',
    value: 150,
    icon: Users,
    suffix: '+',
  },
  {
    id: 2,
    title: 'Projects Completed',
    value: 200,
    icon: CheckCircle,
    suffix: '+',
  },
  {
    id: 3,
    title: 'Years Experience',
    value: 5,
    icon: Clock,
    suffix: '+',
  },
];

const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
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
    <span className="text-4xl md:text-5xl font-bold text-blue-400">
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-900"
              >
                <div className="p-4 bg-blue-900/30 rounded-full text-blue-400 mb-4">
                  <Icon size={32} />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <h3 className="text-xl font-semibold mt-2 text-gray-300">{stat.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;