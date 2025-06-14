import MainNews from "@/components/router/(main)/news/MainNews";
import CustomNews from "@/components/router/(main)/news/CustomNews";
import AllNews from "@/components/router/(main)/news/AllNews";
import { getJwtToken } from "@/utils/auth";
import { HighlightNews, News } from "@/type/news";
import RealTime from "@/components/router/(main)/news/RealTime";

const HomePage = async () => {
  const highlightRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/highlight/redis`,
    {
      next: { revalidate: 60 }, // ISR 적용
    }
  );
  const highlightJson = await highlightRes.json();
  const highlightNews: HighlightNews[] = highlightJson.data;

  const allNewsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/all?skip=0&limit=30`,
    {
      next: { revalidate: 60 }, // ISR 적용
    }
  );
  const allInitialNewsJson = await allNewsRes.json();
  const allInitialNews: News[] = allInitialNewsJson.data;

  return (
    <div className="grid gap-main max-w-[1000px] mx-auto">
      <div className="p-main">
        <MainNews news={highlightNews} />
      </div>

      <div className="absolute top-0 left-0 max-w-[300px] max-h-[50vh] overflow-y-scroll">
        <RealTime />
      </div>

      {/* <div className="p-main">
        <CustomNews token={token} />
      </div> */}

      <div className="p-main">
        <AllNews initialNews={allInitialNews} />
      </div>
    </div>
  );
};

export default HomePage;
