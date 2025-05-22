import { Search, Triangle } from "lucide-react";
import React from "react";
import KOSPIChart from "./KOSPIChart";
import KOSDAQChart from "./KOSDAQChart";

const page = () => {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="종목명 또는 코드를 입력하세요"
          className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <KOSPIChart />

        <KOSDAQChart />
      </div>

      <div className="popular bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">인기 종목</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">삼성전자</div>
                <div className="text-sm text-gray-500">005930</div>
              </div>
              <div className="text-red-500 font-medium flex items-center">
                <Triangle className="text-main-red rotate-180" /> 1.2%
              </div>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">72,400</div>
              <div className="text-xs text-gray-500">+800</div>
            </div>
          </div>

          <div className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">SK하이닉스</div>
                <div className="text-sm text-gray-500">000660</div>
              </div>
              <div className="text-red-500 font-medium flex items-center">
                <Triangle className="text-main-red rotate-180" /> 2.8%
              </div>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">134,500</div>
              <div className="text-xs text-gray-500">+3,600</div>
            </div>
          </div>

          <div className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">LG에너지솔루션</div>
                <div className="text-sm text-gray-500">373220</div>
              </div>
              <div className="text-blue-500 font-medium flex items-center">
                <Triangle className="text-red-500" /> 0.7%
              </div>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">458,000</div>
              <div className="text-xs text-gray-500">-3,200</div>
            </div>
          </div>

          <div className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">셀트리온</div>
                <div className="text-sm text-gray-500">068270</div>
              </div>
              <div className="text-red-500 font-medium flex items-center">
                <Triangle className="text-main-red rotate-180" /> 3.5%
              </div>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">178,900</div>
              <div className="text-xs text-gray-500">+6,000</div>
            </div>
          </div>

          <div className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">카카오</div>
                <div className="text-sm text-gray-500">035720</div>
              </div>
              <div className="text-blue-500 font-medium flex items-center">
                <Triangle className="text-red-500" /> 1.2%
              </div>
            </div>
            <div className="mt-3 flex justify-between items-end">
              <div className="text-xl font-bold">52,700</div>
              <div className="text-xs text-gray-500">-600</div>
            </div>
          </div>
        </div>
      </div>

      <div className="categories bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          카테고리별 종목
        </h2>

        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">
            전체
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            반도체
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            바이오
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            IT
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            금융
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            자동차
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            에너지
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 whitespace-nowrap">
            제조
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  종목명
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  현재가
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  전일비
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  등락률
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  거래량
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  시가총액
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">S</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        삼성전자
                      </div>
                      <div className="text-sm text-gray-500">005930</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  72,400
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  +800
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  1.12%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12.4M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  432.7조
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">S</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        SK하이닉스
                      </div>
                      <div className="text-sm text-gray-500">000660</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  134,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  +3,600
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  2.75%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3.2M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  98.3조
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">L</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        LG에너지솔루션
                      </div>
                      <div className="text-sm text-gray-500">373220</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  458,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-medium">
                  -3,200
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-medium">
                  0.69%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.8M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  112.4조
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">C</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        셀트리온
                      </div>
                      <div className="text-sm text-gray-500">068270</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  178,900
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  +6,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  3.47%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.2M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  73.5조
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">K</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        카카오
                      </div>
                      <div className="text-sm text-gray-500">035720</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  52,700
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-medium">
                  -600
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-medium">
                  1.13%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.7M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  23.8조
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
