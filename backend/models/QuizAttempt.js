const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  answers: [{
    questionIndex: Number,
    selectedAnswer: Number
  }],
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  timeTaken: {
    type: Number
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
