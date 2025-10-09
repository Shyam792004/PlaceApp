// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Public pages
import Login from './pages/Login';
import Register from './pages/Register';

// User pages
import Home from './pages/Home';
import NoticeBoard from './pages/NoticeBoard';
import Apply from './pages/Apply';
import Message from './pages/Message';
import Profile from './pages/Profile';
import UserMessages from './pages/UserMessages';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import PostApply from './pages/PostApply';
import PostNotice from './pages/PostNotice';
import AdminManageNotices from './pages/AdminManageNotices';
import AdminManageApply from './pages/AdminManageApply';
import AdminMessages from './pages/AdminMessages';

// Layouts
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <>
      {/* Toast container must be outside of <Routes> */}
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="post-apply" element={<PostApply />} />
          <Route path="post-notice" element={<PostNotice />} />
          <Route path="manage-notices" element={<AdminManageNotices />} />
          <Route path="manage-applications" element={<AdminManageApply />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* User Routes */}
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="notice" element={<NoticeBoard />} />
          <Route path="apply" element={<Apply />} />
          <Route path="message" element={<UserMessages />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
