const express = require('express');
const router = express.Router();
const {
  createLesson,
  getCourseLessons,
  getSectionLessons,
  getLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('instructor'), createLesson);
router.get('/course/:courseId', getCourseLessons);
router.get('/section/:sectionId', getSectionLessons);
router.get('/:id', getLesson);
router.put('/:id', protect, authorize('instructor'), updateLesson);
router.delete('/:id', protect, authorize('instructor'), deleteLesson);

module.exports = router;
