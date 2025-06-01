"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import bentoStyle from "./bento.module.css";
import RealTimeNews from "./RealTimeNews";
import Image from "next/image";
import { News } from "@/type/news";
import Link from "next/link";

const NEWS_PER_PAGE = 5;

const MainNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

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
      console.log(data.data);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 현재 페이지의 뉴스 5개
  const pageNews = news.slice(
    currentPage * NEWS_PER_PAGE,
    (currentPage + 1) * NEWS_PER_PAGE
  );

  const gridNews = pageNews.slice(1, 5);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + 2) % 2);
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % 2);
  };

  const mainNews = pageNews[0];

  return (
    <div className="grid grid-cols-3 w-full gap-[20px]">
      <div className="col-span-2 w-full h-[400px] relative">
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
                "absolute bottom-[20px] left-[20px] max-w-[400px] transition-opacity duration-200 ease-in-out"
              )}
            >
              <div className="flex flex-col gap-main">
                <p className="text-2xl font-bold line-clamp-1">
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

      <RealTimeNews />

      {/* 아래 4개 뉴스 (2x2 그리드) */}
      <div
        className={clsx(
          "col-span-2 grid grid-cols-2 grid-rows-2 gap-main transition-opacity duration-200 ease-in-out"
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
