import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SERVER_URL } from "../../router";

function SignupScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post(`${SERVER_URL}/api/v1/users/new`, formData);
      if (status === 201) {
        navigate("/auth", { replace: true });
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupScreen;
