import mongoose from 'mongoose';
import { slugify } from '../lib/utils.js';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    date: { type: String },
    readTime: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

BlogSchema.pre('save', async function () {
  if (this.slug || !this.title) return;

  const base = slugify(this.title) || 'post';
  let candidate = base;
  let suffix = 1;
  const Blog = this.constructor;
  while (await Blog.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  this.slug = candidate;
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
