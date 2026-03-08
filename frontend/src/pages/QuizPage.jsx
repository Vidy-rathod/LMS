import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const QuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, [courseId]);

  const fetchQuizData = async () => {
    try {
      const [quizRes, courseRes] = await Promise.all([
        api.get(`/quiz/course/${courseId}`),
        api.get(`/courses/${courseId}`)
      ]);
      
      setQuiz(quizRes.data);
      setCourse(courseRes.data.course);
    } catch (error) {
      toast.error('Failed to load quiz');
      navigate(`/learn/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const unanswered = quiz.questions.findIndex((_, idx) => selectedAnswers[idx] === undefined);
    
    if (unanswered !== -1) {
      toast.error(`Please answer question ${unanswered + 1} before submitting`);
      setCurrentQuestion(unanswered);
      return;
    }

    setSubmitting(true);
    try {
      const answers = quiz.questions.map((_, idx) => ({
        selectedAnswer: selectedAnswers[idx]
      }));
      
      const { data } = await api.post('/quiz/submit', {
        quizId: quiz._id,
        answers
      });
      
      setScore(data.score);
      setShowResults(true);
      toast.success(`Quiz completed! Score: ${data.score}%`);
    } catch (error) {
      toast.error('Failed to submit quiz');
      console.error('Quiz submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">Quiz not available</div>
          <button onClick={() => navigate(`/learn/${courseId}`)} className="btn-primary">
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= quiz.passingScore;
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className={`bg-white rounded-xl shadow-lg p-8 text-center ${passed ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
            <div className="mb-6">
              {passed ? (
                <div className="text-6xl mb-4">🎉</div>
              ) : (
                <div className="text-6xl mb-4">📚</div>
              )}
              <h2 className="text-3xl font-bold mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              <p className="text-gray-600">
                {passed ? 'You passed the quiz!' : 'You need more practice'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">{score}%</div>
              <p className="text-gray-600">Your Score</p>
              <p className="text-sm text-gray-500 mt-2">
                Passing score: {quiz.passingScore}%
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {quiz.questions.length}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((score / 100) * quiz.questions.length)}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">
                  {quiz.questions.length - Math.round((score / 100) * quiz.questions.length)}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>

            <div className="space-y-3">
              {passed && (
                <button
                  onClick={() => navigate('/student/dashboard')}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Go to Dashboard
                </button>
              )}
              <button
                onClick={() => navigate(`/learn/${courseId}`)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Back to Course
              </button>
              {!passed && (
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{course?.title}</h1>
              <p className="text-gray-600">Final Assessment Quiz</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Question</div>
              <div className="text-2xl font-bold text-blue-600">
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Question {currentQuestion + 1}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion, idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === idx && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-600">
            {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
