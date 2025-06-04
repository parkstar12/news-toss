import React from "react";
import CandleChartViewer from "@/components/router/(main)/stock/[code]/CandleChartViewer";
import StockHeader from "@/components/router/(main)/stock/[code]/StockHeader";

const StockDetailPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;

  // 종목 검색 count 증가
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/stocks/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stockCode: code,
    }),
  });

  return (
    <div className="flex flex-col gap-[20px]">
      <StockHeader code={code} />
      <div className="grid grid-cols-3 gap-[20px] w-full">
        <div className="col-span-3 h-[600px]">
          <CandleChartViewer code={code} />
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;
