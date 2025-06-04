import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface RecentViewState {
  recentViewStocks: {
    img: string;
    stockCode: string;
    stockName: string;
  }[];
  setRecentViewStocks: (
    stocks: {
      img: string;
      stockCode: string;
      stockName: string;
    }[]
  ) => void;
  syncFromLocalStorage: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useRecentViewStore = create<RecentViewState>((set) => ({
  recentViewStocks: [],

  setRecentViewStocks: (stocks) => {
    if (stocks.length > 5) {
      stocks.shift();
    }
    set({ recentViewStocks: stocks });
    if (typeof window !== "undefined") {
      localStorage.setItem("latestViewStocks", JSON.stringify(stocks));
    }
  },
  syncFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      set({
        recentViewStocks: JSON.parse(
          localStorage.getItem("latestViewStocks") || "[]"
        ),
      });
    }
  },
}));
