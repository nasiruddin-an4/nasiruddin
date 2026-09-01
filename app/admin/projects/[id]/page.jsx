import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import EditProjectForm from "./EditProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  await connectToDatabase();
  
  const projectDoc = await Project.findById(id).lean();
  
  if (!projectDoc) {
    notFound();
  }

  // Convert MongoDB ObjectId to string to pass safely to Client Component
  const project = JSON.parse(JSON.stringify(projectDoc));

  return <EditProjectForm project={project} />;
}
