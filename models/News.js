import mongoose from 'mongoose';
import { slugify } from '../lib/utils.js';

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    image: { type: String },
    alt: { type: String },
    link: { type: String },
    category: { type: String },
    date: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    content: { type: String },
    tags: [{ type: String }],
    type: { type: String, default: 'News' }
  },
  { timestamps: true }
);

NewsSchema.pre('save', async function () {
  if (this.slug || !this.title) return;

  const base = slugify(this.title) || 'article';
  let candidate = base;
  let suffix = 1;
  const News = this.constructor;
  while (await News.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  this.slug = candidate;
});

export default mongoose.models.News || mongoose.model('News', NewsSchema);
