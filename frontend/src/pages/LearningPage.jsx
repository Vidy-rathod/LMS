import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import toast from 'react-hot-toast';
import AIChatbot from '../components/AIChatbot';

const LearningPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    fetchCourseData();
    fetchProgress();
  }, [courseId]);

  useEffect(() => {
    if (currentLesson) {
      localStorage.setItem(`lastLesson_${courseId}`, currentLesson._id);
    }
  }, [currentLesson, courseId]);

  const fetchCourseData = async () => {
    try {
      const { data } = await api.get(`/courses/${courseId}`);
      setCourse(data.course);
      
      // Sort sections by orderNumber
      const sortedSections = data.sections.sort((a, b) => a.orderNumber - b.orderNumber);
      setSections(sortedSections);
      
      // Sort lessons: first by section order, then by lesson orderNumber within each section
      const sortedLessons = data.lessons.sort((a, b) => {
        // Find section order for each lesson
        const sectionA = sortedSections.find(s => s._id === a.sectionId);
        const sectionB = sortedSections.find(s => s._id === b.sectionId);
        
        const sectionOrderA = sectionA ? sectionA.orderNumber : 999;
        const sectionOrderB = sectionB ? sectionB.orderNumber : 999;
        
        // First sort by section order
        if (sectionOrderA !== sectionOrderB) {
          return sectionOrderA - sectionOrderB;
        }
        
        // Then sort by lesson order within the section
        return a.orderNumber - b.orderNumber;
      });
      
      setLessons(sortedLessons);
      
      // Resume from last watched lesson or start from first
      const lastLessonId = localStorage.getItem(`lastLesson_${courseId}`);
      if (lastLessonId && sortedLessons.length > 0) {
        const lastLesson = sortedLessons.find(l => l._id === lastLessonId);
        setCurrentLesson(lastLesson || sortedLessons[0]);
      } else if (sortedLessons.length > 0) {
        setCurrentLesson(sortedLessons[0]);
      }
    } catch (error) {
      toast.error('Failed to load course');
      console.error('Course fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const { data } = await api.get(`/progress/${courseId}`);
      setCompletedLessons(data.completedLessonIds || []);
      setProgress(data.progressPercentage || 0);
    } catch (error) {
      console.error('Error fetching progress');
    }
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson || markingComplete) return;

    setMarkingComplete(true);
    try {
      await api.post('/progress/complete', {
        courseId,
        lessonId: currentLesson._id
      });
      
      // Update completed lessons list
      if (!completedLessons.includes(currentLesson._id)) {
        const newCompleted = [...completedLessons, currentLesson._id];
        setCompletedLessons(newCompleted);
        
        // Recalculate progress
        const newProgress = Math.round((newCompleted.length / lessons.length) * 100);
        setProgress(newProgress);
        
        toast.success('Lesson completed! 🎉');
      }
    } catch (error) {
      console.error('Mark complete error:', error);
      toast.error('Failed to mark complete');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handlePrevious = () => {
    const currentIndex = lessons.findIndex(l => l._id === currentLesson._id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = lessons.findIndex(l => l._id === currentLesson._id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const currentIndex = lessons.findIndex(l => l._id === currentLesson?._id);
  const isFirstLesson = currentIndex === 0;
  const isLastLesson = currentIndex === lessons.length - 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading course...</div>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600">No lessons available in this course</div>
        </div>
      </div>
    );
  }

  // Build YouTube URL
  const videoUrl = getYouTubeEmbedUrl(currentLesson.youtubeUrl);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* AI Chatbot */}
      <AIChatbot courseId={courseId} courseTitle={course?.title} />
      
      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black">
          {currentLesson && (
            <div className="aspect-video">
              <iframe
                key={currentLesson._id}
                src={videoUrl}
                title={currentLesson.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}
        </div>

        {/* Video Info and Controls */}
        <div className="bg-white p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{currentLesson?.title}</h2>
              <p className="text-gray-600">Duration: {currentLesson?.duration} minutes</p>
            </div>
            {isLessonCompleted(currentLesson?._id) && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={isFirstLesson}
                style={{
                  backgroundColor: isFirstLesson ? '#9CA3AF' : '#4B5563',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: isFirstLesson ? 'not-allowed' : 'pointer',
                  opacity: isFirstLesson ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none'
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={isLastLesson}
                style={{
                  backgroundColor: isLastLesson ? '#9CA3AF' : '#2563EB',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: isLastLesson ? 'not-allowed' : 'pointer',
                  opacity: isLastLesson ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none'
                }}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleMarkComplete}
              disabled={isLessonCompleted(currentLesson?._id) || markingComplete}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
            >
              {markingComplete ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : isLessonCompleted(currentLesson?._id) ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Completed
                </>
              ) : (
                'Mark Complete'
              )}
            </button>
          </div>
        </div>

        {/* Video Description */}
        <div className="bg-white p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About This Video
          </h3>
          <div className="text-gray-700 leading-relaxed">
            {currentLesson?.description ? (
              <p className="whitespace-pre-wrap">{currentLesson.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description available for this lesson.</p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedLessons.length} of {lessons.length} lessons completed
          </p>
        </div>
      </div>

      {/* Sidebar - Lesson List */}
      <div className="w-96 bg-white border-l overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">{course?.title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {completedLessons.length} of {lessons.length} lessons completed
          </p>
        </div>

        <div className="p-4">
          {sections.map(section => {
            const sectionLessons = lessons.filter(l => l.sectionId === section._id);
            
            return (
              <div key={section._id} className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {sectionLessons.map((lesson, index) => {
                    const completed = isLessonCompleted(lesson._id);
                    const isCurrent = currentLesson?._id === lesson._id;
                    
                    return (
                      <button
                        key={lesson._id}
                        onClick={() => handleLessonClick(lesson)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isCurrent
                            ? 'bg-blue-100 border-2 border-blue-500 shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-semibold text-gray-500 mr-2">
                                {index + 1}
                              </span>
                              {isCurrent && (
                                <svg className="w-4 h-4 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className="font-medium text-sm">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{lesson.duration} min</p>
                          </div>
                          {completed && (
                            <span className="text-green-600 text-xl ml-2">✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
