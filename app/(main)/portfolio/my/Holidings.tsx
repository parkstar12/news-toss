"use client";

import React, { useEffect, useState } from "react";
import { holdings as dummyHoldings } from "./dummyHoldings";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/shared/Input";
import { PortfolioData } from "@/type/portfolio";
import SearchStock from "@/components/ui/SearchStock";
import { JwtToken } from "@/type/jwt";
import { toast } from "react-toastify";
import clsx from "clsx";
import Image from "next/image";

const SettlementModal = Modal;
const AddHoldingModal = Modal;

interface Holding {
  stockName: string;
  stockCode: string;
  stockCount: number;
  entryPrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossRate: number;
}

interface SearchResult {
  changeAmount: string;
  changeRate: string;
  currentPrice: string;
  sign: string;
  stockCode: string;
  stockName: string;
  quantity: number;
  stockImage: string;
}

const Holidings = ({
  portfolioData,
  token,
}: {
  portfolioData: PortfolioData | null;
  token: JwtToken | null;
}) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isOpenAddHoldingModal, setIsOpenAddHoldingModal] = useState(false);
  const [selectedHoldings, setSelectedHoldings] = useState<
    | (Holding & {
        changeType: "buy" | "sell";
        changePrice: number;
        changeCount: number;
      })
    | null
  >(null);
  const [searchStockResult, setSearchStockResult] = useState<SearchResult[]>(
    []
  );
  const [isOpenSettlementModal, setIsOpenSettlementModal] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchHoldings = async () => {
      const res = await fetch(`/api/v1/portfolios/${token.memberId}`, {
        method: "GET",
      });

      if (res.status === 404) {
        setHoldings([]);
        console.log("404");
        return;
      }

      if (!res.ok) {
        console.error("Failed to get holdings", res);
        setHoldings([]);
        toast.error("보유 종목 조회에 실패했습니다.");
        return;
      }

      const json: {
        data: {
          totalPnl: number;
          portfolioStocksResponseDto: {
            stockName: string;
            stockCode: string;
            stockCount: number;
            entryPrice: number;
            currentPrice: number;
            profitLoss: number;
            profitLossRate: number;
          }[];
        };
      } = await res.json();

      setHoldings(json.data.portfolioStocksResponseDto);
    };

    fetchHoldings();
  }, [token]);

  const openSettlementModal = (h: Holding, changeType: "buy" | "sell") => {
    setSelectedHoldings({
      ...h,
      changeType,
      changePrice: h.currentPrice,
      changeCount: 1,
    });
    setIsOpenSettlementModal(true);
  };

  const handleHoldingSettlement = async () => {
    if (!token) return;
    if (!selectedHoldings) return;

    if (selectedHoldings.changeCount < 1) {
      toast.error("수량을 입력해주세요.");
      return;
    }

    if (selectedHoldings.changePrice < 1) {
      toast.error("가격을 입력해주세요.");
      return;
    }

    if (selectedHoldings.changeType === "sell") {
      if (selectedHoldings.stockCount < selectedHoldings.changeCount) {
        toast.error("보유 수량만큼 청산할 수 있습니다.");
        return;
      }
    }

    // const res = await fetch(
    //   `/api/v1/portfolios/${token.memberId}/${selectedHoldings.stockCode}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       stockCount: selectedHoldings.changeCount,
    //       price: selectedHoldings.currentPrice,
    //       add: selectedHoldings.changeType === "buy",
    //     }),
    //   }
    // );

    // if (!res.ok) {
    //   console.error("Failed to settle holding", res);
    //   selectedHoldings.changeType === "buy"
    //     ? toast.error(`${selectedHoldings.stockName} 매수에 실패했습니다.`)
    //     : toast.error(`${selectedHoldings.stockName} 청산에 실패했습니다.`);

    //   setSelectedHoldings(null);
    //   setIsOpenSettlementModal(false);
    //   return;
    // }

    // toast.success(
    //   selectedHoldings.changeType === "buy"
    //     ? `${selectedHoldings.stockName} 매수에 성공했습니다.`
    //     : `${selectedHoldings.stockName} 청산에 성공했습니다.`
    // );

    // setSelectedHoldings(null);
    // setIsOpenSettlementModal(false);
    console.log(selectedHoldings);
  };

  const handleAddHolding = async () => {
    if (!token) return;

    if (holdings.some((h) => h.stockCode === searchStockResult[0].stockCode)) {
      toast.error("이미 보유 종목에 존재합니다.");
      return;
    }

    if (searchStockResult[0].quantity === 0) {
      toast.error("수량을 입력해주세요.");
      return;
    }

    if (Number(searchStockResult[0].currentPrice) === 0) {
      toast.error("구매가를 입력해주세요.");
      return;
    }

    for (const stock of searchStockResult) {
      const res = await fetch(`/api/v1/portfolios/${token.memberId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock_code: stock.stockCode,
          stock_count: stock.quantity,
          entry_price: stock.currentPrice,
        }),
      });

      if (!res.ok) {
        console.error("Failed to add holding", res);
        toast.error("보유 종목 추가에 실패했습니다.");
        return;
      }
    }

    toast.success("보유 종목 추가에 성공했습니다.");

    setSearchStockResult([]);
    setHoldings((prev) => [
      ...prev,
      ...searchStockResult.map((s) => ({
        stockName: s.stockName,
        stockCode: s.stockCode,
        stockCount: s.quantity,
        entryPrice: Number(s.currentPrice),
        currentPrice: Number(s.currentPrice),
        profitLoss: 0,
        profitLossRate: 0,
      })),
    ]);
    setIsOpenAddHoldingModal(false);
  };

  if (holdings.length === 0) {
    return (
      <>
        <div className="size-full flex flex-col gap-main">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
              보유 종목
            </h2>
            <button
              id="add-holding"
              className="bg-main-blue text-white px-4 py-2 rounded-main text-sm flex items-center gap-[5px]"
              onClick={() => {
                setIsOpenAddHoldingModal(true);
                console.log("add holding modal open");
              }}
            >
              <Plus size={16} /> <span>보유 종목 추가</span>
            </button>
          </div>
          <div className="relative size-full">
            <div className="absolute inset-0 bg-white/50 z-20 size-full flex items-center justify-center">
              <span className="text-main-dark-gray font-semibold">
                보유 종목이 존재하지 않습니다.
              </span>
            </div>

            <div className="grid grid-cols-1 overflow-y-auto flex-1 p-main gap-main">
              {dummyHoldings.slice(0, 3).map((h, index) => (
                <div
                  key={`dummy-${index}`}
                  className="rounded-main p-4 bg-white flex flex-col gap-main hover:scale-102 hover:border-main-blue/20 border border-transparent duration-200 ease-in-out"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-[5px] items-baseline">
                      <p className="text-lg font-bold text-gray-800">
                        {h.name}
                      </p>
                      <p className="text-sm text-gray-500">{h.code}</p>
                    </div>

                    <div className="flex gap-main">
                      <button
                        className="px-3 py-1 text-sm rounded-full bg-main-blue/20 text-main-blue hover:bg-main-blue/30 font-semibold"
                        // onClick={() => openSettlementModal(h)}
                      >
                        매수
                      </button>
                      <button
                        className="px-3 py-1 text-sm rounded-full bg-main-red/20 text-main-red hover:bg-main-red/30 font-semibold"
                        // onClick={() => openSettlementModal(h)}
                      >
                        청산
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-[20px] text-sm text-gray-700">
                    <div className="flex justify-between gap-main">
                      <span className="text-main-dark-gray">투자금</span>
                      <span className="font-medium">
                        {h.capital.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between gap-main">
                      <span className="text-main-dark-gray">수량</span>
                      <span className="font-medium">{h.quantity}주</span>
                    </div>
                    <div className="flex justify-between gap-main">
                      <span className="text-main-dark-gray">수익</span>
                      <span className="font-medium text-main-red">
                        {h.profit.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between gap-main">
                      <span className="text-main-dark-gray">수익률</span>
                      <span className="font-medium text-main-red">
                        {h.profitRate.toLocaleString()}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 보유 종목 추가 모달 */}
        <AddHoldingModal
          isOpen={isOpenAddHoldingModal}
          onClose={() => setIsOpenAddHoldingModal(false)}
        >
          <div className="flex flex-col gap-main px-main">
            <h2 className="text-lg font-bold text-main-dark-gray">
              보유 종목 추가
            </h2>

            {searchStockResult.length === 0 && (
              <SearchStock
                onSelect={(stock) => {
                  setSearchStockResult((prev) => {
                    if (prev.some((s) => s.stockCode === stock.stockCode)) {
                      return prev;
                    }
                    return [...prev, { ...stock, quantity: 1 }];
                  });
                }}
              />
            )}

            <div className="grid grid-cols-[1fr_1fr_80px] gap-y-main">
              <span className="text-center font-semibold bg-main-light-gray rounded-l-main py-1">
                종목명
              </span>
              <span className="text-center font-semibold bg-main-light-gray py-1">
                구매가
              </span>
              <span className="text-center font-semibold bg-main-light-gray rounded-r-main py-1">
                수량
              </span>
              {searchStockResult.length === 0 && (
                <div className="col-span-3 text-center text-gray-400 py-[50px] flex items-center justify-center w-[500px]">
                  <span className="text-main-dark-gray">
                    종목을 추가해주세요
                  </span>
                </div>
              )}

              {searchStockResult.map((stock, index) => (
                <React.Fragment key={`add-stock-${stock.stockCode}`}>
                  <div className="flex items-center px-main gap-main">
                    <div className="relative flex items-center justify-center size-[40px] shrink-0">
                      {stock.stockImage ? (
                        <Image
                          src={stock.stockImage}
                          alt={stock.stockName}
                          fill
                          className="rounded-full"
                        />
                      ) : (
                        <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
                          <span className="text-main-blue font-semibold">
                            {stock.stockName[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 items-center">
                      <span>{stock.stockName}</span>
                      <span className="text-gray-500 text-xs">
                        {stock.stockCode}
                      </span>
                    </div>
                  </div>

                  <div className="px-main relative">
                    <Input
                      type="numeric"
                      value={stock.currentPrice}
                      min={1}
                      max={99999999999}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setSearchStockResult((prev) =>
                            prev.map((s) =>
                              s.stockCode === stock.stockCode
                                ? { ...s, currentPrice: value }
                                : s
                            )
                          );
                        }
                      }}
                    />
                    <span className="absolute right-main top-1/2 -translate-y-1/2 text-main-dark-gray">
                      원
                    </span>
                  </div>
                  <div className="px-main relative">
                    <Input
                      type="numeric"
                      value={stock.quantity}
                      min={1}
                      max={1000000}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setSearchStockResult((prev) =>
                            prev.map((s) =>
                              s.stockCode === stock.stockCode
                                ? { ...s, quantity: Number(e.target.value) }
                                : s
                            )
                          );
                        }
                      }}
                    />
                    <span className="absolute right-main top-1/2 -translate-y-1/2 text-main-dark-gray">
                      주
                    </span>
                  </div>
                </React.Fragment>
              ))}

              {searchStockResult.length > 0 && (
                <div className="col-span-3 flex justify-end">
                  <button
                    className="bg-main-blue text-white px-4 py-2 rounded-main"
                    onClick={handleAddHolding}
                  >
                    등록
                  </button>
                </div>
              )}
            </div>
          </div>
        </AddHoldingModal>
      </>
    );
  }

  return (
    <>
      <div className="size-full flex flex-col gap-main">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
            보유 종목
          </h2>
          <button
            id="add-holding"
            className="bg-main-blue/20 text-main-blue px-4 py-2 rounded-main text-sm flex items-center gap-[5px] hover:bg-main-blue/30 transition-colors duration-300 ease-in-out"
            onClick={() => setIsOpenAddHoldingModal(true)}
          >
            <Plus size={16} /> <span>보유 종목 추가</span>
          </button>
        </div>
        <div className="flex flex-col gap-main overflow-y-auto flex-1 p-main">
          {holdings.map((h, index) => (
            <div
              key={index}
              className="rounded-main h-fit p-4 bg-white flex flex-col gap-main hover:scale-102 hover:border-main-blue/20 border border-transparent duration-200 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-[5px] items-baseline">
                  <p className="text-lg font-bold text-gray-800">
                    {h.stockName}
                  </p>
                  <p className="text-sm text-gray-500">{h.stockCode}</p>
                </div>

                <div className="flex gap-main">
                  <button
                    className="px-3 py-1 text-sm rounded-full bg-main-blue/20 text-main-blue hover:bg-main-blue/30 font-semibold transition-colors duration-300 ease-in-out"
                    onClick={() => openSettlementModal(h, "buy")}
                  >
                    매수
                  </button>
                  <button
                    className="px-3 py-1 text-sm rounded-full bg-main-red/20 text-main-red hover:bg-main-red/30 font-semibold transition-colors duration-300 ease-in-out"
                    onClick={() => openSettlementModal(h, "sell")}
                  >
                    청산
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-[20px] text-sm text-gray-700">
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">현재가</span>
                  <span className="font-medium">
                    {h.currentPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">매수평균가</span>
                  <span className="font-medium">
                    {h.entryPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">보유수량</span>
                  <span className="font-medium">
                    {h.stockCount.toLocaleString()}주
                  </span>
                </div>
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">평가금액</span>
                  <span className="font-medium">
                    {(h.stockCount * h.entryPrice).toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">수익</span>
                  <span
                    className={clsx(
                      "font-medium",
                      h.profitLoss > 0 ? "text-main-red" : "text-main-blue"
                    )}
                  >
                    {h.profitLoss > 0 && "+"}
                    {h.profitLoss.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between gap-main">
                  <span className="text-main-dark-gray">수익률</span>
                  <span
                    className={clsx(
                      "font-medium",
                      h.profitLossRate > 0 ? "text-main-red" : "text-main-blue"
                    )}
                  >
                    {h.profitLoss > 0 && "+"}
                    {h.profitLossRate.toLocaleString()}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SettlementModal
        isOpen={isOpenSettlementModal}
        onClose={() => {
          setIsOpenSettlementModal(false);
          setSelectedHoldings(null);
        }}
        hasCloseButton={false}
        isClickOutsideClose={false}
      >
        {selectedHoldings && (
          <div className="flex flex-col gap-main">
            <h2 className="text-xl font-bold text-main-dark-gray mb-main">
              {selectedHoldings.changeType === "buy"
                ? `${selectedHoldings.stockName} 추가 매수`
                : `${selectedHoldings.stockName} 청산`}
            </h2>
            <div className="grid grid-cols-2 gap-main">
              <div className="flex flex-col gap-main">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-main-dark-gray">
                    {selectedHoldings.changeType === "buy" && "구매가"}
                    {selectedHoldings.changeType === "sell" && "판매가"}
                  </label>
                  <div className="relative">
                    <Input
                      type="numeric"
                      value={selectedHoldings.changePrice}
                      min={1}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setSelectedHoldings((prev) => {
                            if (!prev) return null;
                            return { ...prev, changePrice: Number(value) };
                          });
                        }
                      }}
                    />
                    <span className="absolute right-main top-1/2 -translate-y-1/2 text-main-dark-gray">
                      원
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-main-dark-gray">
                  수량 직접 입력 (현재{" "}
                  {
                    holdings.find(
                      (h) => h.stockCode === selectedHoldings.stockCode
                    )?.stockCount
                  }
                  주 보유)
                </label>
                <div className="relative">
                  <Input
                    type="numeric"
                    placeholder={
                      selectedHoldings.changeType === "buy"
                        ? "매수할 수량 입력"
                        : "청산할 수량 입력"
                    }
                    value={selectedHoldings.changeCount}
                    min={1}
                    max={
                      selectedHoldings.changeType === "buy"
                        ? Infinity
                        : selectedHoldings.stockCount
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSelectedHoldings((prev) => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            changeCount: Number(value),
                          };
                        });
                      }
                    }}
                  />
                  <span className="absolute right-main top-1/2 -translate-y-1/2 text-main-dark-gray">
                    주
                  </span>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-3">
                {(selectedHoldings.changeType === "buy"
                  ? [1, 10, 50, 100]
                  : [-1, -10, -50, -100]
                ).map((n) => (
                  <button
                    key={n}
                    className={clsx(
                      "py-2 rounded-full font-semibold text-sm transition-colors",
                      selectedHoldings.changeType === "buy"
                        ? "bg-main-blue/10 text-main-blue hover:bg-main-blue/20"
                        : "bg-main-red/10 text-main-red hover:bg-main-red/20"
                    )}
                    onClick={() => {
                      if (
                        selectedHoldings.changeType === "sell" &&
                        selectedHoldings.stockCount <
                          selectedHoldings.changeCount + Math.abs(n)
                      ) {
                        setSelectedHoldings((prev) => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            changeCount: prev.stockCount,
                          };
                        });

                        toast.error("최대 보유 수량만큼 청산할 수 있습니다.");
                        return;
                      }

                      // if (selectedHoldings.changeCount < 1) {
                      //   setSelectedHoldings((prev) => {
                      //     if (!prev) return null;
                      //     return {
                      //       ...prev,
                      //       type: prev.type,
                      //       changeCount: 1,
                      //     };
                      //   });
                      // }

                      setSelectedHoldings((prev) => {
                        if (!prev) return null;

                        return {
                          ...prev,
                          changeType: prev.changeType,
                          changeCount: prev.changeCount + Math.abs(n),
                        };
                      });
                    }}
                  >
                    {n > 0 ? `+${n}주` : `${n}주`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-4 py-2 rounded-main text-sm font-medium text-main-dark-gray hover:bg-main-dark-gray/10 transition-colors"
                onClick={() => {
                  setIsOpenSettlementModal(false);
                  setSelectedHoldings(null);
                }}
              >
                취소
              </button>
              <button
                className={clsx(
                  "px-4 py-2 rounded-main text-sm font-medium text-white transition-colors",
                  selectedHoldings.changeType === "buy"
                    ? "bg-main-blue hover:bg-main-blue/80"
                    : "bg-main-red hover:bg-main-red/80"
                )}
                onClick={handleHoldingSettlement}
              >
                {selectedHoldings.changeType === "buy" ? "매수" : "청산"}
              </button>
            </div>
          </div>
        )}
      </SettlementModal>

      <AddHoldingModal
        isOpen={isOpenAddHoldingModal}
        onClose={() => setIsOpenAddHoldingModal(false)}
      >
        <div className="flex flex-col gap-main px-main">
          <h2 className="text-lg font-bold text-main-dark-gray">
            보유 종목 추가
          </h2>

          {searchStockResult.length === 0 && (
            <SearchStock
              onSelect={(stock) => {
                setSearchStockResult((prev) => {
                  if (prev.some((s) => s.stockCode === stock.stockCode)) {
                    return prev;
                  }
                  return [...prev, { ...stock, quantity: 1 }];
                });
              }}
            />
          )}

          <div className="grid grid-cols-[1fr_1fr_80px] gap-y-main">
            <span className="text-center font-semibold bg-main-light-gray rounded-l-main py-1">
              종목명
            </span>
            <span className="text-center font-semibold bg-main-light-gray py-1">
              구매가
            </span>
            <span className="text-center font-semibold bg-main-light-gray rounded-r-main py-1">
              수량
            </span>
            {searchStockResult.length === 0 && (
              <div className="col-span-3 text-center text-gray-400 py-[50px] flex items-center justify-center w-[500px]">
                <span className="text-main-dark-gray">종목을 추가해주세요</span>
              </div>
            )}

            {searchStockResult.map((stock, index) => (
              <React.Fragment key={`add-stock-${stock.stockCode}`}>
                <div className="flex items-center px-main gap-main">
                  <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
                    <span className="text-main-blue font-semibold">
                      {stock.stockName[0]}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>{stock.stockName}</span>
                    <span className="text-gray-500 text-xs">
                      {stock.stockCode}
                    </span>
                  </div>
                </div>

                <div className="px-main">
                  <Input
                    type="numeric"
                    value={stock.currentPrice}
                    min={1}
                    max={99999999999}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSearchStockResult((prev) =>
                          prev.map((s) =>
                            s.stockCode === stock.stockCode
                              ? { ...s, currentPrice: value }
                              : s
                          )
                        );
                      }
                    }}
                  />
                </div>
                <div className="px-main">
                  <Input
                    type="numeric"
                    value={stock.quantity}
                    min={1}
                    max={1000000}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSearchStockResult((prev) =>
                          prev.map((s) =>
                            s.stockCode === stock.stockCode
                              ? { ...s, quantity: Number(e.target.value) }
                              : s
                          )
                        );
                      }
                    }}
                  />
                </div>
              </React.Fragment>
            ))}

            {searchStockResult.length > 0 && (
              <div className="col-span-3 flex gap-main justify-end">
                <button
                  className="bg-main-blue/20 text-main-blue px-4 py-2 rounded-main"
                  onClick={() => setSearchStockResult([])}
                >
                  초기화
                </button>
                <button
                  className="bg-main-blue text-white px-4 py-2 rounded-main"
                  onClick={handleAddHolding}
                >
                  등록
                </button>
              </div>
            )}
          </div>
        </div>
      </AddHoldingModal>
    </>
  );
};

export default Holidings;
