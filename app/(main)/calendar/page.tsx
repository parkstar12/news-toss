"use client";

import React, { useRef, useState, useEffect } from "react";
import Calendar from "@/components/ui/Calendar";
import { ArrowDown, CalendarFold } from "lucide-react";
import clsx from "clsx";

export type DatePiece = Date | null;

export type Card = {
  id: number;
  date: Date;
  title: string;
  desc: string;
  location: string;
  time: string;
  market: "KOSPI" | "KOSDAQ";
};

export type CardGroup = {
  date: Date;
  cards: Card[];
};

// 날짜별 여러 카드가 있는 예시 데이터
const cardGroups: CardGroup[] = Array.from({ length: 80 }).map(
  (_, groupIdx) => {
    const date = new Date();
    date.setDate(date.getDate() - groupIdx);

    // 각 날짜마다 2개의 카드 예시
    const cards: Card[] = Array.from({ length: 7 }).map((_, cardIdx) => ({
      id: groupIdx * 10 + cardIdx,
      date,
      title: `CJ ENM ${groupIdx + 1}-${
        cardIdx + 1
      } test test test test test test test test`,
      desc: `실적발표 IR 미팅 실시 ${groupIdx + 1}-${
        cardIdx + 1
      } test test test test test test  test test`,
      location: "서울 여의도",
      time: `1${cardIdx}:00`,
      market: cardIdx % 2 === 0 ? "KOSPI" : "KOSDAQ",
    }));

    return { date, cards };
  }
);

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    cardGroups[0].date
  );

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date()
  );

  useEffect(() => {
    setPage(1);
  }, [selectedDate]);

  const selectedGroup = cardGroups.find((group) =>
    isSameDay(group.date, selectedDate)
  );
  const selectedIndex = cardGroups.findIndex((group) =>
    isSameDay(group.date, selectedDate)
  );

  const minDate = cardGroups[cardGroups.length - 1].date;
  const maxDate = cardGroups[0].date;

  useEffect(() => {
    if (selectedDate) {
      setCalendarViewDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      );
    }
  }, [selectedDate]);

  useEffect(() => {
    const mainLayout = document.getElementById("main-layout");
    if (mainLayout) {
      mainLayout.style.overflow = "hidden";
    }
    return () => {
      if (mainLayout) {
        mainLayout.style.overflow = "";
      }
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        if (selectedIndex < cardGroups.length - 1) {
          setSelectedDate(cardGroups[selectedIndex + 1].date);
        }
      } else if (e.deltaY < 0) {
        if (selectedIndex > 0) {
          setSelectedDate(cardGroups[selectedIndex - 1].date);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [selectedIndex]);

  return (
    <div className="grid grid-cols-3 gap-[40px]">
      <div className="w-full relative col-span-1">
        <div className="bg-white rounded-2xl shadow-color p-[20px]">
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            content={(date) => {
              const group = cardGroups.find(
                (g) =>
                  g.date.getFullYear() === date.getFullYear() &&
                  g.date.getMonth() === date.getMonth() &&
                  g.date.getDate() === date.getDate()
              );
              return group && group.cards.length > 0 ? (
                <div className="size-[8px] rounded-full bg-main-blue" />
              ) : null;
            }}
            minDate={minDate}
            maxDate={maxDate}
            activeStartDate={calendarViewDate}
          />
          <div className="flex gap-4 justify-end mt-4">
            <div className="flex items-center gap-2">
              <div className="size-[8px] rounded-full bg-main-red" />
              <span className="text-main-dark-gray text-sm">KOSPI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-[8px] rounded-full bg-main-blue" />
              <span className="text-main-dark-gray text-sm">KOSDAQ</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full flex flex-col gap-main col-span-2"
        tabIndex={0}
        style={{ outline: "none" }}
      >
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <ArrowDown size={16} />
          <span>마우스 휠로 날짜를 전환할 수 있습니다.</span>
        </div>
        {selectedGroup && selectedGroup.cards.length > 0 ? (
          <div className="flex flex-col min-h-[410px]">
            <table className="w-full min-w-[800px] bg-white rounded-main shadow-color border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold rounded-tl-main">
                    날짜
                  </th>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    시장
                  </th>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    제목
                  </th>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    설명
                  </th>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold">
                    위치
                  </th>
                  <th className="px-6 py-2 text-center bg-main-light-gray text-main-dark-gray font-semibold rounded-tr-main">
                    시간
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.cards
                  .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                  .map((card, idx) => (
                    <tr
                      key={card.id}
                      className={
                        `transition-colors duration-150 last:rounded-b-main` +
                        ((idx + (page - 1) * PAGE_SIZE) % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white") +
                        " hover:bg-main-blue/10"
                      }
                    >
                      <td className="px-6 py-3 font-bold text-lg border-b border-gray-200 whitespace-nowrap text-center w-24">
                        {card.date.getMonth() + 1}.
                        {String(card.date.getDate()).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 whitespace-nowrap text-center w-24">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-2 font-semibold text-xs px-2 py-1 rounded-full",
                            card.market === "KOSPI"
                              ? "bg-main-red/10 text-main-red"
                              : "bg-main-blue/10 text-main-blue"
                          )}
                        >
                          {card.market}
                        </span>
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 text-gray-700 w-[250px] max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                        {card.title}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 text-gray-700 w-[250px] max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                        {card.desc}
                      </td>
                      <td className="px-6 py-3 text-main-dark-gray border-b border-gray-200 whitespace-nowrap text-center w-32">
                        {card.location}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 whitespace-nowrap font-mono text-center w-20">
                        {card.time}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {selectedGroup.cards.length > PAGE_SIZE && (
              <div className="flex justify-center items-center gap-2 mt-auto mb-2">
                <button
                  className="px-3 py-1 rounded bg-main-light-gray text-main-dark-gray disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  이전
                </button>
                <span className="text-sm text-main-dark-gray">
                  {page} / {Math.ceil(selectedGroup.cards.length / PAGE_SIZE)}
                </span>
                <button
                  className="px-3 py-1 rounded bg-main-light-gray text-main-dark-gray disabled:opacity-50"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(
                        Math.ceil(selectedGroup.cards.length / PAGE_SIZE),
                        p + 1
                      )
                    )
                  }
                  disabled={
                    page === Math.ceil(selectedGroup.cards.length / PAGE_SIZE)
                  }
                >
                  다음
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-[20px]">
            <CalendarFold size={30} />
            <span className="text-lg font-medium">
              IR일정이 존재하지 않습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
