import React from "react";
import CandleChartViewer from "./CandleChartViewer";

const StockDetailPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;

  return (
    <div className="flex flex-col gap-[20px]">
      <div>StockDetailPage {code}</div>
      <div className="grid grid-cols-6 gap-[20px] w-full">
        <div className="col-span-4 h-[500px] rounded-main shadow-color p-[20px]">
          <CandleChartViewer />
        </div>
        <div className="col-span-2 shadow-color rounded-main p-[20px]">
          <h2 className="text-2xl font-bold">종목 정보</h2>
        </div>
        <div className="col-span-3 shadow-color rounded-main p-[20px]">
          <h2 className="text-2xl font-bold">관련 뉴스</h2>
        </div>
        <div className="col-span-3 shadow-color rounded-main p-[20px]">
          <h2 className="text-2xl font-bold">예측가</h2>
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;
