import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Paperclip,
  Smile,
  Circle
} from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isOnline: boolean;
  messages: Message[];
}

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock chat data
    const mockChats: Chat[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
        lastMessage: 'Great progress on your project!',
        timestamp: new Date(),
        unread: 2,
        isOnline: true,
        messages: [
          {
            id: '1',
            senderId: '1',
            content: 'Hi! How is your React project coming along?',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text'
          },
          {
            id: '2',
            senderId: user?.id || '',
            content: 'It\'s going well! I\'ve implemented the authentication.',
            timestamp: new Date(Date.now() - 3000000),
            type: 'text'
          },
          {
            id: '3',
            senderId: '1',
            content: 'That\'s excellent! Let me know if you need help with the next steps.',
            timestamp: new Date(Date.now() - 1800000),
            type: 'text'
          },
          {
            id: '4',
            senderId: '1',
            content: 'Great progress on your project!',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      },
      {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
        lastMessage: 'Let\'s schedule our next session',
        timestamp: new Date(Date.now() - 7200000),
        unread: 0,
        isOnline: false,
        messages: [
          {
            id: '1',
            senderId: '2',
            content: 'Hi! Ready for our product management discussion?',
            timestamp: new Date(Date.now() - 7200000),
            type: 'text'
          },
          {
            id: '2',
            senderId: user?.id || '',
            content: 'Yes, I\'m excited to learn more about user research!',
            timestamp: new Date(Date.now() - 7000000),
            type: 'text'
          },
          {
            id: '3',
            senderId: '2',
            content: 'Let\'s schedule our next session',
            timestamp: new Date(Date.now() - 7200000),
            type: 'text'
          }
        ]
      }
    ];
    setChats(mockChats);
    setSelectedChat(mockChats[0]);
  }, [user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };

    // Update selected chat
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: message,
      timestamp: new Date()
    };

    // Update chats list
    setChats(chats.map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    ));

    setSelectedChat(updatedChat);
    setMessage('');

    // Emit message via socket
    if (socket) {
      socket.emit('sendMessage', {
        chatId: selectedChat.id,
        receiverId: selectedChat.id,
        message: newMessage
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Chat List */}
          <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{formatTime(chat.timestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedChat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChat.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.senderId === user?.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            msg.senderId === user?.id ? 'text-primary-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        rows={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <Circle className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a chat from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;