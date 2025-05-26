import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../router";

function LoginScreen() {
  const [formData, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleInputChange(e) {
    setData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const { status } = await axios.post(
        `${SERVER_URL}/api/v1/users/login`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (status === 201) {
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-md shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign in to InventoryPro
        </h1>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          New user?{" "}
          <Link to="signup" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
