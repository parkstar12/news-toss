import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/detail?newsId=${id}`
  );
  const data = await res.json();
  const title = data.data.title;

  return {
    title: `NewsToss | ${title}`,
    description: "주식 투자에 설명력을 더해주는 AI 애널리스트 뉴스 상세 페이지",
  };
}

const NewsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1600px] mx-auto">{children}</div>;
};

export default NewsDetailLayout;
