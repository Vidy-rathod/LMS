const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true
  },
  orderNumber: {
    type: Number,
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

module.exports = mongoose.model('Section', sectionSchema);
