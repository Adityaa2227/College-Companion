# MentorConnect - AI-Powered Mentorship Platform

A comprehensive full-stack web application that connects students with mentors using AI-powered matching, real-time communication, and gamification features.

## 🚀 Features

### Core Features
- **AI-Powered Mentor Matching**: Intelligent algorithm matches students with mentors based on interests, skills, and goals
- **Real-time Messaging**: Chat system with text, voice, and video capabilities
- **"Become the Mentor" Certification**: Quiz-based exam system for mentor verification
- **Professional Resume Builder**: Multiple templates with PDF export functionality
- **AI Talk**: ChatGPT-powered career guidance and mentorship assistant
- **Meeting Scheduler**: Google Calendar integration with automated reminders

### Productivity Features
- **Gamification System**: Badges, XP points, leaderboards, and streak tracking
- **Study Timer**: Pomodoro-style focus timer with task tracking
- **Todo Management**: Task creation with email and push notifications
- **Analytics Dashboard**: Progress tracking with charts and insights
- **Daily Quotes**: Motivational content to inspire users

### Advanced Features
- **Payment Integration**: Stripe-powered payment system for premium sessions
- **Email Notifications**: Automated reminders and updates
- **Push Notifications**: Real-time alerts for messages and meetings
- **File Upload**: Profile pictures and document sharing
- **Admin Panel**: User management and platform analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Socket.io Client** for real-time features
- **Recharts** for analytics visualization
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **bcryptjs** for password hashing

### External Services
- **OpenAI API** for AI chat functionality
- **Google Calendar API** for meeting scheduling
- **Stripe** for payment processing
- **Nodemailer** for email notifications
- **Web Push** for browser notifications

## 📋 Required API Keys

To run this application, you'll need the following API keys:

### 1. OpenAI API Key
- **Purpose**: AI Talk feature and mentor matching
- **How to get**: 
  1. Visit [OpenAI Platform](https://platform.openai.com/)
  2. Create an account and verify your phone number
  3. Go to API Keys section
  4. Create a new secret key
- **Cost**: Pay-per-use, starts at $0.002 per 1K tokens

### 2. Google APIs
- **Purpose**: Calendar integration and OAuth
- **How to get**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Enable Google Calendar API
  4. Create credentials (OAuth 2.0 Client ID)
  5. Add authorized redirect URIs
- **Cost**: Free tier available

### 3. Stripe API Keys
- **Purpose**: Payment processing for mentor sessions
- **How to get**:
  1. Visit [Stripe Dashboard](https://dashboard.stripe.com/)
  2. Create an account
  3. Get your publishable and secret keys from the API section
- **Cost**: 2.9% + 30¢ per transaction

### 4. MongoDB Connection
- **Purpose**: Database for storing user data
- **Options**:
  - **Local**: Install MongoDB locally
  - **Cloud**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)
- **Cost**: Free tier available

### 5. Email Service (Gmail)
- **Purpose**: Sending notifications and reminders
- **How to get**:
  1. Enable 2-factor authentication on your Gmail account
  2. Generate an App Password
  3. Use your Gmail address and app password
- **Cost**: Free

### 6. VAPID Keys (Optional)
- **Purpose**: Web push notifications
- **How to get**: Generate using web-push library or online generators
- **Cost**: Free

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mentorconnect
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your API keys
nano .env
```

### 4. Database Setup
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just update the MONGODB_URI in .env
```

### 5. Start the Application
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📁 Project Structure

```
mentorconnect/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── pages/             # Page components
│   └── ...
├── server/                # Backend Node.js application
│   ├── routes/            # API route handlers
│   ├── services/          # External service integrations
│   ├── middleware/        # Custom middleware
│   ├── cron/             # Scheduled tasks
│   └── index.js          # Main server file
├── uploads/              # File upload directory
└── ...
```

## 🔧 Configuration Details

### Environment Variables (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mentorconnect

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# Google APIs
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🎯 Key Features Walkthrough

### 1. User Registration & Authentication
- Secure JWT-based authentication
- Role-based access (Student, Mentor, Admin)
- Email verification and password reset

### 2. AI-Powered Mentor Matching
- Algorithm considers skills, interests, and goals
- Machine learning recommendations
- Manual search and filtering options

### 3. Real-time Communication
- WebSocket-based messaging
- Online/offline status tracking
- Message history and notifications

### 4. Mentor Certification System
- 5-question quiz covering communication, ethics, and knowledge
- 70% passing score required
- Automatic role upgrade upon certification

### 5. Resume Builder
- 5 professional templates
- Real-time preview
- PDF export functionality
- Multiple resume versions

### 6. AI Talk Assistant
- OpenAI GPT-3.5 integration
- Context-aware conversations
- Career guidance and study advice
- Content moderation for safety

### 7. Meeting Scheduler
- Google Calendar integration
- Automated email reminders
- Video call link generation
- Meeting history tracking

### 8. Gamification System
- XP points for activities
- Achievement badges
- Study streak tracking
- Leaderboards and progress analytics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation for all inputs
- **Content Moderation**: OpenAI moderation for chat messages
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Proper cross-origin resource sharing

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['student', 'mentor', 'admin'],
  bio: String,
  skills: [String],
  rating: Number,
  xp: Number,
  badges: [String],
  streak: Number,
  // ... more fields
}
```

### Messages Collection
```javascript
{
  chatId: String,
  senderId: ObjectId,
  receiverId: ObjectId,
  content: String,
  type: ['text', 'image', 'file'],
  isRead: Boolean,
  createdAt: Date
}
```

### Meetings Collection
```javascript
{
  title: String,
  mentorId: ObjectId,
  studentId: ObjectId,
  date: Date,
  duration: Number,
  type: ['video', 'audio', 'in-person'],
  status: ['scheduled', 'completed', 'cancelled'],
  meetingLink: String,
  // ... more fields
}
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
# Build the frontend
npm run build

# Deploy the dist/ folder to your hosting service
```

### Backend Deployment (Heroku/Railway/DigitalOcean)
```bash
# Set environment variables on your hosting platform
# Deploy the server/ directory
```

### Database (MongoDB Atlas)
- Create a cluster on MongoDB Atlas
- Update MONGODB_URI in production environment
- Set up database users and network access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all required services are running
4. Check API key permissions and quotas

For additional help, please open an issue in the repository.

## 🎉 Acknowledgments

- OpenAI for GPT API
- Google for Calendar API
- Stripe for payment processing
- MongoDB for database services
- All the amazing open-source libraries used in this project#   C o l l e g e - C o m p a n i o n  
 