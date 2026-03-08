import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
    if (user) {
      checkEnrollment();
    }
  }, [id, user]);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data.course);
      setSections(data.sections);
      setLessons(data.lessons);
    } catch (error) {
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const { data } = await api.get(`/enroll/check/${id}`);
      setEnrolled(data.enrolled);
    } catch (error) {
      console.error('Error checking enrollment');
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll');
      navigate('/login');
      return;
    }

    try {
      await api.post(`/enroll/${id}`);
      toast.success('Enrolled successfully!');
      setEnrolled(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    }
  };

  const handleStartLearning = () => {
    navigate(`/learn/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/courses')} className="btn-primary">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const totalDuration = lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-semibold">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-400 ml-1">(1,234 ratings)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>2,456 students</span>
                </div>
              </div>

              {course.instructorId && (
                <div className="mt-6 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {course.instructorId.name?.charAt(0).toUpperCase() || 'I'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Created by</p>
                    <p className="font-semibold">{course.instructorId.name || 'Instructor'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Course Preview */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Master the fundamentals and advanced concepts',
                  'Build real-world projects from scratch',
                  'Learn industry best practices',
                  'Get hands-on experience with practical exercises'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="mb-4 text-gray-600">
                {sections.length} sections • {lessons.length} lectures • {hours}h {minutes}m total length
              </div>
              <div className="space-y-3">
                {sections && sections.length > 0 ? sections.map((section, index) => {
                  const sectionLessons = lessons.filter(lesson => lesson.sectionId === section._id);
                  const sectionDuration = sectionLessons.reduce((acc, lesson) => acc + (lesson.duration || 0), 0);
                  
                  return (
                    <div key={section._id || index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <div>
                            <h3 className="font-semibold text-lg">Section {index + 1}: {section.title}</h3>
                            <p className="text-sm text-gray-600">{sectionLessons.length} lectures • {sectionDuration} min</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <ul className="space-y-3">
                          {sectionLessons && sectionLessons.length > 0 ? sectionLessons.map((lesson, lessonIndex) => (
                            <li key={lesson._id || lessonIndex} className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded transition">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">{lesson.title}</span>
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration || 0} min</span>
                            </li>
                          )) : (
                            <li className="text-center py-4 text-gray-500 text-sm">No lessons in this section</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-8 text-gray-500">
                    No course content available yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
                <div className="text-sm text-gray-500 line-through">$99.99</div>
              </div>

              {user?.role === 'student' && (
                <>
                  {enrolled ? (
                    <button
                      onClick={handleStartLearning}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all mb-4"
                    >
                      Continue Learning →
                    </button>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all mb-4"
                    >
                      Enroll Now
                    </button>
                  )}
                </>
              )}

              {!user && (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all mb-4"
                >
                  Login to Enroll
                </button>
              )}

              <div className="text-center text-sm text-gray-600 mb-6">
                30-Day Money-Back Guarantee
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-bold text-lg mb-4">This course includes:</h3>
                {[
                  { icon: '📹', text: `${hours}h ${minutes}m on-demand video` },
                  { icon: '📱', text: 'Access on mobile and desktop' },
                  { icon: '♾️', text: 'Full lifetime access' },
                  { icon: '🏆', text: 'Certificate of completion' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
