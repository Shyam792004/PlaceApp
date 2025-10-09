import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkStyle =
    'hover:bg-violet-100 px-3 py-2 rounded transition font-medium';
  const activeStyle = 'bg-violet-200 text-violet-800';

  return (
    <div className="h-full flex flex-col bg-violet-50 border-r border-gray-300">
      <div className="p-6 text-2xl font-bold text-violet-700">PlaceApp</div>
      <nav className="flex flex-col gap-2 px-4 text-violet-700">
        <NavLink
          to="/home/notice"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}
        >
          Announcement
        </NavLink>
        <NavLink
          to="/home/apply"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}
        >
          Application
        </NavLink>
        <NavLink
          to="/home/message"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}
        >
          Msg
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
