// src/pages/Apply.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Apply() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/apply/all');
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-violet-700 mb-4">Available Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500 italic">No applications posted yet.</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {applications.map((app, index) => (
            <div key={index} className="bg-white p-4 border rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-violet-800">{app.company}</h2>
              <p><strong>Role:</strong> {app.role}</p>
              <p><strong>Location:</strong> {app.location}</p>
              <p><strong>Eligibility:</strong> {app.eligibility}</p>
              <a
                href={app.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 underline"
              >
                Apply Link
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Apply;
