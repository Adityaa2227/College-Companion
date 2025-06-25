const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mentorconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
  bio: String,
  interests: [String],
  experience: String,
  avatar: String,
  rating: { type: Number, default: 5.0 },
  xp: { type: Number, default: 0 },
  badges: [String],
  streak: { type: Number, default: 0 },
  studyHours: [Number],
  isVerified: { type: Boolean, default: false },
  isMentorCertified: { type: Boolean, default: false },
  mentorExamScore: Number,
  location: String,
  linkedin: String,
  github: String,
  website: String,
  phone: String,
  skills: [String],
  hourlyRate: Number,
  responseTime: String,
  sessions: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Message Schema
const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Meeting Schema
const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  type: { type: String, enum: ['video', 'audio', 'in-person'], default: 'video' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  meetingLink: String,
  notes: String,
  location: String,
  googleEventId: String,
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// Todo Schema
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

// Resume Schema
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  template: { type: String, default: 'modern' },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String
  },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

// Study Session Schema
const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true }, // in seconds
  task: String,
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const StudySession = mongoose.model('StudySession', studySessionSchema);

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, bio, interests, experience } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      bio,
      interests: interests ? interests.split(',').map(i => i.trim()) : [],
      experience
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rating: user.rating,
        xp: user.xp,
        badges: user.badges,
        streak: user.streak,
        studyHours: user.studyHours
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const DEMO_USERS = [
  {
    email: 'demo-student@demo.com',
    password: 'demopass',
    user: {
      id: 'demo-student',
      name: 'Demo Student',
      email: 'demo-student@demo.com',
      role: 'student',
      rating: 5.0,
      xp: 0,
      badges: [],
      streak: 0,
    }
  },
  {
    email: 'demo-mentor@demo.com',
    password: 'demopass',
    user: {
      id: 'demo-mentor',
      name: 'Demo Mentor',
      email: 'demo-mentor@demo.com',
      role: 'mentor',
      rating: 4.9,
      xp: 1000,
      badges: ['Top Rated'],
      streak: 3,
    }
  }
];

app.post('/api/auth/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // DEMO  HANDLING
    const demo = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );
    if (demo) {
      // Just return user info for demo accounts, no JWT
      return res.json({
        user: demo.user
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last active and online status
    user.lastActive = new Date();
    user.isOnline = true;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rating: user.rating,
        xp: user.xp,
        badges: user.badges,
        streak: user.streak,
        studyHours: user.studyHours
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      rating: user.rating,
      xp: user.xp,
      badges: user.badges,
      streak: user.streak,
      studyHours: user.studyHours
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mentor Routes
app.get('/api/mentors', authenticateToken, async (req, res) => {
  try {
    const { search, expertise, sortBy } = req.query;
    let query = { role: 'mentor', isMentorCertified: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (expertise) {
      query.skills = { $in: [expertise] };
    }

    let sortOptions = {};
    switch (sortBy) {
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'price':
        sortOptions = { hourlyRate: 1 };
        break;
      case 'experience':
        sortOptions = { sessions: -1 };
        break;
      default:
        sortOptions = { rating: -1 };
    }

    const mentors = await User.find(query)
      .select('-password')
      .sort(sortOptions)
      .limit(50);

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/mentor-exam/submit', authenticateToken, async (req, res) => {
  try {
    const { answers, score } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    user.mentorExamScore = score;
    user.isMentorCertified = score >= 70;
    
    if (user.isMentorCertified) {
      user.role = 'mentor';
      user.badges.push('Certified Mentor');
      user.xp += 500;
    }

    await user.save();

    res.json({
      passed: user.isMentorCertified,
      score: score,
      certified: user.isMentorCertified
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Messages Routes
app.get('/api/messages/chats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    })
    .populate('senderId receiverId', 'name avatar isOnline')
    .sort({ createdAt: -1 });

    // Group messages by chat partners
    const chatsMap = new Map();
    
    messages.forEach(message => {
      const partnerId = message.senderId._id.toString() === userId ? 
        message.receiverId._id.toString() : message.senderId._id.toString();
      
      const partner = message.senderId._id.toString() === userId ? 
        message.receiverId : message.senderId;

      if (!chatsMap.has(partnerId)) {
        chatsMap.set(partnerId, {
          id: partnerId,
          name: partner.name,
          avatar: partner.avatar || `https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`,
          isOnline: partner.isOnline,
          lastMessage: message.content,
          timestamp: message.createdAt,
          unread: 0,
          messages: []
        });
      }
      
      chatsMap.get(partnerId).messages.push(message);
    });

    const chats = Array.from(chatsMap.values());
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/messages/:chatId', authenticateToken, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: chatId },
        { senderId: chatId, receiverId: userId }
      ]
    })
    .populate('senderId receiverId', 'name avatar')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/messages/send', authenticateToken, async (req, res) => {
  try {
    const { receiverId, content, type = 'text' } = req.body;
    const senderId = req.user.userId;

    const message = new Message({
      chatId: `${senderId}-${receiverId}`,
      senderId,
      receiverId,
      content,
      type
    });

    await message.save();
    await message.populate('senderId receiverId', 'name avatar');

    // Emit to socket
    io.to(receiverId).emit('newMessage', message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Meetings Routes
app.get('/api/meetings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const meetings = await Meeting.find({
      $or: [{ mentorId: userId }, { studentId: userId }]
    })
    .populate('mentorId studentId', 'name avatar')
    .sort({ date: 1 });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/meetings', authenticateToken, async (req, res) => {
  try {
    const { title, mentorId, date, duration, type, notes } = req.body;
    const studentId = req.user.userId;

    const meeting = new Meeting({
      title,
      mentorId,
      studentId,
      date: new Date(date),
      duration,
      type,
      notes,
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`
    });

    await meeting.save();
    await meeting.populate('mentorId studentId', 'name avatar');

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Todos Routes
app.get('/api/todos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/todos', authenticateToken, async (req, res) => {
  try {
    const { text, dueDate, priority } = req.body;
    const userId = req.user.userId;

    const todo = new Todo({
      userId,
      text,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      updates,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userId });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Resume Routes
app.get('/api/resumes', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/resumes', authenticateToken, async (req, res) => {
  try {
    const resumeData = req.body;
    const userId = req.user.userId;

    const resume = new Resume({
      ...resumeData,
      userId,
      updatedAt: new Date()
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/resumes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Study Sessions Routes
app.post('/api/study-sessions', authenticateToken, async (req, res) => {
  try {
    const { duration, task } = req.body;
    const userId = req.user.userId;

    const session = new StudySession({
      userId,
      duration,
      task
    });

    await session.save();

    // Update user XP and streak
    const user = await User.findById(userId);
    user.xp += Math.floor(duration / 60); // 1 XP per minute
    
    // Check if this maintains streak
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdaySession = await StudySession.findOne({
      userId,
      date: {
        $gte: yesterday.setHours(0, 0, 0, 0),
        $lt: yesterday.setHours(23, 59, 59, 999)
      }
    });

    if (yesterdaySession || user.streak === 0) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }

    await user.save();

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/study-sessions/analytics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sessions = await StudySession.find({
      userId,
      date: { $gte: startDate }
    });

    // Group by day
    const analytics = {};
    sessions.forEach(session => {
      const day = session.date.toISOString().split('T')[0];
      if (!analytics[day]) {
        analytics[day] = { totalTime: 0, sessions: 0 };
      }
      analytics[day].totalTime += session.duration;
      analytics[day].sessions += 1;
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Chat Routes (OpenAI Integration)
app.post('/api/ai/chat', authenticateToken, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Mock AI response for now - replace with actual OpenAI API call
    const responses = [
      "That's a great question! Based on my understanding, here are some key strategies you should consider...",
      "I'd recommend focusing on building your skills in these areas. Let me break this down for you...",
      "This is definitely an important topic in today's professional landscape. Here's my advice...",
      "Great question! When approaching this challenge, I suggest considering these factors..."
    ];

    const aiResponse = responses[Math.floor(Math.random() * responses.length)];

    res.json({
      response: aiResponse,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Daily Quote API
app.get('/api/quotes/daily', async (req, res) => {
  try {
    const quotes = [
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload route
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Routes
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalUsers = await User.countDocuments();
    const totalMentors = await User.countDocuments({ role: 'mentor' });
    const totalSessions = await Meeting.countDocuments({ status: 'completed' });
    const pendingReports = 0; // Implement reporting system

    res.json({
      totalUsers,
      totalMentors,
      totalSessions,
      pendingReports
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Socket.io connection handling
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('userOnline', (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    
    // Update user online status
    User.findByIdAndUpdate(userId, { 
      isOnline: true, 
      lastActive: new Date() 
    }).exec();

    // Broadcast online users
    io.emit('onlineUsers', Array.from(connectedUsers.keys()));
  });

  socket.on('sendMessage', async (data) => {
    try {
      const { chatId, receiverId, message } = data;
      
      const newMessage = new Message({
        chatId,
        senderId: socket.userId,
        receiverId,
        content: message.content,
        type: message.type || 'text'
      });

      await newMessage.save();
      await newMessage.populate('senderId receiverId', 'name avatar');

      // Send to receiver if online
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }

      // Send back to sender
      socket.emit('messageSent', newMessage);
    } catch (error) {
      socket.emit('messageError', { error: 'Failed to send message' });
    }
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
      
      // Update user offline status
      User.findByIdAndUpdate(socket.userId, { 
        isOnline: false, 
        lastActive: new Date() 
      }).exec();

      // Broadcast updated online users
      io.emit('onlineUsers', Array.from(connectedUsers.keys()));
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default defineConfig({
  // ...existing code...
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});