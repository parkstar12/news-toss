import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  let stockName = "";

  // 코드로 종목명 가져오는 코드
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/search?keyword=${code}`
  );
  const data: {
    data: {
      stockName: string;
    }[];
  } = await res.json();

  if (res.ok) {
    stockName = data.data[0].stockName;
  }

  return {
    title: `${stockName}`,
    description: `${stockName} 주식 정보`,
  };
}

const StockDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-[100px]">{children}</div>;
};

export default StockDetailLayout;
