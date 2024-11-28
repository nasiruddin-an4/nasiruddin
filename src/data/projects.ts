import { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe', 'Redux'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    features: [
      'Real-time inventory tracking',
      'Secure payment processing',
      'User authentication',
      'Admin dashboard',
      'Order management',
      'Product reviews'
    ],
    preview: {
      desktop: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      mobile: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800'
    },
    role: 'Lead Developer',
    duration: '6 months',
    challenge: 'Building a scalable e-commerce platform that could handle high traffic and maintain real-time inventory accuracy.',
    solution: 'Implemented a microservices architecture with Redis caching and WebSocket connections for real-time updates.'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project analytics.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Firebase', 'Material-UI', 'Chart.js', 'TypeScript'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    features: [
      'Real-time collaboration',
      'Task dependencies',
      'Time tracking',
      'Project analytics',
      'Team chat',
      'File sharing'
    ],
    preview: {
      desktop: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
      mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
    },
    role: 'Full Stack Developer',
    duration: '4 months',
    challenge: 'Creating a seamless real-time collaboration experience while maintaining high performance.',
    solution: 'Utilized Firebase Real-time Database with optimistic UI updates and efficient data synchronization.'
  },
  {
    title: 'Weather Dashboard',
    description: 'A comprehensive weather application with detailed forecasts, interactive maps, and historical weather data analysis.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'D3.js', 'TypeScript'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    features: [
      'Interactive weather maps',
      'Historical data analysis',
      'Location-based forecasts',
      'Weather alerts',
      'Custom dashboards',
      'Data visualization'
    ],
    preview: {
      desktop: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&q=80&w=800',
      mobile: 'https://images.unsplash.com/photo-1527456272-623855a6a91e?auto=format&fit=crop&q=80&w=800'
    },
    role: 'Frontend Developer',
    duration: '3 months',
    challenge: 'Handling and visualizing large amounts of weather data while maintaining smooth performance.',
    solution: 'Implemented efficient data caching and progressive loading with virtualized lists for optimal performance.'
  }
];