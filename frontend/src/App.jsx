import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseListing from './pages/CourseListing';
import CourseDetails from './pages/CourseDetails';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import CreateCourse from './pages/CreateCourse';
import ManageCourse from './pages/ManageCourse';
import LearningPage from './pages/LearningPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<CourseListing />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            
            <Route path="/student/dashboard" element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/learn/:courseId" element={
              <PrivateRoute role="student">
                <LearningPage />
              </PrivateRoute>
            } />
            
            <Route path="/instructor/dashboard" element={
              <PrivateRoute role="instructor">
                <InstructorDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/instructor/create-course" element={
              <PrivateRoute role="instructor">
                <CreateCourse />
              </PrivateRoute>
            } />
            
            <Route path="/instructor/manage-course/:id" element={
              <PrivateRoute role="instructor">
                <ManageCourse />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
