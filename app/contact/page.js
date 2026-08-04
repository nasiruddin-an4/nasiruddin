import { fetchSettings } from "@/lib/api";
import ContactClient from "./ContactClient.jsx";

export const metadata = {
  title: "Contact | Nasir Uddin",
  description: "Get in touch with Nasir Uddin. A few different options for reaching out regarding news, media, jobs, web development projects, or digital marketing collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await fetchSettings();
  const socialLinks = settings?.socials || [];

  return <ContactClient socialLinks={socialLinks} />;
}
