import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminManageApply() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/apply/all');
      setApplications(res.data);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
      alert('Error loading applications');
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/apply/delete/${id}`);
      alert('Application deleted');
      fetchApplications();
    } catch (err) {
      console.error('Failed to delete application:', err);
      alert('Failed to delete application');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">📝 Manage Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500 italic">No applications found.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold text-violet-800">{app.company}</h3>
              <p><strong>Role:</strong> {app.role}</p>
              <p><strong>Location:</strong> {app.location}</p>
              <p><strong>Eligibility:</strong> {app.eligibility}</p>
              <a
                href={app.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                Apply Link
              </a>
              <button
                onClick={() => deleteApplication(app.id)}
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminManageApply;
