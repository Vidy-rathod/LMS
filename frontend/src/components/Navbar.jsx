import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold gradient-text">LearnHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Courses
            </Link>
            
            {user ? (
              <>
                {user.role === 'student' && (
                  <Link 
                    to="/student/dashboard" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    My Learning
                  </Link>
                )}
                {user.role === 'instructor' && (
                  <Link 
                    to="/instructor/dashboard" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
