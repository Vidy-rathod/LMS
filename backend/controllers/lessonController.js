const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Section = require('../models/Section');

// @desc    Create lesson
// @route   POST /api/lessons
// @access  Private (Instructor)
exports.createLesson = async (req, res) => {
  try {
    const { title, orderNumber, youtubeUrl, duration, sectionId, courseId } = req.body;

    // Verify course ownership
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const lesson = await Lesson.create({
      title,
      orderNumber,
      youtubeUrl,
      duration,
      sectionId,
      courseId
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course lessons
// @route   GET /api/lessons/course/:courseId
// @access  Public
exports.getCourseLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId })
      .populate('sectionId', 'title')
      .sort('orderNumber');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get section lessons
// @route   GET /api/lessons/section/:sectionId
// @access  Public
exports.getSectionLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ sectionId: req.params.sectionId }).sort('orderNumber');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lesson
// @route   GET /api/lessons/:id
// @access  Public
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('sectionId', 'title');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private (Instructor)
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const course = await Course.findById(lesson.courseId);
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private (Instructor)
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const course = await Course.findById(lesson.courseId);
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
