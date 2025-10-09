// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      toast.success("Login successful!");

      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect admin to /admin/dashboard
      if (form.email === "admin@gmail.com" && form.password === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      toast.error("Login failed. " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-violet-600 flex flex-col items-center justify-center p-6">
        <h6 className="text-3xl font-bold text- text-center mb-2">Welcome</h6>
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">PLACE_APP</h1>
        <p className="text-white mb-4 italic text-sm text-center">@Place where you place</p>
        <img src={loginImg} alt="Login visual" className="max-w-xs md:max-w-sm rounded-lg shadow-lg" />
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-violet-700">Login to Your Account</h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
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
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-violet-600 hover:underline font-medium">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
