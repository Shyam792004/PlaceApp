// src/pages/PostApply.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostApply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    eligibility: '',
    applyLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post("http://localhost:8080/api/apply/post", formData);
      alert("✅ Application posted to backend!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("❌ Failed to post application.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">
          📝 Post New Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Ex: Google"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Ex: Frontend Developer"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Bangalore"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
            <input
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="Ex: Final year students"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
            <input
              name="applyLink"
              type="url"
              value={formData.applyLink}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white font-semibold py-2 rounded-lg hover:bg-violet-700 transition"
          >
            📤 Post Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostApply;
