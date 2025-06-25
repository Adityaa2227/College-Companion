import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  MessageCircle,
  Heart,
  Award,
  Briefcase
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  expertise: string[];
  bio: string;
  experience: string;
  responseTime: string;
  sessions: number;
  avatar: string;
  isOnline: boolean;
  badges: string[];
}

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Mock mentor data
    const mockMentors: Mentor[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        title: 'Senior Software Engineer',
        company: 'Google',
        location: 'San Francisco, CA',
        rating: 4.9,
        reviewCount: 127,
        hourlyRate: 85,
        expertise: ['JavaScript', 'React', 'Node.js', 'System Design'],
        bio: 'Passionate about helping developers grow their skills and advance their careers.',
        experience: '8+ years',
        responseTime: '< 1 hour',
        sessions: 245,
        avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isOnline: true,
        badges: ['Top Rated', 'Quick Responder']
      },
      {
        id: '2',
        name: 'Michael Chen',
        title: 'Product Manager',
        company: 'Microsoft',
        location: 'Seattle, WA',
        rating: 4.8,
        reviewCount: 89,
        hourlyRate: 95,
        expertise: ['Product Strategy', 'User Research', 'Data Analysis', 'Leadership'],
        bio: 'Helping aspiring PMs navigate the complex world of product management.',
        experience: '10+ years',
        responseTime: '< 2 hours',
        sessions: 178,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isOnline: false,
        badges: ['Expert', 'Mentor of the Month']
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        title: 'UX Design Lead',
        company: 'Airbnb',
        location: 'San Francisco, CA',
        rating: 4.9,
        reviewCount: 156,
        hourlyRate: 90,
        expertise: ['UI/UX Design', 'Design Systems', 'User Research', 'Prototyping'],
        bio: 'Passionate about creating user-centered designs that solve real problems.',
        experience: '7+ years',
        responseTime: '< 1 hour',
        sessions: 302,
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isOnline: true,
        badges: ['Top Rated', 'Design Expert']
      },
      {
        id: '4',
        name: 'David Kim',
        title: 'Data Scientist',
        company: 'Netflix',
        location: 'Los Angeles, CA',
        rating: 4.7,
        reviewCount: 73,
        hourlyRate: 80,
        expertise: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
        bio: 'Helping students and professionals break into the data science field.',
        experience: '6+ years',
        responseTime: '< 3 hours',
        sessions: 134,
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isOnline: true,
        badges: ['Data Expert']
      }
    ];
    setMentors(mockMentors);
  }, []);

  const expertiseOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning',
    'UI/UX Design', 'Product Strategy', 'Data Analysis', 'System Design',
    'Leadership', 'Marketing', 'Sales'
  ];

  const filteredMentors = mentors
    .filter(mentor => 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(mentor => 
      selectedExpertise === '' || 
      mentor.expertise.includes(selectedExpertise)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'experience':
          return b.sessions - a.sessions;
        default:
          return 0;
      }
    });

  const toggleFavorite = (mentorId: string) => {
    setFavorites(prev => 
      prev.includes(mentorId)
        ? prev.filter(id => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
          <p className="text-gray-600 mt-2">
            Connect with industry experts who can guide your career journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search mentors, skills, or companies..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
              >
                <option value="">All Expertise</option>
                {expertiseOptions.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="experience">Most Experience</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {mentor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <p className="text-sm text-primary-600 font-medium">{mentor.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(mentor.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(mentor.id)
                        ? 'text-error-500 bg-error-50'
                        : 'text-gray-400 hover:text-error-500 hover:bg-error-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(mentor.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                    <span className="text-sm text-gray-500">({mentor.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{mentor.responseTime}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Expertise */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${mentor.hourlyRate}</span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or explore different expertise areas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsPage;