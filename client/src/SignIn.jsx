import React, { useState } from "react";
import "./App.css"; // Ensure Tailwind is configured

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    alert(`Welcome, ${username}!`); // You can replace this with actual authentication logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2E8DF]">
      <div className="bg-[#F2E8DF] p-10 rounded-lg shadow-lg w-[450px] text-center">
        <h2 className="text-3xl font-bold text-[#3D5122] mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-6 text-left">
            <label className="block text-lg font-semibold text-[#3D5122] mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D5122] text-gray-900"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 text-left">
            <label className="block text-lg font-semibold text-[#3D5122] mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D5122] text-gray-900"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-[150px] mx-auto p-3 bg-[#3D5122] text-white font-semibold rounded-lg shadow-md hover:bg-[#2C3A16] transition duration-300"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

