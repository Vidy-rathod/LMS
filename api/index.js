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

// MongoDB connection with better error handling
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

const connectDB = async () => {
  // If already connected, reuse connection
  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    return false;
  }

  // Try to connect with retries
  while (connectionAttempts < MAX_RETRIES) {
    try {
      connectionAttempts++;
      console.log(`🔄 Attempting MongoDB connection (${connectionAttempts}/${MAX_RETRIES})...`);
      
      // Close existing connection if any
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }

      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // 10 second timeout
        socketTimeoutMS: 45000, // 45 second socket timeout
        maxPoolSize: 10,
        minPoolSize: 2,
      });
      
      isConnected = true;
      connectionAttempts = 0; // Reset on success
      console.log('✅ MongoDB connected successfully');
      
      // Handle connection events
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
        isConnected = false;
      });

      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB error:', err);
        isConnected = false;
      });

      return true;
    } catch (error) {
      console.error(`❌ MongoDB connection attempt ${connectionAttempts} failed:`, error.message);
      isConnected = false;
      
      if (connectionAttempts >= MAX_RETRIES) {
        console.error('❌ Max connection retries reached');
        return false;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * connectionAttempts));
    }
  }
  
  return false;
};

// Health check with detailed diagnostics
app.get('/api', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({ 
    message: 'LMS API is running',
    status: 'healthy',
    mongodb: {
      status: statusMap[dbStatus] || 'unknown',
      readyState: dbStatus,
      isConnected: isConnected && dbStatus === 1
    },
    environment: {
      MONGODB_URI: process.env.MONGODB_URI ? '✅ set' : '❌ missing',
      JWT_SECRET: process.env.JWT_SECRET ? '✅ set' : '❌ missing',
      HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY ? '✅ set' : '❌ missing',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    },
    timestamp: new Date().toISOString()
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

// Serverless handler with better error handling
module.exports = async (req, res) => {
  try {
    // Connect to database
    const dbConnected = await connectDB();
    
    if (!dbConnected) {
      return res.status(503).json({ 
        error: 'Database connection failed',
        message: 'Unable to connect to MongoDB. Please check your environment variables.',
        details: {
          MONGODB_URI: process.env.MONGODB_URI ? 'Set (check if valid)' : '❌ Not set',
          suggestion: 'Go to Vercel Dashboard → Settings → Environment Variables'
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Load routes after successful DB connection
    loadRoutes();
    
    // Handle the request
    return app(req, res);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
