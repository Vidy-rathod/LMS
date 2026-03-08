import { useState } from 'react';

const CourseFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, category, level });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ searchTerm, category: value, level });
  };

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setLevel(value);
    onFilterChange({ searchTerm, category, level: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Courses
          </label>
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={level}
            onChange={handleLevelChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
