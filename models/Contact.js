import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
