import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import News from '../models/News.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error('Please define the MONGODB_URL environment variable inside .env');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to MongoDB');

    // Read JSON files
    const dataDir = path.resolve(__dirname, '../data');
    
    const projectsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8'));
    const blogsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'blog.json'), 'utf-8'));
    const newsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'news.json'), 'utf-8'));
    const experienceData = JSON.parse(fs.readFileSync(path.join(dataDir, 'experience.json'), 'utf-8'));
    const educationData = JSON.parse(fs.readFileSync(path.join(dataDir, 'education.json'), 'utf-8'));

    // Clear existing collections
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await News.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});

    console.log('Cleared existing data');

    // Insert data
    await Project.insertMany(projectsData.map(p => ({ ...p, _id: undefined })));
    console.log(`Inserted ${projectsData.length} projects`);

    await Blog.insertMany(blogsData.map(b => ({ ...b, _id: undefined })));
    console.log(`Inserted ${blogsData.length} blogs`);

    await News.insertMany(newsData.map(n => ({ ...n, _id: undefined })));
    console.log(`Inserted ${newsData.length} news items`);

    await Experience.insertMany(experienceData.map(e => ({ ...e, _id: undefined })));
    console.log(`Inserted ${experienceData.length} experiences`);

    await Education.insertMany(educationData.map(e => ({ ...e, _id: undefined })));
    console.log(`Inserted ${educationData.length} education items`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
