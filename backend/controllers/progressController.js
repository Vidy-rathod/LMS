const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

// @desc    Update video progress (timestamp)
// @route   POST /api/progress/update
// @access  Private (Student)
exports.updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, lastPositionSeconds } = req.body;
    const userId = req.user._id;

    // Check enrollment
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Update or create progress
    const progress = await Progress.findOneAndUpdate(
      { userId, lessonId },
      {
        courseId,
        lastPositionSeconds,
        lastWatchedAt: new Date(),
        status: 'in_progress'
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark lesson as complete
// @route   POST /api/progress/complete
// @access  Private (Student)
exports.markComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.user._id;

    // Check enrollment
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    // Check if previous lesson is completed (strict ordering)
    const allLessons = await Lesson.find({ courseId }).sort('orderNumber');
    const currentLessonIndex = allLessons.findIndex(l => l._id.toString() === lessonId);
    
    if (currentLessonIndex > 0) {
      const previousLesson = allLessons[currentLessonIndex - 1];
      const previousProgress = await Progress.findOne({ 
        userId, 
        lessonId: previousLesson._id 
      });
      
      if (!previousProgress || !previousProgress.isCompleted) {
        return res.status(403).json({ 
          message: 'Complete the previous lesson first',
          locked: true 
        });
      }
    }

    // Update or create progress
    const progress = await Progress.findOneAndUpdate(
      { userId, lessonId },
      {
        courseId,
        status: 'completed',
        isCompleted: true,
        completedAt: new Date(),
        lastWatchedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course progress
// @route   GET /api/progress/:courseId
// @access  Private (Student)
exports.getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Get all lessons in course
    const allLessons = await Lesson.find({ courseId }).sort('orderNumber');
    const totalLessons = allLessons.length;

    // Get completed lessons
    const completedProgress = await Progress.find({ 
      userId, 
      courseId,
      isCompleted: true 
    }).populate('lessonId');
    const completedLessons = completedProgress.length;

    // Calculate progress percentage
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Get all progress with timestamps
    const allProgress = await Progress.find({ userId, courseId });

    res.json({
      totalLessons,
      completedLessons,
      progressPercentage,
      completedLessonIds: completedProgress.map(p => p.lessonId._id),
      progressData: allProgress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if video is locked
// @route   GET /api/progress/check-lock/:lessonId
// @access  Private (Student)
exports.checkVideoLock = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;

    // Get the lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Get all lessons in the course
    const allLessons = await Lesson.find({ courseId: lesson.courseId }).sort('orderNumber');
    const currentIndex = allLessons.findIndex(l => l._id.toString() === lessonId);

    // First lesson is always unlocked
    if (currentIndex === 0) {
      return res.json({ locked: false, message: 'First lesson is unlocked' });
    }

    // Check if previous lesson is completed
    const previousLesson = allLessons[currentIndex - 1];
    const previousProgress = await Progress.findOne({
      userId,
      lessonId: previousLesson._id
    });

    if (previousProgress && previousProgress.isCompleted) {
      return res.json({ locked: false, message: 'Lesson is unlocked' });
    }

    res.json({
      locked: true,
      message: 'Complete the previous lesson to unlock this one',
      previousLessonId: previousLesson._id,
      previousLessonTitle: previousLesson.title
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lesson progress (timestamp)
// @route   GET /api/progress/lesson/:lessonId
// @access  Private (Student)
exports.getLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, lessonId });
    
    if (!progress) {
      return res.json({ 
        lastPositionSeconds: 0, 
        isCompleted: false,
        status: 'not_started'
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all user progress
// @route   GET /api/progress/user/all
// @access  Private (Student)
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const progress = await Progress.find({ userId })
      .populate('courseId', 'title')
      .populate('lessonId', 'title')
      .sort('-completedAt');

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get last watched lesson
// @route   GET /api/progress/last/:courseId
// @access  Private (Student)
exports.getLastWatched = async (req, res) => {
  try {
    const lastProgress = await Progress.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    })
      .sort('-completedAt')
      .populate('lessonId');

    res.json(lastProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
