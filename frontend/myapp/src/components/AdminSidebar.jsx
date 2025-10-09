import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  const linkStyle = 'hover:bg-violet-100 px-3 py-2 rounded transition font-medium flex items-center justify-between';
  const activeStyle = 'bg-violet-200 text-violet-800';

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const count = messages.filter(m => m.from === 'user' && !m.seenByAdmin).length;
    setUnreadCount(count);
  }, []);

  return (
    <div className="h-screen w-64 bg-violet-50 border-r border-gray-300 p-6">
      <div className="text-2xl font-bold text-violet-700 mb-6">Admin Panel</div>
      <nav className="flex flex-col gap-2 text-violet-700">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/manage-notices" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>
          Manage Notices
        </NavLink>
        <NavLink to="/admin/manage-applications" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>
          Manage Applications
        </NavLink>
        <NavLink to="/admin/messages" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>
          <span>Messages</span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
              {unreadCount}
            </span>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminSidebar;
