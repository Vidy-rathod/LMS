const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  passingScore: {
    type: Number,
    default: 70
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    explanation: {
      type: String
    }
  }],
  timeLimit: {
    type: Number,
    default: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
