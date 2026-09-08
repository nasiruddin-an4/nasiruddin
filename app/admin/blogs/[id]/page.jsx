import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import EditBlogForm from "./EditBlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  await connectToDatabase();

  const blogDoc = await Blog.findById(id).lean();

  if (!blogDoc) {
    notFound();
  }

  const blog = JSON.parse(JSON.stringify(blogDoc));

  return <EditBlogForm blog={blog} />;
}
