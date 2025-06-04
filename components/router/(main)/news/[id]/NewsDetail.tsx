"use client";

import { News } from "@/type/news";
import clsx from "clsx";
import { ChevronDown, LinkIcon, Bookmark, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Star from "@/components/lottie/star/Star";
import { toast } from "react-toastify";
import { JwtToken } from "@/type/jwt";
import { useScrapStore } from "@/store/useScrapStore";

const NewsDetail = ({
  newsId,
  token,
}: {
  newsId: string;
  token: JwtToken | null;
}) => {
  const [news, setNews] = useState<News | null>(null);
  const [isOpenNewsDetail, setIsOpenNewsDetail] = useState(true);
  const [isScrap, setIsScrap] = useState(false);
  const { scraps, setScraps } = useScrapStore();
  const newsDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scraps.find((scrap) => scrap.newsId === newsId)) {
      setIsScrap(true);
    }
  }, [scraps, newsId]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`/api/news/detail?newsId=${newsId}`);
      const data = await res.json();

      if (res.ok) {
        setNews(data.data);
      }
    };

    fetchNews();
  }, [newsId]);

  const handleScrap = async () => {
    if (!news) return;

    if (!token) {
      toast.error("로그인 후 이용해주세요");
      return;
    }

    if (isScrap) {
      const deleteScrapRes = await fetch(`/api/scrap`, {
        method: "DELETE",
        body: JSON.stringify({
          memberId: token.memberId,
          newsId: newsId,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteScrapRes.ok) {
        setScraps(scraps.filter((scrap) => scrap.newsId !== newsId));
        toast.success("스크랩 취소되었습니다");
        setIsScrap(!isScrap);
      } else {
        toast.error("스크랩 취소에 실패했습니다");
      }
      return;
    }

    const createScrapRes = await fetch(`/api/scrap`, {
      method: "POST",
      body: JSON.stringify({
        memberId: token.memberId,
        newsId: newsId,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (createScrapRes.ok) {
      setScraps([
        ...scraps,
        { title: news.title, newsId: newsId, wdate: news.wdate },
      ]);
      toast.success("스크랩 되었습니다");
      setIsScrap(true);
    } else {
      toast.error("스크랩에 실패했습니다");
    }
  };

  if (!news) return null;

  return (
    <div className="w-full flex flex-col gap-main overflow-y-scroll">
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{news.title}</h2>
          <button
            className="p-1 active:scale-80 transition-all duration-200 ease-in-out"
            onClick={handleScrap}
            aria-label="스크랩"
            type="button"
          >
            {isScrap ? (
              <div className="size-[23px]">
                <Star />
              </div>
            ) : (
              <StarIcon size={23} strokeWidth={0.5} />
            )}
          </button>
        </div>
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
