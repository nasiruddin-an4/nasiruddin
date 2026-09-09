import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String },
    duration: { type: String },
    description: { type: String },
    logo: { type: String },
    website: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
