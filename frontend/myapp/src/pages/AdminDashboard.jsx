// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'NoticeBoard',
    description: 'Post a new notice',
    icon: '📢',
    route: '/admin/post-notice'
  },
  {
    title: 'Apply',
    description: 'Post a new application',
    icon: '📝',
    route: '/admin/post-apply'
  },
  {
    title: 'Messages',
    description: 'Read user messages',
    icon: '💬',
    route: '/home/message'
  }
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-white border shadow-md rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-5xl mb-4">{card.icon}</div>
            <h2 className="text-xl font-semibold text-violet-700 mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
