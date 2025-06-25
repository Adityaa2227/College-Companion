import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Flag, 
  TrendingUp, 
  Shield, 
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'mentors', name: 'Mentor Applications', icon: <Shield className="h-5 w-5" /> },
    { id: 'reports', name: 'Reports', icon: <Flag className="h-5 w-5" /> },
    { id: 'content', name: 'Content Moderation', icon: <MessageSquare className="h-5 w-5" /> }
  ];

  const stats = [
    { title: 'Total Users', value: '12,543', change: '+12%', color: 'text-primary-600' },
    { title: 'Active Mentors', value: '1,234', change: '+8%', color: 'text-success-600' },
    { title: 'Sessions This Month', value: '5,678', change: '+15%', color: 'text-secondary-600' },
    { title: 'Pending Reports', value: '23', change: '-5%', color: 'text-warning-600' }
  ];

  const pendingMentors = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      experience: '5+ years in Software Engineering',
      company: 'Google',
      appliedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      experience: '8+ years in Product Management',
      company: 'Microsoft',
      appliedDate: '2024-01-14',
      status: 'pending'
    }
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'message',
      content: 'Inappropriate message content...',
      reporter: 'John Doe',
      reported: 'Jane Smith',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      type: 'profile',
      content: 'Fake credentials in profile',
      reporter: 'Mike Wilson',
      reported: 'Bob Johnson',
      date: '2024-01-14',
      status: 'pending'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-sm text-gray-700">New mentor application from Alex Johnson</span>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Content reported by user John Doe</span>
            <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-gray-700">100+ new user registrations today</span>
            <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMentorApplications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Pending Mentor Applications</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingMentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                      <div className="text-sm text-gray-500">{mentor.email}</div>
                      <div className="text-sm text-primary-600">{mentor.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{mentor.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{mentor.appliedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-primary-600 hover:text-primary-900 p-1">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-success-600 hover:text-success-900 p-1">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="text-error-600 hover:text-error-900 p-1">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Content Reports</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Reports</option>
            <option>Messages</option>
            <option>Profiles</option>
            <option>Reviews</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportedContent.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{report.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.reporter}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.reported}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-primary-600 hover:text-primary-900 p-1">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-error-600 hover:text-error-900 p-1">
                      <Ban className="h-4 w-4" />
                    </button>
                    <button className="text-success-600 hover:text-success-900 p-1">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, mentors, and platform content
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'mentors' && renderMentorApplications()}
            {activeTab === 'reports' && renderReports()}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600">User management features coming soon...</p>
              </div>
            )}
            {activeTab === 'content' && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Moderation</h3>
                <p className="text-gray-600">Content moderation tools coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;