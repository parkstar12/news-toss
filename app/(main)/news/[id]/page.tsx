import React from "react";
import { getJwtToken } from "@/utils/auth";
import NewsDetail from "@/components/router/(main)/news/[id]/NewsDetail";
import RelatedNews from "./RelatedNews";
import * as Sentry from "@sentry/nextjs";
import { MetaData, News } from "@/type/news";
import MetaDataNews from "./MetaDataNews";
import { StockSearchResult } from "@/type/stocks/StockSearchResult";

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: newsId } = await params;
  const token = await getJwtToken();

  const newsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/detail?newsId=${newsId}`,
    {
      next: { revalidate: 60 },
    }
  );
  const newsJson: { data: News } = await newsRes.json();

  const relatedNewsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/related/news?newsId=${newsId}`,
    {
      next: { revalidate: 60 },
    }
  );
  const relatedNewsJson: { data: News[] } = await relatedNewsRes.json();

  const metaDataRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/meta?newsId=${newsId}`,
    {
      next: { revalidate: 60 },
    }
  );
  const metaDataJson: { data: MetaData } = await metaDataRes.json();

  console.log("메타데이터", metaDataJson.data);

  const stockList = [];

  if (metaDataJson.data.stockListView.length !== 0) {
    for (const stock of metaDataJson.data.stockListView) {
      const stockListRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/stocks/search?keyword=${stock.stock_id}`,
        {
          next: { revalidate: 60 },
        }
      );
      const stockListJson: { data: StockSearchResult[] } =
        await stockListRes.json();
      stockList.push(stockListJson.data[0]);
    }
  }

  return (
    <div className="size-full grid grid-cols-[1fr_1px_1.5fr] gap-[20px]">
      <NewsDetail news={newsJson.data} token={token} newsId={newsId} />

      <div className="border-l border-main-light-gray h-full" />

      <div className="relative">
        <div className="flex flex-col gap-[20px] sticky top-0">
          <MetaDataNews metaData={metaDataJson.data} stockList={stockList} />
          <RelatedNews relatedNews={relatedNewsJson.data} />
        </div>
      </div>

      {/* <Related
        relativeStocksData={relativeStocksData}
        relatedPastNewsData={relatedPastNewsData}
      /> */}
    </div>
  );
};

export default NewsDetailPage;
