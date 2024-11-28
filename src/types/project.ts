export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  preview: {
    desktop: string;
    mobile: string;
  };
  role: string;
  duration: string;
  challenge: string;
  solution: string;
}