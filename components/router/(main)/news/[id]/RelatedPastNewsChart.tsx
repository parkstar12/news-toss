"use client";

import React, { useRef } from "react";
import { getElementAtEvent, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
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

const RelatedPastNewsChart = ({
  news,
  selectedNews,
  setSelectedNews,
}: {
  news: any;
  selectedNews: any;
  setSelectedNews: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);

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
          label: function (context) {
            return news[context.dataIndex]?.title || "";
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Y축 비활성화
        min: 50,
        max: 100,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  // 각 점의 색상/크기 배열 생성
  const pointBackgroundColor = news.map((item: any) =>
    item.newsId === selectedNews ? "#3485fa" : "#fff"
  );
  const pointBorderColor = news.map((item: any) =>
    item.newsId === selectedNews ? "#3485fa" : "#3485fa"
  );
  const pointRadius = news.map((item: any) =>
    item.newsId === selectedNews ? 7 : 5
  );

  const data = {
    labels: news.map((item: any) =>
      new Date(item.date as number).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ),
    datasets: [
      {
        fill: true,
        borderColor: "#3485fa",
        backgroundColor: "transparent",
        label: "뉴스",
        data: news.map((item: any) => item.similarity * 100),
        tension: 0.5,
        pointRadius,
        pointBorderWidth: 2,
        pointBorderColor,
        pointBackgroundColor,
        pointStyle: "circle",
        pointHoverRadius: 7,
      },
    ],
  };

  const handlePointClick = (
    event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    const chart = chartRef.current;
    if (!chart) return;
    const click_result = getElementAtEvent(chart, event);

    if (click_result.length > 0) {
      const dataIndex = click_result[0].index;
      const newsId = news[dataIndex].newsId;
      setSelectedNews(newsId);
    }
  };

  return (
    <Line
      ref={chartRef}
      data={data}
      options={options}
      onClick={handlePointClick}
    />
  );
};

export default RelatedPastNewsChart;
