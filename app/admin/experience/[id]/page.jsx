import connectToDatabase from "@/lib/mongodb";
import Experience from "@/models/Experience";
import EditExperienceForm from "./EditExperienceForm";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }) {
  const { id } = await params;
  await connectToDatabase();

  const experienceDoc = await Experience.findById(id).lean();

  if (!experienceDoc) {
    notFound();
  }

  const experience = JSON.parse(JSON.stringify(experienceDoc));

  return <EditExperienceForm experience={experience} />;
}
