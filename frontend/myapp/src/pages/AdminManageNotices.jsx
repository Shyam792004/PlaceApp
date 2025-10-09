import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminManageNotices() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to load notices", err);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notices/${id}`);
      alert('Notice deleted');
      fetchNotices();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">🗒️ Manage Notices</h2>
      <div className="grid gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold text-violet-800">{notice.title}</h3>
            <p><strong>Message:</strong> {notice.message}</p>
            <p><strong>Deadline:</strong> {notice.deadline}</p>
            <p><strong>Link:</strong> <a href={notice.link} className="text-blue-600 underline" target="_blank">{notice.link}</a></p>
            <button
              onClick={() => deleteNotice(notice.id)}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManageNotices;
