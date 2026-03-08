const express = require('express');
const router = express.Router();
const {
  updateProgress,
  markComplete,
  getCourseProgress,
  getUserProgress,
  getLastWatched,
  checkVideoLock,
  getLessonProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.post('/update', protect, updateProgress);
router.post('/complete', protect, markComplete);
router.get('/user/all', protect, getUserProgress);
router.get('/last/:courseId', protect, getLastWatched);
router.get('/check-lock/:lessonId', protect, checkVideoLock);
router.get('/lesson/:lessonId', protect, getLessonProgress);
router.get('/:courseId', protect, getCourseProgress);

module.exports = router;
