import MainNews from "@/components/router/(main)/news/MainNews";
import CustomNews from "@/components/router/(main)/news/CustomNews";
import AllNews from "@/components/router/(main)/news/AllNews";
import { getJwtToken } from "@/utils/auth";
import { HighlightNews, News } from "@/type/news";
import RealTime from "@/components/router/(main)/news/RealTime";

const HomePage = async () => {
  const token = await getJwtToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/highlight/redis`,
    {
      next: { revalidate: 60 }, // ISR 적용
    }
  );
  const json = await res.json();
  const news: HighlightNews[] = json.data;

  return (
    <div className="grid gap-main max-w-[1000px] mx-auto">
      <div className="p-main">
        <MainNews news={news} />
      </div>

      <div className="absolute top-0 left-0 max-w-[300px] max-h-[50vh] overflow-y-scroll">
        <RealTime />
      </div>

      {/* <div className="p-main">
        <CustomNews token={token} />
      </div> */}

      <div className="p-main">
        <AllNews token={token} />
      </div>
    </div>
  );
};

export default HomePage;
