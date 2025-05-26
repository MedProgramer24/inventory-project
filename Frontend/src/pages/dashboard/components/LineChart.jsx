import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: data.title || "Dataset",
        data: data.data || [],
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        pointBackgroundColor: "#3B82F6",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#4B5563",
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#fff",
        bodyColor: "#E5E7EB",
      },
    },
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
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
