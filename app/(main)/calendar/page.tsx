"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

import clsx from "clsx";
import Dropdown from "@/components/ui/shared/Dropdown";

interface IRData {
  companyName: string;
  date: string; //"2025-04-30"
  irId: number;
  market: string; // "코스피"
  place: string;
  time: string; // "17:00:00"
  title: string; // "SK이노베이션 2025년 1분기 실적 발표"
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [irDataList, setIrDataList] = useState<IRData[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  const companyNames = Array.from(
    new Set(
      irDataList
        .filter((data) => {
          const dataDate = new Date(data.date);
          return (
            dataDate.getFullYear() === selectedDate.getFullYear() &&
            dataDate.getMonth() === selectedDate.getMonth() &&
            dataDate.getDate() === selectedDate.getDate()
          );
        })
        .map((data) => data.companyName)
    )
  );

  const companyNamesWithAll = ["전체", ...companyNames];

  const filteredIrDataList = irDataList.filter((data) => {
    const dataDate = new Date(data.date);
    return (
      (!selectedCompany || data.companyName === selectedCompany) &&
      dataDate.getFullYear() === selectedDate.getFullYear() &&
      dataDate.getMonth() === selectedDate.getMonth() &&
      dataDate.getDate() === selectedDate.getDate()
    );
  });

  const datesWithIrData = new Set(irDataList.map((data) => data.date));

  useEffect(() => {
    if (!year || !month) return;

    const fetchIRData = async () => {
      const res = await fetch(`/api/calen?year=${year}&month=${month}`);
      const json = await res.json();

      if (res.ok) {
        setIrDataList(json);
      }
    };
    fetchIRData();
  }, [month, year]);

  useEffect(() => {
    setSelectedCompany(null);
  }, [day]);

  useEffect(() => {
    const sse = new EventSource("http://43.200.17.139:8080/api/news/stream");
    // const sse = new EventSource("/api/news/stream");

    sse.onopen = (event) => {
      console.log("✅ 서버 연결됨", event);
    };

    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    sse.onmessage = (event) => {
      console.log("📰 뉴스 수신:", event.data);
    };

    // 연결 이벤트
    sse.addEventListener("connect", (event) => {
      console.log("✅ 서버 연결됨:", event.data); // 'connected' 출력
    });

    // 뉴스 이벤트 수신
    sse.addEventListener("news", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📰 뉴스 수신:", data);
      } catch (err) {
        console.error("❌ JSON 파싱 에러:", err);
      }
    });

    // 에러 핸들링
    sse.onerror = (event) => {
      console.error("❌ SSE 에러 발생:", event);
    };

    // 컴포넌트 언마운트 시 종료
    return () => {
      sse.close();
      console.log("🛑 SSE 연결 종료");
    };
  }, []);

  return (
    <div className="grid grid-cols-5 gap-[40px]">
      <div className="col-span-3 w-full flex flex-col gap-main">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-semibold text-xl bg-gradient-to-r from-main-blue to-purple-600 bg-clip-text text-transparent w-fit">{`${year}년 ${month}월 ${day}일 IR 일정`}</h2>
            <p className="text-main-dark-gray/70">
              총 {filteredIrDataList.length}건의 일정
            </p>
          </div>
          {companyNames.length > 0 && (
            <Dropdown
              groups={companyNamesWithAll}
              selected={selectedCompany || "전체"}
              onSelect={(company) => {
                if (company === "전체") {
                  setSelectedCompany(null);
                } else {
                  setSelectedCompany(company);
                }
              }}
              className="py-1 bg-main-blue/10"
              textColor="text-main-blue font-semibold"
              maxHeight={300}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-main">
          {filteredIrDataList.length > 0 ? (
            filteredIrDataList.map((irData) => (
              <div
                key={`IR-${irData.irId}-${irData.date}`}
                className="w-full flex flex-col gap-main bg-white rounded-main shadow-sm p-[20px]"
              >
                <p className="text-xl font-semibold flex items-center gap-2">
                  {irData.title}
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-y-[5px] gap-x-[20px] text-sm text-gray-500">
                  <p>
                    회사:{" "}
                    <span className="text-main-blue font-semibold">
                      {irData.companyName}
                    </span>
                  </p>

                  <p>
                    시장:{" "}
                    <span
                      className={clsx(
                        "text-xs text-main-blue bg-main-blue/10 px-2 py-1 rounded-full w-fit",
                        irData.market === "코스피"
                          ? "bg-main-blue/10 text-main-blue"
                          : "bg-main-red/10 text-main-red"
                      )}
                    >
                      {irData.market === "코스피" ? "KOSPI" : "KOSDAQ"}
                    </span>
                  </p>

                  <p>날짜: {irData.date}</p>

                  <p>장소: {irData.place}</p>

                  <p>시간: {irData.time ? irData.time : "정보 없음"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-white text-center text-main-dark-gray/60">
              <p>IR 일정이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-2 w-full relative">
        <div className="sticky top-0 z-10 p-main bg-main-light-gray rounded-main">
          {/* <div className="bg-white rounded-main"> */}
          <Calendar
            prev2Label={null}
            next2Label={null}
            value={selectedDate}
            onChange={(date) => {
              if (date instanceof Date) {
                setSelectedDate(date);
              }
            }}
            maxDate={new Date()}
            calendarType="gregory"
            view="month"
            navigationLabel={({ date }) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              return `${year}년 ${month}월`;
            }}
            formatDay={(locale, date) => String(date.getDate())}
            tileContent={({ date }) => {
              const dateString = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              if (datesWithIrData.has(dateString)) {
                return (
                  <div className="absolute top-main left-[10px] w-full flex justify-center">
                    <div className="size-[5px] rounded-full bg-main-blue animate-pulse" />
                  </div>
                );
              } else {
                return null;
              }
            }}
            showNeighboringMonth={false}
            onActiveStartDateChange={({ activeStartDate }) => {
              if (activeStartDate) {
                setSelectedDate(new Date(activeStartDate));
              }
            }}
            className="w-full h-full"
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
