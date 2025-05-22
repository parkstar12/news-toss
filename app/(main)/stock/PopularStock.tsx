import { Triangle } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
const PopularStock = () => {
  const router = useRouter();

  const handleClickStock = (code: string) => {
    router.push(`/stock/${code}`);
  };
  return (
    <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">인기 종목</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => handleClickStock("123456")}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">삼성전자</div>
                <div className="text-sm text-gray-500">005930</div>
              </div>
              <span className="text-main-blue font-medium flex items-center gap-1">
                <Triangle
                  fill="rgb(52, 133, 250)"
                  className="text-main-blue rotate-180"
                  size={12}
                />{" "}
                5.32 (0.63%)
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
