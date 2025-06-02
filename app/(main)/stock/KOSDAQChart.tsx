"use client";

import React, { useEffect, useState } from "react";
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
import { RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";
import { KOSDAQ } from "@/type/stocks/KOSDAQ";

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

const KOSDAQChart = () => {
  const [KOSDAQData, setKOSDAQData] = useState<KOSDAQ | null>(null);

  const fetchKOSDAQ = async () => {
    const endDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const startDateObj = new Date();
    startDateObj.setDate(startDateObj.getDate() - 100);
    const startDate = startDateObj.toISOString().slice(0, 10).replace(/-/g, "");

    try {
      const res = await fetch(
        `/api/v1/stocks/indices/KOSDAQ?startDate=${startDate}&endDate=${endDate}`
      );
      if (!res.ok) setKOSDAQData(null);
      const json = await res.json();
      setKOSDAQData(json.data);
    } catch (e) {
      console.error("❌ KOSDAQ 에러:", e);
    }
  };

  useEffect(() => {
    fetchKOSDAQ();
  }, []);

  const handleRefresh = () => {
    fetchKOSDAQ();
    if (!KOSDAQData) toast.error("데이터를 불러오지 못했습니다.");
  };

  if (!KOSDAQData)
    return (
      <div className="flex flex-col items-center gap-main bg-white p-main text-main-red text-center">
        <span>KOSPI 데이터를 불러오지 못했습니다.</span>
        <button
          className="w-fit text-main-red bg-main-red/10 hover:bg-main-red/20 transition-all duration-300 rounded-main px-main py-1 flex items-center gap-1"
          onClick={handleRefresh}
        >
          <span>다시 시도</span>
          <RefreshCcw size={16} />
        </button>
      </div>
    );

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
