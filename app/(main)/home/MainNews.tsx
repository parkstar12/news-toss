"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import bentoStyle from "./bento.module.css";
import RealTimeNews from "./RealTimeNews";

const news = [
  {
    id: 1,
    title: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    source: "이투데이",
    time: "1시간 전",
    image: "https://placehold.co/200",
    relatedNews: [
      {
        id: 11,
        title:
          "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        source: "이투데이",
        time: "1시간 전",
        image: "https://placehold.co/300",
      },
      {
        id: 21,
        title:
          "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        source: "이투데이",
        time: "1시간 전",
        image: "https://placehold.co/50",
      },
      {
        id: 31,
        title:
          "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        source: "이투데이",
        time: "1시간 전",
        image: "https://placehold.co/50",
      },
      {
        id: 41,
        title:
          "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        source: "이투데이",
        time: "1시간 전",
        image: "https://placehold.co/50",
      },
    ],
  },
  {
    id: 2,
    title: "정부222, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    source: "이투데이",
    time: "1시간 전",
    image: "https://placehold.co/100",
    relatedNews: [
      {
        id: 12,
        title:
          "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        desc: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
        source: "이투데이",
        time: "1시간 전",
        image: "https://placehold.co/600",
      },
    ],
  },
];

const MainNews = () => {
  const [currentNews, setCurrentNews] = useState(news[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + news.length) % news.length;
      setCurrentIndex(prevIndex);
      setCurrentNews(news[prevIndex]);
      setIsFading(false);
    }, 300);
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % news.length;
      setCurrentIndex(nextIndex);
      setCurrentNews(news[nextIndex]);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="grid grid-cols-3 w-full gap-[20px]">
      <div className="col-span-2 w-full h-[400px] relative">
        <img
          src={currentNews.image}
          alt="bento"
          className={clsx(
            bentoStyle["inverted-radius"],
            "object-cover h-full transition-opacity duration-400 ease-in-out",
            isFading ? "opacity-0" : "opacity-100"
          )}
        />

        <div
          className={clsx(
            "absolute bottom-[20px] left-[20px] max-w-[400px] transition-opacity duration-400 ease-in-out",
            isFading ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex flex-col gap-main">
            <p className="text-2xl font-bold line-clamp-1">
              {currentNews.title}
            </p>
            <div className="flex items-center text-main-dark-gray text-xs">
              <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
              <span className="text-main-dark-gray">
                {currentNews.time} · {currentNews.source}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[190px] h-[50px] absolute bottom-0 right-0 flex items-center justify-between p-main">
          <ChevronLeft
            className="bg-main-light-gray/50 rounded-full p-1 box-content hover:bg-main-light-gray"
            onClick={handlePrev}
          />
          <span className="text-main-dark-gray">
            {currentIndex + 1} / {news.length}
          </span>
          <ChevronRight
            className="bg-main-light-gray/50 rounded-full p-1 box-content hover:bg-main-light-gray"
            onClick={handleNext}
          />
        </div>
      </div>

      <RealTimeNews />

      <div
        className={clsx(
          "col-span-2 grid grid-cols-2 grid-rows-2 gap-main transition-opacity duration-400 ease-in-out",
          isFading ? "opacity-0" : "opacity-100"
        )}
      >
        {currentNews.relatedNews.map((relatedNews) => (
          <div
            className="flex gap-main hover:scale-102 transition-all duration-400 ease-in-out ease-in-out"
            key={`main-news-related-${relatedNews.id}`}
          >
            <div className="bg-black size-[90px] rounded-main shrink-0" />
            <div className="w-full flex flex-col justify-around">
              <p className="line-clamp-2">{relatedNews.title}</p>
              <div className="flex items-center text-main-dark-gray text-xs">
                <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                <span className="text-main-dark-gray">
                  {relatedNews.time} · {relatedNews.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
