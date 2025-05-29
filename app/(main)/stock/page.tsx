import React from "react";
import OverViewChart from "./OverViewChart";
import KOSPIChart from "./KOSPIChart";
import KOSDAQChart from "./KOSDAQChart";
import PopularStock from "./PopularStock";
import CategoryStock from "./CategoryStock";
import SearchStock from "./SearchStock";

const StockPage = async () => {
  // 오늘 날짜 (YYYYMMDD)
  const endDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // 100일 전 날짜 (YYYYMMDD)
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 100);
  const startDate = startDateObj.toISOString().slice(0, 10).replace(/-/g, "");

  const KOSPIResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/indices/KOSPI?startDate=${startDate}&endDate=${endDate}`
  );
  const KOSPIData = await KOSPIResponse.json();

  const KOSDAQResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/indices/KOSDAQ?startDate=${startDate}&endDate=${endDate}`
  );
  const KOSDAQData = await KOSDAQResponse.json();

  const popularResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/popular`
  );
  const popularData = await popularResponse.json();

  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/categories?page=1`
  );
  const categoryData = await categoryResponse.json();

  return (
    <div className="flex flex-col gap-[40px] max-w-[1200px] mx-auto">
      <div className="grid grid-cols-3 gap-main">
        {KOSPIData.data && <KOSPIChart KOSPIData={KOSPIData.data} />}

        {KOSDAQData.data && <KOSDAQChart KOSDAQData={KOSDAQData.data} />}

        <div className="row-span-8 relative">
          <div className="flex flex-col gap-main p-main sticky top-0">
            <SearchStock />
            <OverViewChart />
          </div>
        </div>

        <div className="col-span-2 row-span-1">
          {popularData.data && (
            <PopularStock popularStocks={popularData.data} />
          )}
        </div>

        <div className="col-span-2 row-span-2">
          {categoryData.data && (
            <CategoryStock
              categoryData={categoryData.data.map(
                (item: { categoryName: string }) => item.categoryName
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
