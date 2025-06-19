"use client";

import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const sse = new EventSource(
      "https://news-toss.click/api/v2/stock/sse/guest"
    );

    sse.addEventListener("connect", (e) => {
      console.log("✅ connected:", e.data);
    });

    sse.addEventListener("stock", (e) => {
      try {
        const parsed = JSON.parse(e.data);
        console.log("📈 stock 데이터:", parsed);
      } catch (err) {
        console.error("❌ JSON 파싱 에러:", err);
      }
    });

    sse.addEventListener("id", (e) => {
      console.log("🔑 id:", e.lastEventId);
    });

    sse.addEventListener("ping", (e) => {
      console.log("🔁 keep-alive ping:", e.data);
    });

    sse.addEventListener("disconnect", () => {
      console.log("❌ disconnected");
    });

    sse.onerror = (err) => {
      console.error("❌ SSE 오류 발생:", err);
    };

    return () => {
      sse.close();
    };
  }, []);
  return <div>Test</div>;
};

export default Test;
