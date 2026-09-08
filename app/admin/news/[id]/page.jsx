import connectToDatabase from "@/lib/mongodb";
import News from "@/models/News";
import EditNewsForm from "./EditNewsForm";
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }) {
  const { id } = await params;
  await connectToDatabase();

  const newsDoc = await News.findById(id).lean();

  if (!newsDoc) {
    notFound();
  }

  const newsItem = JSON.parse(JSON.stringify(newsDoc));

  return <EditNewsForm newsItem={newsItem} />;
}
