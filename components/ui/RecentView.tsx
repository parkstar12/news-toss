"use client";

import { useRecentViewStore } from "@/store/sidebarStore";
import { Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RecentView = () => {
  const {
    recentViewNews,
    setRecentViewNews,
    recentViewStocks,
    setRecentViewStocks,
    syncFromLocalStorage,
  } = useRecentViewStore();

  const router = useRouter();

  useEffect(() => {
    syncFromLocalStorage();
  }, []);

  const handleRemoveNews = (
    e: React.MouseEvent<HTMLButtonElement>,
    newsId: string
  ) => {
    e.stopPropagation();
    setRecentViewNews(recentViewNews.filter((id) => id !== newsId));
  };

  const handleRemoveStock = (
    e: React.MouseEvent<HTMLButtonElement>,
    stockCode: string
  ) => {
    e.stopPropagation();
    setRecentViewStocks(recentViewStocks.filter((code) => code !== stockCode));
  };

  return (
    <div className="grid grid-rows-2 gap-main size-full">
      <div className="flex flex-col gap-main">
        <h2 className="text-xl font-bold text-main-dark-gray">최근 본 뉴스</h2>

        {recentViewNews.length > 0 ? (
          <>
            {recentViewNews.map((newsId, index) => (
              <div
                className="w-full flex flex-col justify-around hover:bg-main-blue/10 rounded-main transition-colors duration-200 ease-in-out px-main py-1 gap-[5px] relative group"
                key={`latest-view-${index}`}
                onClick={() => console.log("news click")}
              >
                <p className="line-clamp-2 text-sm">
                  주식 시장 속 비트코인 투자 팁 3가지
                  소개댐럼잳랴ㅓㅐㅑㅓaefijaw;ofijawoiej
                </p>
                <div className="flex items-center text-main-dark-gray text-xs">
                  <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                  <span className="text-main-dark-gray">
                    5시간 전 · 이투데이
                  </span>
                </div>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-main hidden group-hover:block"
                  onClick={(e) => handleRemoveNews(e, newsId)}
                >
                  <X
                    className="text-main-dark-gray hover:bg-main-blue/30 rounded-full p-1 box-content transition-colors duration-200 ease-in-out"
                    size={16}
                  />
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p className="text-main-dark-gray">최근 본 뉴스가 없습니다.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-main">
        <h2 className="text-xl font-bold text-main-dark-gray">최근 본 종목</h2>

        {recentViewStocks.length > 0 ? (
          <>
            {recentViewStocks.map((stockCode, index) => (
              <div
                className="w-full flex flex-col justify-around hover:bg-main-blue/10 rounded-main transition-colors duration-200 ease-in-out px-main py-1 gap-[5px] relative group"
                key={`latest-view-${index}`}
                onClick={() => router.push(`/stock/${stockCode}`)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="bg-black rounded-full size-[40px] shrink-0" />
                  <div className="flex flex-col flex-1 truncate text-sm">
                    <span className="font-bold text-gray-800 truncate w-full">
                      포스코홀딩스
                    </span>
                    <span className="text-main-dark-gray">{stockCode}</span>
                  </div>
                </div>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-main hidden group-hover:block"
                  onClick={(e) => handleRemoveStock(e, stockCode)}
                >
                  <X
                    className="text-main-dark-gray hover:bg-main-blue/30 rounded-full p-1 box-content transition-colors duration-200 ease-in-out"
                    size={16}
                  />
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center">
            <p className="text-main-dark-gray">최근 본 종목이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentView;
