// Vercel serverless function entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return true;
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected for serverless');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Health check (no DB required)
app.get('/api', (req, res) => {
  res.json({ 
    message: 'LMS API is running',
    mongodb: isConnected ? 'connected' : 'disconnected',
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? 'set' : 'missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'set' : 'missing',
      HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY ? 'set' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    }
  });
});

// Import routes only after DB check
let routesLoaded = false;

const loadRoutes = () => {
  if (routesLoaded) return;
  
  try {
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
    
    routesLoaded = true;
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serverless handler
module.exports = async (req, res) => {
  try {
    const dbConnected = await connectDB();
    
    if (!dbConnected) {
      return res.status(500).json({ 
        error: 'Database connection failed',
        message: 'Please check environment variables in Vercel dashboard',
        hint: 'Go to Settings → Environment Variables and add MONGODB_URI, JWT_SECRET, HUGGINGFACE_API_KEY, NODE_ENV'
      });
    }
    
    loadRoutes();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
};
