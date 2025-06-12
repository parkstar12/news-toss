import MainNews from "@/components/router/(main)/news/MainNews";
import CustomNews from "@/components/router/(main)/news/CustomNews";
import AllNews from "@/components/router/(main)/news/AllNews";
import { getJwtToken } from "@/utils/auth";
import RealTimeNews from "@/components/router/(main)/news/RealTimeNews";
import { News } from "@/type/news";

const HomePage = async () => {
  const token = await getJwtToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/v2/top10`, {
    next: { revalidate: 60 }, // ISR 적용
  });
  const json = await res.json();
  const news: News[] = json.data;

  return (
    <div className="grid gap-main max-w-[1000px] mx-auto relative">
      <div className="p-main">
        <MainNews news={news} />
      </div>

      {/* <div className="row-span-3 relative p-main">
        <div className="row-span-2 flex flex-col gap-main sticky top-0">
          <RealTimeNews />
        </div>
      </div> */}

      <div className="p-main">
        <CustomNews token={token} />
      </div>

      <div className="p-main">
        <AllNews token={token} />
      </div>
    </div>
  );
};

export default HomePage;
