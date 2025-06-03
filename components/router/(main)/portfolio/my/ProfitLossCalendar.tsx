"use client";

import React, { useState } from "react";
import Calendar from "@/components/ui/Calendar";

const ProfitLossCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <Calendar
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      content={() => <div>+123,243원</div>}
      activeStartDate={new Date()}
      minDate={new Date()}
      maxDate={new Date()}
    />
  );
};

export default ProfitLossCalendar;
