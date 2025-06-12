import { create } from "zustand";

export interface RecentViewStock {
  stockImage: string;
  stockCode: string;
  stockName: string;
}

interface RecentViewState {
  recentViewStocks: RecentViewStock[];
  setRecentViewStocks: (stocks: RecentViewStock[]) => void;
  // syncFromLocalStorage: () => void;
}

export const useRecentViewStore = create<RecentViewState>((set) => ({
  recentViewStocks: [],
  setRecentViewStocks: (stocks) => {
    if (stocks.length > 5) {
      stocks.pop();
    }
    set({ recentViewStocks: stocks });
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("latestViewStocks", JSON.stringify(stocks));
    // }
  },
  // syncFromLocalStorage: () => {
  //   if (typeof window !== "undefined") {
  //     const raw = localStorage.getItem("latestViewStocks");
  //     let parsed: RecentViewStock[] = [];
  //     if (raw) {
  //       parsed = JSON.parse(raw);
  //     } else {
  //       parsed = [];
  //     }
  //     set({ recentViewStocks: parsed });
  //   }
  // },
}));
