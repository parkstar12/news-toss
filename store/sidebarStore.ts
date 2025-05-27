import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface RecentViewState {
  recentViewNews: string[];
  recentViewStocks: string[];
  setRecentViewNews: (news: string[]) => void;
  setRecentViewStocks: (stocks: string[]) => void;
  syncFromLocalStorage: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useRecentViewStore = create<RecentViewState>((set) => ({
  recentViewNews: [],
  recentViewStocks: [],
  setRecentViewNews: (news) => {
    if (news.length > 5) {
      news.shift();
    }
    set({ recentViewNews: news });
    if (typeof window !== "undefined") {
      localStorage.setItem("latestViewNews", JSON.stringify(news));
    }
  },
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
        recentViewNews: JSON.parse(
          localStorage.getItem("latestViewNews") || "[]"
        ),
        recentViewStocks: JSON.parse(
          localStorage.getItem("latestViewStocks") || "[]"
        ),
      });
    }
  },
}));
