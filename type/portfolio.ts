export interface PortfolioData {
  totalPnl: number;
  portfolioStocksResponseDto: {
    stockName: string;
    stockCode: string;
    stockCount: number;
    entryPrice: number;
    currentPrice: number;
    profitLoss: number;
    profitLossRate: number;
  }[];
}
