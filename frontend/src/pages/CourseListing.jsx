import { useState, useEffect } from 'react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';
import toast from 'react-hot-toast';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Other'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filter === 'All' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-2">No courses found</p>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseListing;
