"use client";

import Input from "@/components/ui/shared/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import OverViewChart from "./OverViewChart";
import KOSPIChart from "./KOSPIChart";
import KOSDAQChart from "./KOSDAQChart";
import PopularStock from "./PopularStock";
import CategoryStock from "./CategoryStock";

const StockPage = () => {
  const [stockSearch, setStockSearch] = useState("");
  const debouncedSearch = useDebounce(stockSearch, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchStocks(debouncedSearch);
    }
  }, [debouncedSearch]);

  console.log(debouncedSearch);

  const searchStocks = async (query: string) => {
    // API 호출 등 검색 로직
    console.log("Searching for:", query);
  };

  return (
    <div className="flex flex-col gap-[40px] max-w-[1200px] mx-auto">
      <div className="w-full shadow-color rounded-main relative">
        <Input
          value={stockSearch}
          onChange={(e) => setStockSearch(e.target.value)}
          placeholder="종목명 또는 코드 검색"
          width="full"
        />
        <Search className="absolute right-main top-[50%] translate-y-[-50%]" />
        {debouncedSearch && (
          <div className="w-full absolute left-0 pt-main">
            <div className=" bg-main-blue rounded-main"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-main">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-main size-full">
            <KOSPIChart />
            <KOSDAQChart />
            {/* <div className="col-span-2 shadow-color rounded-main p-[20px] flex flex-col gap-main">
              <h2 className="text-2xl font-bold">인기 종목</h2>

              <table>
                <thead className="bg-main-light-gray">
                  <tr>
                    <th className="py-main rounded-l-main text-start px-main">
                      종목명
                    </th>
                    <th>현재가</th>
                    <th>전일대비</th>
                    <th>등락률</th>
                    <th>거래량</th>
                    <th className="rounded-r-main">시가총액</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tr
                      key={index}
                      onClick={() => handleClickStock("123456")}
                      className="cursor-pointer"
                    >
                      <td className="p-main flex items-center gap-main">
                        <Heart size={18} className="text-main-light-gray" />
                        <span>SK하이닉스</span>
                        <span className="text-main-dark-gray text-sm">
                          00660
                        </span>
                        <span className="text-white bg-main-blue px-main py-1 rounded-sm font-bold text-sm">
                          KOSPI
                        </span>
                      </td>
                      <td className="text-main-red">121,401 </td>
                      <td>130,401</td>
                      <td>+5.5(0.3%)</td>
                      <td>12.5M</td>
                      <td>428조</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <PopularStock />
          </div>
        </div>
        <div className="col-span-1">
          <OverViewChart />
        </div>
      </div>

      <CategoryStock />
      {/* <ThemeStock /> */}
    </div>
  );
};

export default StockPage;
