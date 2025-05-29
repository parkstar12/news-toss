"use client";

import { ChevronRight, Triangle } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import UpPrice from "@/components/ui/shared/UpPrice";
import DownPrice from "@/components/ui/shared/DownPrice";
import Bookmark from "@/components/ui/shared/Bookmark";
import Scrab from "@/components/ui/shared/Scrab";

interface PopularStockProps {
  popularStocks: {
    hts_kor_isnm: string; // 종목명
    mksc_shrn_iscd: string; // 종목코드
    data_rank: string; // 순위
    prdy_vrss_sign: string; // 전일대비 부호
    prdy_vrss: string; // 전일대비
    prdy_ctrt: string; // 전일대비율
  }[];
}

const PopularStock = ({ popularStocks }: PopularStockProps) => {
  const router = useRouter();

  const handleClickStock = (code: string) => {
    router.push(`/stock/${code}`);
  };

  // const stocks = [
  //   {
  //     name: "삼성전자",
  //     code: "005930",
  //     price: 72400,
  //     change: 800,
  //     changeRate: 1.12,
  //   },
  //   {
  //     name: "SK하이닉스",
  //     code: "000660",
  //     price: 162300,
  //     change: -1200,
  //     changeRate: -0.74,
  //   },
  //   {
  //     name: "LG에너지솔루션",
  //     code: "373220",
  //     price: 379000,
  //     change: 2000,
  //     changeRate: 0.53,
  //   },
  //   {
  //     name: "삼성바이오로직스",
  //     code: "207940",
  //     price: 780000,
  //     change: 8500,
  //     changeRate: 1.1,
  //   },
  //   {
  //     name: "현대차adsfasdfsafasdfasfsasfㅋㅋㅋ",
  //     code: "005380",
  //     price: 243000,
  //     change: -3000,
  //     changeRate: -1.22,
  //   },
  //   {
  //     name: "포스코홀딩스",
  //     code: "005490",
  //     price: 495000,
  //     change: 6000,
  //     changeRate: 1.23,
  //   },
  // ];

  return (
    <div className="col-span-2 p-main mb-[20px]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">인기 종목</h2>
      <div className="grid grid-cols-2 gap-x-main">
        {popularStocks &&
          popularStocks.map((stock, index) => (
            <div
              key={`popular-${stock.hts_kor_isnm}`}
              className="rounded-main px-main py-4 transition duration-300 hover:bg-main-blue/10 hover:scale-102 cursor-pointer relative group"
              onClick={() => handleClickStock(stock.mksc_shrn_iscd)}
            >
              <Bookmark className="absolute top-0 left-0" rank={index + 1} />
              <div className="flex gap-main w-full">
                <div className="relative">
                  <Scrab
                    className="absolute bottom-0 right-[-4px]"
                    stockCode={stock.mksc_shrn_iscd}
                  />
                  <div className="bg-black/10 rounded-full size-[40px] shrink-0" />
                </div>
                <div className="flex flex-col flex-1 truncate">
                  <span className="font-bold text-gray-800 truncate w-full">
                    {stock.hts_kor_isnm}
                  </span>
                  <div className="text-sm flex gap-main items-center">
                    <span className="text-gray-500">
                      {stock.mksc_shrn_iscd}
                    </span>
                    <div className="flex justify-between h-fit">
                      {(stock.prdy_vrss_sign === "1" ||
                        stock.prdy_vrss_sign === "2") && (
                        <UpPrice
                          change={Number(stock.prdy_vrss)}
                          changeRate={Number(stock.prdy_ctrt)}
                        />
                      )}
                      {stock.prdy_vrss_sign === "3" && (
                        <span className="text-gray-400 font-medium">
                          {Number(stock.prdy_vrss)} ({Number(stock.prdy_ctrt)}%)
                        </span>
                      )}
                      {(stock.prdy_vrss_sign === "4" ||
                        stock.prdy_vrss_sign === "5") && (
                        <DownPrice
                          change={Number(stock.prdy_vrss)}
                          changeRate={Number(stock.prdy_ctrt)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className="hidden group-hover:block text-main-blue absolute top-1/2 -translate-y-1/2 right-main"
                  size={20}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularStock;
