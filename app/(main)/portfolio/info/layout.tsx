import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 정보",
  description: "주식 투자에 설명력을 더해주는 AI 애널리스트 내 정보 페이지",
};

const PortfolioInfoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[900px] mx-auto">{children}</div>;
};

export default PortfolioInfoLayout;
