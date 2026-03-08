import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course._id}`} className="course-card block">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Course+Image';
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="badge badge-primary backdrop-blur-sm bg-white/90">
            {course.category}
          </span>
        </div>
        {course.averageRating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-semibold text-sm">{course.averageRating}</span>
            <span className="text-gray-500 text-xs ml-1">({course.totalReviews})</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{course.instructorId?.name || 'Instructor'}</span>
          </div>
          
          {course.totalDuration > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{course.totalDuration} min</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">Free</span>
            <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View Course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
