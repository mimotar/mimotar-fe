"use client";

import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDateRange, MdOutlineDateRange } from "react-icons/md";

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
import ModalOverlay from "../../commons/ModalOverlay";
import FromToDateSection from "./FromToDateSection";
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
  const [period, setPeriod] = useState("Last month");
  const [isPeriod, setIsPeriod] = useState(false);
  const [toDate, setToDate] = useState<Date | undefined>();
  const [fromDate, setFromDate] = useState<Date | undefined>();

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
    aspectRatio: 1,
    // maintainAspectRatio: true,
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
      y: {
        ticks: {
          callback: (value) => `${Number(value) / 1000} k`,
        },
      },
    },
  };
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-4  space-y-4 mt-6">
      {/* first section */}
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
      {/* second section */}
      <div className="col-span-2 h-full w-full">
        <ChartWrapper
          exclaimTitle="Transaction distribution summary"
          heading="Transaction distribution"
        >
          <div className="flex items-center justify-end ">
            <div
              onClick={() => setIsPeriod(!isPeriod)}
              className="relative cursor-pointer font-medium rounded-md border p-2 inline-flex gap-2 items-center justify-center"
            >
              {period}{" "}
              <RiArrowDropDownLine
                className={`text-2xl ${isPeriod && "rotate-180"}`}
              />
              {isPeriod && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col z-20 absolute right-0 top-12 w-[240px] bg-white text-[#334155] p-2 rounded-md space-y-3 border shadow-md"
                >
                  <span
                    className="font-normal"
                    onClick={() => setPeriod("Last month")}
                  >
                    Last month
                  </span>
                  <span
                    className="font-normal"
                    onClick={() => setPeriod("This month")}
                  >
                    This month
                  </span>
                  <span
                    className="font-normal"
                    onClick={() => setPeriod("Last 7 days")}
                  >
                    Last 7 days
                  </span>
                  <FromToDateSection
                    setFromDate={setFromDate}
                    fromDate={fromDate}
                    setToDate={setToDate}
                    toDate={toDate}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex items-center h-[250px] overflow-auto py-3">
            <h1 className="font-medium -rotate-90">Amount</h1>
            <div className="flex flex-col w-full">
              <Bar data={barData} options={BarOption} />
              <h1 className="font-medium text-center">Period</h1>
            </div>
          </div>
        </ChartWrapper>
      </div>
    </div>
  );
}
