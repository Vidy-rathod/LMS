const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Course = require('../models/Course');

// Get quiz for a course
exports.getCourseQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const quiz = await Quiz.findOne({ courseId });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }

    // Don't send correct answers to frontend
    const quizData = {
      _id: quiz._id,
      courseId: quiz.courseId,
      title: quiz.title,
      description: quiz.description,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    };

    res.json(quizData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit quiz attempt
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const results = [];

    answers.forEach((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = answer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      results.push({
        questionIndex: index,
        question: question.question,
        options: question.options,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Save attempt
    const attempt = await QuizAttempt.create({
      userId: req.user._id,
      quizId: quiz._id,
      courseId: quiz.courseId,
      answers,
      score,
      totalQuestions: quiz.questions.length,
      passed,
      timeTaken
    });

    res.json({
      attemptId: attempt._id,
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passed,
      passingScore: quiz.passingScore,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's quiz attempts for a course
exports.getUserAttempts = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const attempts = await QuizAttempt.find({
      userId: req.user._id,
      courseId
    }).sort({ completedAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get best attempt for a course
exports.getBestAttempt = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const bestAttempt = await QuizAttempt.findOne({
      userId: req.user._id,
      courseId
    }).sort({ score: -1 });

    res.json(bestAttempt);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check if user has passed quiz
exports.checkQuizPassed = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const passedAttempt = await QuizAttempt.findOne({
      userId: req.user._id,
      courseId,
      passed: true
    });

    res.json({ 
      hasPassed: !!passedAttempt,
      attempt: passedAttempt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
