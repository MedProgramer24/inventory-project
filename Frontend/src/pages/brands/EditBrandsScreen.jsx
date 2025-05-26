import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import ShowSuccessMesasge from "../../components/ShowSuccessMesasge";
import LoadingIndicator from "../../components/LoadingIndicator";
import axios from "axios";
import { SERVER_URL } from "../../router";

function EditBrandsScreen() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({});
  const [isError, setError] = useState("");

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.get(`${SERVER_URL}/api/v1/brands/${params.id}`);
      setData(data);
    } catch (e) {
      setError(e.message || "Failed to fetch brand data");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function onchangeHandler(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (success) setSuccess(false); // reset success on change
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setError("");
      setUploading(true);
      await axios.patch(`${SERVER_URL}/api/v1/brands/${params.id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true);
    } catch (e) {
      setError(e.message || "Failed to update brand");
      console.error(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">Edit Brand</h1>

        {isLoading && <LoadingIndicator />}

        {isError && (
          <ShowErrorMessage>
            <span
              className="cursor-pointer underline text-red-600 hover:text-red-800"
              onClick={getDataFromApi}
            >
              {isError} - Click to reload
            </span>
          </ShowErrorMessage>
        )}

        {success && (
          <ShowSuccessMesasge>
            <p className="text-green-700">
              Brand updated successfully!{" "}
              <Link to="/" replace className="underline text-teal-600 hover:text-teal-800">
                Go to Home
              </Link>
            </p>
          </ShowSuccessMesasge>
        )}

        {!isLoading && !isError && (
          <form onChange={onchangeHandler} onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={data.name || ""}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                placeholder="Enter brand name"
                disabled={uploading}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={data.description || ""}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition resize-none"
                placeholder="Enter brand description"
                disabled={uploading}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className={`inline-flex justify-center py-3 px-6 rounded-md text-white font-semibold shadow-md transition
                  ${
                    uploading
                      ? "bg-teal-300 cursor-not-allowed"
                      : success
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-teal-600 hover:bg-teal-700"
                  }
                `}
              >
                {uploading ? "Updating..." : success ? "Updated!" : "Update Brand"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditBrandsScreen;
