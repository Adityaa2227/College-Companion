import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Star,
  Edit3,
  Save,
  X,
  Camera,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate software developer with a love for learning and mentoring others.',
    interests: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
    experience: '3+ years in Software Development',
    education: 'BS Computer Science, UC Berkeley',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev'
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const badges = [
    { name: 'First Session', icon: '🎯', description: 'Completed your first mentorship session' },
    { name: 'Week Warrior', icon: '⚡', description: 'Maintained a 7-day study streak' },
    { name: 'Mentor\'s Choice', icon: '⭐', description: 'Received excellent feedback from mentor' },
    { name: 'Goal Achiever', icon: '🏆', description: 'Completed your first learning goal' }
  ];

  const stats = [
    { label: 'Sessions Completed', value: '12', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Current Rating', value: '4.9', icon: <Star className="h-5 w-5" /> },
    { label: 'Total XP', value: '2,450', icon: <Award className="h-5 w-5" /> },
    { label: 'Study Streak', value: '15 days', icon: <Calendar className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-600"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-16">
              <div className="flex items-end space-x-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="pb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                  <p className="text-gray-600">{user?.role === 'mentor' ? 'Mentor' : 'Student'}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{user?.rating || 5.0}</span>
                    <span className="text-sm text-gray-500">• {user?.xp || 0} XP</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              {isEditing ? (
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={profileData.experience}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.experience}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h3 className="font-medium text-yellow-800">{badge.name}</h3>
                      <p className="text-sm text-yellow-700">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Update Profile Picture</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Award className="h-5 w-5 text-secondary-600" />
                  <span className="text-sm font-medium">View All Badges</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-5 w-5 text-accent-600" />
                  <span className="text-sm font-medium">Schedule Session</span>
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;