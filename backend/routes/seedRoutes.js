const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Section = require('../models/Section');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Section.deleteMany();
    await Lesson.deleteMany();
    if (Quiz) await Quiz.deleteMany();

    console.log('Cleared existing data');

    // Create users
    const instructor = await User.create({
      name: 'John Instructor',
      email: 'instructor@example.com',
      password: 'password123',
      role: 'instructor'
    });

    const student = await User.create({
      name: 'Jane Student',
      email: 'student@example.com',
      password: 'password123',
      role: 'student'
    });

    console.log('Created users');

    // Create JavaScript Course
    const jsCourse = await Course.create({
      title: 'Complete JavaScript Course',
      description: 'Master JavaScript from fundamentals to advanced concepts. Build real projects and learn modern ES6+ features.',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
      category: 'Programming',
      instructorId: instructor._id,
      totalDuration: 420
    });

    // JavaScript Sections
    const jsSection1 = await Section.create({
      title: 'JavaScript Fundamentals',
      orderNumber: 1,
      courseId: jsCourse._id
    });

    const jsSection2 = await Section.create({
      title: 'DOM Manipulation & Events',
      orderNumber: 2,
      courseId: jsCourse._id
    });

    const jsSection3 = await Section.create({
      title: 'Asynchronous JavaScript',
      orderNumber: 3,
      courseId: jsCourse._id
    });

    // JavaScript Lessons
    await Lesson.create([
      {
        title: 'JavaScript Introduction & Setup',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: 15,
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Variables, Data Types & Operators',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=9emXNzqCKyg',
        duration: 25,
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Functions & Scope',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ',
        duration: 30,
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Arrays & Objects',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c',
        duration: 35,
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Selecting & Manipulating DOM Elements',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=5fb2aPlgoys',
        duration: 28,
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Event Listeners & Event Handling',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=XF1_MlZ5l6M',
        duration: 32,
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Building Interactive Projects',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=3PHXvlpOkf4',
        duration: 45,
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Callbacks & Higher Order Functions',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=cNjIUSDnb9k',
        duration: 30,
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Promises & Promise Chaining',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=DHvZLI7Db8E',
        duration: 35,
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Async/Await & Error Handling',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
        duration: 40,
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Fetch API & Working with APIs',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=cuEtnrL9-H0',
        duration: 38,
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      }
    ]);

    // Create React Course
    const reactCourse = await Course.create({
      title: 'React - The Complete Guide',
      description: 'Learn React from scratch! Master React Hooks, Context API, Redux, and build amazing web applications.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      category: 'Programming',
      instructorId: instructor._id,
      totalDuration: 520
    });

    // React Sections
    const reactSection1 = await Section.create({
      title: 'React Basics & Components',
      orderNumber: 1,
      courseId: reactCourse._id
    });

    const reactSection2 = await Section.create({
      title: 'State Management & Hooks',
      orderNumber: 2,
      courseId: reactCourse._id
    });

    const reactSection3 = await Section.create({
      title: 'Advanced React Patterns',
      orderNumber: 3,
      courseId: reactCourse._id
    });

    // React Lessons
    await Lesson.create([
      {
        title: 'What is React? Getting Started',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        duration: 20,
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'JSX & Components Fundamentals',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=DLX62G4lc44',
        duration: 35,
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Props & Component Communication',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=PHaECbrKgs0',
        duration: 30,
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Styling React Components',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=NqpXph8fjaU',
        duration: 28,
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'useState Hook Deep Dive',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        duration: 40,
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useEffect & Side Effects',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
        duration: 45,
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useContext & Context API',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=5LrDIWkK_Bc',
        duration: 38,
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useReducer for Complex State',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=kK_Wqx3RnHk',
        duration: 42,
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'Custom Hooks',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=6ThXsUwLWvc',
        duration: 35,
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'React Router & Navigation',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
        duration: 48,
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'Performance Optimization',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=uojLJFt9SzY',
        duration: 40,
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'Building a Full React App',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=b9eMGE7QtTk',
        duration: 65,
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      }
    ]);

    // Create Python Course
    const pythonCourse = await Course.create({
      title: 'Python Programming Masterclass',
      description: 'Complete Python bootcamp from beginner to advanced. Learn Python 3, OOP, data structures, and build real projects.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
      category: 'Programming',
      instructorId: instructor._id,
      totalDuration: 480
    });

    // Python Sections
    const pySection1 = await Section.create({
      title: 'Python Basics',
      orderNumber: 1,
      courseId: pythonCourse._id
    });

    const pySection2 = await Section.create({
      title: 'Data Structures & Algorithms',
      orderNumber: 2,
      courseId: pythonCourse._id
    });

    const pySection3 = await Section.create({
      title: 'Object-Oriented Programming',
      orderNumber: 3,
      courseId: pythonCourse._id
    });

    // Python Lessons
    await Lesson.create([
      {
        title: 'Python Installation & Setup',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
        duration: 18,
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Variables & Data Types',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=Z1Yd7upQsXY',
        duration: 30,
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Control Flow - If/Else & Loops',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=PqFKRqpHrjw',
        duration: 35,
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Functions & Modules',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=9Os0o3wzS_I',
        duration: 40,
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Lists & List Comprehensions',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=3dt4OGnU5sM',
        duration: 38,
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Dictionaries & Sets',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=daefaLgNkw0',
        duration: 35,
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'File Handling & I/O',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=Uh2ebFW8OYM',
        duration: 32,
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Exception Handling',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=NIWwJbo-9_8',
        duration: 28,
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Classes & Objects',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM',
        duration: 45,
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Inheritance & Polymorphism',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=Cn7AkDb4pIU',
        duration: 42,
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Decorators & Generators',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=FsAPt_9Bf3U',
        duration: 38,
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Building Python Projects',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=8ext9G7xspg',
        duration: 55,
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      }
    ]);

    // Create Web Design Course
    const webDesignCourse = await Course.create({
      title: 'Modern Web Design with HTML & CSS',
      description: 'Learn to create beautiful, responsive websites from scratch. Master HTML5, CSS3, Flexbox, Grid, and modern design principles.',
      thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
      category: 'Design',
      instructorId: instructor._id,
      totalDuration: 380
    });

    // Web Design Sections
    const webSection1 = await Section.create({
      title: 'HTML Fundamentals',
      orderNumber: 1,
      courseId: webDesignCourse._id
    });

    const webSection2 = await Section.create({
      title: 'CSS Styling & Layouts',
      orderNumber: 2,
      courseId: webDesignCourse._id
    });

    const webSection3 = await Section.create({
      title: 'Responsive Design',
      orderNumber: 3,
      courseId: webDesignCourse._id
    });

    // Web Design Lessons
    await Lesson.create([
      {
        title: 'HTML Basics & Document Structure',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        duration: 25,
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'HTML Elements & Semantic HTML',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        duration: 30,
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Forms & Input Elements',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        duration: 28,
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Fundamentals & Selectors',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=1PnVor36_40',
        duration: 35,
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Box Model & Positioning',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=rIO5326FgPE',
        duration: 32,
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Flexbox Layout',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=fYq5PXgSsbE',
        duration: 40,
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Grid Layout',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=9zBsdzdE4sM',
        duration: 45,
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Responsive Design Principles',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
        duration: 30,
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Media Queries & Breakpoints',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=yU7jJ3NbPdA',
        duration: 35,
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Animations & Transitions',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=zHUpx90NerM',
        duration: 38,
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Building a Complete Website',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=D-h8L5hgW-w',
        duration: 60,
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      }
    ]);

    // Create Data Science Course
    const dataScienceCourse = await Course.create({
      title: 'Data Science & Machine Learning',
      description: 'Master data science with Python. Learn pandas, NumPy, data visualization, and machine learning algorithms.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Data Science',
      instructorId: instructor._id,
      totalDuration: 540
    });

    // Data Science Sections
    const dsSection1 = await Section.create({
      title: 'Python for Data Science',
      orderNumber: 1,
      courseId: dataScienceCourse._id
    });

    const dsSection2 = await Section.create({
      title: 'Data Analysis & Visualization',
      orderNumber: 2,
      courseId: dataScienceCourse._id
    });

    const dsSection3 = await Section.create({
      title: 'Machine Learning Basics',
      orderNumber: 3,
      courseId: dataScienceCourse._id
    });

    // Data Science Lessons
    await Lesson.create([
      {
        title: 'Introduction to Data Science',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        duration: 22,
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'NumPy Fundamentals',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
        duration: 45,
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Pandas for Data Analysis',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: 50,
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Data Cleaning & Preprocessing',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=bDhvCp3_lYw',
        duration: 42,
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Matplotlib Visualization',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
        duration: 38,
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Seaborn for Statistical Plots',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=6GUZXDef2U0',
        duration: 40,
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Exploratory Data Analysis',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=xi0vhXFPegw',
        duration: 48,
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Introduction to Machine Learning',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
        duration: 35,
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Linear Regression',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=7ArmBVF2dCs',
        duration: 45,
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Classification Algorithms',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=yIYKR4sgzI8',
        duration: 50,
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Model Evaluation & Optimization',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=85dtiMz9tSo',
        duration: 42,
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Real-World ML Project',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=fiz1ORTBGpY',
        duration: 65,
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      }
    ]);

    // Create Business Course
    const businessCourse = await Course.create({
      title: 'Business Strategy & Management',
      description: 'Learn essential business strategies, leadership skills, and management techniques for success in the corporate world.',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      category: 'Business',
      instructorId: instructor._id,
      totalDuration: 360
    });

    const bizSection1 = await Section.create({
      title: 'Business Fundamentals',
      orderNumber: 1,
      courseId: businessCourse._id
    });

    const bizSection2 = await Section.create({
      title: 'Leadership & Management',
      orderNumber: 2,
      courseId: businessCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Business Strategy',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=jE53O1PzmNU',
        duration: 30,
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Market Analysis & Research',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=VFIZDEb3a0w',
        duration: 35,
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Business Planning',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=69u1IfzF9LQ',
        duration: 40,
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Leadership Principles',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=aPwXeg8ThWI',
        duration: 38,
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Team Management',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=GGU1P6lBW6Q',
        duration: 42,
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      }
    ]);

    // Create Marketing Course
    const marketingCourse = await Course.create({
      title: 'Digital Marketing Mastery',
      description: 'Master SEO, social media marketing, content strategy, email marketing, and analytics for business growth.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'Marketing',
      instructorId: instructor._id,
      totalDuration: 420
    });

    const mktSection1 = await Section.create({
      title: 'Digital Marketing Basics',
      orderNumber: 1,
      courseId: marketingCourse._id
    });

    const mktSection2 = await Section.create({
      title: 'Social Media & Content',
      orderNumber: 2,
      courseId: marketingCourse._id
    });

    const mktSection3 = await Section.create({
      title: 'SEO & Analytics',
      orderNumber: 3,
      courseId: marketingCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Digital Marketing',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
        duration: 25,
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Strategy Fundamentals',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=Gjnup-PuquQ',
        duration: 30,
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Content Marketing',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=8w4agL-WfVw',
        duration: 35,
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Social Media Marketing',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=BQMzm0I5kPE',
        duration: 40,
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Facebook & Instagram Ads',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=lsJE7NXHJVI',
        duration: 45,
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Email Marketing',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=YBHqDSKkz9I',
        duration: 38,
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'SEO Fundamentals',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ',
        duration: 42,
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Google Analytics',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=gBeMELnxdIg',
        duration: 40,
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Analytics & ROI',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=8w4agL-WfVw',
        duration: 45,
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      }
    ]);

    console.log('Created all courses with sections and lessons');

    // Create quizzes for all courses
    if (Quiz) {
      await Quiz.create([
        {
          courseId: jsCourse._id,
          title: 'JavaScript Final Assessment',
          description: 'Test your JavaScript knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What is the correct way to declare a variable in JavaScript?',
              options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'int x = 5;'],
              correctAnswer: 0,
              explanation: 'var, let, or const are used to declare variables in JavaScript'
            },
            {
              question: 'Which method is used to add an element to the end of an array?',
              options: ['append()', 'push()', 'add()', 'insert()'],
              correctAnswer: 1,
              explanation: 'push() adds elements to the end of an array'
            },
            {
              question: 'What does "async/await" do in JavaScript?',
              options: ['Makes code run faster', 'Handles asynchronous operations', 'Creates loops', 'Defines functions'],
              correctAnswer: 1,
              explanation: 'async/await is used to handle asynchronous operations in a more readable way'
            }
          ]
        },
        {
          courseId: reactCourse._id,
          title: 'React Final Assessment',
          description: 'Test your React knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What is JSX?',
              options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'],
              correctAnswer: 1,
              explanation: 'JSX is a syntax extension that allows you to write HTML-like code in JavaScript'
            },
            {
              question: 'Which hook is used for side effects in React?',
              options: ['useState', 'useEffect', 'useContext', 'useReducer'],
              correctAnswer: 1,
              explanation: 'useEffect is used to perform side effects in functional components'
            },
            {
              question: 'What is the purpose of props in React?',
              options: ['To style components', 'To pass data between components', 'To create routes', 'To manage state'],
              correctAnswer: 1,
              explanation: 'Props are used to pass data from parent to child components'
            }
          ]
        },
        {
          courseId: pythonCourse._id,
          title: 'Python Final Assessment',
          description: 'Test your Python knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What is the correct file extension for Python files?',
              options: ['.python', '.py', '.pt', '.pyt'],
              correctAnswer: 1,
              explanation: '.py is the standard file extension for Python files'
            },
            {
              question: 'Which keyword is used to create a function in Python?',
              options: ['function', 'def', 'func', 'define'],
              correctAnswer: 1,
              explanation: 'def is used to define functions in Python'
            },
            {
              question: 'What does OOP stand for?',
              options: ['Object Oriented Programming', 'Only One Program', 'Open Object Protocol', 'Ordered Operation Process'],
              correctAnswer: 0,
              explanation: 'OOP stands for Object Oriented Programming'
            }
          ]
        },
        {
          courseId: webDesignCourse._id,
          title: 'Web Design Final Assessment',
          description: 'Test your HTML & CSS knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What does HTML stand for?',
              options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
              correctAnswer: 0,
              explanation: 'HTML stands for Hyper Text Markup Language'
            },
            {
              question: 'Which CSS property is used to change text color?',
              options: ['text-color', 'font-color', 'color', 'text-style'],
              correctAnswer: 2,
              explanation: 'The color property is used to change text color in CSS'
            },
            {
              question: 'What is Flexbox used for?',
              options: ['Creating animations', 'Layout design', 'Adding images', 'Writing JavaScript'],
              correctAnswer: 1,
              explanation: 'Flexbox is a CSS layout module for creating flexible layouts'
            }
          ]
        },
        {
          courseId: dataScienceCourse._id,
          title: 'Data Science Final Assessment',
          description: 'Test your Data Science knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What is pandas used for in Python?',
              options: ['Web development', 'Data manipulation and analysis', 'Game development', 'Mobile apps'],
              correctAnswer: 1,
              explanation: 'pandas is a library for data manipulation and analysis'
            },
            {
              question: 'What does ML stand for?',
              options: ['Multiple Languages', 'Machine Learning', 'Modern Logic', 'Main Loop'],
              correctAnswer: 1,
              explanation: 'ML stands for Machine Learning'
            },
            {
              question: 'Which library is commonly used for data visualization in Python?',
              options: ['Django', 'Flask', 'Matplotlib', 'React'],
              correctAnswer: 2,
              explanation: 'Matplotlib is a popular library for creating visualizations in Python'
            }
          ]
        },
        {
          courseId: businessCourse._id,
          title: 'Business Strategy Final Assessment',
          description: 'Test your Business knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What is a SWOT analysis?',
              options: ['A financial report', 'Strengths, Weaknesses, Opportunities, Threats', 'A marketing strategy', 'A sales technique'],
              correctAnswer: 1,
              explanation: 'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats'
            },
            {
              question: 'What is the primary goal of strategic management?',
              options: ['Increase sales', 'Achieve competitive advantage', 'Reduce costs', 'Hire more employees'],
              correctAnswer: 1,
              explanation: 'Strategic management aims to achieve and maintain competitive advantage'
            }
          ]
        },
        {
          courseId: marketingCourse._id,
          title: 'Digital Marketing Final Assessment',
          description: 'Test your Marketing knowledge',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              question: 'What does SEO stand for?',
              options: ['Social Engine Optimization', 'Search Engine Optimization', 'Secure Email Operation', 'System Enhancement Option'],
              correctAnswer: 1,
              explanation: 'SEO stands for Search Engine Optimization'
            },
            {
              question: 'What is the purpose of A/B testing in marketing?',
              options: ['To compare two versions', 'To create content', 'To design websites', 'To write emails'],
              correctAnswer: 0,
              explanation: 'A/B testing compares two versions to see which performs better'
            },
            {
              question: 'What is a conversion rate?',
              options: ['Website speed', 'Percentage of visitors who take desired action', 'Number of followers', 'Email open rate'],
              correctAnswer: 1,
              explanation: 'Conversion rate is the percentage of visitors who complete a desired action'
            }
          ]
        }
      ]);
      console.log('Created quizzes for all courses');
    }

    res.json({
      message: 'Database seeded successfully with comprehensive courses!',
      data: {
        users: 2,
        courses: 7,
        sections: 21,
        lessons: 72,
        quizzes: 7
      },
      testAccounts: {
        instructor: { email: 'instructor@example.com', password: 'password123' },
        student: { email: 'student@example.com', password: 'password123' }
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

module.exports = router;
