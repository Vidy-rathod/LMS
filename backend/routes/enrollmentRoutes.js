const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getEnrolledCourses,
  checkEnrollment,
  unenrollCourse
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.post('/:courseId', protect, enrollCourse);
router.get('/my-courses', protect, getEnrolledCourses);
router.get('/check/:courseId', protect, checkEnrollment);
router.delete('/:courseId', protect, unenrollCourse);

module.exports = router;
