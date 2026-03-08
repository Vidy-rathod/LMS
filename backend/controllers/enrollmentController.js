const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in course
// @route   POST /api/enroll/:courseId
// @access  Private (Student)
exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrolled courses
// @route   GET /api/enroll/my-courses
// @access  Private (Student)
exports.getEnrolledCourses = async (req, res) => {
  try {
    const Progress = require('../models/Progress');
    const Lesson = require('../models/Lesson');
    
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate({
        path: 'courseId',
        populate: { path: 'instructorId', select: 'name email' }
      })
      .sort('-enrolledAt');

    // Calculate progress for each course
    const coursesWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.courseId;
        if (!course) return null;

        // Get total lessons in course
        const totalLessons = await Lesson.countDocuments({ courseId: course._id });
        
        // Get completed lessons
        const completedLessons = await Progress.countDocuments({
          userId: req.user._id,
          courseId: course._id,
          isCompleted: true
        });

        // Calculate progress percentage
        const progress = totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

        // Return course with progress
        return {
          _id: course._id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail,
          category: course.category,
          instructorId: course.instructorId,
          totalDuration: course.totalDuration,
          averageRating: course.averageRating,
          totalReviews: course.totalReviews,
          createdAt: course.createdAt,
          progress,
          completedLessons,
          totalLessons
        };
      })
    );

    // Filter out null values
    const courses = coursesWithProgress.filter(c => c !== null);
    res.json(courses);
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check enrollment status
// @route   GET /api/enroll/check/:courseId
// @access  Private
exports.checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    });

    res.json({ enrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unenroll from course
// @route   DELETE /api/enroll/:courseId
// @access  Private (Student)
exports.unenrollCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({
      userId: req.user._id,
      courseId: req.params.courseId
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
