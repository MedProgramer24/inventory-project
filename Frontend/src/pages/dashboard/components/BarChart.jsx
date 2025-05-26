import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: data.title || "Dataset",
        data: data.data || [],
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
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

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
