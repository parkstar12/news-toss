"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { PortfolioData } from "@/type/portfolio";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  ScriptableContext,
  ChartOptions,
  ChartData,
} from "chart.js";
import { faker } from "@faker-js/faker";
import clsx from "clsx";
import { JwtToken } from "@/type/jwt";
import MyProfit from "./MyProfit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const chartTypes = [
  { label: "1일", state: "D" },
  // { label: "1주", state: "W" },
  { label: "1달", state: "M" },
  { label: "1년", state: "Y" },
];

type ChartType = (typeof chartTypes)[number]["state"];

interface Asset {
  todayAsset: number;
  todayPnl: number;
  pnlHistory: {
    id: number;
    memberId: string;
    date: string;
    asset: number;
    pnl: number;
  }[];
  pnlPercent: number;
  periodPnl: number;
}

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          return `${context.parsed.y.toLocaleString()}원`;
        },
      },
    },
  },
  scales: {
    x: {
      display: false, // X축 비활성화
      grid: {
        color: "rgba(0, 0, 0, 0.02)",
      },
    },
    y: {
      display: false, // Y축 비활성화
    },
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      hitRadius: 10,
      hoverRadius: 10,
    },
  },
};

const MyAccountChart = ({ token }: { token: JwtToken | null }) => {
  const [chartType, setChartType] = useState<ChartType>("D");
  const [asset, setAsset] = useState<Asset | null>(null);
  const [dummyData, setDummyData] = useState<ChartData<"line"> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      toast.error("로그인이 필요한 서비스입니다.");
      router.back();
      return;
    }
  }, [token, router]);

  useEffect(() => {
    const labels = Array.from({ length: 50 }, (_, i) => `${i}일`);
    const data = {
      labels,
      datasets: [
        {
          fill: true,
          data: labels.map(() =>
            faker.number.int({ min: 100000, max: 20000000 })
          ),
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
    setDummyData(data);
  }, []);

  useEffect(() => {
    const fetchAsset = async () => {
      if (!token) return null;

      const res = await fetch(
        `/api/v1/portfolios/asset/${token.memberId}?period=${chartType}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.error("Failed to get test", res);
        return null;
      }

      const json = await res.json();

      setAsset(json.data);
      console.log(json.data);
    };

    fetchAsset();
  }, [token, chartType]);

  if (!asset)
    return (
      <div className="relative size-full">
        <div className="absolute inset-0 bg-white/50 z-10 size-full flex items-center justify-center">
          <span className="text-main-dark-gray font-semibold">
            투자 내역이 없습니다.
          </span>
        </div>

        <div className="size-full flex flex-col gap-main blur-xs">
          <div className="grid grid-cols-[auto_1px_1fr] gap-main">
            <div className="flex flex-col gap-main">
              <div className="flex gap-2 items-baseline">
                <span className="text-lg font-semibold">
                  {Number(12801235).toLocaleString()}원
                </span>
              </div>

              <nav className="flex gap-main h-fit self-end">
                {chartTypes.map((type) => (
                  <button
                    key={type.state}
                    className={clsx(
                      "px-[20px] py-2 rounded-main transition-colors",
                      chartType === type.state
                        ? "bg-main-blue/20 text-main-blue"
                        : "hover:bg-main-dark-gray/20 text-main-dark-gray"
                    )}
                    onClick={() => setChartType(type.state)}
                  >
                    {type.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="h-full bg-main-dark-gray/10" />

            <div className="flex gap-main">
              <MyProfit title="당일 손익" profit={null} />
              <MyProfit title="월 누적 손익" profit={null} />
              <MyProfit title="총 누적 손익" profit={null} />
            </div>
          </div>

          <div className="flex-1 w-full max-h-[400px]">
            <Line
              data={
                dummyData ?? {
                  labels: [],
                  datasets: [],
                }
              }
              options={options}
            />
          </div>
        </div>
      </div>
    );

  const labels = asset.pnlHistory.map((p) => p.date);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map((_, i) => asset.pnlHistory[i].asset),
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
        tension: 0.05,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <div className="size-full flex flex-col gap-main">
      <div className="grid grid-cols-[auto_1px_auto] gap-main">
        <div className="flex flex-col gap-main items-start">
          <div className="flex gap-2 items-baseline">
            <span className="text-lg font-semibold">
              {asset.todayAsset.toLocaleString()}원
            </span>
            <span
              className={clsx(
                "text-sm",
                asset.pnlPercent > 0 ? "text-main-red" : "text-main-blue"
              )}
            >
              {chartType === "D" && "어제보다"}
              {chartType === "M" && "지난달보다"}
              {chartType === "Y" && "작년보다"}{" "}
              {asset.pnlPercent > 0 ? "+" : ""}
              {asset.pnlPercent.toFixed(2)}%
            </span>
          </div>

          <nav className="flex gap-main h-fit">
            {chartTypes.map((type) => (
              <button
                key={type.state}
                className={clsx(
                  "px-[20px] py-2 rounded-main transition-colors",
                  chartType === type.state
                    ? "bg-main-blue/20 text-main-blue"
                    : "hover:bg-main-dark-gray/20 text-main-dark-gray"
                )}
                onClick={() => setChartType(type.state)}
              >
                {type.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="h-full bg-main-dark-gray/10" />

        <div className="flex gap-main">
          <MyProfit title="당일 손익" profit={asset.todayPnl} />
          <MyProfit title="월 누적 손익" profit={asset.periodPnl} />
          <MyProfit
            title="총 누적 손익"
            profit={asset.pnlHistory.reduce((acc, curr) => acc + curr.pnl, 0)}
          />
        </div>
      </div>

      <div className="flex-1 size-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MyAccountChart;
