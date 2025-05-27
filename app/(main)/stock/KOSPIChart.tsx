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
import UpPrice from "@/components/ui/shared/UpPrice";

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
      borderColor: "#f04251",
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
        gradient.addColorStop(0, "rgba(240, 66, 81, 0.5)");
        gradient.addColorStop(1, "rgba(240, 66, 81, 0)");

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

const KOSPIChart = () => {
  return (
    <div className="flex flex-col gap-main bg-white py-[20px] px-main">
      <div className="flex gap-1 items-end p-main">
        <h2 className="font-bold text-gray-800">KOSPI</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">2,542.90</span>
          <UpPrice change={12.45} changeRate={0.49} />
        </div>
      </div>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KOSPIChart;
