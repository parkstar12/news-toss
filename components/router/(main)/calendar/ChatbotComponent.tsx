"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useCallback } from "react";
import Chatbot from "./Chatbot";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(500);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useOutsideClick(chatbotRef, () => setIsOpen(false));

  // 대각선 resize (좌상단)
  const handleDiagonalResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const rect = chatbotRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newHeight = rect.bottom - e.clientY;
      const newWidth = rect.right - e.clientX;

      setHeight(Math.max(400, Math.min(window.innerHeight - 100, newHeight))); // 최소 400px, 최대 800px
      setWidth(Math.max(400, Math.min(window.innerWidth - 100, newWidth))); // 최소 400px, 최대 700px
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="absolute bottom-main right-main">
      <div className="relative">
        <button
          className={clsx(
            "relative transition-all duration-300 hover:scale-105 active:scale-80",
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={() => setIsOpen(true)}
        >
          <div className="relative size-[50px]">
            <Image
              src="/news-toss-logo.png"
              alt="chatbot"
              fill
              sizes="50px"
              className="object-cover rounded-full"
            />
          </div>
        </button>

        <div className="absolute -left-main top-1/2 -translate-x-full -translate-y-1/2 bg-main-blue/10 text-main-blue text-sm font-bold rounded-full px-4 py-1 z-50 whitespace-nowrap animate-bounce">
          뉴스토스 챗봇에게 무엇이든 물어보세요!
        </div>
      </div>

      <div
        className={clsx(
          "shadow-color rounded-main absolute overflow-hidden bottom-0 right-0 transition-all duration-500 z-[100]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ height: `${height}px`, width: `${width}px` }}
        ref={chatbotRef}
      >
        {/* 대각선 Resize Handle (좌상단) */}
        <div
          className="absolute top-0 left-0 w-4 h-4 bg-transparent hover:bg-blue-200/30 transition-colors"
          style={{ cursor: "nw-resize" }}
          onMouseDown={handleDiagonalResize}
          title="드래그하여 크기 조절"
        />

        <Chatbot isOpen={isOpen} />
        <X
          className="absolute top-main right-main cursor-pointer z-10"
          size={20}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent;
