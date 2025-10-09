import React, { useEffect, useState } from "react";
import axios from "axios";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices", err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">
        📢 Announcements & Notices
      </h2>

      {notices.length === 0 ? (
        <p className="text-gray-600 text-center">No notices available yet.</p>
      ) : (
        <div className="grid gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-4 border border-violet-300 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-violet-700 mb-2">{notice.title}</h3>
              <p className="text-gray-700 mb-2">{notice.message}</p>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> {notice.company} | <strong>Depts:</strong> {notice.departments}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Eligibility:</strong> {notice.eligibility}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Deadline:</strong>{" "}
                {new Date(notice.deadline).toLocaleString()}
              </p>
              {notice.link && (
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 underline text-sm mt-2 inline-block"
                >
                  View Details
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
