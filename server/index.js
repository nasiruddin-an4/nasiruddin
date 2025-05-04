import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Setup middleware
app.use(express.json());
app.use(cors());

// Define __dirname in ES module scope
const __dirname = dirname(fileURLToPath(import.meta.url));

// Routes
app.use('/api/contact', contactRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-db')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// For demo purposes - simulate MongoDB connection
if (!process.env.MONGODB_URI) {
  console.log('No MongoDB URI provided, running in demo mode');
  app.listen(PORT, () => console.log(`Server running in demo mode on port ${PORT}`));
}

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});