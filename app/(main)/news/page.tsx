import MainNews from "@/components/router/(main)/news/MainNews";
import CustomNews from "@/components/router/(main)/news/CustomNews";
import AllNews from "@/components/router/(main)/news/AllNews";
import { getJwtToken } from "@/utils/auth";
import RealTimeNews from "@/components/router/(main)/news/RealTimeNews";

const HomePage = async () => {
  const token = await getJwtToken();

  return (
    <div className="grid grid-cols-4 gap-main max-w-[1300px] mx-auto">
      <div className="col-span-3 p-main">
        <MainNews />
      </div>
      <div className="row-span-3 relative p-main">
        <RealTimeNews />
      </div>

      <div className="col-span-3 p-main">
        <CustomNews token={token} />
      </div>

      <div className="col-span-3 p-main">
        <AllNews token={token} />
      </div>
    </div>
  );
};

export default HomePage;
