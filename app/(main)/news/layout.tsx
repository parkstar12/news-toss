import Footer from "@/components/ui/shared/Footer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "뉴스",
  description: "주식 투자에 설명력을 더해주는 AI 애널리스트 뉴스 페이지",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-[40px] mx-auto">
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
