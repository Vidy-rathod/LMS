const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getInstructorStats,
  getStudentStats,
  getPlatformStats
} = require('../controllers/statsController');

router.get('/instructor', protect, getInstructorStats);
router.get('/student', protect, getStudentStats);
router.get('/platform', protect, getPlatformStats);

module.exports = router;
