import MainNews from "@/components/router/(main)/news/MainNews";
import CustomNews from "@/components/router/(main)/news/CustomNews";
import AllNews from "@/components/router/(main)/news/AllNews";
import { getJwtToken } from "@/utils/auth";

const HomePage = async () => {
  const token = await getJwtToken();

  return (
    <div className="flex flex-col gap-[40px] max-w-[1000px] mx-auto">
      <MainNews />
      <CustomNews token={token} />
      <AllNews token={token} />
    </div>
  );
};

export default HomePage;
