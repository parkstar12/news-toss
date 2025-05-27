"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import React, { useState } from "react";
import categoryList from "./category";
import { useRouter } from "next/navigation";

const TestStock = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("식품");
  const router = useRouter();

  const handleClickStock = (code: string) => {
    router.push(`/stock/${code}`);
  };

  return (
    <div className="p-main flex flex-col gap-main">
      <h2 className="text-xl font-bold">카테고리</h2>
      <div className="grid grid-cols-3 gap-main">
        {/* <div className="col-span-1">
          <div className="flex flex-wrap gap-main">
            {categoryList.map((item) => (
              <button
                key={item}
                className={clsx(
                  "text-main-blue rounded-main p-main flex items-center h-fit",
                  selectedCategory.includes(item)
                    ? "bg-main-blue text-white hover:bg-main-blue/90"
                    : "bg-main-blue/20 text-main-blue hover:bg-main-blue/30"
                )}
                onClick={() => setSelectedCategory(item)}
              >
                <span className="px-main">{item}</span>
              </button>
            ))}
          </div>
        </div> */}
        <div className="col-span-3 rounded-main size-full relative overflow-y-auto">
          <table className="w-full">
            <thead className="bg-main-light-gray sticky top-0">
              <tr>
                <th className="py-main rounded-l-main text-center px-main">
                  종목명
                </th>
                {/* <th>차트</th> */}
                <th>현재가</th>
                <th>전일대비</th>
                <th>등락률</th>
                <th>거래량</th>
                <th className="rounded-r-main">시가총액</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={index}
                  // onClick={() => handleClickStock("123456")}
                  className="cursor-pointer"
                  onClick={() => handleClickStock("123456")}
                >
                  <td className="p-main flex items-center gap-main">
                    <Heart size={18} className="text-main-light-gray" />
                    <span>SK하이닉스</span>
                    <span className="text-main-dark-gray text-sm">00660</span>
                    <span className="text-white bg-main-blue px-main py-1 rounded-sm font-bold text-sm">
                      KOSPI
                    </span>
                  </td>
                  {/* <td>
                <div className="w-full flex justify-center">
                  <div className="w-[150px] h-[30px]">
                    <LineChart color="red" />
                  </div>
                </div>
              </td> */}
                  <td className="text-main-red">121,401 </td>
                  <td>130,401</td>
                  <td>+5.5(0.3%)</td>
                  <td>12.5M</td>
                  <td>428조</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-2 mt-4">
            <button className="size-[30px] flex items-center justify-center rounded bg-main-light-gray text-main-dark-gray hover:bg-main-blue/10">
              <ChevronLeft />
            </button>
            <button className="size-[30px] flex items-center justify-center rounded bg-main-blue text-white font-bold">
              1
            </button>
            <button className="size-[30px] flex items-center justify-center rounded bg-main-light-gray text-main-dark-gray hover:bg-main-blue/10">
              2
            </button>
            <button className="size-[30px] flex items-center justify-center rounded bg-main-light-gray text-main-dark-gray hover:bg-main-blue/10">
              3
            </button>
            <span className="mx-2 text-main-dark-gray">...</span>
            <button className="size-[30px] flex items-center justify-center rounded bg-main-light-gray text-main-dark-gray hover:bg-main-blue/10">
              10
            </button>
            <button className="size-[30px] flex items-center justify-center rounded bg-main-light-gray text-main-dark-gray hover:bg-main-blue/10">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStock;
