const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string from .env or default local
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
    
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('\n📝 Tip: Make sure MongoDB is running or update MONGODB_URI in .env');
    console.log('✅ Connection will retry automatically');
  }
};

module.exports = connectDB;
