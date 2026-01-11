# Projectsify

A full-stack project management platform with AI-powered task guidance and intelligent project phase organization.

## Overview

Projectsify is a modern web application that helps teams manage projects efficiently. It features:
- **User Authentication** - Secure login and signup
- **Project Management** - Create and manage projects with custom phases
- **Task Management** - Add, organize, and track tasks within phases
- **AI-Powered Guidance** - Get intelligent suggestions for tasks using Google's Gemini AI
- **Real-time Updates** - Seamless task and project state management

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

### Backend
- **Node.js & Express** - REST API framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Google Generative AI** - AI-powered task guidance
- **Zod** - Schema validation

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB instance (local or cloud)
- Google Generative AI API key
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/shivamngpal/projectsify-backend.git
cd projectsify
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/projectsify
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev    # Development (with nodemon)
npm start      # Production
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Project Structure

```
projectsify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (auth state)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API client functions
│   │   ├── utils/          # Utilities & constants
│   │   └── assets/         # Images & static files
│   └── package.json
│
└── server/                 # Express backend
    ├── src/
    │   ├── controllers/    # Route handlers
    │   ├── models/         # MongoDB schemas
    │   ├── routes/         # API endpoints
    │   ├── middleware/     # Auth & other middleware
    │   ├── services/       # Business logic & AI services
    │   ├── config/         # Database config
    │   └── utils/          # Helper functions
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user
- `POST /api/auth/profile` - Get current user

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - List tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

### Task Guidance
- `POST /api/guidance` - Get AI suggestions for tasks

## Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start server
npm test         # Run tests (not configured yet)
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables: `VITE_API_BASE_URL`
4. Deploy (automatic on push to main)

### Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Set root directory: `server`
4. Set environment variables (DB URI, JWT secret, API key)
5. Build: `npm install`
6. Start: `npm start`

**Deployment Checklist:**
- ✅ Environment variables configured
- ✅ CORS enabled for frontend domain
- ✅ Database connected and tested
- ✅ JWT secret is strong and secure
- ✅ API base URL points to correct backend
- ✅ HTTPS enforced
- ✅ Error handling & logging in place

## Features in Detail

### Authentication Flow
- Users sign up with email/password
- Password hashed with bcrypt
- JWT token issued on login
- Token stored in localStorage (frontend)
- Protected routes verify JWT token

### AI Task Guidance
- Uses Google Generative AI (Gemini)
- Generates contextual task suggestions based on project phase
- Helps break down complex projects into actionable tasks

### Task Management
- Organize tasks by project phases
- Mark tasks as complete
- Add descriptions and guidance
- Track project progress

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.

---

**Happy project managing! 🚀**
