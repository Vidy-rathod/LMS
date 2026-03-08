import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Section form
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [sectionData, setSectionData] = useState({ title: '', orderNumber: 1 });
  
  // Lesson form
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: '',
    youtubeUrl: '',
    duration: 0,
    orderNumber: 1,
    sectionId: ''
  });

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data.course);
      setSections(data.sections);
      setLessons(data.lessons);
      
      if (data.sections.length > 0) {
        setLessonData({ ...lessonData, sectionId: data.sections[0]._id });
      }
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sections', {
        ...sectionData,
        courseId: id
      });
      toast.success('Section created!');
      setShowSectionForm(false);
      setSectionData({ title: '', orderNumber: sections.length + 1 });
      fetchCourseData();
    } catch (error) {
      toast.error('Failed to create section');
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      await api.post('/lessons', {
        ...lessonData,
        courseId: id
      });
      toast.success('Lesson created!');
      setShowLessonForm(false);
      setLessonData({
        title: '',
        youtubeUrl: '',
        duration: 0,
        orderNumber: lessons.length + 1,
        sectionId: sections[0]?._id || ''
      });
      fetchCourseData();
    } catch (error) {
      toast.error('Failed to create lesson');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Delete this lesson?')) return;
    
    try {
      await api.delete(`/lessons/${lessonId}`);
      toast.success('Lesson deleted');
      fetchCourseData();
    } catch (error) {
      toast.error('Failed to delete lesson');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{course?.title}</h1>
        <button
          onClick={() => navigate('/instructor/dashboard')}
          className="btn-secondary"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sections */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Sections</h2>
            <button
              onClick={() => setShowSectionForm(!showSectionForm)}
              className="btn-primary"
            >
              + Add Section
            </button>
          </div>

          {showSectionForm && (
            <form onSubmit={handleCreateSection} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                placeholder="Section Title"
                value={sectionData.title}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                className="input-field mb-2"
                required
              />
              <input
                type="number"
                placeholder="Order Number"
                value={sectionData.orderNumber}
                onChange={(e) => setSectionData({ ...sectionData, orderNumber: parseInt(e.target.value) })}
                className="input-field mb-2"
                required
              />
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary">Create</button>
                <button
                  type="button"
                  onClick={() => setShowSectionForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {sections.map(section => (
              <div key={section._id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-gray-500">Order: {section.orderNumber}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Lessons</h2>
            <button
              onClick={() => setShowLessonForm(!showLessonForm)}
              className="btn-primary"
              disabled={sections.length === 0}
            >
              + Add Lesson
            </button>
          </div>

          {sections.length === 0 && (
            <p className="text-gray-500 mb-4">Create a section first</p>
          )}

          {showLessonForm && (
            <form onSubmit={handleCreateLesson} className="mb-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <input
                type="text"
                placeholder="Lesson Title"
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                className="input-field"
                required
              />
              <input
                type="url"
                placeholder="YouTube URL"
                value={lessonData.youtubeUrl}
                onChange={(e) => setLessonData({ ...lessonData, youtubeUrl: e.target.value })}
                className="input-field"
                required
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={lessonData.duration}
                onChange={(e) => setLessonData({ ...lessonData, duration: parseInt(e.target.value) })}
                className="input-field"
                required
              />
              <select
                value={lessonData.sectionId}
                onChange={(e) => setLessonData({ ...lessonData, sectionId: e.target.value })}
                className="input-field"
                required
              >
                {sections.map(section => (
                  <option key={section._id} value={section._id}>
                    {section.title}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Order Number"
                value={lessonData.orderNumber}
                onChange={(e) => setLessonData({ ...lessonData, orderNumber: parseInt(e.target.value) })}
                className="input-field"
                required
              />
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary">Create</button>
                <button
                  type="button"
                  onClick={() => setShowLessonForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {lessons.map(lesson => (
              <div key={lesson._id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-gray-500">
                      {lesson.duration} min • Order: {lesson.orderNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
