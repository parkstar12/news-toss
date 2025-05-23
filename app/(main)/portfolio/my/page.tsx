import React from "react";
import AccountChart from "./AccountChart";
import Holidings from "./Holidings";
import ProfitLossCalendar from "./ProfitLossCalendar";

const MyPortfolioPage = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-main rounded-main">
        <div className="shadow-color rounded-main p-[20px] flex flex-col gap-main">
          <h2 className="text-lg font-bold text-main-dark-gray">당일 손익</h2>
          <div className="flex items-center text-main-red text-xl font-bold">
            <span>+</span>
            <span>100,000원</span>
          </div>
          <div className="flex gap-main items-center text-sm">
            <span className="text-main-dark-gray">전일대비</span>
            <div className="flex items-center text-main-red">
              <span>+</span>
              <span>100,000원</span>
            </div>
          </div>
        </div>
        <div className="shadow-color rounded-main p-[20px] flex flex-col gap-main">
          <h2 className="text-lg font-bold text-main-dark-gray">
            월 누적 손익
          </h2>
          <div className="flex items-center text-main-blue text-xl font-bold">
            <span>-</span>
            <span>100,000원</span>
          </div>
          <div className="flex gap-main items-center text-sm">
            <span className="text-main-dark-gray">전월 대비</span>
            <div className="flex items-center text-main-blue">
              <span>-</span>
              <span>100,000원</span>
            </div>
          </div>
        </div>
        <div className="shadow-color rounded-main p-[20px] flex flex-col gap-main">
          <h2 className="text-lg font-bold text-main-dark-gray">
            총 누적 손익
          </h2>
          <div className="flex items-center text-main-red text-xl font-bold">
            <span>+</span>
            <span>100,000원</span>
          </div>
        </div>
        <div className="col-span-3 shadow-color rounded-main p-[20px] flex flex-col gap-main w-full">
          <span className="text-xl font-bold">100,000원</span>
          <p className="text-sm flex items-center gap-main">
            <span className="text-main-dark-gray">지난주보다</span>
            <span className="text-main-red">+321,203원 (+2.3%)</span>
          </p>
          <AccountChart />
        </div>
        <div className="col-span-3 shadow-color rounded-main p-[20px] flex flex-col gap-main w-full">
          <Holidings />
        </div>
        <div className="col-span-3 shadow-color rounded-main p-[20px] flex flex-col gap-main w-full">
          <h2 className="text-lg font-bold text-main-dark-gray">날짜별 손익</h2>
          <ProfitLossCalendar />
        </div>
      </div>
    </>
  );
};

export default MyPortfolioPage;
