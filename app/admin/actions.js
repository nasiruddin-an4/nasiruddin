"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import News from "@/models/News";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await dbConnect();
  const docs = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
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
  await Project.findByIdAndUpdate(id, data);
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

export async function deleteNews(id) {
  await dbConnect();
  await News.findByIdAndDelete(id);
  revalidatePath("/admin/news");
  revalidatePath("/news-blogs");
}
