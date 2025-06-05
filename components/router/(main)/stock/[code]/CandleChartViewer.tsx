"use client";

import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import React from "react";
import clsx from "clsx";

type Tick = {
  acml_tr_pbmn: string; // 누적 거래대금 (원 단위, 해당 기간 동안의 총 거래 금액)
  acml_vol: string; // 누적 거래량 (해당 기간 동안의 총 거래 주식 수)
  prdy_vrss: string; // 전일 대비 (가격 변화, 숫자: +면 상승, -면 하락)
  prdy_vrss_sign: string; // 전일 대비 부호 (1:상승, 2:하락, 3:보합 등)
  stck_bsop_date: string; // 기준 일자 (YYYYMMDD, 거래일)
  stck_clpr: string; // 종가 (해당 일자의 마감 가격)
  stck_hgpr: string; // 고가 (해당 일자의 최고가)
  stck_lwpr: string; // 저가 (해당 일자의 최저가)
  stck_oprc: string; // 시가 (해당 일자의 시작가)
};

type Candle = {
  time: number; // UNIX timestamp (초)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const CANDLE_INTERVALS = [
  // { label: "3분봉", value: "3m", seconds: 180 },
  // { label: "5분봉", value: "5m", seconds: 300 },
  // { label: "10분봉", value: "10m", seconds: 600 },
  // { label: "15분봉", value: "15m", seconds: 900 },
  // { label: "30분봉", value: "30m", seconds: 1800 },
  { label: "1D", value: "D", seconds: 86400 },
  { label: "1M", value: "M", seconds: 2592000 },
  { label: "1Y", value: "Y", seconds: 31536000 },
];

function aggregateCandles(ticks: Tick[], intervalSec: number): Candle[] {
  if (ticks.length === 0) return [];
  const getTimestamp = (tick: Tick) => {
    const dateStr = tick.stck_bsop_date; // "YYYYMMDD"
    const year = Number(dateStr.slice(0, 4));
    const month = Number(dateStr.slice(4, 6)) - 1;
    const day = Number(dateStr.slice(6, 8));
    // 일봉 기준, 시간은 0시로 통일
    return Math.floor(new Date(year, month, day, 0, 0, 0).getTime() / 1000);
  };

  const grouped: Record<number, Candle> = {};
  for (const tick of ticks) {
    const ts = getTimestamp(tick);
    const bucket = Math.floor(ts / intervalSec) * intervalSec;
    const volume = Number(tick.acml_vol ?? 0);
    if (!grouped[bucket]) {
      grouped[bucket] = {
        time: bucket,
        open: Number(tick.stck_oprc),
        high: Number(tick.stck_hgpr),
        low: Number(tick.stck_lwpr),
        close: Number(tick.stck_clpr),
        volume: volume,
      };
    } else {
      grouped[bucket].high = Math.max(
        grouped[bucket].high,
        Number(tick.stck_hgpr)
      );
      grouped[bucket].low = Math.min(
        grouped[bucket].low,
        Number(tick.stck_lwpr)
      );
      grouped[bucket].close = Number(tick.stck_clpr);
      grouped[bucket].volume += volume;
    }
  }
  return Object.values(grouped).sort((a, b) => a.time - b.time);
}

function isMarketOpen(now: Date = new Date()) {
  const day = now.getDay(); // 0:일, 1:월, ..., 6:토
  const hour = now.getHours();
  const minute = now.getMinutes();
  // 평일(월~금) 9:00~15:30
  const isWeekday = day >= 1 && day <= 5;
  const isMarketTime =
    (hour > 9 || (hour === 9 && minute >= 0)) &&
    (hour < 15 || (hour === 15 && minute <= 30));
  return isWeekday && isMarketTime;
}

const CandleChartViewer = ({ code }: { code: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [ticks, setTicks] = useState<Tick[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [candleInterval, setCandleInterval] = useState("D");
  const candlestickSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);
  const [isStockDay, setIsStockDay] = useState(false);

  // 주식장 오픈 여부 체크
  useEffect(() => {
    const checkMarket = () => setIsStockDay(isMarketOpen());
    checkMarket(); // 최초 1회
    const timer = setInterval(checkMarket, 60 * 1000); // 1분마다 체크
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current);
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      wickDownColor: "rgb(52, 133, 250)",
      downColor: "rgb(52, 133, 250)",
      wickUpColor: "rgb(240, 66, 81)",
      upColor: "rgb(240, 66, 81)",
      borderVisible: false,
      priceScaleId: "right",
    });
    candlestickSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.1, bottom: 0.3 },
    });
    candlestickSeriesRef.current = candlestickSeries;

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      color: "rgba(52,133,250,0.3)",
      priceScaleId: "volume",
    });
    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
      alignLabels: false,
      visible: false,
    });
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
    };
  }, []);

  // 부모 크기 변경 감지 및 차트 리사이즈
  useEffect(() => {
    if (!chartContainerRef.current || !chartRef.current) return;
    const container = chartContainerRef.current;
    const chart = chartRef.current;

    const resize = () => {
      chart.resize(container.clientWidth, container.clientHeight);
    };

    // 최초 1회
    resize();

    // ResizeObserver로 부모 크기 변경 감지
    const observer = new window.ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 이전 주식 가격 데이터 가져오기
  // useEffect(() => {
  //   if (!code) return;
  //   const fetchPrevData = async () => {
  //     const res = await fetch(
  //       `/api/v1/stocks/${code}?period=${candleInterval}`
  //     );
  //     const json: { data: Tick[] } = await res.json();

  //     if (!Array.isArray(json.data) || json.data.length === 0) return;
  //     setTicks((prev) => [...prev, ...json.data]);
  //   };
  //   fetchPrevData();
  // }, [candleInterval]);

  // 2초마다 현재 주식 가격 업데이트 (장이 열려있을 때만)
  // useEffect(() => {
  //   if (!isStockDay) return;
  //   const fetchCurrentData = async () => {
  //     const now = new Date();
  //     const res = await fetch(`/api/v1/stocks/${code}`);
  //     const data: { data: string } = await res.json();
  //     const yyyy = now.getFullYear().toString();
  //     const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  //     const dd = now.getDate().toString().padStart(2, "0");
  //     const today = `${yyyy}${mm}${dd}`;
  //     const tick: Tick = {
  //       acml_tr_pbmn: "0",
  //       acml_vol: "0",
  //       prdy_vrss: "0",
  //       prdy_vrss_sign: "3",
  //       stck_bsop_date: today,
  //       stck_clpr: data.data,
  //       stck_hgpr: data.data,
  //       stck_lwpr: data.data,
  //       stck_oprc: data.data,
  //     };
  //     setTicks((prev) => [...prev, tick]);
  //   };
  //   const interval = setInterval(fetchCurrentData, 2000);
  //   return () => clearInterval(interval);
  // }, [code, isStockDay]);

  // 집계 함수 및 캔들 갱신
  // useEffect(() => {
  //   const intervalObj = CANDLE_INTERVALS.find(
  //     (i) => i.value === candleInterval
  //   );
  //   if (!intervalObj) return;
  //   const newCandles = aggregateCandles(ticks, intervalObj.seconds);
  //   setCandles(newCandles);
  //   if (candlestickSeriesRef.current) {
  //     candlestickSeriesRef.current.setData(newCandles);
  //   }
  //   if (volumeSeriesRef.current) {
  //     const volumeData = newCandles.map((c) => ({
  //       time: c.time,
  //       value: c.volume,
  //       color:
  //         c.close >= c.open ? "rgba(240,66,81,0.6)" : "rgba(52,133,250,0.6)",
  //     }));
  //     volumeSeriesRef.current.setData(volumeData);
  //   }
  // }, [ticks, candleInterval]);

  return (
    <div className="size-full flex flex-col gap-main">
      {/* 장 운영 여부 표시 */}
      <div className="mb-2">
        {isStockDay ? (
          <div className="text-green-600 font-bold">장 운영중</div>
        ) : (
          <div className="text-red-600 font-bold">장 마감</div>
        )}
      </div>
      <div className="flex gap-2 mb-2">
        {CANDLE_INTERVALS.map((item) => (
          <button
            key={item.value}
            className={clsx(
              "px-3 py-1 rounded-full",
              candleInterval === item.value
                ? "bg-main-blue text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setCandleInterval(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="size-full">
        <div
          ref={chartContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default CandleChartViewer;
