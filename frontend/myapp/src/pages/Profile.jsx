import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setEditForm({ fullName: storedUser?.fullName, email: storedUser?.email });
  }, []);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        editForm
      );
      alert("✅ Profile updated");
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("❌ Failed to update profile");
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">No user data found.</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border text-gray-800">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">👤 Profile</h2>

      {!isEditing ? (
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Full Name:</span> {user.fullName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">User ID:</span> {user.id}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            ✏️ Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={editForm.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={editForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ✅ Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
