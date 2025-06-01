import MainNews from "./MainNews";
import CustomNews from "./CustomNews";
import AllNews from "./AllNews";
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
