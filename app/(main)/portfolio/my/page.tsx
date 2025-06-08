import React from "react";
import AccountChart from "@/components/router/(main)/portfolio/my/AccountChart";
import Holidings from "@/components/router/(main)/portfolio/my/Holidings";
import ProfitLossCalendar from "@/components/router/(main)/portfolio/my/ProfitLossCalendar";
import MyAccountChart from "./MyAccountChart";
import { getJwtToken } from "@/utils/auth";
import { redirect } from "next/navigation";
import MyProfit from "./MyProfit";
import { PortfolioData } from "@/type/portfolio";
import GaugeChart from "./GaugeChart";

const MyPortfolioPage = async () => {
  const token = await getJwtToken();
  let portfolioData = null;

  // const portfolioRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/v1/portfolios/${token!.memberId}`,
  //   {
  //     credentials: "include",
  //   }
  // );

  // if (portfolioRes.ok) {
  //   const portfolioJson: PortfolioData = await portfolioRes.json();
  //   portfolioData = portfolioJson;
  // }
  console.log("portfolioData", portfolioData);

  return (
    <div className="grid grid-cols-6 gap-[20px] max-w-[1200px] mx-auto min-w-[800px]">
      <div className="col-span-3 flex flex-col gap-main box-content p-[20px] bg-white rounded-main shadow-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">
          내 계좌
        </h2>
        <MyAccountChart portfolioData={portfolioData} />
      </div>

      <div className="col-span-2 gap-main box-content p-[20px] bg-white rounded-main shadow-sm">
        <GaugeChart value={90} /> {/* 10%, 25%, 50%, 75%, 100% */}
      </div>

      <div className="grid grid-rows-3 gap-main">
        <MyProfit title="당일 손익" portfolioData={portfolioData} />
        <MyProfit title="월 누적 손익" portfolioData={portfolioData} />
        <MyProfit title="총 누적 손익" portfolioData={portfolioData} />
      </div>

      <div className="col-span-6 grid grid-cols-5 gap-[20px]">
        <div className="col-span-2 box-content p-[20px] bg-white rounded-main shadow-sm">
          <Holidings />
        </div>

        <div className="col-span-3 relative w-full">
          <div className="sticky top-0 bg-white rounded-main p-[20px] shadow-sm">
            <ProfitLossCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolioPage;
