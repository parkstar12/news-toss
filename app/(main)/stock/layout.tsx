import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "증권",
    template: "NewsToss | %s",
  },
  description: "주식 투자에 설명력을 더해주는 AI 애널리스트 증권 페이지",
};

const StockLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default StockLayout;
