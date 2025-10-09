import React, { useState } from "react";
import axios from "axios";

function PostNotice() {
  const [notice, setNotice] = useState({
    title: "",
    message: "",
    link: "",
    company: "",
    departments: "",
    eligibility: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/notices", notice);
      alert("Notice posted successfully");
      setNotice({
        title: "",
        message: "",
        link: "",
        company: "",
        departments: "",
        eligibility: "",
        deadline: ""
      });
    } catch (error) {
      console.error("Error posting notice:", error);
      alert("Failed to post notice");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">📢 Post New Notice</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={notice.title}
          onChange={handleChange}
          placeholder="Notice Title"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="message"
          value={notice.message}
          onChange={handleChange}
          placeholder="Message"
          rows="4"
          className="w-full px-4 py-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="link"
          value={notice.link}
          onChange={handleChange}
          placeholder="Link (optional)"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="company"
          value={notice.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="departments"
          value={notice.departments}
          onChange={handleChange}
          placeholder="Departments (e.g., CSE, IT)"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="eligibility"
          value={notice.eligibility}
          onChange={handleChange}
          placeholder="Eligibility (e.g., 6 CGPA and above)"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="deadline"
          value={notice.deadline}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Post Notice
        </button>
      </form>
    </div>
  );
}

export default PostNotice;
