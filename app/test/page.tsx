"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const sse = new EventSource("http://localhost:3000/api/v1/sse/test");
    sse.onmessage = (event) => {
      console.log(event.data);
      setData((prev: any) => [...prev, event.data]);
    };
    return () => {
      sse.close();
    };
  }, []);
  // return (
  //   <div>
  //     {data.map((item: any, index: number) => (
  //       <div key={index}>{item}</div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="grid grid-cols-[240px_1fr_300px] gap-6 w-full px-8 py-6">
      {/* 좌측 사이드바 - 필터 & 스크랩 */}
      <aside className="flex flex-col gap-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">카테고리</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-left w-full hover:underline">
                전체 뉴스
              </button>
            </li>
            <li>
              <button className="text-left w-full hover:underline">경제</button>
            </li>
            <li>
              <button className="text-left w-full hover:underline">정치</button>
            </li>
            <li>
              <button className="text-left w-full hover:underline">기술</button>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">스크랩한 뉴스</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="truncate">삼성전자, AI 반도체로 주가 상승 기대</li>
            <li className="truncate">美 FOMC 발표 이후 시장 반응 분석</li>
          </ul>
        </div>
      </aside>

      {/* 중앙 뉴스 리스트 */}
      <main className="flex flex-col gap-6">
        {/* 검색 & 필터 */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="뉴스 검색..."
            className="w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-main-blue"
          />
          <div className="space-x-2">
            <button className="px-4 py-2 rounded-full bg-main-blue text-white text-sm hover:bg-blue-600">
              최신순
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm hover:bg-gray-200">
              인기순
            </button>
          </div>
        </div>

        {/* 뉴스 카드 목록 */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg line-clamp-2">
                뉴스 제목 {idx + 1} - 여기 뉴스 제목이 들어갑니다.
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                여기에 뉴스 요약 내용이 들어가요. 기사 내용 중 일부를 보여주는
                프리뷰로 사용됩니다. 상세 페이지는 클릭 시 이동!
              </p>
              <div className="text-xs text-gray-400 mt-auto">
                2025.06.04 · 10분 전
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 우측: 관련 종목 & 인기 뉴스 */}
      <aside className="flex flex-col gap-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">관련 종목</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>삼성전자 (005930)</li>
            <li>LG에너지솔루션 (373220)</li>
            <li>카카오 (035720)</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">🔥 인기 뉴스</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="truncate">삼성 AI 투자 발표로 반도체 업계 주목</li>
            <li className="truncate">네이버, 검색 알고리즘 전면 개편 예고</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default page;
