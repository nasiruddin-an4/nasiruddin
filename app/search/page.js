import { fetchProjects, fetchExperiences, fetchEducations, fetchNews, fetchBlogs } from "@/lib/api";
import SearchClient from "./SearchClient";
import { Suspense } from "react";

export const metadata = {
  title: "Search | Nasir Uddin",
  description: "Search across Nasir Uddin's projects, experience, news, and blogs.",
};

export default async function SearchPage() {
  const [projects, experiences, educations, news, blogs] = await Promise.all([
    fetchProjects(),
    fetchExperiences(),
    fetchEducations(),
    fetchNews(),
    fetchBlogs(),
  ]);

  return (
    <main className="flex-1 w-full bg-brandBlack text-white flex flex-col pt-24 min-h-screen">
      <div className="px-6 md:px-12 lg:px-16 w-full max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl uppercase tracking-wider mb-8 font-serif">
          Search Results
        </h1>
        <Suspense fallback={<div className="text-zinc-400 font-serif">Loading search...</div>}>
          <SearchClient 
            projects={projects} 
            experiences={experiences} 
            educations={educations}
            news={news}
            blogs={blogs}
          />
        </Suspense>
      </div>
    </main>
  );
}
