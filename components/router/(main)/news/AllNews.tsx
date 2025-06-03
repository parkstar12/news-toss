"use client";

import { Clock } from "lucide-react";
import React, { useState } from "react";
import NewsModal from "@/components/router/(main)/news/NewsModal";
import { JwtToken } from "@/type/jwt";

const AllNews = ({ token }: { token: JwtToken | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsList, setNewsList] = useState(
    Array.from({ length: token ? 9 : 15 }).map((_, index) => ({
      title: "주요 기업들, 2분기 실적",
      time: "5시간 전",
      source: "이투데이",
    }))
  );

  const handleMoreNews = () => {
    setNewsList(
      newsList.concat(
        Array.from({ length: 9 }).map((_, index) => ({
          title: "주요 기업들, 2분기 실적",
          time: "5시간 전",
          source: "이투데이",
        }))
      )
    );
  };

  return (
    <>
      <div className="flex flex-col gap-main">
        <h2 className="text-2xl font-bold">모든 주요 뉴스</h2>
        <div className="grid grid-cols-3 gap-main">
          {newsList.map((news, index) => (
            <button
              className="flex gap-main hover:scale-102 transition-all duration-500 ease-in-out"
              key={`all-news-${index}`}
              onClick={() => setIsOpen(true)}
            >
              <div className="bg-black size-[70px] rounded-main shrink-0" />
              <div className="w-full flex flex-col justify-around">
                <p className="line-clamp-1 text-start">{news.title}</p>
                <div className="flex items-center text-main-dark-gray text-xs">
                  <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                  <span className="text-main-dark-gray">
                    {news.time} · {news.source}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center border-t border-gray-200 pt-main">
          <button
            className="text-main-dark-gray text-sm hover:bg-main-light-gray w-full rounded-main py-main transition-all duration-300 ease-in-out"
            onClick={handleMoreNews}
          >
            더보기
          </button>
        </div>
      </div>

      <NewsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <></>
      </NewsModal>
    </>
  );
};

export default AllNews;
