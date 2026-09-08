import mongoose from 'mongoose';
import { slugify } from '../lib/utils.js';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    description: { type: String },
    tech: [{ type: String }],
    category: { type: String },
    company: { type: String },
    timeline: { type: String },
    featured: { type: Boolean, default: false },
    image: { type: String },
    thumbnail: { type: String },
    liveUrl: { type: String },
    coverImage: { type: String },
    aboutText: { type: String },
    middleImage: { type: String },
    problemStatement: { type: String },
    solutionText: { type: String },
    showcaseImages: [{ type: String }],
    myRole: { type: String },
    keyFeatures: [{ type: String }],
    impact: [{ type: String }],
    testimonialQuote: { type: String },
    testimonialAuthor: { type: String },
  },
  { timestamps: true }
);

ProjectSchema.pre('save', async function () {
  if (this.slug || !this.title) return;

  const base = slugify(this.title) || 'project';
  let candidate = base;
  let suffix = 1;
  const Project = this.constructor;
  while (await Project.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  this.slug = candidate;
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
