"use client";

import { ChartNoAxesColumn, ChevronsLeft, Eye, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";

type Category = "내 투자" | "관심" | "최근 본" | null;

const Sidebar = () => {
  const { isOpen, toggle, open } = useSidebarStore();
  const [category, setCategory] = useState<Category>(null);

  useEffect(() => {
    if (!isOpen) {
      setCategory(null);
    }
  }, [isOpen]);

  return (
    <aside className="bg-transparent flex py-5">
      <div
        className={`flex-1 duration-200  ${
          isOpen ? "w-[250px] px-[20px]" : "w-0 opacity-0 px-0"
        }`}
      >
        {category}
      </div>
      <div className="flex flex-col gap-7 items-center px-[10px]">
        <button
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            toggle();
            if (!category) {
              setCategory("내 투자");
            }
          }}
        >
          <ChevronsLeft
            size={25}
            className={`duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex flex-col gap-5">
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              setCategory("내 투자");
              open();
            }}
          >
            <ChartNoAxesColumn
              size={20}
              className={`rounded-sm p-1 box-content ${
                category === "내 투자" ? "text-black bg-sub/40" : "text-sub"
              }`}
            />
            <span
              className={`${
                category === "내 투자" ? "text-black" : "text-sub"
              } text-xs`}
            >
              내 투자
            </span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              setCategory("관심");
              open();
            }}
          >
            <Heart
              size={20}
              className={`rounded-sm p-1 box-content ${
                category === "관심" ? "text-black bg-sub/40" : "text-sub"
              }`}
            />
            <span
              className={`${
                category === "관심" ? "text-black" : "text-sub"
              } text-xs`}
            >
              관심
            </span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              setCategory("최근 본");
              open();
            }}
          >
            <Eye
              size={20}
              className={`rounded-sm p-1 box-content ${
                category === "최근 본" ? "text-black bg-sub/40" : "text-sub"
              }`}
            />
            <span
              className={`${
                category === "최근 본" ? "text-black" : "text-sub"
              } text-xs`}
            >
              최근 본
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
