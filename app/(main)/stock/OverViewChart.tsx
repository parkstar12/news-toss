"use client";

import React, { useEffect, useState } from "react";
import { dummyData } from "./dummyData";
import { Data } from "./type";
import clsx from "clsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { enabled: true },
  },
};

const labels = Array.from({ length: 30 }, (_, i) => i);

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
        gradient.addColorStop(0, "rgba(97, 163, 255, 0.5)");
        gradient.addColorStop(1, "rgba(97, 163, 255, 0)");

        return gradient;
      },
      tension: 0.2,
      pointRadius: 0,
      borderWidth: 2,
      pointHoverRadius: 0,
    },
  ],
};

const OverViewChart = () => {
  const [state, setState] = useState<keyof Data>("외환");
  const [selectedItem, setSelectedItem] = useState<string>(
    Object.keys(dummyData[state])[0]
  );

  useEffect(() => {
    setSelectedItem(Object.keys(dummyData[state])[0]);
  }, [state]);

  return (
    <div className="flex flex-col gap-[20px] rounded-main shadow-color p-[20px] sticky top-0">
      <div className="flex gap-2">
        <button
          className={clsx(
            "font-semibold px-main rounded-main",
            state === "외환" ? "bg-main-blue text-white" : "bg-main-light-gray"
          )}
          onClick={() => setState("외환")}
        >
          외환
        </button>
        <button
          className={clsx(
            "font-semibold px-main rounded-main",
            state === "지수" ? "bg-main-blue text-white" : "bg-main-light-gray"
          )}
          onClick={() => setState("지수")}
        >
          지수
        </button>
        <button
          className={clsx(
            "font-semibold px-main rounded-main",
            state === "원자재"
              ? "bg-main-blue text-white"
              : "bg-main-light-gray"
          )}
          onClick={() => setState("원자재")}
        >
          원자재
        </button>
        <button
          className={clsx(
            "font-semibold px-main rounded-main",
            state === "주식" ? "bg-main-blue text-white" : "bg-main-light-gray"
          )}
          onClick={() => setState("주식")}
        >
          주식
        </button>
      </div>

      <Line options={options} data={data} />

      <table>
        <tbody>
          {Object.keys(dummyData[state]).map((item) => {
            const data = (dummyData[state] as any)[item];
            return (
              <tr
                key={item}
                onClick={() => setSelectedItem(item)}
                className={clsx(selectedItem === item && "bg-main-light-gray")}
              >
                <td className="p-main cursor-pointer rounded-l-main">{item}</td>
                <td className="p-main cursor-pointer">{data.value}</td>
                <td
                  className={clsx(
                    data.change > 0 ? "text-main-red" : "text-main-blue",
                    "p-main cursor-pointer"
                  )}
                >
                  {data.change > 0 ? "+" : ""}
                  {data.change}
                </td>
                <td
                  className={clsx(
                    data.changeRate > 0 ? "text-main-red" : "text-main-blue",
                    "p-main cursor-pointer rounded-r-main"
                  )}
                >
                  {data.changeRate > 0 ? "+" : ""}
                  {data.changeRate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OverViewChart;
