"use client";

import { useRecentViewStore } from "@/store/sidebarStore";
import React, { useEffect } from "react";

const StockHeader = ({ code }: { code: string }) => {
  const { recentViewStocks, setRecentViewStocks, syncFromLocalStorage } =
    useRecentViewStore();

  useEffect(() => {
    syncFromLocalStorage();
    if (recentViewStocks.includes(code)) return;
    setRecentViewStocks([...recentViewStocks, code]);
  }, []);

  return <div>StockDetailPage {code}</div>;
};

export default StockHeader;
