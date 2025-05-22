"use client";

import { Triangle } from "lucide-react";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  ScriptableContext,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const labels = Array.from({ length: 50 }, (_, i) => i);
const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: labels.map(() => faker.number.float({ min: 1500, max: 2000 })),
      borderColor: "#3485fa",
      backgroundColor: (context: ScriptableContext<"line">) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom
        );
        gradient.addColorStop(0, "rgba(52, 133, 250, 0.5)");
        gradient.addColorStop(1, "rgba(52, 133, 250, 0)");

        return gradient;
      },
      tension: 0.2,
      pointRadius: 0,
      borderWidth: 2,
      pointHoverRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false, // X축 비활성화
    },
    y: {
      display: false, // Y축 비활성화
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
  },
};

const KOSDAQChart = () => {
  return (
    <div className="flex flex-col gap-main bg-white rounded-main shadow-color p-main">
      <div className="flex justify-between items-center p-main">
        <h2 className="text-xl font-bold text-gray-800">코스닥 지수</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">842.15</span>
          <span className="text-main-blue font-medium flex items-center gap-1">
            <Triangle
              fill="rgb(52, 133, 250)"
              className="text-main-blue rotate-180"
              size={12}
            />{" "}
            5.32 (0.63%)
          </span>
        </div>
      </div>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KOSDAQChart;
