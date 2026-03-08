require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const Section = require('./models/Section');
const Lesson = require('./models/Lesson');
const Quiz = require('./models/Quiz');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Section.deleteMany();
    await Lesson.deleteMany();
    await Quiz.deleteMany();

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
      totalDuration: 640
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

    // JavaScript Lessons - 20 videos
    await Lesson.create([
      {
        title: 'JavaScript Introduction & Setup',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: 15,
        description: 'Welcome to JavaScript! In this introductory lesson, you\'ll learn what JavaScript is, why it\'s essential for web development, and how to set up your development environment. We\'ll install a code editor, configure your browser\'s developer tools, and write your first "Hello World" program. Perfect for absolute beginners!',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Variables, Data Types & Operators',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=9emXNzqCKyg',
        duration: 25,
        description: 'Master the building blocks of JavaScript! Learn how to declare variables using let, const, and var. Explore different data types including strings, numbers, booleans, null, and undefined. Understand arithmetic, comparison, and logical operators. By the end, you\'ll be able to store and manipulate data effectively.',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Functions & Scope',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ',
        duration: 30,
        description: 'Functions are the heart of JavaScript! Learn how to create reusable code blocks with function declarations, expressions, and arrow functions. Understand parameters, return values, and the crucial concept of scope (global vs local). We\'ll also cover hoisting and best practices for writing clean, maintainable functions.',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Arrays & Objects',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c',
        duration: 35,
        description: 'Dive into JavaScript\'s most important data structures! Learn how to create and manipulate arrays with methods like push, pop, map, filter, and reduce. Master objects with properties and methods. Understand destructuring, spread operator, and how to work with nested data structures. Essential for real-world programming!',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Conditional Statements & Loops',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=IsG4Xd6LlsM',
        duration: 28,
        description: 'Control the flow of your programs! Master if/else statements, switch cases, and ternary operators. Learn all about loops: for, while, do-while, and for...of. Understand break and continue statements. Practice with real-world examples like form validation and data processing.',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'String Methods & Manipulation',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=VRz0nbax0uI',
        duration: 22,
        description: 'Become a string manipulation expert! Learn essential string methods like slice, substring, replace, split, and join. Master template literals for dynamic strings. Understand string searching with indexOf, includes, and regular expressions. Perfect for text processing and data formatting.',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Array Methods Deep Dive',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c',
        duration: 32,
        description: 'Master advanced array operations! Deep dive into map, filter, reduce, find, some, and every. Learn how to chain methods for powerful data transformations. Understand when to use each method and practice with real-world scenarios like filtering products, calculating totals, and transforming data.',
        sectionId: jsSection1._id,
        courseId: jsCourse._id
      },
      {
        title: 'Selecting & Manipulating DOM Elements',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=5fb2aPlgoys',
        duration: 28,
        description: 'Bring your web pages to life! Learn how to select HTML elements using querySelector, getElementById, and other DOM methods. Modify element content, attributes, and styles dynamically. Create, append, and remove elements from the page. This is where JavaScript meets HTML to create interactive experiences!',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Event Listeners & Event Handling',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=XF1_MlZ5l6M',
        duration: 32,
        description: 'Make your websites interactive! Master event listeners for clicks, keyboard input, mouse movements, and form submissions. Learn about event bubbling, capturing, and delegation. Understand the event object and how to prevent default behaviors. Build responsive interfaces that react to user actions in real-time.',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Form Validation & Input Handling',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=rsd4FNGTRBw',
        duration: 30,
        description: 'Create professional forms with validation! Learn to capture user input, validate email addresses, check password strength, and provide real-time feedback. Master form events like submit, change, and input. Build a complete registration form with client-side validation.',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Building Interactive Projects',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=3PHXvlpOkf4',
        duration: 45,
        description: 'Put your skills to the test! Build three complete projects: a to-do list app, an image slider, and a calculator. Learn project planning, code organization, and debugging techniques. This hands-on lesson combines everything you\'ve learned so far into real, functional applications you can add to your portfolio.',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Local Storage & Session Storage',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=GihQAC1I39Q',
        duration: 25,
        description: 'Store data in the browser! Learn how to use localStorage and sessionStorage to persist data across page reloads. Understand the difference between the two storage types. Build a notes app that saves data locally. Perfect for creating offline-capable applications.',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'JSON & Working with Data',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=iiADhChRriM',
        duration: 28,
        description: 'Master data interchange! Learn what JSON is and why it\'s the standard for data exchange. Practice JSON.parse() and JSON.stringify(). Work with complex nested JSON structures. Understand how to send and receive JSON data from APIs.',
        sectionId: jsSection2._id,
        courseId: jsCourse._id
      },
      {
        title: 'Callbacks & Higher Order Functions',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=cNjIUSDnb9k',
        duration: 30,
        description: 'Level up your JavaScript skills! Understand callbacks and how functions can be passed as arguments. Master higher-order functions like map, filter, reduce, and forEach. Learn functional programming concepts and how to write more elegant, reusable code. This is a game-changer for writing professional JavaScript!',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Promises & Promise Chaining',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=DHvZLI7Db8E',
        duration: 35,
        description: 'Conquer asynchronous JavaScript! Learn what promises are and why they\'re essential for modern web development. Master promise creation, .then(), .catch(), and .finally() methods. Understand promise chaining and how to handle multiple asynchronous operations. Say goodbye to callback hell and write cleaner async code!',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Async/Await & Error Handling',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU',
        duration: 40,
        description: 'Master modern asynchronous JavaScript! Learn async/await syntax for writing asynchronous code that looks synchronous. Implement proper error handling with try-catch blocks. Understand how to handle multiple async operations in parallel and sequence. This is the modern way to work with APIs and asynchronous operations!',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Fetch API & Working with APIs',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=cuEtnrL9-H0',
        duration: 38,
        description: 'Connect to the world! Master the Fetch API for making HTTP requests. Learn GET, POST, PUT, and DELETE methods. Handle API responses and errors gracefully. Work with real APIs to fetch weather data, user information, and more. Build a complete weather app using a public API.',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'ES6+ Modern JavaScript Features',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc',
        duration: 35,
        description: 'Write modern JavaScript! Learn ES6+ features including destructuring, spread/rest operators, template literals, and optional chaining. Master default parameters, enhanced object literals, and shorthand syntax. Understand modules with import/export. Stay current with the latest JavaScript standards!',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'Object-Oriented Programming in JavaScript',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=PFmuCDHHpwk',
        duration: 42,
        description: 'Master OOP concepts! Learn about classes, constructors, and inheritance. Understand prototypes and the prototype chain. Implement encapsulation, polymorphism, and abstraction. Build reusable, maintainable code using object-oriented principles. Create a complete class-based application.',
        sectionId: jsSection3._id,
        courseId: jsCourse._id
      },
      {
        title: 'JavaScript Best Practices & Final Project',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=Mus_vwhTCq0',
        duration: 50,
        description: 'Become a JavaScript pro! Learn industry best practices for code organization, naming conventions, and performance optimization. Understand debugging techniques and common pitfalls to avoid. Build a complete full-stack application combining all concepts: a task management system with API integration, local storage, and modern ES6+ features. Congratulations on completing the course!',
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

    // React Lessons - 20 videos with descriptions
    await Lesson.create([
      {
        title: 'What is React? Getting Started',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        duration: 20,
        description: 'Welcome to React! Discover what React is, why it\'s the most popular JavaScript library for building user interfaces, and how it revolutionizes web development. Learn about the virtual DOM, component-based architecture, and set up your first React development environment with Create React App.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'JSX & Components Fundamentals',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=DLX62G4lc44',
        duration: 35,
        description: 'Master JSX, the syntax extension that makes React powerful! Learn how to write HTML-like code in JavaScript, understand JSX rules and best practices, and create your first functional components. Explore component composition and how to build reusable UI elements.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Props & Component Communication',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=PHaECbrKgs0',
        duration: 30,
        description: 'Learn how components talk to each other! Master props for passing data from parent to child components. Understand prop types, default props, and prop drilling. Practice building a component hierarchy with proper data flow and communication patterns.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Styling React Components',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=NqpXph8fjaU',
        duration: 28,
        description: 'Make your React apps beautiful! Explore different styling approaches including inline styles, CSS modules, styled-components, and CSS-in-JS. Learn conditional styling, dynamic classes, and best practices for organizing styles in React applications.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Handling Events in React',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=Znqv84xi8Vs',
        duration: 25,
        description: 'Make your components interactive! Learn how to handle user events like clicks, form submissions, and keyboard input. Understand event handling in React, synthetic events, and how to pass arguments to event handlers. Build interactive buttons, forms, and user interfaces.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Lists and Keys in React',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=0sasRxl35_8',
        duration: 22,
        description: 'Render dynamic lists efficiently! Master the map() function for rendering arrays of data. Understand why keys are crucial for React\'s reconciliation algorithm. Learn best practices for choosing keys and optimizing list rendering performance.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'Conditional Rendering Techniques',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=4oCVDkb_EIs',
        duration: 20,
        description: 'Control what users see! Learn multiple techniques for conditional rendering including if-else statements, ternary operators, and logical && operator. Build components that adapt to different states and user permissions. Master showing/hiding elements dynamically.',
        sectionId: reactSection1._id,
        courseId: reactCourse._id
      },
      {
        title: 'useState Hook Deep Dive',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        duration: 40,
        description: 'Master React state management! Deep dive into the useState hook for adding state to functional components. Learn how to update state correctly, handle multiple state variables, and understand state batching. Build counters, toggles, and form inputs with state.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useEffect & Side Effects',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
        duration: 45,
        description: 'Handle side effects like a pro! Master useEffect for data fetching, subscriptions, and DOM manipulation. Understand the dependency array, cleanup functions, and common useEffect patterns. Learn when and how to use useEffect for optimal performance.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'Forms and Controlled Components',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=7Vo_VCcWupQ',
        duration: 35,
        description: 'Build professional forms in React! Learn controlled vs uncontrolled components, handle form submissions, and manage form state. Implement input validation, error messages, and create multi-step forms. Master text inputs, checkboxes, radio buttons, and select dropdowns.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useContext & Context API',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=5LrDIWkK_Bc',
        duration: 38,
        description: 'Avoid prop drilling with Context! Learn how to share data across your component tree without passing props manually. Create context providers, consume context with useContext hook, and build a theme switcher and authentication system using Context API.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useReducer for Complex State',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=kK_Wqx3RnHk',
        duration: 42,
        description: 'Manage complex state logic! Learn when to use useReducer instead of useState. Understand reducers, actions, and dispatch. Build a shopping cart, todo list, and form with complex state transitions. Compare useReducer with Redux patterns.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useRef and DOM Manipulation',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=t2ypzz6gJm0',
        duration: 28,
        description: 'Access DOM elements directly! Master useRef for accessing and manipulating DOM nodes, storing mutable values, and managing focus. Learn the difference between refs and state, and when to use each. Build auto-focus inputs and scroll-to-top functionality.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'useMemo and useCallback Optimization',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=THL1OPn72vo',
        duration: 32,
        description: 'Optimize your React apps! Learn how useMemo and useCallback prevent unnecessary re-renders and expensive calculations. Understand when optimization is needed and when it\'s premature. Profile your app\'s performance and apply memoization strategically.',
        sectionId: reactSection2._id,
        courseId: reactCourse._id
      },
      {
        title: 'Custom Hooks',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=6ThXsUwLWvc',
        duration: 35,
        description: 'Create reusable logic! Learn how to build custom hooks to extract and share component logic. Build hooks for form handling, data fetching, local storage, and window dimensions. Understand hook composition and best practices for custom hook design.',
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'React Router & Navigation',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
        duration: 48,
        description: 'Build multi-page applications! Master React Router for client-side routing. Learn about Routes, Links, nested routes, and URL parameters. Implement protected routes, navigation guards, and programmatic navigation. Build a complete multi-page app with navigation.',
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'API Integration and Data Fetching',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=T3Px88x_PsA',
        duration: 42,
        description: 'Connect to real APIs! Learn how to fetch data from REST APIs using fetch and axios. Handle loading states, errors, and success responses. Implement CRUD operations (Create, Read, Update, Delete) and build a complete data-driven application.',
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'Error Boundaries and Error Handling',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=DNYXgtZBRPE',
        duration: 30,
        description: 'Handle errors gracefully! Learn about Error Boundaries for catching JavaScript errors in components. Implement fallback UIs, error logging, and recovery strategies. Build robust applications that handle failures elegantly and provide great user experience.',
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'Performance Optimization',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=uojLJFt9SzY',
        duration: 40,
        description: 'Make your React apps lightning fast! Learn React.memo, lazy loading, code splitting, and virtualization. Use React DevTools Profiler to identify performance bottlenecks. Implement windowing for large lists and optimize bundle size with dynamic imports.',
        sectionId: reactSection3._id,
        courseId: reactCourse._id
      },
      {
        title: 'Building a Full React App',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=b9eMGE7QtTk',
        duration: 65,
        description: 'Put it all together! Build a complete, production-ready React application from scratch. Implement authentication, routing, state management, API integration, and deployment. Learn project structure, best practices, and how to organize a real-world React codebase. Congratulations on mastering React!',
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

    // Python Lessons - 20 videos with descriptions
    await Lesson.create([
      {
        title: 'Python Installation & Setup',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
        duration: 18,
        description: 'Start your Python journey! Learn how to install Python on Windows, Mac, and Linux. Set up your development environment with VS Code or PyCharm. Write and run your first Python program. Understand the Python interpreter and how to use the interactive shell.',
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Variables & Data Types',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=Z1Yd7upQsXY',
        duration: 30,
        description: 'Master Python fundamentals! Learn about variables, naming conventions, and Python\'s dynamic typing. Explore data types including integers, floats, strings, booleans, and None. Understand type conversion and how to check variable types with type() function.',
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Control Flow - If/Else & Loops',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=PqFKRqpHrjw',
        duration: 35,
        description: 'Control your program flow! Master if, elif, and else statements for decision making. Learn for and while loops for iteration. Understand break, continue, and pass statements. Practice with real-world examples like grade calculators and number guessing games.',
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Functions & Modules',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=9Os0o3wzS_I',
        duration: 40,
        description: 'Write reusable code! Learn how to define functions with def, use parameters and return values. Understand scope, default arguments, and *args/**kwargs. Import and use Python modules. Create your own modules for code organization.',
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Strings and String Methods',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=k9TUPpGqYTo',
        duration: 32,
        description: 'Master text manipulation! Learn string indexing, slicing, and concatenation. Explore powerful string methods like split(), join(), replace(), and format(). Use f-strings for modern string formatting. Handle multi-line strings and escape characters.',
        sectionId: pySection1._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Lists & List Comprehensions',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=3dt4OGnU5sM',
        duration: 38,
        description: 'Work with collections! Master Python lists for storing multiple items. Learn list methods like append(), extend(), insert(), and remove(). Understand list slicing and indexing. Write elegant list comprehensions for data transformation and filtering.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Tuples and Named Tuples',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=NI26dqhs2Rk',
        duration: 25,
        description: 'Understand immutable sequences! Learn when to use tuples instead of lists. Master tuple packing and unpacking. Explore named tuples for readable, self-documenting code. Use tuples for multiple return values and as dictionary keys.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Dictionaries & Sets',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=daefaLgNkw0',
        duration: 35,
        description: 'Master key-value pairs! Learn Python dictionaries for fast data lookup. Understand dictionary methods, iteration, and comprehensions. Explore sets for unique collections and set operations like union, intersection, and difference.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'File Handling & I/O',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=Uh2ebFW8OYM',
        duration: 32,
        description: 'Read and write files! Learn how to open, read, write, and close files. Use context managers with the "with" statement. Handle different file modes and encodings. Work with CSV files and JSON data. Build a file-based note-taking application.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Exception Handling',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=NIWwJbo-9_8',
        duration: 28,
        description: 'Handle errors gracefully! Master try-except blocks for catching exceptions. Learn about different exception types and how to raise custom exceptions. Use finally for cleanup code. Build robust programs that handle errors without crashing.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Lambda Functions and Map/Filter/Reduce',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=hUes6y2b--0',
        duration: 30,
        description: 'Write functional Python! Learn lambda functions for quick, anonymous functions. Master map(), filter(), and reduce() for data transformation. Understand when to use lambda vs regular functions. Apply functional programming concepts to real problems.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Iterators and Generators',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=jTYiNjvnHZY',
        duration: 35,
        description: 'Master advanced iteration! Understand iterators and the iterator protocol. Create generators with yield for memory-efficient iteration. Learn generator expressions and when to use them. Build infinite sequences and data pipelines.',
        sectionId: pySection2._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Classes & Objects',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM',
        duration: 45,
        description: 'Enter object-oriented programming! Learn how to create classes and objects. Understand __init__ constructor, instance variables, and methods. Master self parameter and instance vs class attributes. Build a complete class-based application.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Inheritance & Polymorphism',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=Cn7AkDb4pIU',
        duration: 42,
        description: 'Extend your classes! Master inheritance for code reuse and creating class hierarchies. Understand method overriding and super(). Learn polymorphism and duck typing. Implement abstract base classes and interfaces for robust OOP design.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Magic Methods and Operator Overloading',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=3ohzBxoFHAY',
        duration: 38,
        description: 'Unlock Python\'s magic! Learn special methods like __str__, __repr__, __len__, and __add__. Implement operator overloading to make your classes work with +, -, *, and other operators. Create classes that behave like built-in types.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Decorators & Generators',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=FsAPt_9Bf3U',
        duration: 38,
        description: 'Master advanced Python features! Learn decorators for modifying function behavior. Create your own decorators for logging, timing, and caching. Understand closure and how decorators work under the hood. Apply decorators to real-world problems.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Working with APIs and Requests',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=qriL9Qe8pJc',
        duration: 40,
        description: 'Connect to the web! Learn how to make HTTP requests with the requests library. Fetch data from REST APIs, handle JSON responses, and send POST requests. Build a weather app and work with real-world APIs like GitHub and OpenWeather.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Regular Expressions',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=K8L6KVGG-7o',
        duration: 35,
        description: 'Master pattern matching! Learn regular expressions for text searching and manipulation. Understand regex syntax, special characters, and quantifiers. Use re module for finding, replacing, and validating text patterns. Validate emails, phone numbers, and more.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Virtual Environments and Package Management',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=APOPm01BVrk',
        duration: 28,
        description: 'Manage Python projects professionally! Learn how to create virtual environments with venv. Install packages with pip and manage dependencies with requirements.txt. Understand why virtual environments are essential for Python development.',
        sectionId: pySection3._id,
        courseId: pythonCourse._id
      },
      {
        title: 'Building Python Projects',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=8ext9G7xspg',
        duration: 55,
        description: 'Build real applications! Create three complete Python projects: a command-line todo app, a web scraper, and an API client. Learn project structure, best practices, and how to organize larger Python codebases. Congratulations on mastering Python!',
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

    // Web Design Lessons - 20 videos with descriptions
    await Lesson.create([
      {
        title: 'HTML Basics & Document Structure',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        duration: 25,
        description: 'Start your web design journey! Learn HTML fundamentals including document structure, DOCTYPE, head, and body elements. Understand how browsers interpret HTML and create your first web page. Master the building blocks of every website.',
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'HTML Elements & Semantic HTML',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        duration: 30,
        description: 'Write meaningful HTML! Learn semantic elements like header, nav, main, article, section, and footer. Understand headings, paragraphs, lists, and links. Build accessible, SEO-friendly websites with proper HTML structure.',
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Forms & Input Elements',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        duration: 28,
        description: 'Create interactive forms! Master form elements including text inputs, textareas, checkboxes, radio buttons, and select dropdowns. Learn form attributes, labels, and validation. Build contact forms and registration pages.',
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Images, Links, and Media',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=TSRh2V-dJtY',
        duration: 22,
        description: 'Add multimedia to your pages! Learn how to embed images with proper alt text, create navigation with links, and add video and audio elements. Understand image formats, optimization, and responsive images with srcset.',
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Tables and Data Presentation',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=dK8SMJkwZyI',
        duration: 20,
        description: 'Display tabular data! Master HTML tables with thead, tbody, tfoot, and proper table structure. Learn when to use tables vs other layout methods. Create accessible, well-structured data tables with captions and headers.',
        sectionId: webSection1._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Fundamentals & Selectors',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=1PnVor36_40',
        duration: 35,
        description: 'Style your websites! Learn CSS syntax, how to link stylesheets, and master selectors including element, class, ID, and attribute selectors. Understand specificity and the cascade. Transform plain HTML into beautiful designs.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Colors, Typography, and Text Styling',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=2wy4qTZSDpM',
        duration: 30,
        description: 'Make text beautiful! Master color properties, font families, font sizes, and text styling. Learn about web fonts with Google Fonts, text alignment, line height, and letter spacing. Create visually appealing typography.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Box Model & Positioning',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=rIO5326FgPE',
        duration: 32,
        description: 'Understand CSS layout fundamentals! Master the box model with content, padding, border, and margin. Learn positioning with static, relative, absolute, fixed, and sticky. Control element dimensions and spacing precisely.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Display Property and Block vs Inline',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=Qf-wVa9y9V4',
        duration: 25,
        description: 'Control element behavior! Understand the display property and differences between block, inline, and inline-block elements. Learn when to use each display type and how to create custom layouts with display properties.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Flexbox Layout',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=fYq5PXgSsbE',
        duration: 40,
        description: 'Master modern layouts! Learn Flexbox for creating flexible, responsive layouts. Understand flex containers and items, justify-content, align-items, and flex-direction. Build navigation bars, card layouts, and centered content with ease.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Grid Layout',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=9zBsdzdE4sM',
        duration: 45,
        description: 'Create complex layouts! Master CSS Grid for two-dimensional layouts. Learn grid containers, grid items, grid-template-columns, grid-template-rows, and grid areas. Build magazine-style layouts and responsive grids.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Backgrounds and Gradients',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=qGhKdNRjGf8',
        duration: 28,
        description: 'Add visual depth! Master background properties including background-color, background-image, and background-size. Create linear and radial gradients. Use multiple backgrounds and background blend modes for stunning effects.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Borders, Shadows, and Effects',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=RjgS0S0fd_0',
        duration: 25,
        description: 'Add polish to your designs! Learn border properties, border-radius for rounded corners, box-shadow for depth, and text-shadow for text effects. Create cards, buttons, and modern UI elements with visual appeal.',
        sectionId: webSection2._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Responsive Design Principles',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
        duration: 30,
        description: 'Design for all devices! Learn responsive design principles including fluid layouts, flexible images, and mobile-first approach. Understand viewport meta tag and how to think responsively from the start.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Media Queries & Breakpoints',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=yU7jJ3NbPdA',
        duration: 35,
        description: 'Adapt to screen sizes! Master media queries for creating responsive layouts. Learn common breakpoints for mobile, tablet, and desktop. Use min-width and max-width queries to adjust styles based on screen size.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Transitions',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=Nloq6uzF8RQ',
        duration: 30,
        description: 'Add smooth animations! Learn CSS transitions for animating property changes. Master transition-property, transition-duration, transition-timing-function, and transition-delay. Create hover effects and smooth state changes.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Animations & Keyframes',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=zHUpx90NerM',
        duration: 38,
        description: 'Create complex animations! Master @keyframes for defining animation sequences. Learn animation properties including animation-name, animation-duration, and animation-iteration-count. Build loading spinners, sliding menus, and animated effects.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'CSS Variables and Custom Properties',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=oZPR_78wCnY',
        duration: 25,
        description: 'Write maintainable CSS! Learn CSS custom properties (variables) for reusable values. Create theme systems with color variables. Understand scope and how to use variables for consistent, maintainable stylesheets.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Modern CSS Features and Best Practices',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=Qhaz36TZG5Y',
        duration: 32,
        description: 'Stay current with CSS! Learn modern features like clamp(), min(), max(), aspect-ratio, and gap. Understand CSS architecture, naming conventions like BEM, and how to organize large stylesheets. Write clean, maintainable CSS.',
        sectionId: webSection3._id,
        courseId: webDesignCourse._id
      },
      {
        title: 'Building a Complete Website',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=D-h8L5hgW-w',
        duration: 60,
        description: 'Put it all together! Build a complete, responsive website from scratch using HTML and CSS. Create a multi-page site with navigation, hero section, features, testimonials, and contact form. Learn deployment and best practices. Congratulations on mastering web design!',
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

    // Data Science Lessons - 20 videos with descriptions
    await Lesson.create([
      {
        title: 'Introduction to Data Science',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        duration: 22,
        description: 'Welcome to data science! Discover what data science is, its applications in industry, and the data science workflow. Learn about the tools and technologies used by data scientists. Understand the difference between data science, machine learning, and AI.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Python for Data Science Setup',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        duration: 20,
        description: 'Set up your data science environment! Install Anaconda, Jupyter Notebook, and essential libraries. Learn how to use Jupyter for interactive data analysis. Understand package management with conda and pip for data science projects.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'NumPy Fundamentals',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
        duration: 45,
        description: 'Master numerical computing! Learn NumPy arrays for efficient numerical operations. Understand array creation, indexing, slicing, and reshaping. Perform mathematical operations, broadcasting, and vectorization. NumPy is the foundation of data science in Python.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'NumPy Advanced Operations',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=8Y0qQEh7dJg',
        duration: 35,
        description: 'Level up your NumPy skills! Learn advanced indexing, boolean masking, and fancy indexing. Master linear algebra operations, statistical functions, and random number generation. Work with multi-dimensional arrays efficiently.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Pandas for Data Analysis',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: 50,
        description: 'Master data manipulation! Learn Pandas Series and DataFrames for working with structured data. Understand data selection, filtering, and indexing. Load data from CSV, Excel, and databases. Pandas is your primary tool for data analysis.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Data Cleaning & Preprocessing',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=bDhvCp3_lYw',
        duration: 42,
        description: 'Clean messy data! Learn how to handle missing values, duplicates, and outliers. Master data type conversion, string manipulation, and date/time handling. Understand data normalization and standardization. Clean data is crucial for accurate analysis.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Data Aggregation and GroupBy',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=txMdrV1Ut64',
        duration: 38,
        description: 'Summarize your data! Master groupby operations for aggregating data. Learn split-apply-combine methodology. Calculate statistics by groups, create pivot tables, and perform complex aggregations. Essential for data analysis and reporting.',
        sectionId: dsSection1._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Matplotlib Visualization',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
        duration: 38,
        description: 'Visualize your data! Learn Matplotlib for creating line plots, bar charts, scatter plots, and histograms. Master figure and axes objects, customization, and styling. Create publication-quality visualizations for data exploration and presentation.',
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Seaborn for Statistical Plots',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=6GUZXDef2U0',
        duration: 40,
        description: 'Create beautiful statistical visualizations! Learn Seaborn for advanced plotting. Master distribution plots, categorical plots, and regression plots. Understand heatmaps, pair plots, and facet grids. Seaborn makes complex visualizations simple.',
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Exploratory Data Analysis',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=xi0vhXFPegw',
        duration: 48,
        description: 'Discover insights in your data! Learn EDA techniques for understanding data distributions, relationships, and patterns. Calculate summary statistics, create visualizations, and identify trends. EDA is the first step in any data science project.',
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Statistical Analysis Fundamentals',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=xxpc-HPKN28',
        duration: 42,
        description: 'Understand statistics for data science! Learn descriptive statistics, probability distributions, and hypothesis testing. Master correlation, covariance, and statistical significance. Apply statistical thinking to data analysis problems.',
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Feature Engineering Techniques',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=6WDFfaYtN6s',
        duration: 40,
        description: 'Create better features! Learn feature engineering techniques including encoding categorical variables, scaling numerical features, and creating interaction terms. Master feature selection and dimensionality reduction. Good features make better models.',
        sectionId: dsSection2._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Introduction to Machine Learning',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
        duration: 35,
        description: 'Enter machine learning! Understand supervised vs unsupervised learning, classification vs regression. Learn the machine learning workflow from data preparation to model evaluation. Get introduced to scikit-learn, the primary ML library in Python.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Linear Regression',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=7ArmBVF2dCs',
        duration: 45,
        description: 'Build your first ML model! Master linear regression for predicting continuous values. Understand the math behind linear regression, cost functions, and gradient descent. Implement simple and multiple linear regression. Evaluate model performance with metrics.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Logistic Regression and Classification',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=yIYKR4sgzI8',
        duration: 42,
        description: 'Classify data with logistic regression! Learn binary and multi-class classification. Understand the sigmoid function, decision boundaries, and probability predictions. Evaluate classifiers with accuracy, precision, recall, and F1-score.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Decision Trees and Random Forests',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=_L39rN6gz7Y',
        duration: 48,
        description: 'Master tree-based models! Learn decision trees for classification and regression. Understand tree splitting, pruning, and overfitting. Master Random Forests for ensemble learning. These powerful models work great on many problems.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'K-Means Clustering',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=4b5d3muPQmA',
        duration: 35,
        description: 'Discover patterns with unsupervised learning! Master K-Means clustering for grouping similar data points. Learn how to choose the optimal number of clusters with the elbow method. Apply clustering to customer segmentation and data exploration.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Model Evaluation & Optimization',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=85dtiMz9tSo',
        duration: 42,
        description: 'Build better models! Master train-test split, cross-validation, and hyperparameter tuning. Learn about overfitting, underfitting, and the bias-variance tradeoff. Use GridSearchCV for finding optimal model parameters.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Introduction to Deep Learning',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
        duration: 45,
        description: 'Enter the world of neural networks! Learn the basics of deep learning, neural network architecture, and activation functions. Understand backpropagation and gradient descent. Get introduced to TensorFlow and Keras for building neural networks.',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      },
      {
        title: 'Real-World ML Project',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=fiz1ORTBGpY',
        duration: 65,
        description: 'Build an end-to-end project! Create a complete machine learning project from data collection to model deployment. Learn project workflow, best practices, and how to present your findings. Build a portfolio project that showcases your data science skills. Congratulations on mastering data science!',
        sectionId: dsSection3._id,
        courseId: dataScienceCourse._id
      }
    ]);

    // Create Business Course
    const businessCourse = await Course.create({
      title: 'Business Fundamentals & Entrepreneurship',
      description: 'Learn essential business skills, from starting a company to managing operations. Master business strategy, finance, and leadership.',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      category: 'Business',
      instructorId: instructor._id,
      totalDuration: 520
    });

    const bizSection1 = await Section.create({
      title: 'Business Basics & Strategy',
      orderNumber: 1,
      courseId: businessCourse._id
    });

    const bizSection2 = await Section.create({
      title: 'Finance & Operations',
      orderNumber: 2,
      courseId: businessCourse._id
    });

    const bizSection3 = await Section.create({
      title: 'Leadership & Growth',
      orderNumber: 3,
      courseId: businessCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Business & Entrepreneurship',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=gGwsNNp7v3U',
        duration: 20,
        description: 'Start your business journey! Learn what it takes to be an entrepreneur, understand different business models, and discover how to identify profitable opportunities. We\'ll cover the entrepreneurial mindset, risk management, and the basics of starting your own venture.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Business Planning & Strategy',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=VVl6jXGBUMo',
        duration: 30,
        description: 'Create a winning business plan! Learn how to write a comprehensive business plan, conduct market research, and develop competitive strategies. Understand SWOT analysis, value propositions, and how to position your business for success in the marketplace.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Market Research & Analysis',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=1aejV4dGBnw',
        duration: 25,
        description: 'Know your market inside out! Master market research techniques, learn to analyze competitors, and understand customer behavior. Discover how to use surveys, focus groups, and data analysis to make informed business decisions.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Business Models & Revenue Streams',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=IP0cUBWTgpY',
        duration: 28,
        description: 'Design your revenue model! Explore different business models from subscription to freemium, B2B to B2C. Learn how to create multiple revenue streams and build a sustainable business that generates consistent income.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Legal Structures & Business Registration',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=WJRoJRHcO4A',
        duration: 22,
        description: 'Set up your business legally! Understand different legal structures (LLC, Corporation, Sole Proprietorship), learn about business registration, licenses, and permits. Get clarity on legal requirements and protect your business from day one.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Branding & Brand Identity',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=X3_Fnv3p6Zw',
        duration: 26,
        description: 'Build a memorable brand! Learn the fundamentals of branding, create a unique brand identity, and develop a brand strategy. Understand logos, color psychology, brand voice, and how to make your business stand out in a crowded market.',
        sectionId: bizSection1._id,
        courseId: businessCourse._id
      },
      {
        title: 'Financial Management Basics',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=WEDIj9JBTC8',
        duration: 32,
        description: 'Master business finances! Learn to read financial statements, understand cash flow, and manage budgets. Discover the difference between profit and cash flow, and learn essential financial metrics every business owner must know.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Accounting & Bookkeeping Essentials',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=qH0D3t0-KPQ',
        duration: 28,
        description: 'Keep your books in order! Learn basic accounting principles, understand debits and credits, and master bookkeeping essentials. Discover accounting software options and learn how to maintain accurate financial records for your business.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Funding & Investment Strategies',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=0CDXJ6bMkMY',
        duration: 30,
        description: 'Fund your business growth! Explore different funding options including bootstrapping, angel investors, venture capital, and crowdfunding. Learn how to pitch to investors, value your company, and negotiate investment deals.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Pricing Strategies & Profit Margins',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=nD7fBGqPNXQ',
        duration: 24,
        description: 'Price for profit! Master pricing psychology, learn cost-plus and value-based pricing strategies. Understand how to calculate profit margins, set competitive prices, and maximize revenue without losing customers.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Operations & Supply Chain Management',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=lZXhbJqKIxI',
        duration: 27,
        description: 'Streamline your operations! Learn operations management fundamentals, optimize supply chains, and improve efficiency. Understand inventory management, vendor relationships, and how to scale operations as your business grows.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Customer Service Excellence',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=cPC4RxRJVEo',
        duration: 23,
        description: 'Delight your customers! Master customer service best practices, learn to handle complaints effectively, and build customer loyalty. Discover how exceptional service creates repeat business and positive word-of-mouth marketing.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Sales Techniques & Closing Deals',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=qYvXk_bqlBk',
        duration: 29,
        description: 'Become a sales pro! Learn proven sales techniques, master the art of persuasion, and discover how to close deals consistently. Understand the sales funnel, objection handling, and relationship-based selling.',
        sectionId: bizSection2._id,
        courseId: businessCourse._id
      },
      {
        title: 'Leadership & Team Management',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=aSN1RHU8Jvs',
        duration: 31,
        description: 'Lead with confidence! Develop essential leadership skills, learn to motivate teams, and create a positive company culture. Master delegation, conflict resolution, and how to build high-performing teams.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Hiring & Human Resources',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=6Jd0RDJJQWo',
        duration: 26,
        description: 'Build your dream team! Learn effective hiring strategies, conduct great interviews, and onboard employees successfully. Understand HR basics, employee retention, and how to create job descriptions that attract top talent.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Productivity & Time Management',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=oTugjssqOT0',
        duration: 22,
        description: 'Work smarter, not harder! Master time management techniques, eliminate distractions, and boost productivity. Learn prioritization frameworks, delegation strategies, and tools to manage your time effectively as a business owner.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Scaling & Business Growth',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=ZoqgAy3h4OM',
        duration: 33,
        description: 'Scale your success! Learn strategies for sustainable business growth, understand when and how to scale, and avoid common pitfalls. Discover systems and processes that enable growth without sacrificing quality.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Innovation & Competitive Advantage',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=ZUG9qYTJMsI',
        duration: 28,
        description: 'Stay ahead of competition! Foster innovation in your business, develop unique competitive advantages, and adapt to market changes. Learn how to create a culture of innovation and continuously improve your offerings.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Risk Management & Crisis Planning',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=1k2yXNHSYcg',
        duration: 25,
        description: 'Prepare for the unexpected! Learn to identify business risks, create contingency plans, and manage crises effectively. Understand insurance needs, legal protection, and how to build a resilient business.',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      },
      {
        title: 'Exit Strategies & Business Succession',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=Zy4KtD98S2c',
        duration: 27,
        description: 'Plan your exit! Understand different exit strategies including selling, merging, or passing on your business. Learn how to value your business, prepare for sale, and ensure a smooth transition. Congratulations on mastering business fundamentals!',
        sectionId: bizSection3._id,
        courseId: businessCourse._id
      }
    ]);

    // Create Marketing Course
    const marketingCourse = await Course.create({
      title: 'Digital Marketing Mastery',
      description: 'Master modern marketing! Learn SEO, social media, content marketing, email campaigns, and analytics to grow any business online.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'Marketing',
      instructorId: instructor._id,
      totalDuration: 540
    });

    const mktSection1 = await Section.create({
      title: 'Marketing Fundamentals',
      orderNumber: 1,
      courseId: marketingCourse._id
    });

    const mktSection2 = await Section.create({
      title: 'Digital Marketing Channels',
      orderNumber: 2,
      courseId: marketingCourse._id
    });

    const mktSection3 = await Section.create({
      title: 'Analytics & Optimization',
      orderNumber: 3,
      courseId: marketingCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Marketing',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=Mbe0OqUvmfE',
        duration: 22,
        description: 'Welcome to marketing! Understand the fundamentals of marketing, the 4 Ps (Product, Price, Place, Promotion), and how marketing has evolved in the digital age. Learn the difference between traditional and digital marketing.',
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Understanding Your Target Audience',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=iCQ_PUI6O8Q',
        duration: 26,
        description: 'Know your customers! Learn to create detailed buyer personas, understand customer psychology, and identify your ideal target market. Master market segmentation and positioning strategies.',
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Brand Strategy & Positioning',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=iVrvd5UkW_c',
        duration: 28,
        description: 'Build a powerful brand! Learn brand positioning strategies, create a unique value proposition, and develop a brand voice that resonates with your audience. Understand brand equity and how to measure brand strength.',
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Content Marketing Strategy',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=9DKYcNKv-3g',
        duration: 30,
        description: 'Content is king! Master content marketing fundamentals, learn to create valuable content that attracts and engages your audience. Understand content types, distribution channels, and how to build a content calendar.',
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Copywriting & Persuasive Writing',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=YIWJHXRbQ_w',
        duration: 27,
        description: 'Write copy that converts! Learn persuasive writing techniques, master headlines and calls-to-action, and understand the psychology of persuasion. Practice writing compelling sales copy and marketing messages.',
        sectionId: mktSection1._id,
        courseId: marketingCourse._id
      },
      {
        title: 'SEO Fundamentals',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ',
        duration: 32,
        description: 'Rank higher on Google! Master SEO basics including keyword research, on-page optimization, and link building. Learn how search engines work and discover strategies to improve your website\'s visibility organically.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Social Media Marketing',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=BPlZhANJSQI',
        duration: 29,
        description: 'Master social media! Learn platform-specific strategies for Facebook, Instagram, Twitter, LinkedIn, and TikTok. Understand social media algorithms, create engaging content, and build a loyal following.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Email Marketing Campaigns',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=hU_eBBHvqLw',
        duration: 26,
        description: 'Email marketing mastery! Learn to build email lists, create compelling campaigns, and automate email sequences. Master subject lines, email design, and strategies to improve open and click-through rates.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Pay-Per-Click Advertising (PPC)',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=3cPgKZYUhBg',
        duration: 31,
        description: 'Master paid advertising! Learn Google Ads, Facebook Ads, and other PPC platforms. Understand bidding strategies, ad targeting, and how to create high-converting ad campaigns that deliver ROI.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Influencer Marketing',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=qOKvGBG2qXY',
        duration: 24,
        description: 'Leverage influencer power! Learn to identify the right influencers, negotiate partnerships, and run successful influencer campaigns. Understand micro vs macro influencers and measure campaign effectiveness.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Video Marketing & YouTube',
        orderNumber: 11,
        youtubeUrl: 'https://www.youtube.com/watch?v=QVIEdVWe4W4',
        duration: 28,
        description: 'Harness video power! Learn video marketing strategies, YouTube optimization, and how to create engaging video content. Understand video SEO, thumbnails, and building a YouTube channel.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Affiliate Marketing',
        orderNumber: 12,
        youtubeUrl: 'https://www.youtube.com/watch?v=M5MbVBDaj2I',
        duration: 25,
        description: 'Build passive income! Learn affiliate marketing fundamentals, find profitable affiliate programs, and create content that drives affiliate sales. Understand commission structures and disclosure requirements.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Automation',
        orderNumber: 13,
        youtubeUrl: 'https://www.youtube.com/watch?v=GfOJEu7v-Ow',
        duration: 27,
        description: 'Automate your marketing! Learn to use marketing automation tools, create automated workflows, and nurture leads automatically. Understand drip campaigns, lead scoring, and behavioral triggers.',
        sectionId: mktSection2._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        orderNumber: 14,
        youtubeUrl: 'https://www.youtube.com/watch?v=MRzpRsKVD8w',
        duration: 30,
        description: 'Optimize for conversions! Learn A/B testing, landing page optimization, and strategies to improve conversion rates. Understand user behavior, friction points, and how to create high-converting funnels.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Google Analytics & Data Analysis',
        orderNumber: 15,
        youtubeUrl: 'https://www.youtube.com/watch?v=gBeMELnxdIg',
        duration: 33,
        description: 'Master analytics! Learn Google Analytics from basics to advanced features. Understand key metrics, set up goals and conversions, and use data to make informed marketing decisions.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Metrics & KPIs',
        orderNumber: 16,
        youtubeUrl: 'https://www.youtube.com/watch?v=Zy4KtD98S2c',
        duration: 26,
        description: 'Measure what matters! Learn essential marketing metrics including CAC, LTV, ROI, and engagement rates. Understand which KPIs to track for different marketing channels and how to report results.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Customer Journey Mapping',
        orderNumber: 17,
        youtubeUrl: 'https://www.youtube.com/watch?v=mSxpVRo3BLg',
        duration: 28,
        description: 'Map the customer journey! Learn to visualize customer touchpoints, identify pain points, and optimize the customer experience. Understand awareness, consideration, decision, and retention stages.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Funnels & Sales Funnels',
        orderNumber: 18,
        youtubeUrl: 'https://www.youtube.com/watch?v=cXRzAHJHUiU',
        duration: 29,
        description: 'Build effective funnels! Learn to create marketing and sales funnels that convert. Understand TOFU, MOFU, BOFU strategies, and how to nurture leads through each stage of the funnel.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Retargeting & Remarketing',
        orderNumber: 19,
        youtubeUrl: 'https://www.youtube.com/watch?v=NMXJjlVJt0M',
        duration: 25,
        description: 'Bring visitors back! Master retargeting strategies across platforms. Learn pixel implementation, audience segmentation, and how to create retargeting campaigns that convert abandoned visitors into customers.',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      },
      {
        title: 'Marketing Strategy & Campaign Planning',
        orderNumber: 20,
        youtubeUrl: 'https://www.youtube.com/watch?v=jTzfQZJTcWo',
        duration: 35,
        description: 'Plan winning campaigns! Learn to develop comprehensive marketing strategies, plan multi-channel campaigns, and allocate budgets effectively. Master campaign execution, monitoring, and optimization. Congratulations on becoming a marketing expert!',
        sectionId: mktSection3._id,
        courseId: marketingCourse._id
      }
    ]);

    // Create Mobile Development Course
    const mobileCourse = await Course.create({
      title: 'Mobile App Development',
      description: 'Build native mobile apps for iOS and Android. Learn React Native, Flutter, and mobile app design principles.',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Programming',
      instructorId: instructor._id,
      totalDuration: 280
    });

    const mobileSection1 = await Section.create({
      title: 'Mobile Development Fundamentals',
      orderNumber: 1,
      courseId: mobileCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Mobile Development',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=0fYi8SGA20k',
        duration: 25,
        description: 'Start your mobile development journey! Learn the difference between native, hybrid, and cross-platform development. Understand iOS vs Android development, and discover which approach is best for your project.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'React Native Basics',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=ur6I5m2nTvk',
        duration: 32,
        description: 'Master React Native! Learn to build cross-platform mobile apps using JavaScript and React. Understand components, styling, and navigation in React Native. Build your first mobile app.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Mobile UI/UX Design',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=RFv7AZg6gz0',
        duration: 28,
        description: 'Design beautiful mobile interfaces! Learn mobile design principles, understand touch interactions, and create intuitive user experiences. Master iOS and Android design guidelines.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Mobile Navigation & Routing',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=nQVCkqvU1uE',
        duration: 26,
        description: 'Navigate like a pro! Learn React Navigation, implement stack, tab, and drawer navigators. Understand deep linking and navigation patterns in mobile apps.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'State Management in Mobile Apps',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
        duration: 30,
        description: 'Manage app state effectively! Learn Redux, Context API, and modern state management solutions for mobile apps. Understand when to use local vs global state.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Mobile APIs & Data Fetching',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=VVU9ylcZelU',
        duration: 27,
        description: 'Connect to APIs! Learn to fetch data from REST APIs, handle loading states, and implement error handling. Master async operations in mobile apps.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Local Storage & Databases',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=qbLsY_Kj_PI',
        duration: 29,
        description: 'Store data locally! Learn AsyncStorage, SQLite, and Realm for mobile apps. Understand when to use each storage solution and implement offline functionality.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Push Notifications',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=N76vFaT7B4Q',
        duration: 24,
        description: 'Engage users with notifications! Learn to implement push notifications using Firebase Cloud Messaging. Understand notification permissions and best practices.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Mobile App Testing',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=ajiLSPu_8IU',
        duration: 26,
        description: 'Test your mobile apps! Learn unit testing, integration testing, and end-to-end testing for mobile applications. Master testing frameworks and best practices.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      },
      {
        title: 'Publishing to App Stores',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=oBTBm79bBBo',
        duration: 33,
        description: 'Launch your app! Learn the complete process of publishing to Apple App Store and Google Play Store. Understand app store optimization, screenshots, and submission guidelines.',
        sectionId: mobileSection1._id,
        courseId: mobileCourse._id
      }
    ]);

    // Create Cloud Computing Course
    const cloudCourse = await Course.create({
      title: 'Cloud Computing & AWS',
      description: 'Master cloud computing with AWS. Learn cloud architecture, deployment, serverless, and DevOps practices.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      category: 'Programming',
      instructorId: instructor._id,
      totalDuration: 300
    });

    const cloudSection1 = await Section.create({
      title: 'Cloud Fundamentals',
      orderNumber: 1,
      courseId: cloudCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Cloud Computing',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=M988_fsOSWo',
        duration: 28,
        description: 'Enter the cloud! Understand what cloud computing is, learn about IaaS, PaaS, and SaaS models. Discover the benefits of cloud computing and major cloud providers.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'AWS Basics & Account Setup',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=ulprqHHWlng',
        duration: 25,
        description: 'Get started with AWS! Learn to create an AWS account, understand the AWS console, and explore core AWS services. Set up billing alerts and security best practices.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'EC2 & Virtual Servers',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=iHX-jtKIVNA',
        duration: 32,
        description: 'Launch virtual servers! Master EC2 instances, understand instance types, and learn to configure security groups. Deploy applications on EC2 and manage server infrastructure.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'S3 Storage & CDN',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=77lMCiiMilo',
        duration: 27,
        description: 'Store files in the cloud! Learn AWS S3 for object storage, implement CloudFront CDN, and understand bucket policies. Master file uploads and static website hosting.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'Databases in the Cloud',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=eMzCI7S1P9M',
        duration: 30,
        description: 'Manage cloud databases! Learn RDS for relational databases, DynamoDB for NoSQL, and understand database scaling. Implement backups and high availability.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'Serverless with Lambda',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=eOBq__h4OJ4',
        duration: 29,
        description: 'Go serverless! Master AWS Lambda functions, understand event-driven architecture, and build serverless applications. Learn API Gateway and serverless frameworks.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'Container Services & Docker',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        duration: 31,
        description: 'Containerize applications! Learn Docker basics, understand ECS and EKS for container orchestration. Deploy containerized applications to the cloud.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'CI/CD & DevOps',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=scEDHsr3APg',
        duration: 33,
        description: 'Automate deployments! Learn CI/CD pipelines with AWS CodePipeline, implement automated testing, and master continuous deployment strategies.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'Cloud Security Best Practices',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=aISWoPf_XNE',
        duration: 30,
        description: 'Secure your cloud! Learn IAM roles and policies, implement encryption, and understand cloud security best practices. Master VPC and network security.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      },
      {
        title: 'Monitoring & Cost Optimization',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=vAnIhIwzR3o',
        duration: 35,
        description: 'Optimize cloud costs! Learn CloudWatch for monitoring, set up alerts, and implement cost optimization strategies. Understand billing and resource tagging.',
        sectionId: cloudSection1._id,
        courseId: cloudCourse._id
      }
    ]);

    // Create Cybersecurity Course
    const securityCourse = await Course.create({
      title: 'Cybersecurity Fundamentals',
      description: 'Learn cybersecurity essentials, ethical hacking, network security, and how to protect systems from threats.',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      category: 'Other',
      instructorId: instructor._id,
      totalDuration: 290
    });

    const secSection1 = await Section.create({
      title: 'Security Fundamentals',
      orderNumber: 1,
      courseId: securityCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to Cybersecurity',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
        duration: 26,
        description: 'Enter cybersecurity! Understand the cybersecurity landscape, learn about common threats, and discover career paths in security. Master the CIA triad: Confidentiality, Integrity, Availability.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Network Security Basics',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
        duration: 30,
        description: 'Secure networks! Learn network protocols, understand firewalls and VPNs, and master network security fundamentals. Discover how to protect network infrastructure.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Cryptography & Encryption',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=jhXCTbFnK8o',
        duration: 32,
        description: 'Master encryption! Learn symmetric and asymmetric encryption, understand hashing, and implement SSL/TLS. Discover how cryptography protects data.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Web Application Security',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=F5KJVuii0Yw',
        duration: 29,
        description: 'Secure web apps! Learn about OWASP Top 10 vulnerabilities, understand SQL injection, XSS, and CSRF attacks. Implement security best practices in web development.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Authentication & Authorization',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=926mknSW9Lo',
        duration: 27,
        description: 'Control access! Master authentication methods, implement OAuth and JWT, and understand authorization patterns. Learn multi-factor authentication and password security.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Ethical Hacking Basics',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
        duration: 31,
        description: 'Think like a hacker! Learn ethical hacking fundamentals, understand penetration testing, and discover vulnerability assessment techniques. Master security testing tools.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Malware & Threat Analysis',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=n8mbzU0X2nQ',
        duration: 28,
        description: 'Understand threats! Learn about different types of malware, understand threat intelligence, and master incident response. Discover how to analyze and mitigate security threats.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Security Monitoring & SIEM',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=JVfHFqKHlMw',
        duration: 30,
        description: 'Monitor security! Learn SIEM tools, understand log analysis, and implement security monitoring. Master threat detection and incident response procedures.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Cloud Security',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=aISWoPf_XNE',
        duration: 29,
        description: 'Secure the cloud! Learn cloud security best practices, understand shared responsibility model, and implement cloud-specific security controls. Master IAM and data protection.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      },
      {
        title: 'Security Compliance & Frameworks',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=J9ToNuwmyF0',
        duration: 28,
        description: 'Understand compliance! Learn about security frameworks like NIST, ISO 27001, and SOC 2. Understand GDPR, HIPAA, and other compliance requirements. Master security auditing.',
        sectionId: secSection1._id,
        courseId: securityCourse._id
      }
    ]);

    // Create UI/UX Design Course
    const uxCourse = await Course.create({
      title: 'UI/UX Design Masterclass',
      description: 'Master user interface and user experience design. Learn Figma, design thinking, prototyping, and create beautiful user experiences.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      category: 'Design',
      instructorId: instructor._id,
      totalDuration: 310
    });

    const uxSection1 = await Section.create({
      title: 'UX Design Fundamentals',
      orderNumber: 1,
      courseId: uxCourse._id
    });

    await Lesson.create([
      {
        title: 'Introduction to UI/UX Design',
        orderNumber: 1,
        youtubeUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
        duration: 27,
        description: 'Start your design journey! Understand the difference between UI and UX, learn design principles, and discover the design process. Master the fundamentals of creating user-centered designs.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Design Thinking Process',
        orderNumber: 2,
        youtubeUrl: 'https://www.youtube.com/watch?v=_r0VX-aU_T8',
        duration: 30,
        description: 'Think like a designer! Learn the design thinking framework: empathize, define, ideate, prototype, and test. Understand how to solve problems creatively and user-centrically.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'User Research Methods',
        orderNumber: 3,
        youtubeUrl: 'https://www.youtube.com/watch?v=Qq3OiHQ-HCU',
        duration: 32,
        description: 'Research your users! Learn user interviews, surveys, and usability testing. Master persona creation and user journey mapping. Understand how to gather and analyze user insights.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Wireframing & Prototyping',
        orderNumber: 4,
        youtubeUrl: 'https://www.youtube.com/watch?v=KnZrypOaVCg',
        duration: 29,
        description: 'Create wireframes! Learn low-fidelity and high-fidelity wireframing, understand prototyping techniques, and master rapid iteration. Build interactive prototypes that communicate your ideas.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Figma Mastery',
        orderNumber: 5,
        youtubeUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
        duration: 35,
        description: 'Master Figma! Learn the complete Figma interface, create components and variants, and build design systems. Understand auto-layout, constraints, and collaborative design workflows.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Color Theory & Typography',
        orderNumber: 6,
        youtubeUrl: 'https://www.youtube.com/watch?v=AvgCkHrcj90',
        duration: 28,
        description: 'Design with color and type! Master color theory, create harmonious color palettes, and understand typography principles. Learn font pairing and hierarchy for effective visual communication.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Layout & Composition',
        orderNumber: 7,
        youtubeUrl: 'https://www.youtube.com/watch?v=a5KYlHNKQB8',
        duration: 26,
        description: 'Create balanced layouts! Learn grid systems, understand visual hierarchy, and master composition principles. Discover how to guide user attention and create scannable interfaces.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Responsive Design',
        orderNumber: 8,
        youtubeUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
        duration: 31,
        description: 'Design for all devices! Learn responsive design principles, understand breakpoints, and create adaptive layouts. Master mobile-first design and cross-device experiences.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Usability Testing',
        orderNumber: 9,
        youtubeUrl: 'https://www.youtube.com/watch?v=BrVnBdW6_rE',
        duration: 33,
        description: 'Test your designs! Learn usability testing methods, conduct user tests, and analyze results. Understand A/B testing and iterate based on user feedback.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      },
      {
        title: 'Design Systems & Handoff',
        orderNumber: 10,
        youtubeUrl: 'https://www.youtube.com/watch?v=wc5krC28ynQ',
        duration: 39,
        description: 'Build design systems! Learn to create scalable design systems, document components, and hand off designs to developers. Master design tokens and maintain design consistency.',
        sectionId: uxSection1._id,
        courseId: uxCourse._id
      }
    ]);

    console.log('Created all courses with sections and lessons');

    // Create Quizzes for each course
    await Quiz.create({
      courseId: jsCourse._id,
      title: 'JavaScript Mastery Quiz',
      description: 'Test your JavaScript knowledge with this comprehensive quiz',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['variable x = 5;', 'let x = 5;', 'v x = 5;', 'var: x = 5;'],
          correctAnswer: 1,
          explanation: 'let is the modern way to declare block-scoped variables in JavaScript.'
        },
        {
          question: 'Which method is used to add an element to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0,
          explanation: 'push() adds one or more elements to the end of an array.'
        },
        {
          question: 'What does "===" operator do in JavaScript?',
          options: ['Assigns a value', 'Compares values only', 'Compares values and types', 'Adds two numbers'],
          correctAnswer: 2,
          explanation: '=== is the strict equality operator that compares both value and type.'
        },
        {
          question: 'Which keyword is used to define a constant in JavaScript?',
          options: ['var', 'let', 'const', 'constant'],
          correctAnswer: 2,
          explanation: 'const is used to declare constants that cannot be reassigned.'
        },
        {
          question: 'What is a closure in JavaScript?',
          options: ['A way to close the browser', 'A function with access to outer scope', 'A loop structure', 'An error type'],
          correctAnswer: 1,
          explanation: 'A closure is a function that has access to variables in its outer scope.'
        },
        {
          question: 'Which method converts JSON string to JavaScript object?',
          options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.object()'],
          correctAnswer: 0,
          explanation: 'JSON.parse() converts a JSON string into a JavaScript object.'
        },
        {
          question: 'What is the purpose of async/await?',
          options: ['To make code slower', 'To handle asynchronous operations', 'To create loops', 'To define variables'],
          correctAnswer: 1,
          explanation: 'async/await provides a cleaner way to work with asynchronous operations.'
        },
        {
          question: 'Which array method creates a new array with results of calling a function?',
          options: ['forEach()', 'map()', 'filter()', 'reduce()'],
          correctAnswer: 1,
          explanation: 'map() creates a new array by calling a function on every element.'
        },
        {
          question: 'What is the DOM?',
          options: ['A programming language', 'Document Object Model', 'Data Object Manager', 'Digital Output Method'],
          correctAnswer: 1,
          explanation: 'DOM stands for Document Object Model, representing the HTML structure.'
        },
        {
          question: 'How do you create a promise in JavaScript?',
          options: ['new Promise()', 'create Promise()', 'Promise.new()', 'makePromise()'],
          correctAnswer: 0,
          explanation: 'Promises are created using the new Promise() constructor.'
        }
      ]
    });

    await Quiz.create({
      courseId: reactCourse._id,
      title: 'React Fundamentals Quiz',
      description: 'Test your React knowledge and component understanding',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          question: 'What is React?',
          options: ['A database', 'A JavaScript library for building UIs', 'A CSS framework', 'A backend framework'],
          correctAnswer: 1,
          explanation: 'React is a JavaScript library for building user interfaces.'
        },
        {
          question: 'What is JSX?',
          options: ['A database query language', 'JavaScript XML syntax extension', 'A CSS preprocessor', 'A testing framework'],
          correctAnswer: 1,
          explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.'
        },
        {
          question: 'Which hook is used for side effects in React?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correctAnswer: 1,
          explanation: 'useEffect is used to perform side effects in functional components.'
        },
        {
          question: 'What is the purpose of useState hook?',
          options: ['To fetch data', 'To manage component state', 'To style components', 'To route pages'],
          correctAnswer: 1,
          explanation: 'useState allows functional components to have state.'
        },
        {
          question: 'How do you pass data from parent to child component?',
          options: ['Using state', 'Using props', 'Using context', 'Using refs'],
          correctAnswer: 1,
          explanation: 'Props are used to pass data from parent to child components.'
        },
        {
          question: 'What is the Virtual DOM?',
          options: ['A real DOM copy', 'A lightweight representation of the DOM', 'A database', 'A CSS framework'],
          correctAnswer: 1,
          explanation: 'Virtual DOM is a lightweight copy of the actual DOM for efficient updates.'
        },
        {
          question: 'Which method is called when a component is removed?',
          options: ['componentDidMount', 'componentWillUnmount', 'componentDidUpdate', 'render'],
          correctAnswer: 1,
          explanation: 'componentWillUnmount is called before a component is removed from the DOM.'
        },
        {
          question: 'What is React Router used for?',
          options: ['State management', 'Navigation between pages', 'API calls', 'Styling'],
          correctAnswer: 1,
          explanation: 'React Router enables navigation and routing in React applications.'
        },
        {
          question: 'What is the purpose of keys in React lists?',
          options: ['For styling', 'To identify elements uniquely', 'For routing', 'For state management'],
          correctAnswer: 1,
          explanation: 'Keys help React identify which items have changed, added, or removed.'
        },
        {
          question: 'What is useContext used for?',
          options: ['Managing local state', 'Accessing context values', 'Making API calls', 'Routing'],
          correctAnswer: 1,
          explanation: 'useContext allows components to consume context values.'
        }
      ]
    });

    await Quiz.create({
      courseId: pythonCourse._id,
      title: 'Python Programming Quiz',
      description: 'Evaluate your Python programming skills',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          question: 'Which keyword is used to define a function in Python?',
          options: ['function', 'def', 'func', 'define'],
          correctAnswer: 1,
          explanation: 'def is the keyword used to define functions in Python.'
        },
        {
          question: 'What is the correct file extension for Python files?',
          options: ['.python', '.pt', '.py', '.pyt'],
          correctAnswer: 2,
          explanation: '.py is the standard file extension for Python files.'
        },
        {
          question: 'Which data type is mutable in Python?',
          options: ['tuple', 'string', 'list', 'integer'],
          correctAnswer: 2,
          explanation: 'Lists are mutable, meaning their contents can be changed.'
        },
        {
          question: 'What does the len() function do?',
          options: ['Returns the length of an object', 'Creates a list', 'Sorts items', 'Removes items'],
          correctAnswer: 0,
          explanation: 'len() returns the number of items in an object.'
        },
        {
          question: 'Which operator is used for exponentiation in Python?',
          options: ['^', '**', 'exp', 'pow'],
          correctAnswer: 1,
          explanation: '** is the exponentiation operator in Python.'
        },
        {
          question: 'What is a dictionary in Python?',
          options: ['A list of words', 'A key-value pair collection', 'A string type', 'A number type'],
          correctAnswer: 1,
          explanation: 'Dictionaries store data as key-value pairs.'
        },
        {
          question: 'Which method adds an element to the end of a list?',
          options: ['add()', 'append()', 'insert()', 'push()'],
          correctAnswer: 1,
          explanation: 'append() adds an element to the end of a list.'
        },
        {
          question: 'What is the purpose of the __init__ method?',
          options: ['To delete objects', 'To initialize object attributes', 'To print objects', 'To sort objects'],
          correctAnswer: 1,
          explanation: '__init__ is the constructor method that initializes object attributes.'
        },
        {
          question: 'Which keyword is used for exception handling?',
          options: ['catch', 'except', 'error', 'handle'],
          correctAnswer: 1,
          explanation: 'except is used to catch and handle exceptions in Python.'
        },
        {
          question: 'What does the range() function return?',
          options: ['A list', 'A sequence of numbers', 'A string', 'A dictionary'],
          correctAnswer: 1,
          explanation: 'range() returns a sequence of numbers.'
        }
      ]
    });

    await Quiz.create({
      courseId: webDesignCourse._id,
      title: 'Web Design Fundamentals Quiz',
      description: 'Test your HTML and CSS knowledge',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'],
          correctAnswer: 0,
          explanation: 'HTML stands for Hyper Text Markup Language.'
        },
        {
          question: 'Which HTML tag is used for the largest heading?',
          options: ['<heading>', '<h6>', '<h1>', '<head>'],
          correctAnswer: 2,
          explanation: '<h1> is used for the largest heading.'
        },
        {
          question: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 1,
          explanation: 'CSS stands for Cascading Style Sheets.'
        },
        {
          question: 'Which property is used to change text color in CSS?',
          options: ['text-color', 'font-color', 'color', 'text-style'],
          correctAnswer: 2,
          explanation: 'The color property is used to change text color.'
        },
        {
          question: 'What is Flexbox used for?',
          options: ['Creating databases', 'Layout design', 'Animation', 'Form validation'],
          correctAnswer: 1,
          explanation: 'Flexbox is a CSS layout model for arranging elements.'
        },
        {
          question: 'Which HTML tag is used to create a hyperlink?',
          options: ['<link>', '<a>', '<href>', '<url>'],
          correctAnswer: 1,
          explanation: '<a> tag is used to create hyperlinks.'
        },
        {
          question: 'What is the box model in CSS?',
          options: ['A 3D model', 'Content, padding, border, margin', 'A layout technique', 'A color scheme'],
          correctAnswer: 1,
          explanation: 'The box model consists of content, padding, border, and margin.'
        },
        {
          question: 'Which CSS property controls text size?',
          options: ['text-size', 'font-size', 'text-style', 'font-weight'],
          correctAnswer: 1,
          explanation: 'font-size controls the size of text.'
        },
        {
          question: 'What is a media query used for?',
          options: ['Playing videos', 'Responsive design', 'Database queries', 'Form validation'],
          correctAnswer: 1,
          explanation: 'Media queries are used to create responsive designs.'
        },
        {
          question: 'Which property is used to make text bold?',
          options: ['font-weight', 'text-bold', 'font-style', 'text-weight'],
          correctAnswer: 0,
          explanation: 'font-weight is used to make text bold.'
        }
      ]
    });

    await Quiz.create({
      courseId: dataScienceCourse._id,
      title: 'Data Science & ML Quiz',
      description: 'Test your data science and machine learning knowledge',
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          question: 'What is NumPy primarily used for?',
          options: ['Web development', 'Numerical computing', 'Database management', 'Game development'],
          correctAnswer: 1,
          explanation: 'NumPy is used for numerical computing and array operations.'
        },
        {
          question: 'Which library is best for data manipulation in Python?',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
          correctAnswer: 1,
          explanation: 'Pandas is the primary library for data manipulation and analysis.'
        },
        {
          question: 'What is supervised learning?',
          options: ['Learning without labels', 'Learning with labeled data', 'Unsupervised clustering', 'Random learning'],
          correctAnswer: 1,
          explanation: 'Supervised learning uses labeled data to train models.'
        },
        {
          question: 'Which algorithm is used for classification?',
          options: ['Linear Regression', 'K-Means', 'Logistic Regression', 'PCA'],
          correctAnswer: 2,
          explanation: 'Logistic Regression is a classification algorithm.'
        },
        {
          question: 'What is overfitting?',
          options: ['Model performs well on all data', 'Model memorizes training data', 'Model is too simple', 'Model has no errors'],
          correctAnswer: 1,
          explanation: 'Overfitting occurs when a model memorizes training data instead of learning patterns.'
        },
        {
          question: 'Which library is used for data visualization?',
          options: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
          correctAnswer: 2,
          explanation: 'Matplotlib is the primary library for creating visualizations.'
        },
        {
          question: 'What is a DataFrame in Pandas?',
          options: ['A 1D array', 'A 2D labeled data structure', 'A dictionary', 'A list'],
          correctAnswer: 1,
          explanation: 'A DataFrame is a 2D labeled data structure with columns.'
        },
        {
          question: 'What does train-test split do?',
          options: ['Splits data for training and testing', 'Cleans data', 'Visualizes data', 'Saves data'],
          correctAnswer: 0,
          explanation: 'Train-test split divides data into training and testing sets.'
        },
        {
          question: 'What is feature engineering?',
          options: ['Building models', 'Creating new features from data', 'Testing models', 'Deploying models'],
          correctAnswer: 1,
          explanation: 'Feature engineering is the process of creating new features from existing data.'
        },
        {
          question: 'Which metric is used for regression models?',
          options: ['Accuracy', 'Precision', 'Mean Squared Error', 'F1 Score'],
          correctAnswer: 2,
          explanation: 'Mean Squared Error (MSE) is commonly used for regression models.'
        }
      ]
    });

    console.log('Created quizzes for all courses');
    console.log('\n=== Seed Data Created Successfully ===');
    console.log('\nTest Accounts:');
    console.log('Instructor: instructor@example.com / password123');
    console.log('Student: student@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
