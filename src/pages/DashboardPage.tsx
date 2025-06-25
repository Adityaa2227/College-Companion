import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  Target, 
  MessageCircle, 
  Calendar, 
  TrendingUp,
  Star,
  Award,
  BookOpen,
  Brain,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [quote, setQuote] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete JavaScript course', completed: false },
    { id: 2, text: 'Review mentor feedback', completed: true },
    { id: 3, text: 'Prepare for interview', completed: false },
  ]);
  const [studyTimer, setStudyTimer] = useState(0);
  const [isStudying, setIsStudying] = useState(false);

  // Mock data for analytics
  const studyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 3 },
  ];

  useEffect(() => {
    // Fetch daily quote
    fetchDailyQuote();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const fetchDailyQuote = async () => {
    try {
      // Mock quote for now
      setQuote("Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill");
    } catch (error) {
      setQuote("The only way to do great work is to love what you do. - Steve Jobs");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const stats = [
    {
      title: 'Current Rating',
      value: user?.rating || 5.0,
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-50 text-yellow-800',
    },
    {
      title: 'Total XP',
      value: user?.xp || 0,
      icon: <Zap className="h-8 w-8 text-primary-500" />,
      color: 'bg-primary-50 text-primary-800',
    },
    {
      title: 'Study Streak',
      value: `${user?.streak || 0} days`,
      icon: <TrendingUp className="h-8 w-8 text-success-500" />,
      color: 'bg-success-50 text-success-800',
    },
    {
      title: 'Sessions',
      value: '12',
      icon: <Users className="h-8 w-8 text-secondary-500" />,
      color: 'bg-secondary-50 text-secondary-800',
    },
  ];

  const badges = [
    { name: 'First Session', icon: '🎯', earned: true },
    { name: 'Week Warrior', icon: '⚡', earned: true },
    { name: 'Study Master', icon: '📚', earned: false },
    { name: 'Mentor\'s Choice', icon: '⭐', earned: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your mentorship journey today.
          </p>
        </div>

        {/* Daily Quote */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-start space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Daily Inspiration</h3>
              <p className="text-sm opacity-90 italic">"{quote}"</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Study Analytics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Study Analytics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Badges</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center transition-all ${
                      badge.earned
                        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200'
                        : 'bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <p className={`text-sm font-medium ${
                      badge.earned ? 'text-yellow-800' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Study Timer */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Focus Timer</h3>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-primary-600 mb-4">
                  {formatTime(studyTimer)}
                </div>
                <button
                  onClick={() => setIsStudying(!isStudying)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isStudying
                      ? 'bg-error-500 hover:bg-error-600 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {isStudying ? 'Stop Study' : 'Start Study'}
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Tasks</h3>
              <div className="space-y-3">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      todo.completed
                        ? 'bg-success-50 border-success-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        todo.completed
                          ? 'text-success-800 line-through'
                          : 'text-gray-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors">
                + Add new task
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Message Mentor</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-5 w-5 text-secondary-600" />
                  <span className="text-sm font-medium">Schedule Meeting</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Brain className="h-5 w-5 text-accent-600" />
                  <span className="text-sm font-medium">AI Talk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;