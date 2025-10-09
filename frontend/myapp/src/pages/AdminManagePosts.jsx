// src/pages/AdminManagePosts.jsx
import React, { useEffect, useState } from 'react';

function AdminManagePosts() {
  const [notices, setNotices] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem('notices')) || [];
    const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    setNotices(storedNotices);
    setApplications(storedApplications);
  }, []);

  const deleteNotice = (index) => {
    const updated = [...notices];
    updated.splice(index, 1);
    localStorage.setItem('notices', JSON.stringify(updated));
    setNotices(updated);
  };

  const deleteApplication = (index) => {
    const updated = [...applications];
    updated.splice(index, 1);
    localStorage.setItem('applications', JSON.stringify(updated));
    setApplications(updated);
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-violet-700 mb-4">Posted Notices</h2>
          {notices.length === 0 ? (
            <p className="text-gray-500 italic">No notices posted.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div key={index} className="bg-white border rounded p-4 shadow-sm relative">
                  <h3 className="text-lg font-semibold text-violet-800">{notice.title}</h3>
                  <p className="text-gray-700">{notice.message}</p>
                  {notice.link && <a href={notice.link} className="text-violet-600 underline" target="_blank">View Link</a>}
                  <button onClick={() => deleteNotice(index)} className="absolute top-2 right-2 text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-violet-700 mb-4">Posted Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-500 italic">No applications posted.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div key={index} className="bg-white border rounded p-4 shadow-sm relative">
                  <h3 className="text-lg font-semibold text-violet-800">{app.company}</h3>
                  <p><strong>Departments:</strong> {app.departments}</p>
                  <p><strong>Eligibility:</strong> {app.eligibility}</p>
                  <p><strong>Deadline:</strong> {app.deadlineDate} at {app.deadlineTime}</p>
                  <a href={app.link} className="text-violet-600 underline" target="_blank">Apply Link</a>
                  <button onClick={() => deleteApplication(index)} className="absolute top-2 right-2 text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminManagePosts;
