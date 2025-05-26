import React from "react";
import { Clock } from "lucide-react";

const CustomNews = () => {
  return (
    <div className="flex flex-col gap-main">
      <h2 className="text-2xl font-bold">
        <b className="text-main-blue">{"홍길동"}</b>님을 위한 맞춤 뉴스
      </h2>
      <div className="grid grid-cols-2 gap-x-main">
        <div className="col-span-2 grid grid-cols-4 gap-main mb-[20px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="flex flex-col gap-main hover:scale-102 transition-all duration-500 ease-in-out"
              key={`custom-news-${index}`}
            >
              <div className="bg-black w-full aspect-[1.5/1] rounded-main shrink-0" />
              <p className="line-clamp-2">
                주요 기업들, 2분기
                실적adfaefaefaㅁ이라ㅓ미다러믿러ogijwaoegijawoegijeawo
              </p>
              <div className="flex items-center text-main-dark-gray text-xs">
                <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
                <span className="text-main-dark-gray">5시간 전 · 이투데이</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-main">
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
        </div>

        <div className="flex flex-col gap-main"></div>
      </div>
    </div>
  );
};

export default CustomNews;
