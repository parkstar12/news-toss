import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 포트폴리오 분석",
  description:
    "주식 투자에 설명력을 더해주는 AI 애널리스트 내 포트폴리오 분석 페이지",
};

const PortfolioAnalysisLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="max-w-[900px] mx-auto">{children}</div>;
};

export default PortfolioAnalysisLayout;
