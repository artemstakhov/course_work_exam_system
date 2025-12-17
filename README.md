# UZH Test - Exam System

A modern full-stack web application for creating and taking online tests/exams. Built with React and Node.js/Express, featuring a beautiful modern UI following 2024-2025 design trends.

## 🚀 Features

### For Students
- Browse and take public tests
- Access private tests with unique keys
- Real-time test timer
- Immediate results and scoring
- Personal test history
- Progress tracking

### For Teachers
- Create custom tests with multiple question types
- Add images to tests
- Set tests as public or private (with unique keys)
- Track test statistics
- View participant count
- Manage created tests

### Modern UI/UX
- **Modal-based authentication** - No separate login page
- **Glassmorphism effects** - Modern blur and transparency
- **Gradient accents** - Beautiful color transitions
- **Smooth animations** - Polished micro-interactions
- **Responsive design** - Works on all devices
- **Card-based layouts** - Clean and organized interface
- **Sticky header** - Always accessible navigation

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router 7.10.1** - Client-side routing
- **Material-UI 7.3.6** - Component library
- **SCSS** - Styling with modern design system
- **Axios 1.13.2** - HTTP client
- **Font Awesome 7.1.0** - Icons
- **React JWT** - Token handling
- **js-cookie** - Cookie management

### Backend
- **Node.js** with **Express 5.2.1** - Server framework
- **MongoDB** with **Mongoose 9.0.1** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment configuration
- **CORS** - Cross-origin support
- **Cookie Parser** - Cookie handling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:3002`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:3002
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🏗️ Project Structure

```
course_work_exam_system/
├── backend/
│   ├── config/
│   │   └── config.js              # Centralized configuration
│   ├── controller/
│   │   ├── registerC.js           # Auth controller
│   │   ├── testC.js               # Test controller
│   │   └── userC.js               # User controller
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT authentication
│   │   ├── validation.middleware.js # Input validation
│   │   └── error.middleware.js    # Error handling
│   ├── model/
│   │   ├── user.js                # User schema
│   │   └── test.js                # Test schema
│   ├── .env                       # Environment variables
│   └── index.js                   # Server entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── auth-modal/        # Login/Register modal
    │   │   ├── header/            # Navigation header
    │   │   └── result-block/      # Test results component
    │   ├── containers/
    │   │   ├── main-page/         # Home page with test list
    │   │   ├── test-page/         # Test taking interface
    │   │   ├── create-page/       # Test creation form
    │   │   └── profile-page/      # User profile
    │   ├── styles/
    │   │   ├── _variables.scss    # Design tokens
    │   │   ├── _mixins.scss       # Reusable SCSS mixins
    │   │   └── _global.scss       # Global styles
    │   ├── utils/
    │   │   ├── api.js             # Axios instance
    │   │   ├── services.js        # API service layer
    │   │   └── constants.js       # API endpoints
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Primary Dark**: `#4f46e5`
- **Primary Light**: `#818cf8`
- **Secondary**: `#8b5cf6` (Purple)
- **Success**: `#22c55e`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Font Sizes**: 0.75rem to 3rem
- **Font Weights**: 400, 500, 600, 700, 800

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Tests
- `GET /tests` - Get all tests
- `GET /tests/:id` - Get single test
- `POST /user/test/:id` - Create new test
- `DELETE /tests/:id` - Delete test
- `POST /user/complete/:user_id` - Submit test results

### Users
- `GET /user/:id` - Get user by ID

## 🔄 Recent Updates

### Latest Update (December 17, 2025) - Passed Tests Visual Indicators
- **Visual improvements for completed tests**:
  - Added "Пройдено" badge on passed tests with green gradient design
  - Badge positioned in top-right corner with checkmark icon
  - Disabled hover effects for completed tests to prevent confusion
  - Added 70% opacity overlay on passed test cards
  - Removed navigation arrow icon from completed tests
- **Improved user experience**:
  - Completed tests no longer trigger hover animations
  - Links to passed tests are disabled with `pointer-events: none`
  - Warning snackbar shows when trying to click completed tests
  - Clean separation between available and completed tests
- **Code cleanup**:
  - Removed all debug console.logs from done-test component
  - Cleaner component structure with conditional rendering

### Previous Refactoring (December 2024)

#### Backend Improvements
- **Security enhancements**:
  - Environment variables for sensitive data
  - JWT secret externalized
  - Improved password hashing
- **Architecture**:
  - Centralized configuration management
  - Middleware system (auth, validation, error handling)
  - Consistent API response format
  - Better error handling with custom AppError class
- **Code quality**:
  - Removed all comments for cleaner code
  - Consistent async/await patterns
  - Input validation on all routes

#### Frontend Improvements
- **Authentication overhaul**:
  - Modal-based login/register (no separate page)
  - Automatic redirect for unauthorized users
  - Improved token management
- **UI/UX modernization**:
  - Complete redesign following 2024-2025 trends
  - Glassmorphism and backdrop blur effects
  - Gradient accents throughout
  - Smooth animations and transitions
  - Card hover effects with depth
  - Improved typography and spacing
- **Architecture**:
  - Centralized API client with interceptors
  - Service layer abstraction
  - SCSS migration from .sass
  - Design system with variables and mixins
- **Code quality**:
  - Removed all comments
  - Consistent component structure
  - Better error handling
  - Improved responsive design

## 🤝 Contributing

This is a course work project. For any questions or suggestions, please contact the author.

## 📝 License

This project is part of academic coursework.

## 👤 Author

UZH Student Project

---

**Note**: Make sure to update the MongoDB connection string in the backend `.env` file before running the application.
