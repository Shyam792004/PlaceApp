// src/components/Navbar.jsx
import React from 'react';
import { FaUserCircle, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 h-16 bg-white shadow-md">
      <div className="text-xl font-bold text-violet-600">PlaceApp</div>
      <div className="flex items-center space-x-6 text-violet-700 font-medium">
        <div
          onClick={() => navigate('/home/profile')}
          className="flex items-center gap-1 cursor-pointer hover:text-violet-900 transition"
        >
          <FaUserCircle />
          <span>Profile</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-violet-900 transition">
          <FaSun />
          <span>Theme</span>
        </div>
        <div
          onClick={() => {
          localStorage.removeItem('user'); // Clear user session
          navigate('/'); // Redirect to login
          }}
          className="flex items-center gap-1 cursor-pointer hover:text-red-600 transition"
          >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
