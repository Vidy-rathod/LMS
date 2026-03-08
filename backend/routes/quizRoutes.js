const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCourseQuiz,
  submitQuiz,
  getUserAttempts,
  getBestAttempt,
  checkQuizPassed
} = require('../controllers/quizController');

router.get('/course/:courseId', protect, getCourseQuiz);
router.post('/submit', protect, submitQuiz);
router.get('/attempts/:courseId', protect, getUserAttempts);
router.get('/best/:courseId', protect, getBestAttempt);
router.get('/passed/:courseId', protect, checkQuizPassed);

module.exports = router;
