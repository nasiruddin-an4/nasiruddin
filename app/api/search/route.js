import { fetchProjects, fetchExperiences, fetchEducations, fetchNews, fetchBlogs } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase();

    if (!query) {
      return NextResponse.json({ suggestions: [] });
    }

    const [projects, experiences, educations, news, blogs] = await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchEducations(),
      fetchNews(),
      fetchBlogs(),
    ]);

    const isProjectSearch = ['project', 'projects', 'portfolio'].includes(query);
    const isExperienceSearch = ['experience', 'experiences', 'job', 'work', 'career'].includes(query);
    const isEducationSearch = ['education', 'study', 'university', 'college', 'degree'].includes(query);
    const isNewsSearch = ['news', 'press', 'article', 'articles'].includes(query);
    const isBlogSearch = ['blog', 'blogs', 'post', 'posts'].includes(query);

    let suggestions = [];

    // Projects
    projects.forEach(p => {
      if (isProjectSearch || p.title?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) {
        suggestions.push({ type: 'Project', title: p.title, link: `/search?q=${encodeURIComponent(p.title)}` });
      }
    });

    // Experiences
    experiences.forEach(e => {
      if (isExperienceSearch || e.role?.toLowerCase().includes(query) || e.company?.toLowerCase().includes(query)) {
        suggestions.push({ type: 'Experience', title: `${e.role} at ${e.company}`, link: `/experience` });
      }
    });

    // Educations
    educations.forEach(e => {
      if (isEducationSearch || e.degree?.toLowerCase().includes(query) || e.institution?.toLowerCase().includes(query)) {
        suggestions.push({ type: 'Education', title: e.degree, link: `/about` });
      }
    });

    // News
    news.forEach(n => {
      if (isNewsSearch || n.title?.toLowerCase().includes(query)) {
        suggestions.push({ type: 'News', title: n.title, link: `/news-blogs/${n.id}` });
      }
    });

    // Blogs
    blogs.forEach(b => {
      if (isBlogSearch || b.title?.toLowerCase().includes(query)) {
        suggestions.push({ type: 'Blog', title: b.title, link: `/news-blogs/${b.id}` });
      }
    });

    // Sort or limit suggestions to top 6
    const limitedSuggestions = suggestions.slice(0, 6);

    return NextResponse.json({ suggestions: limitedSuggestions });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
