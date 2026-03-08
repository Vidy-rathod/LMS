import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../utils/api';
import toast from 'react-hot-toast';
import AIChatbot from '../components/AIChatbot';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, statsRes] = await Promise.all([
        api.get('/enroll/my-courses'),
        api.get('/stats/student')
      ]);
      setEnrolledCourses(coursesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const inProgressCourses = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStartedCourses = enrolledCourses.filter(c => !c.progress || c.progress === 0).length;

  // Data for charts
  const progressData = enrolledCourses.map(course => ({
    name: course.title.substring(0, 20) + '...',
    progress: course.progress || 0
  }));

  const categoryData = enrolledCourses.reduce((acc, course) => {
    const existing = acc.find(item => item.name === course.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: course.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Weekly activity data (mock - you can make this real with backend)
  const weeklyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AI Chatbot */}
      <AIChatbot courseId="general" courseTitle="Learning Dashboard" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Learning Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your progress and achievements</p>
          </div>
          <Link to="/courses" className="btn-primary">
            + Browse Courses
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalCourses}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completedCourses}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{inProgressCourses}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Not Started</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{notStartedCourses}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        {enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Weekly Learning Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Courses by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Course Progress Chart */}
        {enrolledCourses.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Course Progress Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#10b981" name="Progress %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
              <p className="text-gray-500 mb-6">Start your learning journey today!</p>
              <Link to="/courses" className="btn-primary inline-block">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <Link
                  key={course._id}
                  to={`/learn/${course._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Course';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{course.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-blue-600">{course.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {course.progress === 100 ? '✓ Completed' : 'Continue Learning'}
                      </span>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
