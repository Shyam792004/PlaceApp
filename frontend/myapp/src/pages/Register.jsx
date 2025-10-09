import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../assets/login.jpg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (res.status === 409) {
        toast.error("Email already registered.");
        return;
      }

      if (!res.ok) throw new Error("Registration failed");

      toast.success("Registered successfully!");
      navigate("/"); // Redirect to login
    } catch (err) {
      toast.error("Error during registration: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-violet-600 flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">Join PlaceApp</h2>
        <p className="text-white mb-4 italic text-sm text-center">@Place where you place</p>
        <img src={loginImg} alt="Register" className="max-w-xs md:max-w-sm rounded-lg shadow-lg" />
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-violet-700">Create an Account</h2>
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/" className="text-violet-600 hover:underline font-medium">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
