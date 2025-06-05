"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import * as Sentry from "@sentry/nextjs";
import UpPrice from "@/components/ui/shared/UpPrice";
import DownPrice from "@/components/ui/shared/DownPrice";
import { useRecentViewStore } from "@/store/useRecentViewStore";
import { useParams } from "next/navigation";

interface StockData {
  acml_tr_pbmn: string;
  acml_vol: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  stck_bsop_date: string;
  stck_clpr: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_oprc: string;
}

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CurrentStock {
  changeAmount: string;
  changeRate: string;
  currentPrice: string;
  sign: string;
  stockCode: string;
  stockName: string;
}

type IntervalKey = "D" | "W" | "M" | "Y";

const CANDLE_INTERVALS = [
  { label: "1D", value: "D", seconds: 86400 },
  { label: "1W", value: "W", seconds: 604800 },
  { label: "1M", value: "M", seconds: 2592000 },
  { label: "1Y", value: "Y", seconds: 31536000 },
];

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

function aggregateCandles(ticks: StockData[]): CandleData[] {
  if (ticks.length === 0) return [];

  const timeFormat = (date: string) => {
    const year = Number(date.slice(0, 4));
    const month = String(Number(date.slice(4, 6))).padStart(2, "0");
    const day = String(Number(date.slice(6, 8))).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 날짜별로 그룹핑
  const grouped: Record<string, StockData[]> = {};
  for (const tick of ticks) {
    const dateStr = tick.stck_bsop_date;
    const date = timeFormat(dateStr);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(tick);
  }

  // 날짜별로 집계
  const result: CandleData[] = Object.entries(grouped).map(([date, group]) => {
    const open = Number(group[0].stck_oprc);
    const close = Number(group[group.length - 1].stck_clpr);
    const high = Math.max(...group.map((t) => Number(t.stck_hgpr)));
    const low = Math.min(...group.map((t) => Number(t.stck_lwpr)));
    const volume = group.reduce((sum, t) => sum + Number(t.acml_vol), 0);

    return {
      time: date,
      open,
      high,
      low,
      close,
      volume,
    };
  });

  // 날짜 오름차순 정렬
  result.sort((a, b) => a.time.localeCompare(b.time));
  return result;
}

const StockDetailPage = () => {
  const params = useParams<{ code: string }>();
  const code = params!.code;

  // 종목 검색 count 증가
  // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/stocks/search`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     stockCode: code,
  //   }),
  // });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickRef = useRef<ISeriesApi<"Candlestick">>(null);
  const volumeRef = useRef<ISeriesApi<"Histogram">>(null);

  const [stock, setStock] = useState<CurrentStock | null>(null);
  const [prevStockData, setPrevStockData] = useState<
    Record<IntervalKey, StockData[]>
  >({
    D: [],
    W: [],
    M: [],
    Y: [],
  });
  const [selectedInterval, setSelectedInterval] = useState<IntervalKey>("D");
  const [marketOpen, setMarketOpen] = useState(false);
  const { recentViewStocks, setRecentViewStocks } = useRecentViewStore();

  // 차트 초기화
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
    candlestickRef.current = candlestickSeries;

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
    volumeRef.current = volumeSeries;

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

  // 주식장 오픈 여부 체크
  useEffect(() => {
    const checkMarket = () => setMarketOpen(isMarketOpen());
    checkMarket(); // 최초 1회
    const timer = setInterval(checkMarket, 60 * 1000); // 1분마다 체크
    return () => clearInterval(timer);
  }, []);

  // 종목명, 현재가 데이터 가져오기
  useEffect(() => {
    if (!code) return;
    const fetchCurrentStockData = async () => {
      const res = await fetch(`/api/v1/stocks/search?keyword=${code}`);
      const json: {
        data: CurrentStock[];
      } = await res.json();

      if (res.ok) {
        const recent = {
          stockCode: json.data[0].stockCode,
          stockName: json.data[0].stockName,
          img: "",
        };
        setRecentViewStocks([
          recent,
          ...recentViewStocks.filter((stock) => stock.stockCode !== code),
        ]);

        setStock(json.data[0]);
      } else {
        Sentry.captureException(new Error("현재가 API 요청 실패"));
      }
    };
    fetchCurrentStockData();
  }, [code]);

  // 이전 주식 가격 데이터 가져오기
  useEffect(() => {
    if (!code) return;
    const fetchPrevStockData = async () => {
      for (const interval of Object.keys(prevStockData)) {
        const res = await fetch(`/api/v1/stocks/${code}?period=${interval}`);

        if (!res.ok) {
          console.log(`이전 주식 가격 API 요청 실패: ${res.status}`);
          // Sentry.captureException(new Error("이전 주식 가격 API 요청 실패"));
          continue;
        }

        const json: { data: StockData[] } = await res.json();

        setPrevStockData((prev) => ({
          ...prev,
          [interval]: json.data,
        }));

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };
    fetchPrevStockData();
  }, [code]);

  // 캔들 데이터 업데이트
  useEffect(() => {
    const intervalObj = CANDLE_INTERVALS.find(
      (i) => i.value === selectedInterval
    );
    if (!intervalObj) return;

    const stockArr = prevStockData[selectedInterval];
    if (!Array.isArray(stockArr)) return;

    const newCandles = aggregateCandles(stockArr);

    if (candlestickRef.current) {
      candlestickRef.current.setData(newCandles);
    }
    if (volumeRef.current) {
      const volumeData = newCandles.map((c) => ({
        time: c.time,
        value: c.volume,
        color:
          c.close >= c.open ? "rgba(240,66,81,0.6)" : "rgba(52,133,250,0.6)",
      }));
      volumeRef.current.setData(volumeData);
    }
  }, [prevStockData, selectedInterval]);

  // interval 변경 시 실시간 스크롤
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().scrollToRealTime();
    }
  }, [selectedInterval]);

  // 2초마다 현재 주식 가격 업데이트 (장이 열려있을 때만)
  useEffect(() => {
    // D, W, M, Y의 length가 모두 0이 아니어야 실행
    const hasAllData = ["D", "W", "M", "Y"].every(
      (k) => prevStockData[k as IntervalKey]?.length > 0
    );
    if (!marketOpen || !hasAllData) return;

    const fetchCurrentData = async () => {
      const now = new Date();
      const res = await fetch(`/api/v1/stocks/${code}`);
      const json: { data: string } = await res.json();
      const yyyy = now.getFullYear().toString();
      const mm = (now.getMonth() + 1).toString().padStart(2, "0");
      const dd = now.getDate().toString().padStart(2, "0");
      const today = `${yyyy}${mm}${dd}`;
      const tick: StockData = {
        acml_tr_pbmn: "0",
        acml_vol: "0",
        prdy_vrss: "0",
        prdy_vrss_sign: "3",
        stck_bsop_date: today,
        stck_clpr: json.data,
        stck_hgpr: json.data,
        stck_lwpr: json.data,
        stck_oprc: json.data,
      };
      setPrevStockData((prev) => ({
        D: [...prev.D, tick],
        W: [...prev.W, tick],
        M: [...prev.M, tick],
        Y: [...prev.Y, tick],
      }));

      setStock((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          currentPrice: json.data,
        };
      });
    };

    const interval = setInterval(fetchCurrentData, 2000);
    return () => clearInterval(interval);
  }, [
    code,
    marketOpen,
    prevStockData.D.length,
    prevStockData.W.length,
    prevStockData.M.length,
    prevStockData.Y.length,
  ]);

  return (
    <div className="grid grid-cols-3 gap-[20px]">
      {stock && (
        <div className="col-span-3 flex gap-main">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="bg-main-blue/10 rounded-full size-[40px] shrink-0 flex items-center justify-center">
                <span className="text-main-blue font-semibold">
                  {stock.stockName[0]}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 truncate text-sm">
              <p className="flex items-center gap-main text-gray-800 truncate w-full">
                <span className="font-bold">{stock.stockName}</span>
                <span className="text-gray-400">{stock.stockCode}</span>
                <span
                  className={clsx(
                    "px-2 py-1 rounded-main font-bold text-sm",
                    marketOpen
                      ? "text-main-blue bg-main-blue/10"
                      : "text-main-red bg-main-red/10"
                  )}
                >
                  {marketOpen ? "OPEN" : "CLOSED"}
                </span>
              </p>
              <div className="flex items-center gap-main">
                <span className="text-main-dark-gray text-xl font-bold">
                  {Number(stock.currentPrice).toLocaleString()}원
                </span>
                <div className="flex justify-between h-fit">
                  {(stock.sign === "1" || stock.sign === "2") && (
                    <UpPrice
                      change={Number(stock.changeAmount)}
                      changeRate={Number(stock.changeRate)}
                    />
                  )}
                  {stock.sign === "3" && (
                    <span className="text-gray-400 font-medium">
                      {Number(stock.changeAmount)} ({Number(stock.changeRate)}%)
                    </span>
                  )}
                  {(stock.sign === "4" || stock.sign === "5") && (
                    <DownPrice
                      change={Number(stock.changeAmount)}
                      changeRate={Number(stock.changeRate)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col-span-3">
        <div className="flex gap-2 mb-2">
          {CANDLE_INTERVALS.map((item) => (
            <button
              key={item.value}
              className={clsx(
                "px-3 py-1 rounded-full",
                selectedInterval === item.value
                  ? "bg-main-blue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setSelectedInterval(item.value as IntervalKey)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-3 size-full h-[600px]">
        <div
          ref={chartContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default StockDetailPage;
