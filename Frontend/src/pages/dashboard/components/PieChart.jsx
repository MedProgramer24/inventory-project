import { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Pie
      ref={chartRef}
      data={{
        labels: data.labels, // Use labels here, must be array of strings
        datasets: [
          {
            label: data.title || "Dataset", // dataset label, a string
            data: data.data, // array of numbers
            backgroundColor: data.backgroundColor || [], // optional colors
          },
        ],
      }}
    />
  );
};

export default PieChart;
