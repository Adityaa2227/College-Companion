# College-Companion

A smart platform designed to empower students with AI-driven mentorship, productivity tools, and career resources.

## 🚀 Features

- **AI Mentor Matching:** Connects students with mentors based on interests and goals.
- **Real-time Chat:** Text, voice, and video messaging.
- **Mentor Certification:** Quiz-based verification for mentors.
- **Resume Builder:** Professional templates with PDF export.
- **AI Career Assistant:** ChatGPT-powered guidance.
- **Meeting Scheduler:** Google Calendar integration.
- **Gamification:** Badges, XP, leaderboards, and streaks.
- **Study Timer:** Pomodoro-style focus tool.
- **Todo Management:** Tasks with notifications.
- **Analytics Dashboard:** Progress tracking.
- **Daily Quotes:** Motivational content.
- **Payments:** Stripe integration for premium sessions.
- **Notifications:** Email and push alerts.
- **File Uploads:** Profile and document sharing.
- **Admin Panel:** User and analytics management.

## 🛠️ Tech Stack

**Frontend:** React 18 (TypeScript), Tailwind CSS, React Router, Socket.io Client, Recharts, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT, bcryptjs  
**External:** OpenAI API, Google Calendar API, Stripe, Nodemailer, Web Push

## 📋 API Keys Needed

- **OpenAI:** For AI chat and matching ([Get key](https://platform.openai.com/))
- **Google APIs:** Calendar and OAuth ([Get key](https://console.cloud.google.com/))
- **Stripe:** Payments ([Get key](https://dashboard.stripe.com/))
- **MongoDB:** Local or [Atlas](https://www.mongodb.com/atlas)
- **Gmail:** Email notifications (App Password)
- **VAPID:** Web push notifications (optional)

## 🚀 Getting Started

1. **Clone Repo:**  
  ```bash
  git clone <repository-url>
  cd college-companion
  ```
2. **Install Dependencies:**  
  ```bash
  npm install
  ```
3. **Configure Environment:**  
  ```bash
  cp .env.example .env
  # Edit .env with your keys
  ```
4. **Database:**  
  - Local: Run `mongod`
  - Atlas: Set `MONGODB_URI`
5. **Start App:**  
  ```bash
  npm run dev:full
  # or separately: npm run server / npm run dev
  ```
6. **Access:**  
  - Frontend: http://localhost:5173  
  - Backend: http://localhost:3001

## 📁 Structure

```
college-companion/
├── src/         # Frontend
├── server/      # Backend
├── uploads/     # File uploads
└── ...
```

## 🔧 .env Example

```env
MONGODB_URI=mongodb://localhost:27017/college-companion
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
OPENAI_API_KEY=sk-your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🎯 Key Modules

- **Auth:** JWT, roles (student/mentor/admin), email verification
- **Mentor Matching:** AI/ML recommendations, manual search
- **Chat:** WebSocket, message history, notifications
- **Certification:** Quiz, auto role upgrade
- **Resume:** Templates, PDF export, multi-version
- **AI Assistant:** GPT-3.5, context-aware, moderation
- **Scheduler:** Google Calendar, reminders, video links
- **Gamification:** XP, badges, streaks, leaderboards

## 🔒 Security

- JWT auth, bcrypt hashing, input validation, OpenAI moderation, rate limiting, CORS

## 📊 Database (Sample)

**User:**
```js
{
  name, email, password, role, bio, skills, rating, xp, badges, streak, ...
}
```
**Message:**
```js
{
  chatId, senderId, receiverId, content, type, isRead, createdAt
}
```
**Meeting:**
```js
{
  title, mentorId, studentId, date, duration, type, status, meetingLink
}
```

## 🚀 Deployment

- **Frontend:** Build and deploy `/dist` to Netlify/Vercel
- **Backend:** Deploy `/server` to Heroku/Railway/DigitalOcean
- **Database:** Use MongoDB Atlas, update `MONGODB_URI`

## 🤝 Contributing

1. Fork & branch
2. Commit & push
3. Open a Pull Request

## 📝 License

MIT License – see LICENSE file.

## 🆘 Support

- Check console errors, .env, and service status
- Open an issue for help

## 🎉 Acknowledgments

- OpenAI, Google, Stripe, MongoDB, and open-source contributors
