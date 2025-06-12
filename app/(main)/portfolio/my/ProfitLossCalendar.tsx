"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

const ProfitLossCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
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

        return (
          <span className="w-full flex justify-center text-xs">
            {Number(100000000).toLocaleString()}
          </span>
        );
      }}
      showNeighboringMonth={false}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) {
          setSelectedDate(new Date(activeStartDate));
        }
      }}
      className="w-full h-full"
    />
  );
};

export default ProfitLossCalendar;
