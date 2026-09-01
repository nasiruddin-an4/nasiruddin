import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String },
    type: { type: String },
    duration: { type: String },
    location: { type: String },
    website: { type: String },
    logo: { type: String },
    description: { type: String },
    skills: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
