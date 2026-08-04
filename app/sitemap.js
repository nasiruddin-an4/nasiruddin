import { fetchProjects, fetchNews, fetchBlogs } from "@/lib/api";

export default async function sitemap() {
  const baseUrl = "https://nasiruddin.net";

  // Static routes
  const staticRoutes = ["", "/about", "/projects", "/news-blogs", "/contact", "/cv", "/experience"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch dynamic content
  const projects = await fetchProjects();
  const news = await fetchNews();
  const blogs = await fetchBlogs();

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.updatedAt || new Date()).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news-blogs/${item.id}`,
    lastModified: new Date(item.updatedAt || new Date()).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((item) => ({
    url: `${baseUrl}/news-blogs/${item.id}`,
    lastModified: new Date(item.updatedAt || new Date()).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...newsRoutes, ...blogRoutes];
}
