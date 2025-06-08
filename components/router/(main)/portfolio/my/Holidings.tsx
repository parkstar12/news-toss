"use client";

import React, { useState } from "react";
import { holdings as dummyHoldings } from "./dummyHoldings";
import clsx from "clsx";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/shared/Input";

const SettlementModal = Modal;
const AddHoldingModal = Modal;

interface Holding {
  name: string;
  code: string;
  capital: number;
  quantity: number;
  profit: number;
  profitRate: number;
}

const Holidings = () => {
  const [holidings, setHolidings] = useState<Holding[]>(dummyHoldings);
  const [isOpenSettlementModal, setIsOpenSettlementModal] = useState(false);
  const [isOpenAddHoldingModal, setIsOpenAddHoldingModal] = useState(false);
  const [selectedHoldings, setSelectedHoldings] = useState<Holding | null>(
    null
  );
  const [settleQuantity, setSettleQuantity] = useState(1);

  const openSettlementModal = (h: Holding) => {
    setSelectedHoldings(h);
    setSettleQuantity(h.quantity);
    setIsOpenSettlementModal(true);
  };

  return (
    <div className="size-full flex flex-col gap-main">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent">
          보유 종목
        </h2>
        <button
          className="bg-main-blue text-white px-4 py-2 rounded-main text-sm flex items-center gap-[5px]"
          onClick={() => setIsOpenAddHoldingModal(true)}
        >
          <Plus size={16} /> <span>보유 종목 추가</span>
        </button>
      </div>
      <div className="grid grid-cols-1 overflow-y-auto flex-1 p-main gap-main">
        {holidings.length > 0 ? (
          [...holidings, ...holidings].map((h, index) => (
            <div
              key={index}
              className="rounded-main p-4 bg-white flex flex-col gap-main hover:scale-102 hover:border-main-blue/20 border border-transparent duration-200 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-[5px] items-baseline">
                  <p className="text-lg font-bold text-gray-800">{h.name}</p>
                  <p className="text-sm text-gray-500">{h.code}</p>
                </div>

                <button
                  className="px-3 py-1 text-sm rounded-full bg-main-blue/20 text-main-blue hover:bg-main-blue/30 font-semibold"
                  onClick={() => openSettlementModal(h)}
                >
                  청산
                </button>
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
          ))
        ) : (
          <div className="text-center text-gray-400 py-[50px] flex flex-col gap-[5px]] items-center">
            <span className="text-main-dark-gray">
              보유종목이 존재하지 않습니다.
            </span>
          </div>
        )}
      </div>

      {selectedHoldings && (
        <SettlementModal
          isOpen={isOpenSettlementModal}
          onClose={() => setIsOpenSettlementModal(false)}
          hasCloseButton={false}
          isClickOutsideClose={false}
        >
          <div className="flex flex-col gap-main px-main">
            <h2 className="text-lg font-bold text-main-dark-gray">
              몇 개를 청산하실건가요?
            </h2>
            <Input
              type="number"
              placeholder="청산할 종목 수량"
              value={settleQuantity}
              min={1}
              max={selectedHoldings?.quantity ?? 1}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 1) value = 1;
                if (value > (selectedHoldings?.quantity ?? 1))
                  value = selectedHoldings?.quantity ?? 1;
                setSettleQuantity(value);
              }}
            />
            <div className="flex justify-end gap-main">
              <button
                className="bg-main-blue/20 text-main-blue px-4 py-2 rounded-main text-sm"
                onClick={() => setIsOpenSettlementModal(false)}
              >
                취소
              </button>
              <button
                className="bg-main-blue text-white px-4 py-2 rounded-main text-sm"
                onClick={() => {
                  setHolidings((prev) =>
                    prev
                      .map((h) =>
                        h.code === selectedHoldings.code
                          ? { ...h, quantity: h.quantity - settleQuantity }
                          : h
                      )
                      .filter((h) => h.quantity > 0)
                  );
                  setIsOpenSettlementModal(false);
                }}
              >
                청산
              </button>
            </div>
          </div>
        </SettlementModal>
      )}

      <AddHoldingModal
        isOpen={isOpenAddHoldingModal}
        onClose={() => setIsOpenAddHoldingModal(false)}
      >
        <div className="flex flex-col gap-main px-main">
          <h2 className="text-lg font-bold text-main-dark-gray">
            보유 종목 추가
          </h2>
        </div>
      </AddHoldingModal>
    </div>
  );
};

export default Holidings;
