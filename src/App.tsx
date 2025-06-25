import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import Page from './pages/Page';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MentorsPage from './pages/MentorsPage';
import MessagesPage from './pages/MessagesPage';
import MentorExamPage from './pages/MentorExamPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import AITalkPage from './pages/AITalkPage';
import MeetingsPage from './pages/MeetingsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/" element={<Page />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/mentors" element={
                  <ProtectedRoute>
                    <MentorsPage />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } />
                <Route path="/mentor-exam" element={
                  <ProtectedRoute>
                    <MentorExamPage />
                  </ProtectedRoute>
                } />
                <Route path="/resume-builder" element={
                  <ProtectedRoute>
                    <ResumeBuilderPage />
                  </ProtectedRoute>
                } />
                <Route path="/ai-talk" element={
                  <ProtectedRoute>
                    <AITalkPage />
                  </ProtectedRoute>
                } />
                <Route path="/meetings" element={
                  <ProtectedRoute>
                    <MeetingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;