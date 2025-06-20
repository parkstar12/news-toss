"use client";

import Tooltip from "@/components/ui/Tooltip";
import { News } from "@/type/news";
import { CircleHelp, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RealTime = () => {
  const [news, setNews] = useState<News[]>([]);
  const [newNewsId, setNewNewsId] = useState<string | null>(null);

  useEffect(() => {
    // const sse = new EventSource("/sse/news");
    const sse = new EventSource("/api/sse/news");

    sse.onopen = () => {
      console.log("✅ 서버 연결됨");
    };

    // ✨ 커스텀 이벤트 수신!
    sse.addEventListener("news", (event) => {
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
    });

    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    return () => {
      sse.close();
      console.log("🛑 실시간 뉴스 SSE 연결 종료");
    };
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setNews((prev) => prev.slice(1));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [news.length]);

  return (
    <div className="grid grid-cols-2 gap-main">
      <div className="flex items-center gap-main">
        <span className="text-3xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
          실시간 수집 뉴스
        </span>
        <Tooltip
          position="right"
          message="네이버 증권 뉴스에서 실시간으로 수집됩니다."
          icon={<CircleHelp size={16} />}
        />
      </div>

      <div className="grid grid-cols-[1fr_auto] h-fit gap-x-main justify-end text-end font-semibold text-sm">
        <p>오늘 수집된 뉴스:</p>{" "}
        <span>
          <b className="text-main-blue">{3}</b>개
        </span>
        <p>전체 수집된 뉴스:</p>{" "}
        <span>
          <b className="text-main-blue">{13}</b>개
        </span>
      </div>

      <div className="col-span-2 grid grid-cols-[auto_1fr_auto_auto] gap-main">
        <span className="text-center font-semibold">관련 종목</span>
        <span className="text-center font-semibold">요약</span>
        <span className="text-center font-semibold">뉴스 중요도</span>
        <span className="text-center font-semibold">시간</span>

        <div className="h-px bg-main-dark-gray/10 col-span-full" />

        {Array.from({ length: 3 }).map((_, idx) => {
          return (
            <React.Fragment
              key={`realtime-news-${idx}`}
              // className="col-span-full grid grid-cols-[auto_1fr_auto_auto] gap-main"
              // style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <p className="text-center">삼성전자</p>
              <p className="">삼성전자 주가가 상승했습니다.</p>
              <p className="text-center font-semibold text-main-blue">
                {Number(0.28 * 100).toFixed(2)}%
              </p>
              <p className="text-center flex items-center gap-1 text-sm">
                <Clock className="text-main-dark-gray" size={12} />
                10분전
              </p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RealTime;
