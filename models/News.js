import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
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

export default mongoose.models.News || mongoose.model('News', NewsSchema);
