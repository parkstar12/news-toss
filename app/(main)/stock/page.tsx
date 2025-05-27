"use client";

import React from "react";
import OverViewChart from "./OverViewChart";
import KOSPIChart from "./KOSPIChart";
import KOSDAQChart from "./KOSDAQChart";
import PopularStock from "./PopularStock";
import CategoryStock from "./CategoryStock";
import SearchStock from "./SearchStock";

const StockPage = () => {
  return (
    <div className="flex flex-col gap-[40px] max-w-[1200px] mx-auto">
      <div className="grid grid-cols-3 gap-main">
        <div className="mb-[20px]">
          <KOSPIChart />
        </div>
        <div className="mb-[20px]">
          <KOSDAQChart />
        </div>
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
          <CategoryStock />
        </div>
      </div>
    </div>
  );
};

export default StockPage;
