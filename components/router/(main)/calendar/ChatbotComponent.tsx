"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Chatbot from "./Chatbot";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useOutsideClick(chatbotRef, () => setIsOpen(false));

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
          "w-[420px] h-[600px] shadow-color rounded-main absolute overflow-hidden bottom-0 right-0 transition-all duration-500 z-[100]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        ref={chatbotRef}
      >
        <Chatbot isOpen={isOpen} />
        <X
          className="absolute top-main right-main cursor-pointer"
          size={20}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent;
