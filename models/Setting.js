import mongoose from 'mongoose';

const SocialSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  icon: { type: String },
  color: { type: String }
});

const SettingSchema = new mongoose.Schema(
  {
    siteName: { type: String },
    siteDescription: { type: String },
    logoUrl: { type: String },
    faviconUrl: { type: String },
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },
    socials: [SocialSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
