// "use client";

// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ScriptableContext,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// import { MetaData, News } from "@/type/news";
// import React, { useRef, useState } from "react";
// import {
//   BarChart2,
//   TrendingUp,
//   Layers,
//   ClipboardPen,
//   Info,
// } from "lucide-react";
// import { StockSearchResult } from "@/type/stocks/StockSearchResult";
// import Image from "next/image";
// import DownPrice from "@/components/ui/shared/DownPrice";
// import UpPrice from "@/components/ui/shared/UpPrice";
// import Link from "next/link";
// import { StockData } from "@/type/stocks/stockData";
// import TooltipUI from "@/components/ui/Tooltip";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// const MetaDataNews = ({
//   // metaData,
//   stockList,
//   mainStockList,
//   mainStockChartList,
//   relatedNews,
// }: {
//   // metaData: MetaData;
//   stockList: StockSearchResult[];
//   mainStockList: StockSearchResult[];
//   mainStockChartList: { stockCode: string; data: StockData[] }[];
//   relatedNews: News[];
// }) => {
//   const [selectedNews, setSelectedNews] = useState<News | null>(null);
//   const chartRef = useRef<ChartJS<"line">>(null);

//   const newsDateMap = new Map(
//     relatedNews.map((news) => [
//       news.wdate?.slice(0, 10),
//       news,
//     ])
//   );

//   const getChartData = (code: string) => {
//     const stock = mainStockChartList.find((d) => d.stockCode === code);

//     const chartData = {
//       labels: stock?.data.map((d) => d.stck_bsop_date),
//       datasets: [
//         {
//           label: `종목 ${code}`,
//           data: stock?.data.map((d) => d.stck_clpr),
//           fill: false,
//           borderWidth: 2,
//           tension: 0,
//           backgroundColor: (context: ScriptableContext<"line">) => {
//             const chart = context.chart;
//             const { ctx, chartArea } = chart;

//             if (!chartArea) return;

//             const gradient = ctx.createLinearGradient(
//               0,
//               chartArea.top,
//               0,
//               chartArea.bottom
//             );

//             gradient.addColorStop(0, "rgba(240, 66, 81, 0.5)");
//             gradient.addColorStop(1, "rgba(240, 66, 81, 0)");

//             return gradient;
//           },
//           pointRadius: 0,

//           pointHoverRadius: 0,
//         },
//         {
//           label: "뉴스",
//           data: stock?.data.map((d) => newsDateMap.has(d.stck_bsop_date) ? d.stck_clpr : null), // 뉴스 있는 날만 점 찍힘
//           pointBackgroundColor: "orange",
//           pointRadius: 5,
//           pointHoverRadius: 8,
//           type: "line",
//           fill: false,
//           borderWidth: 0,
//         }
//       ],
//     };
//     return chartData;
//   };

//   const handleChartClick = (event: any, elements: any, chart: ChartJS) => {
//     if (!elements.length) return;
//     const index = elements[0].index;
//     const date = chart.data.labels?.[index] as string;
//     const news = newsDateMap.get(date);
//     if (news) {
//       setSelectedNews(news); // useState로 뉴스 상태 저장
//     }
//   };

//   const options: ChartOptions<"line"> = {
//     responsive: true,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         offset: true,
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           callback: (tickValue: string | number) =>
//             Number(tickValue).toLocaleString() + "원",
//         },
//       },
//     },
//   };

//   const verticalLinePlugin = {
//     id: "verticalLine",
//     afterDraw(chart: ChartJS) {
//       const activeElements = chart.tooltip?.getActiveElements?.();
//       if (activeElements && activeElements.length > 0) {
//         const ctx = chart.ctx;
//         const x = activeElements[0].element.x;
//         const topY = chart.scales.y.top;
//         const bottomY = chart.scales.y.bottom;

//         ctx.save();
//         ctx.beginPath();
//         ctx.setLineDash([4, 4]);
//         ctx.moveTo(x, topY);
//         ctx.lineTo(x, bottomY);
//         ctx.lineWidth = 1;
//         ctx.strokeStyle = "rgba(0,0,0,0.3)";
//         ctx.stroke();
//         ctx.setLineDash([]);
//         ctx.restore();
//       }
//     },
//   };

//   return (
//     <div className="w-full flex flex-col gap-main">
//       <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
//         주가 경향성 및 과거 유사뉴스
//       </h2>

//       {mainStockList &&
//         mainStockList.map((stock) => (
//           <div key={stock.stockCode}>
//             <div className="flex items-center gap-2">
//               <div className="relative flex items-center justify-center size-[30px] shrink-0">
//                 {stock.stockImage ? (
//                   <Image
//                     src={stock.stockImage}
//                     alt={stock.stockName}
//                     fill
//                     className="rounded-full"
//                     sizes="30px"
//                   />
//                 ) : (
//                   <div className="bg-main-blue/10 rounded-full size-[30px] shrink-0 flex items-center justify-center">
//                     <span className="text-main-blue font-semibold">
//                       {stock.stockName[0]}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <span className="text-lg font-bold">
//                 {stock.stockName} 주가 경향성
//               </span>

//               <TooltipUI
//                 position="right"
//                 message={`${stock.stockName}의 과거 유사사건 뉴스 시점의 주가 경향성을 제공해드렸어요.`}
//                 icon={<Info size={14} />}
//               />
//             </div>

//             <Line
//               data={getChartData(stock.stockCode.toString())}
//               options={options}
//               plugins={[verticalLinePlugin]}
//               onClick={(e) => {
//                 const elements = chartRef.current?.getElementsAtEventForMode(
//                   e,
//                   "nearest",
//                   { intersect: true },
//                   true
//                 );
//                 handleChartClick(e, elements, chartRef.current as ChartJS<"line">);
//               }}
//               ref={chartRef}
//             />
//           </div>
//         ))}
//       {/* <div className="grid grid-cols-[1fr_1px_1fr] gap-main">
//         <div className="grid grid-rows-[1fr_1px_1fr] gap-main">

//           {stockList && stockList.length > 0 && (
//             <div className="flex flex-col gap-main">
//               <span className="flex items-center gap-main">
//                 <TrendingUp size={18} />
//                 <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
//                   관련 종목
//                 </span>
//               </span>
//               <div className="flex gap-2 flex-wrap">
//                 {stockList.map((stock) => (
//                   <Link
//                     href={`/stocks/${stock.stockCode}`}
//                     key={stock.stockCode}
//                     className="text-main-blue px-3 py-2 text-xs font-semibold rounded-main flex items-center gap-2 hover:bg-main-blue/10 transition-all duration-200 ease-in-out"
//                   >
//                     <div className="relative flex items-center justify-center size-[30px] shrink-0">
//                       {stock.stockImage ? (
//                         <Image
//                           src={stock.stockImage}
//                           alt={stock.stockName}
//                           fill
//                           className="rounded-full"
//                           sizes="30px"
//                         />
//                       ) : (
//                         <div className="bg-main-blue/10 rounded-full size-[30px] shrink-0 flex items-center justify-center">
//                           <span className="text-main-blue font-semibold">
//                             {stock.stockName[0]}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <p className="text-sm text-main-dark-gray flex items-baseline gap-1">
//                         <span className="font-semibold">{stock.stockName}</span>
//                         <span className="text-xs">{stock.stockCode}</span>
//                       </p>

//                       <div className="flex justify-between h-fit">
//                         {(stock.sign === "1" || stock.sign === "2") && (
//                           <UpPrice
//                             change={Number(stock.changeAmount)}
//                             changeRate={Number(stock.changeRate)}
//                           />
//                         )}
//                         {stock.sign === "3" && (
//                           <span className="text-gray-400 font-medium">
//                             {Number(stock.changeAmount)} (
//                             {Number(stock.changeRate)}%)
//                           </span>
//                         )}
//                         {(stock.sign === "4" || stock.sign === "5") && (
//                           <DownPrice
//                             change={Number(stock.changeAmount)}
//                             changeRate={Number(stock.changeRate)}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="bg-main-light-gray w-full" />

//           <div className="grid grid-cols-[1fr_1px_1fr] gap-main">

//             {metaData.impactScore && (
//               <div className="flex flex-col justify-between gap-main">
//                 <p className="flex items-center gap-main">
//                   <BarChart2 size={18} />
//                   <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
//                     뉴스 영향력
//                   </span>
//                 </p>
//                 <p className="flex-1 flex text-2xl font-bold items-center justify-center">
//                   <span className="bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent">
//                     {(metaData.impactScore * 100).toFixed(1)}%
//                   </span>
//                 </p>
//               </div>
//             )}

//             <div className="bg-main-light-gray h-full" />

//             {metaData.industryList && metaData.industryList.length > 0 && (
//               <div className="flex flex-col gap-main">
//                 <p className="flex items-center gap-main">
//                   <Layers size={18} />
//                   <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
//                     관련 산업군
//                   </span>
//                 </p>

//                 <div className="flex gap-2 flex-wrap">
//                   {metaData.industryList.map((industry) => (
//                     <div
//                       key={`industry-${industry.industry_id}`}
//                       className="bg-main-blue/5 text-main-dark-gray px-3 py-1 text-xs font-semibold rounded-full"
//                     >
//                       {industry.industry_name}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default MetaDataNews;

"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Info } from "lucide-react";
import { StockSearchResult } from "@/type/stocks/StockSearchResult";
import { StockData } from "@/type/stocks/stockData";
import { News } from "@/type/news";
import React, { useEffect, useRef, useState } from "react";
import TooltipUI from "@/components/ui/Tooltip";
import Image from "next/image";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface MetaDataNewsProps {
  stockList: StockSearchResult[];
  mainStockList: StockSearchResult[];
  mainStockChartList: { stockCode: string; data: StockData[] }[];
  relatedNews: News[];
}

const MetaDataNews = ({
  stockList,
  mainStockList,
  mainStockChartList,
  relatedNews,
}: MetaDataNewsProps) => {
  const [selectedNews, setSelectedNews] = useState<News[]>([]);
  const chartRefs = useRef<Record<string, ChartJS<"line"> | null>>({});

  const toDateFormat = (raw: string) =>
    `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;

  // 뉴스 날짜 → 뉴스 배열
  const newsDateMap = new Map<string, News[]>();
  relatedNews.forEach((news) => {
    const date = news.wdate?.slice(0, 10);
    if (!date) return;
    if (!newsDateMap.has(date)) {
      newsDateMap.set(date, []);
    }
    newsDateMap.get(date)!.push(news);
  });

  useEffect(() => {
    console.log("✅ 뉴스 날짜 목록", Array.from(newsDateMap.keys()));
    console.log(
      "✅ 주가 날짜 목록",
      mainStockChartList
        .flatMap((s) => s.data.map((d) => toDateFormat(d.stck_bsop_date)))
        .filter((v, i, arr) => arr.indexOf(v) === i) // 중복 제거
    );
  }, []);

  const getChartData = (code: string) => {
    const stock = mainStockChartList.find((d) => d.stockCode === code);

    const sortedData = [...stock!.data].sort(
      (a, b) => Number(a.stck_bsop_date) - Number(b.stck_bsop_date)
    );

    return {
      labels: stock?.data.map((d) => toDateFormat(d.stck_bsop_date)),
      datasets: [
        {
          label: `종목 ${code}`,
          data: sortedData.map((d) => Number(d.stck_clpr)),
          fill: false,
          borderWidth: 2,
          tension: 0,
          borderColor: "rgba(240, 66, 81, 0.5)",
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
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        // {
        //   label: "뉴스 마커",
        //   order: 1,
        //   data: stock?.data.map((d) =>
        //     newsDateMap.has(toDateFormat(d.stck_bsop_date))
        //       ? Number(d.stck_clpr)
        //       : null
        //   ),
        //   // data: stock?.data.map((d, i) =>
        //   //   i % 5 === 0 ? Number(d.stck_clpr) : null
        //   // ),
        //   pointBackgroundColor: "orange",
        //   pointRadius: 5,
        //   pointHoverRadius: 8,
        //   borderWidth: 0,
        //   fill: false,
        //   showLine: false,
        // },
      ],
    };
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        offset: true,
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: {
          callback: (value) => `${Number(value).toLocaleString()}원`,
        },
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

  const handleChartClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
    stockCode: string
  ) => {
    const chart = chartRefs.current[stockCode];
    if (!chart) return;
    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );
    if (!elements.length) return;

    const index = elements[0].index;
    const label = chart.data.labels?.[index] as string;
    const news = newsDateMap.get(label);
    if (news) {
      setSelectedNews(news);
    } else {
      setSelectedNews([]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-main">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
        주가 경향성 및 과거 유사뉴스
      </h2>

      {mainStockList.map((stock) => (
        <div key={stock.stockCode} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex items-center justify-center size-[30px] shrink-0">
              {stock.stockImage ? (
                <Image
                  src={stock.stockImage}
                  alt={stock.stockName}
                  fill
                  className="rounded-full"
                  sizes="30px"
                />
              ) : (
                <div className="bg-main-blue/10 rounded-full size-[30px] flex items-center justify-center">
                  <span className="text-main-blue font-semibold">
                    {stock.stockName[0]}
                  </span>
                </div>
              )}
            </div>
            <span className="text-lg font-bold">
              {stock.stockName} 주가 경향성
            </span>
            <TooltipUI
              position="right"
              message={`${stock.stockName}의 과거 유사사건 뉴스 시점의 주가 경향성을 제공해드렸어요.`}
              icon={<Info size={14} />}
            />
          </div>

          <Line
            data={getChartData(stock.stockCode)}
            options={options}
            onClick={(e) => handleChartClick(e, stock.stockCode)}
            ref={(ref) =>
              (chartRefs.current[stock.stockCode] = ref as ChartJS<"line">)
            }
            plugins={[verticalLinePlugin]}
          />
        </div>
      ))}

      {selectedNews.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-main-dark-gray">
            관련 뉴스
          </h3>
          {selectedNews.map((news) => (
            <div key={news.newsId} className="border-t pt-3">
              <p className="font-bold">{news.title}</p>
              <p className="text-sm text-gray-500">{news.wdate}</p>
              {news.image && (
                <img
                  src={news.image}
                  alt="뉴스 이미지"
                  className="max-w-md mt-2 rounded"
                />
              )}
              <p className="mt-2 text-sm">{news.article}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-1 block text-sm"
              >
                원문 보기
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetaDataNews;
