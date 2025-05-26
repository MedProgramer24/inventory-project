import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: data.title || "Dataset",
        data: data.data || [],
        backgroundColor: data.backgroundColor || [
          "#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4B5563",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#fff",
        bodyColor: "#D1D5DB",
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
