import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  path: { type: String, required: true },
  referrer: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  utm_source: { type: String, default: '' },
  utm_medium: { type: String, default: '' },
  utm_campaign: { type: String, default: '' },
  utm_term: { type: String, default: '' },
  utm_content: { type: String, default: '' },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Avoid compiling the model multiple times in development
const Visit = mongoose.models.Visit || mongoose.model('Visit', VisitSchema);

export default Visit;
