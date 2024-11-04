"use client";

import React from "react";
import ChartWrapper from "./ChartWrapper";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  DoughnutController,
  BarController,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  BarController,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ChartSession() {
  // session for Doughnut configuration
  const option: ChartOptions<"doughnut"> = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  };

  const dataArr = [20000, 10000, 10000];
  const labelsArr = ["Completed", "Ongoing", "Cancelled"];
  const formattedLabels = labelsArr.map(
    (label, index) => `${label} (${dataArr[index]})`
  );
  const data: ChartData<"doughnut"> = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Transaction overview",
        data: dataArr,
        backgroundColor: ["#86198F", "#E879F9", "#FAE8FF"],
        borderWidth: 0,
      },
    ],
  };

  // session for Bar configuration
  const barChartData = [7000, 9500, 5000, 8000, 6500, 9000, 8500, 8300, 8200];
  const barLabels = [
    "02 Aug",
    "04 Aug",
    "08 Aug",
    "16 Aug",
    "19 Aug",
    "25 Aug",
    "27 Aug",
    "28 Aug",
    "31 Aug",
  ];
  const barData: ChartData<"bar"> = {
    labels: barLabels,
    datasets: [
      {
        label: "",
        data: barChartData,
        backgroundColor: "#f0abfc",
        barPercentage: 0.5,
        borderRadius: 5,
      },
    ],
  };

  const BarOption: ChartOptions<"bar"> = {
    responsive: true,
    // aspectRatio: 1,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        // position: "left",
        // align: "center",
        // labels: {
        //   usePointStyle: true,
        //   pointStyle: "circle",
        //   boxWidth: 50,
        // },
      },
    },
    scales: {
      x: {},

      y: {
        ticks: {
          callback: (value) => `${Number(value) / 1000} k`,
        },
      },
    },
  };
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="col-span-1">
        <ChartWrapper
          exclaimTitle="Transaction summary"
          heading="Transaction overview"
        >
          <div className="w-full">
            <Doughnut data={data} options={option} />
          </div>
        </ChartWrapper>
      </div>

      <div className="col-span-2 h-full">
        <ChartWrapper
          exclaimTitle="Transaction distribution summary"
          heading="Transaction distribution"
        >
          <div className="flex items-center justify-end">
            <select name="" id="" className="border rounded-md p-2">
              <option value="last_month">Last month</option>
              <option value="this_month">This month</option>
            </select>
          </div>
          <div className="w-full">
            <Bar data={barData} options={BarOption} />
          </div>
        </ChartWrapper>
      </div>
    </div>
  );
}
