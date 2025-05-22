export interface Data {
  외환: 외환;
  지수: 지수;
  원자재: 원자재;
  주식: 주식;
}

interface 외환 {
  "달러/원": {
    value: number;
    change: number;
    changeRate: number;
  };
  "유로/달러": {
    value: number;
    change: number;
    changeRate: number;
  };
  "브라질 헤알/원": {
    value: number;
    change: number;
    changeRate: number;
  };
  "엔/원": {
    value: number;
    change: number;
    changeRate: number;
  };
  "파운드/달러": {
    value: number;
    change: number;
    changeRate: number;
  };
  "태국 바트/원": {
    value: number;
    change: number;
    changeRate: number;
  };
  "달러/엔": {
    value: number;
    change: number;
    changeRate: number;
  };
}

interface 지수 {
  코스피지수: {
    value: number;
    change: number;
    changeRate: number;
  };
  "코스피200 선물 (F)": {
    value: number;
    change: number;
    changeRate: number;
  };
  "US 500": {
    value: number;
    change: number;
    changeRate: number;
  };
  "US Tech 100": {
    value: number;
    change: number;
    changeRate: number;
  };
  닛케이: {
    value: number;
    change: number;
    changeRate: number;
  };
  "미국 달러 지수": {
    value: number;
    change: number;
    changeRate: number;
  };
}

interface 원자재 {
  금: {
    value: number;
    change: number;
    changeRate: number;
  };
  은: {
    value: number;
    change: number;
    changeRate: number;
  };
  브렌트유: {
    value: number;
    change: number;
    changeRate: number;
  };
  WTI유: {
    value: number;
    change: number;
    changeRate: number;
  };
  천연가스: {
    value: number;
    change: number;
    changeRate: number;
  };
  구리: {
    value: number;
    change: number;
    changeRate: number;
  };
  "미국 옥수수": {
    value: number;
    change: number;
    changeRate: number;
  };
}

interface 주식 {
  AAPL: {
    value: number;
    change: number;
    changeRate: number;
  };
  BABA: {
    value: number;
    change: number;
    changeRate: number;
  };
  TSLA: {
    value: number;
    change: number;
    changeRate: number;
  };
  AA: {
    value: number;
    change: number;
    changeRate: number;
  };
  BAC: {
    value: number;
    change: number;
    changeRate: number;
  };
  KO: {
    value: number;
    change: number;
    changeRate: number;
  };
  XOM: {
    value: number;
    change: number;
    changeRate: number;
  };
}
