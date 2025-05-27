import { Triangle } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import UpPrice from "@/components/ui/shared/DownPrice";
const PopularStock = () => {
  const router = useRouter();

  const handleClickStock = (code: string) => {
    router.push(`/stock/${code}`);
  };

  const stocks = [
    {
      name: "삼성전자",
      code: "005930",
      price: 72400,
      change: 800,
      changeRate: 1.12,
    },
    {
      name: "SK하이닉스",
      code: "000660",
      price: 162300,
      change: -1200,
      changeRate: -0.74,
    },
    {
      name: "LG에너지솔루션",
      code: "373220",
      price: 379000,
      change: 2000,
      changeRate: 0.53,
    },
    {
      name: "삼성바이오로직스",
      code: "207940",
      price: 780000,
      change: 8500,
      changeRate: 1.1,
    },
    {
      name: "현대차adsfasdfsafasdfasfsasfㅋㅋㅋ",
      code: "005380",
      price: 243000,
      change: -3000,
      changeRate: -1.22,
    },
    {
      name: "포스코홀딩스",
      code: "005490",
      price: 495000,
      change: 6000,
      changeRate: 1.23,
    },
  ];

  return (
    <div className="col-span-2 p-main mb-[20px]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">인기 종목</h2>
      <div className="grid grid-cols-3 gap-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => handleClickStock(stock.code)}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="bg-black rounded-full size-[40px] shrink-0" />
              <div className="flex flex-col flex-1 truncate">
                <span className="font-bold text-gray-800 truncate w-full">
                  {stock.name}
                </span>
                <span className="text-sm text-gray-500">{stock.code}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">72,400</div>
              <UpPrice change={stock.change} changeRate={stock.changeRate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularStock;
