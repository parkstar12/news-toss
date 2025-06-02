import React from "react";
import OverViewChart from "./OverViewChart";
import KOSPIChart from "./KOSPIChart";
import KOSDAQChart from "./KOSDAQChart";
import PopularStock from "./PopularStock";
import CategoryStock from "./CategoryStock";
import SearchStock from "./SearchStock";

const StockPage = async () => {
  let KOSPIData = null;
  let KOSDAQData = null;
  let popularData = null;
  let categoryData = null;

  // 카테고리
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/categories?page=1`
    );
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    categoryData = json.data?.map(
      (item: { categoryName: string }) => item.categoryName
    );
  } catch (e) {
    console.error("❌ 카테고리 에러:", e);
  }

  return (
    <div className="flex flex-col gap-[40px] max-w-[1200px] mx-auto">
      <div className="grid grid-cols-3 gap-main">
        <KOSPIChart />

        <KOSDAQChart />

        <div className="row-span-8 relative">
          <div className="flex flex-col gap-main p-main sticky top-0">
            <SearchStock />
            <OverViewChart />
          </div>
        </div>

        <div className="col-span-2 row-span-1">
          <PopularStock />
        </div>

        <div className="col-span-2 row-span-2">
          {categoryData ? (
            <CategoryStock categoryData={categoryData} />
          ) : (
            <div className="flex flex-col gap-main bg-white p-main text-red-600">
              카테고리 데이터를 불러오지 못했습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
