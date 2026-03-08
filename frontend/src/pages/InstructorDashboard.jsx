import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses/instructor/my-courses');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    setDeleting(courseId);
    try {
      await api.delete(`/courses/${courseId}`);
      toast.success('Course deleted successfully');
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (error) {
      toast.error('Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading your courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">My Courses</h1>
          <p className="text-gray-600 mt-2">{courses.length} {courses.length === 1 ? 'course' : 'courses'} created</p>
        </div>
        <Link to="/instructor/create-course" className="btn-primary">
          + Create New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-xl text-gray-600 mb-4">You haven't created any courses yet</p>
          <p className="text-gray-500 mb-6">Start sharing your knowledge with students!</p>
          <Link to="/instructor/create-course" className="btn-primary inline-block">
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="card">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                {course.averageRating > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-medium">{course.averageRating}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/instructor/manage-course/${course._id}`}
                  className="flex-1 text-center btn-primary"
                >
                  Manage
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  disabled={deleting === course._id}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {deleting === course._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
