"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value = 70 }: { value: number }) => {
  const ref = useRef<any>(null);

  const data: ChartData<"doughnut"> = {
    labels: ["공격투자형", "적극투자형", "위험중립형", "안정추구형", "안전형"],
    datasets: [
      {
        data: [20, 20, 20, 20, 20], // 총 100 맞추기
        backgroundColor: [
          "#ff6666", // 공격투자형
          "#ff9966", // 적극투자형
          "#ffff66", // 위험중립형
          "#66ff66", // 안정추구형
          "#66b3ff", // 안전형
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        borderAlign: "center", // 내부 중심선 기준
        spacing: 10, // 조각 간 간격
        borderRadius: 5, // 둥근 모서리
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            return `${context.label}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;

    const needle = {
      id: "needle",
      afterDatasetDraw(chart: any) {
        const {
          ctx,
          chartArea: { top, left, width, height },
        } = chart;

        const angle = (Math.PI * value) / 100;
        const cx = left + width / 2;
        const cy = top + height / 1.1; // 반원 기준 중심
        const radius = height * 0.5;

        const dx = radius * Math.cos(angle + Math.PI);
        const dy = radius * Math.sin(angle + Math.PI);

        const baseWidth = 5; // 바늘 중심쪽 두께
        const backOffset = 3; // 뒤쪽 삼각형 길이

        // 바늘 삼각형 좌표 계산
        const baseAngle = angle + Math.PI / 2;

        const x1 = -baseWidth * Math.cos(baseAngle);
        const y1 = -baseWidth * Math.sin(baseAngle);

        const x2 = baseWidth * Math.cos(baseAngle);
        const y2 = baseWidth * Math.sin(baseAngle);

        const tipX = dx;
        const tipY = dy;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = "#707070";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(tipX, tipY);
        ctx.closePath();
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.fill();
        ctx.restore();

        // 바늘 중심에 동그란 중심점 추가 (원형 마감 처리)
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#707070";
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      },
    };

    if (!chart.config.plugins) chart.config.plugins = [];
    chart.config.plugins.push(needle);
    chart.update();
  }, [value]);

  return (
    <div className="size-full flex flex-col gap-main">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
          내 투자성향
        </h2>

        <button className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1">
          <span>투자성향 변경</span>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="w-full flex justify-center items-center flex-1">
        <Doughnut ref={ref} data={data} options={options} className="w-full" />
      </div>
    </div>
  );
};

export default GaugeChart;
