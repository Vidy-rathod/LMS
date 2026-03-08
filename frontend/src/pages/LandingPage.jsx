import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Start, switch, or advance your career with thousands of courses, Professional Certificates, and degrees from world-class instructors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  to={user.role === 'instructor' ? '/instructor/dashboard' : '/student/dashboard'}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/signup" 
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg"
                  >
                    Join for Free
                  </Link>
                  <Link 
                    to="/courses" 
                    className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all"
                  >
                    Explore Courses
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose Our Platform?</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Everything you need to succeed in your learning journey</p>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-white border border-gray-100">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Expert-Led Courses</h3>
            <p className="text-gray-600 leading-relaxed">Learn from industry professionals with real-world experience and proven track records.</p>
          </div>

          <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-white border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Track Your Progress</h3>
            <p className="text-gray-600 leading-relaxed">Monitor your learning journey with detailed analytics and achievement tracking.</p>
          </div>

          <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-white border border-gray-100">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Learn at Your Pace</h3>
            <p className="text-gray-600 leading-relaxed">Access courses anytime, anywhere. Learn on your schedule with lifetime access.</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Explore Top Categories</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Find the perfect course for your goals</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Programming', icon: '💻', color: 'from-blue-500 to-blue-600' },
              { name: 'Design', icon: '🎨', color: 'from-pink-500 to-rose-600' },
              { name: 'Business', icon: '💼', color: 'from-green-500 to-emerald-600' },
              { name: 'Marketing', icon: '📈', color: 'from-orange-500 to-amber-600' },
              { name: 'Data Science', icon: '📊', color: 'from-purple-500 to-violet-600' },
              { name: 'Other', icon: '✨', color: 'from-indigo-500 to-blue-600' }
            ].map((category) => (
              <Link
                key={category.name}
                to="/courses"
                className={`bg-gradient-to-br ${category.color} text-white p-6 rounded-xl text-center hover:shadow-xl transform hover:scale-105 transition-all`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of students already learning on our platform</p>
          {!user && (
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg"
            >
              Get Started Today
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Forum</a></li>
                <li><a href="#" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 LMS Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
