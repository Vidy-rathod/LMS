const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');

// Get student statistics
exports.getStudentStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get enrolled courses
    const enrollments = await Enrollment.find({ userId });
    const totalEnrolled = enrollments.length;

    // Get progress for all courses
    const allProgress = await Progress.find({ userId, isCompleted: true });
    
    // Count completed courses (courses where all lessons are done)
    const courseProgress = {};
    allProgress.forEach(p => {
      const courseId = p.courseId.toString();
      if (!courseProgress[courseId]) {
        courseProgress[courseId] = 0;
      }
      courseProgress[courseId]++;
    });

    const completedCourses = Object.keys(courseProgress).length;
    const inProgressCourses = totalEnrolled - completedCourses;
    const totalLessonsCompleted = allProgress.length;

    res.json({
      totalEnrolled,
      completedCourses,
      inProgressCourses,
      totalLessonsCompleted
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({ 
      message: 'Failed to load stats',
      totalEnrolled: 0,
      completedCourses: 0,
      inProgressCourses: 0,
      totalLessonsCompleted: 0
    });
  }
};

// Get instructor statistics
exports.getInstructorStats = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Get total courses
    const totalCourses = await Course.countDocuments({ instructor: instructorId });

    // Get courses created by instructor
    const courses = await Course.find({ instructor: instructorId }).select('_id');
    const courseIds = courses.map(c => c._id);
    
    // Get enrollments for instructor's courses
    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } });
    const uniqueStudents = new Set(enrollments.map(e => e.userId.toString()));
    const totalStudents = uniqueStudents.size;
    const totalEnrollments = enrollments.length;

    // Get completion rate
    const completedProgress = await Progress.countDocuments({
      courseId: { $in: courseIds },
      isCompleted: true
    });
    const completionRate = totalEnrollments > 0 
      ? ((completedProgress / totalEnrollments) * 100).toFixed(1)
      : 0;

    res.json({
      totalCourses,
      totalStudents,
      totalEnrollments,
      completionRate
    });
  } catch (error) {
    console.error('Get instructor stats error:', error);
    res.status(500).json({ 
      message: 'Failed to load stats',
      totalCourses: 0,
      totalStudents: 0,
      totalEnrollments: 0,
      completionRate: 0
    });
  }
};

// Get platform statistics (admin)
exports.getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      totalUsers,
      totalInstructors,
      totalStudents,
      totalCourses,
      totalEnrollments
    });
  } catch (error) {
    console.error('Get platform stats error:', error);
    res.status(500).json({ 
      message: 'Failed to load stats',
      totalUsers: 0,
      totalInstructors: 0,
      totalStudents: 0,
      totalCourses: 0,
      totalEnrollments: 0
    });
  }
};
