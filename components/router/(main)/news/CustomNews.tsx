"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { JwtToken } from "@/type/jwt";
import { News } from "@/type/news";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";

const CustomNews = ({ token }: { token: JwtToken | null }) => {
  const [customNews, setCustomNews] = useState<
    {
      mainNews: News;
      relatedNews: News[];
    }[]
  >([]);

  useEffect(() => {
    const fetchCustomNews = async () => {
      const res = await fetch("/api/news/v2/all?skip=23000&limit=4", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json: { data: News[] } = await res.json();
      setCustomNews(
        json.data.map((news) => ({
          mainNews: news,
          relatedNews: [],
        }))
      );
    };
    fetchCustomNews();
  }, []);

  useEffect(() => {
    if (customNews.length === 0) return;

    const fetchRelatedNews = async () => {
      for (const news of customNews) {
        const res = await fetch(
          `/api/news/v2/related/news?newsId=${news.mainNews.newsId}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json: { data: News[] } = await res.json();
        // console.log(json.data);
        setCustomNews((prev) =>
          prev.map((item) =>
            item.mainNews.newsId === news.mainNews.newsId
              ? { ...item, relatedNews: json.data }
              : item
          )
        );
      }
    };
    fetchRelatedNews();
  }, [customNews.length]);

  // if (!token) return null;

  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-2xl font-bold">
        <b className="bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
          {token && token.memberName ? token.memberName : "홍길동"}
        </b>
        님을 위한 맞춤 뉴스
      </h2>
      {/* <div className="grid gap-main"> */}
      <div className="grid grid-cols-9 gap-main mb-[20px]">
        {customNews.map((news, index) => (
          <div
            className={clsx(
              "grid grid-rows-[auto_1fr] gap-main rounded-main p-main shadow-color hover:scale-102 transition-all duration-500 ease-in-out cursor-pointer border-main-light-gray group",
              index === 0 || index === 3 ? "col-span-5" : "col-span-4"
            )}
            key={`custom-news-${news.mainNews.newsId}`}
          >
            <div className="flex flex-col gap-main">
              <div className="bg-black w-full aspect-[2/1] rounded-main shrink-0 relative">
                <Image
                  src={news.mainNews.image || "https://placehold.co/90x90"}
                  alt={`${news.mainNews.title}-image`}
                  fill
                  className="object-cover rounded-main group-hover:scale-101 transition-all duration-500 ease-in-out"
                />
              </div>

              <p className="text-xl font-bold line-clamp-2">
                {news.mainNews.title}
              </p>

              <div className="flex items-center text-main-dark-gray text-xs">
                <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                <span className="text-main-dark-gray">
                  {news.mainNews.wdate && formatDate(news.mainNews.wdate)} ·{" "}
                  {news.mainNews.press}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-main border-t border-main-light-gray pt-main">
              {news.relatedNews.length > 0 ? (
                news.relatedNews.slice(0, 2).map((relatedNews, index) => (
                  <div
                    className="w-full flex gap-main items-center"
                    key={`custom-related-news-${index}`}
                  >
                    <div className="bg-black size-[90px] rounded-main shrink-0 relative">
                      <Image
                        src={relatedNews.image || "https://placehold.co/90x90"}
                        alt={`${relatedNews.title}-image`}
                        fill
                        className="object-cover rounded-main hover:scale-102 transition-all duration-500 ease-in-out"
                      />

                      <div className="absolute w-full h-full bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10 rounded-main" />
                    </div>

                    <div className="w-full flex flex-col justify-around h-full">
                      <p className="line-clamp-2 font-semibold">
                        {relatedNews.title}
                      </p>

                      <div className="flex items-center text-main-dark-gray text-xs">
                        <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                        <span className="text-main-dark-gray">
                          {relatedNews.date && formatDate(relatedNews.date)}
                        </span>
                        <span className="text-main-blue text-xs font-semibold bg-main-blue/20 px-2 py-1 rounded-main w-fit ml-main">
                          {((relatedNews.similarity || 0) * 100).toFixed(2)}%
                          유사
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-main-dark-gray text-sm">
                    유사 뉴스가 없습니다.
                  </p>
                </div>
              )}

              {news.relatedNews.length > 2 && (
                <p className="text-main-dark-gray text-xs text-center">
                  +{news.relatedNews.length - 2} more...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex flex-col gap-main">
          <h2 className="text-lg font-bold">
            나와 성향이 비슷한 사람들이 많이 본 뉴스
          </h2>
          <div className="grid grid-rows-4 gap-main">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="flex gap-main hover:scale-102 transition-all duration-500 ease-in-out"
                key={`custom-similar-news-${index}`}
              >
                <div className="bg-black size-[90px] rounded-main shrink-0" />
                <div className="w-full flex flex-col justify-around">
                  <p className="line-clamp-2">
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
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-main">
          <h2 className="text-lg font-bold">
            수익률 높은 사람들이 많이 본 뉴스
          </h2>
          <div className="grid grid-rows-4 gap-main">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="flex gap-main hover:scale-102 transition-all duration-500 ease-in-out"
                key={`custom-profit-news-${index}`}
              >
                <div className="bg-black size-[90px] rounded-main shrink-0" />
                <div className="w-full flex flex-col justify-around">
                  <p className="line-clamp-2">
                    주요 기업들, 2분기 실적adfaefaefaㅁ이라ㅓ미다러믿러
                    arhjreoijoeirgjoij
                  </p>
                  <div className="flex items-center text-main-dark-gray text-xs">
                    <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                    <span className="text-main-dark-gray">
                      5시간 전 · 이투데이
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      {/* <div className="flex flex-col gap-main"></div> */}
      {/* </div> */}
    </div>
  );
};

export default CustomNews;
