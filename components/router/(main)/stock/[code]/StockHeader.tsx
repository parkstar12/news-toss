"use client";

import DownPrice from "@/components/ui/shared/DownPrice";
import UpPrice from "@/components/ui/shared/UpPrice";
import { useRecentViewStore } from "@/store/sidebarStore";
import React, { useEffect, useState } from "react";

const StockHeader = ({ code }: { code: string }) => {
  const [stock, setStock] = useState<{
    changeAmount: string;
    changeRate: string;
    currentPrice: string;
    sign: string;
    stockCode: string;
    stockName: string;
  } | null>(null);
  const { recentViewStocks, setRecentViewStocks, syncFromLocalStorage } =
    useRecentViewStore();

  useEffect(() => {
    syncFromLocalStorage();
    if (recentViewStocks.includes(code)) return;
    setRecentViewStocks([...recentViewStocks, code]);
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      const res = await fetch(`/api/v1/stocks/search?keyword=${code}`);
      const data: {
        data: {
          changeAmount: string;
          changeRate: string;
          currentPrice: string;
          sign: string;
          stockCode: string;
          stockName: string;
        }[];
      } = await res.json();
      setStock(data.data[0]);
    };
    fetchStockData();
  }, []);

  if (!stock) return null;

  return (
    // <div>
    //   <div className="flex items-center gap-2 w-full">
    //     <div className="flex flex-col flex-1 truncate text-sm">
    //       <div className="relative">
    //         <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
    //           <span className="text-main-blue font-semibold">
    //             {stock.stockName[0]}
    //           </span>
    //         </div>
    //       </div>
    //       <p className="flex items-center gap-main text-gray-800 truncate w-full">
    //         <span className="font-bold">{stock.stockName}</span>
    //         <span className="text-gray-400">{stock.stockCode}</span>
    //       </p>
    //       <div className="flex items-center gap-main">
    //         <span className="text-main-dark-gray">
    //           {Number(stock.currentPrice).toLocaleString()}원
    //         </span>
    //         <div className="flex justify-between h-fit">
    //           {(stock.sign === "1" || stock.sign === "2") && (
    //             <UpPrice
    //               change={Number(stock.changeAmount)}
    //               changeRate={Number(stock.changeRate)}
    //             />
    //           )}
    //           {stock.sign === "3" && (
    //             <span className="text-gray-400 font-medium">
    //               {Number(stock.changeAmount)} ({Number(stock.changeRate)}%)
    //             </span>
    //           )}
    //           {(stock.sign === "4" || stock.sign === "5") && (
    //             <DownPrice
    //               change={Number(stock.changeAmount)}
    //               changeRate={Number(stock.changeRate)}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center gap-2 w-full">
      <div className="relative">
        <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
          <span className="text-main-blue font-semibold">
            {stock.stockName[0]}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 truncate text-sm">
        <p className="flex items-center gap-main text-gray-800 truncate w-full">
          <span className="font-bold">{stock.stockName}</span>
          <span className="text-gray-400">{stock.stockCode}</span>
        </p>
        <div className="flex items-center gap-main">
          <span className="text-main-dark-gray">
            {Number(stock.currentPrice).toLocaleString()}원
          </span>
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
    </div>
  );
};

export default StockHeader;
