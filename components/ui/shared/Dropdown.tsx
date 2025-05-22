"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DropdownProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Dropdown = ({ title, isOpen, setIsOpen, children }: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="bg-main-light-gray text-white py-1 rounded-full flex items-center gap-main pl-3 pr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-main-dark-gray">{title}</span>
        <ChevronDown
          size={20}
          className={clsx("text-main-dark-gray", isOpen ? "rotate-180" : "")}
        />
      </button>
      <div
        className={clsx(
          "absolute top-full left-0 transition-opacity duration-300 pt-main z-10",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="p-main shadow-color rounded-main bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
