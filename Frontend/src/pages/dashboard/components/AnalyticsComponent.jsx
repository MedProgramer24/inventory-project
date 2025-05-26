import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import { SERVER_URL } from "../../../router";

const AnalyticsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/v1/analytics/`);
        console.log("Analytics API response:", data);

        if (data && data.useby && data.expiry && data.status) {
          setAnalyticsData(data);
        } else {
          setError("Incomplete analytics data from API.");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center text-gray-500">
        No analytics data available.
      </div>
    );
  }

  // Chart config (reuse)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4B5563",
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#E5E7EB",
        borderColor: "#3B82F6",
        borderWidth: 1,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Use By Pie Chart */}
      <ChartCard colSpan="1" title={analyticsData.useby?.title}>
        <Pie
          data={{
            labels: analyticsData.useby?.labels || [],
            datasets: [
              {
                data: analyticsData.useby?.data || [],
                backgroundColor: ["#10B981", "#F59E0B", "#3B82F6", "#EF4444"],
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          }}
          options={chartOptions}
        />
      </ChartCard>

      {/* Expiry Bar Chart */}
      <ChartCard colSpan="2" title={analyticsData.expiry?.title}>
        <Bar
          data={{
            labels: analyticsData.expiry?.labels || [],
            datasets: [
              {
                label: analyticsData.expiry?.title,
                data: analyticsData.expiry?.data || [],
                backgroundColor: "#3B82F6",
                borderRadius: 6,
                barThickness: 30,
              },
            ],
          }}
          options={{
            ...chartOptions,
            plugins: { ...chartOptions.plugins, legend: { display: false } },
            scales: {
              x: {
                ticks: { color: "#6B7280" },
                grid: { display: false },
              },
              y: {
                ticks: { color: "#6B7280" },
                grid: { color: "#E5E7EB" },
              },
            },
          }}
        />
      </ChartCard>

      {/* Status Bar Chart */}
      <ChartCard colSpan="2" title={analyticsData.status?.title}>
        <Bar
          data={{
            labels: analyticsData.status?.labels || [],
            datasets: [
              {
                label: analyticsData.status?.title,
                data: analyticsData.status?.data || [],
                backgroundColor: ["#EF4444", "#F59E0B", "#3B82F6"],
                borderRadius: 6,
                barThickness: 30,
              },
            ],
          }}
          options={{
            ...chartOptions,
            plugins: { ...chartOptions.plugins, legend: { display: false } },
            scales: {
              x: {
                ticks: { color: "#6B7280" },
                grid: { display: false },
              },
              y: {
                ticks: { color: "#6B7280" },
                grid: { color: "#E5E7EB" },
              },
            },
          }}
        />
      </ChartCard>
    </div>
  );
};

const ChartCard = ({ title, colSpan = "1", children }) => (
  <div className={`col-span-${colSpan} bg-white rounded-2xl shadow-lg p-6`}>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title || "Untitled Chart"}</h2>
    {children}
  </div>
);

export default AnalyticsComponent;
