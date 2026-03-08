// Vercel serverless function entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('../backend/routes/authRoutes');
const courseRoutes = require('../backend/routes/courseRoutes');
const sectionRoutes = require('../backend/routes/sectionRoutes');
const lessonRoutes = require('../backend/routes/lessonRoutes');
const enrollmentRoutes = require('../backend/routes/enrollmentRoutes');
const progressRoutes = require('../backend/routes/progressRoutes');
const statsRoutes = require('../backend/routes/statsRoutes');
const reviewRoutes = require('../backend/routes/reviewRoutes');
const seedRoutes = require('../backend/routes/seedRoutes');
const quizRoutes = require('../backend/routes/quizRoutes');
const chatbotRoutes = require('../backend/routes/chatbotRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected for serverless');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api', seedRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'LMS API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serverless handler
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
