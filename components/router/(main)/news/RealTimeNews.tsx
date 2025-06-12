"use client";

import React, { useEffect, useState } from "react";
import styles from "./RealTimeNews.module.css";
import clsx from "clsx";
import { Radio, RefreshCw } from "lucide-react";

const newsData = [
  {
    title: "제목11111111111111111111111111111",
    summary: "요약1",
    time: "1시간 전",
  },
  {
    title: "제목22",
    summary: "요약2",
    time: "2시간 전",
  },
  {
    title: "제목3",
    summary: "요약3",
    time: "3시간 전",
  },
  {
    title: "제목4",
    summary: "요약4",
    time: "4시간 전",
  },
  {
    title: "제목5",
    summary: "요약5",
    time: "5시간 전",
  },
  {
    title: "제목6",
    summary: "요약6",
    time: "6시간 전",
  },
  {
    title: "제목7",
    summary: "요약7",
    time: "7시간 전",
  },
  {
    title: "제목8",
    summary: "요약8",
    time: "8시간 전",
  },
  {
    title: "제목9",
    summary: "요약9",
    time: "9시간 전",
  },
];

export default function RealTimeNews() {
  const [animationKey, setAnimationKey] = useState(0);
  const [news, setNews] = useState([...newsData]);
  const [remainSec, setRemainSec] = useState(60);

  useEffect(() => {
    const sse = new EventSource("http://43.200.17.139:8080/api/news/stream");
    // const sse = new EventSource("/api/news/stream");

    sse.onopen = (event) => {
      console.log("✅ 서버 연결됨", event);
    };

    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    sse.onmessage = (event) => {
      console.log("📰 뉴스 수신 test:", event.data);
    };

    // 연결 이벤트
    sse.addEventListener("connect", (event) => {
      console.log("✅ 서버 연결됨:", event.data); // 'connected' 출력
    });

    // 뉴스 이벤트 수신
    sse.addEventListener("news", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📰 뉴스 수신:", data);
      } catch (err) {
        console.error("❌ JSON 파싱 에러:", err);
      }
    });

    // 에러 핸들링
    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    // 컴포넌트 언마운트 시 종료
    return () => {
      sse.close();
      console.log("🛑 SSE 연결 종료");
    };
  }, []);

  // 1초마다 남은 시간 감소
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainSec((sec) => (sec > 0 ? sec - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1분마다 애니메이션 트리거
  useEffect(() => {
    if (remainSec === 0) {
      setAnimationKey((k) => k + 1);
      setNews([...newsData]);
      // 1초 후 60으로 리셋
      const timeout = setTimeout(() => {
        setRemainSec(60);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [remainSec]);

  return (
    <div className="shadow-lg rounded-main">
      <div className="flex items-center justify-between p-main">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio size={20} className="text-main-blue" />
            <div className="absolute -top-1 -right-1 size-[6px] bg-main-blue rounded-full animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent font-bold">
            실시간 뉴스
          </span>
        </div>
        <div className="flex items-center gap-[5px]">
          <RefreshCw size={12} />
          <span className="text-sm text-main-dark-gray">
            {remainSec}초 남음
          </span>
        </div>
      </div>
      <div
        key={animationKey}
        className="flex flex-col gap-main overflow-y-scroll h-[250px] p-main"
      >
        {news.map((item, index) => (
          <div
            key={`real-time-news-${index}`}
            className={clsx(
              styles.newsListItem,
              "w-full px-main py-[5px] rounded-main shadow-sm border-l-4 border-main-blue hover:scale-103 transition-all duration-400 ease-in-out z-5"
            )}
            style={{
              animationDelay: `${index * 0.07}s`,
              animationFillMode: "forwards",
            }}
          >
            <div className="w-full flex flex-col gap-main">
              <div className="flex justify-between items-end gap-main">
                <h3 className="font-medium truncate">{item.title}</h3>
                <span className="text-xs text-gray-500 shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="w-full text-sm text-gray-600 line-clamp-1">
                {item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-main border-t border-gray-200 text-center p-main">
        <p className="text-sm text-gray-500">
          매 1분마다 뉴스가 업데이트됩니다.
        </p>
      </div>
    </div>
  );
}
