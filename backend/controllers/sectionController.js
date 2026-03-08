const Section = require('../models/Section');
const Course = require('../models/Course');

// @desc    Create section
// @route   POST /api/sections
// @access  Private (Instructor)
exports.createSection = async (req, res) => {
  try {
    const { title, orderNumber, courseId } = req.body;

    // Verify course ownership
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const section = await Section.create({
      title,
      orderNumber,
      courseId
    });

    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course sections
// @route   GET /api/sections/course/:courseId
// @access  Public
exports.getCourseSections = async (req, res) => {
  try {
    const sections = await Section.find({ courseId: req.params.courseId }).sort('orderNumber');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update section
// @route   PUT /api/sections/:id
// @access  Private (Instructor)
exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const course = await Course.findById(section.courseId);
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete section
// @route   DELETE /api/sections/:id
// @access  Private (Instructor)
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const course = await Course.findById(section.courseId);
    if (course.instructorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
