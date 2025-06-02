"use client";

import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import React from "react";
import clsx from "clsx";

type Candle = {
  time: number; // UNIX timestamp (초)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const CANDLE_INTERVALS = [
  { label: "1분봉", value: "1m", seconds: 60 },
  { label: "3분봉", value: "3m", seconds: 180 },
  { label: "5분봉", value: "5m", seconds: 300 },
  { label: "10분봉", value: "10m", seconds: 600 },
  { label: "15분봉", value: "15m", seconds: 900 },
  { label: "30분봉", value: "30m", seconds: 1800 },
  { label: "일봉", value: "1d", seconds: 86400 },
  { label: "월봉", value: "1M", seconds: 2592000 },
];

function aggregateCandles(ticks: any[], intervalSec: number): Candle[] {
  if (ticks.length === 0) return [];
  const getTimestamp = (tick: any) => {
    const now = new Date();
    const hh = Number(tick["체결시간"].slice(0, 2));
    const mm = Number(tick["체결시간"].slice(2, 4));
    const ss = Number(tick["체결시간"].slice(4, 6));
    now.setHours(hh, mm, ss, 0);
    return Math.floor(now.getTime() / 1000);
  };

  const grouped: Record<number, Candle> = {};
  for (const tick of ticks) {
    const price = Number(tick["현재가"]);
    const ts = getTimestamp(tick);
    const bucket = Math.floor(ts / intervalSec) * intervalSec;
    const volume = Number(tick["거래량"] ?? 0);
    if (!grouped[bucket]) {
      grouped[bucket] = {
        time: bucket,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: volume,
      };
    } else {
      grouped[bucket].high = Math.max(grouped[bucket].high, price);
      grouped[bucket].low = Math.min(grouped[bucket].low, price);
      grouped[bucket].close = price;
      grouped[bucket].volume += volume;
    }
  }
  return Object.values(grouped).sort((a, b) => a.time - b.time);
}

const CandleChartViewer = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<any[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [candleInterval, setCandleInterval] = useState("1m");
  const candlestickSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      wickUpColor: "rgb(52, 133, 250)",
      upColor: "rgb(52, 133, 250)",
      wickDownColor: "rgb(240, 66, 81)",
      downColor: "rgb(240, 66, 81)",
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

  // SSE 구독
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/sse");
    eventSource.onmessage = (event) => {
      try {
        const tick = JSON.parse(event.data);
        setTicks((prev) => [...prev, tick]);
      } catch (e) {
        console.error("JSON 파싱 에러:", e, event.data);
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  // 집계 함수 및 캔들 갱신
  useEffect(() => {
    const intervalObj = CANDLE_INTERVALS.find(
      (i) => i.value === candleInterval
    );
    if (!intervalObj) return;
    const newCandles = aggregateCandles(ticks, intervalObj.seconds);
    setCandles(newCandles);
    if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setData(newCandles);
    }
    if (volumeSeriesRef.current) {
      const volumeData = newCandles.map((c) => ({
        time: c.time,
        value: c.volume,
        color:
          c.close >= c.open ? "rgba(52,133,250,0.6)" : "rgba(240,66,81,0.6)",
      }));
      volumeSeriesRef.current.setData(volumeData);
    }
  }, [ticks, candleInterval]);

  return (
    <div className="size-full flex flex-col gap-main">
      <div className="flex gap-2 mb-2">
        {CANDLE_INTERVALS.map((item) => (
          <button
            key={item.value}
            className={clsx(
              "px-3 py-1 rounded",
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
