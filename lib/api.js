const API_BASE_URL = 'https://dashboard.nasiruddin.net/api';

const mapId = (item) => ({ ...item, id: item._id });

export async function fetchNews() {
  try {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
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
    const res = await fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(mapId);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(mapId).map(project => {
      // Override thumbnails for DIIT and DIU projects
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
    const res = await fetch(`${API_BASE_URL}/experiences`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(mapId).map(overrideLogos);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function fetchEducations() {
  try {
    const res = await fetch(`${API_BASE_URL}/educations`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(mapId).map(overrideLogos);
  } catch (error) {
    console.error("Error fetching educations:", error);
    return [];
  }
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    // Assuming settings is a single object, we might want to map socials id
    if (data && data.socials) {
      data.socials = data.socials.map(mapId);
    }
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function fetchCV() {
  try {
    const res = await fetch(`${API_BASE_URL}/cv`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    // Assuming cv is a single object or an array. If array, mapId. If object, map socials maybe.
    // Let's just return raw data for cv for now.
    return data;
  } catch (error) {
    console.error("Error fetching cv:", error);
    return null;
  }
}
