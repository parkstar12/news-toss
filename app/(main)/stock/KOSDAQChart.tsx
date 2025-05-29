"use client";

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
import DownPrice from "@/components/ui/shared/DownPrice";
import UpPrice from "@/components/ui/shared/UpPrice";
import clsx from "clsx";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

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

const KOSDAQChart = ({
  KOSDAQData,
}: {
  KOSDAQData: {
    prev: string; // 전일 종가
    sign: string; // 등락 부호
    prev_rate: string; // 전일 대비 등락률(%)
    indices: {
      bstp_nmix_hgpr: string; // KOSPI 지수(또는 종목)의 장중 최고가
      bstp_nmix_lwpr: string; // KOSPI 지수(또는 종목)의 장중 최저가
      bstp_nmix_prpr: string; // KOSPI 지수(또는 종목)의 종가(마감 가격)
      stck_bsop_date: string; // 기준 일자 (YYYYMMDD, 해당 데이터의 날짜)
    }[];
  };
}) => {
  const labels = KOSDAQData.indices.map((item) => item.stck_bsop_date);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: KOSDAQData.indices.map((item) => Number(item.bstp_nmix_prpr)),
        borderColor:
          KOSDAQData.sign === "1" || KOSDAQData.sign === "2"
            ? "#f04251"
            : KOSDAQData.sign === "4" || KOSDAQData.sign === "5"
            ? "#3485fa"
            : "#3485fa",
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

          if (KOSDAQData.sign === "1" || KOSDAQData.sign === "2") {
            gradient.addColorStop(0, "rgba(240, 66, 81, 0.5)");
            gradient.addColorStop(1, "rgba(240, 66, 81, 0)");
          } else if (KOSDAQData.sign === "4" || KOSDAQData.sign === "5") {
            gradient.addColorStop(0, "rgba(52, 133, 250, 0.5)");
            gradient.addColorStop(1, "rgba(52, 133, 250, 0)");
          }

          return gradient;
        },
        tension: 0.2,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-main bg-white p-main">
      <div
        className={clsx(
          "grid grid-cols-[1fr_auto] items-start gap-1",
          KOSDAQData.sign === "1" || KOSDAQData.sign === "2"
            ? "border-l-4 border-main-red pl-main"
            : KOSDAQData.sign === "4" || KOSDAQData.sign === "5"
            ? "border-l-4 border-main-blue pl-main"
            : "border-l-4 border-main-dark-gray pl-main"
        )}
      >
        <span className="text-sm">KOSDAQ</span>

        <div className="row-span-2 flex flex-col items-center gap-1">
          <span className="text-sm text-gray-500">
            고가 {KOSDAQData.indices[0].bstp_nmix_hgpr}
          </span>
          <span className="text-sm text-gray-500">
            저가 {KOSDAQData.indices[0].bstp_nmix_lwpr}
          </span>
        </div>
        <div className="flex items-center gap-main">
          <span className="text-xl font-semibold">
            {KOSDAQData.indices[0].bstp_nmix_prpr}
          </span>
          {KOSDAQData.sign === "1" ||
            (KOSDAQData.sign === "2" && (
              <UpPrice
                change={(
                  Number(KOSDAQData.indices[0].bstp_nmix_prpr) -
                  Number(KOSDAQData.indices[1].bstp_nmix_prpr)
                ).toFixed(2)}
                changeRate={Number(KOSDAQData.prev_rate)}
              />
            ))}
          {KOSDAQData.sign === "4" ||
            (KOSDAQData.sign === "5" && (
              <DownPrice
                change={(
                  Number(KOSDAQData.indices[0].bstp_nmix_prpr) -
                  Number(KOSDAQData.indices[1].bstp_nmix_prpr)
                ).toFixed(2)}
                changeRate={Number(KOSDAQData.prev_rate)}
              />
            ))}
        </div>
      </div>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KOSDAQChart;
