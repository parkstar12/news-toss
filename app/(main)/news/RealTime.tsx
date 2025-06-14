"use client";

import { News } from "@/type/news";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RealTime = () => {
  const [news, setNews] = useState<News[]>([]);
  const [newNewsId, setNewNewsId] = useState<string | null>(null);

  useEffect(() => {
    // const sse = new EventSource("http://43.200.17.139:8080/api/news/stream");
    const sse = new EventSource("/api/sse/news");

    sse.onopen = () => {
      console.log("✅ 서버 연결됨");
    };

    sse.onmessage = (event) => {
      console.log("🔥 뉴스 이벤트 수신:", event.data);
      try {
        const data = JSON.parse(event.data);
        setNews((prev) => {
          setNewNewsId(data.newsId);
          return [...prev, data];
        });
      } catch (err) {
        console.error("❌ JSON 파싱 에러:", err);
      }
    };

    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    // // 연결 이벤트
    // sse.addEventListener("connect", (event) => {
    //   console.log("✅ 서버 연결됨:", event.data);
    // });

    // // 뉴스 이벤트 수신
    // sse.addEventListener("news", (event) => {
    // try {
    //     const data = JSON.parse(event.data);
    //     setNews((prev) => {
    //       setNewNewsId(data.newsId); // 새로 추가된 뉴스의 ID 저장
    //       return [...prev, data];
    //     });
    //   } catch (err) {
    //     console.error("❌ JSON 파싱 에러:", err);
    //   }
    // });

    // sse.addEventListener("error", (event) => {
    //   console.error("❌ SSE 에러 발생:", event);
    // });

    return () => {
      sse.close();
      console.log("🛑 실시간 뉴스 SSE 연결 종료");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNews((prev) => prev.slice(1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-main">
      {news.map((newsItem, idx) => (
        <Link
          href={`/news/${newsItem.newsId}`}
          className={`flex gap-main hover:bg-main-blue/5 rounded-main p-main group ${
            newsItem.newsId === newNewsId ? "slide-in" : ""
          }`}
          key={`realtime-news-${newsItem.newsId}-${new Date().getTime()}`}
        >
          <div className="size-[60px] rounded-main shrink-0 relative">
            <Image
              src={
                newsItem.image === "..."
                  ? "https://placehold.co/90x90"
                  : newsItem.image || "https://placehold.co/90x90"
              }
              alt={`realtime-${newsItem.title}-image`}
              fill
              sizes="60px"
              className="object-cover rounded-main group-hover:scale-102 duration-300 ease-in-out"
            />
          </div>
          <div className="w-full flex flex-col justify-around">
            <p className="line-clamp-2 font-semibold">{newsItem.title}</p>
            <div className="flex items-center text-main-dark-gray text-xs">
              <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
              <span className="text-main-dark-gray">
                {newsItem.wdate &&
                  new Date(newsItem.wdate).toLocaleDateString()}{" "}
                · {newsItem.press}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RealTime;
