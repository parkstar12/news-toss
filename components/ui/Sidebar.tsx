"use client";

import { ChartNoAxesColumn, ChevronsLeft, Eye, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";
import clsx from "clsx";
import RecentView from "./RecentView";

type Category = "내 투자" | "관심" | "최근 본" | null;

const Sidebar = () => {
  const { isOpen, toggle, open } = useSidebarStore();
  const [category, setCategory] = useState<Category>(null);

  useEffect(() => {
    if (!isOpen) {
      setCategory(null);
    }
  }, [isOpen]);

  const handleToggle = () => {
    toggle();
    if (!category) setCategory("내 투자");
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    open();
  };

  return (
    <aside className="bg-transparent flex py-5">
      <div
        className={clsx(
          "duration-200 shrink-0 transition-all overflow-hidden",
          isOpen ? "w-[300px] pl-[20px]" : "w-0 opacity-0 px-0"
        )}
      >
        {category === "최근 본" && <RecentView />}
      </div>

      <div className="flex flex-col gap-[20px] shrink-0 items-center px-[10px]">
        <button
          className="flex flex-col items-center cursor-pointer"
          onClick={handleToggle}
        >
          <ChevronsLeft
            size={25}
            className={clsx(
              "duration-200 hover:bg-sub/40 rounded-sm p-1 box-content",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <div className="flex flex-col gap-5">
          <SidebarButton
            icon={<ChartNoAxesColumn size={20} />}
            label="내 투자"
            active={category === "내 투자"}
            onClick={() => handleCategoryChange("내 투자")}
          />
          <SidebarButton
            icon={<Heart size={20} />}
            label="관심"
            active={category === "관심"}
            onClick={() => handleCategoryChange("관심")}
          />
          <SidebarButton
            icon={<Eye size={20} />}
            label="최근 본"
            active={category === "최근 본"}
            onClick={() => handleCategoryChange("최근 본")}
          />
        </div>
      </div>
    </aside>
  );
};

const SidebarButton = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={clsx(
          "rounded-sm p-1 box-content transition-colors hover:bg-sub/40",
          active ? "text-black bg-sub/40" : "text-sub"
        )}
      >
        {icon}
      </div>
      <span
        className={clsx(
          "text-xs transition-colors",
          active ? "text-black" : "text-sub"
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default Sidebar;
