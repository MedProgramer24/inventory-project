import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

import "chart.js/auto";
import { SERVER_URL } from "../../../router";

const AnalyticsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/v1/analytics/`);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-4 flex justify-center items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return <p className="col-span-4 text-center">No analytics data available.</p>;
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-1 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{analyticsData.useby.title}</h2>
        <Pie
          data={{
            labels: analyticsData.useby.labels,
            datasets: [
              {
                data: analyticsData.useby.data,
                backgroundColor: ["#4CAF50", "#FFC107"], // You can uncomment and customize colors
              },
            ],
          }}
        />
      </div>

      <div className="col-span-2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{analyticsData.expiry.title}</h2>
        <Bar
          data={{
            labels: analyticsData.expiry.labels,
            datasets: [
              {
                label: analyticsData.expiry.title,
                data: analyticsData.expiry.data,
                backgroundColor: ["#2196F3", "#F44336"],
              },
            ],
          }}
        />
      </div>

      <div className="col-span-2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{analyticsData.status.title}</h2>
        <Bar
          data={{
            labels: analyticsData.status.labels,
            datasets: [
              {
                label: analyticsData.status.title,
                data: analyticsData.status.data,
                backgroundColor: ["#FF5722", "#FFC107", "#2196F3"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsComponent;
