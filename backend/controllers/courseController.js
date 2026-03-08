const Course = require('../models/Course');
const Section = require('../models/Section');
const Lesson = require('../models/Lesson');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructorId', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructorId', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get sections and lessons
    const sections = await Section.find({ courseId: req.params.id }).sort('orderNumber');
    const lessons = await Lesson.find({ courseId: req.params.id }).sort('orderNumber');

    res.json({ course, sections, lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Instructor)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, category } = req.body;

    const course = await Course.create({
      title,
      description,
      thumbnail,
      category,
      instructorId: req.user._id
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Course.findByIdAndDelete(req.params.id);
    await Section.deleteMany({ courseId: req.params.id });
    await Lesson.deleteMany({ courseId: req.params.id });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get instructor courses
// @route   GET /api/courses/instructor/my-courses
// @access  Private (Instructor)
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
