import React from "react";
import NewsDetail from "@/components/router/(main)/news/[id]/NewsDetail";
import RelatedStocks from "@/components/router/(main)/news/[id]/RelatedStocks";
import RelatedPastNews from "@/components/router/(main)/news/[id]/RelatedPastNews";
import Related from "@/components/router/(main)/news/[id]/Related";

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

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
  const relativeStocksData = await relativeStocks.json();

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
  const relatedPastNewsData = await relatedPastNews.json();

  return (
    <div className="size-full grid grid-cols-[1fr_1px_1fr] gap-[20px]">
      <NewsDetail newsId={id} />

      <div className="border-l border-main-light-gray h-full" />

      <Related
        relativeStocksData={relativeStocksData}
        relatedPastNewsData={relatedPastNewsData}
      />
    </div>
  );
};

export default NewsDetailPage;
