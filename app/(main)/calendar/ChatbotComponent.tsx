"use client";

import ChatBot from "@/components/chatbot/ChatBot";
import useOutsideClick from "@/hooks/useOutsideClick";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useOutsideClick(chatbotRef, () => setIsOpen(false));

  return (
    <div className="absolute bottom-main right-main">
      <button
        className={clsx(
          "relative size-[60px] rounded-full overflow-hidden active:scale-80 transition-all duration-300 hover:scale-105"
        )}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/news-toss-logo.png"
          alt="chatbot"
          fill
          className="object-contain"
        />
        <div className="absolute bottom-full w-[200px] right-1/2 -translate-x-1/2 bg-main-blue/10 text-main-blue text-xs font-bold rounded-full px-2 py-1 z-50">
          <p>뉴스토스 챗봇에게 무엇이든 물어보세요!</p>
        </div>
      </button>
      <div
        className={clsx(
          "w-[350px] shadow-sm rounded-main absolute bottom-0 right-0 transition-all duration-300 z-[100]",
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[300px] pointer-events-none"
        )}
      >
        <div className="relative" ref={chatbotRef}>
          <ChatBot />
          <X
            className="absolute top-main right-main"
            size={20}
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
