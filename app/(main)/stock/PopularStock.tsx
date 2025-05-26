import { Triangle } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
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
      name: "현대차",
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
    <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">인기 종목</h2>
      <div className="grid grid-cols-3 gap-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => handleClickStock(stock.code)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.code}</div>
              </div>
              <span className="text-main-blue font-medium flex items-center gap-1">
                <Triangle
                  fill="rgb(52, 133, 250)"
                  className="text-main-blue rotate-180"
                  size={12}
                />{" "}
                {stock.change} ({stock.changeRate}%)
              </span>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">72,400</div>
              <div className="text-xs text-gray-500">+800</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularStock;
