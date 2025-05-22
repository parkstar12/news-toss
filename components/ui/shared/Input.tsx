import React from "react";
import clsx from "clsx";

interface FloatingLabelInputProps {
  width?: number | string;
  height?: number | string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function getWidthStyle(width?: number | string) {
  if (typeof width === "number") return `w-[${width}px]`;
  if (width === "full") return "w-full";
  if (typeof width === "string") return width;
  return "";
}

function getHeightStyle(height?: number | string) {
  if (typeof height === "number") return `h-[${height}px]`;
  if (height === "full") return "h-full";
  if (typeof height === "string") return height;
  return "";
}

const Input: React.FC<FloatingLabelInputProps> = ({
  width = 200,
  height = 40,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        getWidthStyle(width),
        getHeightStyle(height),
        "p-main bg-transparent border border-main-light-gray rounded-[10px] focus:border-main-blue"
      )}
    />
  );
};

export default Input;
