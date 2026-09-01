import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tech: [{ type: String }],
    category: { type: String },
    featured: { type: Boolean, default: false },
    image: { type: String },
    thumbnail: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
