import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
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

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
