import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오 비교 분석",
  description:
    "주식 투자에 설명력을 더해주는 AI 애널리스트 포트폴리오 비교 분석 페이지",
};

const PortfolioCompareLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default PortfolioCompareLayout;
