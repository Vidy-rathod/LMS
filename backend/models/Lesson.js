const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  orderNumber: {
    type: Number,
    required: true
  },
  youtubeUrl: {
    type: String,
    required: [true, 'YouTube URL is required']
  },
  duration: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);
