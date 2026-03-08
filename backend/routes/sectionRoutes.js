const express = require('express');
const router = express.Router();
const {
  createSection,
  getCourseSections,
  updateSection,
  deleteSection
} = require('../controllers/sectionController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('instructor'), createSection);
router.get('/course/:courseId', getCourseSections);
router.put('/:id', protect, authorize('instructor'), updateSection);
router.delete('/:id', protect, authorize('instructor'), deleteSection);

module.exports = router;
