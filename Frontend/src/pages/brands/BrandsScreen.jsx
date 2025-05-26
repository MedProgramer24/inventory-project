import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import { IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SERVER_URL } from "../../router";

function BrandsScreen() {
  const location = useLocation();

  const [isLoading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.reload) {
      fetchBrands();
      window.history.replaceState({}, document.title);
    } else {
      fetchBrands();
    }
  }, [location.state]);

  async function fetchBrands() {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/brands?t=${Date.now()}`);
      setBrands(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (e) {
      setError(e.message || "Failed to load brands");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">Brands</h1>
          <Link
            to="new"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-cyan-600 transition"
          >
            + Add New Brand
          </Link>
        </header>

        {isLoading && <LoadingIndicator />}

        {error && (
          <ShowErrorMessage>
            <span
              className="cursor-pointer underline text-red-600 hover:text-red-800"
              onClick={fetchBrands}
            >
              {error} - Click to retry
            </span>
          </ShowErrorMessage>
        )}

        {!isLoading && !error && brands.length === 0 && (
          <p className="text-gray-600 text-center mt-12 text-lg">No brands found.</p>
        )}

        {!isLoading && !error && brands.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BrandCard({ brand }) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{brand.name}</h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {brand.description}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 flex items-end justify-between text-gray-500 text-sm">
        {brand.editedBy ? (
          <>
            <div className="flex items-center space-x-3">
              <FaUser className="text-teal-500" />
              <div>
                <p className="font-medium text-gray-800 line-clamp-1">{brand.editedBy.name}</p>
                <p className="truncate">{brand.editedBy.email}</p>
              </div>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-semibold text-xs uppercase tracking-wide">
              Edited
            </span>
          </>
        ) : (
          brand.createdBy && (
            <>
              <div className="flex items-center space-x-3">
                <FaUser className="text-indigo-500" />
                <div>
                  <p className="font-medium text-gray-800 line-clamp-1">{brand.createdBy.name}</p>
                  <p className="truncate">{brand.createdBy.email}</p>
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold text-xs uppercase tracking-wide">
                Created
              </span>
            </>
          )
        )}
      </div>

      <NavLink
        to={`edit/${brand._id}`}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-3 py-1 rounded-md font-semibold text-sm shadow-lg transition-opacity duration-300"
        title="Edit Brand"
      >
        Edit
      </NavLink>
    </div>
  );
}

export default BrandsScreen;
