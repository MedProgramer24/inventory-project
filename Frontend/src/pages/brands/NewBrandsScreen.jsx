import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { SERVER_URL } from "../../router";

function NewBrandsScreen() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({ name: "", description: "" });
  const [isError, setError] = useState("");

  function onchangeHandler(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setError("");
      setUploading(true);

      await axios.post(`${SERVER_URL}/api/v1/brands/`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setData({ name: "", description: "" });

      // Redirect to brand list page
      navigate("/brands");
    } catch (e) {
      setError(e.message || "Failed to create brand");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-5 w-full h-full">
      <h1 className="text-2xl font-semibold">Add New Brand</h1>

      {isError && (
        <div className="text-red-600 mb-2">{isError}</div>
      )}

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={onchangeHandler}  // <-- fix here
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="desc"
              value={data.description}
              onChange={onchangeHandler}  // <-- fix here
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={uploading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBrandsScreen;
