const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/instructor/my-courses', protect, authorize('instructor'), getInstructorCourses);
router.get('/:id', getCourse);
router.post('/', protect, authorize('instructor'), createCourse);
router.put('/:id', protect, authorize('instructor'), updateCourse);
router.delete('/:id', protect, authorize('instructor'), deleteCourse);

module.exports = router;
