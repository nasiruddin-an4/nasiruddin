import dbConnect from './mongodb';
import Project from '../models/Project';
import News from '../models/News';
import Blog from '../models/Blog';
import Experience from '../models/Experience';
import Education from '../models/Education';
import Setting from '../models/Setting';

const mapId = (item) => {
  const obj = item.toObject ? item.toObject() : item;
  return { ...obj, id: obj._id.toString(), _id: obj._id.toString() };
};

export async function fetchNews() {
  try {
    await dbConnect();
    const data = await News.find({}).sort({ createdAt: -1 });
    const localImages = ['/diunews1.png', '/betopiagroupnews2.png', '/news3.jpeg'];
    return data.map(mapId).map((item, idx) => {
      if (localImages[idx]) {
        item.image = localImages[idx];
      }
      return item;
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function fetchBlogs() {
  try {
    await dbConnect();
    const data = await Blog.find({}).sort({ createdAt: -1 });
    return data.map(mapId);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    await dbConnect();
    const data = await Project.find({}).sort({ createdAt: -1 });
    return data.map(mapId).map(project => {
      const title = (project.title || '').toLowerCase();
      if (title.includes('diit') || title.includes('daffodil institute')) {
        project.image = '/diit_project.png';
        project.thumbnail = '/diit_project.png';
      }
      if (title.includes('diu') || title.includes('daffodil international')) {
        project.image = '/diu_media.png';
        project.thumbnail = '/diu_media.png';
      }
      return project;
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

const overrideLogos = (item) => {
  if (item.company && (item.company.toLowerCase().includes('diit') || item.company.toLowerCase().includes('daffodil institute'))) {
    item.logo = '/diitLogo.webp';
  }
  return item;
};

export async function fetchExperiences() {
  try {
    await dbConnect();
    const data = await Experience.find({}).sort({ createdAt: -1 });
    return data.map(mapId).map(overrideLogos);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function fetchEducations() {
  try {
    await dbConnect();
    const data = await Education.find({}).sort({ createdAt: -1 });
    return data.map(mapId).map(overrideLogos);
  } catch (error) {
    console.error("Error fetching educations:", error);
    return [];
  }
}

export async function fetchSettings() {
  try {
    await dbConnect();
    const data = await Setting.findOne({});
    if (data && data.socials) {
      data.socials = data.socials.map(mapId);
    }
    return data ? mapId(data) : null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function fetchCV() {
  try {
    // Optional placeholder if they have a CV collection
    return null;
  } catch (error) {
    console.error("Error fetching cv:", error);
    return null;
  }
}
