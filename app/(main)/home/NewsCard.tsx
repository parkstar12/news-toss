"use client";

import Modal from "@/components/ui/Modal";
import clsx from "clsx";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import NewsModal from "./NewsModal";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    desc: string;
    source: string;
    time: string;
  };
  size?: "sm" | "md" | "lg";
}

const NewsCard = ({ news, size = "md" }: NewsCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        key={news.id}
        className="w-full flex flex-col items-center shadow-color rounded-main cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div
          className={clsx(
            "w-full shrink-0 bg-main-dark-gray rounded-t-main",
            size === "sm"
              ? "h-[150px]"
              : size === "md"
              ? "h-[250px]"
              : "h-[350px]"
          )}
        />

        <div className="w-full flex flex-col items-start gap-4 p-main">
          <h2 className="w-full font-bold line-clamp-2">{news.title}</h2>
          <div className="w-full flex items-center text-main-dark-gray text-xs">
            <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
            <span className="text-main-dark-gray">4시간 전 · 이투데이</span>
          </div>
        </div>
      </div>

      <NewsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        test
      </NewsModal>
    </>
  );
};

export default NewsCard;
