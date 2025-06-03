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
    <>
      <div className="flex flex-col gap-main">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-main-dark-gray">보유 종목</h2>
          <button
            className="bg-main-blue text-white px-4 py-2 rounded-main text-sm flex items-center gap-[5px]"
            onClick={() => setIsOpenAddHoldingModal(true)}
          >
            <Plus size={16} /> <span>보유 종목 추가</span>
          </button>
        </div>
        {holidings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] bg-white shadow-color border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold rounded-l-main">
                    종목명
                  </th>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    투자자금
                  </th>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    수량
                  </th>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    수익
                  </th>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    수익률
                  </th>
                  <th className="px-4 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold rounded-r-main"></th>
                </tr>
              </thead>
              <tbody>
                {holidings.map((h) => (
                  <tr
                    key={h.code}
                    className="border-b hover:bg-main-blue/10 transition"
                  >
                    <td className="px-4 py-2 font-medium rounded-l-main ">
                      {h.name}{" "}
                      <span className="text-xs text-main-dark-gray">
                        {h.code}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {h.capital.toLocaleString()}원
                    </td>
                    <td className="px-4 py-2 text-center">{h.quantity}</td>
                    <td
                      className={clsx(
                        "px-4 py-2 text-center",
                        h.profit >= 0 ? "text-main-red" : "text-main-blue"
                      )}
                    >
                      {h.profit.toLocaleString()}원
                    </td>
                    <td
                      className={clsx(
                        "px-4 py-2 text-center",
                        h.profitRate >= 0 ? "text-main-red" : "text-main-blue"
                      )}
                    >
                      {h.profitRate}%
                    </td>
                    <td className="px-4 py-2 text-center rounded-r-main">
                      <button
                        className="bg-main-blue/20 text-main-blue px-4 py-2 rounded-main text-sm"
                        onClick={() => openSettlementModal(h)}
                      >
                        청산
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-[50px] flex flex-col gap-[5px]] items-center">
            <span className="text-main-dark-gray">
              보유종목이 존재하지 않습니다.
            </span>
            <span className="text-main-dark-gray">
              상단의 추가 버튼을 통해 종목을 추가해 주세요
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
    </>
  );
};

export default Holidings;
