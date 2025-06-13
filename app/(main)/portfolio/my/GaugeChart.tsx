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
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { driver } from "driver.js";
import InvestmentStyleModal from "./InvestmentStyleModal";
import { JwtToken } from "@/type/jwt";
import { usePortfolioStore } from "@/store/usePortfolio";

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({
  value = 70,
  token,
}: {
  value: number;
  token: JwtToken | null;
}) => {
  const ref = useRef<any>(null);
  const [isOpenInvestmentStyleModal, setIsOpenInvestmentStyleModal] =
    useState(false);
  const { portfolio } = usePortfolioStore();

  const dummyData: ChartData<"doughnut"> = {
    labels: ["공격투자형", "적극투자형", "위험중립형", "안정추구형", "안전형"],
    datasets: [
      {
        data: [20, 20, 20, 20, 20], // 총 100 맞추기
        backgroundColor: [
          "rgba(255, 99, 132, 0.25)",
          "rgba(54, 162, 235, 0.25)",
          "rgba(255, 206, 86, 0.25)",
          "rgba(75, 192, 192, 0.25)",
          "rgba(153, 102, 255, 0.25)",
          "rgba(255, 159, 64, 0.25)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0.2,
        borderAlign: "center", // 내부 중심선 기준
        // spacing: 10, // 조각 간 간격
        // borderRadius: 5, // 둥근 모서리
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
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
        const cy = top + height / 1.3; // 반원 기준 중심
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

  useEffect(() => {
    if (!token) return;
    if (!portfolio) return;

    const steps = [];

    if (token.invest === 0) {
      steps.push({
        element: "#investment-style",
        popover: {
          title: "투자성향 설정",
          description: "설문을 통해 본인의 투자성향을 설정해주세요",
        },
      });
    }

    if (portfolio.length === 0) {
      steps.push({
        element: "#add-holding",
        popover: {
          title: "보유 종목 추가",
          description: "갖고 계신 보유 종목을 추가해주세요",
        },
      });
    }

    const driverObj = driver({
      showProgress: true,
      steps,
      stagePadding: 5,
      allowClose: false,
      nextBtnText: "다음",
      prevBtnText: "이전",
      doneBtnText: "완료",
    });

    driverObj.drive();

    return () => driverObj.destroy();
  }, [portfolio, token]);

  if (token && token.invest === 0)
    return (
      <>
        <div className="size-full flex flex-col gap-main">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
              내 투자성향
            </h2>

            <button
              id="investment-style"
              className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
              onClick={() => setIsOpenInvestmentStyleModal(true)}
            >
              <span>투자성향 변경</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-white/50 z-20 size-full flex items-center justify-center">
              <span className="text-main-dark-gray font-semibold">
                투자성향을 설정해주세요.
              </span>
            </div>

            <div className="blur-xs h-full ">
              <div className="w-full h-full flex justify-center items-center flex-1 relative">
                <Doughnut
                  // ref={ref}
                  data={dummyData}
                  options={options}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <InvestmentStyleModal
          isOpen={isOpenInvestmentStyleModal}
          onClose={() => setIsOpenInvestmentStyleModal(false)}
        />
      </>
    );

  return (
    <>
      <div className="size-full flex flex-col gap-main">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
            내 투자성향
          </h2>

          <button
            id="investment-style"
            className="text-sm text-main-dark-gray hover:text-main-blue hover:bg-main-blue/10 transition-all duration-300 rounded-main pl-2 pr-1 py-1 flex items-center gap-1"
            onClick={() => setIsOpenInvestmentStyleModal(true)}
          >
            <span>투자성향 변경</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="w-full flex justify-center items-center flex-1">
          <Doughnut
            ref={ref}
            data={dummyData}
            options={options}
            className="w-full"
          />
        </div>
      </div>
      <InvestmentStyleModal
        isOpen={isOpenInvestmentStyleModal}
        onClose={() => setIsOpenInvestmentStyleModal(false)}
      />
    </>
  );
};

export default GaugeChart;
