const Review = require('../models/Review');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Add or update review
exports.addReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const studentId = req.user.id;

    // Check if student is enrolled
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'You must be enrolled to review this course' });
    }

    // Create or update review
    const review = await Review.findOneAndUpdate(
      { course: courseId, student: studentId },
      { rating, comment },
      { new: true, upsert: true }
    );

    // Update course average rating
    await updateCourseRating(courseId);

    res.status(201).json(review);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get course reviews
exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const studentId = req.user.id;

    const review = await Review.findOne({ _id: reviewId, student: studentId });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.deleteOne();
    await updateCourseRating(review.course);

    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to update course rating
async function updateCourseRating(courseId) {
  const reviews = await Review.find({ course: courseId });
  
  if (reviews.length === 0) {
    await Course.findByIdAndUpdate(courseId, {
      averageRating: 0,
      totalReviews: 0
    });
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);

  await Course.findByIdAndUpdate(courseId, {
    averageRating: parseFloat(averageRating),
    totalReviews: reviews.length
  });
}
