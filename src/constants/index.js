import { Code, Database, Wrench, Users2, CheckCircle2, Clock4, Trophy } from 'lucide-react';

export const services = [
	{
		id: 1,
		title: 'Development',
		icon: 'Code',
		skills: ['HTML/CSS', 'JavaScript', 'Animation', 'WordPress', 'React'],
	},
	{
		id: 2,
		title: 'Illustration',
		icon: 'PenTool',
		skills: [
			'Character Design',
			'Icon Set',
			'Illustration Guide',
			'Illustration Set',
			'Motion Graphic',
		],
	},
	{
		id: 3,
		title: 'UI/UX Design',
		icon: 'Layout',
		skills: [
			'Landing Pages',
			'User Flow',
			'Wireframing',
			'Prototyping',
			'Mobile App Design',
		],
	},
	{
		id: 4,
		title: 'Backend Development',
		icon: 'Database',
		skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'GraphQL'],
	},
	{
		id: 5,
		title: 'Mobile Development',
		icon: 'Smartphone',
		skills: [
			'React Native',
			'Flutter',
			'iOS Development',
			'Android Development',
			'Cross-Platform Apps',
		],
	},
	{
		id: 6,
		title: 'DevOps',
		icon: 'Settings',
		skills: [
			'Docker',
			'Kubernetes',
			'CI/CD',
			'AWS Services',
			'Server Management',
		],
	},
];

export const skillsData = [
	{
		name: 'Frontend Development',
		icon: Code,
		description:
			'Building responsive and interactive user interfaces using modern web technologies and frameworks.',
		skills: [
			{ name: 'React/Next.js', proficiency: 90 },
			{ name: 'JavaScript/TypeScript', proficiency: 85 },
			{ name: 'TailwindCSS/SASS', proficiency: 88 },
			{ name: 'Redux/Context API', proficiency: 82 },
		],
	},
	{
		name: 'Backend Development',
		icon: Database,
		description:
			'Developing robust server-side applications and RESTful APIs with various technologies.',
		skills: [
			{ name: 'Node.js/Express', proficiency: 85 },
			{ name: 'MongoDB/PostgreSQL', proficiency: 80 },
			{ name: 'REST APIs/GraphQL', proficiency: 82 },
			{ name: 'Firebase/Supabase', proficiency: 78 },
		],
	},
	{
		name: 'Development Tools',
		icon: Wrench,
		description:
			'Utilizing modern development tools and practices for efficient workflow and deployment.',
		skills: [
			{ name: 'Git/GitHub', proficiency: 88 },
			{ name: 'Docker/Kubernetes', proficiency: 75 },
			{ name: 'AWS/Vercel', proficiency: 80 },
			{ name: 'Jest/Testing', proficiency: 82 },
		],
	},
];

export const statsData = [
	{
		id: 1,
		title: 'Happy Clients',
		value: 500,
		icon: Users2,
		suffix: '+',
		color: 'blue',
	},
	{
		id: 2,
		title: 'Projects Completed',
		value: 200,
		icon: CheckCircle2,
		suffix: '+',
		color: 'green',
	},
	{
		id: 3,
		title: 'Years Experience',
		value: 4,
		icon: Clock4,
		suffix: '+',
		color: 'purple',
	},
];

export const projectsData = [
	{
		id: 1,
		title: 'Daffodil International College',
		description:
			'A comprehensive web application for managing student information, courses, and grades.',
		category: 'web',
		image: 'public/dic.png',
		preview: 'public/dic.png', // Add preview GIF/video
		techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
		liveLink: 'https://dic.edu.bd',
		githubLink: 'https://github.com/yourusername/dic-project',
		features: [
			'User authentication',
			'Product search and filtering',
			'Shopping cart functionality',
			'Secure checkout process',
			'Admin dashboard',
		],
	},
	{
		id: 2,
		title: 'Travel Adventure App',
		description: 'A modern travel planning application with interactive maps, itinerary builder, and social features.',
		category: 'web',
		image: 'public/travel-app.png',
		preview: 'public/travel-app-preview.png',
		techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'MapBox'],
		liveLink: 'https://travel-adventure.demo',
		githubLink: 'https://github.com/yourusername/travel-adventure-app',
		features: [
			'Interactive map integration',
			'Real-time weather updates',
			'Trip planning tools',
			'Social sharing features',
			'Travel recommendations'
		]
	},
	{
		id: 3,
		title: 'AI Task Manager',
		description: 'An AI-powered task management system that helps organize and prioritize work efficiently.',
		category: 'web',
		image: 'public/task-manager.png',
		preview: 'public/task-manager-preview.png',
		techStack: ['React', 'Python', 'FastAPI', 'TensorFlow', 'Redis'],
		liveLink: 'https://ai-taskmanager.demo',
		githubLink: 'https://github.com/yourusername/ai-task-manager',
		features: [
			'AI-based task prioritization',
			'Smart task categorization',
			'Team collaboration tools',
			'Performance analytics',
			'Custom workflow automation'
		]
	},
	{
		id: 4,
		title: 'E-Learning Platform',
		description: 'A comprehensive online learning platform with video courses, quizzes, and progress tracking.',
		category: 'web',
		image: 'public/elearning.png',
		preview: 'public/elearning-preview.png',
		techStack: ['Vue.js', 'Django', 'AWS', 'Docker', 'Stripe'],
		liveLink: 'https://elearning-platform.demo',
		githubLink: 'https://github.com/yourusername/elearning-platform',
		features: [
			'Video streaming integration',
			'Interactive quizzes',
			'Progress tracking',
			'Certificate generation',
			'Payment processing'
		]
	},
	{
		id: 4,
		title: 'E-Learning Platform',
		description: 'A comprehensive online learning platform with video courses, quizzes, and progress tracking.',
		category: 'web',
		image: 'public/elearning.png',
		preview: 'public/elearning-preview.png',
		techStack: ['Vue.js', 'Django', 'AWS', 'Docker', 'Stripe'],
		liveLink: 'https://elearning-platform.demo',
		githubLink: 'https://github.com/yourusername/elearning-platform',
		features: [
			'Video streaming integration',
			'Interactive quizzes',
			'Progress tracking',
			'Certificate generation',
			'Payment processing'
		]
	},
	{
		id: 4,
		title: 'E-Learning Platform',
		description: 'A comprehensive online learning platform with video courses, quizzes, and progress tracking.',
		category: 'web',
		image: 'public/elearning.png',
		preview: 'public/elearning-preview.png',
		techStack: ['Vue.js', 'Django', 'AWS', 'Docker', 'Stripe'],
		liveLink: 'https://elearning-platform.demo',
		githubLink: 'https://github.com/yourusername/elearning-platform',
		features: [
			'Video streaming integration',
			'Interactive quizzes',
			'Progress tracking',
			'Certificate generation',
			'Payment processing'
		]
	}
];

export const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    company: "TechStart Inc.",
    image: "/testimonials/client1.jpg",
    content: "Working with this team has been an absolute pleasure. Their attention to detail and innovative solutions have helped us achieve our goals faster than expected.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chang",
    role: "Product Manager",
    company: "Innovation Labs",
    image: "/testimonials/client2.jpg",
    content: "The level of professionalism and technical expertise is outstanding. They delivered our project on time and exceeded our expectations.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Marketing Director",
    company: "Global Media",
    image: "/testimonials/client3.jpg",
    content: "Their creative approach to problem-solving and dedication to client satisfaction makes them stand out. Highly recommended!",
    rating: 5
  },
  {
    id: 4,
    name: "David Miller",
    role: "Startup Founder",
    company: "InnovateTech",
    image: "/testimonials/client4.jpg",
    content: "Outstanding service and technical expertise. They helped turn our vision into reality with their innovative solutions.",
    rating: 5
  }
];

export const clientsData = [
  {
    id: 1,
    name: "Tech Corp",
    logo: "/clients/client1.svg",
  },
  {
    id: 2,
    name: "Star Lotus",
    logo: "/clients/client2.svg",
  },
  {
    id: 3,
    name: "Sun Systems",
    logo: "/clients/client3.svg",
  },
  {
    id: 4,
    name: "Lotus Inc",
    logo: "/clients/client4.svg",
  },
  // Add duplicates for seamless loop
  {
    id: 5,
    name: "Tech Corp",
    logo: "/clients/client1.svg",
  },
  {
    id: 6,
    name: "Star Lotus",
    logo: "/clients/client2.svg",
  },
  {
    id: 7,
    name: "Sun Systems",
    logo: "/clients/client3.svg",
  },
  {
    id: 8,
    name: "Lotus Inc",
    logo: "/clients/client4.svg",
  }
];

export const blogData = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt: "Explore the latest trends and technologies shaping the future of web development.",
    category: "Web Development",
    date: "March 15, 2024",
    image: "/blog/web-dev-2024.jpg",
    author: {
      name: "John Smith",
      avatar: "/authors/john.jpg",
      role: "Senior Developer"
    },
    readTime: "5 min read",
    tags: ["React", "Next.js", "Web Development"]
  },
  {
    id: 2,
    title: "Mastering Modern UI Design Principles",
    excerpt: "A comprehensive guide to creating intuitive and aesthetically pleasing user interfaces.",
    category: "UI/UX Design",
    date: "March 20, 2024",
    image: "/blog/ui-design-principles.jpg",
    author: {
      name: "Emma Davis",
      avatar: "/authors/emma.jpg",
      role: "UI/UX Designer"
    },
    readTime: "7 min read",
    tags: ["UI Design", "User Experience", "Design Principles"]
  },
  {
    id: 3,
    title: "Building Scalable Applications with Node.js",
    excerpt: "Learn best practices for developing high-performance backend systems using Node.js.",
    category: "Backend Development",
    date: "March 25, 2024",
    image: "/blog/nodejs-scaling.jpg",
    author: {
      name: "Michael Chen",
      avatar: "/authors/michael.jpg",
      role: "Backend Engineer"
    },
    readTime: "6 min read",
    tags: ["Node.js", "Scalability", "Performance"]
  }
];

export const navLinks = {
  mainNav: [
    { 
      name: 'Home', 
      href: '/' 
    },
    {
      name: 'Service',
      href: '#',
      dropdownItems: [
        { 
          name: 'Frontend Development',
          href: '#service/frontend',
          icon: 'Monitor',
          description: 'Creating responsive and interactive user interfaces'
        },
        { 
          name: 'Backend Development',
          href: '#service/backend',
          icon: 'Database',
          description: 'Building robust server-side applications'
        },
        { 
          name: 'Full Stack Development',
          href: '#service/fullstack',
          icon: 'Layers',
          description: 'End-to-end web application development'
        },
        { 
          name: 'UI/UX Design',
          href: '#service/design',
          icon: 'Paintbrush',
          description: 'Creating intuitive and beautiful interfaces'
        }
      ]
    },
    {
      name: 'Blog',
      href: '#',
      dropdownItems: [
        { 
          name: 'Web Development',
          href: '#blog/web',
          icon: 'Code',
          description: 'Latest web development trends and tutorials'
        },
        { 
          name: 'Tech Insights',
          href: '#blog/tech',
          icon: 'Lightbulb',
          description: 'Deep dives into technology topics'
        },
        { 
          name: 'Programming Tips',
          href: '#blog/tips',
          icon: 'FileCode',
          description: 'Useful programming tricks and best practices'
        },
        { 
          name: 'Latest Updates',
          href: '#blog/updates',
          icon: 'Bell',
          description: 'Recent updates and announcements'
        }
      ]
    },
    {
      name: 'Page',
      href: '#',
      dropdownItems: [
        { 
          name: 'About Me',
          href: '#about',
          icon: 'User',
          description: 'Learn more about my journey'
        },
        { 
          name: 'Projects',
          href: '#projects',
          icon: 'FolderGit',
          description: 'Explore my latest work'
        },
        { 
          name: 'Skills',
          href: '#skills',
          icon: 'Code2',
          description: 'Technical skills and expertise'
        },
        { 
          name: 'Experience',
          href: '#experience',
          icon: 'Briefcase',
          description: 'Professional work experience'
        }
      ]
    },
    {
      name: 'Contact',
      href: '/contact'
    }
  ]
};