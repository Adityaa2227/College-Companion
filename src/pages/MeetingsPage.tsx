import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Plus, 
  Users, 
  MapPin,
  Edit3,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  mentor: string;
  mentorAvatar: string;
  date: Date;
  duration: number;
  type: 'video' | 'audio' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  location?: string;
}

const MeetingsPage: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'React Development Review',
      mentor: 'Sarah Johnson',
      mentorAvatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      date: new Date(2024, 0, 15, 14, 0),
      duration: 60,
      type: 'video',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Review progress on React project and discuss next steps'
    },
    {
      id: '2',
      title: 'Career Planning Session',
      mentor: 'Michael Chen',
      mentorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      date: new Date(2024, 0, 17, 10, 30),
      duration: 45,
      type: 'video',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
      notes: 'Discuss career transition strategy and roadmap'
    },
    {
      id: '3',
      title: 'UX Design Critique',
      mentor: 'Emily Rodriguez',
      mentorAvatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      date: new Date(2024, 0, 12, 16, 0),
      duration: 90,
      type: 'video',
      status: 'completed',
      notes: 'Portfolio review and design feedback session'
    }
  ]);

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(meeting => 
      format(meeting.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'completed':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'cancelled':
        return 'bg-error-100 text-error-800 border-error-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Clock className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
            <p className="text-gray-600 mt-2">
              Manage your mentorship sessions and appointments
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Schedule Meeting</span>
          </button>
        </div>

        {/* Week Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Week of {format(weekStart, 'MMM d, yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentWeek(new Date())}
                className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                Next
              </button>
            </div>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const dayMeetings = getMeetingsForDay(day);
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              
              return (
                <div key={index} className="min-h-32">
                  <div className={`text-center py-2 rounded-lg mb-3 ${
                    isToday ? 'bg-primary-100 text-primary-900' : 'bg-gray-50 text-gray-700'
                  }`}>
                    <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                    <div className="text-lg font-semibold">{format(day, 'd')}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        onClick={() => setSelectedMeeting(meeting)}
                        className={`p-2 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getStatusColor(meeting.status)}`}
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          {getTypeIcon(meeting.type)}
                          <span className="text-xs font-medium">{format(meeting.date, 'HH:mm')}</span>
                        </div>
                        <div className="text-xs font-medium truncate">{meeting.title}</div>
                        <div className="text-xs opacity-75 truncate">{meeting.mentor}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Meetings</h3>
          <div className="space-y-4">
            {meetings
              .filter(meeting => meeting.status === 'upcoming')
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((meeting) => (
                <div
                  key={meeting.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <img
                        src={meeting.mentorAvatar}
                        alt={meeting.mentor}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">with {meeting.mentor}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(meeting.date, 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{format(meeting.date, 'HH:mm')} ({meeting.duration} min)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(meeting.type)}
                            <span className="capitalize">{meeting.type}</span>
                          </div>
                        </div>
                        {meeting.notes && (
                          <p className="text-sm text-gray-600 mt-2">{meeting.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.meetingLink && (
                        <button
                          onClick={() => handleJoinMeeting(meeting)}
                          className="bg-success-600 hover:bg-success-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Join</span>
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-error-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;