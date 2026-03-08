import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: 'Programming'
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/courses', formData);
      toast.success('Course created successfully!');
      navigate(`/instructor/manage-course/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/instructor/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Share your knowledge with students around the world</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Complete Web Development Bootcamp"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Choose a clear, descriptive title that tells students what they'll learn
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe what students will learn, who this course is for, and what makes it unique..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                A compelling description helps students understand the value of your course
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      formData.category === cat
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Add a custom thumbnail image. Leave empty for default.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Course...
                  </span>
                ) : (
                  'Create Course'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/instructor/dashboard')}
                className="flex-1 sm:flex-none bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
