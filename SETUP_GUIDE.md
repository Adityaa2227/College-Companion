# MentorConnect Setup Guide

This guide will walk you through setting up all the required API keys and services for MentorConnect.

## 🔑 Required API Keys & Services

### 1. OpenAI API Key (Required for AI Talk)

**Cost**: Pay-per-use, approximately $0.002 per 1K tokens

**Steps**:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Verify your phone number (required)
4. Navigate to "API Keys" in the left sidebar
5. Click "Create new secret key"
6. Copy the key (starts with `sk-`)
7. Add to `.env` file: `OPENAI_API_KEY=sk-your-key-here`

**Usage Estimate**: 
- 100 AI conversations ≈ $0.50-$2.00
- Free tier includes $5 credit for new accounts

---

### 2. MongoDB Database (Required)

**Cost**: Free tier available (512MB)

**Option A: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (choose free tier)
4. Create a database user with read/write permissions
5. Add your IP address to network access (or use 0.0.0.0/0 for development)
6. Get connection string from "Connect" → "Connect your application"
7. Add to `.env` file: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mentorconnect`

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service: `mongod`
3. Use: `MONGODB_URI=mongodb://localhost:27017/mentorconnect`

---

### 3. Google APIs (Required for Calendar Integration)

**Cost**: Free (generous quotas)

**Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable APIs:
   - Google Calendar API
   - Google+ API (for OAuth)
4. Create credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3001/auth/google/callback`
     - `http://localhost:5173` (for frontend)
5. Download the JSON file or copy the Client ID and Secret
6. Add to `.env` file:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

---

### 4. Email Service (Gmail - Required for Notifications)

**Cost**: Free

**Steps**:
1. Use your Gmail account or create a new one
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
4. Add to `.env` file:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

---

### 5. Stripe Payment Processing (Optional)

**Cost**: 2.9% + 30¢ per transaction

**Steps**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account
3. Complete account verification
4. Get API keys from "Developers" → "API keys"
5. Use test keys for development
6. Add to `.env` file:
   ```
   STRIPE_SECRET_KEY=sk_test_your-secret-key
   STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
   ```

---

### 6. Web Push Notifications (Optional)

**Cost**: Free

**Steps**:
1. Generate VAPID keys using online generator or:
   ```bash
   npx web-push generate-vapid-keys
   ```
2. Add to `.env` file:
   ```
   VAPID_PUBLIC_KEY=your-public-key
   VAPID_PRIVATE_KEY=your-private-key
   ```

---

## 🚀 Quick Start (Minimum Setup)

For a basic working version, you only need:

1. **MongoDB** (free Atlas account)
2. **OpenAI API** ($5 free credit)
3. **Gmail** (free)

### Minimal .env file:
```env
# Database (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mentorconnect

# JWT Secret (Required - generate random string)
JWT_SECRET=your-super-secret-random-string-here

# OpenAI API (Required for AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Email (Required for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server Config
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🔧 Installation Steps

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd mentorconnect
   npm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Start Application**:
   ```bash
   npm run dev:full
   ```

4. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🧪 Testing the Setup

### 1. Test Database Connection
- Register a new user
- Check if user appears in MongoDB

### 2. Test AI Features
- Go to AI Talk page
- Send a message
- Verify AI response

### 3. Test Email
- Register with a real email
- Check for welcome email

### 4. Test Real-time Features
- Open two browser windows
-  as different users
- Test messaging

## 🚨 Common Issues & Solutions

### MongoDB Connection Issues
```
Error: MongoNetworkError
```
**Solution**: Check network access settings in MongoDB Atlas

### OpenAI API Issues
```
Error: 401 Unauthorized
```
**Solution**: Verify API key is correct and account has credits

### Email Issues
```
Error: Invalid 
```
**Solution**: Ensure 2FA is enabled and using app password, not regular password

### Port Already in Use
```
Error: EADDRINUSE :::3001
```
**Solution**: Kill existing process or change PORT in .env

## 💰 Cost Breakdown

### Free Tier (Recommended for Development)
- **MongoDB Atlas**: Free (512MB)
- **OpenAI**: $5 free credit
- **Google APIs**: Free (generous quotas)
- **Gmail**: Free
- **Total**: ~$0 to start

### Production Estimates (1000 users)
- **MongoDB Atlas**: $9/month (2GB)
- **OpenAI**: $10-50/month (depending on usage)
- **Google APIs**: Free (unless heavy usage)
- **Email**: Free
- **Hosting**: $5-20/month
- **Total**: $24-84/month

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for all secrets
- [ ] Enable CORS properly
- [ ] Use HTTPS in production
- [ ] Regularly rotate API keys
- [ ] Monitor API usage and costs

## 📞 Support

If you need help with setup:

1. Check the error messages in browser console and server logs
2. Verify all environment variables are set correctly
3. Test each service individually
4. Check API key permissions and quotas

For specific issues, please open an issue in the repository with:
- Error message
- Steps to reproduce
- Environment details (OS, Node version, etc.)