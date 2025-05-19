"use client";

import clsx from "clsx";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import NewsModal from "./NewsModal";

interface SubNewsCardProps {
  news: {
    id: string;
    title: string;
    desc: string;
    source: string;
    time: string;
  };
  hasDesc?: boolean;
}
const SubNewsCard = ({ news, hasDesc = false }: SubNewsCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="w-full flex gap-[10px] items-center cursor-pointer hover:scale-102 transition-all duration-300 ease-in-out"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/* <Image
        src="/placeholder.svg?height=300&width=400"
        alt="경제 뉴스 이미지"
        width={400}
        height={300}
        className="w-full object-cover"
        /> */}
        <div className="size-[80px] shrink-0 bg-main-dark-gray rounded-[10px]"></div>
        <div className="size-full flex flex-col justify-around">
          <div>
            <h2
              className={clsx(
                "font-bold",
                hasDesc ? "line-clamp-1" : "line-clamp-2"
              )}
            >
              {news.title}
            </h2>
            {hasDesc && (
              <p className="text-main-dark-gray text-sm line-clamp-2">
                {news.desc}
              </p>
            )}
          </div>

          <div className="flex items-center text-main-dark-gray text-xs">
            <Clock className="h-3 w-3 mr-1 text-main-dark-gray" />
            <span className="text-main-dark-gray">
              {news.time} · {news.source}
            </span>
          </div>
        </div>
      </div>

      <NewsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        test
      </NewsModal>
    </>
  );
};

export default SubNewsCard;
