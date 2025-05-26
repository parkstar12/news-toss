"use client";

import { Clock } from "lucide-react";
import React, { useState } from "react";
import NewsModal from "./NewsModal";

const AllNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-main">
        <h2 className="text-2xl font-bold">모든 주요 뉴스</h2>
        <div className="grid grid-cols-3 gap-main">
          {Array.from({ length: 9 }).map((_, index) => (
            <button
              className="flex gap-main hover:scale-102 transition-all duration-500 ease-in-out"
              key={`all-news-${index}`}
              onClick={() => setIsOpen(true)}
            >
              <div className="bg-black size-[70px] rounded-main shrink-0" />
              <div className="w-full flex flex-col justify-around">
                <p className="line-clamp-1">
                  주요 기업들, 2분기
                  실적adfaefaefaㅁ이라ㅓ미다러믿러aroirajho;ijego;
                </p>
                <div className="flex items-center text-main-dark-gray text-xs">
                  <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                  <span className="text-main-dark-gray">
                    5시간 전 · 이투데이
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center border-t border-gray-200 pt-main">
          <button className="text-main-dark-gray text-sm hover:bg-main-light-gray w-full rounded-main py-main transition-all duration-300 ease-in-out">
            더보기
          </button>
        </div>
      </div>

      <NewsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        1
      </NewsModal>
    </>
  );
};

export default AllNews;
