require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const seedRoutes = require('./routes/seedRoutes');
const quizRoutes = require('./routes/quizRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/', (req, res) => {
  res.json({ message: 'LMS API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
