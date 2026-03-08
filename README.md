# Learning Management System (LMS)

A full-stack Learning Management System with video courses, progress tracking, and AI-powered assistance.

## Features

- 🎓 110+ video lessons across 11 course categories
- 📊 Student dashboard with progress tracking and analytics
- 👨‍🏫 Instructor dashboard for course management
- 🤖 AI chatbot assistant powered by Hugging Face
- 📈 Real-time progress tracking
- 🎨 Modern, responsive UI with professional design
- 🔐 Secure authentication and authorization

## Tech Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router
- Recharts (for analytics)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

**AI Integration:**
- Hugging Face Router API

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Hugging Face API key

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd LMS
```

### 2. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Environment Setup

**Backend (.env):**
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

**Frontend (.env):**
Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database
```bash
cd backend
npm run seed
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: `http://localhost:5173`

## Test Accounts

After seeding the database:

- **Student:** student@example.com / password123
- **Instructor:** instructor@example.com / password123

## Project Structure

```
LMS/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── seed.js          # Database seeder
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   └── App.jsx      # Main app component
│   └── index.html
└── README.md
```

## Available Courses

1. JavaScript Programming (20 videos)
2. Python Programming (20 videos)
3. Web Development (20 videos)
4. Business Fundamentals (20 videos)
5. Digital Marketing (20 videos)
6. Mobile Development (10 videos)
7. Cloud Computing & AWS (10 videos)
8. Cybersecurity (10 videos)
9. UI/UX Design (10 videos)
10. Data Science (10 videos)
11. Machine Learning (10 videos)

## Key Features

### For Students
- Browse and enroll in courses
- Watch video lessons with progress tracking
- View learning dashboard with statistics
- Get AI-powered assistance
- Track course completion

### For Instructors
- View instructor dashboard
- Manage courses
- Track student enrollments
- View course statistics

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get course details
- POST `/api/courses` - Create course (instructor only)

### Enrollment
- POST `/api/enroll/:courseId` - Enroll in course
- GET `/api/enroll/my-courses` - Get enrolled courses
- GET `/api/enroll/check/:courseId` - Check enrollment status

### Progress
- POST `/api/progress/complete` - Mark lesson complete
- GET `/api/progress/:courseId` - Get course progress

### AI Chatbot
- POST `/api/chatbot/ask` - Ask AI assistant
- GET `/api/chatbot/suggestions/:courseId` - Get suggestions

## MongoDB Atlas Setup

1. Create account at https://cloud.mongodb.com/
2. Create a new cluster (M0 free tier)
3. Add database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Add to `backend/.env` as `MONGODB_URI`

## Hugging Face API Setup

1. Create account at https://huggingface.co/
2. Go to Settings > Access Tokens
3. Create new token
4. Add to `backend/.env` as `HUGGINGFACE_API_KEY`

## Deployment

### Backend (Render/Railway)
1. Connect your repository
2. Set environment variables
3. Deploy

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
