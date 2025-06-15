import { MetaData } from "@/type/news";
import React from "react";
import { BarChart2, TrendingUp, Layers, ClipboardPen } from "lucide-react";
import { StockSearchResult } from "@/type/stocks/StockSearchResult";
import Image from "next/image";
import DownPrice from "@/components/ui/shared/DownPrice";
import UpPrice from "@/components/ui/shared/UpPrice";
import Link from "next/link";

const MetaDataNews = ({
  metaData,
  stockList,
}: {
  metaData: MetaData;
  stockList: StockSearchResult[];
}) => {
  return (
    <div className="w-full flex flex-col gap-main">
      {/* <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
        메타데이터
      </h2> */}

      <div className="grid grid-cols-[1fr_1px_1fr] gap-main">
        <div className="text-2xl flex flex-col gap-main">
          <p className="flex items-center gap-main">
            <ClipboardPen size={18} />
            <span className="font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
              뉴스 요약
            </span>
          </p>
          <p className="text-sm text-main-dark-gray leading-relaxed whitespace-pre-line">
            {metaData.summary}
          </p>
        </div>

        <div className="bg-main-light-gray h-full" />

        <div className="grid grid-rows-[1fr_1px_1fr] gap-main">
          {/* 관련 종목 */}
          {stockList && stockList.length > 0 && (
            <div className="flex flex-col gap-main">
              <span className="flex items-center gap-main">
                <TrendingUp size={18} />
                <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
                  관련 종목
                </span>
              </span>
              <div className="flex gap-2 flex-wrap">
                {stockList.map((stock) => (
                  <Link
                    href={`/stocks/${stock.stockCode}`}
                    key={stock.stockCode}
                    className="text-main-blue px-3 py-2 text-xs font-semibold rounded-main flex items-center gap-2 hover:bg-main-blue/10 transition-all duration-200 ease-in-out"
                  >
                    <div className="relative flex items-center justify-center size-[30px] shrink-0">
                      {stock.stockImage ? (
                        <Image
                          src={stock.stockImage}
                          alt={stock.stockName}
                          fill
                          className="rounded-full"
                          sizes="30px"
                        />
                      ) : (
                        <div className="bg-main-blue/10 rounded-full size-[30px] shrink-0 flex items-center justify-center">
                          <span className="text-main-blue font-semibold">
                            {stock.stockName[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-main-dark-gray flex items-baseline gap-1">
                        <span className="font-semibold">{stock.stockName}</span>
                        <span className="text-xs">{stock.stockCode}</span>
                      </p>

                      <div className="flex justify-between h-fit">
                        {(stock.sign === "1" || stock.sign === "2") && (
                          <UpPrice
                            change={Number(stock.changeAmount)}
                            changeRate={Number(stock.changeRate)}
                          />
                        )}
                        {stock.sign === "3" && (
                          <span className="text-gray-400 font-medium">
                            {Number(stock.changeAmount)} (
                            {Number(stock.changeRate)}%)
                          </span>
                        )}
                        {(stock.sign === "4" || stock.sign === "5") && (
                          <DownPrice
                            change={Number(stock.changeAmount)}
                            changeRate={Number(stock.changeRate)}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-main-light-gray w-full" />

          <div className="grid grid-cols-[1fr_1px_1fr] gap-main">
            {/* 임팩트 점수 */}
            {metaData.impactScore && (
              <div className="flex flex-col justify-between gap-main">
                <p className="flex items-center gap-main">
                  <BarChart2 size={18} />
                  <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
                    뉴스 영향력
                  </span>
                </p>
                <p className="flex-1 flex text-2xl font-bold items-center justify-center">
                  <span className="bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent">
                    {(metaData.impactScore * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            )}

            <div className="bg-main-light-gray h-full" />

            {/* 산업군 */}
            {metaData.industryList && metaData.industryList.length > 0 && (
              <div className="flex flex-col gap-main">
                <p className="flex items-center gap-main">
                  <Layers size={18} />
                  <span className="text-lg font-bold bg-gradient-to-r from-main-blue to-purple-500 bg-clip-text text-transparent w-fit">
                    관련 산업군
                  </span>
                </p>

                <div className="flex gap-2 flex-wrap">
                  {metaData.industryList.map((industry) => (
                    <div
                      key={`industry-${industry.industry_id}`}
                      className="bg-main-blue/5 text-main-dark-gray px-3 py-1 text-xs font-semibold rounded-full"
                    >
                      {industry.industry_name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDataNews;
