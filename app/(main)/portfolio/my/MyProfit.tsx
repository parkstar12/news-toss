import { PortfolioData } from "@/type/portfolio";
import { faker } from "@faker-js/faker";
import clsx from "clsx";
import React from "react";

const MyProfit = ({
  title,
  portfolioData,
}: {
  title: string;
  portfolioData: PortfolioData | null;
}) => {
  const dummyProfit = faker.number.int({ min: -100000, max: 100000 });
  return (
    <div className="size-full flex flex-col gap-main justify-around rounded-main p-main bg-white shadow-sm">
      <h2 className="text-md font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit text-center">
        {title}
      </h2>
      <div>
        <span
          className={clsx(
            "text-xl font-bold",
            dummyProfit > 0 ? "text-main-red" : "text-main-blue"
          )}
        >
          {dummyProfit > 0 ? "+" : ""}
          {dummyProfit.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500 font-semibold"> 원</span>
      </div>
    </div>
  );
};

export default MyProfit;
