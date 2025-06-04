import React from "react";
import { getJwtToken } from "@/utils/auth";
import NewsDetail from "@/components/router/(main)/news/[id]/NewsDetail";
import Related from "@/components/router/(main)/news/[id]/Related";
import { JwtToken } from "@/type/jwt";
import * as Sentry from "@sentry/nextjs";

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let id: string = "";
  let token: JwtToken | null = null;
  let relativeStocksData: {
    Success: boolean;
    message: string;
    data: [{ stockName: string }];
  } | null = null;
  let relatedPastNewsData: any = null;

  try {
    const paramsObj = await params;
    id = paramsObj.id;
    token = await getJwtToken();

    // 관련 종목 fetch
    const relativeStocks = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/related/stocks?newsId=${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!relativeStocks.ok)
      throw new Error("관련 종목 정보를 불러오지 못했습니다.");
    relativeStocksData = await relativeStocks.json();

    // 관련 뉴스 fetch
    const relatedPastNews = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/related/news?newsId=${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!relatedPastNews.ok)
      throw new Error("관련 뉴스를 불러오지 못했습니다.");
    relatedPastNewsData = await relatedPastNews.json();
  } catch (e: any) {
    Sentry.captureException(e);
  }

  return (
    <div className="size-full grid grid-cols-[1fr_1px_1fr] gap-[20px]">
      <NewsDetail newsId={id} token={token} />

      <div className="border-l border-main-light-gray h-full" />

      <Related
        relativeStocksData={relativeStocksData}
        relatedPastNewsData={relatedPastNewsData}
      />
    </div>
  );
};

export default NewsDetailPage;
