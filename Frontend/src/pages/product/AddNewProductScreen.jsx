import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowSuccessMesasge from "../../components/ShowSuccessMesasge";
import { SERVER_URL } from "../../router";

function AddNewProductScreen() {
  const [error, setError] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [formData, setFormData] = useState({
    locationId: "",
    status: "not in use",
    title: "",
    description: "",
    serialNo: "",
    rackMountable: false,
    isPart: false,
    manufacturer: "",
    model: "",
    warrantyMonths: "",
    user: "department",
    dateOfPurchase: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert string "true"/"false" to boolean for rackMountable and isPart
    if (type === "select-one" && (name === "rackMountable" || name === "isPart")) {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    fetchNecessaryData();
  }, []);

  const fetchNecessaryData = async () => {
    try {
      const manufacturersRes = await axios.get(`${SERVER_URL}/api/v1/brands`);
      const locationsRes = await axios.get(`${SERVER_URL}/api/v1/location`);

      console.log("manufacturersRes.data:", manufacturersRes.data);
      console.log("locationsRes.data:", locationsRes.data);

      // Assuming your API returns an array directly, else adjust below
      const manufacturersData = Array.isArray(manufacturersRes.data)
        ? manufacturersRes.data
        : manufacturersRes.data.brands || manufacturersRes.data.data || [];

      const locationsData = Array.isArray(locationsRes.data)
        ? locationsRes.data
        : locationsRes.data.locations || locationsRes.data.data || [];

      setManufacturer(manufacturersData);
      setAllLocations(locationsData);

      if (locationsData.length > 0 && manufacturersData.length > 0) {
        setFormData((prev) => ({
          ...prev,
          manufacturer: manufacturersData[0]._id,
          locationId: locationsData[0]._id,
        }));
      }
    } catch (e) {
      setError("Failed to load necessary data");
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      await axios.post(`${SERVER_URL}/api/v1/products`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("Product added successfully");
      setFormData({
        locationId: allLocations.length > 0 ? allLocations[0]._id : "",
        status: "not in use",
        title: "",
        description: "",
        serialNo: "",
        rackMountable: false,
        isPart: false,
        manufacturer: manufacturer.length > 0 ? manufacturer[0]._id : "",
        model: "",
        warrantyMonths: "",
        user: "department",
        dateOfPurchase: "",
      });
    } catch (error) {
      setError("Failed to add product");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-5">
      <h1 className="text-3xl font-semibold text-neutral-900">Add New Product</h1>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="serialNo"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Serial Number
            </label>
            <input
              type="text"
              id="serialNo"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rackMountable"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Rack Mountable
            </label>
            <select
              id="rackMountable"
              name="rackMountable"
              value={formData.rackMountable}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="isPart"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Is Part
            </label>
            <select
              id="isPart"
              name="isPart"
              value={formData.isPart}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="manufacturer"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Manufacturer
            </label>
            <select
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              {Array.isArray(manufacturer) &&
                manufacturer.map((man) => (
                  <option key={man._id} value={man._id}>
                    {man.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="locationId"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Location / Sector
            </label>
            <select
              id="locationId"
              name="locationId"
              value={formData.locationId}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              {Array.isArray(allLocations) &&
                allLocations.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="model"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="warrantyMonths"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Warranty Months
            </label>
            <input
              type="number"
              id="warrantyMonths"
              name="warrantyMonths"
              value={formData.warrantyMonths}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="user"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              User
            </label>
            <select
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="department">Department</option>
              <option value="admin">Admin</option>
              <option value="normal user">Normal User</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="repair">Repair</option>
              <option value="in use">In Use</option>
              <option value="not in use">Not In Use</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dateOfPurchase"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Date of Purchase
            </label>
            <input
              type="date"
              id="dateOfPurchase"
              name="dateOfPurchase"
              value={formData.dateOfPurchase}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          {isLoading ? "Loading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddNewProductScreen;
