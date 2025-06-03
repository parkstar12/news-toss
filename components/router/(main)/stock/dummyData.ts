// OverViewChart용 더미 데이터

export const dummyData = {
  외환: {
    "달러/원": { value: 1372.5, change: 2.3, changeRate: 0.17 },
    "유로/달러": { value: 1.085, change: -0.002, changeRate: -0.18 },
    "브라질 헤알/원": { value: 270.1, change: 1.2, changeRate: 0.45 },
    "엔/원": { value: 8.75, change: 0.01, changeRate: 0.11 },
    "파운드/달러": { value: 1.27, change: 0.003, changeRate: 0.24 },
    "태국 바트/원": { value: 37.8, change: -0.05, changeRate: -0.13 },
    "달러/엔": { value: 151.2, change: 0.2, changeRate: 0.13 },
  },
  지수: {
    코스피지수: { value: 2720.12, change: 12.34, changeRate: 0.45 },
    "코스피200 선물 (F)": { value: 355.2, change: 1.1, changeRate: 0.31 },
    "US 500": { value: 5230.5, change: -15.2, changeRate: -0.29 },
    "US Tech 100": { value: 18300.7, change: 45.6, changeRate: 0.25 },
    닛케이: { value: 39000.3, change: -120.5, changeRate: -0.31 },
    "미국 달러 지수": { value: 104.2, change: 0.3, changeRate: 0.29 },
  },
  원자재: {
    금: { value: 2350.5, change: 5.2, changeRate: 0.22 },
    은: { value: 29.1, change: 0.1, changeRate: 0.34 },
    브렌트유: { value: 82.3, change: -0.5, changeRate: -0.61 },
    WTI유: { value: 78.9, change: -0.7, changeRate: -0.88 },
    천연가스: { value: 2.65, change: 0.03, changeRate: 1.15 },
    구리: { value: 4.5, change: 0.02, changeRate: 0.44 },
    "미국 옥수수": { value: 450.2, change: -2.1, changeRate: -0.46 },
  },
  주식: {
    AAPL: { value: 195.2, change: 1.5, changeRate: 0.77 },
    BABA: { value: 85.3, change: -0.8, changeRate: -0.93 },
    TSLA: { value: 175.6, change: 2.1, changeRate: 1.21 },
    AA: { value: 42.7, change: 0.2, changeRate: 0.47 },
    BAC: { value: 38.9, change: -0.1, changeRate: -0.26 },
    KO: { value: 61.2, change: 0.3, changeRate: 0.49 },
    XOM: { value: 110.5, change: -1.2, changeRate: -1.08 },
  },
} as const;
