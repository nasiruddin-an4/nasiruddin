import { fetchNews, fetchBlogs } from "@/lib/api";
import NewsBlogsClient from "./NewsBlogsClient.jsx";

export const metadata = {
  title: "News & Blogs | Nasir Uddin",
  description: "Read insights, press releases, and articles by Nasir Uddin, exploring the intersection of software engineering, digital marketing, and AI.",
  alternates: {
    canonical: "/news-blogs",
  },
};

export default async function NewsBlogsPage() {
  const news = await fetchNews();
  const blogs = await fetchBlogs();

  // Combine them and ensure they have a type
  const pressData = [
    ...news.map((n) => ({ ...n, type: n.type || "News" })),
    ...blogs.map((b) => ({ ...b, type: b.type || "Blog" })),
  ];

  // Optional: sort by date descending if you like
  pressData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return <NewsBlogsClient pressData={pressData} />;
}
