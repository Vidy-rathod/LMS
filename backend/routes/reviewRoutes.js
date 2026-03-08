const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  addReview,
  getCourseReviews,
  deleteReview
} = require('../controllers/reviewController');

router.post('/', protect, addReview);
router.get('/course/:courseId', getCourseReviews);
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
