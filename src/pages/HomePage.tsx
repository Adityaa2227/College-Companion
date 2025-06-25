import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  MessageCircle, 
  Trophy, 
  Star, 
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Globe
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary-600" />,
      title: "AI-Powered Matching",
      description: "Get matched with the perfect mentor using our advanced AI algorithms based on your interests, skills, and goals."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-secondary-600" />,
      title: "Real-time Communication",
      description: "Chat, video call, and collaborate with your mentors in real-time with our integrated communication platform."
    },
    {
      icon: <Trophy className="h-8 w-8 text-accent-600" />,
      title: "Gamified Learning",
      description: "Earn badges, climb leaderboards, and track your progress with our engaging gamification system."
    },
    {
      icon: <Target className="h-8 w-8 text-success-600" />,
      title: "Goal Tracking",
      description: "Set and track your career goals with personalized analytics and progress insights."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Mentors" },
    { number: "50,000+", label: "Students Helped" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Connect. Learn. <span className="text-accent-400">Grow.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto animate-slide-up">
              Join the world's most advanced AI-powered mentorship platform and unlock your potential with personalized guidance from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/register"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/mentors"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center"
              >
                Explore Mentors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Mentorship
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in your career journey, powered by cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your goals, interests, and what you're looking to achieve.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Matched</h3>
              <p className="text-gray-600">
                Our AI algorithm finds the perfect mentor based on your unique profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Learning</h3>
              <p className="text-gray-600">
                Begin your mentorship journey with personalized guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join thousands of successful professionals who have accelerated their careers with MentorConnect.
          </p>
          <Link
            to="/register"
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;