"use client";

import { News } from "@/type/news";
import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, LinkIcon } from "lucide-react";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

const RelatedNews = ({ relatedNews }: { relatedNews: News[] }) => {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const chartRef = useRef<ChartJS<"line">>(null);

  if (!relatedNews) return null;

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const title = relatedNews[index]?.title ?? "제목 없음";

            if (title.length > 15) {
              return title.slice(0, 15) + "...";
            }

            return title;
          },
        },
      },
    },
    scales: {
      x: {
        offset: true,
        title: {
          display: false,
        },
        grid: {
          display: false,
          drawOnChartArea: true,
        },
      },
      y: {
        offset: true,
        title: {
          display: true,
          text: "유사도 (%)",
        },
        grid: {
          display: true,
        },
        min: relatedNews.reduce(
          (min, item) => Math.min(min, item.similarity! * 100),
          100
        ),
        max: relatedNews.reduce(
          (max, item) => Math.max(max, item.similarity! * 100),
          0
        ),
      },
    },
  };

  const verticalLinePlugin = {
    id: "verticalLine",
    afterDraw(chart: ChartJS) {
      const activeElements = chart.tooltip?.getActiveElements?.();
      if (activeElements && activeElements.length > 0) {
        const ctx = chart.ctx;
        const x = activeElements[0].element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    },
  };

  useEffect(() => {
    setSelectedNews(relatedNews[0]);
  }, [relatedNews]);

  const pointBackgroundColor = relatedNews.map((item) =>
    item.newsId === selectedNews?.newsId ? "#3485fa" : "#fff"
  );

  const pointBorderColor = relatedNews.map((item) =>
    item.newsId === selectedNews?.newsId ? "#3485fa" : "#3485fa"
  );

  const pointRadius = relatedNews.map((item) =>
    item.newsId === selectedNews?.newsId ? 5 : 3
  );

  const chartData: ChartData<"line"> = {
    labels: relatedNews.map((item) =>
      new Date(item.wdate!).toLocaleDateString()
    ),
    datasets: [
      {
        label: "유사도 (%)",
        borderColor: "#3485fa",
        backgroundColor: "transparent",
        data: relatedNews.map((item) => item.similarity! * 100), // 퍼센트로
        tension: 0.1,
        pointRadius,
        pointBorderWidth: 1,
        pointBorderColor,
        pointBackgroundColor,
        pointStyle: "circle",
        pointHoverRadius: 5,
      },
    ],
  };

  const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;
    if (!chart) return;

    const points = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: false },
      false
    );

    if (points.length > 0) {
      const index = points[0].index;
      setSelectedNews(relatedNews[index]);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 auto-rows-min gap-main">
      <h2 className="col-span-2 text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
        관련 유사 뉴스
      </h2>

      <div className="size-full">
        <Line
          data={chartData}
          options={chartOptions}
          ref={chartRef}
          onClick={handleChartClick}
          plugins={[verticalLinePlugin]}
        />
      </div>

      {selectedNews && (
        <div className="flex flex-col gap-main rounded-main hover:bg-gradient-to-l hover:from-main-blue/15 hover:to-transparent transition-colors duration-500 group relative">
          <Link
            href={`/news/${selectedNews.newsId}`}
            target="_blank"
            className="absolute top-1/2 -translate-y-1/2 right-main z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1 bg-main-blue text-white rounded-full px-2 py-1"
          >
            <span className="text-sm">상세보기</span>
            <ArrowRightIcon
              size={14}
              className="text-white transition-colors duration-500 animate-bounce-x"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <span className="bg-main-blue/10 text-xs font-semibold text-main-blue py-1 px-main rounded-full w-fit">
              {(Number(selectedNews.similarity) * 100).toFixed(2)}% 유사
            </span>
            <p className="text-lg font-bold line-clamp-2">
              {selectedNews.title}
            </p>
            <p className="text-sm text-main-dark-gray">
              {selectedNews.wdate && formatDate(selectedNews.wdate)} ·{" "}
              {selectedNews.article}
            </p>
          </div>

          <div className="clearfix truncate">
            <div className="relative float-left h-[100px] mr-main mb-main aspect-[3/2] rounded-main">
              <Image
                src={selectedNews.press || "https://placehold.co/600x400"}
                alt={selectedNews.title}
                fill
                className="object-cover rounded-main"
              />
              <div className="absolute top-0 left-0 size-full rounded-main pointer-events-none bg-black/10" />
            </div>
            <p className="text-sm text-main-dark-gray whitespace-pre-line leading-7">
              {selectedNews.image}
            </p>
          </div>

          <Link
            href={selectedNews.url}
            target="_blank"
            className="flex items-center gap-main text-sm"
          >
            <LinkIcon size={14} />
            <span className="text-main-dark-gray underline">
              {selectedNews.url}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RelatedNews;
