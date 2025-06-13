import { create } from "zustand";

export interface Portfolio {
  stockName: string;
  stockImage: string;
  stockCode: string;
  stockCount: number;
  entryPrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossRate: number;
}

interface PortfolioStore {
  portfolio: Portfolio[];
  setPortfolio: (portfolio: Portfolio[]) => void;
  // addPortfolio: (portfolio: Portfolio) => void;
  // removePortfolio: (portfolio: Portfolio) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolio: [],
  setPortfolio: (portfolio) => set({ portfolio }),
  // addPortfolio: (portfolio) =>
  //   set((state) => ({ portfolio: [...state.portfolio, portfolio] })),
  // removePortfolio: (portfolio) =>
  //   set((state) => ({
  //     portfolio: state.portfolio.filter(
  //       (p) => p.stockCode !== portfolio.stockCode
  //     ),
  //   })),
}));
