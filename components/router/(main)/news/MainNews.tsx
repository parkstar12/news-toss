"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import invertedStyle from "./inverted.module.css";
import Image from "next/image";
import { News } from "@/type/news";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

const NEWS_PER_PAGE = 5;

const MainNews = ({ news }: { news: News[] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     const res = await fetch("/api/news/v2/top10", {
  //       credentials: "include",
  //     });

  //     // const res = await fetch("/api/news/v2/highlight/redistest", {
  //     //   credentials: "include",
  //     // });
  //     const data = await res.json();
  //     setNews(data.data);
  //   };
  //   fetchNews();
  // }, []);

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
      <div className="col-span-3 grid grid-cols-3 gap-main w-full relative">
        <div className="text-3xl font-bold col-span-3">
          <span>오늘의 </span>
          <span className="bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
            주요 뉴스
          </span>
        </div>
        <div className="col-span-2 relative">
          {mainNews && (
            <Link
              href={`/news/${mainNews.newsId}`}
              rel="noopener noreferrer"
              className="block w-full h-full relative filter-[drop-shadow(0_2px_4px_rgba(0,0,0,0.5))]"
            >
              <div
                className={clsx(
                  "relative size-full overflow-hidden border-main-light-gray",
                  invertedStyle["inverted-radius"]
                )}
              >
                <Image
                  src={mainNews.image || "https://placehold.co/600x400"}
                  alt={`${mainNews.title}-image`}
                  fill
                  className={clsx(
                    invertedStyle["inverted-radius"],
                    "object-cover h-full hover:scale-103 duration-300 ease-in-out"
                  )}
                />
                <div className="absolute w-full h-full bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none flex items-end">
                  <div
                    className={clsx(
                      "relative flex flex-col justify-around gap-main px-[20px] py-[20px] z-10",
                      invertedStyle["inverted-radius"]
                    )}
                  >
                    <p className="text-2xl font-bold line-clamp-1 text-white drop-shadow w-2/3">
                      {mainNews.title}
                    </p>
                    <div className="flex items-center text-xs text-gray-200">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {mainNews.wdate && formatDate(mainNews.wdate)} ·{" "}
                        {mainNews.press}
                      </span>
                    </div>
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

        <div
          className={clsx(
            "grid grid-rows-4 transition-opacity duration-200 ease-in-out"
          )}
        >
          {gridNews.map((item, idx) => (
            <Link
              href={`/news/${item.newsId}`}
              className="flex gap-main hover:bg-main-blue/5 rounded-main p-main group"
              key={`main-news-${item.newsId}`}
            >
              <div className="size-[90px] rounded-main shrink-0 relative">
                <Image
                  src={item.image || "https://placehold.co/90x90"}
                  alt={`${item.title}-image`}
                  fill
                  className="object-cover rounded-main group-hover:scale-102 duration-300 ease-in-out"
                />
              </div>
              <div className="w-full flex flex-col justify-around">
                <p className="line-clamp-2 font-semibold">{item.title}</p>
                <div className="flex items-center text-main-dark-gray text-xs">
                  <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                  <span className="text-main-dark-gray">
                    {item.wdate && new Date(item.wdate).toLocaleDateString()} ·{" "}
                    {item.press}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
