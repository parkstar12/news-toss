import MainNews from "./MainNews";
import CustomNews from "./CustomNews";
import AllNews from "./AllNews";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[40px]">
      <MainNews />
      <CustomNews />
      <AllNews />
    </div>
  );
};

export default HomePage;
