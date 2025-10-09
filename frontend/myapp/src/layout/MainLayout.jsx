// src/layout/MainLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[15%] border-r border-gray-300 bg-violet-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar without bottom border to remove gap */}
        <Navbar />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
