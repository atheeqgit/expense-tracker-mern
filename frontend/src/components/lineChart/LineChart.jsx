import React from "react";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { recent, dateFormat, incomes, expense, chartData } =
    useGlobalContext();

  const data = {
    labels: chartData.map((item) => {
      return item.date;
    }),
    datasets: [
      {
        label: "Expenses",
        data: chartData.map((item) => {
          return item.expense;
        }),
        backgroundColor: "red",
        borderColor: "rgb(255, 109, 109)",

        tension: 0.5,
      },
    ],
  };
  const data2 = {
    labels: chartData.map((item) => {
      return item.date;
    }),
    datasets: [
      {
        label: "Incomes",
        data: chartData.map((item) => {
          return item.income;
        }),
        backgroundColor: "green",
        borderColor: "rgb(84 255 98)",

        tension: 0.5,
      },
    ],
  };

  return (
    <div className="chart-box">
      <div className="charts">
        <div className="chart">
          <Line data={data} />
        </div>
      </div>
      <div className="charts">
        <div className="chart">
          <Line data={data2} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
