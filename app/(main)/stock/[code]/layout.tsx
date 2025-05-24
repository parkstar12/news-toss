import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const stockName = "삼성전자";
  // 코드로 종목명 가져오는 코드

  return {
    title: `${code} ${stockName}`,
    description: `${stockName} 주식 정보`,
  };
}

const StockDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-[100px]">{children}</div>;
};

export default StockDetailLayout;
