import React from "react";
import Holidings from "./Holidings";
import ProfitLossCalendar from "./ProfitLossCalendar";
import MyAccountChart from "./MyAccountChart";
import { getJwtToken } from "@/utils/auth";
import GaugeChart from "./GaugeChart";

const MyPortfolioPage = async () => {
  const token = await getJwtToken();

  return (
    <div className="grid grid-cols-10 gap-[20px] max-w-[1200px] mx-auto min-w-[800px] pb-[100px]">
      <div className="col-span-7 flex flex-col gap-main box-content p-[20px] bg-white rounded-main shadow-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
          내 계좌
        </h2>
        <MyAccountChart token={token} />
      </div>

      <div className="col-span-3 gap-main box-content p-[20px] bg-white rounded-main shadow-sm">
        <GaugeChart token={token} />
      </div>

      <div className="col-span-10 grid grid-cols-5 gap-[20px]">
        <div className="col-span-2 box-content p-[20px] bg-white rounded-main shadow-sm">
          <Holidings token={token} />
        </div>

        <div className="col-span-3 relative w-full">
          <div className="sticky top-0 bg-white rounded-main p-[20px] shadow-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
              날짜별 손익
            </h2>
            <ProfitLossCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolioPage;
