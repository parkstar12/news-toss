"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import bentoStyle from "./bento.module.css";
import Image from "next/image";
import { News } from "@/type/news";
import Link from "next/link";

const NEWS_PER_PAGE = 5;

const MainNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("/api/news/top10", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setNews(data.data);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 2);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 현재 페이지의 뉴스 5개
  const pageNews = news.slice(
    currentPage * NEWS_PER_PAGE,
    (currentPage + 1) * NEWS_PER_PAGE
  );

  const gridNews = pageNews.slice(1, 5);

  const handlePrevPage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentPage((prev) => (prev - 1 + 2) % 2);

    // interval 재설정
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 2);
    }, 5000);
  };

  const handleNextPage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentPage((prev) => (prev + 1) % 2);

    // interval 재설정
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 2);
    }, 5000);
  };

  const mainNews = pageNews[0];

  return (
    <div className="grid grid-cols-3 w-full gap-[20px]">
      <div className="col-span-3 grid grid-rows-[auto_1fr] gap-main w-full h-[400px] relative">
        <div className="text-3xl font-bold">
          <span>오늘의 </span>
          <span className="bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
            주요 뉴스
          </span>
        </div>
        {mainNews && (
          <Link
            href={`/news/${mainNews.newsId}`}
            rel="noopener noreferrer"
            className="block w-full h-full relative"
          >
            <div className="relative size-full">
              <Image
                src={mainNews.image || "https://placehold.co/600x400"}
                alt={`${mainNews.title}-image`}
                fill
                className={clsx(
                  bentoStyle["inverted-radius"],
                  "object-cover h-full transition-opacity duration-200 ease-in-out",
                  "transition-transform hover:scale-102"
                )}
              />
            </div>
            <div
              className={clsx(
                "absolute transition-opacity duration-200 ease-in-out w-full bottom-0 left-0"
              )}
            >
              <div className="flex flex-col gap-[20px] px-[20px] py-[20px]">
                <p className="text-xl font-bold line-clamp-1">
                  {mainNews.title}
                </p>
                <div className="flex items-center text-main-dark-gray text-xs">
                  <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                  <span className="text-main-dark-gray">
                    {mainNews.wdate} · {mainNews.press}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
        <div className="w-[190px] h-[50px] absolute bottom-0 right-0 flex items-center justify-between p-main">
          <ChevronLeft
            className="bg-main-light-gray/50 rounded-full p-1 box-content hover:bg-main-light-gray"
            onClick={handlePrevPage}
          />
          <span className="text-main-dark-gray">{currentPage + 1} / 2</span>
          <ChevronRight
            className="bg-main-light-gray/50 rounded-full p-1 box-content hover:bg-main-light-gray"
            onClick={handleNextPage}
          />
        </div>
      </div>

      {/* 아래 4개 뉴스 (2x2 그리드) */}
      <div
        className={clsx(
          "col-span-3 grid grid-cols-2 grid-rows-2 gap-main transition-opacity duration-200 ease-in-out"
        )}
      >
        {gridNews.map((item, idx) => (
          <Link
            href={`/news/${item.newsId}`}
            className="flex gap-main hover:scale-102 transition-all duration-400 ease-in-out"
            key={`main-news-${item.newsId}`}
          >
            <div className="bg-black size-[90px] rounded-main shrink-0" />
            <div className="w-full flex flex-col justify-around">
              <p className="line-clamp-2">{item.title}</p>
              <div className="flex items-center text-main-dark-gray text-xs">
                <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                <span className="text-main-dark-gray">
                  {item.wdate} · {item.press}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
