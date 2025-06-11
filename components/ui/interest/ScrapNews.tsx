"use client";

import { useScrapStore } from "@/store/useScrapStore";
import { JwtToken } from "@/type/jwt";
import { useRouter } from "next/navigation";
import React from "react";

const ScrapNews = ({ token }: { token: JwtToken | null }) => {
  const { scraps } = useScrapStore();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-xl font-bold text-main-dark-gray">스크랩한 뉴스</h2>

      {!token && (
        <div className="w-full h-[120px] flex items-center justify-center text-main-dark-gray">
          로그인 후 이용해주세요
        </div>
      )}

      {token && scraps.length === 0 && (
        <div className="w-full h-[120px] flex items-center justify-center text-main-dark-gray">
          스크랩한 뉴스가 없습니다.
        </div>
      )}

      {token && scraps.length > 0 && (
        <div className="grid">
          {scraps.map((scrap) => (
            <button
              key={`scrap-${scrap.newsId}`}
              className="flex flex-col items-start gap-[5px] hover:bg-main-blue/10 rounded-main transition-colors duration-200 ease-in-out p-main"
              onClick={() => router.push(`/news/${scrap.newsId}`)}
            >
              <h2 className="text-sm text-start font-bold text-main-dark-gray line-clamp-2">
                {scrap.title}
              </h2>
              <p className="text-sm text-main-dark-gray">
                {new Date(scrap.wdate || "").toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapNews;
