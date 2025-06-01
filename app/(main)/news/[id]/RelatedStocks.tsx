"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface Stock {
  stockName: string;
  stockCode: string;
  currentPrice: string;
  sign: string; // 1:상승, 2:하락, 3:보합 등
  changeAmount: string;
  changeRate: string;
}

const getSignInfo = (sign: string) => {
  if (sign === "1" || sign === "5") {
    return {
      color: "text-red-500",
      icon: <ArrowUp className="inline w-4 h-4" />,
    };
  }
  if (sign === "2" || sign === "6") {
    return {
      color: "text-blue-500",
      icon: <ArrowDown className="inline w-4 h-4" />,
    };
  }
  return { color: "text-gray-500", icon: <Minus className="inline w-4 h-4" /> };
};

const RelatedStocks = ({ stockNames }: { stockNames: string[] }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      for (const stockName of stockNames) {
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
        setStocks((prev) => [...prev, data.data[0]]);
      }
    };

    if (stockNames.length > 0) {
      fetchStocks();
    }
  }, [stockNames]);

  console.log("stocks", stocks);

  if (stockNames.length === 0) return <div>관련 종목 없음</div>;

  return (
    <div>
      {stockNames.map((stockName) => (
        <div key={stockName}>
          <p>{stockName}</p>
        </div>
      ))}
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
