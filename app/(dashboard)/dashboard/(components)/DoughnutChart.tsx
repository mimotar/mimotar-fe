"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  DoughnutController,
  PointElement,
} from "chart.js";
import { AiOutlineExclamationCircle } from "react-icons/ai";
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function DoughnutChart() {
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
  return (
    <div className="w-full flex flex-col rounded-md border p-2 space-y-3">
      <div className="inline-flex gap-2  items-center">
        <h1 className="text-sm font-semibold">Transaction overview</h1>
        <AiOutlineExclamationCircle
          title="Transaction summary"
          className="cursor-pointer"
        />
      </div>
      <hr />

      <div className="w-full">
        <Doughnut data={data} options={option} />
      </div>
    </div>
  );
}
