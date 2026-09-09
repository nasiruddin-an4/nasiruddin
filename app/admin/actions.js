"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import News from "@/models/News";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";
import Contact from "@/models/Contact";
import Setting from "@/models/Setting";
import { sortProjectsForDisplay } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await dbConnect();
  const docs = await Project.find({}).sort({ createdAt: -1 }).lean();
  return sortProjectsForDisplay(JSON.parse(JSON.stringify(docs)));
}

export async function toggleFeaturedProject(id, featured) {
  await dbConnect();
  await Project.findByIdAndUpdate(id, { featured });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function createProject(data) {
  await dbConnect();
  await Project.create(data);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProject(id) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProject(id, data) {
  await dbConnect();
  const project = await Project.findById(id);
  if (!project) return;
  Object.assign(project, data);
  await project.save();
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function getBlogs() {
  await dbConnect();
  const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function createBlog(data) {
  await dbConnect();
  await Blog.create(data);
  revalidatePath("/admin/blogs");
  revalidatePath("/news-blogs");
}

export async function updateBlog(id, data) {
  await dbConnect();
  const blog = await Blog.findById(id);
  if (!blog) return;
  Object.assign(blog, data);
  await blog.save();
  revalidatePath("/admin/blogs");
  revalidatePath("/news-blogs");
}

export async function deleteBlog(id) {
  await dbConnect();
  await Blog.findByIdAndDelete(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/news-blogs");
}

export async function getNews() {
  await dbConnect();
  const docs = await News.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function createNews(data) {
  await dbConnect();
  await News.create(data);
  revalidatePath("/admin/news");
  revalidatePath("/news-blogs");
}

export async function updateNews(id, data) {
  await dbConnect();
  const news = await News.findById(id);
  if (!news) return;
  Object.assign(news, data);
  await news.save();
  revalidatePath("/admin/news");
  revalidatePath("/news-blogs");
}

export async function deleteNews(id) {
  await dbConnect();
  await News.findByIdAndDelete(id);
  revalidatePath("/admin/news");
  revalidatePath("/news-blogs");
}

export async function getExperiences() {
  await dbConnect();
  const docs = await Experience.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function createExperience(data) {
  await dbConnect();
  await Experience.create(data);
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function updateExperience(id, data) {
  await dbConnect();
  const experience = await Experience.findById(id);
  if (!experience) return;
  Object.assign(experience, data);
  await experience.save();
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function deleteExperience(id) {
  await dbConnect();
  await Experience.findByIdAndDelete(id);
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function getContacts() {
  await dbConnect();
  const docs = await Contact.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function markContactRead(id, read) {
  await dbConnect();
  await Contact.findByIdAndUpdate(id, { read });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteContact(id) {
  await dbConnect();
  await Contact.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function getSettings() {
  await dbConnect();
  const doc = await Setting.findOne({}).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function updateSettings(data) {
  await dbConnect();
  await Setting.findOneAndUpdate({}, data, { upsert: true, new: true });
  revalidatePath("/admin/settings");
  // Socials/logo render via the root layout (Sidebar/Footer) on every page.
  revalidatePath("/", "layout");
}
