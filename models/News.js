import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    link: {
      type: String,
    },
    category: {
      type: String,
    },
    date: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    type: {
      type: String, // e.g. "News", "Blog"
    },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model('News', NewsSchema);
