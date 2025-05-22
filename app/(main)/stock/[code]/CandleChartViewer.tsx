"use client";

import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { candlestickData, volumeData } from "./dummy";
import React from "react";

const CandleChartViewer = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: any;
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current);

      const volumeSeries = chart.addSeries(HistogramSeries, {
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "", // set as an overlay by setting a blank priceScaleId
      });
      volumeSeries.priceScale().applyOptions({
        // set the positioning of the volume series
        scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
        },
      });
      volumeSeries.setData(volumeData);

      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        wickUpColor: "rgb(52, 133, 250)",
        upColor: "rgb(52, 133, 250)",
        wickDownColor: "rgb(240, 66, 81)",
        downColor: "rgb(240, 66, 81)",
        borderVisible: false,
      });
      candlestickSeries.setData(candlestickData);
      candlestickSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      });
    }

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, []);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default CandleChartViewer;
