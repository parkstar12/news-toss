"use client";

import DownPrice from "@/components/ui/shared/DownPrice";
import UpPrice from "@/components/ui/shared/UpPrice";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Stock {
  stockName: string;
  stockCode: string;
  currentPrice: string;
  sign: string; // 1:상승, 2:하락, 3:보합 등
  changeAmount: string;
  changeRate: string;
}

const RelatedStocks = ({ stockNames }: { stockNames: string[] }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const results = await Promise.all(
        stockNames.map(async (stockName) => {
          const response = await fetch(
            `/api/v1/stocks/search?keyword=${stockName}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          return data.data[0];
        })
      );
      setStocks(results);
    };

    if (stockNames.length > 0) {
      fetchStocks();
    }
  }, [stockNames]);

  console.log("stocks", stocks);
  console.log("stockNames", stockNames);

  if (stocks.length === 0)
    return (
      <div className="flex flex-col gap-main">
        <h2 className="text-lg font-semibold">관련 종목</h2>

        <span className="text-gray-500">관련 종목이 없습니다.</span>
      </div>
    );

  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-lg font-semibold">관련 종목</h2>

      <div className="grid grid-cols-2 gap-x-main">
        {stocks.map((stock) => (
          <Link
            href={`/stock/${stock.stockCode}`}
            className="flex gap-main w-full hover:bg-main-blue/10 transition-all duration-300 p-main rounded-main relative group"
            key={`news-related-stock-${stock.stockCode}`}
          >
            <ChevronRight
              className="hidden group-hover:block text-main-blue absolute top-1/2 -translate-y-1/2 right-main"
              size={20}
            />
            <div className="relative flex items-center justify-center">
              <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
                <span className="text-main-blue font-semibold">
                  {stock.stockName[0]}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 truncate">
              <span className="font-bold text-gray-800 truncate w-full">
                {stock.stockName}
              </span>
              <div className="text-sm flex gap-main items-center">
                <span className="text-gray-500">{stock.stockCode}</span>
                <div className="flex justify-between h-fit">
                  {(stock.sign === "1" || stock.sign === "2") && (
                    <UpPrice
                      change={Number(stock.changeAmount)}
                      changeRate={Number(stock.changeRate)}
                    />
                  )}
                  {stock.sign === "3" && (
                    <span className="text-gray-400 font-medium">
                      {Number(stock.changeAmount)} ({Number(stock.changeRate)}%)
                    </span>
                  )}
                  {(stock.sign === "4" || stock.sign === "5") && (
                    <DownPrice
                      change={Number(stock.changeAmount)}
                      changeRate={Number(stock.changeRate)}
                    />
                  )}
                </div>
              </div>
            </div>

            <ChevronRight
              className="hidden group-hover:block text-main-blue absolute top-1/2 -translate-y-1/2 right-main"
              size={20}
            />
          </Link>
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="overflow-x-auto">
  //     <table className="min-w-full border text-sm">
  //       <thead>
  //         <tr className="bg-gray-100">
  //           <th className="px-3 py-2 border">종목명</th>
  //           <th className="px-3 py-2 border">코드</th>
  //           <th className="px-3 py-2 border">현재가</th>
  //           <th className="px-3 py-2 border">전일대비</th>
  //           <th className="px-3 py-2 border">등락률</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {stocks.map((stock) => {
  //           const { color, icon } = getSignInfo(stock.sign);
  //           return (
  //             <tr key={stock.stockCode} className="text-center">
  //               <td className="px-3 py-2 border font-semibold">
  //                 {stock.stockName}
  //               </td>
  //               <td className="px-3 py-2 border">{stock.stockCode}</td>
  //               <td className="px-3 py-2 border">
  //                 {Number(stock.currentPrice).toLocaleString()}
  //               </td>
  //               <td className={`px-3 py-2 border font-semibold ${color}`}>
  //                 {icon} {Number(stock.changeAmount).toLocaleString()}
  //               </td>
  //               <td className={`px-3 py-2 border ${color}`}>
  //                 {stock.changeRate}%
  //               </td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default RelatedStocks;
