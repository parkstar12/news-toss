"use client";

import { News } from "@/type/news";
import clsx from "clsx";
import { ChevronDown, LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const NewsDetail = ({ newsId }: { newsId: string }) => {
  const [news, setNews] = useState<News | null>(null);
  const [isOpenNewsDetail, setIsOpenNewsDetail] = useState(true);
  const newsDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news/detail?newsId=${newsId}`);
      const data = await res.json();
      setNews(data.data);
    };
    fetchNews();
  }, [newsId]);

  if (!news) return null;

  return (
    <div className="w-full flex flex-col gap-main overflow-y-scroll">
      <div className="flex flex-col gap-[5px]">
        <h2 className="text-2xl font-bold">{news.title}</h2>
        <p className="text-sm text-main-dark-gray">
          2025년 05월 10일 09:00 · 이투데이
        </p>
      </div>

      <div className="w-full h-[300px] relative">
        <Image
          src={news.image || "https://placehold.co/600x400"}
          alt={`${news.title}-image`}
          fill
        />
      </div>

      <Link
        href={news.url}
        target="_blank"
        className="flex items-center gap-main"
      >
        <LinkIcon size={16} />
        <span className="text-main-dark-gray underline">{news.url}</span>
      </Link>

      <div
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden relative pb-10",
          isOpenNewsDetail
            ? "max-h-[2000px] opacity-100"
            : "max-h-[70px] opacity-100"
        )}
        ref={newsDetailRef}
      >
        <pre className="whitespace-pre-wrap leading-7 px-main">
          {news.content}
        </pre>

        {/* <div
          className={clsx(
            "absolute bottom-0 left-0 w-full flex justify-center z-10 py-main",
            isOpenNewsDetail ? "" : "backdrop-blur-sm"
          )}
        >
          <button
            className="w-fit bg-main-blue text-white rounded-main py-main pl-5 pr-4 flex items-center justify-center gap-2"
            onClick={() => {
              setIsOpenNewsDetail(!isOpenNewsDetail);
              !isOpenNewsDetail &&
                newsDetailRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          >
            <span className="font-semibold">
              {isOpenNewsDetail ? "뉴스 접기" : "뉴스 상세보기"}
            </span>
            <ChevronDown
              size={20}
              className={isOpenNewsDetail ? "rotate-180" : ""}
            />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NewsDetail;
