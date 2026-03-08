const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Course+Thumbnail'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Other']
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
